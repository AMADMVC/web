export interface GalleryItem {
  id: string;
  title: string;
  category: "3D Art" | "Web Design" | "Branding" | "UI Interfaces" | "Architecture";
  tag: string;
  image: string;
  aspectRatio: "portrait" | "landscape" | "square";
  description: string;
  client?: string;
  year: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    title: "Cybernetic Obsidian Core",
    category: "3D Art",
    tag: "Octane Render",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80",
    aspectRatio: "landscape",
    description: "Ray-traced procedural geometry visualizing autonomous AI neural networks with orange plasma filaments.",
    year: "2025",
  },
  {
    id: "g2",
    title: "Quantum FinTech Mobile Portal",
    category: "UI Interfaces",
    tag: "Mobile UX",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
    aspectRatio: "portrait",
    description: "High-contrast dark mode financial dashboard featuring real-time crypto asset analytics.",
    year: "2025",
  },
  {
    id: "g3",
    title: "Aetheria Spatial Headset",
    category: "3D Art",
    tag: "Product Visuals",
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1000&q=80",
    aspectRatio: "square",
    description: "Cinematic industrial rendering of titanium spatial audio hardware.",
    year: "2025",
  },
  {
    id: "g4",
    title: "Nexus Brand Identity System",
    category: "Branding",
    tag: "Identity",
    image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1000&q=80",
    aspectRatio: "landscape",
    description: "Complete corporate stationery and digital design system in flame orange and charcoal slate.",
    year: "2024",
  },
  {
    id: "g5",
    title: "SaaS Analytics Cloud Platform",
    category: "Web Design",
    tag: "Next.js App",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
    aspectRatio: "portrait",
    description: "Enterprise data visualization suite with interactive filters and dark mode graph tokens.",
    year: "2025",
  },
  {
    id: "g6",
    title: "Architectural Studio Minimalist Website",
    category: "Web Design",
    tag: "Minimalist",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    aspectRatio: "landscape",
    description: "Editorial layout with fluid typography and smooth horizontal scroll galleries.",
    year: "2025",
  },
  {
    id: "g7",
    title: "Vortex Gaming Engine Console",
    category: "3D Art",
    tag: "Hardware Concept",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80",
    aspectRatio: "square",
    description: "Next-gen console concept with illuminated orange LED venting and matte graphite casing.",
    year: "2024",
  },
  {
    id: "g8",
    title: "Hyperion Design System Guide",
    category: "UI Interfaces",
    tag: "Design Tokens",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1000&q=80",
    aspectRatio: "landscape",
    description: "Living design system documentation with auto-generated React component snippets.",
    year: "2025",
  },
];
