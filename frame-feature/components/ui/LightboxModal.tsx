"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, MessageCircle, Share2 } from "lucide-react";
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
              alt={`${currentItem.title} - Best Affordable Photographer in Delhi`}
              title={currentItem.title}
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

            {/* Social Share Buttons */}
            <div className="flex items-center justify-center gap-3 mt-4 pt-3 border-t border-white/10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5 mr-1">
                <Share2 className="w-3.5 h-3.5 text-[#FF5E14]" />
                Share Photo:
              </span>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `Check out "${currentItem.title}" on Frame Feature! ${typeof window !== "undefined" ? window.location.origin + "/gallery" : ""}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg bg-zinc-900/80 hover:bg-[#25D366] text-zinc-400 hover:text-white border border-white/5 transition-all flex items-center justify-center"
                title="Share on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  typeof window !== "undefined" ? window.location.origin + "/gallery" : ""
                )}&text=${encodeURIComponent(`Check out "${currentItem.title}" on Frame Feature!`)}`}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg bg-zinc-900/80 hover:bg-[#1A1A1A] hover:text-white text-zinc-400 border border-white/5 transition-all flex items-center justify-center"
                title="Share on Twitter"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  typeof window !== "undefined" ? window.location.origin + "/gallery" : ""
                )}`}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg bg-zinc-900/80 hover:bg-[#1877F2] hover:text-white text-zinc-400 border border-white/5 transition-all flex items-center justify-center"
                title="Share on Facebook"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
                </svg>
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  typeof window !== "undefined" ? window.location.origin + "/gallery" : ""
                )}`}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg bg-zinc-900/80 hover:bg-[#0A66C2] hover:text-white text-zinc-400 border border-white/5 transition-all flex items-center justify-center"
                title="Share on LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
