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

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <>
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-[100] -translate-y-24 rounded-[4px] bg-[#0A1533] px-4 py-2 text-sm font-semibold text-white transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#155EEF] focus:ring-offset-2"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-50 border-b border-[#DCE9FF] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-[3px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF] focus-visible:ring-offset-4"
            aria-label="Surviant home"
          >
            <Image
              src="/surviant-logo.jpg"
              alt=""
              width={48}
              height={48}
              className="h-10 w-10 rounded-[3px] object-cover ring-1 ring-[#DCE9FF]"
              priority
            />
            <span>
              <span className="font-display block text-base font-semibold tracking-[-0.01em] text-[#0A1533]">Surviant</span>
              <span className="font-mono hidden text-xs uppercase tracking-[0.16em] text-[#526078] sm:block">
                Product engineering
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary navigation">
            {navigation.map((item) => {
              const isCurrent = item.href === pathname
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isCurrent ? "page" : undefined}
                  className={`border-b px-0.5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF] ${
                    isCurrent
                      ? "border-[#155EEF] text-[#0A1533]"
                      : "border-transparent text-[#526078] hover:border-[#DCE9FF] hover:text-[#0A1533]"
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
              className="hidden items-center gap-2 rounded-[4px] bg-[#155EEF] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0A1533] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF] focus-visible:ring-offset-2 sm:inline-flex"
            >
              Start a brief
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>

            <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
              <Dialog.Trigger asChild>
                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-[4px] border border-[#DCE9FF] bg-white text-[#0A1533] transition-colors hover:bg-[#F2F6FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF] focus-visible:ring-offset-2 lg:hidden"
                  aria-label="Open navigation menu"
                >
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </button>
              </Dialog.Trigger>

              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-[70] bg-[#0A1533]/35" />
                <Dialog.Content className="fixed inset-y-0 right-0 z-[80] flex w-full max-w-sm flex-col border-l border-[#DCE9FF] bg-white p-6 outline-none">
                  <div className="flex items-center justify-between border-b border-[#DCE9FF] pb-5">
                    <Dialog.Title className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#0A1533]">
                      Navigation
                    </Dialog.Title>
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-[4px] border border-[#DCE9FF] bg-white text-[#0A1533] transition-colors hover:bg-[#F2F6FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF]"
                        aria-label="Close navigation menu"
                      >
                        <X className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </Dialog.Close>
                  </div>

                  <nav className="flex flex-1 flex-col py-6" aria-label="Mobile navigation">
                    {navigation.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center justify-between border-b border-[#DCE9FF] px-1 py-4 text-lg font-semibold text-[#0A1533] transition-colors hover:bg-[#F2F6FC] hover:text-[#155EEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF]"
                      >
                        {item.label}
                        <ArrowUpRight className="h-4 w-4 text-slate-400" aria-hidden="true" />
                      </Link>
                    ))}
                  </nav>

                  <div className="border-t border-[#DCE9FF] pt-5">
                    <Link
                      href="/contact"
                      onClick={() => setMenuOpen(false)}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-[4px] bg-[#155EEF] px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-[#0A1533] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF] focus-visible:ring-offset-2"
                    >
                      Start a brief
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    <a
                      href="mailto:contact@surviant.com"
                      className="mt-4 block text-center text-sm font-medium text-[#526078] underline decoration-[#DCE9FF] underline-offset-4 hover:text-[#155EEF]"
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
