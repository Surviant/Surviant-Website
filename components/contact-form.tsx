"use client"

import { CalendarDays, Send } from "lucide-react"
import Link from "next/link"
import { useRef, useState } from "react"

import { getContactErrorMessage } from "@/lib/contact-errors"

type ServiceGroup = {
  practiceTitle: string
  offerings: Array<{ slug: string; title: string }>
}

type FormValues = {
  name: string
  email: string
  company: string
  serviceSlug: string
  message: string
  website: string
}

const fieldClassName = "min-h-12 w-full rounded-[4px] border border-[#DCE9FF] bg-white px-3.5 py-3 text-base text-[#0A1533] outline-none transition-colors placeholder:text-[#526078] hover:border-[#526078] focus-visible:border-[#155EEF] focus-visible:ring-2 focus-visible:ring-[#155EEF]/20 sm:px-4"
const labelClassName = "mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#0A1533]"

export default function ContactForm({ serviceGroups, initialService = "", bookingUrl, contactEmail }: { serviceGroups: ServiceGroup[]; initialService?: string; bookingUrl: string | null; contactEmail: string }) {
  const [values, setValues] = useState<FormValues>({ name: "", email: "", company: "", serviceSlug: initialService, message: "", website: "" })
  const [status, setStatus] = useState<{ kind: "idle" | "submitting" | "success" | "error"; message: string }>({ kind: "idle", message: "" })
  const startedAtRef = useRef(Date.now())

  const updateValue = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus({ kind: "submitting", message: "Sending your message." })

    const payload = {
      name: values.name,
      email: values.email,
      company: values.company,
      message: values.message,
      website: values.website,
      startedAt: startedAtRef.current,
      ...(values.serviceSlug ? { serviceSlug: values.serviceSlug } : {}),
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const result = (await response.json().catch(() => null)) as { ok?: boolean; errorCode?: string } | null

      if (!response.ok || !result?.ok) {
        setStatus({ kind: "error", message: getContactErrorMessage(result?.errorCode) })
        return
      }

      setValues({ name: "", email: "", company: "", serviceSlug: initialService, message: "", website: "" })
      startedAtRef.current = Date.now()
      setStatus({ kind: "success", message: "Your message was sent. We will reply directly after reviewing the context." })
    } catch {
      setStatus({ kind: "error", message: getContactErrorMessage("DELIVERY_UNAVAILABLE") })
    }
  }

  return (
    <div>
      <div className="border-b border-[#DCE9FF] pb-6">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#155EEF]">Project intake / Required context</p>
        <h2 id="project-brief-heading" className="mt-3 text-3xl font-semibold text-[#0A1533] sm:text-4xl">Tell us what needs to change.</h2>
        <p id="contact-form-instructions" className="mt-3 max-w-3xl text-sm leading-6 text-[#526078]">Required fields are marked *. Share enough context for us to understand the business, system, or product problem. Do not include passwords, access keys, or other secrets.</p>
      </div>

      {bookingUrl ? (
        <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[4px] border border-[#155EEF] bg-white px-5 py-3 text-sm font-semibold text-[#155EEF] hover:bg-[#DCE9FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF]">
          <CalendarDays className="h-4 w-4" aria-hidden="true" />
          Schedule a conversation
          <span className="sr-only">, opens in a new tab</span>
        </a>
      ) : null}

      <form className="mt-8 space-y-6" onSubmit={handleSubmit} aria-labelledby="project-brief-heading" aria-describedby="contact-form-instructions">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClassName}>Name <span aria-hidden="true">*</span></label>
            <input id="name" name="name" type="text" autoComplete="name" minLength={2} maxLength={100} required value={values.name} onChange={updateValue} className={fieldClassName} placeholder="Your name" />
          </div>
          <div>
            <label htmlFor="email" className={labelClassName}>Email <span aria-hidden="true">*</span></label>
            <input id="email" name="email" type="email" inputMode="email" autoComplete="email" maxLength={254} required value={values.email} onChange={updateValue} className={fieldClassName} placeholder="you@company.com" />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="company" className={labelClassName}>Company or team <span aria-hidden="true">*</span></label>
            <input id="company" name="company" type="text" autoComplete="organization" minLength={1} maxLength={160} required value={values.company} onChange={updateValue} className={fieldClassName} placeholder="Company or team" />
          </div>
          <div>
            <label htmlFor="serviceSlug" className={labelClassName}>Starting point</label>
            <select id="serviceSlug" name="serviceSlug" value={values.serviceSlug} onChange={updateValue} className={fieldClassName}>
              <option value="">Not sure yet</option>
              {serviceGroups.map((group) => (
                <optgroup key={group.practiceTitle} label={group.practiceTitle}>
                  {group.offerings.map((offering) => <option key={offering.slug} value={offering.slug}>{offering.title}</option>)}
                </optgroup>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className={labelClassName}>Project context <span aria-hidden="true">*</span></label>
          <textarea id="message" name="message" required minLength={20} maxLength={5000} rows={8} value={values.message} onChange={updateValue} className={`${fieldClassName} min-h-48 resize-y`} placeholder="What is happening today, what needs to change, and what outcome would make the work useful?" />
        </div>

        <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={updateValue} />
        </div>

        <p className="border-l-2 border-[#155EEF] pl-4 text-sm leading-6 text-[#526078]">Submitting sends this information to Surviant through our email delivery provider. Read our <Link href="/privacy" className="font-semibold text-[#0A1533] underline decoration-[#DCE9FF] underline-offset-4 hover:text-[#155EEF]">privacy policy</Link>.</p>

        <button type="submit" disabled={status.kind === "submitting"} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[4px] bg-[#155EEF] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#0A1533] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF] focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60">
          <Send className="h-5 w-5" aria-hidden="true" />
          {status.kind === "submitting" ? "Sending" : "Send project context"}
        </button>

        {status.kind !== "idle" ? (
          <p role={status.kind === "error" ? "alert" : "status"} aria-live="polite" className={`border-y px-4 py-4 text-sm leading-6 ${status.kind === "success" ? "border-[#155EEF] bg-[#DCE9FF] text-[#0A1533]" : status.kind === "error" ? "border-red-200 bg-red-50 text-red-900" : "border-[#DCE9FF] bg-white text-[#526078]"}`}>{status.message}</p>
        ) : null}

        <p className="text-center text-xs leading-5 text-[#526078]">If the form is unavailable, email <a href={`mailto:${contactEmail}`} className="font-semibold text-[#0A1533] underline decoration-[#DCE9FF] underline-offset-4 hover:text-[#155EEF]">{contactEmail}</a>.</p>
      </form>
    </div>
  )
}
