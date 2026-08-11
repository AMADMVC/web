"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { testimonialsData } from "@/data/testimonials";
import { Badge } from "@/components/ui/Badge";
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles } from "lucide-react";

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonialsData.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonialsData.length) % testimonialsData.length);

  const activeTestimonial = testimonialsData[current];

  return (
    <section className="relative py-28 bg-[#0E0F12] border-t border-white/8 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FF5E14]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="orange" icon={<Sparkles className="w-3.5 h-3.5" />}>
            Client Impact
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-4">
            Validated by <span className="orange-gradient-text">Industry Leaders</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg mt-3">
            Real outcomes from high-growth founders and executive engineering teams.
          </p>
        </div>

        {/* Featured Testimonial Card Slider */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl bg-zinc-900/80 border border-white/10 p-8 sm:p-12 shadow-2xl backdrop-blur-xl">
            <Quote className="absolute top-6 right-8 w-16 h-16 text-white/5 pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="space-y-8"
              >
                {/* Rating Stars & Metric Tag */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-1">
                    {[...Array(activeTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#FF5E14] text-[#FF5E14]" />
                    ))}
                  </div>

                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF5E14]/15 border border-[#FF5E14]/30 text-white font-bold text-xs">
                    <span className="text-[#FF7A1A] font-black">{activeTestimonial.metric}</span>
                    <span className="text-zinc-400">&bull;</span>
                    <span>{activeTestimonial.metricLabel}</span>
                  </div>
                </div>

                {/* Quote */}
                <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-white leading-snug">
                  &ldquo;{activeTestimonial.quote}&rdquo;
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/8">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-[#FF5E14]/40 shrink-0 shadow-lg">
                    <Image
                      src={activeTestimonial.avatar}
                      alt={activeTestimonial.clientName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">{activeTestimonial.clientName}</h4>
                    <p className="text-sm text-zinc-400">
                      {activeTestimonial.clientRole} &mdash;{" "}
                      <span className="text-[#FF7A1A] font-semibold">{activeTestimonial.company}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Dots & Buttons */}
            <div className="flex items-center justify-between pt-8 mt-8 border-t border-white/5">
              <div className="flex items-center gap-2">
                {testimonialsData.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      current === idx ? "w-8 bg-[#FF5E14]" : "w-2 bg-zinc-700 hover:bg-zinc-500"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  className="p-3 rounded-xl bg-zinc-800 hover:bg-[#FF5E14] text-white transition-colors cursor-pointer border border-white/10"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="p-3 rounded-xl bg-zinc-800 hover:bg-[#FF5E14] text-white transition-colors cursor-pointer border border-white/10"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
