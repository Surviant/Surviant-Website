"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Github, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const team = [
    {
      name: "Srivant V",
      role: "Founder & CEO",
      bio: "Full-stack developer specializing in innovative solutions and digital experiences.",
      image: "/team-member-1.png",
      social: {
        twitter: "#",
        linkedin: "https://www.linkedin.com/in/srivantv/",
        github: "#",
      },
    },
    {
      name: "Dhyuthi S",
      role: "CTO",
      bio: "Full-stack developer specializing in high-performance systems and innovative solutions.",
      image: "/team-member-2.png",
      social: {
        twitter: "#",
        linkedin: "https://www.linkedin.com/in/dhyuthidhar2404/",
        github: "#",
      },
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
    transition: { duration: 0.6, ease: "easeInOut" }
  }

  return (
    <div className="min-h-[100dvh] min-h-screen py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <span className="inline-block py-1 px-3 border border-blue-500/30 rounded-full text-blue-600 text-xs tracking-wider mb-3 sm:mb-4">
            OUR STORY
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-2">
            The Team Behind <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500">
              Surviant Technologies
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-3xl mx-auto px-2">
            We're a passionate team of 35+ specialists dedicated to creating exceptional digital experiences that deliver results in a fraction of the time at a fraction of the cost.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mb-12 sm:mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col h-full"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center">Our Story</h3>
            <div className="space-y-3 sm:space-y-4 text-slate-600 text-sm sm:text-base">
              <p>
                What started in 2024 as just the two of us with a simple mission has grown into a full-service digital innovation studio. We began with a vision to help businesses succeed in the digital world through exceptional web development and innovative solutions.
              </p>
              <p>
                From those humble beginnings as a duo of passionate developers, we've carefully built a team of 35+ experts, working with clients ranging from ambitious startups to established enterprises across the globe.
              </p>
              <p>
                Our approach combines technical excellence with creative problem-solving. We don't just build websites and apps—we create digital experiences that drive business growth and deliver measurable results.
              </p>
            </div>

            <div className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-slate-200">
              <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Our Approach</h4>
              <p className="text-slate-700 mb-3 sm:mb-4 text-sm sm:text-base">
                We combine Silicon Valley innovation with streamlined efficiency. Our specialized team structure allows us to deliver enterprise-quality development at competitive rates while maintaining superior project momentum.
              </p>
              <p className="text-slate-600 text-sm sm:text-base">
                Whether you're a startup needing market validation or an enterprise requiring AI integration, we scale our approach to your needs—delivering exceptional results in a fraction of the time at a fraction of the cost.
              </p>
            </div>

            <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-3 sm:gap-6">
              {[
                { label: "Projects Completed", value: "50+" },
                { label: "Client Outcome Achievement", value: "100%" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-xl bg-white border border-slate-200 shadow-md p-3 sm:p-4 md:p-6 flex flex-col items-center text-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 -z-10" />
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 mb-1 sm:mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-600 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col h-full"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center">Our Team Structure</h3>
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 shadow-md p-4 sm:p-6 md:p-8 flex flex-col flex-grow">
              <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-10"></div>

              {/* Circle in the center with team size */}
              <div className="flex justify-center mb-6 sm:mb-8 md:mb-10">
                <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 shadow-lg shadow-blue-500/10">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">35+</div>
                    <div className="text-[10px] sm:text-xs text-slate-700 uppercase tracking-wider mt-1">Specialists</div>
                  </div>
                  <div className="absolute -inset-1 blur-sm bg-gradient-to-br from-blue-500/20 to-cyan-500/20 -z-10 rounded-full"></div>
                </div>
              </div>
              
              {/* Team structure disciplines - connected layout */}
              <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 flex-grow">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-2 sm:mb-4">
                  {[
                    { title: "Full Stack Developers", description: "Versatile engineers handling end-to-end development", color: "from-cyan-500 to-blue-600" },
                    { title: "Frontend Specialists", description: "UI/UX focused experts creating exceptional experiences", color: "from-blue-500 to-indigo-600" },
                    { title: "Backend Specialists", description: "Infrastructure and API experts building robust systems", color: "from-indigo-500 to-violet-600" },
                  ].map((discipline, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                      className="relative rounded-lg sm:rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all duration-300 overflow-hidden h-full"
                    >
                      <div className={`absolute h-1 sm:h-1.5 top-0 left-0 right-0 bg-gradient-to-r ${discipline.color}`}></div>
                      <div className="p-3 sm:p-4 md:p-6 flex flex-col h-full">
                        <div className="flex flex-col items-center text-center mb-2 sm:mb-3">
                          <h4 className={`text-sm sm:text-base md:text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r ${discipline.color}`}>
                            {discipline.title}
                          </h4>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 text-center">{discipline.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {[
                    { title: "AI Specialists", description: "Innovation drivers integrating cutting-edge AI solutions", color: "from-violet-500 to-purple-600" },
                    { title: "Product Managers", description: "Strategic leaders guiding product development", color: "from-purple-500 to-pink-600" },
                  ].map((discipline, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      className="relative rounded-lg sm:rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all duration-300 overflow-hidden h-full"
                    >
                      <div className={`absolute h-1 sm:h-1.5 top-0 left-0 right-0 bg-gradient-to-r ${discipline.color}`}></div>
                      <div className="p-3 sm:p-4 md:p-6 flex flex-col h-full">
                        <div className="flex flex-col items-center text-center mb-2 sm:mb-3">
                          <h4 className={`text-sm sm:text-base md:text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r ${discipline.color}`}>
                            {discipline.title}
                          </h4>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 text-center">{discipline.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="text-center text-[10px] sm:text-xs text-slate-500 mt-2 sm:mt-4 pt-2 sm:pt-3 border-t border-slate-200">
                  All specialists equally represented across project teams
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-12 sm:mt-16 md:mt-20"
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 md:mb-10 text-center">Meet Our Leadership Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-[280px] sm:h-[320px] md:h-[380px] overflow-hidden bg-slate-100">
                  <Image
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 50vw"
                    priority
                    className="object-cover object-[center_10%] scale-[1.15]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 sm:p-6 w-full">
                      <div className="flex justify-center space-x-3">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="rounded-full bg-white/10 backdrop-blur-sm h-9 w-9 min-h-[44px] min-w-[44px]"
                        >
                          <Twitter className="h-4 w-4" />
                        </Button>
                        <a
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full bg-white/10 backdrop-blur-sm h-9 w-9 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-white/20 transition-colors"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="rounded-full bg-white/10 backdrop-blur-sm h-9 w-9 min-h-[44px] min-w-[44px]"
                        >
                          <Github className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-5 md:p-6">
                  <h4 className="text-lg sm:text-xl font-bold mb-1 text-slate-900 group-hover:text-blue-600 transition-colors">{member.name}</h4>
                  <p className="text-sm text-blue-600 mb-2 sm:mb-3">{member.role}</p>
                  <p className="text-slate-600 text-xs sm:text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Our Values Section - Glassmorphism Design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="relative mt-12 sm:mt-16 md:mt-20"
        >
          {/* Floating particles background */}
          <div className="absolute inset-0 overflow-hidden rounded-[32px]">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-cyan-400/30"
                style={{
                  left: `${((i * 37 + 13) % 100)}%`,
                  top: `${((i * 53 + 7) % 100)}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 3 + ((i * 17) % 20) / 10,
                  repeat: Infinity,
                  delay: ((i * 23) % 20) / 10,
                }}
              />
            ))}
          </div>

          {/* Main glassmorphism container */}
          <div className="relative p-6 sm:p-8 md:p-10 lg:p-12 rounded-[32px] bg-gradient-to-br from-gray-50/95 via-white/90 to-gray-100/95 backdrop-blur-xl shadow-[0_8px_60px_rgba(0,0,0,0.08)] border border-white/60">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
              {/* Left side - Heading */}
              <div className="lg:col-span-1">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                  Our Values
                </h3>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                  These core principles guide everything we do and define who we are as a company.
                </p>
              </div>

              {/* Right side - 2x2 Grid of value cards */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {[
                    { title: "Innovation", description: "We constantly push boundaries and explore new technologies to deliver cutting-edge solutions." },
                    { title: "Excellence", description: "We are committed to delivering the highest quality in everything we do, exceeding expectations." },
                    { title: "Collaboration", description: "We believe the best results come from working closely with our clients as true partners." },
                    { title: "Integrity", description: "We operate with transparency and honesty in all our interactions, building lasting trust." },
                  ].map((value, index) => (
                    <motion.div
                      key={index}
                      className="group relative p-5 sm:p-6 rounded-[20px] bg-gradient-to-br from-white to-gray-50/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_4px_24px_rgba(0,0,0,0.06)] border border-gray-100/80 transition-all duration-300 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_8px_40px_rgba(6,182,212,0.15)] hover:-translate-y-1"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <h4 className="text-lg sm:text-xl font-bold mb-2 text-transparent bg-gradient-to-r from-cyan-600 to-teal-500 bg-clip-text">
                        {value.title}
                      </h4>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {value.description}
                      </p>
                      {/* Subtle glow effect on hover */}
                      <div className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-cyan-500/0 to-teal-500/0 group-hover:from-cyan-500/5 group-hover:to-teal-500/5 transition-all duration-300 pointer-events-none" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
