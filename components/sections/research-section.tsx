"use client"

import { useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { 
  Microscope, 
  Sparkles, 
  Lightbulb, 
  Rocket, 
  Brain, 
  Database, 
  Network, 
  Cpu, 
  Zap,
  Target,
  TrendingUp,
  Award,
  Users,
  Code,
  Shield,
  Globe
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ResearchSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  }

  const stats = [
    { label: "Research Papers", value: "50+", icon: Award },
    { label: "Active Projects", value: "25+", icon: Target },
    { label: "Industry Partners", value: "30+", icon: Users },
  ]

  const researchAreas = [
    {
      icon: Brain,
      title: "Artificial Intelligence & Machine Learning",
      description: "Pioneering next-generation AI solutions with deep learning, neural networks, and cognitive computing. Our research focuses on natural language processing, computer vision, and reinforcement learning to create intelligent systems that adapt and evolve.",
      technologies: ["Deep Learning", "Neural Networks", "NLP", "Computer Vision", "Reinforcement Learning"],
      impact: "Developed AI models achieving 98% accuracy in production environments",
    },
    {
      icon: Database,
      title: "Big Data & Analytics",
      description: "Transforming massive datasets into actionable insights through advanced analytics, predictive modeling, and real-time data processing. We build scalable data pipelines that handle petabytes of information with minimal latency.",
      technologies: ["Data Mining", "Predictive Analytics", "Real-time Processing", "Data Visualization"],
      impact: "Processing 10TB+ of data daily with sub-second query times",
    },
    {
      icon: Network,
      title: "Distributed Systems & Cloud Architecture",
      description: "Designing resilient, scalable distributed systems that power modern applications. Our research covers microservices, containerization, orchestration, and edge computing to build fault-tolerant infrastructure.",
      technologies: ["Microservices", "Kubernetes", "Edge Computing", "Service Mesh"],
      impact: "99.99% uptime across globally distributed systems",
    },
    {
      icon: Shield,
      title: "Cybersecurity & Privacy",
      description: "Developing cutting-edge security protocols, encryption methods, and privacy-preserving technologies. We focus on zero-trust architectures, blockchain security, and quantum-resistant cryptography.",
      technologies: ["Zero-Trust Security", "Blockchain", "Encryption", "Threat Detection"],
      impact: "Secured 500M+ transactions with zero breaches",
    },
    {
      icon: Cpu,
      title: "Quantum Computing & Advanced Algorithms",
      description: "Exploring quantum algorithms and hybrid classical-quantum systems for solving complex optimization problems. Our research pushes the boundaries of computational possibility.",
      technologies: ["Quantum Algorithms", "Optimization", "Cryptography", "Simulation"],
      impact: "10,000x speedup in optimization problems",
    },
    {
      icon: Rocket,
      title: "Extended Reality (XR) & Immersive Tech",
      description: "Creating immersive experiences through augmented reality, virtual reality, and mixed reality. We develop spatial computing solutions that blend digital and physical worlds seamlessly.",
      technologies: ["AR/VR", "Spatial Computing", "3D Rendering", "Haptic Feedback"],
      impact: "Deployed XR solutions for 100+ enterprise clients",
    },
    {
      icon: Zap,
      title: "IoT & Edge Intelligence",
      description: "Building intelligent IoT ecosystems with edge computing capabilities. Our research enables real-time decision-making at the edge, reducing latency and bandwidth requirements.",
      technologies: ["Edge AI", "Sensor Fusion", "5G Integration", "Smart Devices"],
      impact: "Connected 1M+ IoT devices with <10ms latency",
    },
    {
      icon: Globe,
      title: "Blockchain & Web3 Technologies",
      description: "Innovating decentralized systems, smart contracts, and distributed ledger technologies. We're building the infrastructure for the next generation of internet applications.",
      technologies: ["Smart Contracts", "DeFi", "NFTs", "Decentralized Systems"],
      impact: "Processed $100M+ in secure blockchain transactions",
    },
  ]

  const publications = [
    { title: "Scalable Neural Architecture Search for Production Systems", venue: "NeurIPS 2024" },
    { title: "Edge-Native Federated Learning Framework", venue: "ICML 2024" },
    { title: "Quantum-Resistant Cryptography for IoT", venue: "IEEE Security & Privacy" },
  ]

  return (
    <div ref={ref} className="relative py-32 px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="max-w-[1600px] mx-auto w-full space-y-24"
      >
        {/* Hero Header */}
        <motion.div variants={itemVariants} className="text-center space-y-8">
          <div className="inline-block">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-6">
              <Microscope className="h-4 w-4" />
              Innovation & Discovery
            </span>
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600">
              Research & Innovation
            </span>
            <br />
            <span className="text-white">at the Edge of Possibility</span>
          </h2>
          <p className="text-xl sm:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Pushing the boundaries of{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold">
              technology
            </span>,{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold">
              artificial intelligence
            </span>, and{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold">
              distributed systems
            </span>{" "}
            to create tomorrow's breakthrough solutions today
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                className="relative p-8 rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm text-center group hover:border-cyan-500/50 transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                <div className="relative z-10">
                  <Icon className="h-8 w-8 mx-auto mb-4 text-cyan-400" />
                  <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Main Research Areas */}
        <motion.div variants={itemVariants} className="space-y-16">
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Our{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600">
                Research Focus Areas
              </span>
            </h3>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Eight core domains where we're making breakthrough discoveries and building next-generation solutions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {researchAreas.map((area, index) => {
              const Icon = area.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-10 hover:border-cyan-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
                  
                  <div className="relative z-10 space-y-6">
                    {/* Icon */}
                    <div className="inline-flex p-5 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
                      <Icon className="h-10 w-10 text-white" />
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 transition-all duration-300">
                        {area.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed text-lg mb-6">
                        {area.description}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div className="space-y-3">
                      <div className="text-sm font-semibold text-cyan-400 uppercase tracking-wide">
                        Key Technologies
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {area.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1.5 rounded-full text-sm border border-gray-700 bg-gray-800/50 text-gray-300 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/10 group-hover:text-cyan-400 transition-all duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Impact */}
                    <div className="pt-4 border-t border-gray-800">
                      <div className="flex items-start gap-3">
                        <TrendingUp className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-semibold text-purple-400 uppercase tracking-wide mb-1">
                            Real-World Impact
                          </div>
                          <div className="text-sm text-gray-300">{area.impact}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-cyan-500/10 to-purple-600/10 opacity-0 rounded-3xl blur-3xl group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Recent Publications */}
        <motion.div variants={itemVariants} className="space-y-8">
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Recent{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600">
                Publications
              </span>
            </h3>
            <p className="text-gray-400 text-lg">
              Our research contributions to the global{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold">
                scientific community
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {publications.map((pub, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-6 rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300 group"
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                <div className="relative z-10">
                  <Code className="h-6 w-6 text-cyan-400 mb-4" />
                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {pub.title}
                  </h4>
                  <p className="text-sm text-gray-500">{pub.venue}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div variants={itemVariants} className="text-center space-y-8 pt-12">
          <h3 className="text-3xl md:text-4xl font-bold">
            Ready to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600">
              Collaborate
            </span>{" "}
            on Breakthrough Research?
          </h3>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join us in pushing the boundaries of{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold">
              innovation
            </span>{" "}
            and creating technologies that shape the future
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0 rounded-full px-10 py-6 text-lg shadow-lg shadow-cyan-500/25"
            >
              Partner With Us
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 rounded-full px-10 py-6 text-lg"
            >
              View Publications
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
