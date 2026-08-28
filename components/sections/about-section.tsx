import { Linkedin } from "lucide-react"
import Image from "next/image"

const team = [
  {
    name: "Srivant V",
    role: "Founder & CEO / Product lead",
    bio: "Srivant leads product direction and full-stack development, connecting early product decisions to the interface and implementation.",
    image: "/team-member-1.png",
    linkedin: "https://www.linkedin.com/in/srivantv/",
  },
  {
    name: "Dhyuthi S",
    role: "CTO / Engineering lead",
    bio: "Dhyuthi leads technical architecture and full-stack engineering, with a focus on system structure, performance, and reliable delivery.",
    image: "/team-member-2.webp",
    linkedin: "https://www.linkedin.com/in/dhyuthidhar2404/",
  },
]

const workingMethod = [
  {
    number: "01",
    title: "Frame the problem",
    description: "We clarify the problem, the people using the product, and what needs to ship first.",
  },
  {
    number: "02",
    title: "Design with engineering",
    description:
      "Interface and system decisions are reviewed together so each choice works in the product and in the code.",
  },
  {
    number: "03",
    title: "Hand over clearly",
    description:
      "We deliver the working product with documentation and a clear account of the decisions behind it.",
  },
]

export default function AboutSection() {
  return (
    <section aria-labelledby="about-heading" className="border-b border-[#DCE9FF] bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#155EEF]">
              About / Surviant
            </p>
            <h2
              id="about-heading"
              className="mt-5 max-w-3xl text-4xl font-semibold leading-[1] tracking-[-0.045em] text-[#0A1533] sm:text-5xl"
            >
              Product decisions and engineering decisions happen at the same table.
            </h2>
          </div>
          <p className="max-w-xl border-l-2 border-[#155EEF] pl-5 text-lg leading-8 text-[#526078] sm:pl-7 lg:mt-8">
            Surviant is led by two full-stack developers who stay directly involved from product framing through
            implementation and handoff.
          </p>
        </div>

        <div className="mt-14 grid gap-8 border-t border-[#DCE9FF] pt-8 lg:grid-cols-[0.55fr_1.45fr] lg:gap-16 sm:mt-16">
          <h3 className="text-2xl font-semibold text-[#0A1533]">How the work moves</h3>
          <ol className="border-b border-[#DCE9FF]">
            {workingMethod.map((item) => (
              <li key={item.number} className="grid gap-3 border-t border-[#DCE9FF] py-6 first:border-t-0 sm:grid-cols-[5rem_0.8fr_1.2fr] sm:gap-6">
                <p className="font-mono text-xs font-semibold tracking-[0.14em] text-[#155EEF]">{item.number}</p>
                <h4 className="text-lg font-semibold text-[#0A1533]">{item.title}</h4>
                <p className="text-sm leading-6 text-[#526078]">{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="border-t border-[#DCE9FF] bg-[#F2F6FC]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid gap-6 border-b border-[#DCE9FF] pb-8 lg:grid-cols-[0.6fr_1.4fr] lg:items-end">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#155EEF]">
              Leadership / Directly involved
            </p>
            <h3 className="max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.035em] text-[#0A1533] sm:text-4xl">
              The people leading the engagement stay close to the work.
            </h3>
          </div>

          <div className="grid lg:grid-cols-2">
            {team.map((member, index) => (
              <article
                key={member.name}
                className={`grid gap-6 border-b border-[#DCE9FF] py-8 sm:grid-cols-[minmax(10rem,0.75fr)_minmax(0,1fr)] sm:items-end lg:border-b-0 lg:py-10 ${
                  index === 0 ? "lg:pr-10" : "lg:border-l lg:pl-10"
                }`}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-[#DCE9FF]">
                  <Image
                    src={member.image}
                    alt={`Portrait of ${member.name}`}
                    fill
                    sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 1024px) 40vw, 280px"
                    className="object-cover object-[center_12%]"
                  />
                </div>
                <div>
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.13em] text-[#155EEF]">
                    {member.role}
                  </p>
                  <h4 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#0A1533]">{member.name}</h4>
                  <p className="mt-4 text-sm leading-6 text-[#526078]">{member.bio}</p>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#0A1533] underline decoration-[#DCE9FF] underline-offset-4 transition-colors hover:text-[#155EEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF]"
                  >
                    <Linkedin className="h-4 w-4" aria-hidden="true" />
                    LinkedIn profile
                    <span className="sr-only"> for {member.name}, opens in a new tab</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
