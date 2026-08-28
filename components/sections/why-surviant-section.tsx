const reasons = [
  {
    label: "Ownership",
    title: "One team sees the whole system.",
    description: "Product, engineering, AI, and operations decisions stay connected instead of being handed between disconnected vendors.",
  },
  {
    label: "Access",
    title: "The leaders stay close to the work.",
    description: "The people responsible for the engagement remain involved in the decisions, reviews, and tradeoffs that shape the result.",
  },
  {
    label: "Judgment",
    title: "Complexity has to justify itself.",
    description: "We use the smallest dependable approach that meets the need, then add sophistication only when the evidence supports it.",
  },
  {
    label: "Continuity",
    title: "Release is part of the build.",
    description: "Operations, measurement, documentation, and the next improvement are planned before the system reaches production.",
  },
]

export default function WhySurviantSection() {
  return (
    <section id="technology" className="scroll-mt-24 border-b border-[#DCE9FF] bg-[#F2F6FC] py-16 sm:py-20 lg:py-24" aria-labelledby="why-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#155EEF]">Why Surviant</p>
            <h2 id="why-heading" className="mt-5 max-w-xl text-4xl font-semibold leading-[1] tracking-[-0.045em] text-[#0A1533] sm:text-5xl">
              Better decisions survive the handoff.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-[#526078] lg:pt-8">
            Surviant is useful when the product, the underlying systems, and the operating reality cannot be separated without losing context.
          </p>
        </div>

        <div className="mt-12 grid border-y border-[#DCE9FF] sm:mt-16 md:grid-cols-2">
          {reasons.map((reason, index) => (
            <article key={reason.label} className={`py-7 md:p-8 ${index % 2 === 1 ? "md:border-l" : ""} ${index >= 2 ? "border-t" : index === 1 ? "border-t md:border-t-0" : ""} border-[#DCE9FF] ${index % 2 === 0 ? "md:pl-0" : ""}`}>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#155EEF]">{reason.label}</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.025em] text-[#0A1533]">{reason.title}</h3>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[#526078]">{reason.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
