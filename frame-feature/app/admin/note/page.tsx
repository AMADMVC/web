"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Eye,
  MessageSquare,
} from "lucide-react";
import { AdminGuard } from "@/components/admin/AdminGuard";

const TwitterIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export default function NewNotePage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState<"Visuals" | "AI" | "Content" | "Workflows">("AI");
  const [readTime, setReadTime] = useState("2 min");
  const [summary, setSummary] = useState("");
  const [rawContent, setRawContent] = useState("");
  const [takeaway, setTakeaway] = useState("");
  const [socialEmbed, setSocialEmbed] = useState("");

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!slug || slug === slugify(title)) {
      setSlug(slugify(val));
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!title.trim() || !summary.trim() || !takeaway.trim()) {
      setErrorMsg("Please fill in the Note Title, Summary, and Takeaway.");
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch("/api/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title.trim(),
            slug: slug.trim() || slugify(title),
            category,
            readTime: readTime.trim(),
            summary: summary.trim(),
            content: rawContent.split("\n").map((line) => line.trim()).filter(Boolean),
            takeaway: takeaway.trim(),
            socialEmbed: socialEmbed.trim(),
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to publish note.");
        }

        setSuccessMsg("Note published successfully! Redirecting...");
        setTimeout(() => {
          router.push("/admin");
          router.refresh();
        }, 1000);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setErrorMsg(err.message);
        } else {
          setErrorMsg("An unexpected error occurred.");
        }
      }
    });
  };

  return (
    <AdminGuard>
      <div className="pt-32 pb-24 bg-[#0A0A0C] min-h-screen text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            segments={[
              { label: "Admin", href: "/admin" },
              { label: "Notes", href: "/notes" },
              { label: "Publish Note" },
            ]}
          />

          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
            <div>
              <Badge variant="orange" icon={<Sparkles className="w-3.5 h-3.5" />}>
                Short-Form Thought Studio
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-black text-white mt-2">
                Write &amp; Share Note
              </h1>
            </div>

            <Link
              href="/notes"
              className="text-xs font-bold text-zinc-400 hover:text-white flex items-center gap-1 self-start sm:self-auto"
            >
              <span>&larr; Back to Notes Stream</span>
            </Link>
          </div>

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

          <form onSubmit={handlePublish} className="space-y-8">
            <div className="p-6 sm:p-10 rounded-3xl bg-zinc-900/70 border border-white/10 space-y-6 shadow-2xl backdrop-blur-xl">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Left Form Inputs */}
                <div className="md:col-span-7 space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                      Note Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Taste Beats Tooling in the AI Age"
                      value={title}
                      onChange={handleTitleChange}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white font-bold text-base placeholder-zinc-600 focus:outline-none focus:border-[#FF5E14]"
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
                        placeholder="taste-beats-tooling"
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
                        <option value="Visuals">Visuals &amp; Film</option>
                        <option value="Content">Content &amp; Copy</option>
                        <option value="Workflows">Workflows &amp; Tools</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
                        Read Time
                      </label>
                      <input
                        type="text"
                        placeholder="2 min"
                        value={readTime}
                        onChange={(e) => setReadTime(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-sm text-zinc-300 focus:outline-none focus:border-[#FF5E14]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
                      Short Summary / Hook *
                    </label>
                    <textarea
                      rows={2}
                      required
                      placeholder="A 1-2 sentence hook explanation for the stream preview..."
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-[#FF5E14]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
                      Note Content / Bullets (One paragraph per line)
                    </label>
                    <textarea
                      rows={6}
                      placeholder="Paragraph 1&#10;Paragraph 2&#10;• Bullet points or observations..."
                      value={rawContent}
                      onChange={(e) => setRawContent(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-[#FF5E14]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
                      Core Takeaway *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="The single ultimate lesson from this thought..."
                      value={takeaway}
                      onChange={(e) => setTakeaway(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-sm text-zinc-300 focus:outline-none focus:border-[#FF5E14]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <label className="text-xs font-semibold text-zinc-400">
                        Social Media Embed HTML (Twitter / LinkedIn)
                      </label>
                      <div className="flex gap-1.5">
                        <TwitterIcon className="w-3.5 h-3.5 text-[#1DA1F2]" />
                        <LinkedinIcon className="w-3.5 h-3.5 text-[#0A66C2]" />
                      </div>
                    </div>
                    <textarea
                      rows={3}
                      placeholder='Paste embed script code here (e.g. blockquote class="twitter-tweet" or iframe update update-urn...)'
                      value={socialEmbed}
                      onChange={(e) => setSocialEmbed(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-xs text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-[#FF5E14] font-mono"
                    />
                  </div>
                </div>

                {/* Right Live Preview Card */}
                <div className="md:col-span-5 space-y-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[#FF7A1A]">
                      <Eye className="w-3.5 h-3.5" />
                      Live Stream Preview
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">Real-time</span>
                  </div>

                  <div className="p-6 rounded-3xl bg-zinc-950 border border-white/10 space-y-4 shadow-inner">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FF5E14]/15 border border-[#FF5E14]/30 text-[#FF7A1A] text-[10px] font-bold uppercase">
                        {category}
                      </span>
                      <span className="text-[10px] text-zinc-500">{readTime} read</span>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-white line-clamp-2">
                        {title || "Untitled Thought"}
                      </h4>
                      <p className="text-xs text-zinc-400 line-clamp-2 mt-1">
                        {summary || "Your thought summary hook goes here..."}
                      </p>
                    </div>

                    {rawContent && (
                      <div className="p-4 rounded-xl bg-zinc-900 border border-white/5 space-y-1.5 text-xs text-zinc-300">
                        {rawContent.split("\n").map((line, idx) => (
                          <p key={idx}>{line}</p>
                        ))}
                      </div>
                    )}

                    {takeaway && (
                      <div className="p-3.5 rounded-xl bg-[#FF5E14]/10 border border-[#FF5E14]/25 text-[11px] text-white">
                        <span className="text-[#FF7A1A] font-bold uppercase mr-1.5">
                          Takeaway:
                        </span>
                        {takeaway}
                      </div>
                    )}

                    {socialEmbed && (
                      <div className="p-3 rounded-xl border border-dashed border-white/10 bg-zinc-900/60 text-center text-[10px] text-zinc-500">
                        Social post embed code successfully added.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* BOTTOM ACTION BAR */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-zinc-500">
                  Saves to <code className="text-[#FF7A1A]">Firebase Firestore</code>
                </span>

                <div className="flex items-center gap-3">
                  <Link
                    href="/admin"
                    className="px-5 py-2.5 rounded-full bg-zinc-800 text-zinc-300 hover:text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Cancel
                  </Link>

                  <Button
                    type="submit"
                    disabled={isPending}
                    size="md"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    {isPending ? "Publishing..." : "Publish Note"}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AdminGuard>
  );
}
