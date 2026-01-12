"use client"

import { useState, useEffect, useRef } from "react"
import Navigation from "@/components/navigation"
import { HeroSection } from "@/components/sections/hero-section"
import ServicesScrollSection from "@/components/services-scroll-section"
import DevelopmentProcess from "@/components/development-process"
import AboutSection from "@/components/sections/about-section"
import TechnologiesSection from "@/components/sections/technologies-section"
import PortfolioPreviewSection from "@/components/sections/portfolio-preview-section"
import NoiseBackground from "@/components/ui/noise-background"
import ParticleBackground from "@/components/ui/particle-background"
import { cn } from "@/lib/utils"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hasWebGL, setHasWebGL] = useState(true)
  const contentRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({
    home: null,
    services: null,
    technologies: null,
    portfolio: null,
    about: null,
  })

  const sections = [
    { id: "home", label: "HOME" },
    { id: "services", label: "SERVICES" },
    { id: "technologies", label: "TECH" },
    { id: "portfolio", label: "WORK" },
    { id: "about", label: "ABOUT" },
  ]

  // Check for WebGL support
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      setHasWebGL(!!gl)
    } catch (e) {
      setHasWebGL(false)
      console.log("WebGL not supported, falling back to standard animations")
    }
  }, [])


  // Handle section change - now just scrolls to the section
  const handleSectionChange = (section: string) => {
    // Log for debugging
    console.log(`Changing to section: ${section}`)

    // Always update the active section state
    setActiveSection(section)

    const sectionElement = sectionRefs.current[section]
    if (sectionElement && contentRef.current) {
      // Scroll to the section with a slight delay to ensure state updates
      setTimeout(() => {
        contentRef.current?.scrollTo({
          top: sectionElement.offsetTop - 96, // Adjust for header height
          behavior: "smooth",
        })
      }, 50)
    }

    setIsMenuOpen(false)
  }

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return

      const scrollPosition = contentRef.current.scrollTop + 200 // Add offset to trigger earlier

      // Find the section that is currently most visible
      let currentSection = "home"
      let maxVisibility = 0

      Object.entries(sectionRefs.current).forEach(([id, element]) => {
        if (!element) return

        const sectionTop = element.offsetTop - 96 // Adjust for header
        const sectionHeight = element.offsetHeight
        const sectionBottom = sectionTop + sectionHeight

        // Calculate how much of the section is visible
        const visibleTop = Math.max(sectionTop, scrollPosition)
        const visibleBottom = Math.min(sectionBottom, scrollPosition + window.innerHeight)
        const visibleHeight = Math.max(0, visibleBottom - visibleTop)

        // Update current section if this one has more visibility
        if (visibleHeight > maxVisibility) {
          maxVisibility = visibleHeight
          currentSection = id
        }
      })

      if (currentSection !== activeSection) {
        setActiveSection(currentSection)
      }
    }

    const container = contentRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true })
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll)
      }
    }
  }, [activeSection])

  // Add keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        const currentIndex = sections.findIndex((section) => section.id === activeSection)
        if (currentIndex < sections.length - 1) {
          handleSectionChange(sections[currentIndex + 1].id)
        }
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        const currentIndex = sections.findIndex((section) => section.id === activeSection)
        if (currentIndex > 0) {
          handleSectionChange(sections[currentIndex - 1].id)
        }
      } else if (e.key === "Home") {
        handleSectionChange("home")
      } else if (e.key === "End") {
        handleSectionChange("contact")
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeSection, sections])


  return (
    <main className="relative w-full min-h-screen min-h-[100dvh] bg-white text-slate-900 overflow-x-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-b from-slate-50 to-white">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Particle Background - conditionally rendered based on WebGL support */}
      {hasWebGL && <ParticleBackground />}

      {/* Noise Texture */}
      <NoiseBackground opacity={0.03} />

      {/* Content Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col">
        <Navigation
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />

        {/* Continuous scrolling container with all sections */}
        <div
          ref={contentRef}
          className={cn(
            "h-full overflow-y-auto scroll-smooth hide-scrollbar",
            "-webkit-overflow-scrolling-touch",
            isMenuOpen && "pointer-events-none"
          )}
          style={{ paddingTop: "5rem" }} // Adjusted for mobile header
        >
          {/* Home Section */}
          <section ref={(el) => { sectionRefs.current.home = el }} className="min-h-[100dvh] min-h-screen section-container">
            <HeroSection onExplore={() => handleSectionChange("services")} />
          </section>

          {/* Services Section */}
          <section ref={(el) => { sectionRefs.current.services = el }} className="section-container">
            <ServicesScrollSection />
          </section>

          {/* Development Process Section */}
          <section className="section-container">
            <DevelopmentProcess />
          </section>

          {/* Technologies Section */}
          <section ref={(el) => { sectionRefs.current.technologies = el }} className="min-h-[100dvh] min-h-screen section-container py-8 md:py-0">
            <TechnologiesSection />
          </section>

          {/* Portfolio Preview Section */}
          <section ref={(el) => { sectionRefs.current.portfolio = el }} className="min-h-[100dvh] min-h-screen section-container py-8 md:py-0">
            <PortfolioPreviewSection />
          </section>

          {/* About Section */}
          <section ref={(el) => { sectionRefs.current.about = el }} className="min-h-[100dvh] min-h-screen section-container py-8 md:py-0">
            <AboutSection />
          </section>

        </div>
      </div>

      {/* Dot Navigator */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-3">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => handleSectionChange(section.id)}
            className="group relative flex items-center justify-center"
            aria-label={`Go to ${section.label}`}
          >
            <span className={`absolute right-6 whitespace-nowrap text-xs font-medium transition-all duration-300 opacity-0 group-hover:opacity-100 ${
              activeSection === section.id ? "text-cyan-600" : "text-gray-500"
            }`}>
              {section.label}
            </span>
            <div
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === section.id
                  ? "bg-cyan-500 scale-125"
                  : "bg-gray-300 hover:bg-cyan-400 hover:scale-110"
              }`}
            />
          </button>
        ))}
      </div>

    </main>
  )
}
