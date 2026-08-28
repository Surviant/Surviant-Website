import { ArrowRight, Mail } from "lucide-react"
import Link from "next/link"

import { siteConfig } from "@/lib/content/site"

export default function ContactCtaSection() {
  return (
    <section className="border-b border-[#DCE9FF] bg-[#0A1533] text-white" aria-labelledby="contact-cta-heading">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-end lg:px-8 lg:py-20">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#8CB5FF]">Start a conversation</p>
          <h2 id="contact-cta-heading" className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
            Bring us the business constraint, the system problem, or the product you need to ship.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#DCE9FF]">
            We will help you identify the useful first move and tell you when a simpler approach is the better answer.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[4px] bg-white px-5 py-3 text-sm font-semibold text-[#0A1533] transition-colors hover:bg-[#DCE9FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1533]">
            Start a project
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <a href={`mailto:${siteConfig.contactEmail}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[4px] border border-white/40 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
            <Mail className="h-4 w-4" aria-hidden="true" />
            {siteConfig.contactEmail}
          </a>
        </div>
      </div>
    </section>
  )
}
