"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminGuard } from "@/components/admin/AdminGuard";
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
} from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    postsCount: 0,
    galleryCount: 0,
    workCount: 0,
    loading: true,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const [postsRes, galleryRes, workRes] = await Promise.all([
          fetch("/api/blog"),
          fetch("/api/gallery"),
          fetch("/api/work"),
        ]);
        const postsData = await postsRes.json();
        const galleryData = await galleryRes.json();
        const workData = await workRes.json();

        setStats({
          postsCount: postsData.posts?.length || 0,
          galleryCount: galleryData.items?.length || 0,
          workCount: workData.items?.length || 0,
          loading: false,
        });
      } catch (e) {
        console.error("Error loading admin stats", e);
        setStats((prev) => ({ ...prev, loading: false }));
      }
    }
    loadStats();
  }, []);

  return (
    <AdminGuard>
      <div className="pt-32 pb-24 bg-[#0A0A0C] min-h-screen text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* HEADER */}
          <div className="space-y-4 mb-12 pb-8 border-b border-white/10">
            <div className="flex items-center gap-3">
              <Badge variant="orange" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
                Private Studio Control Center
              </Badge>
              <span className="text-xs text-zinc-500 font-mono">AUTHORIZED ONLY</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Amaan&apos;s Private Studio
            </h1>

            <p className="text-zinc-400 text-base sm:text-lg max-w-2xl leading-relaxed">
              Create, edit, and publish your blogs, photography frames, and project case stories securely. These publishing controls are completely private and hidden from public visitors.
            </p>
          </div>

          {/* QUICK METRICS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-3xl bg-zinc-900/60 border border-white/10 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#FF5E14]" />
                <span>Live Blog Articles</span>
              </div>
              <div className="text-3xl font-black text-white">
                {stats.loading ? "..." : stats.postsCount}
              </div>
              <Link
                href="/blog"
                target="_blank"
                className="text-xs text-[#FF7A1A] font-bold flex items-center gap-1 hover:underline pt-1"
              >
                <span>View Public Page</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            <div className="p-6 rounded-3xl bg-zinc-900/60 border border-white/10 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#FF5E14]" />
                <span>Gallery Visuals</span>
              </div>
              <div className="text-3xl font-black text-white">
                {stats.loading ? "..." : stats.galleryCount}
              </div>
              <Link
                href="/gallery"
                target="_blank"
                className="text-xs text-[#FF7A1A] font-bold flex items-center gap-1 hover:underline pt-1"
              >
                <span>View Public Page</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            <div className="p-6 rounded-3xl bg-zinc-900/60 border border-white/10 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#FF5E14]" />
                <span>Project Case Stories</span>
              </div>
              <div className="text-3xl font-black text-white">
                {stats.loading ? "..." : stats.workCount}
              </div>
              <Link
                href="/work"
                target="_blank"
                className="text-xs text-[#FF7A1A] font-bold flex items-center gap-1 hover:underline pt-1"
              >
                <span>View Public Page</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* 3 CORE PUBLISHING STUDIOS */}
          <div className="space-y-6">
            <h2 className="text-xl font-black text-white uppercase tracking-wider text-xs text-zinc-400">
              Content Publishing Modules
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 1. Blog Publisher */}
              <div className="p-8 rounded-3xl bg-zinc-900/70 border border-white/10 flex flex-col justify-between space-y-6 hover:border-[#FF5E14]/40 transition-all shadow-xl">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FF5E14]/15 border border-[#FF5E14]/30 text-[#FF5E14] flex items-center justify-center">
                    <PenTool className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Write Blog Article</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Rich Markdown editor with bold formatting, heading hierarchy, live SERP preview, and SEO Meta Title/Description controls.
                  </p>
                </div>

                <Button href="/blog/new" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                  Open Blog Studio
                </Button>
              </div>

              {/* 2. Gallery Studio */}
              <div className="p-8 rounded-3xl bg-zinc-900/70 border border-white/10 flex flex-col justify-between space-y-6 hover:border-[#FF5E14]/40 transition-all shadow-xl">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FF5E14]/15 border border-[#FF5E14]/30 text-[#FF5E14] flex items-center justify-center">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Upload Gallery Frame</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Upload new photography frames, portraits, and visual experiments with custom aspect ratio masonry card previews.
                  </p>
                </div>

                <Button href="/gallery/new" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                  Open Gallery Studio
                </Button>
              </div>

              {/* 3. Work Storytelling Studio */}
              <div className="p-8 rounded-3xl bg-zinc-900/70 border border-white/10 flex flex-col justify-between space-y-6 hover:border-[#FF5E14]/40 transition-all shadow-xl">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FF5E14]/15 border border-[#FF5E14]/30 text-[#FF5E14] flex items-center justify-center">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Publish Project Story</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    4-step case breakdown (Idea &rarr; Process &rarr; Output &rarr; Learning) with dedicated Google SEO metadata and detail view.
                  </p>
                </div>

                <Button href="/work/new" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                  Open Work Studio
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}
