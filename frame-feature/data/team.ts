export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: "Leadership" | "Engineering" | "Design & 3D" | "Marketing & Strategy";
  avatar: string;
  bio: string;
  skills: string[];
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  featuredProjects: string[];
}

export const teamMembers: TeamMember[] = [
  {
    id: "alex-vance",
    name: "Alex Vance",
    role: "Founder & Chief Creative Technologist",
    department: "Leadership",
    avatar: "/gallery/1786386563351-Founder.JPG",
    bio: "Pioneering the intersection of spatial computing, generative design, and high-performance web systems for 12+ years.",
    skills: ["Creative Direction", "Three.js", "System Architecture", "Brand Strategy"],
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      github: "https://github.com",
    },
    featuredProjects: ["Apex Neural Platform", "Lumina Spatial Audio"],
  },
  {
    id: "elena-rostova",
    name: "Elena Rostova",
    role: "Head of 3D Experience & UI/UX",
    department: "Design & 3D",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    bio: "Award-winning 3D designer and shader artist focused on high-framerate interactive web visualizers.",
    skills: ["WebGL Shaders", "Figma Design Systems", "Blender/Octane", "Motion UX"],
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
    featuredProjects: ["Lumina Spatial Audio", "Chrono Design System"],
  },
  {
    id: "marcus-vance",
    name: "Marcus Vance",
    role: "Principal Next.js & Full-Stack Architect",
    department: "Engineering",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    bio: "Ex-BigTech performance specialist dedicated to sub-second load times, edge computing, and bulletproof infrastructure.",
    skills: ["Next.js App Router", "TypeScript", "Microservices", "Cloudflare Edge"],
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
    featuredProjects: ["Apex Neural Platform", "SaaS Analytics Cloud"],
  },
  {
    id: "sophia-chen",
    name: "Sophia Chen",
    role: "Director of Performance & Growth Marketing",
    department: "Marketing & Strategy",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    bio: "Data-obsessed growth marketer who has scaled 30+ brands across Google, Meta, and Programmatic SEO.",
    skills: ["Programmatic SEO", "Omnichannel Funnels", "Conversion Rate CRO", "Attribution"],
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
    featuredProjects: ["Zenith Capital Growth", "E-Commerce Funnel Scale"],
  },
];
