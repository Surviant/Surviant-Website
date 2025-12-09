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
    { id: "coverage", label: "GLOBAL" },
    { id: "technologies", label: "TECH" },
    { id: "portfolio", label: "WORK" },
    { id: "research", label: "RESEARCH" },
    { id: "about", label: "ABOUT" },
    { id: "contact", label: "CONTACT", isLink: true },
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
          scrolled || isMenuOpen ? "py-2 sm:py-3 md:py-4 backdrop-blur-md bg-black/70" : "py-3 sm:py-4 md:py-5",
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
            <Image
              src="/surviant-logo.png"
              alt="Surviant Logo"
              width={240}
              height={240}
              className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto object-contain"
              priority
            />
          </motion.div>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 space-x-6 xl:space-x-10 2xl:space-x-14"
            role="navigation"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              item.isLink ? (
                <Link key={item.id} href="/contact">
                  <motion.div
                    className={cn(
                      "text-base font-bold tracking-wider transition-colors relative py-3 px-3 uppercase",
                      "text-gray-400 hover:text-white cursor-pointer",
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                  </motion.div>
                </Link>
              ) : (
                <motion.button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={cn(
                    "text-base font-bold tracking-wider transition-colors relative py-3 px-3 uppercase",
                    activeSection === item.id ? "text-white" : "text-gray-400 hover:text-white",
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-current={activeSection === item.id ? "page" : undefined}
                >
                  {item.label}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 to-purple-600"
                    initial={false}
                    animate={{
                      scaleX: activeSection === item.id ? 1 : 0,
                      opacity: activeSection === item.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              )
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white h-11 w-11 min-h-[44px] min-w-[44px]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </motion.div>
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
            className="fixed inset-0 z-40 bg-black/98 lg:hidden pt-20 sm:pt-24 overflow-y-auto safe-area-inset"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <div className="container mx-auto px-4 sm:px-6 h-full flex flex-col">
              <nav className="flex flex-col space-y-1 sm:space-y-2 mb-auto pt-4" role="navigation" aria-label="Mobile navigation">
                {navItems.map((item, index) => (
                  item.isLink ? (
                    <Link key={item.id} href="/contact" onClick={() => setIsMenuOpen(false)}>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={cn(
                          "w-full text-left px-4 sm:px-6 py-4 sm:py-5 text-lg sm:text-xl md:text-2xl font-bold tracking-wide transition-all flex items-center justify-between group rounded-xl",
                          "text-gray-400 hover:text-white hover:bg-white/5 active:bg-white/10",
                          "min-h-[56px] touch-manipulation"
                        )}
                      >
                        {item.label}
                        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 opacity-50 group-hover:opacity-100 transform group-hover:translate-x-2 transition-all" />
                      </motion.div>
                    </Link>
                  ) : (
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
                          ? "text-cyan-400 bg-cyan-500/10"
                          : "text-white hover:bg-white/5 active:bg-white/10",
                      )}
                      whileTap={{ scale: 0.98 }}
                      aria-current={activeSection === item.id ? "page" : undefined}
                    >
                      <span className="flex items-center gap-3">
                        {activeSection === item.id && (
                          <motion.div
                            layoutId="activeMenuIndicator"
                            className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400"
                          />
                        )}
                        {item.label}
                      </span>
                      <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 opacity-50" />
                    </motion.button>
                  )
                ))}
              </nav>

              {/* Mobile menu footer */}
              <div className="py-6 sm:py-8 border-t border-gray-800 mt-auto">
                <p className="text-center text-gray-500 text-sm">
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
