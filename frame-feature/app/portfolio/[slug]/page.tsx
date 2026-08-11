import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { portfolioData } from "@/data/portfolio";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles, CheckCircle2, TrendingUp, Calendar, Clock, Building2 } from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return portfolioData.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = portfolioData.find((p) => p.slug === slug);
  if (!item) return { title: "Project Not Found" };

  return {
    title: `${item.title} | Case Study | FRAME Studio`,
    description: item.shortDesc,
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = portfolioData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = portfolioData
    .filter((p) => p.id !== project.id)
    .slice(0, 2);

  return (
    <div className="pt-32 pb-24 bg-[#0A0A0C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          segments={[
            { label: "Portfolio", href: "/portfolio" },
            { label: project.title },
          ]}
        />

        {/* HERO BANNER */}
        <div className="max-w-4xl mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge variant="orange" icon={<Sparkles className="w-3.5 h-3.5" />}>
              {project.category}
            </Badge>
            <Badge variant="grey" icon={<Building2 className="w-3.5 h-3.5" />}>
              {project.client}
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="text-zinc-300 text-lg sm:text-xl mt-6 leading-relaxed">
            {project.shortDesc}
          </p>

          {/* Project Meta Bar */}
          <div className="mt-8 pt-6 border-t border-white/8 flex flex-wrap items-center gap-6 sm:gap-10 text-xs sm:text-sm text-zinc-400 font-semibold">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#FF5E14]" />
              <span>Released: {project.year}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#FF5E14]" />
              <span>Sprint Duration: {project.duration}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {project.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* FEATURED MAIN IMAGE */}
        <div className="relative w-full h-[50vh] sm:h-[65vh] rounded-3xl overflow-hidden mb-20 border border-white/10 shadow-2xl">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-transparent opacity-60" />
        </div>

        {/* METRICS SHOWCASE BAR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {project.metrics.map((m, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-zinc-900/70 border border-white/8 text-center space-y-2 hover:border-[#FF5E14]/40 transition-all"
            >
              <div className="text-4xl sm:text-5xl font-black text-[#FF5E14] flex items-center justify-center gap-1.5">
                <TrendingUp className="w-6 h-6" />
                <span>{m.metric}</span>
              </div>
              <div className="text-lg font-bold text-white">{m.title}</div>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto leading-relaxed">
                {m.description}
              </p>
            </div>
          ))}
        </div>

        {/* CASE STUDY NARRATIVE SECTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          {/* Main Narrative (8 Cols) */}
          <div className="lg:col-span-8 space-y-16">
            {/* Overview */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
                01. Project Overview
              </h2>
              <p className="text-zinc-300 text-base leading-relaxed">
                {project.overview}
              </p>
            </div>

            {/* Problem */}
            <div className="p-8 rounded-3xl bg-red-950/20 border border-red-500/20">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                02. The Challenge &amp; Bottlenecks
              </h2>
              <p className="text-zinc-300 text-base leading-relaxed">
                {project.problem}
              </p>
            </div>

            {/* Strategy */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
                03. Technical &amp; Design Strategy
              </h2>
              <p className="text-zinc-300 text-base leading-relaxed">
                {project.strategy}
              </p>
            </div>

            {/* Execution */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-6">
                04. Execution &amp; Key Milestones
              </h2>
              <div className="space-y-4">
                {project.execution.map((step, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-5 rounded-2xl bg-zinc-900/60 border border-white/5 flex items-start gap-4"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#FF5E14] shrink-0 mt-0.5" />
                    <span className="text-zinc-200 text-sm leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar CTA & Stats (4 Cols) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="p-8 rounded-3xl bg-zinc-900/80 border border-white/10 space-y-6 sticky top-28">
              <h3 className="text-xl font-bold text-white">Project Specs</h3>

              <div className="space-y-4 text-xs">
                <div className="flex justify-between pb-3 border-b border-white/5">
                  <span className="text-zinc-400">Client</span>
                  <span className="font-bold text-white">{project.client}</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-white/5">
                  <span className="text-zinc-400">Category</span>
                  <span className="font-bold text-[#FF7A1A]">{project.category}</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-white/5">
                  <span className="text-zinc-400">Year</span>
                  <span className="font-bold text-white">{project.year}</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-white/5">
                  <span className="text-zinc-400">Sprint Timeline</span>
                  <span className="font-bold text-white">{project.duration}</span>
                </div>
              </div>

              <div className="pt-2">
                <Button href="/contact" className="w-full" size="md">
                  Request Similar Project
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* MEDIA GALLERY SECTION */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mb-24">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-4xl font-black text-white">
                Interface &amp; Visual Showcase
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.gallery.map((g, gIdx) => (
                <div
                  key={gIdx}
                  className="rounded-3xl bg-zinc-900/60 border border-white/8 overflow-hidden"
                >
                  <div className="relative h-72 w-full bg-zinc-950">
                    <Image
                      src={g.image}
                      alt={g.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-white font-bold text-base">{g.title}</h4>
                    <p className="text-zinc-400 text-xs mt-1">{g.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RELATED PROJECTS */}
        {relatedProjects.length > 0 && (
          <div className="mb-24 pt-16 border-t border-white/8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                More Case Studies
              </h2>
              <Link href="/portfolio" className="text-sm font-bold text-[#FF7A1A] hover:underline">
                View All &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjects.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/portfolio/${rel.slug}`}
                  className="group rounded-3xl bg-zinc-900/50 border border-white/8 p-6 hover:border-[#FF5E14]/40 transition-all flex items-center gap-6"
                >
                  <div className="relative w-28 h-28 rounded-2xl overflow-hidden shrink-0 bg-zinc-950">
                    <Image src={rel.image} alt={rel.title} fill className="object-cover" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#FF7A1A] uppercase">
                      {rel.category}
                    </span>
                    <h4 className="text-lg font-bold text-white group-hover:text-[#FF7A1A] transition-colors mt-1 line-clamp-1">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-zinc-400 line-clamp-2 mt-1">{rel.shortDesc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
