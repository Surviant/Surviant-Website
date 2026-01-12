"use client"

import { useRef } from "react"
import { motion, useInView, easeInOut } from "framer-motion"
import { cn } from "@/lib/utils"

export default function TechnologiesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const technologies = [
    {
      category: "Frontend",
      items: ["React", "Next.js", "Vue.js", "Angular", "TypeScript", "Tailwind CSS", "Three.js", "WebGL"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Python", "Go", "Java", "GraphQL", "REST API", "WebSockets", "Microservices"],
    },
    {
      category: "Database",
      items: ["PostgreSQL", "MongoDB", "Redis", "Firebase", "Supabase", "MySQL", "DynamoDB", "Elasticsearch"],
    },
    {
      category: "DevOps",
      items: ["Docker", "Kubernetes", "AWS", "Google Cloud", "Azure", "CI/CD", "Terraform", "Monitoring"],
    },
    {
      category: "Mobile",
      items: ["React Native", "Flutter", "Swift", "Kotlin", "Expo", "PWA", "App Store", "Google Play"],
    },
    {
      category: "AI & ML",
      items: [
        "Large Language Models",
        "GPT-4",
        "Stable Diffusion",
        "TensorFlow",
        "PyTorch",
        "Computer Vision",
        "NLP",
        "Vector Databases",
      ],
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
      transition: { duration: 0.6, ease: easeInOut },
    },
  }

  return (
    <div className="min-h-[100dvh] min-h-screen py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6 relative overflow-hidden" ref={ref}>
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50/50 to-white" />
      
      {/* Floating Orbs for depth */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-100/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <span className="inline-block py-1 px-3 border border-blue-500/30 rounded-full text-blue-600 text-xs tracking-wider mb-3 sm:mb-4">
            OUR TECH STACK
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-2">
            Cutting-Edge <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500">
              Technologies
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-3xl mx-auto px-2">
            We leverage the latest technologies to build scalable, high-performance digital solutions that drive
            business growth.
          </p>
        </motion.div>

        {/* Scrolling Technology Names - Marquee */}
        <div className="mb-10 sm:mb-16 md:mb-20 overflow-hidden">
          <div className="py-3 sm:py-4 bg-white/30 backdrop-blur-xl rounded-2xl border border-white/50 shadow-lg">
            <div className="relative flex overflow-hidden">
              <motion.div
                className="flex gap-3 sm:gap-4"
                animate={{ x: [0, -1920] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 30,
                    ease: "linear",
                  },
                }}
              >
                {[
                  "React", "Next.js", "Vue", "Angular", "TypeScript", "Three.js", "WebGL", "GSAP",
                  "Node.js", "Python", "Go", "Rust", "Java", "GraphQL", "PostgreSQL", "MongoDB",
                  "Redis", "Docker", "Kubernetes", "AWS", "TensorFlow", "PyTorch", "OpenAI", "LangChain",
                  "React", "Next.js", "Vue", "Angular", "TypeScript", "Three.js", "WebGL", "GSAP",
                  "Node.js", "Python", "Go", "Rust", "Java", "GraphQL", "PostgreSQL", "MongoDB",
                  "Redis", "Docker", "Kubernetes", "AWS", "TensorFlow", "PyTorch", "OpenAI", "LangChain",
                ].map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/50 backdrop-blur-sm border border-white/60 rounded-full text-xs sm:text-sm text-gray-700 whitespace-nowrap flex-shrink-0"
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Technology Categories - Glassmorphism Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8"
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white/30 backdrop-blur-xl border border-white/50 shadow-xl hover:bg-white/40 hover:shadow-2xl transition-all duration-300 p-5 sm:p-6 md:p-8 group"
            >
              {/* Colored top border */}
              <div
                className={cn(
                  "absolute top-0 left-0 w-full h-1",
                  index % 6 === 0 && "bg-gradient-to-r from-cyan-500 to-teal-500",
                  index % 6 === 1 && "bg-gradient-to-r from-blue-500 to-indigo-500",
                  index % 6 === 2 && "bg-gradient-to-r from-pink-500 to-rose-500",
                  index % 6 === 3 && "bg-gradient-to-r from-green-500 to-emerald-500",
                  index % 6 === 4 && "bg-gradient-to-r from-orange-500 to-amber-500",
                  index % 6 === 5 && "bg-gradient-to-r from-red-500 to-pink-500",
                )}
              />

              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-5">{tech.category}</h3>

              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {tech.items.map((item, i) => (
                  <span
                    key={i}
                    className="px-3 sm:px-4 py-1 sm:py-1.5 bg-white/50 backdrop-blur-sm border border-white/60 rounded-full text-xs sm:text-sm font-medium text-gray-700 hover:bg-white/70 transition-all duration-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  )
}
