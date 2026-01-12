"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useMediaQuery } from "@/hooks/use-media-query"

interface NavigationProps {
  activeSection: string
  onSectionChange: (section: string) => void
  isMenuOpen: boolean
  setIsMenuOpen: (isOpen: boolean) => void
}

export default function Navigation({ activeSection, onSectionChange, isMenuOpen, setIsMenuOpen }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { id: "home", label: "HOME" },
    { id: "services", label: "SERVICES" },
    { id: "technologies", label: "TECH" },
    { id: "portfolio", label: "WORK" },
    { id: "about", label: "ABOUT" },
  ]

  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  }

  // Close menu when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isMenuOpen, setIsMenuOpen])

  // Lock body scroll when menu is open on mobile
  useEffect(() => {
    if (isMobile) {
      if (isMenuOpen) {
        document.body.style.overflow = "hidden"
      } else {
        document.body.style.overflow = ""
      }
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen, isMobile])

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 safe-area-inset",
          scrolled || isMenuOpen ? "py-2 sm:py-3 md:py-4 backdrop-blur-md bg-white/90 shadow-sm" : "py-3 sm:py-4 md:py-5 bg-white/80 backdrop-blur-sm",
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        role="banner"
      >
        <div className="container mx-auto px-3 sm:px-4 md:px-6 flex justify-between items-center relative">
          <motion.div
            className="cursor-pointer flex-shrink-0"
            onClick={() => {
              onSectionChange("home")
              if (isMenuOpen) setIsMenuOpen(false)
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            role="button"
            aria-label="Go to home section"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                onSectionChange("home")
                if (isMenuOpen) setIsMenuOpen(false)
              }
            }}
          >
            <div className="-ml-4 sm:-ml-6 lg:-ml-8 flex items-center gap-3 sm:gap-4">
              <Image
                src="/surviant-logo.jpg"
                alt="Surviant logo"
                width={64}
                height={64}
                className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-lg object-cover"
                priority
              />
              <span className="hidden sm:inline-flex items-center font-semibold uppercase tracking-[0.32em] text-slate-700">
                Surviant
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation - Floating Pill */}
          <nav
            className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-1 px-2 py-1.5 bg-gray-50/95 backdrop-blur-sm rounded-full shadow-[0_2px_20px_rgba(0,0,0,0.08)] border border-gray-100/50"
            role="navigation"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "relative text-sm font-semibold tracking-[0.08em] uppercase whitespace-nowrap px-5 py-2.5 rounded-full transition-all duration-200",
                  activeSection === item.id 
                    ? "text-slate-800" 
                    : "text-slate-500 hover:text-slate-700 hover:bg-white/60",
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-current={activeSection === item.id ? "page" : undefined}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </nav>

          {/* Let's Talk Button - Top Right */}
          <div className="flex items-center gap-3">
            <Link href="/contact" className="hidden lg:block">
              <motion.div
                className={cn(
                  "inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white whitespace-nowrap rounded-full",
                  "bg-gradient-to-r from-[#0a1628] via-[#1e3a8a] to-[#3b82f6]",
                  "shadow-[0_4px_20px_rgba(59,130,246,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]",
                  "hover:from-[#1e3a8a] hover:via-[#2563eb] hover:to-[#60a5fa] hover:shadow-[0_6px_28px_rgba(59,130,246,0.5)]",
                  "transition-all duration-300 ease-out cursor-pointer",
                )}
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                Let's Talk
              </motion.div>
            </Link>

            {/* Mobile Menu Button */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-slate-900 hover:text-blue-600 h-11 w-11 min-h-[44px] min-w-[44px]"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-40 bg-white lg:hidden pt-20 sm:pt-24 overflow-y-auto safe-area-inset"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <div className="container mx-auto px-4 sm:px-6 h-full flex flex-col">
              <nav className="flex flex-col space-y-1 sm:space-y-2 mb-auto pt-4" role="navigation" aria-label="Mobile navigation">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      onSectionChange(item.id)
                      setIsMenuOpen(false)
                    }}
                    className={cn(
                      "flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 text-lg sm:text-xl md:text-2xl font-bold tracking-wide rounded-xl transition-all",
                      "min-h-[56px] touch-manipulation",
                      activeSection === item.id
                        ? "text-blue-600 bg-blue-50"
                        : "text-slate-900 hover:bg-slate-50 active:bg-slate-100",
                    )}
                    whileTap={{ scale: 0.98 }}
                    aria-current={activeSection === item.id ? "page" : undefined}
                  >
                    <span className="flex items-center gap-3">
                      {activeSection === item.id && (
                        <motion.div
                          layoutId="activeMenuIndicator"
                          className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-500"
                        />
                      )}
                      {item.label}
                    </span>
                    <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 opacity-50" />
                  </motion.button>
                ))}
                {/* Let's Talk Button in Mobile Menu */}
                <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="mt-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.05 }}
                    className={cn(
                      "w-full text-center px-6 py-4 text-lg sm:text-xl font-semibold text-white rounded-full",
                      "bg-gradient-to-r from-[#0a1628] via-[#1e3a8a] to-[#3b82f6]",
                      "shadow-[0_4px_20px_rgba(59,130,246,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]",
                      "hover:from-[#1e3a8a] hover:via-[#2563eb] hover:to-[#60a5fa]",
                      "transition-all duration-300 ease-out",
                      "min-h-[56px] touch-manipulation flex items-center justify-center"
                    )}
                  >
                    Let's Talk
                  </motion.div>
                </Link>
              </nav>

              {/* Mobile menu footer */}
              <div className="py-6 sm:py-8 border-t border-slate-200 mt-auto">
                <p className="text-center text-slate-500 text-sm">
                  Surviant Technologies
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
