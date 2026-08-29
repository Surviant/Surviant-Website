import assert from "node:assert/strict"
import test from "node:test"

import {
  DELETE,
  GET,
  HEAD,
  OPTIONS,
  PATCH,
  PUT,
} from "@/app/api/contact/route"
import { getContactErrorMessage } from "@/lib/contact-errors"
import {
  getContactRateLimitSizeForTests,
  handleContactRequest,
  resetContactRateLimitForTests,
  resolveInitialServiceSlug,
} from "@/lib/contact"

const NOW = 1_800_000_000_000
const productionEnv = {
  NODE_ENV: "production",
  SITE_URL: "https://www.surviant.com",
  RESEND_API_KEY: "test-key",
  CONTACT_TO_EMAIL: "contact@surviant.com",
  CONTACT_FROM_EMAIL: "Surviant <website@surviant.com>",
}

function validBody(overrides: Record<string, unknown> = {}) {
  return {
    name: "Casey Buyer",
    email: "CASEY@example.com",
    company: "Example Company",
    serviceSlug: "agentic-systems",
    message: "We need a dependable workflow for a multi-step operational task.",
    website: "",
    startedAt: NOW - 5000,
    ...overrides,
  }
}

function contactRequest(
  body: unknown,
  { ip = "203.0.113.10", origin = "https://www.surviant.com" } = {},
) {
  return new Request("https://www.surviant.com/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: origin,
      "X-Real-IP": ip,
    },
    body: JSON.stringify(body),
  })
}

test.beforeEach(() => resetContactRateLimitForTests())

test("a valid inquiry is sent through the provider and returns a safe response", async () => {
  let providerRequest: RequestInit | undefined
  const fetcher = (async (_input: RequestInfo | URL, init?: RequestInit) => {
    providerRequest = init
    return new Response(null, { status: 200 })
  }) as typeof fetch

  const response = await handleContactRequest(contactRequest(validBody()), {
    env: productionEnv,
    fetcher,
    now: () => NOW,
    randomUUID: () => "test-idempotency-key",
  })
  const responseText = await response.text()

  assert.equal(response.status, 200)
  assert.deepEqual(JSON.parse(responseText), { ok: true })
  assert.ok(!responseText.includes("Casey"))
  assert.ok(!responseText.includes("example.com"))
  assert.equal(new Headers(providerRequest?.headers).get("Idempotency-Key"), "test-idempotency-key")

  const providerBody = JSON.parse(String(providerRequest?.body))
  assert.equal(providerBody.reply_to, "casey@example.com")
  assert.match(providerBody.text, /Agentic Systems/)
})

test("invalid fields and invalid service slugs are rejected without returning PII", async () => {
  const invalidField = await handleContactRequest(
    contactRequest(validBody({ message: "too short" })),
    { env: productionEnv, now: () => NOW },
  )
  assert.equal(invalidField.status, 400)
  assert.deepEqual(await invalidField.json(), { ok: false, errorCode: "VALIDATION_ERROR" })

  resetContactRateLimitForTests()
  const invalidService = await handleContactRequest(
    contactRequest(validBody({ serviceSlug: "made-up-offering" })),
    { env: productionEnv, now: () => NOW },
  )
  const responseText = await invalidService.text()
  assert.equal(invalidService.status, 400)
  assert.ok(!responseText.includes("Casey"))
  assert.ok(!responseText.includes("example.com"))
})

test("the honeypot returns synthetic success without delivery", async () => {
  let calls = 0
  const fetcher = (async () => {
    calls += 1
    return new Response(null, { status: 200 })
  }) as typeof fetch

  const honeypot = await handleContactRequest(
    contactRequest(validBody({ website: "https://spam.example" })),
    { env: productionEnv, fetcher, now: () => NOW },
  )
  assert.equal(honeypot.status, 200)
  assert.deepEqual(await honeypot.json(), { ok: true })
  assert.equal(calls, 0)
})

test("a legitimate fast submission returns a safe, retryable error without delivery", async () => {
  let calls = 0
  const fetcher = (async () => {
    calls += 1
    return new Response(null, { status: 200 })
  }) as typeof fetch

  const tooFast = await handleContactRequest(
    contactRequest(validBody({ startedAt: NOW - 500 })),
    { env: productionEnv, fetcher, now: () => NOW },
  )
  const responseText = await tooFast.text()

  assert.equal(tooFast.status, 400)
  assert.equal(tooFast.headers.get("Retry-After"), "2")
  assert.deepEqual(JSON.parse(responseText), { ok: false, errorCode: "SUBMISSION_TOO_FAST" })
  assert.ok(!responseText.includes("Casey"))
  assert.ok(!responseText.includes("example.com"))
  assert.equal(calls, 0)
})

