import { ArrowRight, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { practices } from "@/lib/content/services"
import { siteConfig } from "@/lib/content/site"

const companyLinks = [
  { label: "How We Work", href: "/how-we-work" },
  { label: "Work", href: "/#portfolio" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Research", href: "/research/ai-ml" },
  { label: "Contact", href: "/contact" },
]

export default function SiteFooter() {
  return (
    <footer className="border-t border-[#DCE9FF] bg-[#F2F6FC] text-[#0A1533]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="max-w-md">
            <Link href="/" className="inline-flex min-h-11 items-center gap-3 rounded-[3px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF]" aria-label="Surviant home">
              <Image src="/surviant-logo.jpg" alt="" width={44} height={44} className="h-10 w-10 rounded-[3px] object-cover ring-1 ring-[#DCE9FF]" />
              <span className="font-display text-lg font-semibold">Surviant</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-[#526078]">Software, AI, and operating systems designed as one connected whole.</p>
            <a href={`mailto:${siteConfig.contactEmail}`} className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#0A1533] underline decoration-[#DCE9FF] underline-offset-4 transition-colors hover:text-[#155EEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF]">
              <Mail className="h-4 w-4" aria-hidden="true" />
              {siteConfig.contactEmail}
            </a>
          </div>

          <div>
            <div className="mb-7 flex flex-col gap-3 border-b border-[#DCE9FF] pb-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display text-xl font-semibold">What needs to work better?</p>
                <p className="mt-1 text-sm text-[#526078]">Bring us the business constraint, the system, or the product.</p>
              </div>
              <Link href="/contact" className="inline-flex min-h-11 w-fit items-center gap-2 rounded-[4px] border border-[#155EEF] px-4 py-2 text-sm font-semibold text-[#155EEF] transition-colors hover:bg-[#155EEF] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF] focus-visible:ring-offset-2">
                Start a project
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid gap-8 sm:grid-cols-[1.35fr_0.65fr]">
              <nav aria-label="Service practices">
                <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#526078]">Services</p>
                <ul className="mt-3 space-y-1">
                  {practices.map((practice) => (
                    <li key={practice.slug}>
                      <Link href={`/services/${practice.slug}`} className="inline-flex min-h-11 min-w-11 items-center text-sm font-semibold text-[#0A1533] transition-colors hover:text-[#155EEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF]">{practice.title}</Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/services" className="inline-flex min-h-11 min-w-11 items-center text-sm font-medium text-[#526078] underline decoration-[#DCE9FF] underline-offset-4 hover:text-[#155EEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF]">All services</Link>
                  </li>
                </ul>
              </nav>

              <nav aria-label="Company">
                <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#526078]">Company</p>
                <ul className="mt-3 grid grid-cols-2 gap-x-5 sm:grid-cols-1">
                  {companyLinks.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="inline-flex min-h-11 min-w-11 items-center text-sm font-medium text-[#526078] transition-colors hover:text-[#155EEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF]">{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-[#DCE9FF] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="font-mono text-xs uppercase tracking-[0.1em] text-[#526078]">
            <p>© {new Date().getFullYear()} {siteConfig.legalEntities.join(" / ")}. All rights reserved.</p>
            <p className="mt-1">Bay Area / India</p>
          </div>
          <nav className="flex gap-5" aria-label="Legal">
            <Link href="/privacy" className="inline-flex min-h-11 min-w-11 items-center text-xs font-semibold text-[#526078] hover:text-[#155EEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF]">Privacy</Link>
            <Link href="/terms" className="inline-flex min-h-11 min-w-11 items-center text-xs font-semibold text-[#526078] hover:text-[#155EEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF]">Terms</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
