"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/utils/cn";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
}

export function Logo({ className, size = "md", showTagline = true }: LogoProps) {
  const iconSizes = {
    sm: "w-9 h-9",
    md: "w-11 h-11",
    lg: "w-16 h-16",
  };

  const titleSizes = {
    sm: "text-base",
    md: "text-lg sm:text-xl",
    lg: "text-2xl sm:text-3xl",
  };

  return (
    <Link href="/" className={cn("flex items-center gap-3.5 group select-none", className)}>
      {/* Exact Circular Arc + Stylized Winged 'F' Emblem */}
      <div
        className={cn(
          "relative flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105",
          iconSizes[size]
        )}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          {/* Orange Circular Arc Framing Top */}
          <path
            d="M 20 72 A 38 38 0 1 1 80 72"
            stroke="#FF5E14"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="transition-all duration-300 group-hover:stroke-[#FF7A1A]"
          />

          {/* The Bold Stylized Winged 'F' */}
          {/* Upper Wing & Bar */}
          <path
            d="M 34 35 C 34 32 37 30 41 30 L 68 30 C 73 30 76 33 74 36 C 72 40 67 44 60 45 L 44 45 L 44 58 L 34 58 Z"
            fill="#FFFFFF"
            className="transition-colors duration-200 group-hover:fill-zinc-100"
          />
          {/* Lower Stem & Middle Wing */}
          <path
            d="M 34 58 L 62 58 C 66 58 68 62 67 65 C 65 70 59 74 52 74 L 43 74 L 43 86 C 43 92 37 96 34 96 Z"
            fill="#FFFFFF"
            className="transition-colors duration-200 group-hover:fill-zinc-100"
          />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <span
          className={cn(
            "font-black tracking-wider text-white group-hover:text-zinc-100 transition-colors leading-none uppercase",
            titleSizes[size]
          )}
        >
          FRAME FEATURE
        </span>
        {showTagline && (
          <span className="text-[9px] sm:text-[10px] font-bold text-zinc-400 tracking-wider uppercase mt-1">
            Visual Thinking <span className="text-[#FF5E14]">&times;</span> AI Execution
          </span>
        )}
      </div>
    </Link>
  );
}
