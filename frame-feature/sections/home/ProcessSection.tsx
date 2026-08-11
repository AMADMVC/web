"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Sparkles, Eye, Camera, Sliders, Wand2, Send, RefreshCw } from "lucide-react";

export function ProcessSection() {
  const steps = [
    {
      step: "01",
      name: "Observe",
      desc: "Noticing nuances, light, human behavior, and raw thoughts in the wild.",
      icon: Eye,
    },
    {
      step: "02",
      name: "Capture",
      desc: "Framing the moment with cameras, writing down fragments, or recording notes.",
      icon: Camera,
    },
    {
      step: "03",
      name: "Edit",
      desc: "Ruthlessly cutting out the non-essential to reveal the core signal.",
      icon: Sliders,
    },
    {
      step: "04",
      name: "Enhance",
      desc: "Applying AI diffusion, color grading, or typography to amplify impact.",
      icon: Wand2,
    },
    {
      step: "05",
      name: "Publish",
      desc: "Releasing the work into public documentation to test how it resonates.",
      icon: Send,
    },
    {
      step: "06",
      name: "Improve",
      desc: "Extracting lessons, analyzing feedback, and refining the next iteration.",
      icon: RefreshCw,
    },
  ];

  return (
    <section id="process" className="relative py-28 bg-[#0A0A0C] overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <Badge variant="orange" icon={<Sparkles className="w-3.5 h-3.5" />}>
            The Method
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-4">
            Process
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3">
            A continuous loop from raw observation to refined creative output.
          </p>
        </div>

        {/* 6-Step Horizontal Flow Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group p-6 rounded-3xl bg-zinc-900/60 border border-white/8 hover:border-[#FF5E14]/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-zinc-700 group-hover:text-[#FF5E14] transition-colors">
                      {item.step}
                    </span>
                    <div className="p-2 rounded-xl bg-zinc-800 text-zinc-400 group-hover:text-white group-hover:bg-[#FF5E14] transition-all">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-[#FF7A1A] transition-colors mb-2">
                    {item.name}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/5 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                  Step {item.step}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
