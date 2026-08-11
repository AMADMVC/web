import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllWorkItems, getWorkItemBySlug } from "@/utils/workStorage";
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
  ArrowLeft,
  Calendar,
  Share2,
  MessageCircle,
  Pencil,
} from "lucide-react";
import type { Metadata } from "next";
import { WorkAdminBar } from "@/components/work/WorkAdminBar";

export async function generateStaticParams() {
  const items = getAllWorkItems();
  return items.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getWorkItemBySlug(slug);
  if (!item) return { title: "Project Story Not Found | Frame Feature" };

  const metaTitle = item.metaTitle || `${item.title} | Frame Feature Work`;
  const metaDescription = item.metaDescription || item.summary || item.idea;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: item.tags,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: "article",
      images: [
        {
          url: item.image,
          width: 1200,
          height: 630,
          alt: item.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [item.image],
    },
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getWorkItemBySlug(slug);

  if (!item) {
    notFound();
  }

  const allItems = getAllWorkItems();
  const relatedItems = allItems.filter((w) => w.id !== item.id).slice(0, 2);

  return (
    <div className="pt-32 pb-24 bg-[#0A0A0C] min-h-screen text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          segments={[
            { label: "Work", href: "/work" },
            { label: item.title },
          ]}
        />

        {/* HEADER */}
        <div className="space-y-4 mb-12">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Badge variant="orange" icon={<Sparkles className="w-3.5 h-3.5" />}>
                {item.category}
              </Badge>
              <span className="text-xs text-zinc-500 font-semibold">{item.year}</span>
            </div>

            {/* Admin Edit & Delete — hidden from public */}
            <WorkAdminBar slug={item.slug} title={item.title} />
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {item.title}
          </h1>

          <p className="text-zinc-300 text-lg sm:text-xl leading-relaxed">
            {item.summary}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {item.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="px-3 py-1 rounded-lg bg-zinc-900 border border-white/5 text-xs text-zinc-300 font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* HERO IMAGE */}
        <div className="relative w-full h-[50vh] sm:h-[60vh] rounded-3xl overflow-hidden mb-16 border border-white/10 shadow-2xl bg-zinc-950">
          <Image
            src={item.image}
            alt={item.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 900px"
            unoptimized
          />
        </div>

        {/* PROJECT 4-STAGE STORYTELLING BREAKDOWN */}
        <div className="space-y-8 mb-20">
          {/* 1. Idea */}
          <div className="p-8 rounded-3xl bg-zinc-900/60 border border-white/8 space-y-3 shadow-xl">
            <div className="text-xs font-bold uppercase tracking-wider text-[#FF7A1A] flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              <span>01. Idea &mdash; What I Wanted to Explore</span>
            </div>
            <p className="text-zinc-200 text-base sm:text-lg leading-relaxed">{item.idea}</p>
          </div>

          {/* 2. Process */}
          <div className="p-8 rounded-3xl bg-zinc-900/60 border border-white/8 space-y-4 shadow-xl">
            <div className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Wrench className="w-4 h-4 text-zinc-400" />
              <span>02. Process &mdash; Tools &amp; Method Used</span>
            </div>
            <p className="text-zinc-300 text-base leading-relaxed">{item.process.method}</p>
            <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/5 text-xs text-zinc-400">
              <strong className="text-white">Tools in Workflow:</strong>{" "}
              {item.process.tools.join(", ")}
            </div>
          </div>

          {/* 3. Output */}
          <div className="p-8 rounded-3xl bg-zinc-900/60 border border-white/8 space-y-3 shadow-xl">
            <div className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-zinc-400" />
              <span>03. Output &mdash; Visual / Content</span>
            </div>
            <p className="text-zinc-300 text-base leading-relaxed">{item.output}</p>
          </div>

          {/* 4. Learning */}
          <div className="p-8 rounded-3xl bg-[#FF5E14]/10 border border-[#FF5E14]/30 space-y-4 shadow-xl">
            <div className="text-xs font-bold uppercase tracking-wider text-[#FF7A1A] flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>04. Learning &mdash; What Worked / Didn&apos;t</span>
            </div>
            <div className="space-y-3 text-sm text-zinc-200 leading-relaxed">
              <div className="p-4 rounded-2xl bg-zinc-950/70 border border-emerald-500/20">
                <span className="text-emerald-400 font-bold uppercase text-xs block mb-1">
                  What Worked:
                </span>
                <p>{item.learning.whatWorked}</p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950/70 border border-rose-500/20">
                <span className="text-rose-400 font-bold uppercase text-xs block mb-1">
                  What Didn&apos;t Work:
                </span>
                <p>{item.learning.whatDidnt}</p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM NAV & ACTIONS */}
        <div className="pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4 mb-16">
          <Link
            href="/work"
            className="text-xs font-bold text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Work</span>
          </Link>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                `${item.title} - Project Case Study on Frame Feature`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-zinc-900 hover:bg-[#25D366] text-zinc-400 hover:text-white transition-colors"
              title="Share on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <Button href="/work/new" size="sm">
              + Publish Another Project
            </Button>
          </div>
        </div>

        {/* RELATED STORIES */}
        {relatedItems.length > 0 && (
          <div className="pt-12 border-t border-white/10">
            <h2 className="text-2xl font-black text-white mb-8">More Project Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedItems.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/work/${rel.slug}`}
                  className="group rounded-3xl bg-zinc-900/60 border border-white/10 p-6 hover:border-[#FF5E14]/40 transition-all flex items-center gap-6 shadow-xl"
                >
                  <div className="relative w-28 h-28 rounded-2xl overflow-hidden shrink-0 bg-zinc-950">
                    <Image
                      src={rel.image}
                      alt={rel.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#FF7A1A] uppercase">
                      {rel.category}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-[#FF7A1A] transition-colors mt-1 line-clamp-1">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-zinc-400 line-clamp-2 mt-1">{rel.summary}</p>
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
