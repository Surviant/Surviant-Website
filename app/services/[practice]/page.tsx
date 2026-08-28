import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

import PageShell from "@/components/page-shell"
import { getOfferingsForPractice, getPractice, practiceSlugs } from "@/lib/content/services"
import { siteConfig } from "@/lib/content/site"
import { createPageMetadata } from "@/lib/seo"

import { Breadcrumbs, ServiceCta, StructuredData } from "../_components/service-ui"

type PracticePageProps = { params: Promise<{ practice: string }> }

export function generateStaticParams() {
  return practiceSlugs.map((practice) => ({ practice }))
}

export async function generateMetadata({ params }: PracticePageProps): Promise<Metadata> {
  const { practice: practiceSlug } = await params
  const practice = getPractice(practiceSlug)

  if (!practice) return { title: "Service not found", robots: { index: false } }

  const canonical = `/services/${practice.slug}`
  return createPageMetadata({
    title: practice.seo.title,
    description: practice.seo.description,
    path: canonical,
    socialImage: {
      url: `/api/social-card?practice=${practice.slug}`,
      alt: `${practice.title} by Surviant`,
    },
  })
}

export default async function PracticePage({ params }: PracticePageProps) {
  const { practice: practiceSlug } = await params
  const practice = getPractice(practiceSlug)
  if (!practice) notFound()

  const practiceOfferings = getOfferingsForPractice(practice.slug)
  const relatedPractices = practice.relatedPracticeSlugs.map((slug) => getPractice(slug)).filter((item): item is NonNullable<typeof item> => Boolean(item))
  const offeringBySlug = new Map(practiceOfferings.map((offering) => [offering.slug, offering]))
  const canonical = `${siteConfig.canonicalOrigin}/services/${practice.slug}`

  return (
    <PageShell>
      <StructuredData data={{ "@context": "https://schema.org", "@graph": [
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.canonicalOrigin },
          { "@type": "ListItem", position: 2, name: "Services", item: `${siteConfig.canonicalOrigin}/services` },
          { "@type": "ListItem", position: 3, name: practice.title, item: canonical },
        ] },
        {
          "@type": "Service",
          name: practice.title,
          description: practice.seo.description,
          url: canonical,
          provider: { "@type": "Organization", name: siteConfig.brandName, url: siteConfig.canonicalOrigin },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `${practice.title} offerings`,
            itemListElement: practiceOfferings.map((offering) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: offering.title, url: `${canonical}/${offering.slug}` } })),
          },
        },
      ] }} />

      <section className="border-b border-[#DCE9FF] bg-white">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-12 lg:px-8 lg:pb-24">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: practice.title }]} />
          <div className="mt-9 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#155EEF]">{practice.eyebrow}</p>
              <h1 className="mt-5 max-w-5xl text-balance text-5xl font-semibold leading-[0.94] tracking-[-0.055em] sm:text-6xl lg:text-7xl">{practice.promise}</h1>
            </div>
            <div className="border-l-2 border-[#155EEF] pl-5 sm:pl-7">
              <p className="text-lg leading-8 text-[#526078]">{practice.buyerContext}</p>
              <Link href="/contact" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-[4px] bg-[#155EEF] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0A1533] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF] focus-visible:ring-offset-2">Discuss this practice <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#DCE9FF] bg-[#F2F6FC] py-16 sm:py-20 lg:py-24" aria-labelledby="offerings-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 border-b border-[#DCE9FF] pb-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end lg:gap-16">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#155EEF]">Offering directory / {practiceOfferings.length}</p>
              <h2 id="offerings-heading" className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Ways to enter the practice.</h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-[#526078]">{practice.summary}</p>
          </div>

          <ul className="border-b border-[#DCE9FF]">
            {practiceOfferings.map((offering) => (
              <li key={offering.slug} className="border-t border-[#DCE9FF] first:border-t-0">
                <Link href={`/services/${practice.slug}/${offering.slug}`} className="group grid min-h-24 gap-3 py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#155EEF] sm:grid-cols-[0.7fr_1.3fr_auto] sm:items-center sm:gap-8">
                  <div>
                    <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#155EEF]">{offering.deliveryMode}</p>
                    <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-[#0A1533] group-hover:text-[#155EEF]">{offering.title}</h3>
                  </div>
                  <p className="text-sm leading-7 text-[#526078]">{offering.headline}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0A1533]">Explore <ArrowRight className="h-4 w-4 text-[#155EEF] transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-[#DCE9FF] bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="useful-heading">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16 lg:px-8">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#155EEF]">When this practice is useful</p>
            <h2 id="useful-heading" className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Start here when the constraint crosses a system boundary.</h2>
          </div>
          <ul className="border-y border-[#DCE9FF]">
            {practice.whenUseful.map((item) => (
              <li key={item} className="border-t border-[#DCE9FF] py-5 text-base leading-8 text-[#526078] first:border-t-0">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-[#DCE9FF] bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="relationship-heading">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16 lg:px-8">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#155EEF]">How the work connects</p>
            <h2 id="relationship-heading" className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">{practice.relationshipTitle}</h2>
            <p className="mt-5 text-base leading-8 text-[#526078]">{practice.relationshipBody}</p>
          </div>
          <ol className="grid gap-3 lg:grid-cols-3" aria-label={`How ${practice.title} offerings work together`}>
            {practice.relationshipGroups.map((group, index) => (
              <li key={group.label} className="relative rounded-[3px] border border-[#DCE9FF] bg-[#F2F6FC] p-5">
                {index < practice.relationshipGroups.length - 1 ? (
                  <ArrowRight className="absolute -right-3 top-7 z-10 hidden h-5 w-5 rounded-[3px] bg-white text-[#155EEF] lg:block" aria-hidden="true" />
                ) : null}
                <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#155EEF]">{group.label}</p>
                <p className="mt-3 min-h-16 text-sm leading-6 text-[#526078]">{group.summary}</p>
                <ul className="mt-5 border-y border-[#DCE9FF] bg-white px-3">
                  {group.offeringSlugs.map((slug) => {
                    const offering = offeringBySlug.get(slug)
                    if (!offering) return null

                    return (
                      <li key={slug} className="border-t border-[#DCE9FF] first:border-t-0">
                        <Link href={`/services/${practice.slug}/${offering.slug}`} className="flex min-h-11 items-center justify-between gap-3 py-2 text-xs font-semibold text-[#0A1533] hover:text-[#155EEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF]">
                          {offering.shortTitle}
                          <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#155EEF]" aria-hidden="true" />
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-[#DCE9FF] bg-[#F2F6FC] py-14 sm:py-16" aria-labelledby="related-practices-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#155EEF]">Connected practices</p>
          <h2 id="related-practices-heading" className="mt-4 text-3xl font-semibold tracking-[-0.035em]">The system may cross into adjacent work.</h2>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {relatedPractices.map((relatedPractice) => (
              <Link key={relatedPractice.slug} href={`/services/${relatedPractice.slug}`} className="group rounded-[3px] border border-[#DCE9FF] bg-white p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF]">
                <span className="flex items-center justify-between gap-4 text-lg font-semibold group-hover:text-[#155EEF]">{relatedPractice.title}<ArrowRight className="h-4 w-4 text-[#155EEF] transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
                <span className="mt-3 block text-sm leading-7 text-[#526078]">{relatedPractice.summary}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ServiceCta title={`Talk with us about ${practice.title.toLowerCase()}.`} />
    </PageShell>
  )
}
