"use client"

import React from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

type HeroSectionProps = {
  onExplore?: () => void
}

// Pre-generated particle positions to avoid hydration mismatch
const particleData = Array.from({ length: 50 }, (_, i) => ({
  left: ((i * 37 + 13) % 100),
  top: ((i * 53 + 7) % 100),
  duration: 3 + ((i * 17) % 20) / 10,
  delay: ((i * 23) % 20) / 10,
}))

export function HeroSection({ onExplore }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-50/50 via-white to-white" />
        {particleData.map((particle, index) => (
          <motion.div
            key={`particle-${index}`}
            className="absolute h-1 w-1 rounded-full bg-cyan-300/40"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-2 text-5xl font-bold text-gray-900 md:text-6xl lg:text-7xl"
        >
          We Build
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 text-4xl font-bold text-transparent md:text-5xl lg:text-6xl bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text pb-2"
        >
          Complete Digital Solutions
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl"
        >
          From startup strategy to AI-powered applications, we transform your digital vision into reality with our global
          team&apos;s 24/7 development coverage.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button
            type="button"
            onClick={onExplore}
            className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-base font-medium text-white transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
          >
            View Our Services
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <Link
            href="/contact"
            className="flex items-center gap-2 rounded-full border-2 border-cyan-500 px-8 py-4 text-base font-medium text-cyan-600 transition-all duration-300 hover:bg-cyan-50"
          >
            Start Your Project
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
