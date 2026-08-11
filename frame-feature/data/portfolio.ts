export interface CaseStudyItem {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: "Web Development" | "Digital Marketing" | "3D & Branding" | "UI/UX Design";
  categoryKey: "web" | "marketing" | "3d" | "uiux" | "startups" | "enterprise" | "ecommerce" | "creative";
  shortDesc: string;
  image: string;
  accentColor: string;
  year: string;
  duration: string;
  results: {
    label: string;
    value: string;
  }[];
  overview: string;
  problem: string;
  strategy: string;
  execution: string[];
  metrics: {
    metric: string;
    title: string;
    description: string;
  }[];
  gallery: {
    title: string;
    caption: string;
    image: string;
  }[];
  tags: string[];
}

export const portfolioData: CaseStudyItem[] = [
  {
    id: "apex-neural-platform",
    slug: "apex-neural-platform",
    title: "Apex Neural — Next-Gen AI Compute Infrastructure Platform",
    client: "Apex Systems Inc.",
    category: "Web Development",
    categoryKey: "web",
    shortDesc: "Architected a real-time GPU orchestration portal with Next.js 15, WebGL telemetry nodes, and sub-100ms dashboard latency.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    accentColor: "#FF5E14",
    year: "2025",
    duration: "10 Weeks",
    tags: ["Next.js", "WebGL 3D", "Tailwind CSS", "TypeScript", "Performance"],
    results: [
      { label: "Dashboard Latency", value: "68ms" },
      { label: "ARR Growth", value: "+340%" },
      { label: "Lighthouse Score", value: "99/100" },
    ],
    overview: "Apex Neural needed an elite, ultra-responsive digital presence and client management portal to showcase their distributed GPU cluster network to tier-1 enterprise machine learning engineers.",
    problem: "Their legacy portal suffered from high latency, disjointed UI styling, slow time-to-interactive, and a 42% abandonment rate during enterprise trial onboarding.",
    strategy: "We redesigned the digital ecosystem from scratch: establishing an atomic design system with glowing orange accents on obsidian backgrounds, migrating to Next.js App Router for edge-rendered speed, and integrating an interactive 3D WebGL server node cluster map.",
    execution: [
      "Engineered an interactive 3D particle node visualization showcasing live server availability.",
      "Implemented optimistic UI updates and real-time WebSockets telemetry charts.",
      "Rebuilt the onboarding funnel into a friction-free 3-step credential checkout.",
      "Achieved 100% Core Web Vitals across all worldwide edge points.",
    ],
    metrics: [
      {
        metric: "+340%",
        title: "Enterprise ARR Growth",
        description: "Year-over-year annual recurring revenue increase driven by institutional conversion.",
      },
      {
        metric: "-72%",
        title: "Onboarding Dropoff",
        description: "Drastic reduction in sign-up friction with streamlined one-click SSH keys.",
      },
      {
        metric: "68ms",
        title: "Global Edge Latency",
        description: "Real-time query response time across North America, Europe, and Asia-Pacific.",
      },
    ],
    gallery: [
      {
        title: "Real-time Telemetry Dashboard",
        caption: "Dark obsidian UI with high-visibility orange telemetry graphs.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "3D GPU Cluster Map",
        caption: "Interactive WebGL node matrix displaying global data center load.",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Mobile Node Management",
        caption: "Touch-optimized control center with biometric authentication.",
        image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
  {
    id: "lumina-spatial-audio",
    slug: "lumina-spatial-audio",
    title: "Lumina Audio — 3D Spatial Sound Hardware Showcase",
    client: "Lumina Labs UK",
    category: "3D & Branding",
    categoryKey: "3d",
    shortDesc: "Award-winning scroll-driven 3D product showcase featuring 360° exploded acoustic engineering models.",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80",
    accentColor: "#FF7A1A",
    year: "2025",
    duration: "8 Weeks",
    tags: ["Three.js", "Framer Motion", "3D Modeling", "Next.js", "Sound Design"],
    results: [
      { label: "Pre-Orders", value: "$2.4M" },
      { label: "Avg Dwell Time", value: "4m 12s" },
      { label: "Award", value: "AOTD Winner" },
    ],
    overview: "Lumina Labs launched flagship spatial headphones and wanted an online product experience that mirrored the precision acoustic luxury of their physical hardware.",
    problem: "Traditional 2D product photography failed to communicate the patented beryllium driver chamber and internal noise cancellation micro-architecture.",
    strategy: "We built an interactive 3D product website where user scroll movements dynamically disassemble the headphone components in cinematic slow motion with interactive sound simulation.",
    execution: [
      "Retopologized CAD engineering models into lightweight Draco-compressed GLB files under 1.8MB.",
      "Synchronized custom Web Audio API spatial frequency generators to scroll position.",
      "Developed an interactive colorway customizer with instant material switching.",
      "Optimized fallback 2D render sequences for legacy mobile browsers.",
    ],
    metrics: [
      {
        metric: "$2.4M",
        title: "Direct Pre-Orders",
        description: "Generated within the initial 14-day global product launch campaign.",
      },
      {
        metric: "4m 12s",
        title: "Average Page Duration",
        description: "Massive dwell time increase driven by interactive 3D model exploration.",
      },
      {
        metric: "18.4%",
        title: "Checkout Conversion Rate",
        description: "Industry-leading conversion rate on high-ticket consumer electronics.",
      },
    ],
    gallery: [
      {
        title: "Exploded Chamber View",
        caption: "Interactive 3D layer inspection with acoustic resonance highlights.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Custom Material Switcher",
        caption: "Matte obsidian, brushed aluminum, and flame orange colorways.",
        image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
  {
    id: "zenith-capital-growth",
    slug: "zenith-capital-growth",
    title: "Zenith Capital — Omnichannel FinTech Growth Engine",
    client: "Zenith Global Capital",
    category: "Digital Marketing",
    categoryKey: "marketing",
    shortDesc: "Executed a multi-channel acquisition campaign with programmatic SEO and high-intent paid funnels yielding a 5.2x ROAS.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    accentColor: "#FF5E14",
    year: "2025",
    duration: "12 Weeks",
    tags: ["SEO Scale", "Performance Ads", "Funnel CRO", "Analytics"],
    results: [
      { label: "ROAS Achieved", value: "5.2x" },
      { label: "New MQLs", value: "+420%" },
      { label: "Organic Rank", value: "#1 for 48 Terms" },
    ],
    overview: "Zenith Capital sought to expand their institutional wealth management portfolio by capturing high-net-worth founders and tech executives searching for asset diversification.",
    problem: "Sky-high cost-per-click ($80+ per click) in the finance sector was burning marketing spend without qualified pipeline velocity.",
    strategy: "We built a programmatic content engine generating 120+ targeted liquidity strategy guides, paired with hyper-segmented LinkedIn and Google search campaigns targeted directly at verified tech leadership.",
    execution: [
      "Built custom interactive financial tax modeling calculators directly on landing pages.",
      "Launched automated multi-touch email nurture sequences with personalized video touchpoints.",
      "Implemented Server-Side conversion tracking to feed AI bidding algorithms high-value signal.",
      "Reduced cost per qualified opportunity by 61%.",
    ],
    metrics: [
      {
        metric: "5.2x",
        title: "Return on Ad Spend",
        description: "Consistently sustained across 6 consecutive months of scaling ad budget.",
      },
      {
        metric: "+420%",
        title: "Marketing Qualified Leads",
        description: "Verified accredited investors entering the active advisory pipeline.",
      },
      {
        metric: "#1",
        title: "Search Dominance",
        description: "Secured top 3 Google search rankings for 48 high-intent commercial keywords.",
      },
    ],
    gallery: [
      {
        title: "Interactive Wealth Calculator",
        caption: "High-converting financial simulation tool with instant lead gate.",
        image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
  {
    id: "chrono-design-system",
    slug: "chrono-design-system",
    title: "Chrono — Multi-Platform Enterprise Design System",
    client: "Chrono SaaS Suite",
    category: "UI/UX Design",
    categoryKey: "uiux",
    shortDesc: "Created an atomic design system with 200+ accessible components, Figma tokens, and auto-generated React libraries.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    accentColor: "#FF9E42",
    year: "2024",
    duration: "6 Weeks",
    tags: ["Design System", "Figma", "Accessibility", "Tailwind CSS"],
    results: [
      { label: "Dev Speed", value: "3x Faster" },
      { label: "WCAG Rating", value: "AAA" },
      { label: "Component Count", value: "240+" },
    ],
    overview: "Chrono operated across 4 discrete enterprise SaaS products with fragmented design inconsistencies, resulting in slow feature releases and visual debt.",
    problem: "Engineering teams spent 40% of their sprints rebuilding redundant UI components with inconsistent color tokens and broken accessibility.",
    strategy: "We built the unified Chrono Design System: a cohesive token-based architecture in Figma synced directly to Tailwind CSS and React component packages.",
    execution: [
      "Constructed 240+ fully responsive components across light and high-contrast dark modes.",
      "Achieved 100% WCAG AAA accessibility compliance with keyboard navigation and screen reader audits.",
      "Created interactive Storybook documentation with live code sandboxes.",
      "Trained 35 cross-functional designers and engineers on token governance.",
    ],
    metrics: [
      {
        metric: "3x",
        title: "Feature Shipping Velocity",
        description: "Teams build and deploy new product modules in days instead of weeks.",
      },
      {
        metric: "AAA",
        title: "Accessibility Compliance",
        description: "Certified universal accessibility standards met across all web properties.",
      },
      {
        metric: "0",
        title: "Visual Token Debt",
        description: "Zero color, typography, or spacing discrepancies across product portfolio.",
      },
    ],
    gallery: [
      {
        title: "Component Token Grid",
        caption: "Modular state variants and interactive state states.",
        image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
];
