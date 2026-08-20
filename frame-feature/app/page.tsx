import { HeroSection } from "@/sections/home/HeroSection";
import { WhatThisIsSection } from "@/sections/home/WhatThisIsSection";
import { ProcessSection } from "@/sections/home/ProcessSection";
import { CtaSection } from "@/sections/home/CtaSection";
import Link from "next/link";
import Image from "next/image";
import { workItems } from "@/data/work";
import { notesData } from "@/data/notes";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Sparkles, Clock } from "lucide-react";

// Frame Feature Live Build Test - Sync Verified
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhatThisIsSection />
      <ProcessSection />

      {/* SELECTED WORK PREVIEW */}
      <section className="py-24 bg-[#0E0F12] border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <Badge variant="orange" icon={<Sparkles className="w-3.5 h-3.5" />}>
                Recent Output
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">
                Experiments &amp; Projects
              </h2>
            </div>
            <Link
              href="/work"
              className="text-sm font-bold text-[#FF7A1A] hover:text-white flex items-center gap-1"
            >
              <span>View All Work</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {workItems.slice(0, 2).map((item) => (
              <Link
                key={item.id}
                href={`/work/${item.slug}`}
                className="group rounded-3xl bg-zinc-900/60 border border-white/8 overflow-hidden hover:border-[#FF5E14]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative h-64 sm:h-72 w-full bg-zinc-950 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/80 text-[#FF7A1A] text-xs font-bold uppercase border border-[#FF5E14]/30">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-3">
                  <h3 className="text-2xl font-bold text-white group-hover:text-[#FF7A1A] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 text-sm line-clamp-2 leading-relaxed">
                    {item.summary}
                  </p>
                  <div className="pt-2 text-xs font-bold text-[#FF7A1A] flex items-center gap-1">
                    <span>Explore Idea &amp; Learning</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST NOTES PREVIEW */}
      <section className="py-24 bg-[#0A0A0C] border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <Badge variant="orange">Notes &amp; Learnings</Badge>
              <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">
                Useful Thinking
              </h2>
            </div>
            <Link
              href="/notes"
              className="text-sm font-bold text-[#FF7A1A] hover:text-white flex items-center gap-1"
            >
              <span>Read All Notes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {notesData.slice(0, 2).map((note) => (
              <Link
                key={note.id}
                href={`/notes/${note.slug}`}
                className="group p-8 rounded-3xl bg-zinc-900/50 border border-white/8 hover:border-[#FF5E14]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 text-xs text-zinc-400 mb-3">
                    <span className="text-[#FF7A1A] font-bold uppercase">{note.category}</span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#FF5E14]" />
                      {note.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-[#FF7A1A] transition-colors mb-3">
                    {note.title}
                  </h3>

                  <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                    {note.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 text-xs text-zinc-300 italic">
                  &ldquo;{note.takeaway}&rdquo;
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}