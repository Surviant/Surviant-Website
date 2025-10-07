"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ArrowLeft, 
  Sparkles, 
  Play, 
  Activity, 
  Beaker, 
  Code2,
  Brain,
  Zap,
  Rocket,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Eye
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import NoiseBackground from "@/components/ui/noise-background"
import ParticleBackground from "@/components/ui/particle-background"
import Image from "next/image"

export default function AIMLPage() {
  const [hasWebGL, setHasWebGL] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Check for WebGL support
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      setHasWebGL(!!gl)
    } catch (e) {
      setHasWebGL(false)
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
  }

  // Status definitions
  const statusTypes = {
    production: {
      label: "In Production",
      icon: CheckCircle2,
      color: "emerald",
      classes: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
    },
    research: {
      label: "Active Research",
      icon: Activity,
      color: "blue",
      classes: "bg-blue-500/10 border-blue-500/30 text-blue-400",
    },
    experimental: {
      label: "Experimenting",
      icon: Beaker,
      color: "purple",
      classes: "bg-purple-500/10 border-purple-500/30 text-purple-400",
    },
  }

  // Tech categories with real use cases
  const techCategories = [
    {
      id: "transformers",
      title: "Transformer Architectures",
      status: "production",
      icon: Brain,
      gradient: "from-cyan-500 to-blue-600",
      description: "Powering our code generation and analysis systems",
      useCases: [
        {
          title: "Real-Time Code Completion",
          desc: "Built custom transformer models achieving 92% accuracy for context-aware code suggestions across 15+ languages",
          metric: "10M+ completions daily",
          tech: ["GPT-style Decoders", "Multi-Head Attention", "Positional Embeddings"],
        },
        {
          title: "Intelligent Code Review",
          desc: "BERT-based encoders analyze code quality, security vulnerabilities, and best practices violations automatically",
          metric: "500K+ PRs analyzed",
          tech: ["BERT Encoders", "Bidirectional Context", "Fine-tuned Models"],
        },
        {
          title: "Natural Language Queries",
          desc: "Convert plain English to database queries and API calls using attention-based seq2seq models",
          metric: "98% query accuracy",
          tech: ["Seq2Seq", "Attention Mechanism", "Custom Tokenization"],
        },
      ],
    },
    {
      id: "rag",
      title: "Advanced RAG Systems",
      status: "production",
      icon: Zap,
      gradient: "from-yellow-500 to-orange-600",
      description: "Graph RAG + Vector search for intelligent documentation",
      useCases: [
        {
          title: "Codebase Intelligence",
          desc: "Graph RAG system maps code dependencies, enabling multi-hop reasoning across 2M+ files in enterprise repos",
          metric: "<100ms query time",
          tech: ["Graph RAG", "Neo4j", "Pinecone", "Multi-Hop Reasoning"],
        },
        {
          title: "Context-Aware Documentation",
          desc: "Semantic search combined with knowledge graphs provides relevant docs with full context chains",
          metric: "10TB indexed data",
          tech: ["Semantic Embeddings", "Community Detection", "Turbopuffer"],
        },
        {
          title: "Automated API Discovery",
          desc: "RAG system analyzes codebases to auto-generate OpenAPI specs and integration guides",
          metric: "5K+ APIs mapped",
          tech: ["AST Parsing", "Vector Similarity", "Template Generation"],
        },
      ],
    },
    {
      id: "moe",
      title: "Mixture of Experts",
      status: "research",
      icon: Sparkles,
      gradient: "from-purple-500 to-pink-600",
      description: "Sparse activation for efficient large-scale models",
      useCases: [
        {
          title: "Domain-Specific Code Gen",
          desc: "Training MoE with specialized experts for frontend, backend, ML, and DevOps code generation",
          metric: "8 expert models",
          tech: ["Sparse Activation", "Mixtral Architecture", "Expert Routing"],
        },
        {
          title: "Multi-Language Translation",
          desc: "MoE system handles 50+ programming languages with language-specific expert networks",
          metric: "50+ languages",
          tech: ["Gated Experts", "Load Balancing", "Dynamic Routing"],
        },
        {
          title: "Optimization Engine",
          desc: "Experts specialized in performance, security, and maintainability analyze and refactor code",
          metric: "3 optimization modes",
          tech: ["MoE Architecture", "Task-Specific Experts", "Ensemble Methods"],
        },
      ],
    },
    {
      id: "test-time",
      title: "Test-Time Compute",
      status: "research",
      icon: Activity,
      gradient: "from-green-500 to-teal-600",
      description: "Extended reasoning with o1-style thinking",
      useCases: [
        {
          title: "Complex Debugging",
          desc: "Extended inference time allows deep causal analysis of bugs across multiple files and contexts",
          metric: "15 min reasoning",
          tech: ["Chain-of-Thought", "Self-Consistency", "Process Reward Models"],
        },
        {
          title: "Architecture Planning",
          desc: "System design decisions evaluated through Monte Carlo tree search of possible implementations",
          metric: "100+ paths explored",
          tech: ["MCTS for LLMs", "Beam Search", "Rollout Simulation"],
        },
        {
          title: "Code Verification",
          desc: "Step-by-step verification ensures correctness before deployment using process reward models",
          metric: "99.2% accuracy",
          tech: ["PRM", "Verification Steps", "Iterative Refinement"],
        },
      ],
    },
    {
      id: "agents",
      title: "Multi-Agent Systems",
      status: "research",
      icon: Code2,
      gradient: "from-cyan-400 to-indigo-600",
      description: "Coordinated AI agents for complex development",
      useCases: [
        {
          title: "Autonomous Dev Teams",
          desc: "Multiple specialized agents collaborate on features: architect, coder, tester, reviewer work in parallel",
          metric: "4 agent types",
          tech: ["AutoGen", "Actor-Evaluator", "Debate Systems", "Async Execution"],
        },
        {
          title: "CI/CD Optimization",
          desc: "Agent swarms analyze build failures, suggest fixes, and automatically implement solutions",
          metric: "70% auto-fix rate",
          tech: ["Multi-Agent Orchestration", "CrewAI", "Reflection Loops"],
        },
        {
          title: "Documentation Bots",
          desc: "Specialized agents maintain docs, write tutorials, and answer developer questions in Slack",
          metric: "24/7 support",
          tech: ["Specialized Agents", "RAG Integration", "Natural Language"],
        },
      ],
    },
    {
      id: "mamba",
      title: "State Space Models (Mamba)",
      status: "experimental",
      icon: Rocket,
      gradient: "from-red-500 to-orange-600",
      description: "Linear-time alternatives to transformers",
      useCases: [
        {
          title: "Long Context Processing",
          desc: "Testing Mamba for handling entire repositories (1M+ tokens) with linear memory scaling",
          metric: "1M token context",
          tech: ["Mamba Architecture", "S4 Layers", "Linear Attention"],
        },
        {
          title: "Streaming Code Analysis",
          desc: "Real-time analysis of code as it's written with constant memory footprint",
          metric: "O(n) complexity",
          tech: ["State Space Models", "Continuous Processing", "Selective Scan"],
        },
        {
          title: "Efficient Fine-Tuning",
          desc: "Exploring SSMs for faster model adaptation with lower compute requirements",
          metric: "10x faster",
          tech: ["Efficient Training", "Linear Scaling", "Low Memory"],
        },
      ],
    },
    {
      id: "neurosymbolic",
      title: "Neurosymbolic AI",
      status: "experimental",
      icon: Beaker,
      gradient: "from-violet-500 to-purple-600",
      description: "Combining neural networks with symbolic reasoning",
      useCases: [
        {
          title: "Formal Verification",
          desc: "Integrating LLMs with theorem provers to generate provably correct code",
          metric: "Beta testing",
          tech: ["Theorem Provers", "Symbolic Logic", "Neural Guidance"],
        },
        {
          title: "Constraint Satisfaction",
          desc: "Neural models respect hard constraints (type safety, business rules) during code generation",
          metric: "100% constraint adherence",
          tech: ["Constraint Programming", "Neural-Symbolic Fusion", "SAT Solvers"],
        },
        {
          title: "Causal Code Understanding",
          desc: "Building models that understand cause-effect relationships in code execution flows",
          metric: "Prototype phase",
          tech: ["Causal Inference", "Program Analysis", "World Models"],
        },
      ],
    },
  ]

  const filteredTechs = selectedCategory === "all" 
    ? techCategories 
    : techCategories.filter(tech => tech.status === selectedCategory)

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-b from-black to-gray-900">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Particle Background */}
      {hasWebGL && <ParticleBackground />}

      {/* Noise Texture */}
      <NoiseBackground opacity={0.03} />

      <div className="relative z-10">
        {/* Floating Navigation */}
        <motion.div 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800 backdrop-blur-md bg-black/50"
        >
          <div className="container mx-auto px-4 py-6 flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" className="gap-2 text-gray-400 hover:text-cyan-400">
                <ArrowLeft className="h-4 w-4" />
                Back to Research
              </Button>
            </Link>
            
            {/* Filter Buttons */}
            <div className="hidden md:flex gap-2">
              {[
                { id: "all", label: "All Technologies" },
                { id: "production", label: "In Production" },
                { id: "research", label: "Research" },
                { id: "experimental", label: "Experimental" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedCategory(filter.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === filter.id
                      ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
                      : "bg-gray-800 text-gray-400 hover:text-white"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="container mx-auto px-4 pt-32 pb-20 max-w-[1600px]">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-24"
          >
            {/* Hero */}
            <motion.div variants={itemVariants} className="text-center space-y-8">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm">
                <Brain className="h-5 w-5 text-cyan-400" />
                <span className="text-cyan-400 font-semibold">Real-World AI/ML Implementation</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600">
                  Artificial Intelligence
                </span>
                <br />
                <span className="text-white">We're Building With</span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
                From{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold">
                  production-ready transformers
                </span>{" "}
                serving millions to{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold">
                  experimental neurosymbolic systems
                </span>
                —here's what we're actually using, researching, and building
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8">
                {[
                  { value: "10M+", label: "Daily Inferences" },
                  { value: "2M+", label: "Files Analyzed" },
                  { value: "15+", label: "Languages Supported" },
                  { value: "98%", label: "Accuracy Rate" },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="p-6 rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm"
                  >
                    <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Technology Cards */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-16"
              >
                {filteredTechs.map((tech, index) => {
                  const StatusIcon = statusTypes[tech.status as keyof typeof statusTypes].icon
                  const TechIcon = tech.icon
                  
                  return (
                    <motion.div
                      key={tech.id}
                      variants={itemVariants}
                      className="group relative"
                    >
                      {/* Category Header */}
                      <div className="flex items-start gap-6 mb-8">
                        <div className={`p-6 rounded-2xl bg-gradient-to-br ${tech.gradient} shadow-lg`}>
                          <TechIcon className="h-10 w-10 text-white" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h2 className="text-3xl md:text-4xl font-bold text-white">
                              {tech.title}
                            </h2>
                            <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium ${statusTypes[tech.status as keyof typeof statusTypes].classes}`}>
                              <StatusIcon className="h-4 w-4" />
                              {statusTypes[tech.status as keyof typeof statusTypes].label}
                            </span>
                          </div>
                          <p className="text-xl text-gray-400">{tech.description}</p>
                        </div>
                      </div>

                      {/* Use Cases Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {tech.useCases.map((useCase, idx) => (
                          <motion.div
                            key={idx}
                            variants={itemVariants}
                            className="group/card relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300"
                            whileHover={{ y: -8, scale: 1.02 }}
                          >
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-600/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 rounded-2xl" />
                            
                            <div className="relative z-10 space-y-4">
                              {/* Use Case Title */}
                              <div className="flex items-start justify-between">
                                <h3 className="text-xl font-bold text-white group-hover/card:bg-clip-text group-hover/card:text-transparent group-hover/card:bg-gradient-to-r group-hover/card:from-cyan-400 group-hover/card:to-purple-500 transition-all duration-300">
                                  {useCase.title}
                                </h3>
                                <Play className="h-5 w-5 text-cyan-400 opacity-0 group-hover/card:opacity-100 transition-opacity flex-shrink-0" />
                              </div>

                              {/* Description */}
                              <p className="text-gray-400 leading-relaxed">
                                {useCase.desc}
                              </p>

                              {/* Metric Badge */}
                              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border border-cyan-500/20">
                                <TrendingUp className="h-4 w-4 text-cyan-400" />
                                <span className="text-sm font-semibold text-cyan-400">
                                  {useCase.metric}
                                </span>
                              </div>

                              {/* Tech Stack */}
                              <div className="pt-4 border-t border-gray-800 space-y-2">
                                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                  Technologies Used
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                  {useCase.tech.map((t, tidx) => (
                                    <span
                                      key={tidx}
                                      className="px-2 py-1 rounded-md text-xs border border-gray-700 bg-gray-800/50 text-gray-400 group-hover/card:border-cyan-500/30 group-hover/card:bg-cyan-500/5 group-hover/card:text-cyan-400 transition-all duration-300"
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Corner Accent */}
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${tech.gradient} opacity-0 rounded-2xl blur-3xl group-hover/card:opacity-10 transition-opacity duration-300`} />
                          </motion.div>
                        ))}
                      </div>

                      {/* Separator */}
                      {index < filteredTechs.length - 1 && (
                        <div className="mt-16 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
                      )}
                    </motion.div>
                  )
                })}
              </motion.div>
            </AnimatePresence>

            {/* CTA Section */}
            <motion.div variants={itemVariants} className="relative overflow-hidden rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-sm p-12 md:p-16 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-600/10" />
              <div className="relative z-10 space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold">
                  Ready to Build with{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600">
                    Cutting-Edge AI
                  </span>
                  ?
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  Let's discuss how these technologies can transform your product
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                  <Link href="/#contact">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0 rounded-full px-10 py-6 text-lg shadow-lg shadow-cyan-500/25"
                    >
                      Start a Project
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 rounded-full px-10 py-6 text-lg"
                    >
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
