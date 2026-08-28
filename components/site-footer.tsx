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
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-12 border-b border-white/10 pb-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">
              Have a product in mind?
            </p>
            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Let&apos;s turn the idea into a useful, dependable product.
            </h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex w-fit items-center gap-3 rounded-full bg-white px-6 py-3.5 text-base font-semibold text-slate-950 transition-colors hover:bg-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 lg:justify-self-end"
          >
            Start a conversation
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-10 py-12 md:grid-cols-[1fr_1.2fr]">
          <div className="max-w-md">
            <Link href="/" className="inline-flex items-center gap-3" aria-label="Surviant home">
              <Image
                src="/surviant-logo.jpg"
                alt=""
                width={44}
                height={44}
                className="h-11 w-11 rounded-xl object-cover ring-1 ring-white/15"
              />
              <span className="font-bold uppercase tracking-[0.22em]">Surviant</span>
            </Link>
            <p className="mt-5 text-sm leading-7 text-slate-400">
              Product strategy, experience design, engineering, and practical AI for teams building what comes next.
            </p>
            <a
              href="mailto:contact@surviant.com"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white underline decoration-slate-600 underline-offset-4 transition-colors hover:text-cyan-300"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              contact@surviant.com
            </a>
          </div>

          <nav className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3" aria-label="Footer navigation">
            {footerNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Surviant Technologies. All rights reserved.</p>
          <p>Strategy, design, engineering, and AI.</p>
        </div>
      </div>
    </footer>
  )
}
