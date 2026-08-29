import { ArrowRight, CircuitBoard, Code2, Workflow } from "lucide-react"
import Link from "next/link"

const systemLayers = [
  {
    label: "Digital transformation",
    title: "Modernize the operation",
    description: "Replace fragile workflows, connect existing systems, and make operational data usable.",
    output: "A stronger operating core",
    href: "/services/digital-transformation",
    icon: Workflow,
  },
  {
    label: "Product engineering",
    title: "Build the software layer",
    description: "Design and ship the web, mobile, API, and cloud systems your teams and customers need.",
    output: "Software people can rely on",
    href: "/services/product-engineering",
    icon: Code2,
  },
  {
    label: "AI engineering",
    title: "Add intelligence with purpose",
    description: "Use models, retrieval, agents, vision, and voice where they improve a measurable decision or task.",
    output: "AI that earns its place",
    href: "/services/ai-engineering",
    icon: CircuitBoard,
  },
]

export function HeroSection() {
  return (
    <section id="home" className="scroll-mt-24 border-b border-[#DCE9FF] bg-white" aria-labelledby="hero-heading">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8 lg:pb-24 lg:pt-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.28fr)_minmax(19rem,0.72fr)] lg:items-end">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#155EEF]">
              Software / AI / Systems
            </p>
            <h1
              id="hero-heading"
              className="mt-6 max-w-5xl text-balance text-[clamp(2.65rem,6vw,5.5rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-[#0A1533]"
            >
              Software, AI, and systems, built as one.
            </h1>
          </div>

          <div className="border-l-2 border-[#155EEF] pl-5 sm:pl-7">
            <p className="text-pretty text-lg leading-8 text-[#526078]">
              We help established teams modernize operations and build dependable products, adding AI where it
              creates real value.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Link
                href="/contact"
                prefetch={false}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[4px] bg-[#155EEF] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0A1533] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF] focus-visible:ring-offset-2"
              >
                Start a project
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/services"
                prefetch={false}
                className="inline-flex min-h-12 items-center justify-center rounded-[4px] border border-[#DCE9FF] bg-white px-5 py-3 text-sm font-semibold text-[#0A1533] transition-colors hover:border-[#155EEF] hover:text-[#155EEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF] focus-visible:ring-offset-2"
              >
                Explore our services
              </Link>
            </div>
          </div>
        </div>

        <figure className="mt-14 overflow-hidden rounded-[4px] border border-[#155EEF] bg-[#F2F6FC] lg:mt-20">
          <figcaption className="flex flex-col gap-2 border-b border-[#DCE9FF] bg-white px-5 py-4 font-mono text-xs uppercase tracking-[0.14em] text-[#526078] sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <span className="font-semibold text-[#0A1533]">Whole system map / One accountable team</span>
            <span>Operation to product to intelligence</span>
          </figcaption>

          <div className="relative p-5 sm:p-6 lg:p-8">
            <div className="absolute bottom-8 left-8 top-8 hidden w-px bg-[#DCE9FF] lg:block" aria-hidden="true">
              <span className="system-trace block h-full w-px bg-[#155EEF]" />
            </div>

            <ol className="grid gap-4 lg:pl-8">
              {systemLayers.map((layer, index) => {
                const Icon = layer.icon

                return (
                  <li key={layer.label} className="relative">
                    <span
                      className="absolute -left-[2.28rem] top-1/2 hidden h-[9px] w-[9px] -translate-y-1/2 bg-[#155EEF] lg:block"
                      aria-hidden="true"
                    />
                    <Link
                      href={layer.href}
                      prefetch={false}
                      className="group grid min-h-[10rem] gap-5 rounded-[3px] border border-[#DCE9FF] bg-white p-5 transition-colors hover:border-[#155EEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF] sm:grid-cols-[3.25rem_minmax(0,0.85fr)_minmax(0,1.15fr)_auto] sm:items-center sm:p-6"
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-[3px] bg-[#DCE9FF] text-[#155EEF]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="font-mono block text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#155EEF]">
                          Layer {index + 1} / {layer.label}
                        </span>
                        <span className="font-display mt-2 block text-xl font-semibold tracking-[-0.02em] text-[#0A1533] sm:text-2xl">
                          {layer.title}
                        </span>
                      </span>
                      <span className="text-sm leading-6 text-[#526078]">{layer.description}</span>
                      <span className="flex items-center gap-3 border-t border-[#DCE9FF] pt-4 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.11em] text-[#0A1533] sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
                        {layer.output}
                        <ArrowRight className="h-4 w-4 shrink-0 text-[#155EEF] transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ol>
          </div>

          <div className="grid border-t border-[#DCE9FF] bg-[#155EEF] text-white sm:grid-cols-[auto_1fr]">
            <p className="border-b border-white/30 px-5 py-4 font-mono text-xs font-semibold uppercase tracking-[0.14em] sm:border-b-0 sm:border-r sm:px-6">
              The result
            </p>
            <p className="px-5 py-4 text-sm font-medium sm:px-6">
              Fewer handoffs, clearer ownership, and systems designed to work together from the start.
            </p>
          </div>
        </figure>
      </div>
    </section>
  )
}

export default HeroSection
