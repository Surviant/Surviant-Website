import {
  assertPublicCopy,
  offeringContentSchema,
  practiceContentSchema,
  type OfferingContent,
  type PracticeContent,
  type PracticeSlug,
} from "./schema"

const rawPractices: PracticeContent[] = [
  {
    slug: "ai-engineering",
    title: "AI Engineering",
    shortTitle: "AI Engineering",
    eyebrow: "Practice / AI Engineering",
    promise: "Put useful intelligence inside products and workflows, with the measurement needed to understand how it performs.",
    summary: "We design, build, and evaluate AI capabilities that connect to real products, knowledge, tools, and operating decisions.",
    buyerContext: "For teams with a defined business problem, proprietary knowledge, or an existing product that could benefit from models, agents, retrieval, vision, or voice.",
    relationshipTitle: "From opportunity to measured production behavior",
    relationshipBody: "Strategy identifies the opportunity. Models and retrieval provide intelligence and context. Agents, vision, and voice turn that capability into action. MCP and integration connect it to real systems. Evaluation harnesses measure quality across the practice.",
    whenUseful: [
      "A defined task has quality, cost, latency, privacy, or scale constraints that a general model does not resolve.",
      "An AI capability must use proprietary knowledge, business systems, or controlled tools inside a real workflow.",
      "A promising experiment needs representative evaluation, operating safeguards, and a credible production path.",
    ],
    relationshipGroups: [
      {
        label: "Decide and adapt",
        summary: "Choose the opportunity and the model approach with evidence.",
        offeringSlugs: ["ai-strategy-proof-of-concept", "model-training-fine-tuning"],
      },
      {
        label: "Ground and act",
        summary: "Give the system useful context, interfaces, and task behavior.",
        offeringSlugs: ["rag-retrieval-systems", "agentic-systems", "computer-vision", "voice-ai"],
      },
      {
        label: "Connect and measure",
        summary: "Integrate the capability and make its production behavior observable.",
        offeringSlugs: ["mcp-server-development", "ai-integration", "agent-evaluation-harnesses"],
      },
    ],
    offeringSlugs: [
      "model-training-fine-tuning",
      "agentic-systems",
      "agent-evaluation-harnesses",
      "rag-retrieval-systems",
      "computer-vision",
      "voice-ai",
      "mcp-server-development",
      "ai-integration",
      "ai-strategy-proof-of-concept",
    ],
    relatedPracticeSlugs: ["product-engineering", "digital-transformation"],
    seo: {
      title: "AI Engineering Services",
      description: "Build and evaluate models, agents, retrieval, vision, voice, MCP servers, and practical AI integrations around a real business need.",
    },
    status: "approved",
  },
  {
    slug: "product-engineering",
    title: "Product Engineering",
    shortTitle: "Product Engineering",
    eyebrow: "Practice / Product Engineering",
    promise: "Build the product as one coherent system, from the interface people use to the services and infrastructure that support it.",
    summary: "We connect product framing, interface design, application engineering, backend systems, quality, and production delivery.",
    buyerContext: "For established businesses replacing a fragile internal tool, launching a customer platform, or extending a product that has outgrown its current foundation.",
    relationshipTitle: "One product from interface to production",
    relationshipBody: "Product design establishes the jobs and flows. Web and mobile deliver the experience. Backend services carry data and business logic. Cloud and DevOps create a repeatable operating environment. QA gives every layer a shared release standard.",
    whenUseful: [
      "A customer or internal product has become difficult to use, unreliable to release, or expensive to change.",
      "A new product needs its interface, application logic, integrations, and production environment designed together.",
      "Several channels or systems need to share dependable business logic, data, identity, and release standards.",
    ],
    relationshipGroups: [
      {
        label: "Shape the product",
        summary: "Resolve the product structure, journeys, and risky assumptions.",
        offeringSlugs: ["product-design"],
      },
      {
        label: "Build the system",
        summary: "Deliver the user-facing channels and the services behind them.",
        offeringSlugs: ["web", "mobile", "backend-apis"],
      },
      {
        label: "Release and operate",
        summary: "Make quality, deployment, observation, and recovery part of delivery.",
        offeringSlugs: ["qa-testing", "cloud-devops"],
      },
    ],
    offeringSlugs: ["web", "mobile", "backend-apis", "cloud-devops", "qa-testing", "product-design"],
    relatedPracticeSlugs: ["ai-engineering", "digital-transformation"],
    seo: {
      title: "Product Engineering Services",
      description: "Design, build, test, and operate dependable web, mobile, API, and cloud products as one connected production system.",
    },
    status: "approved",
  },
  {
    slug: "digital-transformation",
    title: "Digital Transformation",
    shortTitle: "Digital Transformation",
    eyebrow: "Practice / Digital Transformation",
    promise: "Modernize the systems and operating workflows that limit how the business works today.",
    summary: "We improve legacy software, recurring processes, data movement, system integration, and physical operations without losing continuity.",
    buyerContext: "For established organizations dealing with aging software, manual handoffs, disconnected tools, scattered data, or physical operations that no longer fit the business.",
    relationshipTitle: "Change the system without losing the operation",
    relationshipBody: "Modernization identifies what must change. Build-or-buy selects the right path. Automation removes repetitive movement. Data infrastructure creates a dependable information layer. Hardware connects physical work. AI enablement follows once the process and data foundation are clear.",
    whenUseful: [
      "An essential aging system limits change, creates support risk, or prevents useful connections to newer tools.",
      "Manual handoffs, repeated reconciliation, or disconnected platforms slow a recurring business process.",
      "Operational change must preserve continuity, clarify ownership, and support the people who will run the new system.",
    ],
    relationshipGroups: [
      {
        label: "Choose the path",
        summary: "Understand the constraint and select a controlled modernization route.",
        offeringSlugs: ["legacy-modernization", "build-or-buy-integration"],
      },
      {
        label: "Change the operation",
        summary: "Improve process movement and connect work in physical settings.",
        offeringSlugs: ["workflow-process-automation", "hardware-iot-systems"],
      },
      {
        label: "Strengthen the foundation",
        summary: "Make operational data dependable and introduce AI where it helps.",
        offeringSlugs: ["data-infrastructure-analytics", "ai-enablement-operations"],
      },
    ],
    offeringSlugs: [
      "legacy-modernization",
      "workflow-process-automation",
      "build-or-buy-integration",
      "hardware-iot-systems",
      "data-infrastructure-analytics",
      "ai-enablement-operations",
    ],
    relatedPracticeSlugs: ["product-engineering", "ai-engineering"],
    seo: {
      title: "Digital Transformation Services",
      description: "Modernize legacy systems, automate workflows, connect tools and hardware, improve data, and introduce practical AI into operations.",
    },
    status: "approved",
  },
]

