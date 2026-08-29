type ResearchEntry = {
  name: string
  desc: string
  sourceLabel: string
  sourceUrl: string
}

type ResearchSection = {
  id: string
  category: string
  description: string
  technologies: ResearchEntry[]
}

type ResearchBand = {
  sections: ResearchSection[]
}

export const techData: Record<"mature" | "emerging" | "cutting", ResearchBand> = {
  mature: {
    sections: [
      {
        id: "knowledge-grounding",
        category: "Knowledge grounding",
        description: "Patterns for connecting generation to selected external material.",
        technologies: [
          {
            name: "Retrieval-augmented generation",
            desc: "Combine a generator with retrieved source material, then evaluate retrieval quality and answer grounding separately.",
            sourceLabel: "Lewis et al., RAG paper",
            sourceUrl: "https://arxiv.org/abs/2005.11401",
          },
        ],
      },
      {
        id: "model-adaptation",
        category: "Model adaptation",
        description: "Ways to specialize model behavior without retraining every parameter.",
        technologies: [
          {
            name: "Low-rank adaptation",
            desc: "Train small low-rank matrices while keeping the pretrained model weights fixed, when the task and evidence justify adaptation.",
            sourceLabel: "Hu et al., LoRA paper",
            sourceUrl: "https://arxiv.org/abs/2106.09685",
          },
        ],
      },
      {
        id: "tool-interfaces",
        category: "Tool and context interfaces",
        description: "Protocol-level boundaries for connecting AI applications to tools and data.",
        technologies: [
          {
            name: "Model Context Protocol",
            desc: "Use an explicit protocol boundary for tools, resources, and prompts, with authorization and deployment decisions treated as part of the system design.",
            sourceLabel: "MCP 2026-07-28 specification release",
            sourceUrl: "https://blog.modelcontextprotocol.io/posts/2026-07-28/",
          },
        ],
      },
    ],
  },
  emerging: {
    sections: [
      {
        id: "agent-patterns",
        category: "Agent patterns",
        description: "Model-led task execution that alternates between reasoning and external actions.",
        technologies: [
          {
            name: "Reasoning and acting loops",
            desc: "Interleave reasoning traces with task-specific actions, while keeping tool authority, failure handling, and evaluation explicit.",
            sourceLabel: "Yao et al., ReAct paper",
            sourceUrl: "https://arxiv.org/abs/2210.03629",
          },
        ],
      },
      {
        id: "attention-kernels",
        category: "Attention kernels",
        description: "Implementation techniques that reduce data movement for transformer attention.",
        technologies: [
          {
            name: "FlashAttention",
            desc: "Use an input-output-aware exact attention algorithm when supported hardware and workload measurements show a practical benefit.",
            sourceLabel: "Dao et al., FlashAttention paper",
            sourceUrl: "https://arxiv.org/abs/2205.14135",
          },
        ],
      },
      {
        id: "model-serving",
        category: "Model serving",
        description: "Memory management patterns for higher-throughput language model inference.",
        technologies: [
          {
            name: "PagedAttention and vLLM",
            desc: "Manage key-value cache memory in blocks so serving decisions can account for fragmentation, batching, and changing sequence lengths.",
            sourceLabel: "Kwon et al., PagedAttention paper",
            sourceUrl: "https://arxiv.org/abs/2309.06180",
          },
        ],
      },
    ],
  },
  cutting: {
    sections: [
      {
        id: "state-space-models",
        category: "Sequence architectures",
        description: "Alternatives to attention-based sequence modeling that need workload-specific validation.",
        technologies: [
          {
            name: "Mamba and selective state spaces",
            desc: "Explore input-dependent state-space models for sequence workloads where linear scaling may matter, without assuming a general replacement for transformers.",
            sourceLabel: "Gu and Dao, Mamba paper",
            sourceUrl: "https://arxiv.org/abs/2312.00752",
          },
        ],
      },
      {
        id: "graph-retrieval",
        category: "Graph-based retrieval",
        description: "Structured retrieval for questions that depend on relationships across a corpus.",
        technologies: [
          {
            name: "GraphRAG",
            desc: "Evaluate graph-derived summaries for global or multi-part questions, including the additional indexing cost and evidence requirements.",
            sourceLabel: "Microsoft Research, GraphRAG publications",
            sourceUrl: "https://www.microsoft.com/en-us/research/project/graphrag/publications/",
          },
        ],
      },
      {
        id: "multimodal-retrieval",
        category: "Multimodal retrieval",
        description: "Retrieval systems that select evidence across text and visual inputs.",
        technologies: [
          {
            name: "Self-adaptive multimodal RAG",
            desc: "Track research that selects retrieval strategies across modalities, then validate it against the actual document, image, and latency constraints of the use case.",
            sourceLabel: "Yu et al., multimodal RAG paper",
            sourceUrl: "https://arxiv.org/abs/2410.11321",
          },
        ],
      },
    ],
  },
}

export const comparisonMatrix = [
  {
    category: "Primary question",
    mature: "Can this established pattern solve the measured task?",
    emerging: "Does a bounded prototype justify operational adoption?",
    cutting: "Is this worth monitoring or testing in a research setting?",
  },
  {
    category: "Evidence expected",
    mature: "Task-level quality, cost, latency, security, and failure behavior",
    emerging: "Prototype results against a simpler baseline",
    cutting: "Paper findings, reproducible code, and a narrow hypothesis",
  },
  {
    category: "Delivery posture",
    mature: "Production candidate after system-specific validation",
    emerging: "Controlled evaluation before production use",
    cutting: "Research watchlist, not a default recommendation",
  },
]
