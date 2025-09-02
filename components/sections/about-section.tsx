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
        linkedin: "#",
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
        linkedin: "#",
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
    <div className="min-h-screen py-20 px-4" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block py-1 px-3 border border-cyan-500/30 rounded-full text-cyan-500 text-xs tracking-wider mb-4">
            OUR STORY
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The Team Behind <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600">
              Surviant Technologies
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            We're a diverse team of designers, developers, and digital strategists passionate about creating exceptional
            digital experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6">Our Mission</h3>
            <div className="space-y-4 text-gray-300">
              <p>
                Founded in 2024, Surviant Technologies began with a simple mission: to help businesses succeed in the
                digital world through exceptional web development and innovative design.
              </p>
              <p>
                What started as a small team of passionate developers has grown into a full-service digital innovation
                studio, working with clients ranging from ambitious startups to established enterprises across the
                globe.
              </p>
              <p>
                Our approach combines technical excellence with creative problem-solving. We don't just build websites
                and apps—we create digital experiences that drive business growth and deliver measurable results.
              </p>
            </div>

            <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-600/10 border border-gray-800">
              <h4 className="text-xl font-bold mb-4">Our Approach</h4>
              <p className="text-gray-300 mb-4">
                We combine Silicon Valley innovation with global efficiency. Our distributed team model allows us to
                offer enterprise-quality development at competitive rates while maintaining 24/7 project momentum.
              </p>
              <p className="text-gray-300">
                Whether you're a startup needing market validation or an enterprise requiring AI integration, we scale
                our approach to your needs.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 gap-6"
          >
            {[
              { label: "Projects Completed", value: "150+" },
              { label: "Client Satisfaction", value: "98%" },
              { label: "Global Clients", value: "50+" },
              { label: "Faster Delivery", value: "30%" },
            ].map((stat, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-xl backdrop-blur-sm bg-black/20 border border-gray-800 p-6 flex flex-col items-center text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-600/5 -z-10" />
                <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold mb-10 text-center">Meet Our Leadership Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-xl backdrop-blur-sm bg-black/20 border border-gray-800 hover:border-gray-700 transition-all duration-300"
              >
                <div className="relative h-[380px] overflow-hidden bg-gray-900">
                  <Image 
                    src={member.image} 
                    alt={`${member.name} - ${member.role}`} 
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    className="object-cover object-[center_10%] scale-[1.15]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6 w-full">
                      <div className="flex justify-center space-x-3">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="rounded-full bg-white/10 backdrop-blur-sm h-9 w-9"
                        >
                          <Twitter className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="rounded-full bg-white/10 backdrop-blur-sm h-9 w-9"
                        >
                          <Linkedin className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="rounded-full bg-white/10 backdrop-blur-sm h-9 w-9"
                        >
                          <Github className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="text-xl font-bold mb-1 group-hover:text-cyan-500 transition-colors">{member.name}</h4>
                  <p className="text-cyan-500 text-sm mb-3">{member.role}</p>
                  <p className="text-gray-400 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 p-8 rounded-xl border border-gray-800 backdrop-blur-sm bg-black/20"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h3 className="text-2xl font-bold mb-4">Our Values</h3>
              <p className="text-gray-400">
                These core principles guide everything we do and define who we are as a company.
              </p>
            </div>

            <div className="md:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "Innovation", description: "We constantly push boundaries and explore new technologies." },
                  {
                    title: "Excellence",
                    description: "We are committed to delivering the highest quality in everything we do.",
                  },
                  {
                    title: "Collaboration",
                    description: "We believe the best results come from working closely with our clients.",
                  },
                  {
                    title: "Integrity",
                    description: "We operate with transparency and honesty in all our interactions.",
                  },
                ].map((value, index) => (
                  <div key={index} className="p-4 rounded-lg bg-gray-800/20 border border-gray-800">
                    <h4 className="text-lg font-bold mb-2 text-cyan-500">{value.title}</h4>
                    <p className="text-gray-400 text-sm">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
