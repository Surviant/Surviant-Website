import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

import PageShell from "@/components/page-shell"
import { getOfferingsForPractice, practices } from "@/lib/content/services"
import { siteConfig } from "@/lib/content/site"
import { createPageMetadata } from "@/lib/seo"

import { Breadcrumbs, ServiceCta, StructuredData } from "./_components/service-ui"

export const metadata: Metadata = createPageMetadata({
  title: "Services",
  description: "Explore Surviant services across AI Engineering, Product Engineering, and Digital Transformation, with 21 focused ways to improve a business or system.",
  path: "/services",
})

const entryPoints = [
  { signal: "The operation is constrained", title: "Modernize the systems and workflow", body: "Start with Digital Transformation when aging software, manual handoffs, disconnected tools, or unreliable data hold the business back.", href: "/services/digital-transformation" },
  { signal: "The product needs to change", title: "Design and build the software layer", body: "Start with Product Engineering when the priority is a customer product, internal platform, mobile experience, backend, or release foundation.", href: "/services/product-engineering" },
  { signal: "AI needs a useful role", title: "Prove and build the intelligence layer", body: "Start with AI Engineering when a defined task can benefit from models, retrieval, agents, vision, voice, or a measured AI integration.", href: "/services/ai-engineering" },
]

export default function ServicesPage() {
  const itemList = practices.map((practice, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: practice.title,
    url: `${siteConfig.canonicalOrigin}/services/${practice.slug}`,
  }))

  return (
    <PageShell>
      <StructuredData data={{ "@context": "https://schema.org", "@graph": [
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.canonicalOrigin },
          { "@type": "ListItem", position: 2, name: "Services", item: `${siteConfig.canonicalOrigin}/services` },
        ] },
        { "@type": "ItemList", name: "Surviant service practices", itemListElement: itemList },
      ] }} />

      <section className="border-b border-[#DCE9FF] bg-white">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-12 lg:px-8 lg:pb-24">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
          <div className="mt-9 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#155EEF]">Services / Three connected practices</p>
              <h1 className="mt-5 max-w-5xl text-balance text-5xl font-semibold leading-[0.94] tracking-[-0.055em] sm:text-6xl lg:text-7xl">Improve the operation, build the product, and add intelligence where it helps.</h1>
            </div>
            <p className="border-l-2 border-[#155EEF] pl-5 text-lg leading-8 text-[#526078] sm:pl-7">Choose the clearest entry point. We connect the adjacent work when the business problem crosses practice boundaries.</p>
          </div>
        </div>
      </section>

      <section className="border-b border-[#DCE9FF] bg-[#F2F6FC] py-16 sm:py-20 lg:py-24" aria-labelledby="directory-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 border-b border-[#DCE9FF] pb-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end lg:gap-16">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#155EEF]">Directory / 21 offerings</p>
              <h2 id="directory-heading" className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Find the work by practice.</h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-[#526078]">Each offering has a defined problem, concrete outputs, fit guidance, and related services so you can see where the boundaries sit.</p>
          </div>

          <div className="grid lg:grid-cols-3">
            {practices.map((practice, practiceIndex) => {
              const practiceOfferings = getOfferingsForPractice(practice.slug)
              return (
                <section key={practice.slug} className={`py-8 lg:px-7 lg:py-10 ${practiceIndex > 0 ? "border-t border-[#DCE9FF] lg:border-l lg:border-t-0" : ""} ${practiceIndex === 0 ? "lg:pl-0" : ""} ${practiceIndex === practices.length - 1 ? "lg:pr-0" : ""}`} aria-labelledby={`directory-${practice.slug}`}>
                  <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#155EEF]">{practiceOfferings.length} offerings</p>
                  <h3 id={`directory-${practice.slug}`} className="mt-3 text-2xl font-semibold tracking-[-0.025em]">{practice.title}</h3>
                  <p className="mt-4 min-h-[6rem] text-sm leading-7 text-[#526078]">{practice.promise}</p>
                  <Link href={`/services/${practice.slug}`} className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#155EEF] underline decoration-[#DCE9FF] underline-offset-4 hover:text-[#0A1533] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF]">Practice overview <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
                  <ul className="mt-5 border-y border-[#DCE9FF]">
                    {practiceOfferings.map((offering) => (
                      <li key={offering.slug} className="border-t border-[#DCE9FF] first:border-t-0">
                        <Link href={`/services/${practice.slug}/${offering.slug}`} className="group flex min-h-12 items-center justify-between gap-4 py-3 text-sm font-medium text-[#0A1533] hover:text-[#155EEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#155EEF]">
                          {offering.title}
                          <ArrowRight className="h-4 w-4 shrink-0 text-[#155EEF] transition-transform group-hover:translate-x-1" aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-[#DCE9FF] bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="entry-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#155EEF]">Where to start</p>
          <h2 id="entry-heading" className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Use the clearest signal, not the perfect label.</h2>
          <div className="mt-10 border-y border-[#DCE9FF]">
            {entryPoints.map((entry) => (
              <article key={entry.signal} className="grid gap-4 border-t border-[#DCE9FF] py-7 first:border-t-0 lg:grid-cols-[0.55fr_0.85fr_1.1fr_auto] lg:items-center lg:gap-8">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#155EEF]">{entry.signal}</p>
                <h3 className="text-xl font-semibold tracking-[-0.02em]">{entry.title}</h3>
                <p className="text-sm leading-7 text-[#526078]">{entry.body}</p>
                <Link href={entry.href} className="inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold text-[#0A1533] underline decoration-[#DCE9FF] underline-offset-4 hover:text-[#155EEF]">Explore <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ServiceCta />
    </PageShell>
  )
}
