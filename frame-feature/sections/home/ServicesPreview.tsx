"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { servicesData } from "@/data/services";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { ArrowRight, Sparkles, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ServicesPreview() {
  return (
    <section className="relative py-28 bg-[#0A0A0C] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#FF5E14]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <Badge variant="orange" icon={<Sparkles className="w-3.5 h-3.5" />}>
              Core Competencies
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-4">
              Engineered for <span className="orange-gradient-text">Extreme Speed &amp; Impact</span>
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg mt-3 max-w-2xl">
              We bridge the gap between aesthetic design and deep technical engineering to build products that dominate.
            </p>
          </div>

          <Button href="/services" variant="secondary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
            View All Services
          </Button>
        </div>

        {/* Services Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesData.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="group h-full flex flex-col justify-between p-8 border-white/8 hover:border-[#FF5E14]/40 transition-all duration-300">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3.5 rounded-2xl bg-zinc-800/80 group-hover:bg-[#FF5E14] text-zinc-300 group-hover:text-white transition-all duration-300 shadow-lg">
                      <DynamicIcon name={service.icon} className="w-6 h-6" />
                    </div>
                    <Badge variant="orange">{service.tag}</Badge>
                  </div>

                  <h3 className="text-2xl font-bold text-white group-hover:text-[#FF7A1A] transition-colors mb-3">
                    {service.title}
                  </h3>

                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>

                  {/* Feature Bullets */}
                  <div className="space-y-2.5 mb-8">
                    {service.features.slice(0, 2).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <CheckCircle className="w-4 h-4 text-[#FF5E14] shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-white">{feat.title}:</strong> {feat.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-400">
                    Category: <span className="text-zinc-200">{service.category}</span>
                  </span>

                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#FF7A1A] hover:text-white transition-colors group-hover:translate-x-1 duration-200"
                  >
                    <span>Explore Service</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
