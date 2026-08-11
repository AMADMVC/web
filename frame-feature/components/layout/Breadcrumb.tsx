"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbSegment {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  segments: BreadcrumbSegment[];
}

export function Breadcrumb({ segments }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-zinc-400">
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-[#FF7A1A] transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>

      {segments.map((segment, idx) => {
        const isLast = idx === segments.length - 1;

        return (
          <React.Fragment key={idx}>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
            {isLast || !segment.href ? (
              <span className="font-semibold text-zinc-200 truncate max-w-xs sm:max-w-md">
                {segment.label}
              </span>
            ) : (
              <Link href={segment.href} className="hover:text-[#FF7A1A] transition-colors truncate">
                {segment.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
