import type { Metadata } from "next"
import { ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"

import SiteFooter from "@/components/site-footer"
import SiteHeader from "@/components/site-header"
import { createPageMetadata } from "@/lib/seo"

import { comparisonMatrix, techData } from "./tech-data"

export const metadata: Metadata = createPageMetadata({
  title: "Applied AI and ML Research",
  description:
    "A working map of proven, emerging, and exploratory AI and machine learning methods for product engineering decisions.",
  path: "/research/ai-ml",
  type: "article",
})

const maturityOrder = ["mature", "emerging", "cutting"] as const

type MaturityKey = (typeof maturityOrder)[number]

const maturityMeta: Record<
  MaturityKey,
  {
    order: string
    state: string
    title: string
    description: string
  }
> = {
  mature: {
    order: "01",
    state: "Production",
    title: "Production-ready methods",
    description:
      "Methods with stable tooling, understood failure modes, and established deployment patterns. Inclusion does not mean every project uses them.",
  },
  emerging: {
    order: "02",
    state: "Evaluating",
    title: "Methods under evaluation",
    description:
      "Methods with credible implementations and growing adoption. We validate them through bounded prototypes before recommending production use.",
  },
  cutting: {
    order: "03",
    state: "Watching",
    title: "Research watchlist",
    description:
      "Early methods tracked through papers, reference implementations, and small experiments. These are not presented as client-ready capabilities.",
  },
}

export default function AIMLPage() {
  return (
    <div className="min-h-screen bg-white text-[#0A1533]">
      <SiteHeader />

      <main id="main-content" tabIndex={-1}>
        <section className="border-b border-[#DCE9FF] bg-white" aria-labelledby="research-heading">
          <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-12 lg:px-8 lg:pb-24">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#526078] underline decoration-[#DCE9FF] underline-offset-4 transition-colors hover:text-[#155EEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Surviant
            </Link>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#155EEF]">
                  Surviant engineering reference / AI + ML
                </p>
                <h1
                  id="research-heading"
                  className="mt-5 max-w-5xl text-balance text-5xl font-semibold leading-[0.94] tracking-[-0.055em] text-[#0A1533] sm:text-6xl lg:text-7xl"
                >
                  AI and machine learning capability reference.
                </h1>
              </div>

              <dl className="border-y border-[#DCE9FF] text-sm">
                {[
                  ["Purpose", "Support product and architecture planning"],
                  ["Scope", "Methods relevant to current AI and ML work"],
                  ["Status", "Working reference"],
                  ["Reviewed", "August 28, 2026"],
                ].map(([term, description]) => (
                  <div key={term} className="grid grid-cols-[6rem_1fr] gap-4 border-t border-[#DCE9FF] py-4 first:border-t-0">
                    <dt className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#155EEF]">
                      {term}
                    </dt>
                    <dd className="leading-6 text-[#526078]">{description}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-12 grid gap-4 border-l-2 border-[#155EEF] pl-5 sm:pl-7 lg:grid-cols-[11rem_1fr] lg:gap-8">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#155EEF]">
                Classification method
              </p>
              <p className="max-w-4xl text-sm leading-7 text-[#526078] sm:text-base">
                Readiness describes the maturity of the method and its supporting ecosystem. Selection still depends
                on data, security, latency, cost, maintainability, and measurable user value.
              </p>
            </div>

            <nav className="mt-14 border-y border-[#DCE9FF]" aria-label="Research maturity sections">
              {maturityOrder.map((levelKey) => {
                const meta = maturityMeta[levelKey]

                return (
                  <a
                    key={levelKey}
                    href={`#${levelKey}-heading`}
                    className="grid gap-2 border-t border-[#DCE9FF] px-1 py-5 first:border-t-0 sm:grid-cols-[10rem_1fr_auto] sm:items-center sm:gap-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#155EEF]"
                  >
                    <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#155EEF]">
                      {meta.order} / {meta.state}
                    </span>
                    <span className="font-display text-lg font-semibold text-[#0A1533]">{meta.title}</span>
                    <span className="font-mono text-xs uppercase tracking-[0.12em] text-[#526078]">Jump to section</span>
                  </a>
                )
              })}
            </nav>
          </div>
        </section>

        <div className="mx-auto max-w-7xl space-y-20 px-4 py-16 sm:space-y-24 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          {maturityOrder.map((levelKey) => {
            const level = techData[levelKey]
            const meta = maturityMeta[levelKey]
            const headingId = `${levelKey}-heading`

            return (
              <section key={levelKey} aria-labelledby={headingId}>
                <div className="grid gap-6 border-b border-[#DCE9FF] pb-7 lg:grid-cols-[0.75fr_1.25fr] lg:items-end lg:gap-16">
                  <div>
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#155EEF]">
                      Maturity / {meta.state}
                    </p>
                    <h2
                      id={headingId}
                      className="mt-4 scroll-mt-24 text-3xl font-semibold leading-tight tracking-[-0.035em] text-[#0A1533] sm:text-4xl"
                    >
                      {meta.title}
                    </h2>
                  </div>
                  <p className="max-w-2xl text-sm leading-7 text-[#526078] sm:text-base">{meta.description}</p>
                </div>

                <div className="border-b border-[#DCE9FF]">
                  {level.sections.map((section) => (
                    <details key={section.id} className="group border-t border-[#DCE9FF] first:border-t-0">
                      <summary className="grid cursor-pointer list-none gap-4 px-1 py-6 marker:content-none sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#155EEF]">
                        <span>
                          <span className="font-display block text-xl font-semibold text-[#0A1533] sm:text-2xl">
                            {section.category}
                          </span>
                          <span className="mt-2 block max-w-3xl text-sm leading-6 text-[#526078]">
                            {section.description}
                          </span>
                        </span>
                        <span className="flex items-center gap-5 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#155EEF]">
                          <span>{section.technologies.length} entries</span>
                          <span aria-hidden="true">
                            <span className="group-open:hidden">Open</span>
                            <span className="hidden group-open:inline">Close</span>
                          </span>
                        </span>
                      </summary>

                      <ul className="border-t border-[#DCE9FF] bg-[#F2F6FC]">
                        {section.technologies.map((technology) => (
                          <li
                            key={technology.name}
                            className="grid gap-2 border-t border-[#DCE9FF] px-4 py-5 first:border-t-0 sm:grid-cols-[minmax(12rem,0.75fr)_minmax(0,1.25fr)] sm:gap-8 sm:px-5"
                          >
                            <h3 className="text-sm font-semibold leading-6 text-[#0A1533]">{technology.name}</h3>
                            <div>
                              <p className="text-sm leading-6 text-[#526078]">{technology.desc}</p>
                              <a
                                href={technology.sourceUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-3 inline-flex min-h-11 items-center gap-2 text-xs font-semibold text-[#155EEF] underline decoration-[#A9C7FF] underline-offset-4 hover:text-[#0A1533] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF]"
                              >
                                {technology.sourceLabel}
                                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                                <span className="sr-only">, opens in a new tab</span>
                              </a>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ))}
                </div>
              </section>
            )
          })}

          <section aria-labelledby="comparison-heading">
            <div className="grid gap-6 border-b border-[#DCE9FF] pb-7 lg:grid-cols-[0.75fr_1.25fr] lg:items-end lg:gap-16">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#155EEF]">
                  Reference / At a glance
                </p>
                <h2
                  id="comparison-heading"
                  className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-[#0A1533] sm:text-4xl"
                >
                  Compare the maturity bands.
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-[#526078] sm:text-base">
                This table is a navigation aid for product conversations. Readiness still depends on the use case,
                data, risk, operating cost, and quality threshold.
              </p>
            </div>

            <div
              role="region"
              aria-label="AI and machine learning maturity comparison table"
              tabIndex={0}
              className="overflow-x-auto border-b border-[#DCE9FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF]"
            >
              <p className="border-b border-[#DCE9FF] px-5 py-3 text-xs text-[#526078] sm:hidden">
                Scroll horizontally to compare columns.
              </p>
              <table className="w-full min-w-[760px] border-collapse text-left">
                <caption className="sr-only">
                  Comparison of production, evaluating, and watching approaches by AI and machine learning category
                </caption>
                <thead className="bg-[#F2F6FC]">
                  <tr className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#526078]">
                    <th scope="col" className="px-5 py-4 sm:px-6">Category</th>
                    <th scope="col" className="px-5 py-4 sm:px-6">Production-ready</th>
                    <th scope="col" className="px-5 py-4 sm:px-6">Under evaluation</th>
                    <th scope="col" className="px-5 py-4 sm:px-6">Research watchlist</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonMatrix.map((row) => (
                    <tr key={row.category} className="border-t border-[#DCE9FF] align-top">
                      <th scope="row" className="px-5 py-5 text-sm font-semibold text-[#0A1533] sm:px-6">
                        {row.category}
                      </th>
                      <td className="px-5 py-5 text-sm leading-6 text-[#526078] sm:px-6">{row.mature}</td>
                      <td className="px-5 py-5 text-sm leading-6 text-[#526078] sm:px-6">{row.emerging}</td>
                      <td className="px-5 py-5 text-sm leading-6 text-[#526078] sm:px-6">{row.cutting}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
