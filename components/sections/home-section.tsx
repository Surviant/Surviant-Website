"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import FloatingElements from "@/components/ui/floating-elements"
import { useMediaQuery } from "@/hooks/use-media-query"

interface HomeSectionProps {
  onExplore: () => void
}

export default function HomeSection({ onExplore }: HomeSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const controls = useAnimation()
  const [hasWebGL, setHasWebGL] = useState(true)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Check for WebGL support
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      setHasWebGL(!!gl)
    } catch (e) {
      setHasWebGL(false)
    }
  }, [])

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <div className="relative min-h-[100dvh] min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 overflow-hidden" ref={ref}>
      {/* 3D Floating Elements - conditionally rendered based on WebGL support and not on mobile */}
      {hasWebGL && !isMobile && <FloatingElements />}

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="max-w-5xl mx-auto text-center z-10 w-full"
      >
        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight tracking-tight pt-4 sm:pt-8 md:pt-12"
        >
          <span className="block">We Build</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 pb-2 inline-block">
            Complete Digital Solutions
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 px-2 text-balance leading-relaxed"
        >
          From startup strategy to AI-powered applications, we transform your digital vision into reality with our
          global team's 24/7 development coverage.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
          <Button
            size={isMobile ? "default" : "lg"}
            onClick={onExplore}
            className="bg-blue-500 hover:bg-blue-600 text-white border-0 rounded-full px-6 sm:px-8 min-h-[48px] sm:min-h-[52px] text-sm sm:text-base font-semibold w-full sm:w-auto shadow-md hover:shadow-lg transition-all"
          >
            View Our Services
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <Link href="/contact" className="w-full sm:w-auto">
            <Button
              size={isMobile ? "default" : "lg"}
              variant="outline"
              className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 rounded-full px-6 sm:px-8 bg-white min-h-[48px] sm:min-h-[52px] text-sm sm:text-base font-semibold w-full shadow-sm hover:shadow-md transition-all"
            >
              Start Your Project
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
