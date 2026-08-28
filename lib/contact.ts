import { isIP } from "node:net"

import { z } from "zod"

import { getOfferingBySlug } from "@/lib/content/services"

const MAX_BODY_BYTES = 32 * 1024
const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT = 5
const MAX_RATE_KEYS = 5000

const buckets = new Map<string, { count: number; resetAt: number }>()

const safeText = (minimum: number, maximum: number) =>
  z
    .string()
    .trim()
    .min(minimum)
    .max(maximum)
    .refine(
      (value) => !/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(value),
      "Contains unsupported control characters",
    )

export const contactSchema = z
  .object({
    name: safeText(2, 100),
    email: z.string().trim().email().max(254).transform((value) => value.toLowerCase()),
    company: safeText(1, 160),
    serviceSlug: z.string().max(80).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
    message: safeText(20, 5000).transform((value) => value.replace(/\r\n?/g, "\n")),
    website: z.string().max(200).optional().default(""),
    startedAt: z.number().int().positive().finite(),
  })
  .strict()

type ContactEnvironment = {
  NODE_ENV?: string
  SITE_URL?: string
  RESEND_API_KEY?: string
  CONTACT_TO_EMAIL?: string
  CONTACT_FROM_EMAIL?: string
  CONTACT_ALLOWED_ORIGINS?: string
}

type ContactDependencies = {
  env?: ContactEnvironment
  fetcher?: typeof fetch
  now?: () => number
  randomUUID?: () => string
}

function jsonError(status: number, errorCode: string, headers?: Record<string, string>) {
  return new Response(JSON.stringify({ ok: false, errorCode }), {
    status,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/json; charset=utf-8",
      ...headers,
    },
  })
}

function success() {
  return new Response(JSON.stringify({ ok: true }), {
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/json; charset=utf-8",
    },
  })
}

function allowedOrigin(request: Request, env: ContactEnvironment) {
  const origin = request.headers.get("origin")
  const trustedOrigin = new URL(env.SITE_URL || "https://www.surviant.com").origin

  let parsedOrigin: URL | undefined
  try {
    parsedOrigin = origin ? new URL(origin) : undefined
  } catch {
    return false
  }

  const configuredOrigins = new Set([trustedOrigin])
  for (const candidate of env.CONTACT_ALLOWED_ORIGINS?.split(",") || []) {
    try {
      const parsed = new URL(candidate.trim())
      if (parsed.protocol === "https:" || parsed.protocol === "http:") {
        configuredOrigins.add(parsed.origin)
      }
    } catch {
      continue
    }
  }

  if (env.NODE_ENV === "production") {
    return Boolean(parsedOrigin && configuredOrigins.has(parsedOrigin.origin))
  }
  if ((parsedOrigin && configuredOrigins.has(parsedOrigin.origin)) || !origin) return true

  return (
    parsedOrigin?.protocol === "http:" &&
    (parsedOrigin.hostname === "localhost" || parsedOrigin.hostname === "127.0.0.1") &&
    /^\d+$/.test(parsedOrigin.port)
  )
}

function requestKey(request: Request, env: ContactEnvironment) {
  const realIp = request.headers.get("x-real-ip")?.trim()
  if (realIp && isIP(realIp)) return realIp
  return env.NODE_ENV === "production" ? "unknown-production-client" : "local-development"
}

function checkRateLimit(key: string, now: number) {
  for (const [candidate, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(candidate)
  }

  const existing = buckets.get(key)
  if (!existing) {
    if (buckets.size >= MAX_RATE_KEYS) {
      let earliestReset = now + RATE_WINDOW_MS
      for (const bucket of buckets.values()) {
        earliestReset = Math.min(earliestReset, bucket.resetAt)
      }
      return {
        allowed: false,
        retryAfter: Math.max(1, Math.ceil((earliestReset - now) / 1000)),
      }
    }

    buckets.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return { allowed: true, retryAfter: 0 }
  }

  existing.count += 1
  if (existing.count > RATE_LIMIT) {
    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    }
  }

  return { allowed: true, retryAfter: 0 }
}

