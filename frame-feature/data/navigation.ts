export interface NavItem {
  name: string;
  href: string;
  hasMegaMenu?: boolean;
}

export const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/work" },
  { name: "Work With Me", href: "/work-with-me", hasMegaMenu: true },
  { name: "Blog", href: "/blog" },
  { name: "Gallery", href: "/gallery" },
  { name: "Notes", href: "/notes" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export const megaMenuData = {
  leftSide: {
    whatWeDo: [
      {
        title: "Visual Content",
        desc: "Photography, short-form video, and visual storytelling.",
        icon: "Camera",
        href: "/work-with-me#visual",
      },
      {
        title: "AI + Content Workflows",
        desc: "Idea generation, content structure, and prompt workflows.",
        icon: "Sparkles",
        href: "/work-with-me#ai",
      },
      {
        title: "Content Clarity",
        desc: "Simplifying complex ideas and structuring communication.",
        icon: "Layers",
        href: "/work-with-me#clarity",
      },
    ],
    whoWeHelp: [
      { name: "Creators & Founders", tag: "Storytelling", href: "/work-with-me" },
      { name: "Visual Brands", tag: "Aesthetics", href: "/work" },
      { name: "AI Explorers", tag: "Experiments", href: "/notes" },
      { name: "Agencies & Studios", tag: "Collaboration", href: "/contact" },
    ],
  },
  rightSide: {
    digitalMarketing: [
      {
        name: "Visual Storytelling",
        desc: "Frames, composition, and emotional resonance.",
        badge: "Visual",
        href: "/work-with-me#visual",
        icon: "Eye",
      },
      {
        name: "Prompt Engineering & GenAI",
        desc: "Midjourney, Stable Diffusion, and custom workflows.",
        badge: "AI",
        href: "/work-with-me#ai",
        icon: "Cpu",
      },
    ],
    webServices: [
      {
        name: "Communication Structure",
        desc: "Turning dense ideas into digestible visual content.",
        badge: "Clarity",
        href: "/work-with-me#clarity",
        icon: "FileText",
      },
      {
        name: "Direct Collaboration",
        desc: "No formal briefs. Send a message and let's explore.",
        badge: "Flexible",
        href: "/contact",
        icon: "MessageCircle",
      },
    ],
  },
};
