import React from "react";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Sparkles,
  ArrowRight,
  MessageCircle,
  Mail,
  Phone,
  HelpCircle,
  Layers,
  Cpu,
  Compass,
  CheckCircle2,
  XCircle,
  Eye,
  Camera,
  FileText,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Frame Feature — Visual Thinking × AI Execution",
  description:
    "How visuals, content structure, and AI workflows combine to communicate ideas with clarity.",
};

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function XTwitterIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 bg-[#0A0A0C] min-h-screen text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb segments={[{ label: "About" }]} />

        {/* 1. HERO HEADER & THE INITIAL QUESTION */}
        <div className="space-y-8 mb-20">
          <Badge variant="orange" icon={<Sparkles className="w-3.5 h-3.5" />}>
            About Frame Feature
          </Badge>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Visual Thinking <span className="text-[#FF5E14]">&times;</span> AI Execution
          </h1>

          <div className="p-8 sm:p-10 rounded-3xl bg-zinc-900/70 border border-white/10 space-y-6 shadow-2xl backdrop-blur-xl">
            <div className="text-xs font-bold uppercase tracking-wider text-[#FF7A1A] flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              <span>The Starting Question</span>
            </div>

            <p className="text-2xl sm:text-3xl font-bold text-white leading-snug">
              &ldquo;How do visuals communicate ideas without words?&rdquo;
            </p>

            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
              That question led me into photography &mdash; understanding frames, composition, and how a single image can capture attention and meaning.
            </p>

            <p className="text-zinc-400 text-sm font-medium italic border-l-2 border-[#FF5E14] pl-4">
              But visuals alone weren&apos;t enough.
            </p>
          </div>
        </div>

        {/* 2. THE SHIFT: FROM VISUALS TO CONTENT */}
        <div className="mb-20 space-y-8">
          <div className="border-b border-white/10 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF7A1A]">
              01 &bull; Evolution
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
              The Shift: From Visuals to Content
            </h2>
          </div>

          <div className="p-8 rounded-3xl bg-zinc-900/50 border border-white/8 space-y-6">
            <p className="text-zinc-300 text-lg leading-relaxed">
              As I explored further, I realized something important:
            </p>

            <div className="p-6 rounded-2xl bg-zinc-950/80 border border-white/5 space-y-2">
              <p className="text-zinc-400 text-lg">Most content exists.</p>
              <p className="text-xl sm:text-2xl font-bold text-[#FF7A1A]">
                Very little is actually understood.
              </p>
            </div>

            <p className="text-zinc-300 text-base leading-relaxed">
              That&apos;s where content comes in. Not just writing &mdash; but structuring ideas so people can:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-zinc-950 border border-white/5 space-y-1">
                <span className="text-xs font-bold text-[#FF7A1A] uppercase block">Step 1</span>
                <span className="text-white font-bold text-base">Understand Faster</span>
              </div>
              <div className="p-5 rounded-2xl bg-zinc-950 border border-white/5 space-y-1">
                <span className="text-xs font-bold text-[#FF7A1A] uppercase block">Step 2</span>
                <span className="text-white font-bold text-base">Connect Better</span>
              </div>
              <div className="p-5 rounded-2xl bg-zinc-950 border border-white/5 space-y-1">
                <span className="text-xs font-bold text-[#FF7A1A] uppercase block">Step 3</span>
                <span className="text-white font-bold text-base">Remember Clearly</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. THE NEXT LAYER: AI */}
        <div className="mb-20 space-y-8">
          <div className="border-b border-white/10 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF7A1A]">
              02 &bull; Technology
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
              The Next Layer: AI
            </h2>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-zinc-900/60 border border-white/8 space-y-6">
            <div className="p-6 rounded-2xl bg-[#FF5E14]/10 border border-[#FF5E14]/30 space-y-2">
              <p className="text-white font-bold text-lg sm:text-xl">
                Then came AI.
              </p>
              <p className="text-zinc-300 text-base leading-relaxed">
                Not as a replacement for creativity, but as a tool to accelerate it.
              </p>
            </div>

            <p className="text-zinc-300 text-base">
              AI made it possible to:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 text-sm font-semibold text-zinc-200">
                &bull; Generate ideas faster
              </div>
              <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 text-sm font-semibold text-zinc-200">
                &bull; Test multiple directions
              </div>
              <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 text-sm font-semibold text-zinc-200">
                &bull; Build repeatable workflows
              </div>
            </div>

            <div className="pt-4 border-t border-white/5">
              <p className="text-zinc-400 text-sm">But it also created a new problem:</p>
              <p className="text-xl sm:text-2xl font-black text-white mt-1">
                More content. <span className="text-[#FF7A1A]">Less clarity.</span>
              </p>
            </div>
          </div>
        </div>

        {/* 4. WHAT I DO NOW (3 PILLARS) */}
        <div className="mb-20 space-y-8">
          <div className="border-b border-white/10 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF7A1A]">
              03 &bull; Focus
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
              What I Do Now
            </h2>
            <p className="text-zinc-400 text-sm mt-1">
              Today, I work at the intersection of three disciplines:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/70 border border-white/10 space-y-4 hover:border-[#FF5E14]/40 transition-all shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-[#FF5E14]/15 border border-[#FF5E14]/30 text-[#FF5E14] flex items-center justify-center">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Visual Content</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                Photography &bull; Video &bull; Visual Storytelling
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/70 border border-white/10 space-y-4 hover:border-[#FF5E14]/40 transition-all shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-[#FF5E14]/15 border border-[#FF5E14]/30 text-[#FF5E14] flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Content Structure</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                Clarity &bull; Messaging &bull; Simplification
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/70 border border-white/10 space-y-4 hover:border-[#FF5E14]/40 transition-all shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-[#FF5E14]/15 border border-[#FF5E14]/30 text-[#FF5E14] flex items-center justify-center">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">AI Workflows</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                Prompting &bull; Generation &bull; Automation
              </p>
            </div>
          </div>
        </div>

        {/* 5. MY APPROACH */}
        <div className="mb-20 space-y-8">
          <div className="border-b border-white/10 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF7A1A]">
              04 &bull; Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
              My Approach
            </h2>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-zinc-900/60 border border-white/8 space-y-6">
            <p className="text-xl font-bold text-white">
              I don&apos;t start with tools. I start with questions:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-white/5 text-sm text-zinc-300 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#FF5E14] shrink-0" />
                <span>What is the idea?</span>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-white/5 text-sm text-zinc-300 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#FF5E14] shrink-0" />
                <span>Who is it for?</span>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-white/5 text-sm text-zinc-300 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#FF5E14] shrink-0" />
                <span>What should they understand?</span>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-white/5 text-sm text-zinc-300 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#FF5E14] shrink-0" />
                <span>What is the simplest way to show it?</span>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 space-y-2">
              <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider">
                Then I use:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 text-xs font-bold text-white text-center">
                  <span className="text-[#FF7A1A]">Visuals</span> to communicate
                </div>
                <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 text-xs font-bold text-white text-center">
                  <span className="text-[#FF7A1A]">Content</span> to structure
                </div>
                <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 text-xs font-bold text-white text-center">
                  <span className="text-[#FF7A1A]">AI</span> to execute efficiently
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 6. WHY THIS MATTERS */}
        <div className="mb-20 space-y-8">
          <div className="border-b border-white/10 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF7A1A]">
              05 &bull; The Context
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
              Why This Matters
            </h2>
          </div>

          <div className="p-8 rounded-3xl bg-zinc-900/50 border border-white/8 space-y-6">
            <div className="space-y-1 text-lg text-zinc-400">
              <p>Search is changing.</p>
              <p>Content is changing.</p>
              <p className="text-white font-bold">Attention is shrinking.</p>
            </div>

            <p className="text-zinc-300 text-base">
              People don&apos;t want more content. They want:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-zinc-950/90 border border-emerald-500/20 space-y-1">
                <span className="text-emerald-400 font-bold text-xs uppercase block">01</span>
                <span className="text-white font-bold text-base">Clear Ideas</span>
              </div>
              <div className="p-5 rounded-2xl bg-zinc-950/90 border border-emerald-500/20 space-y-1">
                <span className="text-emerald-400 font-bold text-xs uppercase block">02</span>
                <span className="text-white font-bold text-base">Useful Information</span>
              </div>
              <div className="p-5 rounded-2xl bg-zinc-950/90 border border-emerald-500/20 space-y-1">
                <span className="text-emerald-400 font-bold text-xs uppercase block">03</span>
                <span className="text-white font-bold text-base">Visual Understanding</span>
              </div>
            </div>
          </div>
        </div>

        {/* 7. WHAT MAKES THIS DIFFERENT */}
        <div className="mb-20 space-y-8">
          <div className="border-b border-white/10 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF7A1A]">
              06 &bull; Differentiation
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
              What Makes This Different
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* This is not */}
            <div className="p-8 rounded-3xl bg-zinc-900/40 border border-rose-500/20 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                <span>This is NOT:</span>
              </div>
              <ul className="space-y-3 text-sm text-zinc-300">
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span>A digital marketing agency</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span>A traditional portfolio</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span>A finished system</span>
                </li>
              </ul>
            </div>

            {/* This is */}
            <div className="p-8 rounded-3xl bg-zinc-900/80 border border-[#FF5E14]/30 space-y-4 shadow-xl">
              <div className="text-xs font-bold uppercase tracking-wider text-[#FF7A1A] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>This IS:</span>
              </div>
              <p className="text-xs text-zinc-400">An evolving practice where I:</p>
              <ul className="space-y-2.5 text-sm text-white font-medium">
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E14]" />
                  <span>Experiment with visuals</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E14]" />
                  <span>Test AI workflows</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E14]" />
                  <span>Build content systems</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E14]" />
                  <span>Improve how ideas are presented</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 8. THIS WEBSITE & ONGOING JOURNEY */}
        <div className="mb-20 p-8 sm:p-12 rounded-3xl bg-zinc-950 border border-white/10 space-y-6 shadow-2xl">
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-white">This Website</h3>
            <p className="text-zinc-400 text-sm">
              This website is not built to impress. <span className="text-white font-bold">It&apos;s built to document.</span>
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
            {["Real work", "Experiments", "Visual output", "Content thinking", "AI processes"].map(
              (item, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-zinc-900 border border-white/5 text-center text-xs font-bold text-zinc-300"
                >
                  {item}
                </div>
              )
            )}
          </div>

          <div className="pt-6 border-t border-white/5 space-y-2">
            <h4 className="text-sm font-bold text-[#FF7A1A] uppercase tracking-wider">
              Ongoing Journey
            </h4>
            <p className="text-zinc-300 text-sm leading-relaxed">
              This space will keep evolving. As tools improve, as ideas change, as better ways of creating emerge.
            </p>
          </div>
        </div>

        {/* 9. FINAL LINE & OFFICIAL CONTACT CHANNELS */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-[#FF5E14]/40 text-center space-y-8 shadow-2xl">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF7A1A]">
              Final Line
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Frame Feature
            </h3>
            <p className="text-lg sm:text-xl text-zinc-300 font-semibold">
              Visual Thinking <span className="text-[#FF5E14]">&times;</span> AI Execution
            </p>
          </div>

          {/* CONTACT MATRIX */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto pt-4 text-left">
            {/* Phone / WhatsApp */}
            <a
              href="https://wa.me/917827677476?text=Hi%20Frame%20Feature%2C%20I%20visited%20your%20website%20and%20wanted%20to%20connect."
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-2xl bg-zinc-900/90 border border-white/10 hover:border-[#25D366] transition-all group flex items-center gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-[#25D366]/20 text-[#25D366] flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 uppercase font-bold block">Phone / WhatsApp</span>
                <span className="text-sm font-bold text-white group-hover:text-[#25D366] transition-colors">
                  +91 7827677476
                </span>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:framefeature1@gmail.com"
              className="p-4 rounded-2xl bg-zinc-900/90 border border-white/10 hover:border-[#FF5E14] transition-all group flex items-center gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FF5E14]/20 text-[#FF5E14] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 uppercase font-bold block">Direct Email</span>
                <span className="text-xs font-bold text-white group-hover:text-[#FF7A1A] transition-colors truncate block max-w-[170px]">
                  framefeature1@gmail.com
                </span>
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/frame.features/"
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-2xl bg-zinc-900/90 border border-white/10 hover:border-[#E1306C] transition-all group flex items-center gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-[#E1306C]/20 text-[#E1306C] flex items-center justify-center shrink-0">
                <InstagramIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 uppercase font-bold block">Instagram</span>
                <span className="text-sm font-bold text-white group-hover:text-[#E1306C] transition-colors">
                  @frame.features
                </span>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/frame-feature"
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-2xl bg-zinc-900/90 border border-white/10 hover:border-[#0A66C2] transition-all group flex items-center gap-3.5 sm:col-span-2"
            >
              <div className="w-10 h-10 rounded-xl bg-[#0A66C2]/20 text-[#0A66C2] flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.46 1.46 0 0 0 1.46-1.46c0-.81-.66-1.47-1.46-1.47a1.47 1.47 0 0 0-1.47 1.47c0 .8.66 1.46 1.47 1.46m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                </svg>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 uppercase font-bold block">LinkedIn Company</span>
                <span className="text-sm font-bold text-white group-hover:text-[#0A66C2] transition-colors">
                  Frame Feature on LinkedIn
                </span>
              </div>
            </a>
          </div>

          <div className="pt-4 flex items-center justify-center gap-3">
            <Button href="/work" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Explore Work &amp; Case Stories
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
