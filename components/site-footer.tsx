import { ArrowRight, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const footerNavigation = [
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Technology", href: "/#technology" },
  { label: "Work", href: "/#portfolio" },
  { label: "About", href: "/#about" },
  { label: "AI and ML Research", href: "/research/ai-ml" },
]

export default function SiteFooter() {
  return (
    <footer className="border-t border-[#DCE9FF] bg-[#F2F6FC] text-[#0A1533]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
          <div className="max-w-md">
            <Link href="/" className="inline-flex items-center gap-3" aria-label="Surviant home">
              <Image
                src="/surviant-logo.jpg"
                alt=""
                width={44}
                height={44}
                className="h-10 w-10 rounded-[3px] object-cover ring-1 ring-[#DCE9FF]"
              />
              <span className="font-display text-lg font-semibold">Surviant</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-[#526078]">
              Product strategy, experience design, engineering, and practical AI for teams with software to ship.
            </p>
            <a
              href="mailto:contact@surviant.com"
              className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#0A1533] underline decoration-[#DCE9FF] underline-offset-4 transition-colors hover:text-[#155EEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF]"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              contact@surviant.com
            </a>
          </div>

          <div>
            <div className="mb-7 flex flex-col gap-3 border-b border-[#DCE9FF] pb-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-display text-xl font-semibold">Have a product to ship?</p>
              <Link
                href="/contact"
                className="inline-flex min-h-11 w-fit items-center gap-2 rounded-[4px] border border-[#155EEF] px-4 py-2 text-sm font-semibold text-[#155EEF] transition-colors hover:bg-[#155EEF] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF] focus-visible:ring-offset-2"
              >
                Tell us about it
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <nav className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3" aria-label="Footer navigation">
            {footerNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                  className="text-sm font-medium text-[#526078] transition-colors hover:text-[#155EEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF]"
              >
                {item.label}
              </Link>
            ))}
            </nav>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[#DCE9FF] pt-6 font-mono text-xs uppercase tracking-[0.1em] text-[#526078] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Surviant Technologies. All rights reserved.</p>
          <p>San Francisco / Bangalore</p>
        </div>
      </div>
    </footer>
  )
}
