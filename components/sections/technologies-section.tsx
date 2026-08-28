import { ArrowRight } from "lucide-react"
import Link from "next/link"

const technologyDecisions = [
  {
    concern: "Interface",
    foundations: "React, Next.js, TypeScript",
    protect: "Accessibility, speed, and a UI your team can extend",
  },
  {
    concern: "Application",
    foundations: "Node.js, Python, Go, REST, GraphQL",
    protect: "Clear boundaries, predictable behavior, and maintainable services",
  },
  {
    concern: "Data and delivery",
    foundations: "PostgreSQL, Redis, Docker, Railway, AWS",
    protect: "Data ownership, repeatable releases, backups, and visibility",
  },
  {
    concern: "Applied AI",
    foundations: "Model APIs, PyTorch, vector search, evaluation harnesses",
    protect: "Evidence, cost control, failure handling, and human oversight",
  },
]

export default function TechnologiesSection() {
  return (
    <section
      id="technology"
      className="scroll-mt-24 border-b border-[#DCE9FF] bg-[#F2F6FC] py-16 sm:py-20 lg:py-24"
      aria-labelledby="technology-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#155EEF]">
              Technical choices
            </p>
            <h2
              id="technology-heading"
              className="mt-5 max-w-xl text-4xl font-semibold leading-[1] tracking-[-0.045em] text-[#0A1533] sm:text-5xl"
            >
              The stack is a decision, not a display.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-[#526078] lg:pt-8">
            We choose technology after the product constraints are clear. Familiar tools are often the right answer.
            New tools have to earn their place through a specific advantage.
          </p>
        </div>

        <div
          role="region"
          aria-label="Technology decisions"
          tabIndex={0}
          className="mt-12 overflow-x-auto border-y border-[#DCE9FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF] sm:mt-16"
        >
          <p className="border-b border-[#DCE9FF] px-4 py-3 text-xs text-[#526078] sm:hidden">
            Scroll horizontally to compare columns.
          </p>
          <table className="w-full min-w-[760px] border-collapse text-left">
            <caption className="sr-only">Typical technical foundations and the product qualities they protect</caption>
            <thead>
              <tr className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#526078]">
                <th scope="col" className="w-1/5 px-4 py-4 sm:px-5">
                  Concern
                </th>
                <th scope="col" className="w-2/5 px-4 py-4 sm:px-5">
                  Typical foundations
                </th>
                <th scope="col" className="w-2/5 px-4 py-4 sm:px-5">
                  Decision we protect
                </th>
              </tr>
            </thead>
            <tbody>
              {technologyDecisions.map((row) => (
                <tr key={row.concern} className="border-t border-[#DCE9FF] align-top">
                  <th scope="row" className="px-4 py-6 text-base font-semibold text-[#0A1533] sm:px-5">
                    {row.concern}
                  </th>
                  <td className="px-4 py-6 font-mono text-sm leading-6 text-[#155EEF] sm:px-5">{row.foundations}</td>
                  <td className="px-4 py-6 text-sm leading-6 text-[#526078] sm:px-5">{row.protect}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 grid gap-5 border-l-2 border-[#155EEF] pl-5 sm:grid-cols-[1fr_auto] sm:items-end sm:pl-7">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#526078]">
              Research note / AI and ML
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.025em] text-[#0A1533]">
              See how we separate proven patterns from active experiments.
            </h3>
          </div>
          <Link
            href="/research/ai-ml"
            className="inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold text-[#155EEF] underline decoration-[#DCE9FF] underline-offset-4 transition-colors hover:text-[#0A1533] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF]"
          >
            Read the working map
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
