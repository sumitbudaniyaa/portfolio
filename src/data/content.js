export const profile = {
  name: "Sumit Kumar",
  title: "Software & AI Engineer",
  roles: ["Software & AI Engineer", "Founder"],
  tagline: "software & ai engineer.",
  company: {
    name: "twentyeleven.studio",
    role: "Founder",
    href: "https://twentyeleven.studio",
    logo: "/20eleven_logo.png",
  },
  photo: "/sumitpix.jpg",
  email: "sumit.k.budaniya@gmail.com",
  linkedin: "https://www.linkedin.com/in/sumsss/",
  github: "https://github.com/sumitbudaniyaa",
  twitter: "https://x.com/",
  resume:
    "https://drive.google.com/file/d/1avG5JXDnkUPqEMSFzo_RuJlyqMXb-aoq/view?usp=sharing",
  location: "Bengaluru, India",
  timezone: "IST",
  status: "Shipping high-leverage products & AI systems",
  aboutParagraphs: [
    {
      text: "Passionate about building products end-to-end — with an obsessive focus on real users, real workflows, and real-world performance.",
      sticker: "spark",
    },
    {
      text: "Currently founding twentyeleven.studio and engineering at Slydr (Paddy Digital) in Bengaluru, straight out of studying Computer Science & Engineering (Data Science) at Manipal University Jaipur.",
      sticker: "building",
    },
    {
      text: "I approach problems with a product-first and entrepreneurial mindset: observing inefficiencies in retail and workflows, validating whether an architectural or ML solution delivers actual leverage, and engineering until the complicated feels effortless.",
      sticker: "cat",
    },
    {
      text: "From designing multi-tenant SaaS engines and high-throughput RAG retrieval pipelines to publishing automated replenishment patents and competing in the Smart India Hackathon finals — I care about ownership, clean abstractions, and craft.",
      sticker: "trophy",
    },
  ],
};

export const experienceCards = [
  {
    id: "slydr",
    brand: "Slydr",
    fullName: "Slydr — Paddy Digital Pvt. Ltd.",
    role: "Software Development Engineer — Intern",
    period: "Nov 2025 — Jul 2026",
    location: "Hybrid, Bengaluru",
    logo: "/slydr.svg",
    accentColor: "#229dff",
    screenshot: "/slydr-screenshot.png",
    slides: [
      {
        id: "slydr-privacy",
        title: "Double-Blind Gifting Engine",
        caption: "Double-Blind Privacy Engine",
        subtitle: "Zero address exposure between senders and recipients",
        metrics: [
          { label: "Encryption", value: "AES-256-GCM" },
          { label: "Isolation", value: "Supabase RLS" },
          { label: "Stack", value: "Next.js 16" },
        ],
        description:
          "Architected double-blind gift redemption workflows where senders buy gifts and recipients claim them via cryptographically signed links — neither party ever sees the other's address.",
        tags: ["Next.js 16", "Supabase", "AES-256", "PostgreSQL"],
      },
      {
        id: "slydr-auth",
        title: "Sub-1.5s Passwordless OTP Pipeline",
        caption: "Passwordless Auth Pipeline",
        subtitle: "High-speed SMS/Email verification with edge caching",
        metrics: [
          { label: "Delivery Time", value: "< 1.5s" },
          { label: "Auth Type", value: "Passwordless" },
          { label: "Catalog", value: "ISR Caching" },
        ],
        description:
          "Engineered passwordless authentication delivering OTPs in under 1.5 seconds, paired with an Incremental Static Regeneration (ISR) catalog with instant client-side search.",
        tags: ["Next.js", "Redis", "Fast Delivery", "Edge Ops"],
      },
      {
        id: "slydr-payments",
        title: "Idempotent Payment & Webhook State",
        caption: "Idempotent Payment Webhooks",
        subtitle: "Razorpay transaction safety and automated state recovery",
        metrics: [
          { label: "Safety", value: "HMAC Webhooks" },
          { label: "Guarantees", value: "Idempotent" },
          { label: "CI/CD", value: "Blue-Green" },
        ],
        description:
          "Built zero-loss payment settlement flows with HMAC verification, automated reconciliation webhooks, a role-based admin dashboard with live ops metrics, and blue-green deployments on VPS.",
        tags: ["Razorpay", "HMAC", "Ops Dashboard", "CI/CD"],
      },
    ],
  },
  {
    id: "muj",
    brand: "Manipal University Jaipur",
    fullName: "Manipal University Jaipur",
    role: "B.Tech Computer Science & Engineering (Data Science) · CGPA 8.23",
    period: "2023 — 2027",
    location: "Jaipur, India",
    logo: "/muj.jpeg",
    accentColor: "#ef4444",
    projects: [
      {
        title: "Published patent on automated replenishment",
        desc: "A System and Method for Demand-Driven Automated Supplier Replenishment in Fragmented B2B Retail",
        year: "2025",
        icon: "file-text",
      },
      {
        title: "Dean's List for Academic Excellence",
        desc: "Awarded top honor for exceptional academic performance in Computer Science (Data Science)",
        year: "2025",
        icon: "award",
      },
    ],
  },
];

