"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import Image from "next/image";

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: {
    title: string;
    image: string;
    description?: string;
    tag?: string;
  }[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export function LightboxModal({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNavigate,
}: LightboxModalProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setIsZoomed(false);
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, currentIndex, images.length]);

  const handlePrev = () => {
    onNavigate((currentIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    onNavigate((currentIndex + 1) % images.length);
  };

  if (!isOpen || images.length === 0) return null;

  const currentItem = images[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-8"
        onClick={onClose}
      >
        {/* Top Control Bar */}
        <div
          className="absolute top-4 left-4 right-4 z-50 flex items-center justify-between pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3">
            {currentItem.tag && (
              <span className="px-3 py-1 bg-[#FF5E14]/20 border border-[#FF5E14]/40 text-[#FF7A1A] rounded-full text-xs font-bold uppercase tracking-wider">
                {currentItem.tag}
              </span>
            )}
            <span className="text-zinc-400 text-sm font-medium hidden sm:inline">
              {currentIndex + 1} / {images.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="p-2.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
              title="Toggle Zoom"
            >
              {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-zinc-900/80 hover:bg-[#FF5E14] text-zinc-300 hover:text-white border border-white/10 transition-all cursor-pointer"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-zinc-900/80 hover:bg-[#FF5E14] text-white border border-white/10 transition-all duration-300 cursor-pointer shadow-2xl"
              title="Previous (Left Arrow)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-zinc-900/80 hover:bg-[#FF5E14] text-white border border-white/10 transition-all duration-300 cursor-pointer shadow-2xl"
              title="Next (Right Arrow)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Image Content */}
        <div
          className="relative max-w-5xl max-h-[80vh] w-full flex flex-col items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            key={currentIndex}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: isZoomed ? 1.3 : 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`relative w-full h-[55vh] sm:h-[65vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10 transition-all cursor-${
              isZoomed ? "zoom-out" : "zoom-in"
            }`}
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <Image
              src={currentItem.image}
              alt={currentItem.title}
              fill
              className="object-contain"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
          </motion.div>

          {/* Caption */}
          <div className="mt-4 text-center max-w-xl">
            <h3 className="text-white font-bold text-lg">{currentItem.title}</h3>
            {currentItem.description && (
              <p className="text-zinc-400 text-sm mt-1">{currentItem.description}</p>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
