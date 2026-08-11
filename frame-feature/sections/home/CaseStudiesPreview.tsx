"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";

export function CaseStudiesPreview() {
  return (
    <section className="relative py-28 bg-[#0E0F12] border-t border-white/8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <Badge variant="orange" icon={<Sparkles className="w-3.5 h-3.5" />}>
              Proven Track Record
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-4">
              Featured <span className="orange-gradient-text">Case Studies</span>
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg mt-3 max-w-2xl">
              Deep dives into how we solved high-stakes engineering, 3D visualization, and growth challenges.
            </p>
          </div>

          <Button href="/portfolio" variant="secondary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
            All Projects &rarr;
          </Button>
        </div>

        {/* 2-Column Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {portfolioData.slice(0, 2).map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="group relative rounded-3xl bg-zinc-900/60 border border-white/8 overflow-hidden hover:border-[#FF5E14]/40 transition-all duration-500 shadow-2xl flex flex-col justify-between"
            >
              {/* Image Container with Zoom */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-zinc-950">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0F12] via-transparent to-black/30" />

                {/* Badges on Image */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white text-xs font-bold">
                    {item.client}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#FF5E14]/80 backdrop-blur-md text-white text-xs font-bold shadow-lg">
                    {item.year}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold uppercase text-[#FF7A1A] tracking-wider">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white group-hover:text-[#FF7A1A] transition-colors line-clamp-2 mb-3">
                    {item.title}
                  </h3>

                  <p className="text-zinc-400 text-sm line-clamp-2 mb-6">
                    {item.shortDesc}
                  </p>

                  {/* Results Metric Pills */}
                  <div className="grid grid-cols-3 gap-3 mb-6 p-4 rounded-2xl bg-zinc-950/70 border border-white/5">
                    {item.results.map((res, rIdx) => (
                      <div key={rIdx} className="text-center">
                        <div className="text-lg sm:text-xl font-black text-white flex items-center justify-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5 text-[#FF5E14]" />
                          <span>{res.value}</span>
                        </div>
                        <div className="text-[10px] text-zinc-400 font-semibold uppercase mt-0.5 truncate">
                          {res.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/portfolio/${item.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-800 hover:bg-[#FF5E14] text-white font-bold text-sm transition-all duration-300 shadow-md group-hover:shadow-[0_0_25px_rgba(255,94,20,0.3)]"
                >
                  <span>Read Full Case Study</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
