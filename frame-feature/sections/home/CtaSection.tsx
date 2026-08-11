"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";

export function CtaSection() {
  return (
    <section className="relative py-24 bg-[#0E0F12] border-t border-white/8 overflow-hidden">
      {/* Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FF5E14]/12 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-zinc-900/80 border border-white/10 p-8 sm:p-14 shadow-2xl backdrop-blur-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FF5E14] to-transparent" />

          <Badge variant="orange" icon={<Sparkles className="w-3.5 h-3.5" />}>
            Open for Exploration
          </Badge>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-6 leading-tight">
            Connect &amp; Collaborate
          </h2>

          <p className="text-zinc-300 text-base sm:text-xl mt-4 max-w-xl mx-auto font-normal leading-relaxed">
            If you&apos;re exploring visuals, content, or AI &mdash; you can follow the work or connect directly.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="/contact"
              size="lg"
              className="w-full sm:w-auto px-8 text-base shadow-xl"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Send a Message
            </Button>

            <Button
              variant="whatsapp"
              href="https://wa.me/1234567890?text=Hi%2C%20I'm%20exploring%20visuals%20and%20AI%20and%20wanted%20to%20connect."
              external
              size="lg"
              className="w-full sm:w-auto px-8 text-base"
              icon={<MessageCircle className="w-5 h-5" />}
            >
              WhatsApp Connect
            </Button>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 text-xs text-zinc-500 font-medium">
            Visual Thinking &times; AI Execution
          </div>
        </motion.div>
      </div>
    </section>
  );
}
