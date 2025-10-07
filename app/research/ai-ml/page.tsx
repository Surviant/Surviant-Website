"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ArrowLeft, Sparkles, Activity, Beaker, Brain, Zap, CheckCircle2,
  TrendingUp, ArrowRight, Eye, ChevronDown, ChevronUp
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import NoiseBackground from "@/components/ui/noise-background"
import ParticleBackground from "@/components/ui/particle-background"
import { techData, comparisonMatrix } from "./tech-data"

export default function AIMLPage() {
  const [hasWebGL, setHasWebGL] = useState(true)
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      setHasWebGL(!!gl)
    } catch (e) {
      setHasWebGL(false)
    }
  }, [])

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) ? prev.filter(id => id !== sectionId) : [...prev, sectionId]
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
  }

  const renderMaturityLevel = (level: any) => {
    const StatusIcon = level.color === "emerald" ? CheckCircle2 : level.color === "yellow" ? Zap : Beaker
    
    return (
      <motion.div variants={itemVariants} className="space-y-8">
        <div className="text-center space-y-4 mb-12">
          <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full border backdrop-blur-sm ${level.badge}`}>
            <StatusIcon className="h-5 w-5" />
            <span className="font-bold text-lg">{level.title}</span>
          </div>
          <h3 className="text-3xl font-bold text-white">{level.subtitle}</h3>
        </div>

        <div className="space-y-6">
          {level.sections.map((section: any) => {
            const isExpanded = expandedSections.includes(section.id)
            
            return (
              <motion.div
                key={section.id}
                variants={itemVariants}
                className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-800/30 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-2xl font-bold text-white group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 transition-all duration-300">
                        {section.category}
                      </h4>
                      <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium">
                        {section.technologies.length} Technologies
                      </span>
                    </div>
                    <p className="text-gray-400 mb-2">{section.description}</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border border-cyan-500/20">
                      <Sparkles className="h-4 w-4 text-cyan-400" />
                      <span className="text-sm font-semibold text-cyan-400">{section.useCaseHighlight}</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    {isExpanded ? <ChevronUp className="h-6 w-6 text-cyan-400" /> : <ChevronDown className="h-6 w-6 text-gray-400 group-hover:text-cyan-400 transition-colors" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-800"
                    >
                      <div className="px-8 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {section.technologies.map((tech: any, idx: number) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="p-4 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-cyan-500/30 hover:bg-gray-800/70 transition-all duration-300 group/tech"
                          >
                            <div className="space-y-2">
                              <h5 className="font-bold text-white text-sm group-hover/tech:text-cyan-400 transition-colors">{tech.name}</h5>
                              <p className="text-xs text-gray-400 leading-relaxed">{tech.desc}</p>
                              <div className="flex items-center gap-1.5 pt-2">
                                <TrendingUp className="h-3 w-3 text-purple-400" />
                                <span className="text-xs font-semibold text-purple-400">{tech.metric}</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    )
  }

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-b from-black to-gray-900">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent"></div>
          </div>
        </div>
      </div>

      {hasWebGL && <ParticleBackground />}
      <NoiseBackground opacity={0.03} />

      <div className="relative z-10">
        <motion.div initial={{ y: -100 }} animate={{ y: 0 }} className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800 backdrop-blur-md bg-black/50">
          <div className="container mx-auto px-4 py-6">
            <Link href="/">
              <Button variant="ghost" className="gap-2 text-gray-400 hover:text-cyan-400">
                <ArrowLeft className="h-4 w-4" />
                Back to Research
              </Button>
            </Link>
          </div>
        </motion.div>

        <div className="container mx-auto px-4 pt-32 pb-20 max-w-[1600px]">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-24">
            <motion.div variants={itemVariants} className="text-center space-y-8">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm">
                <Brain className="h-5 w-5 text-cyan-400" />
                <span className="text-cyan-400 font-semibold">Complete AI/ML Technology Stack</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600">Every AI/ML Technology</span>
                <br />
                <span className="text-white">We Use & Research</span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
                From <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold">production transformers</span> powering millions of daily inferences to <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold">experimental quantum-inspired algorithms</span>—a complete taxonomy of our AI/ML stack
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8">
                {[
                  { value: "70+", label: "Technologies" },
                  { value: "10M+", label: "Daily Inferences" },
                  { value: "2M+", label: "Files Analyzed" },
                  { value: "99.9%", label: "Uptime" },
                ].map((stat, idx) => (
                  <motion.div key={idx} variants={itemVariants} className="p-6 rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300" whileHover={{ y: -5 }}>
                    <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600">{stat.value}</div>
                    <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {renderMaturityLevel(techData.mature)}
            <motion.div variants={itemVariants} className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
            {renderMaturityLevel(techData.emerging)}
            <motion.div variants={itemVariants} className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
            {renderMaturityLevel(techData.cutting)}

            <motion.div variants={itemVariants} className="space-y-8">
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600">Quick Reference Matrix</span>
                </h2>
                <p className="text-gray-400 text-lg">Technology evolution across maturity levels</p>
              </div>

              <div className="overflow-x-auto">
                <div className="min-w-[800px] bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden">
                  <div className="grid grid-cols-4 gap-4 p-6 border-b border-gray-800 bg-gray-800/50">
                    <div className="font-bold text-white">Category</div>
                    <div className="font-bold text-emerald-400 text-center">Mature</div>
                    <div className="font-bold text-yellow-400 text-center">Emerging</div>
                    <div className="font-bold text-red-400 text-center">Cutting Edge</div>
                  </div>

                  {comparisonMatrix.map((row, idx) => (
                    <motion.div key={idx} variants={itemVariants} className="grid grid-cols-4 gap-4 p-6 border-b border-gray-800 last:border-b-0 hover:bg-gray-800/30 transition-colors">
                      <div className="font-semibold text-white">{row.category}</div>
                      <div className="text-gray-300 text-sm text-center">{row.mature}</div>
                      <div className="text-gray-300 text-sm text-center">{row.emerging}</div>
                      <div className="text-gray-300 text-sm text-center">{row.cutting}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="relative overflow-hidden rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-sm p-12 md:p-16 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-600/10" />
              <div className="relative z-10 space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold">
                  Ready to Build with <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600">Cutting-Edge AI</span>?
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">Let's discuss how these technologies can transform your product</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                  <Link href="/contact">
                    <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0 rounded-full px-10 py-6 text-lg shadow-lg shadow-cyan-500/25">
                      Start a Project <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button size="lg" variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 rounded-full px-10 py-6 text-lg">
                      <Eye className="mr-2 h-5 w-5" />
                      View All Research
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
