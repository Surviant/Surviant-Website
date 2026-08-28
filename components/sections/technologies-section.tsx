import { ArrowRight, BrainCircuit, Cloud, Code2, Database, type LucideIcon } from "lucide-react"
import Link from "next/link"

type TechnologyGroup = {
  title: string
  description: string
  items: string[]
  icon: LucideIcon
}

const technologyGroups: TechnologyGroup[] = [
  {
    title: "Product interfaces",
    description: "Fast, accessible experiences for browsers and connected devices.",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    icon: Code2,
  },
  {
    title: "Application systems",
    description: "Maintainable services and APIs that support real product growth.",
    items: ["Node.js", "Python", "Go", "REST and GraphQL"],
    icon: Database,
  },
  {
    title: "Data and infrastructure",
    description: "Secure foundations for data, releases, and reliable operations.",
    items: ["PostgreSQL", "Redis", "Docker", "AWS and Railway"],
    icon: Cloud,
  },
  {
    title: "Applied intelligence",
    description: "Purpose-built AI features with evaluation and human control in the loop.",
    items: ["Language models", "PyTorch", "Vector search", "AI evaluation"],
    icon: BrainCircuit,
  },
]

export default function TechnologiesSection() {
  return (
    <section
      id="technology"
      className="scroll-mt-24 border-y border-slate-800 bg-slate-950 py-20 text-white sm:py-24 lg:py-28"
      aria-labelledby="technology-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Technology</p>
            <h2
              id="technology-heading"
              className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl"
            >
              A focused stack, chosen around the product.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg lg:justify-self-end">
            We use mature foundations where they matter and emerging technology where it creates a clear advantage. The
            goal is a system your team can understand, operate, and extend.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {technologyGroups.map((group) => {
            const Icon = group.icon
            return (
              <article
                key={group.title}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6 sm:p-7"
              >
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-200 ring-1 ring-inset ring-cyan-200/15">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{group.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{group.description}</p>
                  </div>
                </div>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${group.title} technologies`}>
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-white/10 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-200"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>

        <div className="mt-5 grid gap-5 overflow-hidden rounded-[1.5rem] border border-blue-300/20 bg-gradient-to-r from-blue-800 to-cyan-800 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">Surviant Labs</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">See how we evaluate the AI and ML landscape.</h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-blue-100">
              Our research map explains the tools, methods, and maturity levels behind modern intelligent systems.
            </p>
          </div>
          <Link
            href="/research/ai-ml"
            className="group inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-blue-900 transition-colors hover:bg-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-800"
          >
            Explore AI and ML research
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
