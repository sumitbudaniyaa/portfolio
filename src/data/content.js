export const profile = {
  name: "Sumit Kumar",
  // The giant hero stack. `tone` drives the colour of each line:
  // bright → flame accent → recessed ghost.
  displayLines: [
    { text: "Software &", tone: "bright" },
    { text: "AI/ML", tone: "accent" },
    { text: "Engineer", tone: "ghost" },
  ],
  tagline:
    "Passionate about building products end-to-end — with a deep focus on real users, real workflows and real-world constraints.",
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
  resume:
    "https://drive.google.com/file/d/1avG5JXDnkUPqEMSFzo_RuJlyqMXb-aoq/view?usp=sharing",
  about: [
    "I approach problems with a product-first and entrepreneurial mindset — observing inefficiencies, validating whether a solution truly helps, then building around that.",
    "I value ownership, learn quickly, and aim to contribute wherever I can add meaningful value.",
  ],
};

// Scrolling ticker strip under the hero.
export const marquee = [
  "React.js",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "PyTorch",
  "Python",
  "C++",
  "Machine Learning",
  "MongoDB",
  "Tailwind CSS",
  "scikit-learn",
  "Express.js",
];

export const experience = [
  {
    role: "Software Development Engineer — Intern",
    company: "Slydr — Paddy Digital Pvt. Ltd. · Hybrid, Bengaluru",
    logo: "/slydr.svg",
    period: "Nov 2025 — Jul 2026",
    current: true,
    desc: "Building a double-blind gifting platform (Next.js 16, Supabase Postgres, Razorpay) where senders buy gifts and recipients claim them via encrypted links — neither side shares an address — enforced with AES-256-GCM, RLS policies and HMAC-verified payment webhooks. Owned the stack end-to-end: ISR catalog with search, passwordless OTP auth delivering in under 1.5s, idempotent payment flows, a role-based admin dashboard with live ops metrics, and blue-green CI/CD on a self-managed VPS.",
  },
];

export const education = [
  {
    school: "Manipal University Jaipur",
    logo: "/muj.jpeg",
    desc: "B.Tech, Computer Science & Engineering — Data Science. CGPA 8.23.",
    period: "2023 — 2027",
    href: "https://jaipur.manipal.edu/",
  },
];

export const toolkit = [
  {
    label: "Languages",
    items: ["Python", "C/C++", "JavaScript", "TypeScript", "HTML/CSS"],
  },
  {
    label: "Frameworks & Tools",
    items: [
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "Tailwind CSS",
      "Git",
      "AWS",
      "Docker",
      "Linux",
    ],
  },
  { label: "Databases", items: ["PostgreSQL", "MongoDB", "SQL"] },
  {
    label: "ML & Data Science",
    items: [
      "NumPy",
      "Pandas",
      "scikit-learn",
      "TensorFlow",
      "PyTorch",
      "Keras",
    ],
  },
  {
    label: "CS Fundamentals",
    items: [
      "Data Structures & Algorithms",
      "OOP",
      "RDBMS",
      "Agile",
      "Microservices",
    ],
  },
];

// `icon` maps to a lucide icon in the Achievements component.
export const achievements = [
  {
    icon: "trophy",
    title: "Smart India Hackathon",
    desc: "Semi-finalist at SIH, India's largest national hackathon.",
  },
  {
    icon: "patent",
    title: "Published Patent",
    desc: "A System and Method for Demand-Driven Automated Supplier Replenishment in Fragmented B2B Retail.",
  },
  {
    icon: "award",
    title: "Dean's List",
    desc: "Awarded for outstanding academic performance.",
  },
];

export const projects = [
  {
    title: "Fluke",
    kicker: "Retail Self-Checkout SaaS",
    desc: "Multi-tenant self-checkout SaaS (5 apps) with 3-type JWT auth for merchants, staff and account owners, subscription lifecycle enforcement, IST-aware revenue analytics and Razorpay order/payout settlement. Includes a 3-tier RBAC system with per-store JSONB access control enforced at both route and UI level, plus an internal portal with real-time multi-store KPI dashboards.",
    repo: "https://github.com/sumitbudaniyaa/fluke",
    tags: [
      "React",
      "Node",
      "Express",
      "PostgreSQL",
      "Drizzle ORM",
      "JWT",
      "Razorpay",
      "Tailwind",
    ],
    featured: true,
  },
  {
    title: "Codebase Assistant",
    kicker: "RAG Documentation Platform",
    desc: "Full-stack RAG platform that ingests GitHub repos through Gemini 2.5 Flash with token-window splitting; a text-embedding-004 → ChromaDB → top-5 retrieval pipeline cut chat tokens from 50K to 3K. Adds a multi-turn chatbot with rate-limit propagation and fast-fail retries, plus an AI code-quality dashboard scoring security, maintainability and test coverage with Puppeteer PDF export.",
    repo: "https://github.com/sumitbudaniyaa/codebase",
    tags: [
      "React",
      "Express",
      "Python",
      "FastAPI",
      "MongoDB",
      "ChromaDB",
      "LLM",
    ],
    featured: true,
  },
  {
    title: "CIFAR-10 Recognition",
    kicker: "Computer Vision",
    desc: "Image classification pipeline over 50,000 RGB images across 10 classes, with preprocessing, normalization and baseline benchmarking.",
    live: "https://colab.research.google.com/drive/1XrsjerXYzDc8xTiVEcJNKivUBisf63Cm?usp=sharing",
    liveLabel: "Open notebook",
    tags: ["TensorFlow", "Keras", "Python"],
    featured: true,
  },
  {
    title: "Feedu",
    kicker: "Multi-Tenant Restaurant OS",
    desc: "Restaurant OS SaaS built as a Turborepo monorepo (6 apps, 5 shared packages) on a Brand → Branch tenancy model, with a single-source-of-truth Zod types package driving backend validation and typed frontend clients. Stateless JWT auth with silent refresh and per-request tenant resolution enforces brand/branch RBAC, while Socket.IO rooms fan real-time order and waiter-call events to branch and brand scopes.",
    repo: "https://github.com/sumitbudaniyaa/feedu",
    tags: [
      "React",
      "TypeScript",
      "Node",
      "Express",
      "MongoDB",
      "Socket.IO",
      "Turborepo",
      "Zustand",
    ],
    featured: true,
  },
  {
    title: "Geni",
    kicker: "Career Guidance",
    desc: "Web app for college and career guidance.",
    repo: "https://github.com/sumitbudaniyaa/geni",
    tags: [],
  },
  {
    title: "Suplyr",
    kicker: "B2B Supply Platform",
    desc: "Frontend for a B2B short-item supply platform.",
    repo: "https://github.com/sumitbudaniyaa/suplyr",
    tags: ["React"],
  },
];
