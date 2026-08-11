"use client";

import React from "react";
import { cn } from "@/utils/cn";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowOnHover?: boolean;
}

export function Card({ children, className, glowOnHover = true, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl bg-zinc-900/70 border border-white/8 backdrop-blur-xl p-6 transition-all duration-400 overflow-hidden",
        glowOnHover &&
          "hover:border-[#FF5E14]/40 hover:bg-zinc-900/90 hover:shadow-[0_15px_40px_-15px_rgba(255,94,20,0.2)] hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {/* Subtle top border accent glow */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF5E14]/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {children}
    </div>
  );
}