export const sideProjects = [
  {
    id: "fluke",
    title: "Fluke",
    kicker: "Retail Self-Checkout SaaS",
    desc: "Multi-tenant 5-app self-checkout platform with 3-tier JWT auth, per-store JSONB RBAC, and Razorpay order/payout lifecycle settlement.",
    link: "https://github.com/sumitbudaniyaa/fluke",
    tags: ["React", "Node", "PostgreSQL", "Drizzle ORM", "Razorpay"],
    status: "Production Ready",
  },
  {
    id: "codebase",
    title: "Codebase Assistant",
    kicker: "RAG Documentation & Code QA Platform",
    desc: "Full-stack RAG pipeline ingesting GitHub repositories using Gemini 2.5 Flash with token-window splitting and text-embedding-004 → ChromaDB top-5 retrieval (50K → 3K tokens).",
    link: "https://github.com/sumitbudaniyaa/codebase",
    tags: ["FastAPI", "Python", "ChromaDB", "Gemini 2.5", "React", "MongoDB"],
    status: "Active Lab",
  },
  {
    id: "cifar",
    title: "CIFAR-10 Recognition",
    kicker: "Computer Vision & Deep Learning",
    desc: "End-to-end deep learning benchmark pipeline classifying 50,000 RGB images across 10 distinct classes with augmentations and baseline validation.",
    link: "https://colab.research.google.com/drive/1XrsjerXYzDc8xTiVEcJNKivUBisf63Cm?usp=sharing",
    tags: ["TensorFlow", "Keras", "Python", "NumPy"],
    status: "Published Notebook",
  },
  {
    id: "feedu",
    title: "Feedu",
    kicker: "Multi-Tenant Restaurant OS",
    desc: "Turborepo monorepo with Brand → Branch tenancy, typed Zod contracts across frontend/backend, silent JWT refresh, and real-time Socket.IO order queues.",
    link: "https://github.com/sumitbudaniyaa/feedu",
    tags: ["Turborepo", "TypeScript", "Socket.IO", "Zustand", "Express"],
    status: "Beta Testing",
  },
];

export const marketSectors = {
  AI: {
    symbol: "AI/ML",
    title: "Artificial Intelligence & Retrieval",
    index: "842.4",
    change: "+34.6%",
    isPositive: true,
    timeframes: ["1D", "1W", "1M", "ALL"],
    chartPoints: [420, 480, 510, 490, 560, 620, 680, 710, 780, 842.4],
    holdings: [
      { name: "RAG & Vector Retrieval (ChromaDB / Gemini)", allocation: "36%" },
      { name: "Deep Learning (PyTorch, TensorFlow, CNNs)", allocation: "28%" },
      { name: "LLM Agent Orchestration & Token Optimization", allocation: "22%" },
      { name: "Scikit-learn & Statistical Modeling", allocation: "14%" },
    ],
  },
  ENG: {
    symbol: "ENG",
    title: "Distributed Systems & Full-Stack",
    index: "788.1",
    change: "+28.2%",
    isPositive: true,
    timeframes: ["1D", "1W", "1M", "ALL"],
    chartPoints: [380, 410, 470, 530, 590, 610, 670, 720, 750, 788.1],
    holdings: [
      { name: "Next.js 16, React & TypeScript", allocation: "32%" },
      { name: "PostgreSQL, Supabase RLS & Drizzle ORM", allocation: "26%" },
      { name: "Node.js, Express & Real-time WebSockets", allocation: "24%" },
      { name: "Turborepo & Micro-Frontends", allocation: "18%" },
    ],
  },
  PROD: {
    symbol: "PROD",
    title: "Product Architecture & SaaS Mechanics",
    index: "695.5",
    change: "+21.4%",
    isPositive: true,
    timeframes: ["1D", "1W", "1M", "ALL"],
    chartPoints: [310, 360, 420, 450, 510, 560, 600, 630, 670, 695.5],
    holdings: [
      { name: "Multi-Tenant Brand/Branch RBAC", allocation: "34%" },
      { name: "Idempotent Payment Settlement (Razorpay)", allocation: "26%" },
      { name: "Demand-Driven Supply Optimization (Patent)", allocation: "22%" },
      { name: "Sub-1.5s Auth Delivery & UX Craft", allocation: "18%" },
    ],
  },
};

