"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Dynamically import react-leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false })
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })
const Polyline = dynamic(() => import("react-leaflet").then((mod) => mod.Polyline), { ssr: false })

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

// Custom animated marker component
const AnimatedMarker = ({ location, isActive }: { location: LocationData; isActive: boolean }) => {
  const markerRef = useRef<L.Marker>(null)

  useEffect(() => {
    if (markerRef.current) {
      const marker = markerRef.current
      const element = marker.getElement()
      if (element) {
        element.style.filter = isActive ? "drop-shadow(0 0 20px " + location.color + ")" : "none"
        element.style.transform = isActive ? "scale(1.2)" : "scale(1)"
        element.style.transition = "all 0.3s ease"
      }
    }
  }, [isActive, location.color])

  // Create custom icon
  const customIcon = L.divIcon({
    html: `
      <div style="
        width: 40px;
        height: 40px;
        background: ${location.color};
        border: 3px solid white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        ${isActive ? `animation: pulse 2s infinite; box-shadow: 0 0 20px ${location.color};` : ""}
      ">
        ${location.flag}
      </div>
      <style>
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      </style>
    `,
    className: "custom-marker",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  })

  return (
    <Marker ref={markerRef} position={location.coords} icon={customIcon}>
      <Popup>
        <div className="p-2">
          <h3 className="font-bold text-lg mb-2">
            {location.flag} {location.name}
          </h3>
          <p className="text-sm text-gray-600 mb-2">Status: {isActive ? "🟢 Active Development" : "🔴 Off Hours"}</p>
          <p className="text-xs text-gray-500">{location.activities}</p>
        </div>
      </Popup>
    </Marker>
  )
}

// Animated connection line component
const AnimatedConnection = () => {
  const [animationOffset, setAnimationOffset] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationOffset((prev) => (prev + 1) % 20)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  const connectionPath: [number, number][] = [
    [37.7749, -122.4194], // California
    [12.9716, 77.5946], // Bangalore
  ]

  return (
    <Polyline
      positions={connectionPath}
      pathOptions={{
        color: "#f39c12",
        weight: 3,
        opacity: 0.8,
        dashArray: "10, 10",
        dashOffset: animationOffset.toString(),
      }}
    />
  )
}

// Particle animation overlay
const ParticleOverlay = () => {
  const [particles, setParticles] = useState<Array<{ id: number; lat: number; lng: number; progress: number }>>([])

  useEffect(() => {
    // Initialize particles
    const initialParticles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      lat: 37.7749,
      lng: -122.4194,
      progress: Math.random(),
    }))
    setParticles(initialParticles)

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((particle) => {
          let newProgress = particle.progress + 0.01
          if (newProgress > 1) newProgress = 0

          // Interpolate between California and Bangalore
          const startLat = 37.7749
          const startLng = -122.4194
          const endLat = 12.9716
          const endLng = 77.5946

          const lat = startLat + (endLat - startLat) * newProgress
          const lng = startLng + (endLng - startLng) * newProgress

          return {
            ...particle,
            lat,
            lng,
            progress: newProgress,
          }
        }),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {particles.map((particle) => {
        const particleIcon = L.divIcon({
          html: `<div style="
            width: 6px;
            height: 6px;
            background: #f39c12;
            border-radius: 50%;
            box-shadow: 0 0 10px #f39c12;
            opacity: ${Math.sin(particle.progress * Math.PI)};
          "></div>`,
          className: "particle-marker",
          iconSize: [6, 6],
          iconAnchor: [3, 3],
        })

        return <Marker key={particle.id} position={[particle.lat, particle.lng]} icon={particleIcon} />
      })}
    </>
  )
}

export default function WorldMapVisualization({ className }: WorldMapVisualizationProps) {
  const [currentTimes, setCurrentTimes] = useState<Record<string, string>>({})
  const [isPlaying, setIsPlaying] = useState(true)
  const [speed, setSpeed] = useState(1)
  const mapRef = useRef<L.Map>(null)

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

  // Fix for Leaflet default markers
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    })
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
      <div className="relative rounded-lg overflow-hidden border border-gray-800" style={{ height: "600px" }}>
        <MapContainer
          center={[25, 0]}
          zoom={2}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
          attributionControl={false}
          ref={mapRef}
        >
          {/* Dark theme tile layer */}
          <TileLayer
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
          />

          {/* Location markers */}
          {locations.map((location) => (
            <AnimatedMarker key={location.name} location={location} isActive={isWorkingHours(location.timezone)} />
          ))}

          {/* Animated connection line */}
          <AnimatedConnection />

          {/* Particle overlay */}
          {isPlaying && <ParticleOverlay />}
        </MapContainer>

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
