"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Check, Zap, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AIMLPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  }

  const matureTech = {
    title: "MATURE (2024)",
    subtitle: "Production-Ready Standard",
    color: "emerald",
    icon: Check,
    sections: [
      {
        category: "Core Infrastructure",
        items: [
          { name: "AST (Abstract Syntax Tree) Parsing", desc: "Standard for code understanding" },
          { name: "Language Server Protocol (LSP)", desc: "Industry standard for IDE features" },
          { name: "Merkle Trees", desc: "Change detection and version control" },
          { name: "Vector Databases", desc: "Embedding storage (Pinecone, Turbopuffer, Weaviate)" },
          { name: "Traditional RAG", desc: "Vector similarity search" },
          { name: "Semantic Embeddings", desc: "Text to vectors (OpenAI Ada, sentence-transformers)" },
          { name: "Graph Databases", desc: "Relationship mapping (Neo4j, etc.)" },
        ],
      },
      {
        category: "Neural Architectures",
        items: [
          { name: "Standard Transformers", desc: "Base architecture for LLMs" },
          { name: "Multi-Head Attention", desc: "Original attention mechanism" },
          { name: "BERT-style Encoders", desc: "Bidirectional understanding" },
          { name: "GPT-style Decoders", desc: "Autoregressive generation" },
          { name: "Positional Embeddings", desc: "Sequence position encoding (sinusoidal, learned)" },
        ],
      },
      {
        category: "Training & Optimization",
        items: [
          { name: "Supervised Fine-Tuning (SFT)", desc: "Standard training approach" },
          { name: "LoRA/QLoRA", desc: "Parameter-efficient fine-tuning" },
          { name: "RLHF", desc: "Reinforcement Learning from Human Feedback - Alignment technique" },
          { name: "Quantization (INT8)", desc: "Basic model compression" },
          { name: "Prompt Engineering", desc: "Structured prompting techniques" },
        ],
      },
      {
        category: "Development Patterns",
        items: [
          { name: "Two-Tier Architecture", desc: "Fast/slow paths - Latency optimization" },
          { name: "Local Models", desc: "On-device inference" },
          { name: "Code Completion", desc: "Token prediction" },
          { name: "Diff Generation", desc: "Code change proposals" },
          { name: "Encryption/Security", desc: "Standard E2E encryption" },
        ],
      },
    ],
  }

  const emergingTech = {
    title: "EMERGING (2025)",
    subtitle: "Proven But Still Being Adopted",
    color: "yellow",
    icon: Zap,
    sections: [
      {
        category: "Advanced Neural Architectures",
        items: [
          { name: "Mixture of Experts (MoE)", desc: "Sparse activation (Mixtral, GPT-4)" },
          { name: "Grouped-Query Attention (GQA)", desc: "Efficient KV cache" },
          { name: "FlashAttention 2/3", desc: "Memory-efficient attention" },
          { name: "Rotary Position Embeddings (RoPE)", desc: "Relative position encoding" },
          { name: "Multi-Latent Attention (MLA)", desc: "Compressed KV cache (DeepSeek)" },
        ],
      },
      {
        category: "Reasoning & Compute",
        items: [
          { name: "Test-Time Compute", desc: "Extended inference reasoning (o1, o3)" },
          { name: "Chain-of-Thought (CoT) Prompting", desc: "Step-by-step reasoning" },
          { name: "Self-Consistency", desc: "Multiple reasoning paths" },
          { name: "Process Reward Models (PRM)", desc: "Step-wise verification" },
          { name: "Monte Carlo Tree Search for LLMs", desc: "Search-based inference" },
        ],
      },
      {
        category: "Memory & Caching",
        items: [
          { name: "PagedAttention", desc: "Virtual memory for KV cache (vLLM)" },
          { name: "KV Cache Optimization", desc: "Compression and pruning" },
          { name: "Cyclic KV Cache", desc: "Circular buffers for sliding windows" },
          { name: "Hierarchical Memory Systems", desc: "Working/Main/Archive tiers" },
        ],
      },
      {
        category: "Advanced Retrieval",
        items: [
          { name: "Graph RAG", desc: "Knowledge graph + vector search hybrid" },
          { name: "Semantic Search", desc: "Enhanced embedding similarity" },
          { name: "Multi-Hop Reasoning", desc: "Graph traversal for connected info" },
          { name: "Community Detection", desc: "Clustering for summarization" },
        ],
      },
      {
        category: "Agentic Systems",
        items: [
          { name: "Multi-Agent Orchestration", desc: "Coordinated agent systems (AutoGen, CrewAI)" },
          { name: "Actor-Evaluator-Reflection", desc: "Self-improving agents" },
          { name: "Debate-Based Systems", desc: "Multiple agents arguing solutions" },
          { name: "Asynchronous Coding Agents", desc: "Cloud-based parallel execution" },
        ],
      },
      {
        category: "Optimization Techniques",
        items: [
          { name: "Speculative Decoding", desc: "Draft model + verification" },
          { name: "Ring Attention", desc: "Distributed attention computation" },
          { name: "Quantization (INT4, FP8)", desc: "Advanced compression (GPTQ, AWQ)" },
          { name: "Kernel Fusion", desc: "Combined operations for efficiency" },
          { name: "Online RL", desc: "Real-time learning from feedback" },
        ],
      },
      {
        category: "Program Understanding",
        items: [
          { name: "Program Synthesis", desc: "Generate code from specs" },
          { name: "Formal Verification", desc: "Provably correct code" },
          { name: "CEGIS", desc: "Counter-Example Guided Inductive Synthesis" },
          { name: "Abstract Interpretation", desc: "Static analysis techniques" },
        ],
      },
    ],
  }

  const cuttingEdgeTech = {
    title: "CUTTING EDGE (2026+)",
    subtitle: "Research/Early Experiments",
    color: "red",
    icon: Rocket,
    sections: [
      {
        category: "Next-Gen Architectures",
        items: [
          { name: "Mamba / State Space Models (SSMs)", desc: "Linear-time alternative to transformers" },
          { name: "Kolmogorov-Arnold Networks (KANs)", desc: "Learnable activation functions" },
          { name: "Liquid Neural Networks", desc: "Continuous-time adaptive models" },
          { name: "Hyper-Networks", desc: "Networks generating other networks" },
          { name: "Neural ODEs", desc: "Continuous-depth models" },
        ],
      },
      {
        category: "Hybrid Intelligence",
        items: [
          { name: "Neurosymbolic AI", desc: "Neural + symbolic reasoning fusion" },
          { name: "World Models for Code", desc: "Internal simulation of execution" },
          { name: "Causal Reasoning Models", desc: "Understanding cause-effect in code" },
          { name: "Theorem Provers + LLMs", desc: "Formal methods integration" },
          { name: "Constraint-Based Generation", desc: "Satisfying formal constraints" },
        ],
      },
      {
        category: "Advanced Reasoning",
        items: [
          { name: "ParaThinker", desc: "Native parallel thinking (overcomes sequential bias)" },
          { name: "Reflexion Loops", desc: "Iterative self-correction" },
          { name: "Expected Attention", desc: "Predicting future query distributions" },
          { name: "Meta-Reasoning", desc: "Reasoning about reasoning strategies" },
          { name: "Compositional Generalization", desc: "Systematic recombination" },
        ],
      },
      {
        category: "Next-Gen Retrieval",
        items: [
          { name: "Agentic RAG", desc: "Active query/synthesis agents" },
          { name: "Multi-Modal RAG", desc: "Images/diagrams/video in code docs" },
          { name: "Causal RAG", desc: "Dependency and causality understanding" },
          { name: "Temporal RAG", desc: "Time-aware code evolution tracking" },
          { name: "Federated RAG", desc: "Privacy-preserving distributed retrieval" },
        ],
      },
      {
        category: "Frontier Techniques",
        items: [
          { name: "Quantum-Inspired Algorithms", desc: "Quantum annealing for optimization" },
          { name: "Tensor Networks", desc: "Efficient parameter representation" },
          { name: "Federated Learning", desc: "Distributed training without centralization" },
          { name: "Gradient-Based Meta-Learning", desc: "Rapid adaptation (MAML extensions)" },
          { name: "Self-Supervised Structure Learning", desc: "Learning from code structure alone" },
        ],
      },
      {
        category: "Memory & Context",
        items: [
          { name: "Infinite Context Windows", desc: "Beyond fixed-length limitations" },
          { name: "Dynamic Memory Allocation", desc: "Adaptive context management" },
          { name: "Episodic Memory Systems", desc: "Human-like memory formation" },
          { name: "Associative Memory Networks", desc: "Content-addressable storage" },
        ],
      },
    ],
  }

  const comparisonMatrix = [
    {
      category: "Attention Mechanisms",
      mature: "Multi-Head",
      emerging: "GQA, FlashAttention, MLA",
      cutting: "Expected Attention, KANs",
    },
    {
      category: "Reasoning",
      mature: "Prompting",
      emerging: "CoT, Test-Time Compute",
      cutting: "ParaThinker, Meta-Reasoning",
    },
    {
      category: "Retrieval",
      mature: "Vector RAG",
      emerging: "Graph RAG",
      cutting: "Agentic/Causal/Multimodal RAG",
    },
    {
      category: "Agents",
      mature: "Single-agent",
      emerging: "Multi-agent orchestration",
      cutting: "Neurosymbolic agents",
    },
    {
      category: "Memory",
      mature: "Fixed context",
      emerging: "Paged/Hierarchical",
      cutting: "Infinite context, Episodic",
    },
    {
      category: "Architectures",
      mature: "Transformers",
      emerging: "MoE, Speculative Decode",
      cutting: "Mamba/SSMs, Liquid Networks",
    },
    {
      category: "Verification",
      mature: "Testing",
      emerging: "Program Synthesis",
      cutting: "Formal Methods + AI",
    },
    {
      category: "Training",
      mature: "RLHF",
      emerging: "Online RL, PRM",
      cutting: "Federated Learning",
    },
  ]

  const renderTechSection = (techData: typeof matureTech) => {
    const Icon = techData.icon
    const colorClasses = {
      emerald: {
        badge: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
        gradient: "from-emerald-500 to-green-600",
        hover: "hover:border-emerald-500/50",
        text: "text-emerald-400",
      },
      yellow: {
        badge: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
        gradient: "from-yellow-500 to-orange-600",
        hover: "hover:border-yellow-500/50",
        text: "text-yellow-400",
      },
      red: {
        badge: "bg-red-500/10 border-red-500/30 text-red-400",
        gradient: "from-red-500 to-pink-600",
        hover: "hover:border-red-500/50",
        text: "text-red-400",
      },
    }

    const colors = colorClasses[techData.color as keyof typeof colorClasses]

    return (
      <motion.div variants={itemVariants} className="space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border backdrop-blur-sm ${colors.badge}">
            <Icon className="h-5 w-5" />
            <span className="font-bold text-lg">{techData.title}</span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-300">{techData.subtitle}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {techData.sections.map((section, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={`group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 ${colors.hover} transition-all duration-300`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              
              <div className="relative z-10 space-y-4">
                <h4 className={`text-xl font-bold ${colors.text} mb-4`}>{section.category}</h4>
                <div className="space-y-3">
                  {section.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-start gap-3 group/item">
                      <div className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-br ${colors.gradient} flex-shrink-0`} />
                      <div className="flex-1">
                        <div className="font-semibold text-white group-hover/item:text-cyan-400 transition-colors">
                          {item.name}
                        </div>
                        <div className="text-sm text-gray-400">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    )
  }

  return (
    <main className="relative min-h-screen bg-black text-white">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-b from-black to-gray-900">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent"></div>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="border-b border-gray-800 backdrop-blur-md bg-black/50 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-6">
            <Link href="/">
              <Button variant="ghost" className="gap-2 text-gray-400 hover:text-cyan-400">
                <ArrowLeft className="h-4 w-4" />
                Back to Research
              </Button>
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-16 max-w-[1600px]">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-20"
          >
            {/* Hero */}
            <motion.div variants={itemVariants} className="text-center space-y-6">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600">
                  Artificial Intelligence
                </span>
                <br />
                <span className="text-white">& Machine Learning</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                A comprehensive overview of{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold">
                  AI/ML technologies
                </span>{" "}
                from production-ready standards to cutting-edge research
              </p>
            </motion.div>

            {/* Mature Technologies */}
            {renderTechSection(matureTech)}

            {/* Divider */}
            <motion.div variants={itemVariants} className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

            {/* Emerging Technologies */}
            {renderTechSection(emergingTech)}

            {/* Divider */}
            <motion.div variants={itemVariants} className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

            {/* Cutting Edge Technologies */}
            {renderTechSection(cuttingEdgeTech)}

            {/* Divider */}
            <motion.div variants={itemVariants} className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

            {/* Comparison Matrix */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="text-center">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600">
                    Technology Comparison Matrix
                  </span>
                </h3>
                <p className="text-gray-400 text-lg">Quick reference across maturity levels</p>
              </div>

              <div className="overflow-x-auto">
                <div className="min-w-[800px] bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden">
                  {/* Header */}
                  <div className="grid grid-cols-4 gap-4 p-6 border-b border-gray-800 bg-gray-800/50">
                    <div className="font-bold text-white">Technology Category</div>
                    <div className="font-bold text-emerald-400 text-center">Mature</div>
                    <div className="font-bold text-yellow-400 text-center">Emerging</div>
                    <div className="font-bold text-red-400 text-center">Cutting Edge</div>
                  </div>

                  {/* Rows */}
                  {comparisonMatrix.map((row, idx) => (
                    <motion.div
                      key={idx}
                      variants={itemVariants}
                      className="grid grid-cols-4 gap-4 p-6 border-b border-gray-800 last:border-b-0 hover:bg-gray-800/30 transition-colors"
                    >
                      <div className="font-semibold text-white">{row.category}</div>
                      <div className="text-gray-300 text-sm text-center">{row.mature}</div>
                      <div className="text-gray-300 text-sm text-center">{row.emerging}</div>
                      <div className="text-gray-300 text-sm text-center">{row.cutting}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div variants={itemVariants} className="text-center space-y-6 pt-8">
              <h3 className="text-3xl font-bold">
                Want to Leverage These{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600">
                  Technologies
                </span>
                ?
              </h3>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Let's discuss how we can implement these solutions for your business
              </p>
              <Link href="/">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0 rounded-full px-10 py-6 text-lg shadow-lg shadow-cyan-500/25"
                >
                  Get Started
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
