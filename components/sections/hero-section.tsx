import { ArrowRight, Check, Sparkles } from "lucide-react"
import Link from "next/link"

const deliveryTracks = [
  {
    number: "01",
    title: "Clarify the opportunity",
    description: "Align the product, audience, and business case before code begins.",
  },
  {
    number: "02",
    title: "Design the experience",
    description: "Turn the strategy into a clear system that is easy to use and evolve.",
  },
  {
    number: "03",
    title: "Build for production",
    description: "Engineer, test, launch, and improve the product with one accountable team.",
  },
]

const capabilities = ["Product strategy", "UX and UI design", "Full-stack engineering", "Applied AI"]

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative isolate scroll-mt-24 overflow-hidden border-b border-slate-200 bg-white"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:64px_64px] opacity-35 [mask-image:linear-gradient(to_bottom,black,transparent_88%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-36 top-16 -z-10 h-[30rem] w-[30rem] rounded-full bg-blue-200/50 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-cyan-100/70 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto grid min-h-[calc(100svh-4.75rem)] max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-800">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Strategy to production
          </div>

          <h1
            id="hero-heading"
            className="text-balance text-4xl font-semibold leading-[1.03] tracking-[-0.045em] text-slate-950 sm:text-5xl md:text-6xl lg:text-[4.5rem]"
          >
            Digital products built for what comes next.
          </h1>

          <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-slate-600 sm:text-xl">
            Surviant brings product strategy, experience design, engineering, and practical AI together to move a strong
            idea into a dependable product.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-blue-800 px-6 py-3.5 text-base font-semibold text-white shadow-[0_12px_30px_rgba(30,64,175,0.2)] transition-colors hover:bg-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
            >
              Start a project
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-800 shadow-sm transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
            >
              Explore our capabilities
            </a>
          </div>

          <ul className="mt-10 grid gap-x-6 gap-y-3 border-t border-slate-200 pt-7 sm:grid-cols-2" aria-label="Core capabilities">
            {capabilities.map((capability) => (
              <li key={capability} className="flex items-center gap-2.5 text-sm font-medium text-slate-700">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-cyan-100 text-cyan-800">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                {capability}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-blue-100 to-cyan-100 blur-xl" aria-hidden="true" />
          <div className="overflow-hidden rounded-[1.75rem] border border-slate-700 bg-slate-950 p-5 text-white shadow-[0_28px_80px_rgba(15,23,42,0.22)] sm:p-7">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Product delivery system</p>
                <h2 className="mt-1 text-lg font-semibold">One connected path to launch</h2>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-300 ring-1 ring-inset ring-emerald-300/20">
                <span className="h-2 w-2 rounded-full bg-emerald-300" aria-hidden="true" />
                Ready
              </span>
            </div>

            <ol className="mt-5 space-y-3">
              {deliveryTracks.map((track) => (
                <li
                  key={track.number}
                  className="grid grid-cols-[auto_1fr] gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/15 text-xs font-bold text-blue-200 ring-1 ring-inset ring-blue-300/20">
                    {track.number}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-white">{track.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-400">{track.description}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-5 flex flex-col gap-3 rounded-2xl bg-gradient-to-r from-blue-700 to-cyan-700 p-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-sm text-sm font-medium leading-6 text-blue-50">
                Clear decisions, visible progress, and production quality from the first sprint.
              </p>
              <span className="shrink-0 text-xs font-bold uppercase tracking-[0.16em] text-white">Surviant method</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
