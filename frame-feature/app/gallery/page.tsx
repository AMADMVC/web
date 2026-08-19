"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { LightboxModal } from "@/components/ui/LightboxModal";
import { Sparkles, ZoomIn, Plus, Image as ImageIcon } from "lucide-react";
import { StoredGalleryItem } from "@/utils/galleryStorage";

export default function GalleryPage() {
  const [items, setItems] = useState<StoredGalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const categories = ["All", "Photos", "Frames", "Edits", "Visual experiments"];

  useEffect(() => {
    async function loadGallery() {
      try {
        const res = await fetch("/api/gallery");
        const data = await res.json();
        if (data.items) {
          setItems(data.items);
        }
      } catch (err) {
        console.error("Failed to load gallery items:", err);
      } finally {
        setLoading(false);
      }
    }
    loadGallery();
  }, []);

  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <div className="pt-32 pb-24 bg-[#0A0A0C] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb segments={[{ label: "Gallery" }]} />

        {/* HERO */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div className="max-w-3xl space-y-4">
            <Badge variant="orange" icon={<Sparkles className="w-3.5 h-3.5" />}>
              Visual Collection
            </Badge>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              Visual Output
            </h1>

            <div className="text-lg text-zinc-300 space-y-1">
              <p className="text-zinc-400">
                A collection of: Photos &bull; Frames &bull; Edits &bull; Visual experiments.
              </p>
              <p className="font-semibold text-white text-xl pt-1">
                No long explanations. <span className="text-[#FF7A1A]">Just visuals.</span>
              </p>
            </div>
          </div>
        </div>

        {/* CATEGORY FILTER TABS */}
        <div className="flex flex-wrap items-center gap-2 mb-16">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#FF5E14] text-white shadow-[0_0_15px_rgba(255,94,20,0.3)]"
                    : "bg-zinc-900/80 text-zinc-400 hover:text-white border border-white/5"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* MASONRY GRID LAYOUT */}
        {loading ? (
          <div className="py-20 text-center text-zinc-500 text-sm">
            Loading visual collection...
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="p-16 rounded-3xl bg-zinc-900/40 border border-white/10 text-center space-y-4">
            <ImageIcon className="w-12 h-12 text-zinc-600 mx-auto" />
            <h3 className="text-xl font-bold text-white">No images in this category yet</h3>
            <p className="text-zinc-400 text-sm max-w-sm mx-auto">
              Upload your first visual frame using the studio.
            </p>
            <Button href="/gallery/new" size="md">
              + Upload Visual Frame
            </Button>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 mb-24">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => openLightbox(idx)}
                className="group relative rounded-3xl bg-zinc-900/60 border border-white/8 overflow-hidden break-inside-avoid hover:border-[#FF5E14]/40 transition-all duration-300 shadow-xl cursor-pointer"
              >
                <div
                  className={`relative w-full ${
                    item.aspectRatio === "portrait"
                      ? "h-96"
                      : item.aspectRatio === "landscape"
                      ? "h-64"
                      : "h-80"
                  } overflow-hidden bg-zinc-950`}
                >
                  {item.mediaType === "iframe" && item.iframeEmbed ? (
                    <div
                      className="w-full h-full pointer-events-none [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:border-none"
                      dangerouslySetInnerHTML={{ __html: item.iframeEmbed }}
                    />
                  ) : (
                    <Image
                      src={item.image}
                      alt={`${item.title} - Best Affordable Photographer in Delhi`}
                      title={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      unoptimized
                    />
                  )}

                  {/* Category badge */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-[#FF7A1A] text-[10px] font-bold uppercase border border-[#FF5E14]/30">
                      {item.category}
                    </span>
                  </div>

                  {/* Minimalist Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-bold text-base line-clamp-1">
                        {item.title}
                      </span>
                      <div className="p-2 rounded-full bg-black/60 text-white backdrop-blur-md shrink-0 ml-2">
                        <ZoomIn className="w-4 h-4" />
                      </div>
                    </div>
                    {item.description && (
                      <p className="text-zinc-300 text-xs line-clamp-2">{item.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* LIGHTBOX MODAL */}
        {filteredItems.length > 0 && (
          <LightboxModal
            isOpen={isLightboxOpen}
            onClose={() => setIsLightboxOpen(false)}
            images={filteredItems as any}
            currentIndex={lightboxIndex}
            onNavigate={(newIdx) => setLightboxIndex(newIdx)}
          />
        )}
      </div>
    </div>
  );
}
