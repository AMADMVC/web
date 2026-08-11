"use client";

import React from "react";
import { motion } from "framer-motion";
import { trustStats, clientLogos } from "@/data/trust";
import { Counter } from "@/components/ui/Counter";
import { DynamicIcon } from "@/components/ui/DynamicIcon";

export function TrustSection() {
  return (
    <section className="relative py-20 bg-[#0E0F12] border-y border-white/8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated Metric Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {trustStats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-center p-6 rounded-2xl bg-zinc-900/40 border border-white/5 backdrop-blur-md"
            >
              <div className="text-3xl sm:text-5xl font-black text-white flex items-center justify-center tracking-tight">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm font-bold text-[#FF7A1A] mt-2">{stat.label}</div>
              <div className="text-xs text-zinc-400 mt-1">{stat.description}</div>
            </motion.div>
          ))}
        </div>

        {/* Client Logos Marquee / Grid */}
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            Trusted by Engineering &amp; Venture Leaders Worldwide
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {clientLogos.map((logo, idx) => (
            <div
              key={idx}
              className="group flex flex-col items-center justify-center p-4 rounded-xl bg-zinc-900/30 hover:bg-zinc-800/60 border border-white/5 hover:border-[#FF5E14]/30 transition-all duration-300"
            >
              <DynamicIcon
                name={logo.icon}
                className="w-5 h-5 text-zinc-400 group-hover:text-[#FF5E14] transition-colors mb-2"
              />
              <span className="text-[11px] font-bold text-zinc-400 group-hover:text-white transition-colors tracking-wider">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
