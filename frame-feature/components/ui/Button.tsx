"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/utils/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "whatsapp";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  external,
  className,
  children,
  icon,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 active:scale-[0.98] cursor-pointer select-none group";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5 font-semibold",
    md: "px-5 py-2.5 text-sm gap-2 font-semibold",
    lg: "px-7 py-3.5 text-base gap-2.5 font-bold",
  };

  const variantStyles = {
    primary:
      "bg-[#FF5E14] text-white hover:bg-[#FF7A1A] orange-glow hover:orange-glow-lg border border-[#FF7A1A]/40 shadow-lg shadow-[#FF5E14]/20",
    secondary:
      "bg-zinc-900/90 text-white hover:bg-zinc-800 border border-white/10 hover:border-[#FF5E14]/50 backdrop-blur-md",
    outline:
      "bg-transparent text-zinc-300 hover:text-white border border-zinc-700 hover:border-[#FF5E14] hover:bg-[#FF5E14]/10",
    ghost:
      "bg-transparent text-zinc-400 hover:text-white hover:bg-white/5",
    whatsapp:
      "bg-[#25D366] text-white hover:bg-[#22c35e] shadow-lg shadow-[#25D366]/25 border border-emerald-400/40",
  };

  const combinedClass = cn(baseStyles, sizeStyles[size], variantStyles[variant], className);

  if (href) {
    return (
      <Link
        href={href}
        className={combinedClass}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
        {icon && <span className="transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
      </Link>
    );
  }

  return (
    <button className={combinedClass} {...props}>
      {children}
      {icon && <span className="transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
    </button>
  );
}
