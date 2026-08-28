const steps = [
  {
    number: "01",
    title: "Decide",
    description: "Agree on the user, the constraint, and the smallest release worth making.",
    output: "Decision brief",
  },
  {
    number: "02",
    title: "Prove",
    description: "Prototype the riskiest path and resolve the choices that would be expensive to reverse.",
    output: "Tested direction",
  },
  {
    number: "03",
    title: "Build",
    description: "Design and engineering move together in visible slices that can be reviewed in the product.",
    output: "Production build",
  },
  {
    number: "04",
    title: "Release",
    description: "Put the product in people’s hands, watch how it behaves, and document what comes next.",
    output: "Live release",
  },
]

export default function DevelopmentProcess() {
  return (
    <section
      id="process"
      className="scroll-mt-24 border-b border-[#DCE9FF] bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#155EEF]">
              Delivery sequence
            </p>
            <h2
              id="process-heading"
              className="mt-5 max-w-xl text-4xl font-semibold leading-[1] tracking-[-0.045em] text-[#0A1533] sm:text-5xl"
            >
              Four decisions between idea and release.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-[#526078] lg:pt-8">
            Each phase closes a real uncertainty. You can see what changed, what was decided, and what is ready for
            the next step.
          </p>
        </div>

        <ol className="mt-14 grid sm:mt-16 lg:grid-cols-4">
          {steps.map((step) => (
            <li
              key={step.number}
              className="relative border-l border-[#DCE9FF] pb-10 pl-7 last:pb-0 lg:border-l-0 lg:border-t lg:px-6 lg:pb-0 lg:pt-8 lg:first:pl-0 lg:last:pr-0"
            >
              <span
                className="absolute -left-[5px] top-0 h-[9px] w-[9px] bg-[#155EEF] lg:-top-[5px] lg:left-1/2 lg:-translate-x-1/2"
                aria-hidden="true"
              />
              <p className="font-mono text-xs font-semibold tracking-[0.14em] text-[#155EEF]">{step.number}</p>
              <h3 className="mt-6 text-3xl font-semibold tracking-[-0.025em] text-[#0A1533]">{step.title}</h3>
              <p className="mt-4 text-sm leading-6 text-[#526078]">{step.description}</p>
              <div className="mt-7 border-t border-[#DCE9FF] pt-4">
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#526078]">Output</p>
                <p className="mt-1 text-sm font-semibold text-[#0A1533]">{step.output}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