async function readLimitedBody(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || "0")
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    throw new Error("PAYLOAD_TOO_LARGE")
  }
  if (!request.body) return ""

  const reader = request.body.getReader()
  const decoder = new TextDecoder()
  let bytes = 0
  let body = ""

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    bytes += value.byteLength
    if (bytes > MAX_BODY_BYTES) {
      await reader.cancel()
      throw new Error("PAYLOAD_TOO_LARGE")
    }
    body += decoder.decode(value, { stream: true })
  }

  body += decoder.decode()
  return body
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

export function resolveInitialServiceSlug(value?: string) {
  return value && getOfferingBySlug(value) ? value : ""
}

export function resetContactRateLimitForTests() {
  buckets.clear()
}

export function getContactRateLimitSizeForTests() {
  return buckets.size
}

export async function handleContactRequest(
  request: Request,
  dependencies: ContactDependencies = {},
) {
  const env = dependencies.env || process.env
  const now = dependencies.now || Date.now
  const fetcher = dependencies.fetcher || fetch
  const randomUUID = dependencies.randomUUID || (() => crypto.randomUUID())

  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return jsonError(415, "UNSUPPORTED_MEDIA_TYPE")
  }
  if (!allowedOrigin(request, env)) return jsonError(403, "ORIGIN_REJECTED")

  const rate = checkRateLimit(requestKey(request, env), now())
  if (!rate.allowed) {
    return jsonError(429, "RATE_LIMITED", { "Retry-After": String(rate.retryAfter) })
  }

  let bodyText: string
  try {
    bodyText = await readLimitedBody(request)
  } catch {
    return jsonError(413, "PAYLOAD_TOO_LARGE")
  }

  let body: unknown
  try {
    body = JSON.parse(bodyText)
  } catch {
    return jsonError(400, "INVALID_JSON")
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) return jsonError(400, "VALIDATION_ERROR")

  const submission = parsed.data
  if (submission.serviceSlug && !getOfferingBySlug(submission.serviceSlug)) {
    return jsonError(400, "VALIDATION_ERROR")
  }

  const elapsed = now() - submission.startedAt
  if (
    submission.website ||
    elapsed < 2000 ||
    elapsed > 24 * 60 * 60 * 1000 ||
    elapsed < 0
  ) {
    return success()
  }

  const resendApiKey = env.RESEND_API_KEY
  const toEmail = env.CONTACT_TO_EMAIL
  const fromEmail = env.CONTACT_FROM_EMAIL
  if (!resendApiKey || !toEmail || !fromEmail) {
    return jsonError(503, "DELIVERY_UNAVAILABLE")
  }

  const service = submission.serviceSlug
    ? getOfferingBySlug(submission.serviceSlug)
    : undefined
  const serviceTitle = service?.title || "Not sure yet"
  const text = [
    "New Surviant website inquiry",
    "",
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Company: ${submission.company}`,
    `Starting point: ${serviceTitle}`,
    "",
    "Project context:",
    submission.message,
  ].join("\n")
  const html = `<h1>New Surviant website inquiry</h1><p><strong>Name:</strong> ${escapeHtml(submission.name)}</p><p><strong>Email:</strong> ${escapeHtml(submission.email)}</p><p><strong>Company:</strong> ${escapeHtml(submission.company)}</p><p><strong>Starting point:</strong> ${escapeHtml(serviceTitle)}</p><h2>Project context</h2><p>${escapeHtml(submission.message).replaceAll("\n", "<br>")}</p>`

  try {
    const response = await fetcher("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": randomUUID(),
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: submission.email,
        subject: "New Surviant website inquiry",
        text,
        html,
      }),
      signal: AbortSignal.timeout(10000),
    })

    if (!response.ok) {
      console.error("Contact delivery failed")
      return jsonError(503, "DELIVERY_UNAVAILABLE")
    }

    return success()
  } catch {
    console.error("Contact delivery failed")
    return jsonError(503, "DELIVERY_UNAVAILABLE")
  }
}
