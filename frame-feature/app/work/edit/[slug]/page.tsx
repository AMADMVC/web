"use client";

import React, { useState, useTransition, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Sparkles,
  Lightbulb,
  Wrench,
  Image as ImageIcon,
  BookOpen,
  ArrowRight,
  Search,
  Globe,
  CheckCircle2,
  AlertCircle,
  Pencil,
  Loader2,
} from "lucide-react";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { ImageUploadInput } from "@/components/ui/ImageUploadInput";

export default function EditWorkProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: editSlug } = use(params);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Project Basics
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState<
    "Visual Content" | "AI Experiments" | "Content Formats" | "Editing Work"
  >("AI Experiments");
  const [summary, setSummary] = useState("");
  const [image, setImage] = useState("");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [tags, setTags] = useState("");

  // Storytelling 4-Step Structure
  const [idea, setIdea] = useState("");
  const [tools, setTools] = useState("");
  const [processMethod, setProcessMethod] = useState("");
  const [output, setOutput] = useState("");
  const [whatWorked, setWhatWorked] = useState("");
  const [whatDidnt, setWhatDidnt] = useState("");

  // SEO
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [showSeoMenu, setShowSeoMenu] = useState(true);

  // Load existing item
  useEffect(() => {
    fetch(`/api/work?slug=${editSlug}`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.item) {
          setErrorMsg("Project not found.");
          setLoading(false);
          return;
        }
        const item = data.item;
        setTitle(item.title || "");
        setSlug(item.slug || "");
        setCategory(item.category || "AI Experiments");
        setSummary(item.summary || "");
        setImage(item.image || "");
        setYear(item.year || new Date().getFullYear().toString());
        setTags(Array.isArray(item.tags) ? item.tags.join(", ") : item.tags || "");
        setIdea(item.idea || "");
        setTools(
          Array.isArray(item.process?.tools)
            ? item.process.tools.join(", ")
            : item.process?.tools || ""
        );
        setProcessMethod(item.process?.method || "");
        setOutput(item.output || "");
        setWhatWorked(item.learning?.whatWorked || "");
        setWhatDidnt(item.learning?.whatDidnt || "");
        setMetaTitle(item.metaTitle || `${item.title} | Frame Feature`);
        setMetaDescription(item.metaDescription || item.summary || "");
        setLoading(false);
      })
      .catch(() => {
        setErrorMsg("Failed to load project.");
        setLoading(false);
      });
  }, [editSlug]);

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!title.trim() || !image.trim() || !idea.trim()) {
      setErrorMsg("Please fill in the Project Title, Image, and Idea.");
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch("/api/work", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title.trim(),
            slug: slug.trim() || slugify(title),
            metaTitle: metaTitle.trim() || `${title} | Frame Feature Work`,
            metaDescription:
              metaDescription.trim() || summary.trim() || idea.slice(0, 155),
            category,
            summary: summary.trim() || idea.slice(0, 140),
            image: image.trim(),
            year: year.trim() || new Date().getFullYear().toString(),
            tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
            idea: idea.trim(),
            tools: tools.split(",").map((t) => t.trim()).filter(Boolean),
            processMethod: processMethod.trim(),
            output: output.trim(),
            whatWorked: whatWorked.trim(),
            whatDidnt: whatDidnt.trim(),
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to update project.");

        setSuccessMsg("Project updated! Redirecting...");
        setTimeout(() => {
          router.push(`/work/${data.item.slug}`);
          router.refresh();
        }, 1000);
      } catch (err: unknown) {
        setErrorMsg(err instanceof Error ? err.message : "Unexpected error.");
      }
    });
  };

  return (
    <AdminGuard>
      <div className="pt-32 pb-24 bg-[#0A0A0C] min-h-screen text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            segments={[
              { label: "Work", href: "/work" },
              { label: "Edit Project" },
            ]}
          />

          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
            <div>
              <Badge variant="orange" icon={<Pencil className="w-3.5 h-3.5" />}>
                Edit Mode
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-black text-white mt-2">
                Edit Project Case Story
              </h1>
              <p className="text-zinc-400 text-sm mt-1">
                Slug:{" "}
                <code className="text-[#FF7A1A] font-mono">/work/{editSlug}</code>
              </p>
            </div>
            <Link
              href={`/work/${editSlug}`}
              className="text-xs font-bold text-zinc-400 hover:text-white flex items-center gap-1 self-start sm:self-auto"
            >
              <span>← Back to Project</span>
            </Link>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="flex items-center justify-center py-24 gap-3 text-zinc-400">
              <Loader2 className="w-6 h-6 animate-spin text-[#FF5E14]" />
              <span>Loading project data...</span>
            </div>
          )}

          {/* ALERTS */}
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

          {!loading && (
            <form onSubmit={handleUpdate} className="space-y-8">
              {/* 1. PROJECT BASICS */}
              <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/70 border border-white/10 space-y-6 shadow-2xl backdrop-blur-xl">
                <div className="text-xs font-bold uppercase tracking-wider text-[#FF7A1A] flex items-center gap-2 pb-2 border-b border-white/5">
                  <span>01. Project Header &amp; Overview</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-8 space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                        Project Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white font-bold text-lg focus:outline-none focus:border-[#FF5E14]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
                          URL Slug *
                        </label>
                        <input
                          type="text"
                          required
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
                          <option value="AI Experiments">AI Experiments</option>
                          <option value="Visual Content">Visual Content</option>
                          <option value="Content Formats">Content Formats</option>
                          <option value="Editing Work">Editing Work</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
                        Short Summary / Hook
                      </label>
                      <textarea
                        rows={2}
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-sm text-zinc-300 focus:outline-none focus:border-[#FF5E14]"
                      />
                    </div>
                  </div>

                  {/* Cover Image */}
                  <div className="lg:col-span-4 space-y-4">
                    <ImageUploadInput
                      label="Featured Image"
                      folder="work"
                      value={image}
                      onChange={setImage}
                    />

                    <div className="relative h-40 w-full rounded-2xl overflow-hidden bg-zinc-950 border border-white/10 shadow-inner">
                      {image ? (
                        <Image
                          src={image}
                          alt="Preview"
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

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-400 mb-1">
                          Year
                        </label>
                        <input
                          type="text"
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-white/10 text-xs text-zinc-300 focus:outline-none focus:border-[#FF5E14]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-400 mb-1">
                          Tags
                        </label>
                        <input
                          type="text"
                          placeholder="ComfyUI, Lens"
                          value={tags}
                          onChange={(e) => setTags(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-white/10 text-xs text-zinc-300 focus:outline-none focus:border-[#FF5E14]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. STORYTELLING */}
              <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/80 border border-white/10 space-y-6 shadow-2xl">
                <div className="text-xs font-bold uppercase tracking-wider text-[#FF7A1A] flex items-center gap-2 pb-2 border-b border-white/5">
                  <span>02. Storytelling Framework (Idea → Process → Output → Learning)</span>
                </div>

                {/* Idea */}
                <div className="p-5 rounded-2xl bg-zinc-950/70 border border-white/5 space-y-2">
                  <div className="text-xs font-bold uppercase text-[#FF7A1A] flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4" />
                    <span>01. The Idea *</span>
                  </div>
                  <textarea
                    rows={3}
                    required
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-sm text-zinc-200 focus:outline-none focus:border-[#FF5E14]"
                  />
                </div>

                {/* Process */}
                <div className="p-5 rounded-2xl bg-zinc-950/70 border border-white/5 space-y-3">
                  <div className="text-xs font-bold uppercase text-white flex items-center gap-1.5">
                    <Wrench className="w-4 h-4 text-zinc-400" />
                    <span>02. Process — Tools &amp; Method</span>
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">
                      Tools (comma-separated):
                    </label>
                    <input
                      type="text"
                      value={tools}
                      onChange={(e) => setTools(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-zinc-200 focus:outline-none focus:border-[#FF5E14]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">
                      Methodology:
                    </label>
                    <textarea
                      rows={3}
                      value={processMethod}
                      onChange={(e) => setProcessMethod(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-sm text-zinc-200 focus:outline-none focus:border-[#FF5E14]"
                    />
                  </div>
                </div>

                {/* Output */}
                <div className="p-5 rounded-2xl bg-zinc-950/70 border border-white/5 space-y-2">
                  <div className="text-xs font-bold uppercase text-white flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-zinc-400" />
                    <span>03. Output — Deliverable</span>
                  </div>
                  <textarea
                    rows={3}
                    value={output}
                    onChange={(e) => setOutput(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-sm text-zinc-200 focus:outline-none focus:border-[#FF5E14]"
                  />
                </div>

                {/* Learning */}
                <div className="p-5 rounded-2xl bg-[#FF5E14]/10 border border-[#FF5E14]/30 space-y-4">
                  <div className="text-xs font-bold uppercase text-[#FF7A1A] flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" />
                    <span>04. Learning — What Worked / What Didn&apos;t</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-emerald-400">
                        &bull; What Worked:
                      </label>
                      <textarea
                        rows={3}
                        value={whatWorked}
                        onChange={(e) => setWhatWorked(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-emerald-500/20 text-xs sm:text-sm text-zinc-200 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-rose-400">
                        &bull; What Didn&apos;t Work:
                      </label>
                      <textarea
                        rows={3}
                        value={whatDidnt}
                        onChange={(e) => setWhatDidnt(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-rose-500/20 text-xs sm:text-sm text-zinc-200 focus:outline-none focus:border-rose-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. SEO */}
              <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/80 border border-[#FF5E14]/30 space-y-6 shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-white/8">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-[#FF5E14]/20 text-[#FF5E14]">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">
                        SEO Meta Settings
                      </h3>
                      <p className="text-xs text-zinc-400">
                        How this project appears on Google.
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
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-7 space-y-3">
                      <div>
                        <div className="flex justify-between text-xs text-zinc-300 font-bold mb-1">
                          <span>Meta Title</span>
                          <span className="font-mono text-zinc-500">
                            {metaTitle.length}/60
                          </span>
                        </div>
                        <input
                          type="text"
                          value={metaTitle}
                          onChange={(e) => setMetaTitle(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF5E14]"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-zinc-300 font-bold mb-1">
                          <span>Meta Description</span>
                          <span className="font-mono text-zinc-500">
                            {metaDescription.length}/160
                          </span>
                        </div>
                        <textarea
                          rows={2}
                          value={metaDescription}
                          onChange={(e) => setMetaDescription(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-white/10 text-xs text-zinc-300 focus:outline-none focus:border-[#FF5E14]"
                        />
                      </div>
                    </div>

                    <div className="lg:col-span-5">
                      <div className="text-xs font-bold text-zinc-400 flex items-center gap-1 mb-2">
                        <Search className="w-3 h-3 text-[#FF5E14]" />
                        <span>Google Preview</span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-zinc-950 border border-white/10 text-xs space-y-1">
                        <div className="text-[11px] text-zinc-400 truncate">
                          framefeature.com/work/{slug || editSlug}
                        </div>
                        <div className="text-sm font-medium text-[#8AB4F8] line-clamp-1">
                          {metaTitle || title || "Meta Title"}
                        </div>
                        <div className="text-[11px] text-zinc-400 line-clamp-2">
                          {metaDescription || summary || "Meta description..."}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. SAVE BAR */}
              <div className="p-6 rounded-3xl bg-zinc-900/80 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-zinc-400">
                  Updates{" "}
                  <code className="text-[#FF7A1A]">data/work.json</code> and
                  goes live immediately.
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Link
                    href={`/work/${editSlug}`}
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
                    {isPending ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </AdminGuard>
  );
}
