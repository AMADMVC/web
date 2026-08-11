export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: "Visual Content" | "AI Experiments" | "Content Formats" | "Editing Work";
  categoryKey: "visual" | "ai" | "content" | "editing";
  summary: string;
  image: string;
  year: string;
  tags: string[];
  idea: string;
  process: {
    tools: string[];
    method: string;
  };
  output: string;
  learning: {
    whatWorked: string;
    whatDidnt: string;
  };
}

export const workItems: ProjectItem[] = [
  {
    id: "cinematic-lighting-genai",
    slug: "cinematic-lighting-genai",
    title: "Cinematic Framing & Synthetic Lighting Study",
    category: "AI Experiments",
    categoryKey: "ai",
    summary: "Exploring how anamorphic lens flares and chiaroscuro lighting can be controlled with precision prompting.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    year: "2025",
    tags: ["Midjourney v6", "ComfyUI", "Color Grading", "Visual Study"],
    idea: "Can generative AI replicate the deliberate, subtle imperfection of vintage anamorphic glass without looking overly digital?",
    process: {
      tools: ["ComfyUI", "Custom SDXL LoRA", "DaVinci Resolve"],
      method: "Trained a specialized contrast curve weights workflow and passed outputs through standard cinematic post-production LUTs.",
    },
    output: "A 12-frame visual editorial examining nocturnal architecture with orange sodium-vapor and tungsten rim lighting.",
    learning: {
      whatWorked: "Using specific focal lengths (e.g. 50mm f/1.2) in prompt structure anchored depth of field much better than generic 'cinematic' keywords.",
      whatDidnt: "Over-weighting film grain in the generator caused artifacts; applying 35mm grain in DaVinci post gave 10x better results.",
    },
  },
  {
    id: "visual-concept-clarity",
    slug: "visual-concept-clarity",
    title: "Deconstructing Complex AI Concepts into Visual Micro-Frames",
    category: "Content Formats",
    categoryKey: "content",
    summary: "Transforming 20-page research papers into 3-frame carousel breakdowns that take 15 seconds to understand.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    year: "2025",
    tags: ["Visual Thinking", "Information Design", "Figma", "Clarity"],
    idea: "Why do people drop off from reading tech papers? Because the cognitive load is too high. Can we turn abstract ideas into intuitive visual mental models?",
    process: {
      tools: ["Figma", "Claude 3.5 Sonnet for abstraction", "After Effects"],
      method: "Distilled technical papers down to 1 core metaphor per frame, using color-coded spatial arrows and minimalist typography.",
    },
    output: "5 visual breakdowns on Neural Attention, Latent Space Traversal, and Edge Compute that generated 140k+ impressions.",
    learning: {
      whatWorked: "Removing 60% of the text and relying on a single geometric relationship made retention skyrocket.",
      whatDidnt: "Decorative 3D illustrations distracted from comprehension; flat high-contrast 2D diagrams performed best.",
    },
  },
  {
    id: "analog-frames-digital-edits",
    slug: "analog-frames-digital-edits",
    title: "35mm Mechanical Frames × AI Inpainting",
    category: "Visual Content",
    categoryKey: "visual",
    summary: "Capturing real-world street frames on film, then extending environments using generative diffusion.",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80",
    year: "2025",
    tags: ["Leica M6", "Photoshop Generative Fill", "Analog Film"],
    idea: "Exploring the boundary where physical optics end and synthetic digital continuation begins.",
    process: {
      tools: ["Leica 35mm Film Camera", "Epson V600 Scanner", "Photoshop AI"],
      method: "Shot high-contrast architectural street scenes on Kodak Tri-X 400, scanned at 4800dpi, and outpainted surreal architectural geometry into the negative space.",
    },
    output: "A hybrid physical-digital photo series exploring urban isolation.",
    learning: {
      whatWorked: "The organic film grain acted as a natural noise texture that blended seamlessly with diffusion outpainting.",
      whatDidnt: "Automated prompts tended to invent modern objects; careful negative prompting was needed to preserve the timeless aesthetic.",
    },
  },
  {
    id: "rhythm-cut-editing",
    slug: "rhythm-cut-editing",
    title: "Pacing & Negative Space in Short-Form Video",
    category: "Editing Work",
    categoryKey: "editing",
    summary: "An experiment in slowing down video pacing in an era of hyperactive short-form content.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    year: "2024",
    tags: ["Premiere Pro", "Sound Design", "Video Editing", "Pacing"],
    idea: "Can calm, deliberate pacing and atmospheric sound design outperform fast-cut TikTok/Reels formats in engagement?",
    process: {
      tools: ["Premiere Pro", "Ableton Live for spatial sound", "Sony FX3"],
      method: "Constructed 45-second micro-documentaries with 4-second minimum shot holds and binaural room tone.",
    },
    output: "A 3-part micro-series on makers, creators, and solitary thinkers.",
    learning: {
      whatWorked: "Average watch percentage was 82%, proving that intentional quietness stands out in loud feeds.",
      whatDidnt: "The first 1.5 seconds still needs an immediate visual anchor or hook to prevent instant swipe-away.",
    },
  },
];
