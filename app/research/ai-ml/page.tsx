"use client"

import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Beaker,
  Brain,
  CheckCircle2,
  ChevronDown,
} from "lucide-react"
import Link from "next/link"

import SiteFooter from "@/components/site-footer"
import SiteHeader from "@/components/site-header"
import { Button } from "@/components/ui/button"

import { comparisonMatrix, techData } from "./tech-data"

const maturityOrder = ["mature", "emerging", "cutting"] as const

type MaturityKey = (typeof maturityOrder)[number]

const maturityMeta = {
  mature: {
    eyebrow: "Mature",
    title: "Production foundations",
    description:
      "Established techniques with dependable tooling, clear operating patterns, and broad production use.",
    icon: CheckCircle2,
    badge: "border-cyan-300/30 bg-cyan-300/10 text-cyan-100",
    iconStyle: "border-cyan-300/30 bg-cyan-300/10 text-cyan-200",
  },
  emerging: {
    eyebrow: "Emerging",
    title: "Active evaluation",
    description:
      "Promising approaches with growing adoption that still require careful validation against product constraints.",
    icon: Activity,
    badge: "border-blue-300/30 bg-blue-300/10 text-blue-100",
    iconStyle: "border-blue-300/30 bg-blue-300/10 text-blue-200",
  },
  cutting: {
    eyebrow: "Frontier",
    title: "Exploratory research",
    description:
      "Early methods we follow through prototypes, technical literature, and narrowly scoped experiments.",
    icon: Beaker,
    badge: "border-sky-300/30 bg-sky-300/10 text-sky-100",
    iconStyle: "border-sky-300/30 bg-sky-300/10 text-sky-200",
  },
} as const

