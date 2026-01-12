"use client"

import { useMemo, useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  Code,
  Layers,
  Database,
  Smartphone,
  Palette,
  Cpu,
  LineChart,
  BrainCircuit,
  TrendingUp,
  Cloud,
  Zap,
  Shield,
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const services = [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Startup Strategy & Consulting",
      description:
        "Market validation, product-market fit assessment, funding roadmaps, and grant research to turn your idea into a scalable business.",
      iconGradient: "from-emerald-300/80 to-teal-400/70",
      glow: "0 0 28px rgba(16, 185, 129, 0.45)",
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Frontend Development",
      description: "Crafting responsive, high-performance interfaces with React, Vue, and Next.js.",
      iconGradient: "from-sky-300/80 to-blue-500/70",
      glow: "0 0 28px rgba(135, 176, 242, 0.45)",
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Backend Engineering",
      description: "Building robust APIs and server architectures with Node.js, Python, and Go.",
      iconGradient: "from-indigo-300/80 to-violet-500/70",
      glow: "0 0 28px rgba(129, 140, 248, 0.45)",
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "UI/UX Design",
      description: "Creating intuitive user experiences with Figma, Adobe XD, and prototyping tools.",
      iconGradient: "from-rose-300/80 to-pink-500/70",
      glow: "0 0 28px rgba(244, 114, 182, 0.45)",
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Mobile Development",
      description: "Developing cross-platform mobile applications with React Native and Flutter.",
      iconGradient: "from-emerald-300/80 to-green-400/70",
      glow: "0 0 28px rgba(34, 197, 94, 0.45)",
    },
    {
      icon: <Cloud className="h-6 w-6" />,
      title: "Cloud & DevOps Solutions",
      description:
        "Scalable cloud infrastructure, CI/CD pipelines, containerization, and automated deployment systems for reliable, high-performance applications.",
      iconGradient: "from-blue-300/80 to-cyan-400/70",
      glow: "0 0 28px rgba(56, 189, 248, 0.45)",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "API Development & Integration",
      description:
        "Custom API development, third-party integrations, microservices architecture, and seamless system connectivity for complex digital ecosystems.",
      iconGradient: "from-amber-300/80 to-orange-400/70",
      glow: "0 0 28px rgba(245, 158, 11, 0.45)",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Quality Assurance & Testing",
      description:
        "Comprehensive testing strategies, automated test suites, performance testing, and quality assurance to ensure robust, bug-free applications.",
      iconGradient: "from-indigo-300/80 to-purple-500/70",
      glow: "0 0 28px rgba(99, 102, 241, 0.45)",
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "AI Solutions & Development",
      description:
        "Custom AI models, large language model applications, and intelligent automation systems as part of your complete digital solution.",
      iconGradient: "from-amber-300/80 to-orange-400/70",
      glow: "0 0 28px rgba(249, 115, 22, 0.45)",
    },
    {
      icon: <LineChart className="h-6 w-6" />,
      title: "Data Visualization",
      description: "Transforming complex data into intuitive, interactive visual representations.",
      iconGradient: "from-rose-300/80 to-red-400/70",
      glow: "0 0 28px rgba(248, 113, 113, 0.45)",
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: "Full-Stack Solutions",
      description:
        "End-to-end development from concept to deployment with comprehensive testing and enterprise-grade architecture.",
      iconGradient: "from-blue-300/80 to-indigo-500/70",
      glow: "0 0 28px rgba(59, 130, 246, 0.45)",
    },
    {
      icon: <BrainCircuit className="h-6 w-6" />,
      title: "Generative AI Applications",
      description:
        "Creating next-gen applications powered by generative AI for content, images, and interactive experiences.",
      iconGradient: "from-violet-300/80 to-fuchsia-500/70",
      glow: "0 0 28px rgba(192, 132, 252, 0.45)",
    },
  ]

  const orbConfigs = useMemo(
    () => [
      { className: "-top-32 -left-16", color: "from-[#d1f4ff]/45 to-[#a5d8ff]/35", size: "w-[22rem] h-[22rem]" },
      { className: "top-1/2 -right-20", color: "from-[#c0e8ff]/45 to-[#8ec5ff]/30", size: "w-[18rem] h-[18rem]" },
      { className: "bottom-[-8rem] left-1/3", color: "from-[#e1f8ff]/40 to-[#b4dcff]/30", size: "w-[26rem] h-[26rem]" },
    ],
    [],
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-16 sm:py-20 md:py-24"
    >
      <motion.div
        className="absolute inset-0"
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
        style={{
          backgroundImage: "linear-gradient(135deg, #0f1e36 0%, #153c68 35%, #1f5ca6 60%, #3c89d6 85%, #7fd4ff 100%)",
          backgroundSize: "200% 200%",
        }}
      />

      {orbConfigs.map((orb, index) => (
        <motion.span
          key={index}
          className={cn("pointer-events-none absolute blur-3xl", orb.className, orb.size)}
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 60%)`,
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.45, 0.6, 0.45] }}
          transition={{ duration: 12 + index * 3, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.25)_0%,_rgba(255,255,255,0)_60%)]" />

      <div className="relative z-10 px-3 sm:px-6">
        <div className="mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7 }}
            className="mb-12 sm:mb-16"
          >
            <span className="inline-block rounded-full border border-white/30 bg-white/5 px-4 py-1 text-xs font-semibold tracking-[0.35em] text-white/80 uppercase">
              Services
            </span>
            <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              A Full-Stack Team Crafting Tomorrow’s Products Today
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-white/70">
              Strategy, design, engineering, and AI expertise delivered through transparent, collaborative partnerships.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4"
        >
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-6 sm:p-7 text-left text-white/90 shadow-[0_20px_40px_rgba(8,15,40,0.35)] transition-all duration-300 backdrop-blur-xl"
              whileHover={{ y: -8, scale: 1.01 }}
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{
                background: "linear-gradient(120deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 50%)",
                mixBlendMode: "screen",
              }} />
              <div
                className={cn(
                  "relative mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br opacity-90",
                  service.iconGradient,
                )}
                style={{ boxShadow: service.glow }}
              >
                <span className="text-2xl text-white">{service.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-white">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/75">
                {service.description}
              </p>
              <div className="absolute inset-0 rounded-2xl border border-transparent transition-all duration-300 group-hover:border-white/40 group-hover:bg-white/10" />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

