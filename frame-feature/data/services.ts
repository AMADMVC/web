export interface ServiceItem {
  id: string;
  slug: string;
  category: "Web Services" | "Digital Marketing" | "3D & Design" | "Strategy";
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  tag: string;
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
  benefits: {
    title: string;
    metric: string;
    description: string;
  }[];
  workflow: {
    step: string;
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const servicesData: ServiceItem[] = [
  {
    id: "web-development",
    slug: "web-development",
    category: "Web Services",
    title: "Next.js & Full-Stack Web Development",
    shortDesc: "High-speed, SEO-first web applications built with Next.js App Router, TypeScript, and modern edge infrastructure.",
    fullDesc: "We engineer enterprise-grade web applications that deliver sub-second page loads, flawless responsive design, and bulletproof security. Built on modern React and Next.js, our platforms are crafted to scale seamlessly as your business grows.",
    icon: "Code2",
    tag: "Core Engineering",
    features: [
      {
        title: "Server Components & Edge Rendering",
        description: "Zero client-side bundle bloat with lightning-quick initial content rendering for unmatched speed.",
        icon: "Zap",
      },
      {
        title: "Dynamic Headless CMS Integration",
        description: "Effortless content publishing workflows via Sanity, Strapi, or Contentful.",
        icon: "Database",
      },
      {
        title: "API-First & Microservices Architecture",
        description: "Clean REST/GraphQL endpoints designed for scalability, third-party integrations, and webhooks.",
        icon: "Cpu",
      },
      {
        title: "Enterprise Security & Global CDN",
        description: "Hardened headers, SSL/TLS, automated rate limiting, and multi-region deployment.",
        icon: "ShieldCheck",
      },
    ],
    benefits: [
      {
        title: "Speed Benchmark",
        metric: "< 0.8s",
        description: "Average Time to Interactive on mobile devices across 4G connections.",
      },
      {
        title: "SEO Score",
        metric: "100%",
        description: "Lighthouse performance, accessibility, best practices, and SEO.",
      },
      {
        title: "Conversion Lift",
        metric: "+48%",
        description: "Observed uplift in user engagement and lead generation after launch.",
      },
    ],
    workflow: [
      {
        step: "01",
        title: "Technical Discovery & Architecture",
        description: "We map user journeys, database schemas, and performance benchmarks before writing a single line of code.",
      },
      {
        step: "02",
        title: "Component-Driven Prototyping",
        description: "Modular development in isolated environments with interactive state management and automated tests.",
      },
      {
        step: "03",
        title: "Performance & SEO Hardening",
        description: "Rigorous Core Web Vitals optimization, schema markup injection, and accessibility auditing.",
      },
      {
        step: "04",
        title: "Deployment & CI/CD Pipeline",
        description: "Automated deployment pipelines on Vercel/AWS with instant rollback and preview environments.",
      },
    ],
    faqs: [
      {
        question: "Why choose Next.js over traditional WordPress or single-page apps?",
        answer: "Next.js combines the best of Server-Side Rendering (SSR) and Static Site Generation (SSG), ensuring lightning-fast search engine indexing, instant load times, and top-tier security without plugin bloat.",
      },
      {
        question: "How long does a custom web development project take?",
        answer: "A standard enterprise web application typically takes between 4 to 8 weeks from initial architecture design to production launch.",
      },
      {
        question: "Do you provide post-launch maintenance and updates?",
        answer: "Yes, we offer comprehensive 24/7 monitoring, security patches, performance tuning, and ongoing feature rollouts.",
      },
    ],
  },
  {
    id: "3d-web-experiences",
    slug: "3d-web-experiences",
    category: "3D & Design",
    title: "Spatial & 3D Interactive Web Experiences",
    shortDesc: "Award-winning WebGL, Three.js shaders, and interactive 3D product showcases that leave unforgettable impressions.",
    fullDesc: "Elevate your digital presence into an immersive sensory journey. We combine WebGL shaders, Three.js, and Framer Motion micro-animations to produce interactive 3D product visualizers, spatial landing pages, and interactive virtual environments.",
    icon: "Box",
    tag: "Next-Gen UI",
    features: [
      {
        title: "Interactive 3D Product Viewers",
        description: "360-degree rotation, exploded part inspection, custom textures, and real-time lighting.",
        icon: "Eye",
      },
      {
        title: "Custom WebGL Shaders & Particles",
        description: "High-framerate physics-based particle streams, neon glow waves, and ambient light refractions.",
        icon: "Sparkles",
      },
      {
        title: "Scroll-Linked Cinematic Cameras",
        description: "Smooth perspective zoom and trajectory path camera controls guided by user scrolling.",
        icon: "Camera",
      },
      {
        title: "Mobile & GPU Optimization",
        description: "Adaptive LOD (Level of Detail) rendering ensuring 60fps even on mid-range smartphones.",
        icon: "Gauge",
      },
    ],
    benefits: [
      {
        title: "Dwell Time",
        metric: "3.8x",
        description: "Increase in average time on page compared to flat 2D landing pages.",
      },
      {
        title: "Brand Recall",
        metric: "+85%",
        description: "Higher brand recognition recorded across client user feedback studies.",
      },
      {
        title: "Framerate",
        metric: "60 FPS",
        description: "Rock solid framerate with GPU hardware acceleration across all modern browsers.",
      },
    ],
    workflow: [
      {
        step: "01",
        title: "3D Asset Modeling & Texture Optimization",
        description: "Geometry retopology, PBR material creation, and GLTF/GLB compression under 2MB.",
      },
      {
        step: "02",
        title: "Scene Lighting & Shader Engineering",
        description: "Custom GLSL vertex and fragment shaders for neon halos, glass refractions, and shadows.",
      },
      {
        step: "03",
        title: "Interactive Camera & Scroll Logic",
        description: "Binding scroll progress to 3D transformations using Framer Motion and GSAP.",
      },
      {
        step: "04",
        title: "Cross-Device Stress Testing",
        description: "Benchmarking draw calls and memory consumption on iOS, Android, and low-power hardware.",
      },
    ],
    faqs: [
      {
        question: "Will 3D graphics slow down my website load time?",
        answer: "No. We utilize Draco compression, geometry instancing, dynamic level-of-detail (LOD), and lazy loading so 3D assets load progressively without blocking initial page render.",
      },
      {
        question: "Do 3D websites work smoothly on mobile phones?",
        answer: "Yes, our engine automatically detects mobile GPU capabilities and reduces shadow resolution and polygon density to maintain a locked 60fps.",
      },
    ],
  },
  {
    id: "digital-marketing",
    slug: "digital-marketing",
    category: "Digital Marketing",
    title: "Data-Driven Digital & Performance Marketing",
    shortDesc: "Aggressive multi-channel acquisition funnels combining precision SEO, Meta/Google ads, and conversion optimization.",
    fullDesc: "We don't just drive clicks; we build sustainable customer acquisition engines. Our data-backed approach unites high-intent search optimization, hyper-targeted social ad campaigns, and rigorous conversion rate optimization to scale your pipeline.",
    icon: "TrendingUp",
    tag: "High ROI",
    features: [
      {
        title: "High-Intent SEO Architecture",
        description: "Topical clusters, semantic entity mapping, and automated schema generation for search dominance.",
        icon: "Search",
      },
      {
        title: "Multi-Platform Paid Advertising",
        description: "Custom creative ads, retargeting funnels, and programmatic bidding on Google, Meta, and LinkedIn.",
        icon: "Target",
      },
      {
        title: "Full-Funnel Conversion Optimization",
        description: "A/B multivariate landing page testing, heatmap tracking, and friction-reducing checkout flows.",
        icon: "BarChart3",
      },
      {
        title: "Attribution & Real-Time Analytics",
        description: "Server-side tracking (CAPI), multi-touch attribution dashboards, and transparent ROI reporting.",
        icon: "Activity",
      },
    ],
    benefits: [
      {
        title: "ROAS Average",
        metric: "4.6x",
        description: "Average Return on Ad Spend achieved across active growth campaigns.",
      },
      {
        title: "Organic Traffic",
        metric: "+230%",
        description: "Increase in qualified organic search visits within 6 months of rollout.",
      },
      {
        title: "CAC Reduction",
        metric: "-35%",
        description: "Reduction in Customer Acquisition Cost through funnel efficiency improvements.",
      },
    ],
    workflow: [
      {
        step: "01",
        title: "Audience & Competitor Intelligence",
        description: "Deep research into buyer psychology, keyword gaps, and competitor spending strategies.",
      },
      {
        step: "02",
        title: "Funnel & Creative Production",
        description: "High-converting ad angles, visual assets, video hooks, and dedicated landing pages.",
      },
      {
        step: "03",
        title: "Algorithmic Testing & Scaling",
        description: "Rapid multivariate testing of creative hooks, audiences, and bid strategies to identify winners.",
      },
      {
        step: "04",
        title: "Revenue Expansion & Retention",
        description: "Email/SMS lifecycle marketing and automated re-engagement sequences to maximize LTV.",
      },
    ],
    faqs: [
      {
        question: "How quickly can we expect results from digital marketing campaigns?",
        answer: "Paid advertising generates leads and sales within the first 48 to 72 hours of launch. Organic SEO compounding typically yields substantial ranking gains within 60 to 90 days.",
      },
      {
        question: "What ad budgets do you work with?",
        answer: "We manage monthly ad budgets ranging from $3,000 up to $150,000+ across Meta, Google, TikTok, and LinkedIn.",
      },
    ],
  },
  {
    id: "ui-ux-design",
    slug: "ui-ux-design",
    category: "3D & Design",
    title: "UI/UX Design & Design Systems",
    shortDesc: "Pixel-perfect interface design, atomic design systems, and delightful user journeys engineered for high conversion.",
    fullDesc: "Great design isn't just how something looks—it's how effortlessly it works. We architect sleek, intuitive user experiences backed by deep user research, wireframing, interactive prototyping, and comprehensive Figma design systems.",
    icon: "Palette",
    tag: "Creative Excellence",
    features: [
      {
        title: "Comprehensive Design Tokens",
        description: "Unified typography, color palettes, spacing scales, and shadow systems.",
        icon: "Grid",
      },
      {
        title: "Interactive High-Fidelity Prototypes",
        description: "Realistic clickable Figma prototypes for user testing and stakeholder alignment.",
        icon: "Layers",
      },
      {
        title: "User Journey & Usability Research",
        description: "Heatmap analysis, customer empathy mapping, and information architecture hierarchy.",
        icon: "Users",
      },
      {
        title: "Seamless Developer Handoff",
        description: "Pixel-perfect React component specs, token exports, and documentation.",
        icon: "CheckCircle",
      },
    ],
    benefits: [
      {
        title: "User Retention",
        metric: "+62%",
        description: "Lift in 30-day user retention following UX friction reduction.",
      },
      {
        title: "Design-to-Code",
        metric: "2.5x",
        description: "Faster engineering velocity with reusable atomic design tokens.",
      },
      {
        title: "NPS Improvement",
        metric: "+28pts",
        description: "Net Promoter Score growth across customer touchpoints.",
      },
    ],
    workflow: [
      {
        step: "01",
        title: "Research & Empathy Mapping",
        description: "Uncovering user pain points, competitor shortcomings, and core feature priorities.",
      },
      {
        step: "02",
        title: "Wireframing & Information Architecture",
        description: "Structuring high-converting visual hierarchy and streamlined task flows.",
      },
      {
        step: "03",
        title: "High-Fidelity Visual Design",
        description: "Crafting micro-interactions, dark/light modes, and custom iconography.",
      },
      {
        step: "04",
        title: "Design System Assembly & Handoff",
        description: "Building production-ready token libraries and interactive documentation.",
      },
    ],
    faqs: [
      {
        question: "Do you provide Figma source files?",
        answer: "Yes, you receive complete ownership of all Figma files, design tokens, responsive artboards, component variants, and interactive prototypes.",
      },
      {
        question: "Can you redesign our existing app without breaking current features?",
        answer: "Absolutely. We perform heuristic evaluations and modernize the interface incrementally with backward-compatible component rollouts.",
      },
    ],
  },
];
