"use client";

import React, { useState } from "react";
import Link from "next/link";
import { notesData } from "@/data/notes";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Sparkles, Clock, ArrowRight, BookOpen } from "lucide-react";

export default function NotesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Visuals", "AI", "Content", "Workflows"];

  const filteredNotes =
    selectedCategory === "All"
      ? notesData
      : notesData.filter((n) => n.category === selectedCategory);

  return (
    <div className="pt-32 pb-24 bg-[#0A0A0C]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb segments={[{ label: "Notes" }]} />

        {/* HERO */}
        <div className="mb-16 space-y-4">
          <Badge variant="orange" icon={<Sparkles className="w-3.5 h-3.5" />}>
            Short Thoughts &bull; Learnings
          </Badge>

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

        {/* NOTES STREAM */}
        <div className="space-y-6 mb-24">
          {filteredNotes.map((note) => (
            <article
              key={note.id}
              className="p-8 rounded-3xl bg-zinc-900/60 border border-white/8 hover:border-[#FF5E14]/40 transition-all duration-300 shadow-xl space-y-5"
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

              {/* Note Content bullets */}
              <div className="p-5 rounded-2xl bg-zinc-950/70 border border-white/5 space-y-2 text-sm text-zinc-300 leading-relaxed">
                {note.content.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>

              {/* Core Takeaway */}
              <div className="p-4 rounded-xl bg-[#FF5E14]/10 border border-[#FF5E14]/25 text-xs sm:text-sm text-white font-medium">
                <span className="text-[#FF7A1A] font-bold uppercase mr-1.5">Core Takeaway:</span>
                {note.takeaway}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
