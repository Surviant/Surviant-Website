"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ExternalLink, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PortfolioPreviewSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const projects = [
    {
      title: "SaaS Analytics Platform",
      industry: "SaaS Startup",
      description: "Complete dashboard redesign with real-time analytics and AI-powered insights",
      technologies: ["React", "Node.js", "PostgreSQL", "AI/ML", "AWS"],
      image: "/modern-dashboard-analytics-interface.png",
      outcome: "40% increase in user engagement, 25% reduction in churn rate",
    },
    {
      title: "Healthcare Management System",
      industry: "Healthcare Platform",
      description: "HIPAA-compliant patient management system with telemedicine integration",
      technologies: ["Next.js", "Python", "MongoDB", "WebRTC", "Azure"],
      image: "/healthcare-management-interface.png",
      outcome: "Streamlined operations for 50+ clinics, 60% faster patient processing",
    },
    {
      title: "FinTech Mobile Application",
      industry: "FinTech App",
      description: "Secure mobile banking app with biometric authentication and AI fraud detection",
      technologies: ["React Native", "Go", "Redis", "Blockchain", "GCP"],
      image: "/mobile-banking-app.png",
      outcome: "99.9% uptime, processed $10M+ in transactions securely",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <div className="min-h-screen py-20 px-4" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block py-1 px-3 border border-cyan-500/30 rounded-full text-cyan-500 text-xs tracking-wider mb-4">
            RECENT WORK
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Projects That <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600">
              Drive Results
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            From startup MVPs to enterprise solutions, see how we've helped businesses transform their digital presence
            and achieve measurable growth.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-xl backdrop-blur-sm bg-black/20 border border-gray-800 hover:border-gray-700 transition-all duration-500"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden bg-gray-900">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ExternalLink className="h-8 w-8 text-white" />
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-cyan-500 bg-cyan-500/10 px-2 py-1 rounded-full">
                    {project.industry}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-500 transition-colors">{project.title}</h3>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span key={techIndex} className="text-xs px-2 py-1 bg-gray-800/50 rounded-full text-gray-300">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs px-2 py-1 bg-gray-800/50 rounded-full text-gray-300">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                {/* Outcome */}
                <div className="border-t border-gray-800 pt-4">
                  <p className="text-xs text-gray-500 mb-1">OUTCOME</p>
                  <p className="text-sm text-gray-300">{project.outcome}</p>
                </div>
              </div>

              {/* Gradient Border Effect */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-600/20 blur-sm" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0 rounded-full px-8"
          >
            View Case Studies
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