export const toolkit = [
  {
    category: "Languages",
    items: ["Python", "C/C++", "JavaScript", "TypeScript", "SQL", "HTML/CSS"],
  },
  {
    category: "Frameworks & Libraries",
    items: [
      "React",
      "Next.js 16",
      "Node.js",
      "Express.js",
      "FastAPI",
      "Tailwind CSS",
      "Socket.IO",
      "Zustand",
    ],
  },
  {
    category: "Databases & Storage",
    items: ["PostgreSQL", "Supabase", "MongoDB", "ChromaDB (Vector)", "Drizzle ORM"],
  },
  {
    category: "ML & Data Science",
    items: [
      "PyTorch",
      "TensorFlow",
      "Keras",
      "scikit-learn",
      "NumPy",
      "Pandas",
      "Gemini Flash 2.5",
    ],
  },
  {
    category: "Infrastructure & Tools",
    items: [
      "Git",
      "Docker",
      "Linux VPS",
      "Turborepo",
      "Razorpay API",
      "AES-256-GCM",
      "CI/CD Blue-Green",
    ],
  },
];

export const mindMatrix = [
  // Top-Right: Obsessed + Rent Free
  {
    id: "ai",
    label: "AI & Neural Nets",
    tag: "AI",
    x: 80,
    y: 18,
    rotate: -5,
    note: "Multi-turn autonomous agents, speculative decoding, and deep learning architectures that reason under tight token budgets.",
    quadrant: "top-right",
  },
  {
    id: "rag",
    label: "RAG & Vector Search",
    tag: "RAG",
    x: 62,
    y: 27,
    rotate: 4,
    note: "Token-window chunking, text-embedding-004, and ChromaDB top-k semantic retrieval cutting context payloads from 50K to 3K tokens.",
    quadrant: "top-right",
  },
  {
    id: "saas",
    label: "Multi-Tenant SaaS",
    tag: "SaaS",
    x: 84,
    y: 38,
    rotate: 5,
    note: "Brand-to-Branch tenancy, JSONB role-based access control, and idempotent Razorpay subscription & payout lifecycles.",
    quadrant: "top-right",
  },
  // Top-Left: Curious + Rent Free
  {
    id: "drones",
    label: "Autonomous Drones",
    tag: "Drones",
    x: 20,
    y: 18,
    rotate: -6,
    note: "UAV flight controllers, onboard sensor fusion, and vision-guided autonomous navigation in unstructured airspace.",
    quadrant: "top-left",
  },
  {
    id: "esp32",
    label: "ESP32 & Edge IoT",
    tag: "ESP32",
    x: 36,
    y: 30,
    rotate: 5,
    note: "Flashing bare-metal C++ firmware onto dual-core ESP32 microcontrollers for real-time Wi-Fi/BLE hardware telemetry.",
    quadrant: "top-left",
  },
  {
    id: "vision",
    label: "Computer Vision",
    tag: "Vision",
    x: 15,
    y: 39,
    rotate: -4,
    note: "Real-time object detection, CNN image classification pipelines, and edge camera inference.",
    quadrant: "top-left",
  },
  // Bottom-Right: Obsessed + On Mind
  {
    id: "backend",
    label: "Backend Architecture",
    tag: "Backend",
    x: 66,
    y: 65,
    rotate: -5,
    note: "Low-latency Node.js, Express, and FastAPI services with AES-256-GCM encryption, silent JWT refresh, and sub-10ms queries.",
    quadrant: "bottom-right",
  },
  {
    id: "frontend",
    label: "Frontend Engineering",
    tag: "Frontend",
    x: 84,
    y: 71,
    rotate: 4,
    note: "Tactile, zero-jank interfaces built with React, Next.js 16, TypeScript, Tailwind CSS, and deterministic Zustand state.",
    quadrant: "bottom-right",
  },
  {
    id: "database",
    label: "Distributed Databases",
    tag: "DB",
    x: 74,
    y: 85,
    rotate: -3,
    note: "PostgreSQL with Supabase Row-Level Security, Drizzle ORM schemas, and MongoDB document stores.",
    quadrant: "bottom-right",
  },
  // Bottom-Left: Curious + On Mind
  {
    id: "cloud",
    label: "Cloud Computing",
    tag: "Cloud",
    x: 27,
    y: 65,
    rotate: -4,
    note: "Elastic cloud infrastructure, edge caching, and distributed compute scaling without enterprise bloat.",
    quadrant: "bottom-left",
  },
  {
    id: "devops",
    label: "Docker & Linux VPS",
    tag: "DevOps",
    x: 16,
    y: 79,
    rotate: 5,
    note: "Self-managed Linux VPS clusters running Dockerized blue-green CI/CD deployment pipelines.",
    quadrant: "bottom-left",
  },
  {
    id: "realtime",
    label: "Real-Time WebSockets",
    tag: "Socket",
    x: 38,
    y: 84,
    rotate: -3,
    note: "Partitioned Socket.IO event rooms powering instant live order queues and multi-client state sync.",
    quadrant: "bottom-left",
  },
];

