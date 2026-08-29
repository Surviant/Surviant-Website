import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/lib/content/site"

export default function LeadershipTeaserSection() {
  return (
    <section id="about" className="scroll-mt-24 border-b border-[#DCE9FF] bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="leadership-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end lg:gap-16">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#155EEF]">Leadership / Directly involved</p>
            <h2 id="leadership-heading" className="mt-5 max-w-xl text-4xl font-semibold leading-[1] tracking-[-0.045em] text-[#0A1533] sm:text-5xl">
              The people leading the engagement stay close to the work.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#526078]">
              Surviant connects product direction and engineering leadership across the Bay Area and India, with a shared view of the business problem and the system being built.
            </p>
            <Link href="/about" className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#155EEF] underline decoration-[#DCE9FF] underline-offset-4 hover:text-[#0A1533] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF]">
              Meet the leadership team
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2">
            {siteConfig.leaders.map((leader, index) => (
              <article key={leader.name} className={`grid grid-cols-[7rem_1fr] gap-5 border-y border-[#DCE9FF] py-6 sm:grid-cols-1 sm:border-y-0 sm:py-0 ${index === 1 ? "border-t-0 sm:border-l sm:pl-7" : "sm:pr-7"}`}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-[#DCE9FF] sm:max-w-[15rem]">
                  <Image src={leader.image} alt={`Portrait of ${leader.name}`} fill sizes="(max-width: 640px) 112px, 240px" className="object-cover object-[center_12%]" />
                </div>
                <div className="self-end sm:mt-5">
                  <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.13em] text-[#155EEF]">{leader.role}</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.025em] text-[#0A1533]">{leader.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#526078]">{leader.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
