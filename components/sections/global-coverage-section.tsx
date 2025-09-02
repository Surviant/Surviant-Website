"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Clock, Users, Zap, Globe, ArrowRight, Sun, Moon } from "lucide-react"
import WorldMapVisualization from "@/components/ui/world-map-visualization"

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
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
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
            GLOBAL DEVELOPMENT
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Your Project <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600">
              Never Sleeps
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            While you sleep, we build. Our strategically distributed team across California and India ensures continuous
            progress with seamless 24/7 development handoffs.
          </p>
        </motion.div>

        {/* Handoff Status Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 p-6 rounded-xl border border-gray-800 backdrop-blur-sm bg-black/20"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
              <div>
                <h3 className="text-lg font-bold">
                  {handoffPhase === "california" && "California Team Active"}
                  {handoffPhase === "handoff" && "Handoff in Progress"}
                  {handoffPhase === "india" && "India Team Active"}
                  {handoffPhase === "receiving" && "Receiving Handoff"}
                </h3>
                <p className="text-sm text-gray-400">
                  {handoffPhase === "california" && "Frontend development, client meetings, code reviews"}
                  {handoffPhase === "handoff" && "Transferring work items and documentation"}
                  {handoffPhase === "india" && "Backend development, testing, deployment"}
                  {handoffPhase === "receiving" && "California team preparing to receive work"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="flex items-center gap-2 mb-1">
                  <Sun className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm font-medium">California</span>
                </div>
                <div className="text-lg font-mono">{getTimeInZone("America/Los_Angeles")}</div>
                <div className={`text-xs ${isWorkingHours("America/Los_Angeles") ? "text-green-400" : "text-red-400"}`}>
                  {isWorkingHours("America/Los_Angeles") ? "Active" : "Off Hours"}
                </div>
              </div>

              <ArrowRight className="h-5 w-5 text-cyan-500 animate-pulse" />

              <div className="text-center">
                <div className="flex items-center gap-2 mb-1">
                  <Moon className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-medium">India</span>
                </div>
                <div className="text-lg font-mono">{getTimeInZone("Asia/Kolkata")}</div>
                <div className={`text-xs ${isWorkingHours("Asia/Kolkata") ? "text-green-400" : "text-red-400"}`}>
                  {isWorkingHours("Asia/Kolkata") ? "Active" : "Off Hours"}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Map Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <WorldMapVisualization className="mb-8" />
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {[
            {
              icon: <Clock className="h-6 w-6" />,
              title: "24/7 Development",
              description: "16+ hour development window with seamless handoffs",
              color: "from-cyan-500 to-blue-500",
              stat: "24/7",
            },
            {
              icon: <Zap className="h-6 w-6" />,
              title: "Faster Delivery",
              description: "50% faster project completion with continuous progress",
              color: "from-purple-500 to-indigo-500",
              stat: "50%",
            },
            {
              icon: <Users className="h-6 w-6" />,
              title: "Expert Teams",
              description: "Silicon Valley innovation meets global efficiency",
              color: "from-pink-500 to-rose-500",
              stat: "2x",
            },
            {
              icon: <Globe className="h-6 w-6" />,
              title: "Global Reach",
              description: "Strategic time zone coverage for optimal productivity",
              color: "from-green-500 to-emerald-500",
              stat: "12+",
            },
          ].map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-xl backdrop-blur-sm bg-black/20 border border-gray-800 hover:border-gray-700 transition-all duration-300 p-6"
            >
              <div
                className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10"
                style={{
                  background: `linear-gradient(to bottom right, ${benefit.color.split(" ")[0].replace("from-", "")}, ${benefit.color.split(" ")[2].replace("to-", "")})`,
                }}
              />

              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-br ${benefit.color}`}
              >
                {benefit.icon}
              </div>

              <div className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600">
                {benefit.stat}
              </div>

              <h3 className="text-lg font-bold mb-2 group-hover:text-cyan-500 transition-colors">{benefit.title}</h3>

              <p className="text-gray-400 text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Development Process Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="p-8 rounded-xl border border-gray-800 backdrop-blur-sm bg-black/20"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">24-Hour Development Cycle</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* California Phase */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Sun className="h-6 w-6 text-yellow-400" />
                <h4 className="text-xl font-bold">California Phase (8 AM - 6 PM PST)</h4>
              </div>

              <div className="space-y-3">
                {[
                  "Client meetings and requirement gathering",
                  "Frontend development and UI/UX design",
                  "Code reviews and architecture decisions",
                  "Handoff preparation and documentation",
                ].map((task, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                    <span className="text-gray-300">{task}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* India Phase */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Moon className="h-6 w-6 text-blue-400" />
                <h4 className="text-xl font-bold">India Phase (8 AM - 6 PM IST)</h4>
              </div>

              <div className="space-y-3">
                {[
                  "Backend API development and database work",
                  "Testing and quality assurance",
                  "DevOps and deployment processes",
                  "Progress documentation for handoff",
                ].map((task, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    <span className="text-gray-300">{task}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-8 p-4 bg-gray-900/50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Daily Progress</span>
              <span className="text-sm text-cyan-500">Continuous</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <motion.div
                className="h-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, delay: 1 }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Your project progresses 16+ hours daily with our global team coordination
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
