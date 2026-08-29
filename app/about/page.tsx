import type { Metadata } from "next"
import { ArrowRight, Linkedin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import PageShell from "@/components/page-shell"
import { siteConfig } from "@/lib/content/site"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description: "Meet the product and engineering leaders behind Surviant and learn how the team connects business context, software, AI, and operations.",
  path: "/about",
})

export default function AboutPage() {
  return (
    <PageShell>
      <section className="border-b border-[#DCE9FF] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#155EEF]">About / Surviant</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
            <h1 className="max-w-5xl text-balance text-5xl font-semibold leading-[0.94] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              Product decisions and engineering decisions belong at the same table.
            </h1>
            <p className="border-l-2 border-[#155EEF] pl-5 text-lg leading-8 text-[#526078] sm:pl-7">
              Surviant connects business context, product design, software engineering, and applied AI so the important tradeoffs stay visible from the first decision through production.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[#DCE9FF] bg-[#F2F6FC] py-16 sm:py-20 lg:py-24" aria-labelledby="leaders-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 border-b border-[#DCE9FF] pb-8 lg:grid-cols-[0.6fr_1.4fr] lg:items-end">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#155EEF]">Leadership / Directly involved</p>
            <h2 id="leaders-heading" className="max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl">The people leading the work stay close to the system being built.</h2>
          </div>

          <div className="grid lg:grid-cols-2">
            {siteConfig.leaders.map((leader, index) => (
              <article key={leader.name} className={`grid gap-6 border-b border-[#DCE9FF] py-8 sm:grid-cols-[minmax(10rem,0.75fr)_minmax(0,1fr)] sm:items-end lg:border-b-0 lg:py-10 ${index === 0 ? "lg:pr-10" : "lg:border-l lg:pl-10"}`}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-[#DCE9FF]">
                  <Image src={leader.image} alt={`Portrait of ${leader.name}`} fill sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 1024px) 40vw, 280px" className="object-cover object-[center_12%]" />
                </div>
                <div>
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.13em] text-[#155EEF]">{leader.role}</p>
                  <h3 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">{leader.name}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#526078]">{leader.bio}</p>
                  <a href={leader.linkedin} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#0A1533] underline decoration-[#DCE9FF] underline-offset-4 hover:text-[#155EEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF]">
                    <Linkedin className="h-4 w-4" aria-hidden="true" />
                    LinkedIn profile
                    <span className="sr-only"> for {leader.name}, opens in a new tab</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#DCE9FF] bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="operating-model-heading">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16 lg:px-8">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#155EEF]">Operating model</p>
            <h2 id="operating-model-heading" className="mt-5 text-4xl font-semibold leading-[1] tracking-[-0.045em] sm:text-5xl">One view of the whole problem.</h2>
          </div>
          <div className="border-y border-[#DCE9FF]">
            {[
              ["Business first", "The engagement begins with the operating constraint and the outcome, not a predetermined tool or platform."],
              ["Leaders in the loop", "Product and engineering leadership remain connected to the reviews and decisions that carry the most consequence."],
              ["Cross-border continuity", "The Bay Area and India working model supports direct collaboration and a useful overlap across the delivery day."],
              ["Built for ownership", "Documentation, maintainability, and the path after launch are part of the system design."],
            ].map(([title, body]) => (
              <article key={title} className="grid gap-3 border-t border-[#DCE9FF] py-6 first:border-t-0 sm:grid-cols-[0.55fr_1.45fr] sm:gap-8">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm leading-7 text-[#526078]">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0A1533] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 px-4 py-14 sm:px-6 sm:py-16 lg:flex-row lg:items-end lg:justify-between lg:px-8">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#8CB5FF]">Work with Surviant</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.04em]">Tell us what needs to change in the business or the system.</h2>
          </div>
          <Link href="/contact" className="inline-flex min-h-12 w-fit shrink-0 items-center gap-2 rounded-[4px] bg-white px-5 py-3 text-sm font-semibold text-[#0A1533] hover:bg-[#DCE9FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1533]">
            Start a project
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </PageShell>
  )
}
