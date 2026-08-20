"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Sparkles,
  ArrowRight,
  Lightbulb,
  Wrench,
  Image as ImageIcon,
  BookOpen,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";
import { StoredProjectItem } from "@/utils/workStorage";
import { AdminOnly } from "@/components/admin/AdminOnly";

export default function WorkPage() {
  const [items, setItems] = useState<StoredProjectItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [loading, setLoading] = useState(true);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  const handleDelete = async (slug: string, title: string) => {
    const confirmed = window.confirm(
      `"${title}" ko permanently delete karna hai?\n\nYah action undo nahi ho sakti.`
    );
    if (!confirmed) return;

    setDeletingSlug(slug);
    try {
      const res = await fetch(`/api/work?slug=${encodeURIComponent(slug)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setItems((prev) => prev.filter((w) => w.slug !== slug));
      } else {
        alert("Delete failed. Please try again.");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setDeletingSlug(null);
    }
  };

  const categories = [
    "All",
    "Visual Content",
    "AI Experiments",
    "Content Formats",
    "Editing Work",
  ];

  useEffect(() => {
    async function loadWork() {
      try {
        const res = await fetch("/api/work");
        const data = await res.json();
        if (data.items) {
          setItems(data.items);
        }
      } catch (err) {
        console.error("Failed to load work items:", err);
      } finally {
        setLoading(false);
      }
    }
    loadWork();
  }, []);

  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((w) => w.category === selectedCategory);

  return (
    <div className="pt-32 pb-24 bg-[#0A0A0C] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb segments={[{ label: "Work" }]} />

        {/* HERO */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div className="max-w-3xl space-y-4">
            <Badge variant="orange" icon={<Sparkles className="w-3.5 h-3.5" />}>
              Experiments &bull; Projects &bull; Output
            </Badge>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              Work &amp; Case Stories
            </h1>

            <p className="text-xl text-zinc-300 leading-relaxed">
              This is where I share what I actually create. Real experiments, workflows, and learnings.
            </p>

            <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 text-xs text-zinc-400 max-w-md">
              <strong>Note:</strong> This is an evolving living workspace. It grows with every project.
            </div>
          </div>

          {/* ADMIN SHORTCUT BAR */}
          <AdminOnly>
            <div className="flex items-center gap-3 p-2 rounded-2xl bg-zinc-900/90 border border-[#FF5E14]/30 shadow-xl backdrop-blur-md">
              <Link href="/admin">
                <Button size="sm" variant="secondary">
                  CMS Dashboard
                </Button>
              </Link>
              <Link href="/admin/project">
                <Button size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
                  New Project
                </Button>
              </Link>
            </div>
          </AdminOnly>
        </div>

        {/* CATEGORY FILTER TABS */}
        <div className="flex flex-wrap items-center gap-2 mb-16">
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

        {/* WORK ITEMS STREAM */}
        {loading ? (
          <div className="py-20 text-center text-zinc-500 text-sm">
            Loading projects and stories...
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="p-16 rounded-3xl bg-zinc-900/40 border border-white/10 text-center space-y-4">
            <h3 className="text-2xl font-bold text-white">No projects found in this category</h3>
            <p className="text-zinc-400 text-sm max-w-md mx-auto">
              Publish your first project story using the dedicated storytelling studio.
            </p>
            <Button href="/admin/project" size="md">
              + Publish Project
            </Button>
          </div>
        ) : (
          <div className="space-y-16 mb-24">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                className="rounded-3xl bg-zinc-900/60 border border-white/8 p-6 sm:p-10 hover:border-[#FF5E14]/30 transition-all duration-300 shadow-2xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left: Image & Category (5 Cols) */}
                  <div className="lg:col-span-5 space-y-4">
                    <Link
                      href={`/work/${item.slug}`}
                      className="group block relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden bg-zinc-950 border border-white/5"
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        unoptimized
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[#FF7A1A] text-xs font-bold uppercase border border-[#FF5E14]/30">
                          {item.category}
                        </span>
                      </div>
                    </Link>

                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Idea -> Process -> Output -> Learning Format (7 Cols) */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link href={`/work/${item.slug}`}>
                          <h2 className="text-2xl sm:text-3xl font-black text-white hover:text-[#FF7A1A] transition-colors">
                            {item.title}
                          </h2>
                        </Link>
                        <p className="text-zinc-400 text-sm mt-1">{item.summary}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs text-zinc-500 font-bold">{item.year}</span>
                        <AdminOnly>
                          <Link
                            href={`/work/edit/${item.slug}`}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-[#FF5E14]/20 hover:border-[#FF5E14]/40 border border-white/10 text-zinc-400 hover:text-[#FF7A1A] text-xs font-bold transition-all"
                          >
                            <Pencil className="w-3 h-3" />
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(item.slug, item.title)}
                            disabled={deletingSlug === item.slug}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-red-900/40 hover:border-red-500/40 border border-white/10 text-zinc-500 hover:text-red-400 text-xs font-bold transition-all disabled:opacity-40 cursor-pointer"
                            title="Delete Case Study"
                          >
                            <Trash2 className="w-3 h-3" />
                            {deletingSlug === item.slug ? "..." : "Delete"}
                          </button>
                        </AdminOnly>
                      </div>
                    </div>

                    <div className="space-y-4 pt-2 border-t border-white/5">
                      {/* 1. Idea */}
                      <div className="p-4 rounded-2xl bg-zinc-950/60 border border-white/5 space-y-1">
                        <div className="text-xs font-bold uppercase text-[#FF7A1A] flex items-center gap-1.5">
                          <Lightbulb className="w-3.5 h-3.5" />
                          <span>Idea &bull; What I wanted to explore</span>
                        </div>
                        <p className="text-zinc-300 text-sm leading-relaxed">{item.idea}</p>
                      </div>

                      {/* 2. Process */}
                      <div className="p-4 rounded-2xl bg-zinc-950/60 border border-white/5 space-y-1">
                        <div className="text-xs font-bold uppercase text-white flex items-center gap-1.5">
                          <Wrench className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Process &bull; Tools &amp; Method Used</span>
                        </div>
                        <p className="text-zinc-300 text-sm leading-relaxed">
                          {item.process.method}
                        </p>
                        <div className="text-xs text-zinc-400 pt-1">
                          Tools:{" "}
                          <span className="text-zinc-200">{item.process.tools.join(", ")}</span>
                        </div>
                      </div>

                      {/* 3. Output */}
                      <div className="p-4 rounded-2xl bg-zinc-950/60 border border-white/5 space-y-1">
                        <div className="text-xs font-bold uppercase text-white flex items-center gap-1.5">
                          <ImageIcon className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Output &bull; Visual / Content</span>
                        </div>
                        <p className="text-zinc-300 text-sm leading-relaxed">{item.output}</p>
                      </div>

                      {/* 4. Learning */}
                      <div className="p-4 rounded-2xl bg-[#FF5E14]/10 border border-[#FF5E14]/30 space-y-2">
                        <div className="text-xs font-bold uppercase text-[#FF7A1A] flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Learning &bull; What worked / didn&apos;t</span>
                        </div>
                        <div className="text-xs sm:text-sm text-zinc-200 space-y-1 leading-relaxed">
                          <div>
                            <strong className="text-emerald-400">Worked:</strong>{" "}
                            {item.learning.whatWorked}
                          </div>
                          <div>
                            <strong className="text-rose-400">Didn&apos;t work:</strong>{" "}
                            {item.learning.whatDidnt}
                          </div>
                        </div>
                      </div>

                      {/* Link to detail */}
                      <div className="pt-2">
                        <Link
                          href={`/work/${item.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF7A1A] hover:text-white transition-colors"
                        >
                          <span>View Full Dedicated Case Page</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
