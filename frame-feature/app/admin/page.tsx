"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { ContentManager } from "@/components/admin/ContentManager";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  ShieldCheck,
  PenTool,
  Image as ImageIcon,
  Briefcase,
  ArrowRight,
  Sparkles,
  FileText,
  Layers,
  Flame,
  ExternalLink,
  MessageSquare,
  LayoutDashboard,
  Users,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"blogs" | "gallery" | "work" | "notes">("blogs");
  const [stats, setStats] = useState({
    postsCount: 0,
    galleryCount: 0,
    workCount: 0,
    notesCount: 0,
    loading: true,
  });

  const loadStats = async () => {
    try {
      const [postsRes, galleryRes, workRes, notesRes] = await Promise.all([
        fetch("/api/blog?all=true"),
        fetch("/api/gallery?all=true"),
        fetch("/api/work?all=true"),
        fetch("/api/notes?all=true"),
      ]);
      const postsData = await postsRes.json();
      const galleryData = await galleryRes.json();
      const workData = await workRes.json();
      const notesData = await notesRes.json();

      setStats({
        postsCount: postsData.posts?.length || 0,
        galleryCount: galleryData.items?.length || 0,
        workCount: workData.items?.length || 0,
        notesCount: notesData.items?.length || 0,
        loading: false,
      });
    } catch (e) {
      console.error("Error loading admin stats", e);
      setStats((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <AdminGuard>
      <div className="pt-32 pb-24 bg-[#0A0A0C] min-h-screen text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* HEADER */}
          <div className="space-y-4 pb-8 border-b border-white/10">
            <div className="flex items-center gap-3">
              <Badge variant="orange" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
                Studio Content Management System
              </Badge>
              <span className="text-xs text-zinc-500 font-mono">ROLE: AUTHENTICATED ADMIN</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  Frame Feature CMS
                </h1>
                <p className="text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed mt-2">
                  Create, draft, publish, search, and manage all your visual storytelling content in real-time.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link href="/studio/blog">
                  <Button size="sm" icon={<PenTool className="w-4 h-4" />}>
                    Write Article
                  </Button>
                </Link>
                <Link href="/studio/gallery">
                  <Button variant="secondary" size="sm" icon={<ImageIcon className="w-4 h-4" />}>
                    Upload Visual
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* QUICK METRICS BAR */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <button
              onClick={() => setActiveTab("blogs")}
              className={`text-left p-6 rounded-3xl border transition-all cursor-pointer ${
                activeTab === "blogs"
                  ? "bg-[#18191D] border-[#FF5E14]/50 shadow-[0_0_20px_rgba(255,94,20,0.15)]"
                  : "bg-zinc-900/60 border-white/8 hover:border-white/20"
              }`}
            >
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#FF5E14]" />
                  <span>Blog Articles</span>
                </div>
                {activeTab === "blogs" && (
                  <span className="w-2 h-2 rounded-full bg-[#FF5E14]" />
                )}
              </div>
              <div className="text-3xl font-black text-white mt-2">
                {stats.loading ? "..." : stats.postsCount}
              </div>
              <p className="text-[11px] text-zinc-500 mt-1">Articles in database</p>
            </button>

            <button
              onClick={() => setActiveTab("gallery")}
              className={`text-left p-6 rounded-3xl border transition-all cursor-pointer ${
                activeTab === "gallery"
                  ? "bg-[#18191D] border-[#FF5E14]/50 shadow-[0_0_20px_rgba(255,94,20,0.15)]"
                  : "bg-zinc-900/60 border-white/8 hover:border-white/20"
              }`}
            >
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#FF5E14]" />
                  <span>Gallery Visuals</span>
                </div>
                {activeTab === "gallery" && (
                  <span className="w-2 h-2 rounded-full bg-[#FF5E14]" />
                )}
              </div>
              <div className="text-3xl font-black text-white mt-2">
                {stats.loading ? "..." : stats.galleryCount}
              </div>
              <p className="text-[11px] text-zinc-500 mt-1">Visual frames &amp; photos</p>
            </button>

            <button
              onClick={() => setActiveTab("work")}
              className={`text-left p-6 rounded-3xl border transition-all cursor-pointer ${
                activeTab === "work"
                  ? "bg-[#18191D] border-[#FF5E14]/50 shadow-[0_0_20px_rgba(255,94,20,0.15)]"
                  : "bg-zinc-900/60 border-white/8 hover:border-white/20"
              }`}
            >
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-[#FF5E14]" />
                  <span>Project Case Stories</span>
                </div>
                {activeTab === "work" && (
                  <span className="w-2 h-2 rounded-full bg-[#FF5E14]" />
                )}
              </div>
              <div className="text-3xl font-black text-white mt-2">
                {stats.loading ? "..." : stats.workCount}
              </div>
              <p className="text-[11px] text-zinc-500 mt-1">Case study workflows</p>
            </button>

            <button
              onClick={() => setActiveTab("notes")}
              className={`text-left p-6 rounded-3xl border transition-all cursor-pointer ${
                activeTab === "notes"
                  ? "bg-[#18191D] border-[#FF5E14]/50 shadow-[0_0_20px_rgba(255,94,20,0.15)]"
                  : "bg-zinc-900/60 border-white/8 hover:border-white/20"
              }`}
            >
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#FF5E14]" />
                  <span>Notes Stream</span>
                </div>
                {activeTab === "notes" && (
                  <span className="w-2 h-2 rounded-full bg-[#FF5E14]" />
                )}
              </div>
              <div className="text-3xl font-black text-white mt-2">
                {stats.loading ? "..." : stats.notesCount}
              </div>
              <p className="text-[11px] text-zinc-500 mt-1">Micro-insights &amp; notes</p>
            </button>
          </div>

          {/* TAB NAVIGATION PILLS */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#141518] border border-white/10 overflow-x-auto">
            <button
              onClick={() => setActiveTab("blogs")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                activeTab === "blogs"
                  ? "bg-[#FF5E14] text-white shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Blogs &amp; Insights</span>
            </button>

            <button
              onClick={() => setActiveTab("gallery")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                activeTab === "gallery"
                  ? "bg-[#FF5E14] text-white shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Visual Gallery</span>
            </button>

            <button
              onClick={() => setActiveTab("work")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                activeTab === "work"
                  ? "bg-[#FF5E14] text-white shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Flame className="w-4 h-4" />
              <span>Projects &amp; Case Studies</span>
            </button>

            <button
              onClick={() => setActiveTab("notes")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                activeTab === "notes"
                  ? "bg-[#FF5E14] text-white shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Notes &amp; Thoughts</span>
            </button>
          </div>

          {/* ACTIVE CONTENT MANAGER TABLE */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#121316]/60 border border-white/10 shadow-2xl backdrop-blur-xl">
            {activeTab === "blogs" && (
              <ContentManager
                title="Blog Articles & Insights"
                description="Manage all long-form articles, toggle draft/published status, and update SEO metadata."
                apiEndpoint="/api/blog"
                createHref="/admin/blog"
                viewHrefPrefix="/blog"
                type="blog"
              />
            )}

            {activeTab === "gallery" && (
              <ContentManager
                title="Visual Gallery Frames"
                description="Manage photography frames, prompt visual experiments, and aspect ratios."
                apiEndpoint="/api/gallery"
                createHref="/admin/gallery"
                viewHrefPrefix="/gallery"
                type="gallery"
              />
            )}

            {activeTab === "work" && (
              <ContentManager
                title="Projects & Work Case Studies"
                description="Manage 4-part case studies (Idea, Process, Output, Learning)."
                apiEndpoint="/api/work"
                createHref="/admin/project"
                viewHrefPrefix="/work"
                type="work"
              />
            )}

            {activeTab === "notes" && (
              <ContentManager
                title="Short Notes & Experiments"
                description="Manage micro-thoughts, quick takeaways, and embedded social updates."
                apiEndpoint="/api/notes"
                createHref="/admin/note"
                viewHrefPrefix="/notes"
                type="notes"
              />
            )}
          </div>

          {/* STUDIO MODULE LINKS */}
          <div className="pt-8 border-t border-white/10 space-y-6">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Quick Studio Creators
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/8 flex flex-col justify-between space-y-4 hover:border-white/20 transition-all">
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-[#FF5E14]/15 border border-[#FF5E14]/30 text-[#FF5E14] flex items-center justify-center">
                    <PenTool className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Blog Studio</h4>
                  <p className="text-xs text-zinc-500">Markdown writer with SERP preview</p>
                </div>
                <Button href="/admin/blog" size="sm" variant="secondary">
                  Open Writer
                </Button>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/8 flex flex-col justify-between space-y-4 hover:border-white/20 transition-all">
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-[#FF5E14]/15 border border-[#FF5E14]/30 text-[#FF5E14] flex items-center justify-center">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Gallery Studio</h4>
                  <p className="text-xs text-zinc-500">Upload high-res frames &amp; aspect ratios</p>
                </div>
                <Button href="/admin/gallery" size="sm" variant="secondary">
                  Upload Visual
                </Button>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/8 flex flex-col justify-between space-y-4 hover:border-white/20 transition-all">
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-[#FF5E14]/15 border border-[#FF5E14]/30 text-[#FF5E14] flex items-center justify-center">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Work Studio</h4>
                  <p className="text-xs text-zinc-500">4-step case study breakdown</p>
                </div>
                <Button href="/admin/project" size="sm" variant="secondary">
                  Create Case Story
                </Button>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/8 flex flex-col justify-between space-y-4 hover:border-white/20 transition-all">
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-[#FF5E14]/15 border border-[#FF5E14]/30 text-[#FF5E14] flex items-center justify-center">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Notes Studio</h4>
                  <p className="text-xs text-zinc-500">Fast thoughts &amp; social embeds</p>
                </div>
                <Button href="/admin/note" size="sm" variant="secondary">
                  Write Note
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}