test("expired and future form sessions return a refreshable error without delivery", async () => {
  let calls = 0
  const fetcher = (async () => {
    calls += 1
    return new Response(null, { status: 200 })
  }) as typeof fetch

  for (const startedAt of [NOW - 24 * 60 * 60 * 1000 - 1, NOW + 1]) {
    const response = await handleContactRequest(
      contactRequest(validBody({ startedAt })),
      { env: productionEnv, fetcher, now: () => NOW },
    )
    assert.equal(response.status, 400)
    assert.deepEqual(await response.json(), { ok: false, errorCode: "FORM_SESSION_EXPIRED" })
    resetContactRateLimitForTests()
  }

  assert.equal(calls, 0)
})

test("timing errors have clear inline copy and never claim delivery", () => {
  const tooFast = getContactErrorMessage("SUBMISSION_TOO_FAST")
  const expired = getContactErrorMessage("FORM_SESSION_EXPIRED")

  assert.match(tooFast, /wait a moment/i)
  assert.match(tooFast, /submit.*again/i)
  assert.match(expired, /refresh.*try again/i)
  assert.doesNotMatch(`${tooFast} ${expired}`, /message was sent/i)
})

test("the contact endpoint advertises POST and OPTIONS and rejects unsupported methods with JSON", async () => {
  const options = await OPTIONS()
  assert.equal(options.status, 204)
  assert.equal(options.headers.get("Allow"), "OPTIONS, POST")
  assert.equal(await options.text(), "")

  for (const [method, handler] of [
    ["GET", GET],
    ["PUT", PUT],
    ["PATCH", PATCH],
    ["DELETE", DELETE],
    ["HEAD", HEAD],
  ] as const) {
    const response = await handler()
    assert.equal(response.status, 405, method)
    assert.equal(response.headers.get("Allow"), "OPTIONS, POST", method)
    assert.match(response.headers.get("Content-Type") || "", /^application\/json/, method)
    assert.deepEqual(await response.json(), { ok: false, errorCode: "METHOD_NOT_ALLOWED" }, method)
  }
})

test("the sixth attempt from one IP is rate limited for ten minutes", async () => {
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    const response = await handleContactRequest(
      contactRequest(validBody({ website: "bot" }), { ip: "203.0.113.44" }),
      { env: productionEnv, now: () => NOW },
    )
    assert.equal(response.status, 200)
  }

  const response = await handleContactRequest(
    contactRequest(validBody({ website: "bot" }), { ip: "203.0.113.44" }),
    { env: productionEnv, now: () => NOW },
  )
  assert.equal(response.status, 429)
  assert.equal(response.headers.get("Retry-After"), "600")
  assert.deepEqual(await response.json(), { ok: false, errorCode: "RATE_LIMITED" })
})

test("expired IP counters are removed during later request processing", async () => {
  const first = await handleContactRequest(
    contactRequest(validBody({ website: "bot" }), { ip: "203.0.113.40" }),
    { env: productionEnv, now: () => NOW },
  )
  assert.equal(first.status, 200)
  assert.equal(getContactRateLimitSizeForTests(), 1)

  const later = NOW + 10 * 60 * 1000 + 1
  const second = await handleContactRequest(
    contactRequest(
      validBody({ website: "bot", startedAt: later - 5000 }),
      { ip: "203.0.113.41" },
    ),
    { env: productionEnv, now: () => later },
  )
  assert.equal(second.status, 200)
  assert.equal(getContactRateLimitSizeForTests(), 1)
})

test("provider failure and missing delivery configuration fail safely", async () => {
  const originalConsoleError = console.error
  console.error = () => undefined

  try {
    const providerFailure = await handleContactRequest(contactRequest(validBody()), {
      env: productionEnv,
      fetcher: (async () => new Response(null, { status: 500 })) as typeof fetch,
      now: () => NOW,
    })
    const providerText = await providerFailure.text()
    assert.equal(providerFailure.status, 503)
    assert.deepEqual(JSON.parse(providerText), { ok: false, errorCode: "DELIVERY_UNAVAILABLE" })
    assert.ok(!providerText.includes("Casey"))

    resetContactRateLimitForTests()
    const missingConfiguration = await handleContactRequest(contactRequest(validBody()), {
      env: { NODE_ENV: "production", SITE_URL: "https://www.surviant.com" },
      now: () => NOW,
    })
    assert.equal(missingConfiguration.status, 503)
  } finally {
    console.error = originalConsoleError
  }
})

test("a configured staging origin can submit without changing the canonical site URL", async () => {
  const stagingEnv = {
    ...productionEnv,
    CONTACT_ALLOWED_ORIGINS: "https://surviant-staging.example.com",
  }
  const response = await handleContactRequest(
    contactRequest(validBody(), { origin: "https://surviant-staging.example.com" }),
    {
      env: stagingEnv,
      fetcher: (async () => new Response(null, { status: 200 })) as typeof fetch,
      now: () => NOW,
    },
  )

  assert.equal(response.status, 200)
  assert.deepEqual(await response.json(), { ok: true })
  assert.equal(stagingEnv.SITE_URL, "https://www.surviant.com")
})

test("the contact page prefill accepts only published offerings", () => {
  assert.equal(resolveInitialServiceSlug("voice-ai"), "voice-ai")
  assert.equal(resolveInitialServiceSlug("made-up-offering"), "")
  assert.equal(resolveInitialServiceSlug(undefined), "")
})
