"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { megaMenuData } from "@/data/navigation";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { ArrowRight, Sparkles } from "lucide-react";

interface MegaMenuProps {
  onClose: () => void;
}

export function MegaMenu({ onClose }: MegaMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[92vw] max-w-6xl rounded-3xl bg-[#121316]/95 border border-white/10 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_-10px_rgba(255,94,20,0.15)] p-6 sm:p-8 z-50 overflow-hidden"
    >
      {/* Decorative gradient glow ring */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF5E14]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* LEFT COLUMN: WHAT WE DO & WHO WE HELP (4 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/8 pb-6 lg:pb-0 lg:pr-8 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF7A1A] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>What We Do</span>
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              {megaMenuData.leftSide.whatWeDo.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={onClose}
                  className="group flex items-start gap-3.5 p-3 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-transparent hover:border-[#FF5E14]/30 transition-all duration-200"
                >
                  <div className="p-2.5 rounded-xl bg-zinc-800/80 group-hover:bg-[#FF5E14] text-zinc-300 group-hover:text-white transition-all duration-200 shrink-0">
                    <DynamicIcon name={item.icon} className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white group-hover:text-[#FF7A1A] transition-colors flex items-center gap-1.5">
                      {item.title}
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                    <div className="text-xs text-zinc-400 mt-0.5 line-clamp-1">{item.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-white/5">
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
              Who We Help
            </div>
            <div className="grid grid-cols-2 gap-2">
              {megaMenuData.leftSide.whoWeHelp.map((client, idx) => (
                <Link
                  key={idx}
                  href={client.href}
                  onClick={onClose}
                  className="group flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-800/80 border border-white/5 hover:border-zinc-700 text-xs transition-all"
                >
                  <span className="text-zinc-300 group-hover:text-white font-medium truncate">
                    {client.name}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 group-hover:text-[#FF7A1A]">
                    {client.tag}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DIGITAL MARKETING & WEB SERVICES (7 Cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Digital Marketing Column */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#FF5E14]" />
                Digital Marketing
              </span>
              <Link
                href="/services"
                onClick={onClose}
                className="text-[11px] text-zinc-400 hover:text-[#FF7A1A] transition-colors"
              >
                View all &rarr;
              </Link>
            </div>

            <div className="space-y-2">
              {megaMenuData.rightSide.digitalMarketing.map((service, idx) => (
                <Link
                  key={idx}
                  href={service.href}
                  onClick={onClose}
                  className="group flex items-start gap-3 p-3 rounded-2xl bg-zinc-900/40 hover:bg-zinc-800/80 border border-white/5 hover:border-[#FF5E14]/40 transition-all duration-200"
                >
                  <div className="p-2 rounded-xl bg-zinc-800 text-zinc-400 group-hover:bg-[#FF5E14]/20 group-hover:text-[#FF7A1A] transition-colors shrink-0">
                    <DynamicIcon name={service.icon} className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-xs text-white group-hover:text-[#FF7A1A] transition-colors truncate">
                        {service.name}
                      </h4>
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#FF5E14]/15 text-[#FF7A1A] font-bold uppercase">
                        {service.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1">{service.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Web Services Column */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-white" />
                Web Services
              </span>
              <Link
                href="/services"
                onClick={onClose}
                className="text-[11px] text-zinc-400 hover:text-[#FF7A1A] transition-colors"
              >
                Explore &rarr;
              </Link>
            </div>

            <div className="space-y-2">
              {megaMenuData.rightSide.webServices.map((service, idx) => (
                <Link
                  key={idx}
                  href={service.href}
                  onClick={onClose}
                  className="group flex items-start gap-3 p-3 rounded-2xl bg-zinc-900/40 hover:bg-zinc-800/80 border border-white/5 hover:border-white/30 transition-all duration-200"
                >
                  <div className="p-2 rounded-xl bg-zinc-800 text-zinc-400 group-hover:bg-white/10 group-hover:text-white transition-colors shrink-0">
                    <DynamicIcon name={service.icon} className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-xs text-white group-hover:text-white transition-colors truncate">
                        {service.name}
                      </h4>
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/10 text-zinc-300 font-bold uppercase">
                        {service.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1">{service.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
