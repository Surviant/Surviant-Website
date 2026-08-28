const engagements = [
  {
    situation: "You need to decide what to build.",
    title: "Product direction",
    description:
      "Turn an opportunity into a focused product brief before time and budget disappear into the wrong build.",
    outputs: "Decision brief / release scope / technical direction",
  },
  {
    situation: "The core flow is not clicking.",
    title: "Experience design",
    description:
      "Shape the user path, test the difficult decisions, and define an interface system the build can support.",
    outputs: "User flows / working prototype / interface system",
  },
  {
    situation: "The product needs to ship.",
    title: "Product engineering",
    description:
      "Build the customer experience, application services, and integrations as one maintainable production system.",
    outputs: "Web application / APIs / release foundation",
  },
  {
    situation: "AI is on the roadmap, but its value is unclear.",
    title: "Applied AI",
    description:
      "Find the use case that earns its complexity, then validate quality, cost, failure modes, and human control.",
    outputs: "Use-case test / evaluation plan / production feature",
  },
  {
    situation: "The release needs an owner.",
    title: "Cloud and delivery",
    description:
      "Create a repeatable path to production with the monitoring, documentation, and operating decisions your team needs.",
    outputs: "Deployment workflow / observability / handoff plan",
  },
]

export default function ServicesScrollSection() {
  return (
    <section
      id="services"
      className="scroll-mt-24 border-b border-[#DCE9FF] bg-[#F2F6FC] py-16 sm:py-20 lg:py-24"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#155EEF]">
              When to bring us in
            </p>
            <h2
              id="services-heading"
              className="mt-5 max-w-xl text-4xl font-semibold leading-[1] tracking-[-0.045em] text-[#0A1533] sm:text-5xl"
            >
              Start with the problem, not a menu of services.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-[#526078] lg:pt-8">
            Bring us a specific build or the decision that is holding it up. We shape the engagement around what must
            be understood, made, and handed over.
          </p>
        </div>

        <div className="mt-12 border-b border-[#DCE9FF] sm:mt-16">
          <div className="hidden grid-cols-[0.85fr_1fr_0.95fr] gap-8 border-b border-[#DCE9FF] pb-3 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#526078] lg:grid">
            <p>Your situation</p>
            <p>Surviant brings</p>
            <p>Working outputs</p>
          </div>

          {engagements.map((engagement) => (
            <article
              key={engagement.situation}
              className="grid gap-5 border-t border-[#DCE9FF] py-7 first:border-t-0 lg:grid-cols-[0.85fr_1fr_0.95fr] lg:gap-8 lg:py-8"
            >
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#526078] lg:hidden">
                  Your situation
                </p>
                <h3 className="mt-2 text-xl font-semibold leading-7 text-[#0A1533] lg:mt-0">
                  {engagement.situation}
                </h3>
              </div>
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#526078] lg:hidden">
                  Surviant brings
                </p>
                <h4 className="mt-2 text-base font-semibold text-[#155EEF] lg:mt-0">{engagement.title}</h4>
                <p className="mt-2 max-w-xl text-sm leading-6 text-[#526078]">{engagement.description}</p>
              </div>
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#526078] lg:hidden">
                  Working outputs
                </p>
                <p className="mt-2 text-sm font-medium leading-6 text-[#0A1533] lg:mt-0">{engagement.outputs}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
