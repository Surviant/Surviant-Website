"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Clock, Code, FileText, MessageSquare, Zap, Database, Server, Bug } from "lucide-react"

interface WorkItem {
  id: string
  time: number // Hour in 24-hour format (0-23)
  icon: React.ReactNode
  label: string
  team: "california" | "india"
}

interface DualTimelineProps {
  className?: string
}

export default function DualTimeline({ className = '' }: DualTimelineProps) {
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [isAnimating, setIsAnimating] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Set mounted state to true after component mounts
  useEffect(() => {
    setMounted(true)
    setCurrentTime(new Date())
  }, [])

  // Update current time every minute
  useEffect(() => {
    if (!mounted) return
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(interval)
  }, [mounted])

  // Get current hour in each timezone
  const getHourInTimezone = (timezone: string): number => {
    if (!mounted || !currentTime) return 12 // Default to noon
    try {
      return parseInt(currentTime.toLocaleString("en-US", {
        timeZone: timezone,
        hour: "numeric",
        hour12: false,
      }))
    } catch {
      return 12
    }
  }

  const californiaHour = getHourInTimezone("America/Los_Angeles")
  const indiaHour = getHourInTimezone("Asia/Kolkata")

  // Define active work periods (8am-8pm in local time)
  const isCaliforniaActive = californiaHour >= 8 && californiaHour < 20
  const isIndiaActive = indiaHour >= 8 && indiaHour < 20

  // Sample work items throughout the day
  const workItems: WorkItem[] = [
    { id: "ca1", time: 9, icon: <MessageSquare className="h-4 w-4" />, label: "Client Meeting", team: "california" },
    { id: "ca2", time: 11, icon: <Code className="h-4 w-4" />, label: "Frontend Dev", team: "california" },
    { id: "ca3", time: 14, icon: <FileText className="h-4 w-4" />, label: "Documentation", team: "california" },
    { id: "ca4", time: 17, icon: <Zap className="h-4 w-4" />, label: "Handoff Prep", team: "california" },
    { id: "in1", time: 9, icon: <Database className="h-4 w-4" />, label: "Database Work", team: "india" },
    { id: "in2", time: 12, icon: <Server className="h-4 w-4" />, label: "API Development", team: "india" },
    { id: "in3", time: 15, icon: <Bug className="h-4 w-4" />, label: "Testing", team: "india" },
    { id: "in4", time: 18, icon: <FileText className="h-4 w-4" />, label: "Handoff Docs", team: "india" },
  ]

  // Format time for display
  const formatTime = (hour: number): string => {
    return `${hour % 12 === 0 ? 12 : hour % 12}${hour < 12 ? "am" : "pm"}`
  }

  // Calculate position on timeline (0-100%)
  const getTimePosition = (hour: number): string => {
    // Map 0-23 hour to 0-100% position
    const position = ((hour - 0) / 24) * 100
    return `${position}%`
  }

  // Get current time position for each timezone
  const californiaTimePosition = mounted ? getTimePosition(californiaHour) : "50%"
  const indiaTimePosition = mounted ? getTimePosition(indiaHour) : "50%"

  // Calculate handoff zones (when both teams are active)
  const isHandoffZone = isCaliforniaActive && isIndiaActive

  return (
    <div className={`w-full p-6 rounded-xl border border-gray-800 bg-black/80 ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">24-Hour Development Timeline</h3>
        <button 
          onClick={() => setIsAnimating(!isAnimating)}
          className="text-sm px-3 py-1 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
        >
          {isAnimating ? "Pause" : "Animate"}
        </button>
      </div>

      {/* California Timeline */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
          <h4 className="font-medium">California Team (PST)</h4>
          <span className={`ml-auto text-sm ${isCaliforniaActive ? "text-green-400" : "text-gray-500"}`}>
            {isCaliforniaActive ? "Active" : "Off Hours"}
          </span>
        </div>

        <div className="relative h-16 bg-gray-900/50 rounded-lg overflow-hidden">
          {/* Active Period Highlight (8am-8pm) */}
          <div 
            className="absolute h-full bg-cyan-900/30 border-l border-r border-cyan-500/30"
            style={{ left: getTimePosition(8), width: "50%" }}
          ></div>

          {/* Hour markers */}
          {[0, 3, 6, 9, 12, 15, 18, 21].map(hour => (
            <div 
              key={`ca-${hour}`}
              className="absolute h-full border-l border-gray-700/50 flex flex-col justify-end pb-1 pl-1"
              style={{ left: getTimePosition(hour) }}
            >
              <span className="text-xs text-gray-500">{formatTime(hour)}</span>
            </div>
          ))}

          {/* Work items */}
          {workItems
            .filter(item => item.team === "california")
            .map(item => (
              <motion.div
                key={item.id}
                className="absolute top-2 -translate-x-1/2 bg-cyan-500 text-black rounded-full p-1 cursor-pointer"
                style={{ left: getTimePosition(item.time) }}
                whileHover={{ scale: 1.2 }}
                animate={isAnimating ? { y: [0, -5, 0] } : {}}
                transition={isAnimating ? { 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  duration: 2,
                  delay: item.time % 3 // Staggered animation
                } : {}}
                title={`${item.label} (${formatTime(item.time)})`}
              >
                {item.icon}
              </motion.div>
            ))}

          {/* Current time indicator */}
          <motion.div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.7)]"
            style={{ left: californiaTimePosition }}
            animate={isAnimating ? { 
              boxShadow: ["0 0 10px rgba(255,255,255,0.7)", "0 0 20px rgba(255,255,255,0.9)", "0 0 10px rgba(255,255,255,0.7)"] 
            } : {}}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>
      </div>

      {/* Handoff Visualization */}
      <div className="relative h-8 mb-8 flex justify-center items-center">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <motion.div 
            className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center"
            animate={isAnimating && isHandoffZone ? { 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            } : {}}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            <Clock className="h-5 w-5 text-white" />
          </motion.div>
        </div>
        <div className="w-1/3 h-0.5 bg-gradient-to-r from-transparent to-cyan-500"></div>
        <div className="w-1/3 h-0.5 bg-gradient-to-r from-purple-600 to-transparent"></div>
      </div>

      {/* India Timeline */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
          <h4 className="font-medium">India Team (IST)</h4>
          <span className={`ml-auto text-sm ${isIndiaActive ? "text-green-400" : "text-gray-500"}`}>
            {isIndiaActive ? "Active" : "Off Hours"}
          </span>
        </div>

        <div className="relative h-16 bg-gray-900/50 rounded-lg overflow-hidden">
          {/* Active Period Highlight (8am-8pm) */}
          <div 
            className="absolute h-full bg-purple-900/30 border-l border-r border-purple-500/30"
            style={{ left: getTimePosition(8), width: "50%" }}
          ></div>

          {/* Hour markers */}
          {[0, 3, 6, 9, 12, 15, 18, 21].map(hour => (
            <div 
              key={`in-${hour}`}
              className="absolute h-full border-l border-gray-700/50 flex flex-col justify-end pb-1 pl-1"
              style={{ left: getTimePosition(hour) }}
            >
              <span className="text-xs text-gray-500">{formatTime(hour)}</span>
            </div>
          ))}

          {/* Work items */}
          {workItems
            .filter(item => item.team === "india")
            .map(item => (
              <motion.div
                key={item.id}
                className="absolute top-2 -translate-x-1/2 bg-purple-500 text-black rounded-full p-1 cursor-pointer"
                style={{ left: getTimePosition(item.time) }}
                whileHover={{ scale: 1.2 }}
                animate={isAnimating ? { y: [0, -5, 0] } : {}}
                transition={isAnimating ? { 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  duration: 2,
                  delay: item.time % 4 // Staggered animation
                } : {}}
                title={`${item.label} (${formatTime(item.time)})`}
              >
                {item.icon}
              </motion.div>
            ))}

          {/* Current time indicator */}
          <motion.div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.7)]"
            style={{ left: indiaTimePosition }}
            animate={isAnimating ? { 
              boxShadow: ["0 0 10px rgba(255,255,255,0.7)", "0 0 20px rgba(255,255,255,0.9)", "0 0 10px rgba(255,255,255,0.7)"] 
            } : {}}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
          <span>California Team</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-500"></div>
          <span>India Team</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-white"></div>
          <span>Current Time</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400"></div>
          <span>Active Hours</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-3 w-3" />
          <span>Handoff Period</span>
        </div>
      </div>
    </div>
  )
}
