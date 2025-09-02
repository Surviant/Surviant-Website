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
    <div className="flex items-center justify-center h-[600px] bg-[#0a0a23] rounded-lg border border-gray-800">
      <div className="text-white">Loading map...</div>
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
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Your Project Never Sleeps
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          As the sun sets in California, development continues in Bangalore. When India rests, California takes the
          lead. Continuous progress, 24 hours a day.
        </p>
      </div>

      {/* Map Container */}
      <div className="relative">
        <DynamicMap locations={locations} isWorkingHours={isWorkingHours} isPlaying={isPlaying} speed={speed} />

        {/* Controls */}
        <div className="absolute top-4 right-4 flex gap-2 z-[1000]">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="px-2 py-1 bg-gray-800 text-white rounded text-sm border border-gray-600"
          >
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={2}>2x</option>
            <option value={4}>4x</option>
          </select>
        </div>

        {/* Status Display */}
        <div className="absolute bottom-4 left-4 bg-black/90 rounded-lg p-4 text-sm z-[1000]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {locations.map((location) => {
              const isActive = isWorkingHours(location.timezone)
              const localTime = currentTimes[location.name] || "Loading..."

              return (
                <div key={location.name} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${isActive ? "bg-green-400" : "bg-red-400"} animate-pulse`} />
                  <div>
                    <div className="text-white font-medium flex items-center gap-2">
                      <span className="text-lg">{location.flag}</span>
                      {location.name.split(",")[0]}
                    </div>
                    <div className="text-gray-400 text-xs">
                      {localTime} - {isActive ? "Active Development" : "Off Hours"}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-black/90 rounded-lg p-3 text-xs z-[1000]">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-400"></div>
              <span className="text-gray-300">Data Flow</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span className="text-gray-300">Active Development</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <span className="text-gray-300">Off Hours</span>
            </div>
          </div>
        </div>
      </div>

      {/* Value Propositions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">24/7</div>
          <div className="text-sm text-gray-400">Coverage</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-400">16+</div>
          <div className="text-sm text-gray-400">Active Hours</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-400">50%</div>
          <div className="text-sm text-gray-400">Faster Delivery</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">100%</div>
          <div className="text-sm text-gray-400">Synchronization</div>
        </div>
      </div>
    </div>
  )
}
