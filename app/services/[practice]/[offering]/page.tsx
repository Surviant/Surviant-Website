import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

import PageShell from "@/components/page-shell"
import { getOffering, getOfferingBySlug, getPractice, offerings } from "@/lib/content/services"
import { siteConfig } from "@/lib/content/site"
import { createPageMetadata } from "@/lib/seo"

import { Breadcrumbs, Deliverables, deliveryModeContent, ServiceCta, StructuredData } from "../../_components/service-ui"

type OfferingPageProps = { params: Promise<{ practice: string; offering: string }> }

export function generateStaticParams() {
  return offerings.map((offering) => ({ practice: offering.practiceSlug, offering: offering.slug }))
}

export async function generateMetadata({ params }: OfferingPageProps): Promise<Metadata> {
  const { practice: practiceSlug, offering: offeringSlug } = await params
  const offering = getOffering(practiceSlug, offeringSlug)

  if (!offering) return { title: "Service not found", robots: { index: false } }

  const canonical = `/services/${offering.practiceSlug}/${offering.slug}`
  return createPageMetadata({
    title: offering.seo.title,
    description: offering.seo.description,
    path: canonical,
    socialImage: {
      url: `/api/social-card?practice=${offering.practiceSlug}&offering=${offering.slug}`,
      alt: `${offering.title} by Surviant`,
    },
  })
}

export default async function OfferingPage({ params }: OfferingPageProps) {
  const { practice: practiceSlug, offering: offeringSlug } = await params
  const offering = getOffering(practiceSlug, offeringSlug)
  if (!offering) notFound()

  const practice = getPractice(offering.practiceSlug)
  if (!practice) notFound()

  const relatedOfferings = offering.relatedOfferingSlugs.map((slug) => getOfferingBySlug(slug)).filter((item): item is NonNullable<typeof item> => Boolean(item))
  const delivery = deliveryModeContent[offering.deliveryMode]
  const canonical = `${siteConfig.canonicalOrigin}/services/${practice.slug}/${offering.slug}`

  return (
    <PageShell>
      <StructuredData data={{ "@context": "https://schema.org", "@graph": [
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.canonicalOrigin },
          { "@type": "ListItem", position: 2, name: "Services", item: `${siteConfig.canonicalOrigin}/services` },
          { "@type": "ListItem", position: 3, name: practice.title, item: `${siteConfig.canonicalOrigin}/services/${practice.slug}` },
          { "@type": "ListItem", position: 4, name: offering.title, item: canonical },
        ] },
        { "@type": "Service", name: offering.title, serviceType: practice.title, category: practice.title, description: offering.seo.description, url: canonical, provider: { "@type": "Organization", name: siteConfig.brandName, url: siteConfig.canonicalOrigin } },
      ] }} />

      <section className="border-b border-[#DCE9FF] bg-white">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-12 lg:px-8 lg:pb-24">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: practice.title, href: `/services/${practice.slug}` }, { label: offering.title }]} />
          <div className="mt-9 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#155EEF]">{practice.title} / {offering.title}</p>
              <h1 className="mt-5 max-w-5xl text-balance text-5xl font-semibold leading-[0.94] tracking-[-0.055em] sm:text-6xl lg:text-7xl">{offering.headline}</h1>
            </div>
            <div className="border-l-2 border-[#155EEF] pl-5 sm:pl-7">
              <p className="text-lg leading-8 text-[#526078]">{offering.lede}</p>
              <Link href={{ pathname: "/contact", query: { service: offering.slug } }} className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-[4px] bg-[#155EEF] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0A1533] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF] focus-visible:ring-offset-2">Discuss this service <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#DCE9FF] bg-[#F2F6FC] py-16 sm:py-20 lg:py-24" aria-labelledby="problem-heading">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16 lg:px-8">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#155EEF]">The business problem</p>
            <h2 id="problem-heading" className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">What brings this work into focus.</h2>
          </div>
          <p className="max-w-3xl text-xl leading-9 text-[#526078]">{offering.buyerProblem}</p>
        </div>
      </section>

      <section className="border-b border-[#DCE9FF] bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="capabilities-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 border-b border-[#DCE9FF] pb-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end lg:gap-16">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#155EEF]">{delivery.label}</p>
              <h2 id="capabilities-heading" className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">{delivery.title}</h2>
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
              {delivery.steps.map((step) => <p key={step} className="rounded-[3px] border border-[#DCE9FF] bg-[#F2F6FC] px-4 py-3 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-[#0A1533]">{step}</p>)}
            </div>
          </div>

          <div className="grid lg:grid-cols-3">
            {offering.capabilities.map((capability, index) => (
              <article key={capability.title} className={`py-8 lg:px-7 lg:py-10 ${index > 0 ? "border-t border-[#DCE9FF] lg:border-l lg:border-t-0" : ""} ${index === 0 ? "lg:pl-0" : ""} ${index === offering.capabilities.length - 1 ? "lg:pr-0" : ""}`}>
                <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#155EEF]">Capability</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.025em]">{capability.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#526078]">{capability.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#DCE9FF] bg-[#F2F6FC] py-16 sm:py-20 lg:py-24" aria-labelledby="outputs-heading">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:px-8">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#155EEF]">Working outputs</p>
            <h2 id="outputs-heading" className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">What the engagement produces.</h2>
          </div>
          <Deliverables items={offering.deliverables} />
        </div>
      </section>

      <section className="border-b border-[#DCE9FF] bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="fit-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#155EEF]">Fit guidance</p>
          <h2 id="fit-heading" className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Use the approach that matches the constraint.</h2>
          <div className="mt-10 grid border-y border-[#DCE9FF] md:grid-cols-2">
            <article className="py-7 md:pr-8">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#155EEF]">This is useful when</p>
              <p className="mt-4 text-base leading-8 text-[#526078]">{offering.rightFit}</p>
            </article>
            <article className="border-t border-[#DCE9FF] py-7 md:border-l md:border-t-0 md:pl-8">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#155EEF]">A simpler path may be better when</p>
              <p className="mt-4 text-base leading-8 text-[#526078]">{offering.simplerAlternative}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="border-b border-[#DCE9FF] bg-[#F2F6FC] py-14 sm:py-16" aria-labelledby="related-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#155EEF]">Related offerings</p>
          <h2 id="related-heading" className="mt-4 text-3xl font-semibold tracking-[-0.035em]">The adjacent work that often matters.</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {relatedOfferings.map((related) => {
              const relatedPractice = getPractice(related.practiceSlug)
              return (
                <Link key={related.slug} href={`/services/${related.practiceSlug}/${related.slug}`} className="group rounded-[3px] border border-[#DCE9FF] bg-white p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF]">
                  <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#155EEF]">{relatedPractice?.shortTitle}</span>
                  <span className="mt-2 flex items-center justify-between gap-4 text-lg font-semibold group-hover:text-[#155EEF]">{related.title}<ArrowRight className="h-4 w-4 shrink-0 text-[#155EEF] transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
                  <span className="mt-3 block text-sm leading-6 text-[#526078]">{related.headline}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <ServiceCta serviceSlug={offering.slug} title={`Talk with us about ${offering.title.toLowerCase()}.`} />
    </PageShell>
  )
}
