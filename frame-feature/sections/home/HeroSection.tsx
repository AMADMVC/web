"use client";

import React from "react";
import { motion } from "framer-motion";
import { ParticleCanvas } from "@/components/ui/ParticleCanvas";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Eye, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-[#0A0A0C]">
      {/* 3D Interactive Particle Constellation Canvas */}
      <ParticleCanvas particleCount={65} />

      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-[#FF5E14]/12 rounded-full blur-[130px] pointer-events-none" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Brand Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <Badge variant="orange" icon={<Sparkles className="w-3.5 h-3.5" />}>
            Visual Thinking &times; AI Execution
          </Badge>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.1] max-w-4xl"
        >
          Frame Feature
        </motion.h1>

        {/* Brand Core Identity Intro */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-xl sm:text-2xl text-zinc-300 max-w-2xl font-normal leading-relaxed"
        >
          I explore how ideas can be turned into visual content using cameras, editing, and AI tools.
        </motion.p>

        {/* Honest Purpose */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 p-4 rounded-2xl bg-zinc-900/60 border border-white/5 max-w-xl text-center space-y-1 text-sm sm:text-base text-zinc-400"
        >
          <div>Not to create more content.</div>
          <div className="text-white font-semibold text-[#FF7A1A]">To create clearer communication.</div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md sm:max-w-none"
        >
          <Button
            href="/work"
            size="lg"
            className="w-full sm:w-auto px-8 text-base shadow-xl"
            icon={<ArrowRight className="w-5 h-5" />}
          >
            View Work
          </Button>

          <Button
            href="#process"
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto px-8 text-base"
            icon={<Eye className="w-4 h-4 text-[#FF7A1A]" />}
          >
            Explore Process
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
