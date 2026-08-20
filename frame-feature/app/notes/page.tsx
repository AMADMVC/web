"use client";

import React, { useState, useEffect } from "react";
import Script from "next/script";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { 
  Sparkles, 
  Clock, 
  Link2, 
  Trash2,
  AlertCircle
} from "lucide-react";
import { AdminOnly } from "@/components/admin/AdminOnly";
import { StoredNoteItem } from "@/utils/notesStorage";

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

export default function NotesPage() {
  const [dbNotes, setDbNotes] = useState<StoredNoteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    async function loadNotes() {
      try {
        const res = await fetch("/api/notes");
        const data = await res.json();
        if (data.items) {
          setDbNotes(data.items);
        }
      } catch (err) {
        console.error("Failed to load notes from database:", err);
      } finally {
        setLoading(false);
      }
    }
    loadNotes();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    const confirmed = window.confirm(
      `"${title}" thought note ko delete karna hai?`
    );
    if (!confirmed) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/notes?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setDbNotes((prev) => prev.filter((n) => n.id !== id));
      } else {
        alert("Failed to delete note. Please try again.");
      }
    } catch {
      alert("Network error occurred.");
    } finally {
      setDeletingId(null);
    }
  };

  const categories = ["All", "Visuals", "AI", "Content", "Workflows"];

  const filteredNotes =
    selectedCategory === "All"
      ? dbNotes
      : dbNotes.filter((n) => n.category === selectedCategory);

  // Trigger Twitter Widget load after notes change
  useEffect(() => {
    try {
      (window as any).twttr?.widgets?.load();
    } catch (e) {
      // Ignored
    }
  }, [filteredNotes]);

  return (
    <div className="pt-32 pb-24 bg-[#0A0A0C] min-h-screen text-white">
      {/* Load Twitter Widget SDK for rendering Tweet blockquotes */}
      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="lazyOnload"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb segments={[{ label: "Notes" }]} />

        {/* HERO */}
        <div className="mb-16 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <Badge variant="orange" icon={<Sparkles className="w-3.5 h-3.5" />}>
              Short Thoughts &bull; Learnings
            </Badge>

            {/* ADMIN SHORTCUT BAR */}
            <AdminOnly>
              <div className="flex items-center gap-3 p-2 rounded-2xl bg-zinc-900/90 border border-[#FF5E14]/30 shadow-xl backdrop-blur-md">
                <Link href="/admin">
                  <Button size="sm" variant="secondary">
                    CMS Dashboard
                  </Button>
                </Link>
                <Link href="/admin/note">
                  <Button size="sm">
                    + Write Note
                  </Button>
                </Link>
              </div>
            </AdminOnly>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Notes
          </h1>

          <div className="text-lg text-zinc-300 space-y-2">
            <p className="text-zinc-400">
              Short thoughts and learnings about: <strong className="text-white">content &bull; visuals &bull; AI &bull; workflows</strong>
            </p>
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 text-sm text-zinc-300 space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-[#FF7A1A]">
                What You&apos;ll Find:
              </div>
              <p>Observations &bull; Experiments &bull; Simple explanations</p>
              <p className="text-white font-semibold pt-1">
                No long articles. <span className="text-[#FF7A1A]">Only useful thinking.</span>
              </p>
            </div>
          </div>
        </div>

        {/* CATEGORY FILTER TABS */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#FF5E14] text-white shadow-[0_0_15px_rgba(255,94,20,0.3)]"
                    : "bg-zinc-900/80 text-zinc-400 hover:text-white border border-white/5"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* LOADING INDICATOR */}
        {loading ? (
          <div className="text-center py-20 space-y-4">
            <div className="w-8 h-8 rounded-full border-2 border-t-[#FF5E14] border-white/20 animate-spin mx-auto" />
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Loading notes...</p>
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="text-center py-20 p-8 rounded-3xl bg-zinc-900/30 border border-white/5 space-y-3">
            <AlertCircle className="w-8 h-8 text-zinc-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">No notes found</h3>
            <p className="text-zinc-500 text-xs">Publish your thoughts securely from the Admin Control Panel.</p>
          </div>
        ) : (
          /* NOTES STREAM */
          <div className="space-y-6 mb-24">
            {filteredNotes.map((note) => (
              <article
                key={note.id}
                id={note.slug}
                className="p-8 rounded-3xl bg-zinc-900/60 border border-white/8 hover:border-[#FF5E14]/40 transition-all duration-300 shadow-xl space-y-5 scroll-mt-28"
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#FF5E14]/15 border border-[#FF5E14]/30 text-[#FF7A1A] text-xs font-bold uppercase">
                    {note.category}
                  </span>

                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <span>{note.date}</span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#FF5E14]" />
                      {note.readTime}
                    </span>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{note.title}</h2>
                  <p className="text-zinc-400 text-sm leading-relaxed">{note.summary}</p>
                </div>

                {/* Social media embed container (Twitter blockquote / LinkedIn iframe) */}
                {note.socialEmbed && (
                  <div className="my-4 w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 p-2 flex justify-center [&_iframe]:mx-auto [&_blockquote]:mx-auto [&_blockquote]:bg-black [&_blockquote]:text-white">
                    <div 
                      className="w-full max-w-[550px] [&_iframe]:w-full [&_iframe]:border-none"
                      dangerouslySetInnerHTML={{ __html: note.socialEmbed }}
                    />
                  </div>
                )}

                {/* Note Content bullets */}
                {note.content && note.content.length > 0 && (
                  <div className="p-5 rounded-2xl bg-zinc-950/70 border border-white/5 space-y-2 text-sm text-zinc-300 leading-relaxed">
                    {note.content.map((paragraph, pIdx) => (
                      <p key={pIdx}>{paragraph}</p>
                    ))}
                  </div>
                )}

                {/* Core Takeaway */}
                <div className="p-4 rounded-xl bg-[#FF5E14]/10 border border-[#FF5E14]/25 text-xs sm:text-sm text-white font-medium">
                  <span className="text-[#FF7A1A] font-bold uppercase mr-1.5">Core Takeaway:</span>
                  {note.takeaway}
                </div>

                {/* ACTION BAR: SHARE & DELETE */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Share Note:</span>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(note.title)}&url=${encodeURIComponent(typeof window !== "undefined" ? `${window.location.origin}/notes#${note.slug}` : "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-zinc-950 border border-white/5 hover:border-[#FF5E14]/40 hover:text-[#1DA1F2] transition-all text-zinc-400"
                      title="Share on X / Twitter"
                    >
                      <TwitterIcon className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== "undefined" ? `${window.location.origin}/notes#${note.slug}` : "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-zinc-950 border border-white/5 hover:border-[#FF5E14]/40 hover:text-[#0A66C2] transition-all text-zinc-400"
                      title="Share on LinkedIn"
                    >
                      <LinkedinIcon className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => {
                        const shareUrl = `${window.location.origin}/notes#${note.slug}`;
                        navigator.clipboard.writeText(shareUrl);
                        alert("Note link copied to clipboard!");
                      }}
                      className="p-2 rounded-lg bg-zinc-950 border border-white/5 hover:border-[#FF5E14]/40 hover:text-white transition-all text-zinc-400 cursor-pointer"
                      title="Copy Deep Link"
                    >
                      <Link2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <AdminOnly>
                    <button
                      onClick={() => handleDelete(note.id, note.title)}
                      disabled={deletingId === note.id}
                      className="flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-400 font-bold uppercase tracking-wider transition-all disabled:opacity-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{deletingId === note.id ? "Deleting..." : "Delete Note"}</span>
                    </button>
                  </AdminOnly>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
