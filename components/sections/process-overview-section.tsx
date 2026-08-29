import { ArrowRight } from "lucide-react"
import Link from "next/link"

const phases = [
  {
    title: "Think",
    description: "Understand the business, define the constraint, and design the system before expensive choices become fixed.",
    output: "A grounded direction",
  },
  {
    title: "Build",
    description: "Ship in visible stages, test the parts that carry risk, and keep your team close to every important decision.",
    output: "Working software",
  },
  {
    title: "Sustain",
    description: "Run, maintain, and improve the system with clear ownership, useful documentation, and evidence from production.",
    output: "A system that keeps moving",
  },
]

export default function ProcessOverviewSection() {
  return (
    <section id="process" className="scroll-mt-24 border-b border-[#DCE9FF] bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="process-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#155EEF]">How we work</p>
            <h2 id="process-heading" className="mt-5 max-w-xl text-4xl font-semibold leading-[1] tracking-[-0.045em] text-[#0A1533] sm:text-5xl">
              Think clearly. Build visibly. Stay for what comes next.
            </h2>
          </div>
          <div className="lg:pt-8">
            <p className="max-w-2xl text-lg leading-8 text-[#526078]">
              The work moves through seven real stages, from understanding the business to improving the live system. These three phases keep that sequence easy to follow.
            </p>
            <Link href="/how-we-work" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#155EEF] underline decoration-[#DCE9FF] underline-offset-4 hover:text-[#0A1533] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF]">
              See the complete delivery sequence
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="mt-12 grid border-y border-[#DCE9FF] sm:mt-16 lg:grid-cols-3">
          {phases.map((phase, index) => (
            <article key={phase.title} className={`py-7 lg:px-7 lg:py-9 ${index > 0 ? "border-t border-[#DCE9FF] lg:border-l lg:border-t-0" : ""} ${index === 0 ? "lg:pl-0" : ""} ${index === phases.length - 1 ? "lg:pr-0" : ""}`}>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#155EEF]">Phase / {phase.title}</p>
              <h3 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[#0A1533]">{phase.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[#526078]">{phase.description}</p>
              <p className="mt-7 border-t border-[#DCE9FF] pt-4 font-mono text-xs uppercase tracking-[0.12em] text-[#526078]">
                Outcome / <span className="font-semibold text-[#0A1533]">{phase.output}</span>
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