const rawOfferings: OfferingContent[] = [
  {
    slug: "model-training-fine-tuning",
    practiceSlug: "ai-engineering",
    title: "Model Training & Fine-Tuning",
    shortTitle: "Model Training",
    deliveryMode: "build",
    headline: "Fit the model to the work, not the work to the model.",
    lede: "Find the model approach that meets your domain, quality, latency, cost, and deployment constraints with evidence.",
    buyerProblem: "General-purpose models may miss domain language, cost too much at scale, respond too slowly, or perform poorly on specialized inputs. Your team needs to know whether prompting, retrieval, fine-tuning, or a specialized model is the soundest path.",
    capabilities: [
      { title: "Model and data assessment", body: "Examine the task, available data, quality targets, latency, cost, and deployment constraints before choosing an approach." },
      { title: "Training and adaptation", body: "Fine-tune an existing model or train a specialized model when the evidence supports that investment." },
      { title: "Performance evaluation", body: "Compare candidates against representative cases and document the tradeoffs that affect production use." },
    ],
    deliverables: ["Model approach and data-readiness brief", "Reproducible trained or fine-tuned model", "Evaluation report and deployment recommendation"],
    rightFit: "Useful when a repeatable, domain-specific task is not meeting its quality, cost, privacy, or latency target with a standard model.",
    simplerAlternative: "Start with stronger prompting or retrieval when the main need is access to current knowledge rather than changed model behavior.",
    relatedOfferingSlugs: ["rag-retrieval-systems", "agent-evaluation-harnesses", "ai-strategy-proof-of-concept"],
    seo: { title: "Model Training and Fine-Tuning Services", description: "Assess, train, fine-tune, and evaluate models against representative domain tasks, deployment constraints, and production quality targets." },
    status: "approved",
  },
  {
    slug: "agentic-systems",
    practiceSlug: "ai-engineering",
    title: "Agentic Systems",
    shortTitle: "Agentic Systems",
    deliveryMode: "build",
    headline: "Give AI a defined job, the right tools, and clear limits.",
    lede: "Build agents that coordinate multi-step work, use approved systems, ask for input, and expose what happened.",
    buyerProblem: "A workflow spans several systems and decisions, but a chatbot can only answer questions. The business needs software that can plan steps, use approved tools, request human input, and recover when conditions change.",
    capabilities: [
      { title: "Workflow and authority design", body: "Define the task, tool access, decision boundaries, approval points, and escalation paths before implementation." },
      { title: "Tool-using agent development", body: "Build agents that read context, call business systems, complete multi-step work, and return an auditable result." },
      { title: "Operational safeguards", body: "Add state handling, retries, fallbacks, observation, and evaluation for the situations the agent will face." },
    ],
    deliverables: ["Agent workflow and authority map", "Agent service with documented tool contracts", "Evaluation set and operating runbook"],
    rightFit: "Appropriate when work involves variable decisions or multi-step coordination that cannot be captured reliably in a fixed automation.",
    simplerAlternative: "Use a deterministic workflow, script, or single model call when the steps and outcomes are predictable.",
    relatedOfferingSlugs: ["agent-evaluation-harnesses", "mcp-server-development", "rag-retrieval-systems"],
    seo: { title: "Agentic AI System Development", description: "Design and build tool-using AI agents with defined authority, human review, observable runs, recovery paths, and production evaluation." },
    status: "approved",
  },
  {
    slug: "agent-evaluation-harnesses",
    practiceSlug: "ai-engineering",
    title: "Agent & Evaluation Harnesses",
    shortTitle: "Evaluation Harnesses",
    deliveryMode: "build",
    headline: "Know how your AI behaves before users have to tell you.",
    lede: "Make model and agent changes measurable with representative cases, release thresholds, and observable production runs.",
    buyerProblem: "AI quality can shift when prompts, data, models, or connected tools change. Without representative tests and observable runs, teams cannot compare versions, investigate failures, or decide whether a release is ready.",
    capabilities: [
      { title: "Evaluation design", body: "Turn business expectations and failure risks into test cases, scoring criteria, and release thresholds." },
      { title: "Automated test harnesses", body: "Run repeatable checks across model responses, retrieval results, tool calls, and full agent trajectories." },
      { title: "Production observation", body: "Capture useful traces and failure categories so the team can diagnose change without unnecessary sensitive content." },
    ],
    deliverables: ["Versioned evaluation dataset and rubric", "Automated evaluation pipeline with baseline results", "Monitoring and release-review playbook"],
    rightFit: "Needed when an AI feature is moving toward production, changes frequently, or performs work where inconsistency carries a meaningful cost.",
    simplerAlternative: "Use a compact manual review set for an early experiment with low volume and no operational dependency.",
    relatedOfferingSlugs: ["agentic-systems", "model-training-fine-tuning", "rag-retrieval-systems"],
    seo: { title: "AI Agent Evaluation Harnesses", description: "Create evaluation datasets, rubrics, automated harnesses, release thresholds, and production traces for models, retrieval, and agents." },
    status: "approved",
  },
  {
    slug: "rag-retrieval-systems",
    practiceSlug: "ai-engineering",
    title: "RAG / Retrieval Systems",
    shortTitle: "RAG & Retrieval",
    deliveryMode: "build",
    headline: "Help AI answer from the information your business trusts.",
    lede: "Turn approved documents and system knowledge into grounded answers with useful sources, permissions, and quality measurement.",
    buyerProblem: "Important knowledge is scattered across documents, systems, and teams, while a general model has no dependable view of what is current for the organization. Users need answers grounded in approved sources and a way to inspect where those answers came from.",
    capabilities: [
      { title: "Knowledge-source preparation", body: "Inventory, clean, segment, and permission the material the retrieval system is allowed to use." },
      { title: "Retrieval and ranking", body: "Build search, embedding, filtering, reranking, and citation flows around the questions users ask." },
      { title: "Grounded-answer evaluation", body: "Measure retrieval coverage, source quality, answer support, and failure patterns on representative queries." },
    ],
    deliverables: ["Searchable knowledge pipeline", "Retrieval API or answer experience with sources", "Evaluation set and content-refresh procedure"],
    rightFit: "Strong for internal knowledge, support content, policy reference, research, or product help that must stay aligned with changing source material.",
    simplerAlternative: "Improve conventional search or organize the underlying content when users mainly need navigation rather than generated answers.",
    relatedOfferingSlugs: ["data-infrastructure-analytics", "agent-evaluation-harnesses", "ai-integration"],
    seo: { title: "RAG and Retrieval System Development", description: "Build permission-aware knowledge pipelines, retrieval and ranking, grounded answer experiences, citations, refresh workflows, and evaluations." },
    status: "approved",
  },
  {
    slug: "computer-vision",
    practiceSlug: "ai-engineering",
    title: "Computer Vision",
    shortTitle: "Computer Vision",
    deliveryMode: "build",
    headline: "Turn visual inputs into decisions your software can use.",
    lede: "Convert images, video, scans, or physical-world observations into structured information and reviewable actions.",
    buyerProblem: "Images, video, scans, or physical processes contain information that staff must inspect, classify, transcribe, or measure by hand. The organization needs a consistent path from visual evidence to structured data and reviewable action.",
    capabilities: [
      { title: "Document and image understanding", body: "Extract, classify, and validate information from forms, photographs, scans, and other visual records." },
      { title: "Video and physical-world analysis", body: "Detect, track, count, inspect, or identify changes across live and recorded imagery." },
      { title: "Domain model deployment", body: "Select or adapt a model for the operating environment, including latency, device, review, and accuracy constraints." },
    ],
    deliverables: ["Annotated dataset and evaluation protocol", "Vision pipeline integrated with the target workflow", "Review interface and model-performance report"],
    rightFit: "Useful when visual review is frequent, structured, and supported by enough representative examples to define acceptable performance.",
    simplerAlternative: "Use established OCR, barcode, or rules-based image tooling when the input is standardized and the required extraction is narrow.",
    relatedOfferingSlugs: ["model-training-fine-tuning", "hardware-iot-systems", "agent-evaluation-harnesses"],
    seo: { title: "Computer Vision Engineering Services", description: "Design and build image, document, and video understanding systems with domain evaluation, review interfaces, and workflow integration." },
    status: "approved",
  },
  {
    slug: "voice-ai",
    practiceSlug: "ai-engineering",
    title: "Voice AI",
    shortTitle: "Voice AI",
    deliveryMode: "build",
    headline: "Build voice interactions that respect the pace of a real conversation.",
    lede: "Connect natural speech, clear turn-taking, and approved business actions in environments where typing gets in the way.",
    buyerProblem: "Calls, field work, intake, or accessibility needs make typing impractical, but slow responses and awkward turn-taking quickly undermine a voice experience. The product needs a clear conversation flow tied to reliable business actions.",
    capabilities: [
      { title: "Speech capture and understanding", body: "Convert speech into structured transcripts, intents, summaries, or workflow inputs." },
      { title: "Conversational voice experiences", body: "Design turn-taking, interruption handling, confirmations, and responses for the intended setting." },
      { title: "Workflow connection and review", body: "Link conversations to approved data and actions, with escalation and traceability where review matters." },
    ],
    deliverables: ["Conversation design and latency budget", "Working voice interface or agent integration", "Test corpus with quality and handoff criteria"],
    rightFit: "Best for tasks where speaking is meaningfully faster, more accessible, or better suited to the user environment than a screen.",
    simplerAlternative: "Use text chat, forms, or basic transcription when the workflow does not require a live spoken exchange.",
    relatedOfferingSlugs: ["agentic-systems", "rag-retrieval-systems", "ai-integration"],
    seo: { title: "Voice AI Development Services", description: "Build speech understanding, conversational voice interfaces, agent integrations, workflow actions, handoffs, and representative voice tests." },
    status: "approved",
  },
  {
    slug: "mcp-server-development",
    practiceSlug: "ai-engineering",
    title: "MCP Server Development",
    shortTitle: "MCP Servers",
    deliveryMode: "build",
    headline: "Give AI a well-defined way to use your tools and data.",
    lede: "Create a reusable protocol layer that helps approved AI clients discover and use business capabilities safely and consistently.",
    buyerProblem: "Assistants and agents need access to business systems, but one-off connectors create inconsistent permissions, unclear tool behavior, and brittle maintenance. Product teams may also need a standard way for external AI clients to work with their platform.",
    capabilities: [
      { title: "MCP interface design", body: "Model useful resources, prompts, and tools around real user tasks rather than exposing raw backend operations." },
      { title: "Server implementation", body: "Build the protocol layer, adapters, validation, authentication hooks, and errors needed by supported clients." },
      { title: "Tool quality and testing", body: "Exercise schemas, permissions, failure cases, and representative agent calls before release." },
    ],
    deliverables: ["MCP server with documented tools and resources", "Integration and client examples", "Permission model and conformance test suite"],
    rightFit: "Valuable when several AI clients need a reusable interface to the same systems, or when a platform wants to support agent workflows.",
    simplerAlternative: "Use an existing API integration or a single purpose-built function when only one controlled workflow needs access.",
    relatedOfferingSlugs: ["backend-apis", "agentic-systems", "agent-evaluation-harnesses"],
    seo: { title: "MCP Server Development Services", description: "Design, build, and test Model Context Protocol servers with useful tools, resources, permissions, adapters, documentation, and client examples." },
    status: "approved",
  },
  {
    slug: "ai-integration",
    practiceSlug: "ai-engineering",
    title: "AI Integration",
    shortTitle: "AI Integration",
    deliveryMode: "build",
    headline: "Add AI to the workflow you already rely on.",
    lede: "Place a bounded AI capability inside an existing product or process without rebuilding the system around it.",
    buyerProblem: "An existing product or operating process works, but specific steps remain slow, repetitive, or difficult to search. A full rebuild would add risk, and the team needs AI to fit the current identity, permissions, interface, and data flows.",
    capabilities: [
      { title: "Workflow insertion design", body: "Identify where AI can remove friction and define what happens when confidence is low." },
      { title: "Application integration", body: "Add generation, classification, extraction, search, or assistance inside the tools people already use." },
      { title: "Production controls", body: "Manage latency, cost, permissions, fallbacks, feedback, and measurement as part of the existing system." },
    ],
    deliverables: ["Integration design with baseline workflow measure", "Deployed AI feature in the existing application", "Operating dashboard and iteration backlog"],
    rightFit: "Well suited to a bounded workflow with a clear before-and-after outcome inside an established product or process.",
    simplerAlternative: "Improve the current interface, rules, or automation first when AI adds little beyond conventional software.",
    relatedOfferingSlugs: ["workflow-process-automation", "rag-retrieval-systems", "ai-enablement-operations"],
    seo: { title: "AI Integration Services", description: "Add generation, extraction, classification, retrieval, or assistance to an existing product with permissions, fallbacks, measurement, and cost control." },
    status: "approved",
  },
  {
    slug: "ai-strategy-proof-of-concept",
    practiceSlug: "ai-engineering",
    title: "AI Strategy & Proof-of-Concept",
    shortTitle: "AI Strategy & PoC",
    deliveryMode: "assess",
    headline: "Test the AI decision before committing to the full build.",
    lede: "Turn a broad AI ambition into one bounded proof with explicit evidence, stop criteria, and a credible production path.",
    buyerProblem: "Leaders see several possible AI opportunities but lack evidence about business value, data readiness, technical feasibility, and operating risk. They need a narrow way to choose a direction and learn before funding a production program.",
    capabilities: [
      { title: "Opportunity mapping", body: "Connect business friction and available data to a short list of testable AI opportunities." },
      { title: "Feasibility framing", body: "Define the smallest proof, target users, input constraints, evaluation criteria, and path to production." },
      { title: "Focused prototype", body: "Build and evaluate one bounded proof so the next decision is based on observed results." },
    ],
    deliverables: ["Prioritized opportunity map", "Proof plan with success and stop criteria", "Working prototype and recommendation memo"],
    rightFit: "Useful when the problem or investment case is uncertain and a focused experiment can resolve the most important unknowns.",
    simplerAlternative: "Run a discovery workshop and technical spike without an interactive prototype when the first unknown is data or system access.",
    relatedOfferingSlugs: ["model-training-fine-tuning", "ai-integration", "ai-enablement-operations"],
    seo: { title: "AI Strategy and Proof-of-Concept", description: "Prioritize AI opportunities, assess feasibility, define evidence and stop criteria, and build a focused proof before funding a production program." },
    status: "approved",
  },
  {
    slug: "web",
    practiceSlug: "product-engineering",
    title: "Web",
    shortTitle: "Web",
    deliveryMode: "build",
    headline: "Build the browser-based product people can use without friction.",
    lede: "Create a durable web application around the work users need to complete, not just a new visual layer.",
    buyerProblem: "A customer portal, internal platform, dashboard, or SaaS product has become slow to change, difficult to navigate, or too limited for the work it now supports. The organization needs a dependable application that can evolve with the business.",
    capabilities: [
      { title: "Application architecture", body: "Structure routes, data flows, permissions, and interface states around the product's real jobs." },
      { title: "Accessible interface development", body: "Build responsive interactions that work across input methods, screen sizes, and common assistive technology." },
      { title: "Performance and release engineering", body: "Manage rendering, data loading, observability, and deployment so the application remains practical to operate." },
    ],
    deliverables: ["Production web application", "Reusable interface system and application structure", "Deployment, monitoring, and handoff package"],
    rightFit: "Appropriate for software that users return to in a browser to complete meaningful work, manage information, or access a service.",
    simplerAlternative: "Use a focused marketing site or an established hosted platform when the need is primarily publishing and lead capture.",
    relatedOfferingSlugs: ["product-design", "backend-apis", "qa-testing"],
    seo: { title: "Custom Web Application Development", description: "Design and build accessible, responsive web applications with clear architecture, dependable data flows, production delivery, and maintainable interfaces." },
    status: "approved",
  },
  {
    slug: "mobile",
    practiceSlug: "product-engineering",
    title: "Mobile",
    shortTitle: "Mobile",
    deliveryMode: "build",
    headline: "Put the product where the work and the user already are.",
    lede: "Build a mobile product around field context, device behavior, connectivity, and the moments a browser cannot serve well.",
    buyerProblem: "A browser experience cannot fully support field conditions, device features, notifications, intermittent connectivity, or frequent on-the-go use. The business needs a mobile product that feels considered on the devices its audience carries.",
    capabilities: [
      { title: "Mobile product architecture", body: "Define platform behavior, navigation, local state, connectivity, and integration with the broader product." },
      { title: "Device-aware experiences", body: "Use notifications, camera, location, biometrics, offline storage, and native capabilities where they serve the workflow." },
      { title: "Release lifecycle", body: "Prepare testing, store submissions, signing, versioning, and an update process for supported platforms." },
    ],
    deliverables: ["iOS and Android application builds", "Device and offline behavior specification", "Store-release and maintenance runbook"],
    rightFit: "Strong when mobile context or device capability is central to the task, audience, or service experience.",
    simplerAlternative: "Use a responsive web application when users have reliable browser access and do not need native device behavior.",
    relatedOfferingSlugs: ["product-design", "backend-apis", "qa-testing"],
    seo: { title: "Mobile Application Development Services", description: "Build iOS and Android products with device-aware workflows, offline behavior, backend integration, testing, store release, and maintainable updates." },
    status: "approved",
  },
  {
    slug: "backend-apis",
    practiceSlug: "product-engineering",
    title: "Backend & APIs",
    shortTitle: "Backend & APIs",
    deliveryMode: "build",
    headline: "Build the dependable engine behind the product and its connections.",
    lede: "Give products, partners, and internal systems clear access to business logic and reliable shared data.",
    buyerProblem: "Critical business logic is fragmented, data access is inconsistent, or systems cannot exchange information cleanly. These gaps slow product changes and make every new integration harder than the last.",
    capabilities: [
      { title: "Service and data design", body: "Model business rules, persistence, permissions, and boundaries that can evolve with the product." },
      { title: "API development", body: "Create documented interfaces for web, mobile, partners, internal systems, and approved third-party use." },
      { title: "System integration", body: "Connect external tools and legacy services with explicit contracts, reconciliation, and failure handling." },
    ],
    deliverables: ["Deployed backend services and data model", "Versioned API specification with examples", "Integration maps, alerts, and support documentation"],
    rightFit: "Needed when a product has meaningful business logic, several consumers, or systems that must share reliable data.",
    simplerAlternative: "Use a managed backend or direct platform integration for a small product with standard data and permission needs.",
    relatedOfferingSlugs: ["cloud-devops", "mcp-server-development", "build-or-buy-integration"],
    seo: { title: "Backend and API Development Services", description: "Build backend services, data models, documented APIs, system integrations, failure handling, and operational visibility for dependable products." },
    status: "approved",
  },
  {
    slug: "cloud-devops",
    practiceSlug: "product-engineering",
    title: "Cloud & DevOps",
    shortTitle: "Cloud & DevOps",
    deliveryMode: "build",
    headline: "Make releases repeatable and production behavior visible.",
    lede: "Create an operating foundation that makes deployments, diagnosis, rollback, access, and cost easier to own.",
    buyerProblem: "Deployments depend on manual steps, environments drift, outages are hard to diagnose, or cloud spending has no clear owner. Product teams need an operating foundation that matches the system's real scale and risk.",
    capabilities: [
      { title: "Environment architecture", body: "Define hosting, networking, secrets, data services, and access around the product's requirements." },
      { title: "Delivery automation", body: "Create repeatable build, test, migration, deployment, and rollback workflows across environments." },
      { title: "Observability and cost control", body: "Instrument health, logs, metrics, alerts, capacity, and spend so operators can respond with context." },
    ],
    deliverables: ["Infrastructure configuration and environment map", "Automated delivery pipeline with rollback procedure", "Operational dashboard, alerts, and cost baseline"],
    rightFit: "Useful when software is business-critical, changes frequently, or has outgrown informal deployment and monitoring practices.",
    simplerAlternative: "Keep a well-configured managed deployment platform when traffic and operational needs remain straightforward.",
    relatedOfferingSlugs: ["backend-apis", "qa-testing", "legacy-modernization"],
    seo: { title: "Cloud and DevOps Engineering Services", description: "Design cloud environments, automate delivery and rollback, manage secrets and access, and add health, logs, metrics, alerts, and cost visibility." },
    status: "approved",
  },
  {
    slug: "qa-testing",
    practiceSlug: "product-engineering",
    title: "QA & Testing",
    shortTitle: "QA & Testing",
    deliveryMode: "build",
    headline: "Make release confidence part of the product, not a final checkpoint.",
    lede: "Connect software risk to an intentional mix of automated coverage, exploratory testing, and release standards.",
    buyerProblem: "Regressions appear after routine updates, important journeys are tested inconsistently, or the team cannot tell which failures should block a release. Quality needs to reflect the risks users and operators face.",
    capabilities: [
      { title: "Risk-based test strategy", body: "Map critical journeys, integrations, devices, and failure impact to an appropriate test plan." },
      { title: "Automated coverage", body: "Build unit, integration, contract, and end-to-end tests for behavior that must remain stable." },
      { title: "Release and exploratory testing", body: "Combine automation with human investigation of usability, edge cases, and real operating conditions." },
    ],
    deliverables: ["Test strategy and risk matrix", "Automated test suite integrated with delivery", "Release checklist and defect reporting standard"],
    rightFit: "Appropriate when a product supports repeated releases, several integrations, sensitive work, or a large range of user conditions.",
    simplerAlternative: "Use a lean smoke-test checklist for a short-lived prototype with no production dependency.",
    relatedOfferingSlugs: ["web", "mobile", "cloud-devops"],
    seo: { title: "Software QA and Testing Services", description: "Create risk-based test strategy, automated unit and end-to-end coverage, exploratory testing, release criteria, and actionable defect reporting." },
    status: "approved",
  },
  {
    slug: "product-design",
    practiceSlug: "product-engineering",
    title: "UI/UX & Product Design",
    shortTitle: "Product Design",
    deliveryMode: "assess",
    headline: "Shape a product people can understand, trust, and use.",
    lede: "Resolve the product structure, user journey, interface system, and risky assumptions before or alongside engineering.",
    buyerProblem: "The team has business goals and feature ideas, but the intended user journey is unclear or the current experience creates avoidable friction. Visual changes alone will not resolve a product whose structure and decisions need work.",
    capabilities: [
      { title: "Product framing", body: "Clarify users, jobs, constraints, priorities, and the smallest coherent release before committing to screens." },
      { title: "Experience and interface design", body: "Develop flows, information architecture, interaction states, responsive layouts, and a credible visual system." },
      { title: "Validation and build support", body: "Test important assumptions and stay involved through implementation so decisions survive the real product." },
    ],
    deliverables: ["Product brief and prioritized journey map", "Interactive prototype and interface specification", "Validation findings and build-ready acceptance notes"],
    rightFit: "Valuable when product direction, usability, workflow structure, or design consistency needs to be resolved before or alongside engineering.",
    simplerAlternative: "Use a focused usability review and targeted interface changes when the product model and core journeys are already sound.",
    relatedOfferingSlugs: ["web", "mobile", "qa-testing"],
    seo: { title: "UI UX and Product Design Services", description: "Frame product decisions, map user journeys, design responsive interfaces, build prototypes, validate assumptions, and support engineering delivery." },
    status: "approved",
  },
  {
    slug: "legacy-modernization",
    practiceSlug: "digital-transformation",
    title: "Legacy Modernization",
    shortTitle: "Legacy Modernization",
    deliveryMode: "transform",
    headline: "Improve the systems the business depends on without betting everything on one cutover.",
    lede: "Move an essential aging system forward in controlled stages while preserving the behavior the business still needs.",
    buyerProblem: "An aging application is expensive to maintain, difficult to change, poorly connected, or dependent on unsupported technology. A large rewrite could interrupt operations, but continued delay increases cost and limits new work.",
    capabilities: [
      { title: "System assessment", body: "Map dependencies, business-critical behavior, data, operating risks, and the parts that still serve the organization well." },
      { title: "Incremental modernization", body: "Replace or isolate components in controlled stages with compatibility and rollback built into the transition." },
      { title: "Data and integration transition", body: "Move data and connected systems with reconciliation, parallel checks, and clear ownership at each cutover." },
    ],
    deliverables: ["Current-state and dependency map", "Sequenced modernization roadmap", "First production slice with cutover runbook"],
    rightFit: "Appropriate when a system remains essential but creates measurable delivery, operating, integration, or support constraints.",
    simplerAlternative: "Upgrade a targeted dependency, interface, or integration when the core system remains fit for purpose.",
    relatedOfferingSlugs: ["build-or-buy-integration", "backend-apis", "data-infrastructure-analytics"],
    seo: { title: "Legacy System Modernization Services", description: "Assess and modernize essential software in controlled stages with dependency mapping, compatibility, data reconciliation, rollback, and cutover planning." },
    status: "approved",
  },
  {
    slug: "workflow-process-automation",
    practiceSlug: "digital-transformation",
    title: "Workflow & Process Automation",
    shortTitle: "Workflow Automation",
    deliveryMode: "transform",
    headline: "Remove repetitive handoffs while keeping people in control of the decisions that need them.",
    lede: "Simplify a recurring process first, then automate the movement, approvals, exceptions, and outputs that remain.",
    buyerProblem: "Staff repeatedly re-enter information, chase approvals, reconcile systems, or rebuild the same reports. The delay and errors come from the process itself, so automating it without first understanding the flow could preserve the wrong work.",
    capabilities: [
      { title: "Process mapping and simplification", body: "Trace the current workflow, identify avoidable steps, and agree on the exception path before automating it." },
      { title: "Deterministic automation", body: "Connect systems, move data, route approvals, trigger notifications, and produce recurring outputs through explicit rules." },
      { title: "Operational controls", body: "Add queues, human review, reconciliation, alerts, and recovery for cases outside the common path." },
    ],
    deliverables: ["Current and target workflow maps", "Implemented automation with system connectors", "Exception runbook and outcome baseline"],
    rightFit: "Best for frequent, rules-based work whose inputs, decisions, and exceptions can be explained clearly.",
    simplerAlternative: "Redesign the process, adjust responsibilities, or configure an existing tool before building new automation.",
    relatedOfferingSlugs: ["ai-enablement-operations", "ai-integration", "build-or-buy-integration"],
    seo: { title: "Workflow and Process Automation Services", description: "Map, simplify, and automate recurring work across systems with explicit rules, approvals, exception handling, reconciliation, and measurable outcomes." },
    status: "approved",
  },
  {
    slug: "build-or-buy-integration",
    practiceSlug: "digital-transformation",
    title: "Build-or-Buy Integration",
    shortTitle: "Build-or-Buy",
    deliveryMode: "assess",
    headline: "Choose the software that fits, then make it work with the business around it.",
    lede: "Compare products, configuration, integration, custom scope, operating effort, and ownership before making a durable software decision.",
    buyerProblem: "The organization needs a new capability but cannot judge whether an existing platform, a configured combination of tools, or custom software will produce the best long-term result. The decision must account for workflow fit, integration effort, ownership, and switching cost.",
    capabilities: [
      { title: "Requirements and market assessment", body: "Turn business needs into decision criteria and examine credible product options against them." },
      { title: "Architecture and cost comparison", body: "Compare configuration, integration, data portability, operating effort, and custom scope over the useful life." },
      { title: "Implementation and integration", body: "Configure the selected platform, connect existing systems, or build the missing capability when needed." },
    ],
    deliverables: ["Build-or-buy decision brief", "Implementation architecture and transition plan", "Integrated solution or custom-build specification"],
    rightFit: "Useful when a meaningful software investment is pending and the choice will shape operations, data, and ownership for years.",
    simplerAlternative: "Adopt a standard product with minimal configuration when the workflow is common and integration needs are limited.",
    relatedOfferingSlugs: ["legacy-modernization", "backend-apis", "workflow-process-automation"],
    seo: { title: "Build-or-Buy Software Assessment and Integration", description: "Compare software products, configuration, integrations, ownership, and custom scope, then implement the selected platform or missing capability." },
    status: "approved",
  },
  {
    slug: "hardware-iot-systems",
    practiceSlug: "digital-transformation",
    title: "Hardware, IoT & Systems Setup",
    shortTitle: "Hardware & IoT",
    deliveryMode: "build",
    headline: "Connect physical operations to the software and data around them.",
    lede: "Bring devices, sensors, terminals, and on-site equipment into a supportable system with useful business connections.",
    buyerProblem: "Terminals, sensors, scanners, devices, or on-site equipment operate apart from the business systems that need their data. Teams face manual transfer, limited visibility, or inconsistent setup across locations.",
    capabilities: [
      { title: "Physical system design", body: "Define device, connectivity, power, environment, installation, and support requirements around the operating setting." },
      { title: "Device and software integration", body: "Connect hardware data and controls to backend services, business tools, and operator interfaces." },
      { title: "Deployment and fleet operation", body: "Establish provisioning, configuration, health reporting, updates, and replacement procedures for supported devices." },
    ],
    deliverables: ["Hardware and connectivity architecture", "Working installation or representative pilot", "Provisioning, monitoring, and field-support runbook"],
    rightFit: "Appropriate when a business process depends on collecting data or initiating actions at a physical location.",
    simplerAlternative: "Use a proven standalone device or manual capture process when connectivity adds little operational value.",
    relatedOfferingSlugs: ["backend-apis", "data-infrastructure-analytics", "computer-vision"],
    seo: { title: "Hardware IoT and Systems Integration", description: "Design and connect devices, sensors, scanners, terminals, backend services, and operator interfaces with provisioning, monitoring, and field support." },
    status: "approved",
  },
  {
    slug: "data-infrastructure-analytics",
    practiceSlug: "digital-transformation",
    title: "Data Infrastructure & Analytics",
    shortTitle: "Data & Analytics",
    deliveryMode: "transform",
    headline: "Turn scattered operational data into a shared basis for decisions.",
    lede: "Create dependable definitions, movement, models, and decision-focused reporting before adding another layer of charts.",
    buyerProblem: "Important numbers live in separate systems and spreadsheets, reports disagree, and teams spend time assembling a view that is stale by the time it arrives. The organization needs dependable definitions and movement before it needs more charts.",
    capabilities: [
      { title: "Source and metric design", body: "Inventory data owners, quality issues, access rules, and the definitions behind the decisions people make." },
      { title: "Data pipelines and models", body: "Collect, clean, reconcile, and organize selected sources into a dependable analytical layer." },
      { title: "Decision-focused analytics", body: "Build dashboards, reports, and alerts around concrete operating questions and suitable update frequency." },
    ],
    deliverables: ["Data-source and metric catalog", "Tested pipelines and analytical models", "Reporting suite with quality monitoring"],
    rightFit: "Useful when repeated decisions depend on information assembled manually or when teams disagree because sources and definitions differ.",
    simplerAlternative: "Standardize one report and its source data before introducing a broader data platform.",
    relatedOfferingSlugs: ["rag-retrieval-systems", "ai-enablement-operations", "legacy-modernization"],
    seo: { title: "Data Infrastructure and Analytics Services", description: "Define metrics, connect and reconcile source data, build tested pipelines and analytical models, and deliver decision-focused reports and alerts." },
    status: "approved",
  },
  {
    slug: "ai-enablement-operations",
    practiceSlug: "digital-transformation",
    title: "AI Enablement for Operations",
    shortTitle: "AI Enablement",
    deliveryMode: "assess",
    headline: "Find the operational decisions and tasks where AI can earn a role.",
    lede: "Select and prove one useful operational use case, then define the ownership, adoption, measurement, and path to scale.",
    buyerProblem: "Leadership expects AI to improve operations, but teams lack a shared view of viable use cases, data constraints, human oversight, and adoption. A list of tools will not resolve how the work should change.",
    capabilities: [
      { title: "Operational opportunity assessment", body: "Examine workflows, decisions, data, and pain points to identify bounded uses with an observable outcome." },
      { title: "Pilot and workflow adoption", body: "Introduce one use inside existing tools, define human review, and gather structured feedback from the people doing the work." },
      { title: "Scale and governance plan", body: "Establish ownership, data boundaries, measurement, training, and the technical path for successful pilots." },
    ],
    deliverables: ["Prioritized operational use-case map", "Working pilot embedded in one workflow", "Adoption, measurement, and scale recommendation"],
    rightFit: "Appropriate when an established business wants practical AI in day-to-day operations but has not yet selected the first use case.",
    simplerAlternative: "Improve the process, data access, or conventional automation first when those constraints account for most of the friction.",
    relatedOfferingSlugs: ["workflow-process-automation", "data-infrastructure-analytics", "ai-strategy-proof-of-concept"],
    seo: { title: "AI Enablement for Business Operations", description: "Identify practical AI use cases in operations, embed one measured pilot, define human review and ownership, and plan adoption and scale." },
    status: "approved",
  },
]

