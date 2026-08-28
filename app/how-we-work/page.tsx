import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

import PageShell from "@/components/page-shell"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "How We Work",
  description: "See how Surviant moves from business context and system design to staged delivery, production operation, and continued improvement.",
  path: "/how-we-work",
})

const phases = [
  {
    name: "Think",
    summary: "Make the problem, constraints, and system boundaries clear before the build gathers momentum.",
    stages: [
      {
        title: "Understand your business",
        body: "We learn how the work happens today, who depends on it, where it breaks down, and what a useful result changes.",
        outcome: "Shared business context",
      },
      {
        title: "Design and architect",
        body: "We shape the product path, data flow, system boundaries, and technical choices around the constraints that matter.",
        outcome: "Product and system direction",
      },
      {
        title: "Present and refine",
        body: "You review the proposed direction before implementation. We resolve uncertainty while the expensive choices are still easy to change.",
        outcome: "A reviewed build plan",
      },
    ],
  },
  {
    name: "Build",
    summary: "Turn the direction into working slices that can be reviewed, tested, and improved in context.",
    stages: [
      {
        title: "Build in stages, with you in the loop",
        body: "We deliver visible increments, explain meaningful tradeoffs, and keep feedback attached to working software rather than abstract status reports.",
        outcome: "Reviewable product increments",
      },
      {
        title: "Test and prove it works",
        body: "We test software behavior, AI quality where relevant, failure paths, performance, accessibility, and the conditions required for release.",
        outcome: "Evidence for release",
      },
    ],
  },
  {
    name: "Sustain",
    summary: "Operate the live system with clear ownership and keep improving the parts that create value.",
    stages: [
      {
        title: "Maintain and run it",
        body: "We support the production system with monitoring, documentation, maintenance, and a practical response path for issues.",
        outcome: "An owned production system",
      },
      {
        title: "Keep building",
        body: "Usage and operating evidence guide the next release, whether that means improving a workflow, adding a capability, or simplifying what exists.",
        outcome: "A useful next move",
      },
    ],
  },
]

export default function HowWeWorkPage() {
  let stageNumber = 0

  return (
    <PageShell>
      <section className="border-b border-[#DCE9FF] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#155EEF]">How we work / Think, Build, Sustain</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
            <h1 className="max-w-5xl text-balance text-5xl font-semibold leading-[0.94] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              Seven stages from business context to a system that keeps improving.
            </h1>
            <p className="border-l-2 border-[#155EEF] pl-5 text-lg leading-8 text-[#526078] sm:pl-7">
              Each stage closes a real uncertainty. You can see what changed, what was decided, and what is ready for the next part of the work.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#F2F6FC] py-16 sm:py-20 lg:py-24" aria-label="Delivery stages">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {phases.map((phase, phaseIndex) => (
            <section key={phase.name} className={phaseIndex > 0 ? "mt-16 border-t border-[#DCE9FF] pt-16 lg:mt-20 lg:pt-20" : ""} aria-labelledby={`phase-${phase.name.toLowerCase()}`}>
              <div className="grid gap-5 lg:grid-cols-[0.45fr_1.55fr] lg:gap-16">
                <div>
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#155EEF]">Phase / {phase.name}</p>
                  <h2 id={`phase-${phase.name.toLowerCase()}`} className="mt-3 text-4xl font-semibold tracking-[-0.04em]">{phase.name}</h2>
                  <p className="mt-4 max-w-sm text-sm leading-7 text-[#526078]">{phase.summary}</p>
                </div>
                <ol className="border-b border-[#DCE9FF]">
                  {phase.stages.map((stage) => {
                    stageNumber += 1
                    const currentNumber = stageNumber

                    return (
                      <li key={stage.title} className="grid gap-4 border-t border-[#DCE9FF] py-7 first:border-t-0 sm:grid-cols-[4rem_minmax(0,0.8fr)_minmax(0,1.2fr)] sm:gap-6">
                        <p className="font-mono text-xs font-semibold tracking-[0.14em] text-[#155EEF]">{String(currentNumber).padStart(2, "0")}</p>
                        <h3 className="text-xl font-semibold tracking-[-0.02em]">{stage.title}</h3>
                        <div>
                          <p className="text-sm leading-7 text-[#526078]">{stage.body}</p>
                          <p className="mt-4 font-mono text-xs uppercase tracking-[0.12em] text-[#526078]">Outcome / <span className="font-semibold text-[#0A1533]">{stage.outcome}</span></p>
                        </div>
                      </li>
                    )
                  })}
                </ol>
              </div>
            </section>
          ))}

          <div className="mt-16 flex flex-col gap-5 border-l-2 border-[#155EEF] pl-5 sm:flex-row sm:items-end sm:justify-between sm:pl-7 lg:mt-20">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#155EEF]">Your starting point</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.035em]">You do not need a finished brief to begin.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#526078]">Bring the constraint, the stalled workflow, or the outcome your team needs. The first conversation is for making the next decision clearer.</p>
            </div>
            <Link href="/contact" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-[4px] bg-[#155EEF] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0A1533] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF] focus-visible:ring-offset-2">
              Start a conversation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
