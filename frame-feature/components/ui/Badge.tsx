"use client";

import React from "react";
import { cn } from "@/utils/cn";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "orange" | "grey" | "glass" | "outline";
  className?: string;
  icon?: React.ReactNode;
}

export function Badge({ children, variant = "orange", className, icon }: BadgeProps) {
  const baseStyles = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase";

  const variants = {
    orange: "bg-[#FF5E14]/15 text-[#FF7A1A] border border-[#FF5E14]/30 shadow-[0_0_12px_rgba(255,94,20,0.15)]",
    grey: "bg-zinc-800/80 text-zinc-300 border border-zinc-700/60",
    glass: "bg-white/5 text-zinc-200 border border-white/10 backdrop-blur-md",
    outline: "bg-transparent text-zinc-400 border border-zinc-700",
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)}>
      {icon && <span>{icon}</span>}
      {children}
    </span>
  );
}
