"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Camera, Cpu, Layers, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export function WhatThisIsSection() {
  const pillars = [
    {
      title: "Visual",
      tags: ["Photography", "Video", "Composition", "Frames"],
      desc: "Capturing light, framing subjects intentionally, and editing for visual weight.",
      icon: Camera,
    },
    {
      title: "AI",
      tags: ["Prompting", "Generation", "Editing", "Automation"],
      desc: "Leveraging diffusion models and LLMs to expand creative possibilities.",
      icon: Cpu,
    },
    {
      title: "Content",
      tags: ["Structure", "Clarity", "Communication"],
      desc: "Simplifying dense thoughts into clear, memorable ideas.",
      icon: Layers,
    },
  ];

  return (
    <section className="relative py-28 bg-[#0E0F12] border-t border-white/8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* WHAT THIS IS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28">
          <div className="lg:col-span-6 space-y-6">
            <Badge variant="orange" icon={<Sparkles className="w-3.5 h-3.5" />}>
              Working Space
            </Badge>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              What This Is
            </h2>

            <div className="text-zinc-300 text-lg sm:text-xl leading-relaxed space-y-3">
              <p className="text-zinc-400">This is not a polished agency website.</p>
              <p className="font-bold text-white text-2xl text-[#FF7A1A]">
                This is a working space.
              </p>
            </div>

            <p className="text-zinc-400 text-base leading-relaxed">
              A place where I document creative experiments, push visual tools to their limits, and refine the relationship between human taste and artificial intelligence.
            </p>

            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                A place where I:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "create visuals",
                  "test ideas",
                  "experiment with AI",
                  "improve how content is presented",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 text-sm font-semibold text-zinc-200"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#FF5E14]" />
                    <span className="capitalize">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* WHY THIS WORK CARD */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-zinc-900/80 border border-white/10 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FF5E14] to-transparent" />
              
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF7A1A]">
                The Core Philosophy
              </span>

              <h3 className="text-2xl sm:text-3xl font-black text-white mt-3 mb-6">
                Why This Work
              </h3>

              <div className="space-y-4 text-base sm:text-lg text-zinc-300 leading-relaxed">
                <p className="p-4 rounded-2xl bg-zinc-950/60 border border-white/5 text-zinc-400">
                  Most content is created fast, <br />
                  <strong className="text-white">but not understood.</strong>
                </p>

                <p className="p-4 rounded-2xl bg-[#FF5E14]/10 border border-[#FF5E14]/30 text-white font-medium">
                  I focus on making visuals and content that are{" "}
                  <span className="text-[#FF7A1A] font-bold">simple, clear, and meaningful.</span>
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/8 flex items-center justify-between">
                <span className="text-xs text-zinc-400">Evolving Practice</span>
                <Link
                  href="/about"
                  className="text-xs font-bold text-[#FF7A1A] hover:text-white flex items-center gap-1"
                >
                  <span>Read Full Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* WHAT I WORK WITH */}
        <div className="pt-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="orange">Mediums &amp; Focus</Badge>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-4">
              What I Work With
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="p-8 rounded-3xl bg-zinc-900/60 border border-white/8 hover:border-[#FF5E14]/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="p-3.5 rounded-2xl bg-zinc-800 text-[#FF5E14] w-fit mb-6 shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-2xl font-black text-white mb-2">{pillar.title}</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-6">{pillar.desc}</p>

                    <div className="flex flex-wrap gap-2">
                      {pillar.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-3 py-1.5 rounded-xl bg-zinc-800/90 text-zinc-300 text-xs font-semibold border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