export const assistantQA = [
  {
    question: "What did Sumit build at Slydr?",
    prompt: "Tell me about Slydr and the double-blind gifting platform",
    answer:
      "At Slydr (Paddy Digital Pvt. Ltd.) in Bengaluru, Sumit worked as an SDE Intern building a double-blind gifting platform on Next.js 16, Supabase Postgres, and Razorpay. Senders buy gifts and recipients claim them via cryptographically signed links without either side ever exposing an address. Sumit engineered AES-256-GCM encryption with Supabase RLS, passwordless OTP delivery in under 1.5 seconds, idempotent HMAC-verified webhook settlement, and blue-green CI/CD deployment on a self-managed VPS.",
  },
  {
    question: "What AI/ML projects and models has Sumit built?",
    prompt: "What AI/ML projects has Sumit built?",
    answer:
      "Sumit built 'Codebase Assistant', a full-stack RAG platform that ingests GitHub repos through Gemini 2.5 Flash with token-window splitting and text-embedding-004 → ChromaDB top-5 retrieval, slashing chat tokens from 50K to 3K with an automated code-quality scoring dashboard. He also built a deep learning computer vision image classification pipeline on the CIFAR-10 dataset (50,000 RGB images across 10 classes) with TensorFlow and Keras.",
  },
  {
    question: "What is Sumit's published patent about?",
    prompt: "Tell me about Sumit's published patent",
    answer:
      "Sumit is the inventor on a published Indian patent titled: 'A System and Method for Demand-Driven Automated Supplier Replenishment in Fragmented B2B Retail'. It algorithmically calculates dynamic restock thresholds by analyzing real-time point-of-sale inventory depletion velocity, preventing stockouts and overstocking across fragmented mom-and-pop retail chains.",
  },
  {
    question: "What is Sumit's background and core stack?",
    prompt: "What's Sumit's tech stack and background?",
    answer:
      "Sumit is a Software & AI/ML Engineer and founder of twentyeleven.studio. He is pursuing his B.Tech in CSE (Data Science) at Manipal University Jaipur (CGPA 8.23, Dean's List), was a national semi-finalist at the Smart India Hackathon, and works as an SDE Intern at Slydr. His core stack includes Python, TypeScript, React, Next.js, Node.js, PostgreSQL, Drizzle ORM, Supabase, PyTorch, TensorFlow, ChromaDB, and Docker.",
  },
  {
    question: "What is Fluke?",
    prompt: "What is Fluke?",
    answer:
      "Fluke is a multi-tenant self-checkout SaaS platform comprising 5 interconnected apps. It features 3-tier JWT authentication (merchants, staff, account owners), subscription lifecycle management, per-store JSONB role-based access control, IST-aware revenue analytics, and Razorpay checkout and payout settlement.",
  },
];
