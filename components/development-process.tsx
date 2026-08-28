import { ArrowDownRight } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Understand",
    description: "We clarify the goal, audience, constraints, and evidence so the team solves the right problem.",
    output: "Shared product brief",
  },
  {
    number: "02",
    title: "Shape",
    description: "We map the experience, test key decisions, and turn uncertainty into a focused delivery plan.",
    output: "Validated direction",
  },
  {
    number: "03",
    title: "Build",
    description: "Design and engineering move together in short, visible cycles with quality built into every release.",
    output: "Production-ready product",
  },
  {
    number: "04",
    title: "Improve",
    description: "After launch, we use feedback and operating data to strengthen the experience and guide what comes next.",
    output: "Measured iteration plan",
  },
]

export default function DevelopmentProcess() {
  return (
    <section
      id="process"
      className="scroll-mt-24 bg-white py-20 sm:py-24 lg:py-28"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-800">How we work</p>
          <h2
            id="process-heading"
            className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl lg:text-5xl"
          >
            A clear process with useful decisions at every step.
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
            You see what is being decided, what is being built, and what comes next. The process stays flexible without
            becoming vague.
          </p>
        </div>

        <ol className="relative mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li
              key={step.number}
              className="group relative flex min-h-80 flex-col overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6 transition-colors hover:border-blue-200 hover:bg-blue-50/50"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold tracking-[0.18em] text-blue-800">{step.number}</span>
                {index < steps.length - 1 && (
                  <ArrowDownRight
                    className="h-5 w-5 text-slate-300 transition-colors group-hover:text-blue-500"
                    aria-hidden="true"
                  />
                )}
              </div>

              <h3 className="mt-16 text-2xl font-semibold tracking-tight text-slate-950">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>

              <div className="mt-auto border-t border-slate-200 pt-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Output</p>
                <p className="mt-2 text-sm font-semibold text-slate-800">{step.output}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
