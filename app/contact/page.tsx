"use client"

import { Mail, MapPin, Send } from "lucide-react"
import { useState } from "react"

import SiteFooter from "@/components/site-footer"
import SiteHeader from "@/components/site-header"

const CONTACT_EMAIL = "contact@surviant.com"

const fieldClassName =
  "min-h-12 w-full rounded-[4px] border border-[#DCE9FF] bg-white px-3.5 py-3 text-base text-[#0A1533] outline-none transition-colors placeholder:text-[#526078]/70 hover:border-[#526078] focus-visible:border-[#155EEF] focus-visible:ring-2 focus-visible:ring-[#155EEF]/20 sm:px-4"

const labelClassName =
  "mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#0A1533]"

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
      `Your email app should now be open with a draft addressed to ${CONTACT_EMAIL}. Review and send it when ready. If no draft opened, email us directly.`,
    )

    window.setTimeout(() => {
      window.location.href = mailtoUrl
    }, 80)
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
    <div className="min-h-screen bg-white text-[#0A1533]">
      <SiteHeader />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <section aria-labelledby="contact-heading" className="border-b border-[#DCE9FF] bg-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16 lg:px-8 lg:py-24">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#155EEF]">
                Project intake
              </p>
              <h1
                id="contact-heading"
                className="mt-5 max-w-4xl text-balance text-5xl font-semibold leading-[0.95] tracking-[-0.055em] text-[#0A1533] sm:text-6xl lg:text-7xl"
              >
                Tell us what you are building.
              </h1>
            </div>
            <p className="max-w-xl border-l-2 border-[#155EEF] pl-5 text-lg leading-8 text-[#526078] sm:pl-7">
              Share the context, constraints, and outcome you need. We will prepare an email draft for you to review
              and send.
            </p>
          </div>
        </section>

        <section className="bg-[#F2F6FC]" aria-labelledby="project-brief-heading">
          <div className="mx-auto grid max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(15rem,0.65fr)_minmax(0,1.35fr)] lg:px-8 lg:py-24">
            <aside
              className="border-b border-[#DCE9FF] pb-10 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10"
              aria-labelledby="contact-details-heading"
            >
              <div>
                <h2 id="contact-details-heading" className="text-2xl font-semibold text-[#0A1533]">
                  Contact
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#526078]">
                  Prefer to start with email? Write to {CONTACT_EMAIL}.
                </p>
              </div>

              <dl className="mt-7 border-y border-[#DCE9FF]">
                <div className="grid grid-cols-[2.25rem_1fr] gap-3 border-b border-[#DCE9FF] py-5">
                  <Mail className="mt-0.5 h-5 w-5 text-[#155EEF]" aria-hidden="true" />
                  <div>
                    <dt className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#526078]">
                      Email
                    </dt>
                    <dd>
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="mt-2 inline-block break-all text-sm font-semibold text-[#0A1533] underline decoration-[#DCE9FF] underline-offset-4 hover:text-[#155EEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF]"
                      >
                        {CONTACT_EMAIL}
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="grid grid-cols-[2.25rem_1fr] gap-3 py-5">
                  <MapPin className="mt-0.5 h-5 w-5 text-[#155EEF]" aria-hidden="true" />
                  <div>
                    <dt className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#526078]">
                      Locations
                    </dt>
                    <dd className="mt-2 text-sm leading-6 text-[#0A1533]">
                      San Francisco, California
                      <br />
                      Bangalore, India
                    </dd>
                  </div>
                </div>
              </dl>

              <div className="mt-10">
                <h2 className="text-xl font-semibold text-[#0A1533]">How it works</h2>
                <ol className="mt-5 space-y-5">
                  {[
                    "Complete the project brief.",
                    "Select Open email draft.",
                    "Review the message and send it from your email app.",
                  ].map((step, index) => (
                    <li key={step} className="grid grid-cols-[2.25rem_1fr] gap-3 text-sm leading-6 text-[#526078]">
                      <span className="font-mono text-xs font-semibold text-[#155EEF]" aria-hidden="true">
                        0{index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </aside>

            <div className="pt-10 lg:pl-12 lg:pt-0">
              <div className="border-b border-[#DCE9FF] pb-6">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#155EEF]">
                  Intake / Required context
                </p>
                <h2 id="project-brief-heading" className="mt-3 text-3xl font-semibold text-[#0A1533] sm:text-4xl">
                  Project brief
                </h2>
                <p id="contact-form-instructions" className="mt-3 max-w-3xl text-sm leading-6 text-[#526078]">
                  Required fields are marked *. Selecting Open email draft creates a draft in your email app. Nothing
                  is sent until you send it.
                </p>
              </div>

              <form
                className="mt-8 space-y-6"
                onSubmit={handleSubmit}
                aria-labelledby="project-brief-heading"
                aria-describedby="contact-form-instructions"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={labelClassName}>
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
                    <label htmlFor="email" className={labelClassName}>
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
                    <label htmlFor="company" className={labelClassName}>
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
                      placeholder="Company or team"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className={labelClassName}>
                      Starting point <span aria-hidden="true">*</span>
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className={fieldClassName}
                    >
                      <option value="">Select a starting point</option>
                      <option value="Product direction">Product direction</option>
                      <option value="Experience design">Experience design</option>
                      <option value="Product engineering">Product engineering</option>
                      <option value="Applied AI">Applied AI</option>
                      <option value="Cloud and delivery">Cloud and delivery</option>
                      <option value="Technical consulting">Technical consulting</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="budget" className={labelClassName}>
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
                    <label htmlFor="timeline" className={labelClassName}>
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
                  <label htmlFor="message" className={labelClassName}>
                    Project details <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={7}
                    value={formData.message}
                    onChange={handleChange}
                    className={`${fieldClassName} min-h-44 resize-y`}
                    placeholder="What are you building, who is it for, and what outcome would make the project successful?"
                  />
                </div>

                <div className="border-l-2 border-[#155EEF] pl-4 text-sm leading-6 text-[#526078]">
                  This website does not send or store your message. The button opens a draft addressed to{" "}
                  <span className="font-semibold text-[#0A1533]">{CONTACT_EMAIL}</span>.
                </div>

                <button
                  type="submit"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[4px] bg-[#155EEF] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#0A1533] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF] focus-visible:ring-offset-2"
                >
                  <Send className="h-5 w-5" aria-hidden="true" />
                  Open email draft
                </button>

                {workflowStatus ? (
                  <p
                    role="status"
                    aria-live="polite"
                    className="border-y border-[#DCE9FF] bg-white px-4 py-4 text-sm leading-6 text-[#0A1533]"
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
