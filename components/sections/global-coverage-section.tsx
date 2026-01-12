"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, Variants } from "framer-motion"
import { Clock, Users, Zap, Globe, ArrowRight, Sun, Moon } from "lucide-react"
import DualTimeline from "@/components/ui/dual-timeline"

export default function GlobalCoverageSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [currentTime, setCurrentTime] = useState(new Date())
  const [handoffPhase, setHandoffPhase] = useState<"california" | "handoff" | "india" | "receiving">("california")

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  // Simulate handoff phases
  useEffect(() => {
    const phases: (typeof handoffPhase)[] = ["california", "handoff", "india", "receiving"]
    let currentIndex = 0

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % phases.length
      setHandoffPhase(phases[currentIndex])
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const getTimeInZone = (timezone: string) => {
    return new Date().toLocaleString("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  const isWorkingHours = (timezone: string) => {
    const hour = new Date().toLocaleString("en-US", {
      timeZone: timezone,
      hour: "numeric",
      hour12: false,
    })
    return Number.parseInt(hour) >= 8 && Number.parseInt(hour) <= 20
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "circOut" },
    },
  }

  return (
    <div className="min-h-[100dvh] min-h-screen py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6 relative" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <span className="inline-block py-1 px-3 border border-blue-500/30 rounded-full text-blue-600 text-xs tracking-wider mb-3 sm:mb-4">
            GLOBAL DEVELOPMENT
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-2">
            Your Project <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500">
              Never Sleeps
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-3xl mx-auto px-2">
            While you sleep, we build. Our strategically distributed team across California and India ensures continuous
            progress with seamless 24/7 development handoffs.
          </p>
        </motion.div>


        {/* Timeline Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8 sm:mb-12 md:mb-16 timeline-container overflow-x-auto"
        >
          <DualTimeline />
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12 md:mb-16"
        >
          {[
            {
              icon: <Clock className="h-5 w-5 sm:h-6 sm:w-6" />,
              title: "24/7 Development",
              description: "16+ hour development window with seamless handoffs",
              color: "from-cyan-500 to-blue-500",
              stat: "24/7",
            },
            {
              icon: <Zap className="h-5 w-5 sm:h-6 sm:w-6" />,
              title: "Faster Delivery",
              description: "50% faster project completion with continuous progress",
              color: "from-purple-500 to-indigo-500",
              stat: "50%",
            },
            {
              icon: <Users className="h-5 w-5 sm:h-6 sm:w-6" />,
              title: "Expert Teams",
              description: "Silicon Valley innovation meets global efficiency",
              color: "from-pink-500 to-rose-500",
              stat: "2x",
            },
            {
              icon: <Globe className="h-5 w-5 sm:h-6 sm:w-6" />,
              title: "Global Reach",
              description: "Strategic time zone coverage for optimal productivity",
              color: "from-green-500 to-emerald-500",
              stat: "12+",
            },
          ].map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-lg sm:rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 p-3 sm:p-4 md:p-6"
            >
              <div
                className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10"
                style={{
                  background: `linear-gradient(to bottom right, ${benefit.color.split(" ")[0].replace("from-", "")}, ${benefit.color.split(" ")[1].replace("to-", "")})`,
                }}
              />

              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-2 sm:mb-3 md:mb-4 bg-gradient-to-br ${benefit.color}`}
              >
                {benefit.icon}
              </div>

              <div className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500">
                {benefit.stat}
              </div>

              <h3 className="text-sm sm:text-base md:text-lg font-bold mb-1 sm:mb-2 text-slate-900 group-hover:text-blue-600 transition-colors">{benefit.title}</h3>

              <p className="text-slate-600 text-xs sm:text-sm hidden sm:block">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Development Process Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="relative p-6 sm:p-8 md:p-10 rounded-2xl overflow-hidden shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
          }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
          
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 md:mb-10 text-center text-white relative z-10">
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
              ⏰ 24-Hour Development Cycle
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 relative z-10">
            {/* California Phase */}
            <motion.div 
              className="bg-white/95 backdrop-blur-md rounded-xl p-5 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-3 mb-4 sm:mb-5">
                <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg shadow-lg">
                  <Sun className="h-6 w-6 sm:h-7 sm:w-7 text-white flex-shrink-0" />
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900">California Phase</h4>
                  <p className="text-xs sm:text-sm text-slate-600">8 AM - 6 PM PST</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  "Client meetings and requirement gathering",
                  "Frontend development and UI/UX design",
                  "Code reviews and architecture decisions",
                  "Handoff preparation and documentation",
                ].map((task, index) => (
                  <div key={index} className="flex items-start gap-3 group">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex-shrink-0 mt-2 group-hover:scale-150 transition-transform"></div>
                    <span className="text-slate-700 text-sm sm:text-base group-hover:text-slate-900 transition-colors">{task}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* India Phase */}
            <motion.div 
              className="bg-white/95 backdrop-blur-md rounded-xl p-5 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-3 mb-4 sm:mb-5">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg">
                  <Moon className="h-6 w-6 sm:h-7 sm:w-7 text-white flex-shrink-0" />
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900">India Phase</h4>
                  <p className="text-xs sm:text-sm text-slate-600">8 AM - 6 PM IST</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  "Backend API development and database work",
                  "Testing and quality assurance",
                  "DevOps and deployment processes",
                  "Progress documentation for handoff",
                ].map((task, index) => (
                  <div key={index} className="flex items-start gap-3 group">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex-shrink-0 mt-2 group-hover:scale-150 transition-transform"></div>
                    <span className="text-slate-700 text-sm sm:text-base group-hover:text-slate-900 transition-colors">{task}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Progress Bar */}
          <div className="mt-8 sm:mt-10 p-5 sm:p-6 bg-white/95 backdrop-blur-md rounded-xl shadow-xl relative z-10">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm sm:text-base font-semibold text-slate-900">🚀 Daily Progress</span>
              <span className="px-3 py-1 text-xs sm:text-sm bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-full shadow-lg">Continuous</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3 sm:h-4 overflow-hidden shadow-inner">
              <motion.div
                className="h-3 sm:h-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-full relative"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, delay: 1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </motion.div>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 mt-3 font-medium text-center">
              ⚡ Your project progresses 16+ hours daily with our global team coordination
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
