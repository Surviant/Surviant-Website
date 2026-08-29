import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { getOfferingsForPractice, practices } from "@/lib/content/services"

export default function PracticesSection() {
  return (
    <section id="services" className="scroll-mt-24 border-b border-[#DCE9FF] bg-[#F2F6FC] py-16 sm:py-20 lg:py-24" aria-labelledby="practices-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#155EEF]">Services / Three connected practices</p>
            <h2 id="practices-heading" className="mt-5 max-w-xl text-4xl font-semibold leading-[1] tracking-[-0.045em] text-[#0A1533] sm:text-5xl">
              Start with the business constraint. Bring in the disciplines it crosses.
            </h2>
          </div>
          <div className="lg:pt-8">
            <p className="max-w-2xl text-lg leading-8 text-[#526078]">
              Modernization, product work, and AI rarely stay in separate boxes. Our practices make the entry point clear while keeping the whole system connected.
            </p>
            <Link href="/services" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#155EEF] underline decoration-[#DCE9FF] underline-offset-4 hover:text-[#0A1533] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF]">
              View the complete service directory
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="mt-12 border-y border-[#DCE9FF] sm:mt-16">
          {practices.map((practice) => {
            const practiceOfferings = getOfferingsForPractice(practice.slug)

            return (
              <article key={practice.slug} className="grid gap-5 border-t border-[#DCE9FF] py-7 first:border-t-0 lg:grid-cols-[0.6fr_0.95fr_1.05fr_auto] lg:items-center lg:gap-8 lg:py-8">
                <div>
                  <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#155EEF]">{practiceOfferings.length} offerings</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.025em] text-[#0A1533]">{practice.title}</h3>
                </div>
                <p className="text-sm leading-7 text-[#526078]">{practice.promise}</p>
                <p className="font-mono text-xs leading-6 text-[#526078]">
                  {practiceOfferings.slice(0, 4).map((offering) => offering.shortTitle).join(" / ")}
                  {practiceOfferings.length > 4 ? " / and more" : ""}
                </p>
                <Link href={`/services/${practice.slug}`} className="group inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold text-[#0A1533] underline decoration-[#DCE9FF] underline-offset-4 hover:text-[#155EEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF]">
                  Explore practice
                  <ArrowRight className="h-4 w-4 text-[#155EEF] transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