function ensureUnique(values: string[], label: string) {
  const normalized = values.map((value) => value.trim().toLowerCase())
  if (new Set(normalized).size !== normalized.length) {
    throw new Error(`Duplicate ${label} detected in the service registry`)
  }
}

export const practices = practiceContentSchema.array().length(3).parse(rawPractices)
export const offerings = offeringContentSchema.array().length(21).parse(rawOfferings)

ensureUnique(practices.map((practice) => practice.slug), "practice slug")
ensureUnique(practices.map((practice) => practice.title), "practice title")
ensureUnique(practices.map((practice) => practice.seo.title), "practice SEO title")
ensureUnique(practices.map((practice) => practice.seo.description), "practice SEO description")
ensureUnique(offerings.map((offering) => offering.slug), "offering slug")
ensureUnique(offerings.map((offering) => offering.title), "offering title")
ensureUnique(offerings.map((offering) => offering.seo.title), "offering SEO title")
ensureUnique(offerings.map((offering) => offering.seo.description), "offering SEO description")

const offeringIndex = new Map(offerings.map((offering) => [offering.slug, offering]))
const practiceIndex = new Map(practices.map((practice) => [practice.slug, practice]))

for (const practice of practices) {
  const ownedOfferings = offerings.filter((offering) => offering.practiceSlug === practice.slug).map((offering) => offering.slug)
  if (ownedOfferings.length !== practice.offeringSlugs.length || practice.offeringSlugs.some((slug) => !ownedOfferings.includes(slug))) {
    throw new Error(`Offering ownership mismatch for ${practice.slug}`)
  }

  const groupedOfferings = practice.relationshipGroups.flatMap((group) => group.offeringSlugs)
  if (
    groupedOfferings.length !== practice.offeringSlugs.length ||
    new Set(groupedOfferings).size !== groupedOfferings.length ||
    groupedOfferings.some((slug) => !ownedOfferings.includes(slug))
  ) {
    throw new Error(`Relationship grouping mismatch for ${practice.slug}`)
  }
}

