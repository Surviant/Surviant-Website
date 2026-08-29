import type { Metadata } from "next"
import { Mail, MapPin } from "lucide-react"

import ContactForm from "@/components/contact-form"
import PageShell from "@/components/page-shell"
import { resolveInitialServiceSlug } from "@/lib/contact"
import { publicOfferingOptions } from "@/lib/content/services"
import { siteConfig } from "@/lib/content/site"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description: "Start a conversation with Surviant about AI engineering, product engineering, digital transformation, or a system that needs to work better.",
  path: "/contact",
})

type ContactPageProps = { searchParams: Promise<{ service?: string }> }

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { service } = await searchParams
  const initialService = resolveInitialServiceSlug(service)
  const serviceGroups = publicOfferingOptions.map((group) => ({
    practiceTitle: group.practiceTitle,
    offerings: group.offerings.map((offering) => ({ slug: offering.slug, title: offering.title })),
  }))

  return (
    <PageShell>
      <section aria-labelledby="contact-heading" className="border-b border-[#DCE9FF] bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16 lg:px-8 lg:py-24">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#155EEF]">Contact / Start with the context</p>
            <h1 id="contact-heading" className="mt-5 max-w-4xl text-balance text-5xl font-semibold leading-[0.95] tracking-[-0.055em] text-[#0A1533] sm:text-6xl lg:text-7xl">What needs to work better?</h1>
          </div>
          <p className="max-w-xl border-l-2 border-[#155EEF] pl-5 text-lg leading-8 text-[#526078] sm:pl-7">Share the business constraint, the system involved, and the outcome you need. A finished brief is not required.</p>
        </div>
      </section>

      <section className="bg-[#F2F6FC]" aria-labelledby="project-brief-heading">
        <div className="mx-auto grid max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(15rem,0.65fr)_minmax(0,1.35fr)] lg:px-8 lg:py-24">
          <aside className="border-b border-[#DCE9FF] pb-10 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10" aria-labelledby="contact-details-heading">
            <h2 id="contact-details-heading" className="text-2xl font-semibold">Contact Surviant</h2>
            <p className="mt-3 text-sm leading-7 text-[#526078]">Use the form or write directly. We will review the context and reply without making you repeat the brief.</p>

            <dl className="mt-7 border-y border-[#DCE9FF]">
              <div className="grid grid-cols-[2.25rem_1fr] gap-3 border-b border-[#DCE9FF] py-5">
                <Mail className="mt-0.5 h-5 w-5 text-[#155EEF]" aria-hidden="true" />
                <div>
                  <dt className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#526078]">Email</dt>
                  <dd><a href={`mailto:${siteConfig.contactEmail}`} className="mt-1 inline-flex min-h-11 items-center break-all text-sm font-semibold text-[#0A1533] underline decoration-[#DCE9FF] underline-offset-4 hover:text-[#155EEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF]">{siteConfig.contactEmail}</a></dd>
                </div>
              </div>
              <div className="grid grid-cols-[2.25rem_1fr] gap-3 py-5">
                <MapPin className="mt-0.5 h-5 w-5 text-[#155EEF]" aria-hidden="true" />
                <div>
                  <dt className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#526078]">Working locations</dt>
                  <dd className="mt-2 text-sm leading-6 text-[#0A1533]">Bay Area<br />India</dd>
                </div>
              </div>
            </dl>

            <div className="mt-9 border-l-2 border-[#155EEF] pl-4">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#155EEF]">Useful context</p>
              <p className="mt-3 text-sm leading-7 text-[#526078]">What happens today, who depends on it, what is getting in the way, and what a useful result would change.</p>
            </div>
          </aside>

          <div className="pt-10 lg:pl-12 lg:pt-0">
            <ContactForm serviceGroups={serviceGroups} initialService={initialService} bookingUrl={siteConfig.bookingUrl} contactEmail={siteConfig.contactEmail} />
          </div>
        </div>
      </section>
    </PageShell>
  )
}
