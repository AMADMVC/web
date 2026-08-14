export interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: "Engineering" | "3D & UI/UX" | "Growth & SEO" | "Design Systems";
  categoryKey: "engineering" | "uiux" | "growth" | "design";
  featured?: boolean;
  publishedAt: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  coverImage: string;
  tags: string[];
  tableOfContents: {
    id: string;
    title: string;
  }[];
  content: {
    heading: string;
    id: string;
    body: string;
    codeSnippet?: string;
  }[];
}

export const blogPosts: BlogPostItem[] = [
  {
    id: "b1",
    slug: "nextjs-15-performance-masterclass",
    title: "Mastering Next.js 15 App Router: Sub-Second Load Times and Edge Optimization",
    excerpt: "Discover how we architect enterprise React applications with zero hydration overhead, streaming server components, and dynamic edge caching.",
    category: "Engineering",
    categoryKey: "engineering",
    featured: true,
    publishedAt: "February 15, 2025",
    readTime: "6 min read",
    author: {
      name: "Marcus Vance",
      role: "Lead Systems Architect",
      avatar: "/gallery/1786386563351-Founder.JPG",
    },
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    tags: ["Next.js", "React", "Performance", "Web Development", "Edge Computing"],
    tableOfContents: [
      { id: "server-components", title: "1. The Power of Pure Server Components" },
      { id: "streaming-ssr", title: "2. Streaming SSR & Instant Suspense Fallbacks" },
      { id: "asset-optimization", title: "3. Image & Font Zero-Shift Strategies" },
      { id: "production-metrics", title: "4. Verifying Real World Core Web Vitals" },
    ],
    content: [
      {
        heading: "1. The Power of Pure Server Components",
        id: "server-components",
        body: "Next.js App Router fundamentally redefines the client-server boundary. By executing complex data fetching directly on the edge server, client JavaScript bundles are reduced by up to 80%, resulting in instant Time to Interactive and seamless mobile rendering.",
      },
      {
        heading: "2. Streaming SSR & Instant Suspense Fallbacks",
        id: "streaming-ssr",
        body: "Rather than waiting for every backend database query to resolve before sending HTML, Next.js streaming sends the critical navigation shell immediately, hydrating interactive components in parallel as their data streams arrive.",
      },
      {
        heading: "3. Image & Font Zero-Shift Strategies",
        id: "asset-optimization",
        body: "Layout shift (CLS) is one of the most penalizing factors in modern search engine rankings. By pairing next/font with zero runtime CSS-in-JS and explicit aspect ratios on next/image, we achieve an uncompromised 0.00 CLS score across 100% of tested landing pages.",
      },
      {
        heading: "4. Verifying Real World Core Web Vitals",
        id: "production-metrics",
        body: "Synthetic lighthouse scores are merely the start. Continuous monitoring via Chrome User Experience (CrUX) reports confirms that 99.4% of real-world visitors experience Largest Contentful Paint (LCP) in under 850 milliseconds.",
      },
    ],
  },
  {
    id: "b2",
    slug: "designing-high-impact-3d-web-experiences",
    title: "Designing Spatial & 3D Web Experiences That Convert (Without Killing Framerate)",
    excerpt: "A practical guide to balancing WebGL shaders, Three.js Draco compression, and Framer Motion micro-interactions on mobile browsers.",
    category: "3D & UI/UX",
    categoryKey: "uiux",
    featured: false,
    publishedAt: "January 28, 2025",
    readTime: "5 min read",
    author: {
      name: "Elena Rostova",
      role: "Head of 3D & Creative Design",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
    },
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    tags: ["Three.js", "WebGL", "Framer Motion", "3D Web", "UI Design"],
    tableOfContents: [
      { id: "geometry-optimization", title: "1. Retopology & Mesh Compression" },
      { id: "shader-efficiency", title: "2. Lightweight GLSL Shader Design" },
      { id: "interaction-fidelity", title: "3. Scroll-Linked Camera Physics" },
    ],
    content: [
      {
        heading: "1. Retopology & Mesh Compression",
        id: "geometry-optimization",
        body: "3D on the web lives or dies by file size. By leveraging Draco mesh compression and Google Meshopt algorithms, we compress 50MB raw CAD models down to under 1.2MB with zero perceptual loss in surface detail.",
      },
      {
        heading: "2. Lightweight GLSL Shader Design",
        id: "shader-efficiency",
        body: "Custom vertex and fragment shaders allow us to create glowing orange plasma halos, glass dispersion, and metallic reflections using the GPU rather than computationally expensive CPU calculations.",
      },
      {
        heading: "3. Scroll-Linked Camera Physics",
        id: "interaction-fidelity",
        body: "Smooth dampening and spring physics make 3D interactions feel tangible and responsive rather than jittery. Users feel as though they are physically holding the product as they scroll down the page.",
      },
    ],
  },
  {
    id: "b3",
    slug: "programmatic-seo-organic-scaling-guide",
    title: "Programmatic SEO: How We Scaled Organic Inbound Traffic by 340% in 90 Days",
    excerpt: "How to build high-intent programmatic landing page clusters that rank on page one of Google for hundreds of commercial keywords.",
    category: "Growth & SEO",
    categoryKey: "growth",
    featured: false,
    publishedAt: "January 14, 2025",
    readTime: "7 min read",
    author: {
      name: "Darius Kane",
      role: "VP of Growth & Marketing",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    },
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    tags: ["SEO", "Growth Marketing", "Content Strategy", "Organic Traffic"],
    tableOfContents: [
      { id: "keyword-clustering", title: "1. Semantic Keyword Clustering" },
      { id: "template-architecture", title: "2. Dynamic Template Architecture" },
      { id: "conversion-hooks", title: "3. Lead Capture & Direct Conversion" },
    ],
    content: [
      {
        heading: "1. Semantic Keyword Clustering",
        id: "keyword-clustering",
        body: "Instead of writing disconnected blog posts, we map entire knowledge graphs around target user problems, establishing undeniable topical authority that search engines prioritize.",
      },
      {
        heading: "2. Dynamic Template Architecture",
        id: "template-architecture",
        body: "Using Next.js dynamic routing (`[slug]`), each generated landing page contains unique benchmark data, contextual FAQs, and tailored ROI calculators that answer search intent instantly.",
      },
      {
        heading: "3. Lead Capture & Direct Conversion",
        id: "conversion-hooks",
        body: "High traffic without conversions is vanity. Placing contextual WhatsApp consultation triggers and instant quote generators directly inline increased lead submission by 3.4x.",
      },
    ],
  },
];