for (const offering of offerings) {
  for (const relatedSlug of offering.relatedOfferingSlugs) {
    if (!offeringIndex.has(relatedSlug) || relatedSlug === offering.slug) {
      throw new Error(`Invalid related offering ${relatedSlug} on ${offering.slug}`)
    }
  }
}

assertPublicCopy(practices, "practices")
assertPublicCopy(offerings, "offerings")

export const practiceSlugs = practices.map((practice) => practice.slug)

export function getPractice(slug: string) {
  return practiceIndex.get(slug as PracticeSlug)
}

export function getOffering(practiceSlug: string, offeringSlug: string) {
  const offering = offeringIndex.get(offeringSlug)
  return offering?.practiceSlug === practiceSlug ? offering : undefined
}

export function getOfferingBySlug(slug: string) {
  return offeringIndex.get(slug)
}

export function getOfferingsForPractice(practiceSlug: string) {
  return offerings.filter((offering) => offering.practiceSlug === practiceSlug)
}

export const publicOfferingOptions = practices.map((practice) => ({
  practiceSlug: practice.slug,
  practiceTitle: practice.title,
  offerings: practice.offeringSlugs.map((slug) => {
    const offering = offeringIndex.get(slug)
    if (!offering) throw new Error(`Missing offering ${slug}`)
    return { slug: offering.slug, title: offering.title, shortTitle: offering.shortTitle }
  }),
}))

export type { DeliveryMode, OfferingContent, PracticeContent, PracticeSlug } from "./schema"
