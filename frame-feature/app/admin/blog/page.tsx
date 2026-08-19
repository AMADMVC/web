"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Sparkles,
  Bold,
  Italic,
  Heading2,
  Heading3,
  Quote,
  List,
  ListOrdered,
  Code,
  Image as ImageIcon,
  Link as LinkIcon,
  Globe,
  Search,
  Eye,
  PenTool,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Columns,
} from "lucide-react";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { ImageUploadInput } from "@/components/ui/ImageUploadInput";

export default function NewBlogPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [viewMode, setViewMode] = useState<"split" | "edit" | "preview">("split");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState<"AI" | "Visuals" | "Content" | "Workflows" | "Engineering">("AI");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState(
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
  );
  const [tags, setTags] = useState("AI, Visuals, Content Strategy");
  const [rawContent, setRawContent] = useState(
    `## 1. Introduction\n\nStart typing your thoughts here. You can make text **bold for emphasis**, or *italic for nuance*.\n\n> "A great visual frame simplifies the complex."\n\n---\n\n## 2. Key Insights\n\n- Point one: **Always focus on clarity**\n- Point two: Remove unnecessary distractions\n- Point three: Use AI as a speed multiplier\n\n\`\`\`javascript\n// Quick code or prompt reference\nconst prompt = "Cinematic frame with volumetric lighting";\n\`\`\`\n\n---\n\n## 3. Conclusion\n\nSummarize the final learning and takeaway.`
  );

  // SEO Menu State
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [showSeoMenu, setShowSeoMenu] = useState(true);

  // Auto-slugify on title change if slug wasn't manually customized
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!slug || slug === slugify(title)) {
      setSlug(slugify(val));
    }
    if (!metaTitle || metaTitle === `${title} | Frame Feature`) {
      setMetaTitle(`${val} | Frame Feature`);
    }
  };

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  // Text formatting insertion helper
  const insertFormatting = (prefix: string, suffix: string = "", placeholder: string = "") => {
    const textarea = document.getElementById("content-editor") as HTMLTextAreaElement | null;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end) || placeholder;

    const replacement = `${prefix}${selectedText}${suffix}`;
    const newContent =
      textarea.value.substring(0, start) + replacement + textarea.value.substring(end);

    setRawContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selectedText.length
      );
    }, 0);
  };

  // Submit and Publish
  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!title.trim() || !rawContent.trim()) {
      setErrorMsg("Please provide both a Title and Article Content.");
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch("/api/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title.trim(),
            slug: slug.trim() || slugify(title),
            metaTitle: metaTitle.trim() || `${title} | Frame Feature`,
            metaDescription:
              metaDescription.trim() ||
              excerpt.trim() ||
              rawContent.slice(0, 150).replace(/[#*>\-_`]/g, "").trim(),
            excerpt: excerpt.trim() || rawContent.slice(0, 160).replace(/[#*>\-_`]/g, "").trim(),
            category,
            coverImage: coverImage.trim(),
            tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
            rawContent,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to publish blog.");
        }

        setSuccessMsg("Blog published successfully! Redirecting...");
        setTimeout(() => {
          router.push("/admin");
          router.refresh();
        }, 1200);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setErrorMsg(err.message);
        } else {
          setErrorMsg("An unexpected error occurred.");
        }
      }
    });
  };

  // Simple parser to preview markdown in real-time
  const renderFormattedPreview = (markdown: string) => {
    const lines = markdown.split("\n");
    return lines.map((line, idx) => {
      // Heading 2
      if (line.startsWith("## ")) {
        return (
          <h2 key={idx} className="text-2xl font-black text-white mt-8 mb-4 tracking-tight">
            {line.replace("## ", "")}
          </h2>
        );
      }
      // Heading 3
      if (line.startsWith("### ")) {
        return (
          <h3 key={idx} className="text-xl font-bold text-white mt-6 mb-3 tracking-tight">
            {line.replace("### ", "")}
          </h3>
        );
      }
      // Blockquote
      if (line.startsWith("> ")) {
        return (
          <blockquote
            key={idx}
            className="my-6 p-4 rounded-2xl bg-zinc-900/80 border-l-4 border-l-[#FF5E14] text-zinc-300 text-base italic"
          >
            {renderInline(line.replace("> ", ""))}
          </blockquote>
        );
      }
      // Horizontal Rule
      if (line.trim() === "---") {
        return <hr key={idx} className="my-8 border-white/10" />;
      }
      // Bullet list
      if (line.startsWith("- ") || line.startsWith("* ")) {
        return (
          <li key={idx} className="ml-5 list-disc text-zinc-300 my-1 text-sm sm:text-base leading-relaxed">
            {renderInline(line.substring(2))}
          </li>
        );
      }
      // Numbered list
      if (/^\d+\.\s/.test(line)) {
        return (
          <li key={idx} className="ml-5 list-decimal text-zinc-300 my-1 text-sm sm:text-base leading-relaxed">
            {renderInline(line.replace(/^\d+\.\s/, ""))}
          </li>
        );
      }
      // Empty line
      if (!line.trim()) {
        return <div key={idx} className="h-3" />;
      }
      // Regular paragraph
      return (
        <p key={idx} className="text-zinc-300 my-2 text-sm sm:text-base leading-relaxed">
          {renderInline(line)}
        </p>
      );
    });
  };

  // Helper for inline bold, italic, code
  const renderInline = (text: string) => {
    // Replace **bold**
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-extrabold text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return (
          <em key={i} className="italic text-zinc-200">
            {part.slice(1, -1)}
          </em>
        );
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code key={i} className="px-1.5 py-0.5 rounded bg-zinc-800 text-[#FF7A1A] text-xs font-mono">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  return (
    <AdminGuard>
      <div className="pt-28 pb-24 bg-[#0A0A0C] min-h-screen text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            segments={[
              { label: "Admin", href: "/admin" },
              { label: "Blog", href: "/blog" },
              { label: "Manual Publisher Studio" },
            ]}
          />

          {/* TOP BAR */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
            <div>
              <Badge variant="orange" icon={<Sparkles className="w-3.5 h-3.5" />}>
                Manual Blog &amp; SEO Publisher
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-black text-white mt-2">
                Create &amp; Publish Article
              </h1>
            </div>

            <div className="flex items-center gap-3">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-zinc-900 border border-white/10 rounded-xl p-1 text-xs">
                <button
                  type="button"
                  onClick={() => setViewMode("edit")}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                    viewMode === "edit" ? "bg-[#FF5E14] text-white shadow" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>Editor</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("split")}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all hidden md:flex ${
                    viewMode === "split" ? "bg-[#FF5E14] text-white shadow" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Columns className="w-3.5 h-3.5" />
                  <span>Split</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("preview")}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                    viewMode === "preview" ? "bg-[#FF5E14] text-white shadow" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>
              </div>

              <Button
                onClick={handlePublish}
                disabled={isPending}
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                {isPending ? "Publishing..." : "Publish Post"}
              </Button>
            </div>
          </div>

          {/* ALERT NOTIFICATIONS */}
          {errorMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-red-950/40 border border-red-500/40 text-red-300 text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
          {successMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-sm flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handlePublish} className="space-y-8">
            {/* ARTICLE MAIN METADATA */}
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-white/10 space-y-6 shadow-xl backdrop-blur-xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Title & Slug (8 Cols) */}
                <div className="lg:col-span-8 space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                      Article Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., How AI Transforms Visual Storytelling"
                      value={title}
                      onChange={handleTitleChange}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white font-bold text-lg placeholder-zinc-600 focus:outline-none focus:border-[#FF5E14]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
                        URL Slug * (e.g. /blog/your-slug)
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="how-ai-transforms-visual-storytelling"
                        value={slug}
                        onChange={(e) => setSlug(slugify(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-sm text-zinc-300 font-mono focus:outline-none focus:border-[#FF5E14]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
                        Category *
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-sm text-white focus:outline-none focus:border-[#FF5E14]"
                      >
                        <option value="AI">AI &amp; GenAI</option>
                        <option value="Visuals">Visuals &amp; Photography</option>
                        <option value="Content">Content &amp; Copy</option>
                        <option value="Workflows">Workflows &amp; Tools</option>
                        <option value="Engineering">Engineering &amp; Code</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
                      Short Excerpt / Summary
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Brief 1-2 sentence hook explaining what readers will learn..."
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-[#FF5E14]"
                    />
                  </div>
                </div>

                {/* Cover Image & Tags (4 Cols) */}
                <div className="lg:col-span-4 space-y-4">
                  <ImageUploadInput
                    label="Featured Cover Image"
                    folder="blog"
                    value={coverImage}
                    onChange={setCoverImage}
                  />

                  <div className="relative h-36 w-full rounded-2xl overflow-hidden bg-zinc-950 border border-white/10 shadow-inner">
                    {coverImage ? (
                      <Image
                        src={coverImage}
                        alt="Cover Preview"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center text-xs text-zinc-600">
                        No Image Selected
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      placeholder="AI Art, Midjourney, Visuals"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-white/10 text-xs text-zinc-300 focus:outline-none focus:border-[#FF5E14]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* DEDICATED SEO MENU & GOOGLE SEARCH PREVIEW */}
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/80 border border-[#FF5E14]/30 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/8">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#FF5E14]/20 text-[#FF5E14]">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-white flex items-center gap-2">
                      <span>SEO Control Menu</span>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-[#FF5E14]/20 text-[#FF7A1A] font-bold">
                        Google Search Optimization
                      </span>
                    </h2>
                    <p className="text-xs text-zinc-400">
                      Customize exactly how your blog post appears in Google search engine results.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowSeoMenu(!showSeoMenu)}
                  className="text-xs text-zinc-400 hover:text-white font-bold underline"
                >
                  {showSeoMenu ? "Collapse" : "Expand"}
                </button>
              </div>

              {showSeoMenu && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* SEO Input Fields (7 Cols) */}
                  <div className="lg:col-span-7 space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold text-zinc-300">
                          Meta Title (Google Headline)
                        </label>
                        <span
                          className={`text-[11px] font-mono ${
                            metaTitle.length > 60 ? "text-amber-400" : "text-zinc-500"
                          }`}
                        >
                          {metaTitle.length}/60 chars
                        </span>
                      </div>
                      <input
                        type="text"
                        placeholder="e.g., AI Visual Storytelling Guide | Frame Feature"
                        value={metaTitle}
                        onChange={(e) => setMetaTitle(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-sm text-white focus:outline-none focus:border-[#FF5E14]"
                      />
                      <p className="text-[11px] text-zinc-500 mt-1">
                        Recommended: 50-60 characters. Includes primary keyword and brand name.
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold text-zinc-300">
                          Meta Description (Google Snippet)
                        </label>
                        <span
                          className={`text-[11px] font-mono ${
                            metaDescription.length > 160 ? "text-amber-400" : "text-zinc-500"
                          }`}
                        >
                          {metaDescription.length}/160 chars
                        </span>
                      </div>
                      <textarea
                        rows={3}
                        placeholder="e.g., Discover how generative AI tools supercharge photography, short-form frames, and visual composition while preserving creative intent."
                        value={metaDescription}
                        onChange={(e) => setMetaDescription(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-sm text-zinc-300 focus:outline-none focus:border-[#FF5E14]"
                      />
                      <p className="text-[11px] text-zinc-500 mt-1">
                        Recommended: 120-155 characters. Clearly explains the post value to drive clicks.
                      </p>
                    </div>
                  </div>

                  {/* Google SERP Live Snippet Simulator (5 Cols) */}
                  <div className="lg:col-span-5 space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                      <Search className="w-3.5 h-3.5 text-[#FF5E14]" />
                      <span>Google Search Result Preview</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-zinc-950 border border-white/10 space-y-1 font-sans shadow-inner">
                      <div className="flex items-center gap-2 text-xs text-zinc-400">
                        <span className="w-4 h-4 rounded-full bg-[#FF5E14] text-white flex items-center justify-center text-[9px] font-black">
                          F
                        </span>
                        <span className="text-zinc-300 font-medium">framefeature.com</span>
                        <span className="text-zinc-600">&rsaquo;</span>
                        <span className="text-zinc-400 font-mono text-[11px]">
                          blog/{slug || "your-slug"}
                        </span>
                      </div>

                      <div className="text-base font-medium text-[#8AB4F8] hover:underline cursor-pointer line-clamp-1">
                        {metaTitle || title || "Your Article Meta Title Appears Here"}
                      </div>

                      <div className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                        {metaDescription ||
                          excerpt ||
                          "Your custom meta description snippet will appear here in Google search engine rankings..."}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* RICH FORMATTING TOOLBAR */}
            <div className="p-3 rounded-2xl bg-zinc-900/90 border border-white/10 flex flex-wrap items-center gap-1.5 sticky top-20 z-20 backdrop-blur-xl shadow-xl">
              <span className="text-[10px] font-bold text-zinc-500 uppercase px-2">Format:</span>

              <button
                type="button"
                onClick={() => insertFormatting("**", "**", "bold text")}
                className="p-2 rounded-xl bg-zinc-800/80 hover:bg-[#FF5E14] text-zinc-300 hover:text-white transition-colors"
                title="Bold (**text**)"
              >
                <Bold className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => insertFormatting("*", "*", "italic text")}
                className="p-2 rounded-xl bg-zinc-800/80 hover:bg-[#FF5E14] text-zinc-300 hover:text-white transition-colors"
                title="Italic (*text*)"
              >
                <Italic className="w-4 h-4" />
              </button>

              <span className="h-5 w-px bg-white/10 mx-1" />

              <button
                type="button"
                onClick={() => insertFormatting("## ", "\n", "Heading Title")}
                className="p-2 rounded-xl bg-zinc-800/80 hover:bg-[#FF5E14] text-zinc-300 hover:text-white transition-colors"
                title="Heading 2 (## Title)"
              >
                <Heading2 className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => insertFormatting("### ", "\n", "Subheading")}
                className="p-2 rounded-xl bg-zinc-800/80 hover:bg-[#FF5E14] text-zinc-300 hover:text-white transition-colors"
                title="Heading 3 (### Subheading)"
              >
                <Heading3 className="w-4 h-4" />
              </button>

              <span className="h-5 w-px bg-white/10 mx-1" />

              <button
                type="button"
                onClick={() => insertFormatting("> ", "\n", "Quote text...")}
                className="p-2 rounded-xl bg-zinc-800/80 hover:bg-[#FF5E14] text-zinc-300 hover:text-white transition-colors"
                title="Blockquote (> Quote)"
              >
                <Quote className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => insertFormatting("- ", "\n", "List item")}
                className="p-2 rounded-xl bg-zinc-800/80 hover:bg-[#FF5E14] text-zinc-300 hover:text-white transition-colors"
                title="Bullet List (- item)"
              >
                <List className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => insertFormatting("1. ", "\n", "Numbered item")}
                className="p-2 rounded-xl bg-zinc-800/80 hover:bg-[#FF5E14] text-zinc-300 hover:text-white transition-colors"
                title="Numbered List (1. item)"
              >
                <ListOrdered className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => insertFormatting("```\n", "\n```", "code snippet")}
                className="p-2 rounded-xl bg-zinc-800/80 hover:bg-[#FF5E14] text-zinc-300 hover:text-white transition-colors"
                title="Code Block (```code```)"
              >
                <Code className="w-4 h-4" />
              </button>

              <span className="h-5 w-px bg-white/10 mx-1" />

              <button
                type="button"
                onClick={() => insertFormatting("[", "](https://example.com)", "Link text")}
                className="p-2 rounded-xl bg-zinc-800/80 hover:bg-[#FF5E14] text-zinc-300 hover:text-white transition-colors"
                title="Hyperlink [text](url)"
              >
                <LinkIcon className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => insertFormatting("\n---\n", "", "")}
                className="px-2.5 py-1.5 rounded-xl bg-zinc-800/80 hover:bg-[#FF5E14] text-zinc-300 hover:text-white text-xs font-mono transition-colors"
                title="Horizontal Divider (---)"
              >
                &mdash; Divider
              </button>
            </div>

            {/* CONTENT WORKSPACE (SPLIT OR FULL SCREEN) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Editor Pane (Left) */}
              {(viewMode === "split" || viewMode === "edit") && (
                <div
                  className={`${
                    viewMode === "split" ? "lg:col-span-6" : "lg:col-span-12"
                  } rounded-3xl bg-zinc-900/70 border border-white/10 p-6 space-y-3 shadow-2xl`}
                >
                  <div className="flex items-center justify-between text-xs text-zinc-400 font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <PenTool className="w-3.5 h-3.5 text-[#FF5E14]" />
                      Raw Content Editor (Markdown Formatted)
                    </span>
                    <span>{rawContent.split(/\s+/).filter(Boolean).length} words</span>
                  </div>

                  <textarea
                    id="content-editor"
                    rows={20}
                    required
                    value={rawContent}
                    onChange={(e) => setRawContent(e.target.value)}
                    placeholder="Write your formatted blog content here. Use **bold**, ## headings, - lists, > quotes..."
                    className="w-full h-[550px] p-4 rounded-2xl bg-zinc-950 border border-white/10 text-zinc-200 font-mono text-sm leading-relaxed focus:outline-none focus:border-[#FF5E14] resize-y"
                  />
                </div>
              )}

              {/* Live Rendered Preview Pane (Right) */}
              {(viewMode === "split" || viewMode === "preview") && (
                <div
                  className={`${
                    viewMode === "split" ? "lg:col-span-6" : "lg:col-span-12"
                  } rounded-3xl bg-zinc-950 border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl overflow-y-auto max-h-[630px]`}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs text-zinc-400 font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1.5 text-[#FF7A1A]">
                      <Eye className="w-3.5 h-3.5" />
                      Live Reader Preview
                    </span>
                    <span>Auto-Synced</span>
                  </div>

                  {/* Article Header Preview */}
                  <div className="space-y-3">
                    <span className="px-3 py-1 rounded-full bg-[#FF5E14]/20 text-[#FF7A1A] text-xs font-bold uppercase">
                      {category}
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      {title || "Untitled Article"}
                    </h1>
                    <p className="text-zinc-400 text-xs sm:text-sm italic">
                      {excerpt || "Excerpt description appears here..."}
                    </p>
                  </div>

                  {/* Rendered Body */}
                  <div className="pt-4 border-t border-white/5">
                    {renderFormattedPreview(rawContent)}
                  </div>
                </div>
              )}
            </div>

            {/* BOTTOM SUBMIT BAR */}
            <div className="p-6 rounded-3xl bg-zinc-900/80 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-zinc-400">
                Your article will be saved to <code className="text-[#FF7A1A]">Firebase Firestore</code> and live immediately.
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Link
                  href="/admin"
                  className="px-5 py-3 rounded-full bg-zinc-800 text-zinc-300 hover:text-white text-xs font-bold uppercase tracking-wider text-center flex-1 sm:flex-none"
                >
                  Cancel
                </Link>

                <Button
                  type="submit"
                  disabled={isPending}
                  size="lg"
                  className="flex-1 sm:flex-none"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  {isPending ? "Publishing..." : "Publish Article Now"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AdminGuard>
  );
}
