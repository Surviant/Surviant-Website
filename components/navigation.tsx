"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Github, Twitter, Linkedin, Menu, X, ChevronRight } from "lucide-react"
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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled || isMenuOpen ? "py-5 backdrop-blur-md bg-black/50" : "py-7",
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        role="banner"
      >
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center relative">
          <motion.div
            className="cursor-pointer"
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
              className="h-24 w-auto object-contain" 
              priority
            />
          </motion.div>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 space-x-14"
            role="navigation"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
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
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
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
            className="fixed inset-0 z-40 bg-black/95 md:hidden pt-24 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <div className="container mx-auto px-4 h-full flex flex-col">
              <nav className="flex flex-col space-y-2 mb-auto" role="navigation" aria-label="Mobile navigation">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => {
                      onSectionChange(item.id)
                      setIsMenuOpen(false)
                    }}
                    className={cn(
                      "flex items-center justify-between py-4 text-xl font-medium border-b border-gray-800",
                      activeSection === item.id ? "text-cyan-500" : "text-white",
                    )}
                    whileHover={{ x: 10, color: "#22d3ee" }}
                    aria-current={activeSection === item.id ? "page" : undefined}
                  >
                    {item.label}
                    <ChevronRight className="h-5 w-5" />
                  </motion.button>
                ))}
              </nav>

              <div className="py-8">
                <p className="text-gray-400 mb-4 text-sm">CONNECT WITH US</p>
                <div className="flex space-x-4">
                  <motion.a
                    href="https://github.com/SurviantTech"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="GitHub"
                  >
                    <Button variant="outline" size="icon" className="rounded-full border-gray-700 bg-transparent">
                      <Github className="h-5 w-5" />
                    </Button>
                  </motion.a>
                  <motion.a
                    href="https://twitter.com/SurviantTech"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Twitter"
                  >
                    <Button variant="outline" size="icon" className="rounded-full border-gray-700 bg-transparent">
                      <Twitter className="h-5 w-5" />
                    </Button>
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com/company/surviant"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="LinkedIn"
                  >
                    <Button variant="outline" size="icon" className="rounded-full border-gray-700 bg-transparent">
                      <Linkedin className="h-5 w-5" />
                    </Button>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
