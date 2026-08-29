"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"

type ServiceGroup = {
  title: string
  href: string
  offerings: Array<{ title: string; href: string }>
}

const navigation = [
  { label: "How We Work", href: "/how-we-work" },
  { label: "Work", href: "/#portfolio" },
  { label: "About", href: "/about" },
  { label: "Research", href: "/research/ai-ml" },
]

export default function SiteHeaderClient({ serviceGroups }: { serviceGroups: ServiceGroup[] }) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const servicesAreaRef = useRef<HTMLDivElement>(null)
  const servicesTriggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMenuOpen(false)
    setServicesOpen(false)
  }, [pathname])

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (servicesAreaRef.current && !servicesAreaRef.current.contains(event.target as Node)) {
        setServicesOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return

      const servicesMenu = servicesAreaRef.current?.querySelector("#desktop-services-menu")
      if (!servicesMenu) return

      const focusWasInsideMenu = document.activeElement
        ? servicesMenu.contains(document.activeElement)
        : false

      setServicesOpen(false)
      if (focusWasInsideMenu) {
        event.preventDefault()
        servicesTriggerRef.current?.focus()
      }
    }

    document.addEventListener("pointerdown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const isServicesPath = pathname.startsWith("/services")

  return (
    <>
      <a href="#main-content" className="fixed left-4 top-3 z-[100] inline-flex min-h-11 items-center -translate-y-24 rounded-[4px] bg-[#0A1533] px-4 py-2 text-sm font-semibold text-white transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#155EEF] focus:ring-offset-2">
        Skip to content
      </a>

      <header className="sticky top-0 z-50 border-b border-[#DCE9FF] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex min-h-11 items-center gap-3 rounded-[3px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF] focus-visible:ring-offset-4" aria-label="Surviant home">
            <Image src="/surviant-logo.jpg" alt="" width={48} height={48} className="h-10 w-10 rounded-[3px] object-cover ring-1 ring-[#DCE9FF]" priority />
            <span>
              <span className="font-display block text-base font-semibold tracking-[-0.01em] text-[#0A1533]">Surviant</span>
              <span className="font-mono hidden text-[0.64rem] uppercase tracking-[0.14em] text-[#526078] sm:block">Software / AI / Systems</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary navigation">
            <div ref={servicesAreaRef} className="relative">
              <button ref={servicesTriggerRef} type="button" aria-expanded={servicesOpen} aria-controls="desktop-services-menu" onClick={() => setServicesOpen((open) => !open)} className={`inline-flex min-h-11 items-center gap-1.5 border-b px-0.5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF] ${isServicesPath || servicesOpen ? "border-[#155EEF] text-[#0A1533]" : "border-transparent text-[#526078] hover:border-[#DCE9FF] hover:text-[#0A1533]"}`}>
                Services
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>

              {servicesOpen ? (
                <div id="desktop-services-menu" className="fixed left-1/2 top-[4.7rem] w-[min(72rem,calc(100vw-3rem))] -translate-x-1/2 rounded-[4px] border border-[#DCE9FF] bg-white p-6 shadow-[0_24px_60px_rgba(10,21,51,0.14)]">
                  <div className="flex items-center justify-between border-b border-[#DCE9FF] pb-4">
                    <div>
                      <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#155EEF]">Service directory</p>
                      <p className="mt-1 text-sm text-[#526078]">Three practices, connected around the system you need to improve.</p>
                    </div>
                    <Link href="/services" onClick={() => setServicesOpen(false)} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#0A1533] underline decoration-[#DCE9FF] underline-offset-4 hover:text-[#155EEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF]">
                      View all services
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-7">
                    {serviceGroups.map((group) => (
                      <section key={group.href} aria-labelledby={`desktop-${group.href.replaceAll("/", "-")}`}>
                        <Link id={`desktop-${group.href.replaceAll("/", "-")}`} href={group.href} onClick={() => setServicesOpen(false)} className="inline-flex min-h-11 items-center gap-2 text-base font-semibold text-[#0A1533] hover:text-[#155EEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF]">
                          {group.title}
                          <ArrowUpRight className="h-4 w-4 text-[#155EEF]" aria-hidden="true" />
                        </Link>
                        <ul className="mt-2 border-t border-[#DCE9FF] pt-2">
                          {group.offerings.map((offering) => (
                            <li key={offering.href}>
                              <Link href={offering.href} onClick={() => setServicesOpen(false)} className="flex min-h-11 items-center rounded-[3px] px-2 py-2 text-xs leading-5 text-[#526078] hover:bg-[#F2F6FC] hover:text-[#155EEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF]">
                                {offering.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </section>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            {navigation.map((item) => {
              const isCurrent = item.href === pathname
              return (
                <Link key={item.href} href={item.href} aria-current={isCurrent ? "page" : undefined} className={`inline-flex min-h-11 min-w-11 items-center justify-center border-b px-0.5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF] ${isCurrent ? "border-[#155EEF] text-[#0A1533]" : "border-transparent text-[#526078] hover:border-[#DCE9FF] hover:text-[#0A1533]"}`}>
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/contact" className="hidden min-h-11 items-center gap-2 rounded-[4px] bg-[#155EEF] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0A1533] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF] focus-visible:ring-offset-2 sm:inline-flex">
              Start a project
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>

            <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
              <Dialog.Trigger asChild>
                <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-[4px] border border-[#DCE9FF] bg-white text-[#0A1533] transition-colors hover:bg-[#F2F6FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF] focus-visible:ring-offset-2 lg:hidden" aria-label="Open navigation menu">
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </button>
              </Dialog.Trigger>

              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-[70] bg-[#0A1533]/35" />
                <Dialog.Content className="fixed inset-y-0 right-0 z-[80] flex w-full max-w-md flex-col overflow-y-auto border-l border-[#DCE9FF] bg-white p-6 outline-none">
                  <div className="flex items-center justify-between border-b border-[#DCE9FF] pb-5">
                    <div>
                      <Dialog.Title className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#0A1533]">Navigation</Dialog.Title>
                      <Dialog.Description className="sr-only">Browse Surviant services, company information, research, and project contact options.</Dialog.Description>
                    </div>
                    <Dialog.Close asChild>
                      <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-[4px] border border-[#DCE9FF] bg-white text-[#0A1533] hover:bg-[#F2F6FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF]" aria-label="Close navigation menu">
                        <X className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </Dialog.Close>
                  </div>

                  <nav className="flex flex-1 flex-col py-5" aria-label="Mobile navigation">
                    <Link href="/services" onClick={() => setMenuOpen(false)} className="flex min-h-12 items-center justify-between border-b border-[#DCE9FF] px-1 py-3 text-lg font-semibold text-[#0A1533] hover:text-[#155EEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF]">
                      Services
                      <ArrowUpRight className="h-4 w-4 text-[#155EEF]" aria-hidden="true" />
                    </Link>

                    <div className="border-b border-[#DCE9FF] py-2">
                      {serviceGroups.map((group) => (
                        <details key={group.href} className="group">
                          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between px-1 py-2 text-sm font-semibold text-[#0A1533] marker:content-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF]">
                            {group.title}
                            <ChevronDown className="h-4 w-4 text-[#155EEF] transition-transform group-open:rotate-180" aria-hidden="true" />
                          </summary>
                          <ul className="border-l border-[#DCE9FF] pb-2 pl-4">
                            <li>
                              <Link href={group.href} onClick={() => setMenuOpen(false)} className="flex min-h-11 items-center py-2 text-sm font-semibold text-[#155EEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF]">Practice overview</Link>
                            </li>
                            {group.offerings.map((offering) => (
                              <li key={offering.href}>
                                <Link href={offering.href} onClick={() => setMenuOpen(false)} className="flex min-h-11 items-center py-2 text-sm leading-5 text-[#526078] hover:text-[#155EEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF]">{offering.title}</Link>
                              </li>
                            ))}
                          </ul>
                        </details>
                      ))}
                    </div>

                    {navigation.map((item) => (
                      <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="flex min-h-12 items-center justify-between border-b border-[#DCE9FF] px-1 py-3 text-lg font-semibold text-[#0A1533] hover:text-[#155EEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF]">
                        {item.label}
                        <ArrowUpRight className="h-4 w-4 text-[#526078]" aria-hidden="true" />
                      </Link>
                    ))}
                  </nav>

                  <div className="border-t border-[#DCE9FF] pt-5">
                    <Link href="/contact" onClick={() => setMenuOpen(false)} className="inline-flex w-full items-center justify-center gap-2 rounded-[4px] bg-[#155EEF] px-5 py-3 text-base font-semibold text-white hover:bg-[#0A1533] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF] focus-visible:ring-offset-2">
                      Start a project
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    <a href="mailto:contact@surviant.com" className="mt-4 flex min-h-11 items-center justify-center text-center text-sm font-medium text-[#526078] underline decoration-[#DCE9FF] underline-offset-4 hover:text-[#155EEF]">contact@surviant.com</a>
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
