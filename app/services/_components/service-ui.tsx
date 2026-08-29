import { ArrowRight, Check } from "lucide-react"
import Link from "next/link"

type BreadcrumbItem = { label: string; href?: string }

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#526078]">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden="true" className="text-[#A4B4CE]">/</span> : null}
            {item.href ? (
              <Link href={item.href} className="min-h-11 content-center underline decoration-[#DCE9FF] underline-offset-4 hover:text-[#155EEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF]">{item.label}</Link>
            ) : (
              <span aria-current="page" className="text-[#0A1533]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function StructuredData({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c")
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}

export function ServiceCta({ serviceSlug, title = "Bring us the problem you need to solve." }: { serviceSlug?: string; title?: string }) {
  return (
    <section className="bg-[#0A1533] text-white" aria-labelledby="service-cta-heading">
      <div className="mx-auto flex max-w-7xl flex-col gap-7 px-4 py-14 sm:px-6 sm:py-16 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#8CB5FF]">Start a conversation</p>
          <h2 id="service-cta-heading" className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-[1] tracking-[-0.04em] sm:text-5xl">{title}</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#DCE9FF]">We will help you identify the useful first move and say plainly when a simpler option is the better answer.</p>
        </div>
        <Link href={serviceSlug ? { pathname: "/contact", query: { service: serviceSlug } } : "/contact"} className="inline-flex min-h-12 w-fit shrink-0 items-center gap-2 rounded-[4px] bg-white px-5 py-3 text-sm font-semibold text-[#0A1533] hover:bg-[#DCE9FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1533]">
          Start a project
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}

export function Deliverables({ items }: { items: string[] }) {
  return (
    <ul className="border-y border-[#DCE9FF]">
      {items.map((item) => (
        <li key={item} className="flex gap-3 border-t border-[#DCE9FF] py-4 text-sm font-medium leading-6 text-[#0A1533] first:border-t-0">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#155EEF]" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  )
}

export const deliveryModeContent = {
  assess: {
    label: "Assessment and proof",
    title: "Turn uncertainty into a decision the team can act on.",
    steps: ["Frame the decision", "Test the critical assumption", "Recommend the next move"],
  },
  build: {
    label: "System delivery",
    title: "Define the boundary, build the capability, and prepare it for real use.",
    steps: ["Define the system", "Build in working slices", "Measure and operate"],
  },
  transform: {
    label: "Operational change",
    title: "Improve the live operation without losing the parts that still work.",
    steps: ["Understand the current state", "Move in controlled stages", "Support adoption and operation"],
  },
} as const
