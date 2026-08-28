import {
  Blocks,
  Bot,
  CloudCog,
  Compass,
  Gauge,
  PanelsTopLeft,
  type LucideIcon,
} from "lucide-react"

type Service = {
  title: string
  description: string
  outcomes: string[]
  icon: LucideIcon
  className: string
  featured?: boolean
}

const services: Service[] = [
  {
    title: "Product strategy",
    description: "Shape the right product before investing in the build.",
    outcomes: ["Opportunity framing", "Roadmaps and scope", "Technical direction"],
    icon: Compass,
    className: "lg:col-span-5",
    featured: true,
  },
  {
    title: "Experience design",
    description: "Create a clear, useful experience grounded in real user needs.",
    outcomes: ["UX flows", "Interface design", "Design systems"],
    icon: PanelsTopLeft,
    className: "lg:col-span-7",
  },
  {
    title: "Web and platform engineering",
    description: "Build reliable customer experiences, internal tools, and connected platforms.",
    outcomes: ["Full-stack applications", "APIs and integrations", "Responsive web experiences"],
    icon: Blocks,
    className: "lg:col-span-7",
  },
  {
    title: "AI and automation",
    description: "Apply AI where it produces a practical improvement, not another layer of complexity.",
    outcomes: ["AI product features", "Workflow automation", "Knowledge and agent systems"],
    icon: Bot,
    className: "lg:col-span-5",
  },
  {
    title: "Cloud and delivery",
    description: "Create an operating foundation that supports secure, repeatable releases.",
    outcomes: ["Cloud architecture", "CI and CD", "Observability and reliability"],
    icon: CloudCog,
    className: "lg:col-span-6",
  },
  {
    title: "Optimization and growth",
    description: "Improve performance and product quality after the first release.",
    outcomes: ["Performance reviews", "Quality engineering", "Continuous product iteration"],
    icon: Gauge,
    className: "lg:col-span-6",
  },
]

export default function ServicesScrollSection() {
  return (
    <section
      id="services"
      className="scroll-mt-24 border-b border-slate-200 bg-slate-50 py-20 sm:py-24 lg:py-28"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-800">What we do</p>
            <h2
              id="services-heading"
              className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl lg:text-5xl"
            >
              The capabilities to move from question to product.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg lg:justify-self-end">
            Bring us a specific build or an open problem. We assemble the right mix of strategy, design, engineering,
            and AI around the outcome you need.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-12 lg:gap-5">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <article
                key={service.title}
                className={`relative overflow-hidden rounded-[1.5rem] border p-6 sm:p-7 ${service.className} ${
                  service.featured
                    ? "border-slate-800 bg-slate-950 text-white shadow-[0_20px_50px_rgba(15,23,42,0.16)]"
                    : "border-slate-200 bg-white text-slate-950 shadow-[0_12px_40px_rgba(15,23,42,0.04)]"
                }`}
              >
                {service.featured && (
                  <div
                    className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl"
                    aria-hidden="true"
                  />
                )}

                <div
                  className={`relative inline-flex h-11 w-11 items-center justify-center rounded-2xl ${
                    service.featured
                      ? "bg-blue-400/15 text-cyan-200 ring-1 ring-inset ring-blue-300/20"
                      : "bg-blue-50 text-blue-800 ring-1 ring-inset ring-blue-100"
                  }`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>

                <h3 className="relative mt-7 text-xl font-semibold tracking-tight sm:text-2xl">{service.title}</h3>
                <p
                  className={`relative mt-3 max-w-2xl text-sm leading-6 sm:text-base ${
                    service.featured ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {service.description}
                </p>

                <ul
                  className={`relative mt-7 grid gap-2 border-t pt-5 text-sm sm:grid-cols-3 ${
                    service.featured ? "border-white/10 text-slate-200" : "border-slate-200 text-slate-700"
                  }`}
                >
                  {service.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-2">
                      <span
                        className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
                          service.featured ? "bg-cyan-300" : "bg-blue-700"
                        }`}
                        aria-hidden="true"
                      />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
