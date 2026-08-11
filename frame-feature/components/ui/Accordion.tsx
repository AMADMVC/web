"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";

export interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className={cn(
              "rounded-2xl border transition-all duration-300 overflow-hidden",
              isOpen
                ? "bg-zinc-900/90 border-[#FF5E14]/40 shadow-[0_10px_30px_-10px_rgba(255,94,20,0.15)]"
                : "bg-zinc-900/50 border-white/8 hover:border-zinc-700"
            )}
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full flex items-center justify-between p-6 text-left transition-colors cursor-pointer group"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-lg sm:text-xl text-white group-hover:text-[#FF7A1A] transition-colors pr-4">
                {item.question}
              </span>
              <div
                className={cn(
                  "p-2 rounded-full border transition-all duration-300 shrink-0",
                  isOpen
                    ? "bg-[#FF5E14] border-[#FF5E14] text-white rotate-180"
                    : "bg-zinc-800 border-zinc-700 text-zinc-400 group-hover:text-white"
                )}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="px-6 pb-6 text-zinc-400 leading-relaxed border-t border-white/5 pt-4 text-base">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
