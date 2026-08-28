import { ArrowRight } from "lucide-react"
import Link from "next/link"

const releaseStages = [
  {
    number: "01",
    name: "Scope",
    question: "Who needs this now?",
    output: "Decision brief",
  },
  {
    number: "02",
    name: "Interface",
    question: "What is the shortest useful path?",
    output: "Testable flow",
  },
  {
    number: "03",
    name: "Build",
    question: "What has to hold up in production?",
    output: "Working product",
  },
  {
    number: "04",
    name: "Release",
    question: "What proves the product is ready?",
    output: "Owned release",
  },
]

export function HeroSection() {
  return (
    <section
      id="home"
      className="scroll-mt-24 border-b border-[#DCE9FF] bg-white"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8 lg:pb-24 lg:pt-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)] lg:items-end">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#155EEF]">
              Surviant / Product engineering studio
            </p>
            <h1
              id="hero-heading"
              className="mt-6 max-w-5xl text-balance text-[clamp(3.25rem,8vw,7.25rem)] font-semibold leading-[0.9] tracking-[-0.065em] text-[#0A1533]"
            >
              You have a product to ship. We make it real.
            </h1>
          </div>

          <div className="border-l-2 border-[#155EEF] pl-5 sm:pl-7">
            <p className="text-pretty text-lg leading-8 text-[#526078]">
              Surviant helps founders and product teams turn a product decision into a clear interface, a durable
              build, and a release people can use.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[4px] bg-[#155EEF] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0A1533] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF] focus-visible:ring-offset-2"
              >
                Tell us what you are building
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href="#process"
                className="inline-flex min-h-12 items-center justify-center rounded-[4px] border border-[#DCE9FF] bg-white px-5 py-3 text-sm font-semibold text-[#0A1533] transition-colors hover:border-[#155EEF] hover:text-[#155EEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF] focus-visible:ring-offset-2"
              >
                See how the work moves
              </a>
            </div>
          </div>
        </div>

        <figure className="mt-16 overflow-hidden rounded-[4px] border border-[#155EEF] bg-[#F2F6FC] sm:mt-20">
          <figcaption className="flex flex-col gap-2 border-b border-[#DCE9FF] bg-white px-5 py-4 font-mono text-xs uppercase tracking-[0.14em] text-[#526078] sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <span className="font-semibold text-[#0A1533]">Build map / One accountable path</span>
            <span>First decision to live release</span>
          </figcaption>

          <div className="relative px-5 py-8 sm:px-6 sm:py-10">
            <div className="absolute left-[12.5%] right-[12.5%] top-[3.45rem] hidden h-px bg-[#DCE9FF] md:block" aria-hidden="true">
              <span className="release-trace block h-px w-full bg-[#155EEF]" />
            </div>

            <ol className="grid gap-0 md:grid-cols-4">
              {releaseStages.map((stage) => (
                <li
                  key={stage.number}
                  className="relative border-l border-[#DCE9FF] py-5 pl-6 md:border-l-0 md:border-t md:px-5 md:pb-0 md:pt-8 md:first:px-0 md:first:pr-5 md:first:pt-8 md:last:pl-5 md:last:pt-8"
                >
                  <span
                    className="absolute -left-[5px] top-7 h-[9px] w-[9px] bg-[#155EEF] md:-top-[5px] md:left-1/2 md:-translate-x-1/2"
                    aria-hidden="true"
                  />
                  <p className="font-mono text-xs font-semibold tracking-[0.14em] text-[#155EEF]">
                    {stage.number} / {stage.name.toUpperCase()}
                  </p>
                  <h2 className="mt-4 max-w-[15rem] text-xl font-semibold leading-6 text-[#0A1533]">
                    {stage.question}
                  </h2>
                  <p className="mt-6 font-mono text-xs uppercase tracking-[0.12em] text-[#526078]">
                    Output / <span className="font-semibold text-[#0A1533]">{stage.output}</span>
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="grid border-t border-[#DCE9FF] bg-[#155EEF] text-white sm:grid-cols-[auto_1fr]">
            <p className="border-b border-white/30 px-5 py-4 font-mono text-xs font-semibold uppercase tracking-[0.14em] sm:border-b-0 sm:border-r sm:px-6">
              You leave with
            </p>
            <p className="px-5 py-4 text-sm font-medium sm:px-6">
              Working software, the decisions behind it, and a release your team can own.
            </p>
          </div>
        </figure>
      </div>
    </section>
  )
}

export default HeroSection
