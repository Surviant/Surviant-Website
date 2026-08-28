"use client"

import { useState } from "react"
import { Mail, MapPin, Send, Sparkles } from "lucide-react"

import SiteFooter from "@/components/site-footer"
import SiteHeader from "@/components/site-header"
import { Button } from "@/components/ui/button"

const CONTACT_EMAIL = "contact@surviant.com"

const fieldClassName =
  "min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-base text-slate-950 shadow-sm outline-none transition placeholder:text-slate-500 hover:border-slate-400 focus-visible:border-blue-600 focus-visible:ring-4 focus-visible:ring-blue-100 sm:px-4"

const initialFormData = {
  name: "",
  email: "",
  company: "",
  service: "",
  budget: "",
  timeline: "",
  message: "",
}

export default function ContactPage() {
  const [formData, setFormData] = useState(initialFormData)
  const [workflowStatus, setWorkflowStatus] = useState("")

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const subject = `Project inquiry from ${formData.name}`
    const body = [
      `Name: ${formData.name}`,
      `Company: ${formData.company || "Not provided"}`,
      `Email: ${formData.email}`,
      `Service: ${formData.service}`,
      `Budget: ${formData.budget || "Not specified"}`,
      `Timeline: ${formData.timeline || "Not specified"}`,
      "",
      "Project details:",
      formData.message,
    ].join("\n")

    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    setWorkflowStatus(
      `Opening your email app with a prepared draft to ${CONTACT_EMAIL}. Review and send the draft to complete your inquiry.`,
    )

    window.setTimeout(() => {
      window.location.href = mailtoUrl
    }, 50)
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <SiteHeader />

      <main id="main-content" tabIndex={-1} className="relative isolate overflow-hidden outline-none">
        <div
          className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-b from-sky-50 via-white to-cyan-50/60"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-cyan-200/35 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-36 top-1/3 -z-10 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl"
          aria-hidden="true"
        />

        <section
          aria-labelledby="contact-heading"
          className="mx-auto w-full max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8 lg:pb-24"
        >
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/85 px-4 py-2 text-sm font-semibold text-blue-800 shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Plan your next build with us
            </div>

            <h1
              id="contact-heading"
              className="text-balance text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl"
            >
              Tell us what you want to{" "}
              <span className="bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
                bring to life
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Share the essentials and we will prepare an email to our team. You stay in control of the final message.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.7fr)] lg:items-start lg:gap-10">
            <aside className="space-y-6 lg:sticky lg:top-28" aria-labelledby="contact-details-heading">
              <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-[0_18px_60px_-32px_rgba(15,23,42,0.35)] backdrop-blur sm:p-8">
                <h2 id="contact-details-heading" className="text-2xl font-bold text-slate-950">
                  Contact details
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Prefer to write directly? Use our verified contact address.
                </p>

                <div className="mt-7 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                      <Mail className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-slate-950">Email</h3>
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="mt-1 inline-block break-all rounded text-sm font-medium text-blue-700 underline decoration-blue-300 underline-offset-4 hover:text-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4 sm:text-base"
                      >
                        {CONTACT_EMAIL}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800">
                      <MapPin className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-950">Locations</h3>
                      <ul className="mt-1 space-y-1 text-sm leading-6 text-slate-600 sm:text-base">
                        <li>San Francisco, California</li>
                        <li>Bangalore, India</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-700 to-cyan-700 p-6 text-white shadow-[0_18px_60px_-28px_rgba(29,78,216,0.55)] sm:p-8">
                <h2 className="text-xl font-bold">How this form works</h2>
                <ol className="mt-4 space-y-3 text-sm leading-6 text-blue-50 sm:text-base">
                  <li className="flex gap-3">
                    <span className="font-bold text-white" aria-hidden="true">
                      1.
                    </span>
                    Enter the project details you want to share.
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-white" aria-hidden="true">
                      2.
                    </span>
                    Select Prepare email to open a prefilled draft.
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-white" aria-hidden="true">
                      3.
                    </span>
                    Review the draft and send it from your email app.
                  </li>
                </ol>
              </div>
            </aside>

            <div className="rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.4)] backdrop-blur sm:p-8 lg:p-10">
              <div className="border-b border-slate-200 pb-6">
                <h2 id="project-brief-heading" className="text-2xl font-bold text-slate-950 sm:text-3xl">
                  Project brief
                </h2>
                <p id="contact-form-instructions" className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                  Fields marked with an asterisk are required. Preparing the email does not send it automatically.
                </p>
              </div>

              <form
                className="mt-7 space-y-6"
                onSubmit={handleSubmit}
                aria-labelledby="project-brief-heading"
                aria-describedby="contact-form-instructions"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-800">
                      Name <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className={fieldClassName}
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-800">
                      Email <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={fieldClassName}
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="company" className="mb-2 block text-sm font-semibold text-slate-800">
                      Company
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      value={formData.company}
                      onChange={handleChange}
                      className={fieldClassName}
                      placeholder="Your company or team"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="mb-2 block text-sm font-semibold text-slate-800">
                      Service <span aria-hidden="true">*</span>
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className={fieldClassName}
                    >
                      <option value="">Select a service</option>
                      <option value="Web development">Web development</option>
                      <option value="Mobile application">Mobile application</option>
                      <option value="AI and machine learning">AI and machine learning</option>
                      <option value="Cloud and infrastructure">Cloud and infrastructure</option>
                      <option value="Product design">Product design</option>
                      <option value="Technical consulting">Technical consulting</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="budget" className="mb-2 block text-sm font-semibold text-slate-800">
                      Budget range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className={fieldClassName}
                    >
                      <option value="">Select a budget</option>
                      <option value="$10,000 to $25,000">$10,000 to $25,000</option>
                      <option value="$25,000 to $50,000">$25,000 to $50,000</option>
                      <option value="$50,000 to $100,000">$50,000 to $100,000</option>
                      <option value="$100,000 or more">$100,000 or more</option>
                      <option value="To be determined">To be determined</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="timeline" className="mb-2 block text-sm font-semibold text-slate-800">
                      Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className={fieldClassName}
                    >
                      <option value="">Select a timeline</option>
                      <option value="As soon as possible">As soon as possible</option>
                      <option value="Within 1 month">Within 1 month</option>
                      <option value="1 to 3 months">1 to 3 months</option>
                      <option value="3 to 6 months">3 to 6 months</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-semibold text-slate-800">
                    Project details <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={7}
                    value={formData.message}
                    onChange={handleChange}
                    className={`${fieldClassName} min-h-40 resize-y`}
                    placeholder="Describe the problem, the people you want to serve, and what a successful outcome looks like."
                  />
                </div>

                <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-950">
                  Nothing is sent from this website. Selecting the button below opens your email app with a prepared message to{" "}
                  <span className="font-semibold">{CONTACT_EMAIL}</span>.
                </div>

                <Button
                  type="submit"
                  className="min-h-12 w-full rounded-xl bg-gradient-to-r from-blue-700 to-cyan-700 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blue-700/20 transition hover:from-blue-800 hover:to-cyan-800 hover:shadow-xl focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                >
                  <Send className="h-5 w-5" aria-hidden="true" />
                  Prepare email
                </Button>

                {workflowStatus ? (
                  <p
                    role="status"
                    aria-live="polite"
                    className="rounded-xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm leading-6 text-cyan-950"
                  >
                    {workflowStatus}
                  </p>
                ) : null}
              </form>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
