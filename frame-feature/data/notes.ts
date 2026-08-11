export interface NoteItem {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: "Visuals" | "AI" | "Content" | "Workflows";
  categoryKey: "visuals" | "ai" | "content" | "workflows";
  readTime: string;
  summary: string;
  content: string[];
  takeaway: string;
}

export const notesData: NoteItem[] = [
  {
    id: "n1",
    slug: "ai-speeds-up-creation-not-thinking",
    title: "AI Speeds Up Creation. It Doesn't Decide What Matters.",
    date: "Feb 2025",
    category: "AI",
    categoryKey: "ai",
    readTime: "2 min",
    summary: "Generative tools give you infinite output in seconds. But the question is never 'can you generate it?'—it's 'is it worth saying?'",
    content: [
      "AI makes generating images and copy essentially free in terms of time and effort.",
      "Because output is frictionless, the web is drowning in content that looks polished but says absolutely nothing.",
      "The tool cannot decide:",
      "• What point of view to take.",
      "• Which specific frame communicates the emotion.",
      "• Why the audience should care in the first place.",
      "AI is the camera, not the eye.",
    ],
    takeaway: "Mastery in the AI era is not prompt syntax. It is taste, clarity of thought, and curation.",
  },
  {
    id: "n2",
    slug: "frame-before-you-shoot",
    title: "The Frame is the Filter: Why Composition Comes First",
    date: "Jan 2025",
    category: "Visuals",
    categoryKey: "visuals",
    readTime: "1 min",
    summary: "Good photography is not about what you include. It is about what you deliberately choose to leave outside the border.",
    content: [
      "Every frame is a choice of what to exclude.",
      "When an image feels confusing, 90% of the time it is because too many competing elements are fighting for attention.",
      "Simplify the background.",
      "Give the subject breathing room.",
      "Let negative space do the heavy lifting.",
    ],
    takeaway: "If it doesn't strengthen the idea, remove it from the frame.",
  },
  {
    id: "n3",
    slug: "clarity-beats-cleverness",
    title: "Clarity Over Cleverness in Digital Content",
    date: "Jan 2025",
    category: "Content",
    categoryKey: "content",
    readTime: "2 min",
    summary: "Most content fails not because the idea is bad, but because it is wrapped in jargon and unnecessary complexity.",
    content: [
      "People do not have attention span deficits—they have low tolerance for confusion.",
      "If someone cannot understand your premise within 3 seconds, they leave.",
      "Structure your thoughts like an inverted pyramid:",
      "1. The Core Insight (Instant)",
      "2. The Context / Evidence (Brief)",
      "3. The Practical Application (Actionable)",
    ],
    takeaway: "Clear communication is an act of empathy for the viewer's time.",
  },
  {
    id: "n4",
    slug: "my-daily-ai-visual-workflow",
    title: "My 4-Step Daily Visual & AI Workflow",
    date: "Dec 2024",
    category: "Workflows",
    categoryKey: "workflows",
    readTime: "2 min",
    summary: "How I move from raw observation to published visual output without getting lost in tool rabbit holes.",
    content: [
      "1. Observe & Note: Capture raw screenshots, street frames, or written fragments with zero judgment.",
      "2. Synthesize with LLMs: Feed raw notes into Claude/GPT to cluster core themes and find the sharpest angle.",
      "3. Visual Generation / Capture: Shoot or generate 20 variations focusing strictly on light and composition.",
      "4. Ruthless Curation: Pick only the single strongest visual and pair it with maximum 3 sentences.",
    ],
    takeaway: "A tight constraints-based workflow prevents tool fatigue.",
  },
];