export default function AIMLPage() {
  const [expandedSections, setExpandedSections] = useState<string[]>([])
  const shouldReduceMotion = useReducedMotion()

  const toggleSection = (sectionId: string) => {
    setExpandedSections((current) =>
      current.includes(sectionId)
        ? current.filter((id) => id !== sectionId)
        : [...current, sectionId],
    )
  }

  const renderMaturityLevel = (levelKey: MaturityKey) => {
    const level = techData[levelKey]
    const meta = maturityMeta[levelKey]
    const StatusIcon = meta.icon
    const headingId = `${levelKey}-heading`

    return (
      <section key={levelKey} aria-labelledby={headingId} className="space-y-6 sm:space-y-8">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end">
          <div>
            <div
              className={`mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] ${meta.badge}`}
            >
              <StatusIcon className="h-4 w-4" aria-hidden="true" />
              {meta.eyebrow}
            </div>
            <h2 id={headingId} className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {meta.title}
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base lg:justify-self-end">
            {meta.description}
          </p>
        </div>

        <div className="space-y-3">
          {level.sections.map((section) => {
            const disclosureId = `${levelKey}-${section.id}`
            const triggerId = `${disclosureId}-trigger`
            const panelId = `${disclosureId}-panel`
            const isExpanded = expandedSections.includes(disclosureId)

            return (
              <article
                key={section.id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] shadow-[0_20px_70px_rgba(2,8,23,0.24)] transition-colors hover:border-cyan-300/30"
              >
                <h3>
                  <button
                    id={triggerId}
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls={panelId}
                    onClick={() => toggleSection(disclosureId)}
                    className="group flex w-full items-start justify-between gap-4 px-4 py-5 text-left outline-none transition-colors hover:bg-white/[0.035] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-300 sm:items-center sm:px-6 sm:py-6"
                  >
                    <span className="min-w-0">
                      <span className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <span className="text-lg font-semibold text-white sm:text-xl">
                          {section.category}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/[0.055] px-2.5 py-1 text-xs font-medium text-slate-300">
                          {section.technologies.length} topics
                        </span>
                      </span>
                      <span className="mt-2 block max-w-3xl text-sm font-normal leading-6 text-slate-400">
                        {section.description}
                      </span>
                    </span>
                    <span
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-transform ${meta.iconStyle} ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={triggerId}
                      initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.22, ease: "easeOut" }}
                      className="border-t border-white/10"
                    >
                      <div className="grid gap-3 px-4 py-4 sm:grid-cols-2 sm:px-6 sm:py-6 xl:grid-cols-3">
                        {section.technologies.map((technology) => (
                          <div
                            key={technology.name}
                            className="rounded-xl border border-white/10 bg-[#081a2c]/80 p-4"
                          >
                            <h4 className="font-semibold text-slate-50">{technology.name}</h4>
                            <p className="mt-2 text-sm leading-6 text-slate-400">{technology.desc}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            )
          })}
        </div>
      </section>
    )
  }

  return (
    <div className="min-h-screen bg-[#06111f] text-slate-100">
      <SiteHeader />

      <main id="main-content" className="relative isolate overflow-hidden">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[44rem] bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.16),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(37,99,235,0.2),transparent_38%),linear-gradient(180deg,#07182a_0%,#06111f_75%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[44rem] opacity-20 [background-image:linear-gradient(rgba(148,163,184,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.16)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent)]"
          aria-hidden="true"
        />

        <section className="mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-20">
          <nav aria-label="Breadcrumb" className="mb-10">
            <Button
              asChild
              variant="ghost"
              className="-ml-3 rounded-full text-slate-300 hover:bg-white/10 hover:text-white"
            >
              <Link href="/">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to homepage
              </Link>
            </Button>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:items-end">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
                <Brain className="h-4 w-4" aria-hidden="true" />
                Surviant Labs
              </div>
              <h1 className="max-w-4xl text-4xl font-bold tracking-[-0.035em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Applied AI systems, mapped from proven to exploratory.
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                A practical view of the AI and machine learning methods our team evaluates for product engineering.
                Maturity labels describe readiness and adoption, not guaranteed outcomes.
              </p>
            </div>

            <aside className="rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.06] p-5 sm:p-6" aria-label="How to read this page">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">How to read this page</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                This is a capability map, not a performance claim. Each engagement uses a focused stack selected for
                security, maintainability, cost, and product fit.
              </p>
            </aside>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-3">
            {maturityOrder.map((levelKey) => {
              const meta = maturityMeta[levelKey]
              const StatusIcon = meta.icon

              return (
                <a
                  key={levelKey}
                  href={`#${levelKey}-heading`}
                  className="rounded-xl border border-white/10 bg-white/[0.045] p-4 transition-colors hover:border-cyan-300/30 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  <span className={`flex h-9 w-9 items-center justify-center rounded-lg border ${meta.iconStyle}`}>
                    <StatusIcon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="mt-4 block font-semibold text-white">{meta.title}</span>
                  <span className="mt-1 block text-sm text-slate-400">{meta.eyebrow}</span>
                </a>
              )
            })}
          </div>
        </section>

        <div className="mx-auto max-w-7xl space-y-20 px-4 pb-20 sm:space-y-24 sm:px-6 sm:pb-24 lg:px-8 lg:pb-32">
          {maturityOrder.map(renderMaturityLevel)}

          <section aria-labelledby="comparison-heading" className="space-y-6">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">At a glance</p>
              <h2 id="comparison-heading" className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Maturity comparison
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                A compact reference for how common AI capabilities move from established patterns toward active and
                exploratory work.
              </p>
            </div>

            <div
              role="region"
              aria-label="AI and machine learning maturity comparison table"
              tabIndex={0}
              className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.045] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              <table className="min-w-[760px] w-full border-collapse text-left">
                <caption className="sr-only">
                  Comparison of mature, emerging, and frontier approaches by AI and machine learning category
                </caption>
                <thead className="bg-white/[0.055]">
                  <tr>
                    <th scope="col" className="px-5 py-4 text-sm font-semibold text-white sm:px-6">
                      Category
                    </th>
                    <th scope="col" className="px-5 py-4 text-sm font-semibold text-cyan-200 sm:px-6">
                      Mature
                    </th>
                    <th scope="col" className="px-5 py-4 text-sm font-semibold text-blue-200 sm:px-6">
                      Emerging
                    </th>
                    <th scope="col" className="px-5 py-4 text-sm font-semibold text-sky-200 sm:px-6">
                      Frontier
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonMatrix.map((row) => (
                    <tr key={row.category} className="border-t border-white/10 align-top hover:bg-white/[0.025]">
                      <th scope="row" className="px-5 py-4 text-sm font-semibold text-white sm:px-6">
                        {row.category}
                      </th>
                      <td className="px-5 py-4 text-sm leading-6 text-slate-300 sm:px-6">{row.mature}</td>
                      <td className="px-5 py-4 text-sm leading-6 text-slate-300 sm:px-6">{row.emerging}</td>
                      <td className="px-5 py-4 text-sm leading-6 text-slate-300 sm:px-6">{row.cutting}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="relative overflow-hidden rounded-3xl border border-cyan-300/20 bg-[#092039] p-6 sm:p-10 lg:p-14">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.15),transparent_36%)]"
              aria-hidden="true"
            />
            <div className="relative z-10 max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">Build with purpose</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Bring us the product problem, not a preferred model.
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
                We will help identify the smallest credible approach, validate the risks, and turn the right ideas into
                a maintainable product plan.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="h-auto min-h-12 rounded-full bg-cyan-300 px-6 py-3 text-[#06111f] hover:bg-cyan-200"
                >
                  <Link href="/contact">
                    Discuss an AI project
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-auto min-h-12 rounded-full border-white/20 bg-transparent px-6 py-3 text-white hover:bg-white/10 hover:text-white"
                >
                  <Link href="/">Explore Surviant</Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
