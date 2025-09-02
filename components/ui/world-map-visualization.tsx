"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

interface LocationData {
  name: string
  flag: string
  timezone: string
  activities: string
  coords: [number, number]
  color: string
}

interface WorldMapVisualizationProps {
  className?: string
}

const locations: LocationData[] = [
  {
    name: "California, USA",
    flag: "🇺🇸",
    timezone: "America/Los_Angeles",
    activities: "Frontend development, client meetings, code reviews, strategic planning",
    coords: [37.7749, -122.4194],
    color: "#329de1",
  },
  {
    name: "Bangalore, India",
    flag: "🇮🇳",
    timezone: "Asia/Kolkata",
    activities: "Backend API development, database optimization, testing, deployment",
    coords: [12.9716, 77.5946],
    color: "#8e44ad",
  },
]

// Dynamically import the map component with no SSR
const DynamicMap = dynamic(() => import("./leaflet-map"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[500px] bg-gray-900/50 rounded-xl border border-gray-800">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <div className="text-gray-400">Loading global coverage map...</div>
      </div>
    </div>
  ),
})

export default function WorldMapVisualization({ className }: WorldMapVisualizationProps) {
  const [currentTimes, setCurrentTimes] = useState<Record<string, string>>({})
  const [isPlaying, setIsPlaying] = useState(true)
  const [speed, setSpeed] = useState(1)

  // Check if location is in working hours
  const isWorkingHours = (timezone: string): boolean => {
    try {
      const now = new Date()
      const timeInZone = new Date(now.toLocaleString("en-US", { timeZone: timezone }))
      const hour = timeInZone.getHours()
      return hour >= 8 && hour <= 20
    } catch {
      return false
    }
  }

  // Get local time for timezone
  const getLocalTime = (timezone: string): string => {
    try {
      return new Date().toLocaleString("en-US", {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    } catch {
      return "N/A"
    }
  }

  // Update times
  useEffect(() => {
    const updateTimes = () => {
      const times: Record<string, string> = {}
      locations.forEach((location) => {
        times[location.name] = getLocalTime(location.timezone)
      })
      setCurrentTimes(times)
    }

    updateTimes()
    const interval = setInterval(updateTimes, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`relative w-full ${className}`}>
      {/* Map Container */}
      <div className="relative">
        <DynamicMap locations={locations} isWorkingHours={isWorkingHours} isPlaying={isPlaying} speed={speed} />

        {/* Simplified Controls */}
        <div className="absolute top-4 right-4 flex gap-2 z-[1000]">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3 py-1 bg-cyan-600/80 hover:bg-cyan-600 text-white rounded-full text-sm transition-colors backdrop-blur-sm"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>

        {/* Enhanced Status Display */}
        <div className="absolute bottom-4 left-4 bg-black/90 backdrop-blur-sm rounded-xl p-4 text-sm z-[1000] border border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {locations.map((location) => {
              const isActive = isWorkingHours(location.timezone)
              const localTime = currentTimes[location.name] || "Loading..."

              return (
                <div key={location.name} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${isActive ? "bg-green-400 animate-pulse" : "bg-gray-500"}`} />
                  <div>
                    <div className="text-white font-medium flex items-center gap-2">
                      <span className="text-lg">{location.flag}</span>
                      {location.name.split(",")[0]}
                    </div>
                    <div className="text-gray-400 text-xs">{localTime}</div>
                    <div className={`text-xs font-medium ${isActive ? "text-green-400" : "text-gray-500"}`}>
                      {isActive ? "🟢 Development Active" : "⚫ Off Hours"}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-black/90 backdrop-blur-sm rounded-xl p-3 text-xs z-[1000] border border-gray-800">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-400 animate-pulse"></div>
              <span className="text-gray-300">Work Flow</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span className="text-gray-300">Active Team</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-500"></div>
              <span className="text-gray-300">Standby</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
