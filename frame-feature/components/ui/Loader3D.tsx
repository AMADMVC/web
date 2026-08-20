"use client";

import React from "react";

interface Loader3DProps {
  label?: string;
  size?: "sm" | "md" | "lg";
}

export function Loader3D({ label = "Loading...", size = "md" }: Loader3DProps) {
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-14 h-14",
    lg: "w-20 h-20",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8">
      <div className={`relative ${sizeMap[size]} perspective-500`}>
        {/* 3D Isometric Cube Container */}
        <div className="w-full h-full relative preserve-3d animate-spin-3d">
          {/* Top Face */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#FF5E14] to-[#FF7A1A] rounded-xl opacity-90 border border-white/20 shadow-[0_0_20px_rgba(255,94,20,0.5)] transform -rotate-x-30 rotate-y-45 translate-z-4"
          />
          {/* Shadow Plane */}
          <div
            className="absolute -bottom-4 inset-x-2 h-3 bg-black/60 rounded-full blur-sm scale-90 animate-pulse"
          />
        </div>
      </div>

      {label && (
        <span className="text-xs font-mono font-semibold uppercase tracking-widest text-zinc-400 animate-pulse">
          {label}
        </span>
      )}

      <style jsx>{`
        .perspective-500 {
          perspective: 500px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .translate-z-4 {
          transform: translateZ(8px);
        }
        @keyframes spin3d {
          0% {
            transform: rotateX(20deg) rotateY(0deg) rotateZ(0deg);
          }
          50% {
            transform: rotateX(45deg) rotateY(180deg) rotateZ(20deg);
          }
          100% {
            transform: rotateX(20deg) rotateY(360deg) rotateZ(0deg);
          }
        }
        .animate-spin-3d {
          animation: spin3d 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
