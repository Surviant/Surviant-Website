"use client"

import { useEffect, useRef, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface LocationData {
  name: string
  flag: string
  timezone: string
  activities: string
  coords: [number, number]
  color: string
}

interface LeafletMapProps {
  locations: LocationData[]
  isWorkingHours: (timezone: string) => boolean
  isPlaying: boolean
  speed: number
}

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
const ParticleOverlay = ({ isPlaying }: { isPlaying: boolean }) => {
  const [particles, setParticles] = useState<Array<{ id: number; lat: number; lng: number; progress: number }>>([])

  useEffect(() => {
    if (!isPlaying) return

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
  }, [isPlaying])

  if (!isPlaying) return null

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

export default function LeafletMap({ locations, isWorkingHours, isPlaying, speed }: LeafletMapProps) {
  const mapRef = useRef<L.Map>(null)

  // Fix for Leaflet default markers
  useEffect(() => {
    if (typeof window !== "undefined") {
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      })
    }
  }, [])

  return (
    <div className="relative rounded-lg overflow-hidden border border-gray-800" style={{ height: "600px" }}>
      <MapContainer
        center={[25, 0]}
        zoom={2}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        attributionControl={false}
        ref={mapRef}
      >
        {/* Free dark theme tile layer from CartoDB */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          subdomains="abcd"
          maxZoom={19}
        />

        {/* Location markers */}
        {locations.map((location) => (
          <AnimatedMarker key={location.name} location={location} isActive={isWorkingHours(location.timezone)} />
        ))}

        {/* Animated connection line */}
        <AnimatedConnection />

        {/* Particle overlay */}
        <ParticleOverlay isPlaying={isPlaying} />
      </MapContainer>
    </div>
  )
}
