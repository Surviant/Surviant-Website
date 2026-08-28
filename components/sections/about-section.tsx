"use client"

import { useRef } from "react"
import Image from "next/image"
import { Linkedin } from "lucide-react"
import { motion, useInView, useReducedMotion } from "framer-motion"

const team = [
  {
    name: "Srivant V",
    role: "Founder & CEO",
    bio: "Full-stack developer focused on product strategy, thoughtful interfaces, and dependable delivery.",
    image: "/team-member-1.png",
    linkedin: "https://www.linkedin.com/in/srivantv/",
  },
  {
    name: "Dhyuthi S",
    role: "CTO",
    bio: "Full-stack developer focused on scalable systems, performance, and practical technical execution.",
    image: "/team-member-2.webp",
    linkedin: "https://www.linkedin.com/in/dhyuthidhar2404/",
  },
]

const workingPrinciples = [
  {
    title: "Start with clarity",
    description: "We define the problem, audience, and success criteria before implementation begins.",
  },
  {
    title: "Work as one team",
    description: "Product thinking, design, and engineering stay aligned throughout delivery.",
  },
  {
    title: "Build for the long term",
    description: "We favor maintainable systems, clear communication, and reliable handoffs.",
  },
]

const values = [
  {
    title: "Curiosity",
    description: "We explore better ways to solve meaningful product and engineering problems.",
  },
  {
    title: "Craft",
    description: "We care about the details that make digital products useful, clear, and dependable.",
  },
  {
    title: "Collaboration",
    description: "We work closely with clients and make decisions with shared context.",
  },
  {
    title: "Integrity",
    description: "We communicate openly, set realistic expectations, and follow through.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeInOut" as const },
  },
}

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      ref={ref}
      aria-labelledby="about-heading"
      className="min-h-screen px-4 py-12 sm:px-6 sm:py-16 md:py-20"
    >
      <div className="container mx-auto max-w-7xl">
        <motion.header
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
          className="mx-auto mb-10 max-w-3xl text-center sm:mb-12"
        >
          <span className="mb-3 inline-block rounded-full border border-blue-500/30 px-3 py-1 text-xs font-medium tracking-wider text-blue-700 sm:mb-4">
            OUR STORY
          </span>
          <h2
            id="about-heading"
            className="mb-4 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl"
          >
            The people behind{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Surviant Technologies
            </span>
          </h2>
          <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
            We pair product thinking, design, engineering, and AI expertise to help teams turn ideas into dependable
            digital products.
          </p>
        </motion.header>

        <div className="mb-14 grid gap-6 sm:mb-16 lg:grid-cols-2 lg:gap-8">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="mb-4 text-2xl font-bold text-slate-900">Our story</h3>
            <div className="space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              <p>
                Surviant began as a small development partnership with a shared interest in building useful, polished
                digital experiences.
              </p>
              <p>
                Today, we bring product strategy and technical execution together so clients can move from an early
                concept to a solution that is ready to evolve.
              </p>
            </div>
          </article>

          <article className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50/60 p-6 sm:p-8">
            <h3 className="mb-5 text-2xl font-bold text-slate-900">How we work</h3>
            <div className="space-y-5">
              {workingPrinciples.map((principle, index) => (
                <div key={principle.title} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white"
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h4 className="font-semibold text-slate-900">{principle.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{principle.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>

        <motion.div
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial={shouldReduceMotion ? undefined : "hidden"}
          animate={shouldReduceMotion ? undefined : isInView ? "visible" : "hidden"}
          className="mb-14 sm:mb-16"
        >
          <div className="mx-auto mb-7 max-w-2xl text-center sm:mb-9">
            <h3 className="text-2xl font-bold text-slate-900 sm:text-3xl">Meet the leadership team</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              Hands-on technical leadership keeps product decisions and delivery closely connected.
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
            {team.map((member) => (
              <motion.article
                key={member.name}
                variants={shouldReduceMotion ? undefined : itemVariants}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                  <Image
                    src={member.image}
                    alt={`Portrait of ${member.name}, ${member.role} at Surviant Technologies`}
                    fill
                    sizes="(max-width: 640px) calc(100vw - 2rem), 448px"
                    className="object-cover object-[center_12%]"
                  />
                </div>

                <div className="p-5 sm:p-6">
                  <h4 className="text-xl font-bold text-slate-900">{member.name}</h4>
                  <p className="mt-1 text-sm font-medium text-blue-700">{member.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{member.bio}</p>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${member.name}'s LinkedIn profile`}
                    className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                  >
                    <Linkedin aria-hidden="true" className="h-4 w-4" />
                    LinkedIn
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8 lg:p-10">
          <div className="grid gap-7 lg:grid-cols-[0.8fr_2fr] lg:gap-10">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 sm:text-3xl">What guides us</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                These principles shape how we make decisions and work with clients.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {values.map((value) => (
                <article key={value.title} className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                  <h4 className="text-lg font-bold text-blue-700">{value.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{value.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
