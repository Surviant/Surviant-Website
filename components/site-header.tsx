"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { ArrowUpRight, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const navigation = [
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Technology", href: "/#technology" },
  { label: "Work", href: "/#portfolio" },
  { label: "About", href: "/#about" },
  { label: "Research", href: "/research/ai-ml" },
]

export default function SiteHeader() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 12)
    updateScrolled()
    window.addEventListener("scroll", updateScrolled, { passive: true })
    return () => window.removeEventListener("scroll", updateScrolled)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <>
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-[100] -translate-y-24 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      >
        Skip to content
      </a>

      <header
        className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
          scrolled
            ? "border-slate-200/80 bg-white/95 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl"
            : "border-transparent bg-white/90 backdrop-blur-xl"
        }`}
      >
        <div className="mx-auto flex h-[4.75rem] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-4"
            aria-label="Surviant home"
          >
            <Image
              src="/surviant-logo.jpg"
              alt=""
              width={48}
              height={48}
              className="h-11 w-11 rounded-xl object-cover ring-1 ring-slate-200 transition-transform duration-200 group-hover:scale-[1.03]"
              priority
            />
            <span className="text-sm font-bold uppercase tracking-[0.22em] text-slate-900 sm:text-base">
              Surviant
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {navigation.map((item) => {
              const isCurrent = item.href === pathname
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isCurrent ? "page" : undefined}
                  className={`rounded-full px-3.5 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 ${
                    isCurrent
                      ? "bg-blue-50 text-blue-800"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="hidden items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 sm:inline-flex"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>

            <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
              <Dialog.Trigger asChild>
                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-sm transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 lg:hidden"
                  aria-label="Open navigation menu"
                >
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </button>
              </Dialog.Trigger>

              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-[70] bg-slate-950/35 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out data-[state=open]:fade-in" />
                <Dialog.Content className="fixed inset-y-0 right-0 z-[80] flex w-full max-w-sm flex-col border-l border-slate-200 bg-white p-6 shadow-2xl outline-none data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-5">
                    <Dialog.Title className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900">
                      Navigation
                    </Dialog.Title>
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-900 transition-colors hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
                        aria-label="Close navigation menu"
                      >
                        <X className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </Dialog.Close>
                  </div>

                  <nav className="flex flex-1 flex-col gap-1 py-6" aria-label="Mobile navigation">
                    {navigation.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center justify-between rounded-2xl px-4 py-3 text-lg font-semibold text-slate-800 transition-colors hover:bg-blue-50 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
                      >
                        {item.label}
                        <ArrowUpRight className="h-4 w-4 text-slate-400" aria-hidden="true" />
                      </Link>
                    ))}
                  </nav>

                  <div className="border-t border-slate-200 pt-5">
                    <Link
                      href="/contact"
                      onClick={() => setMenuOpen(false)}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-800 px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
                    >
                      Start a project
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    <a
                      href="mailto:contact@surviant.com"
                      className="mt-4 block text-center text-sm font-medium text-slate-600 underline decoration-slate-300 underline-offset-4 hover:text-blue-800"
                    >
                      contact@surviant.com
                    </a>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
      </header>
    </>
  )
}
