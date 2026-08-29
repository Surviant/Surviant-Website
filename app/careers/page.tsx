import type { Metadata } from "next"
import { Mail } from "lucide-react"

import PageShell from "@/components/page-shell"
import { siteConfig } from "@/lib/content/site"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Careers",
  description: "Career opportunities at Surviant across product engineering, AI engineering, and digital transformation.",
  path: "/careers",
})

export default function CareersPage() {
  return (
    <PageShell>
      <section className="border-b border-[#DCE9FF] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#155EEF]">Careers / Surviant</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
            <h1 className="max-w-5xl text-balance text-5xl font-semibold leading-[0.94] tracking-[-0.055em] sm:text-6xl lg:text-7xl">Build systems that matter to the people running them.</h1>
            <p className="border-l-2 border-[#155EEF] pl-5 text-lg leading-8 text-[#526078] sm:pl-7">Surviant works across software, AI, and operations. We value clear thinking, careful execution, and honest technical judgment.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#F2F6FC] py-16 sm:py-20 lg:py-24" aria-labelledby="openings-heading">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[4px] border border-[#DCE9FF] bg-white p-7 sm:p-10">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#155EEF]">Current openings</p>
            <h2 id="openings-heading" className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">There are no open roles right now.</h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#526078]">When a role opens, it will appear here with the responsibilities, working arrangement, and application process clearly described.</p>
            <a href={`mailto:${siteConfig.contactEmail}?subject=Careers%20at%20Surviant`} className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#155EEF] underline decoration-[#DCE9FF] underline-offset-4 hover:text-[#0A1533] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF]">
              <Mail className="h-4 w-4" aria-hidden="true" />
              Ask a careers question
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
