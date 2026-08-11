"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Sparkles,
  Image as ImageIcon,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Eye,
  Layers,
} from "lucide-react";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { ImageUploadInput } from "@/components/ui/ImageUploadInput";

export default function NewGalleryItemPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<"Photos" | "Frames" | "Edits" | "Visual experiments">(
    "Photos"
  );
  const [aspectRatio, setAspectRatio] = useState<"portrait" | "landscape" | "square">("landscape");
  const [tag, setTag] = useState("Photography");
  const [image, setImage] = useState(
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
  );
  const [description, setDescription] = useState("");
  const [year, setYear] = useState(new Date().getFullYear().toString());

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!title.trim() || !image.trim()) {
      setErrorMsg("Please provide both a Title and an Image URL.");
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch("/api/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title.trim(),
            category,
            aspectRatio,
            tag: tag.trim() || "Visual",
            image: image.trim(),
            description: description.trim(),
            year: year.trim() || new Date().getFullYear().toString(),
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to upload image.");
        }

        setSuccessMsg("Visual uploaded successfully! Redirecting to gallery...");
        setTimeout(() => {
          router.push("/gallery");
          router.refresh();
        }, 1000);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setErrorMsg(err.message);
        } else {
          setErrorMsg("An unexpected error occurred.");
        }
      }
    });
  };

  return (
    <AdminGuard>
      <div className="pt-32 pb-24 bg-[#0A0A0C] min-h-screen text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            segments={[
              { label: "Gallery", href: "/gallery" },
              { label: "Upload Visual" },
            ]}
          />

          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
            <div>
              <Badge variant="orange" icon={<Sparkles className="w-3.5 h-3.5" />}>
                Visual Collection Studio
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-black text-white mt-2">
                Upload New Visual Frame
              </h1>
            </div>

            <Link
              href="/gallery"
              className="text-xs font-bold text-zinc-400 hover:text-white flex items-center gap-1 self-start sm:self-auto"
            >
              <span>&larr; Back to Gallery</span>
            </Link>
          </div>

          {/* ALERTS */}
          {errorMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-red-950/40 border border-red-500/40 text-red-300 text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
          {successMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-sm flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handlePublish} className="space-y-8">
            <div className="p-6 sm:p-10 rounded-3xl bg-zinc-900/70 border border-white/10 space-y-6 shadow-2xl backdrop-blur-xl">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Left Inputs (7 Cols) */}
                <div className="md:col-span-7 space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                      Visual Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Cybernetic Obsidian Core"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white font-bold text-base placeholder-zinc-600 focus:outline-none focus:border-[#FF5E14]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
                        Category *
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-sm text-white focus:outline-none focus:border-[#FF5E14]"
                      >
                        <option value="Photos">Photos</option>
                        <option value="Frames">Frames</option>
                        <option value="Edits">Edits</option>
                        <option value="Visual experiments">Visual experiments</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
                        Aspect Ratio *
                      </label>
                      <select
                        value={aspectRatio}
                        onChange={(e) => setAspectRatio(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-sm text-white focus:outline-none focus:border-[#FF5E14]"
                      >
                        <option value="landscape">Landscape (Horizontal)</option>
                        <option value="portrait">Portrait (Vertical)</option>
                        <option value="square">Square (1:1)</option>
                      </select>
                    </div>
                  </div>

                  <ImageUploadInput
                    label="Visual Frame Image"
                    folder="gallery"
                    value={image}
                    onChange={setImage}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
                        Tag / Tool
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Midjourney, 35mm Film, Leica"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-sm text-zinc-300 focus:outline-none focus:border-[#FF5E14]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
                        Year
                      </label>
                      <input
                        type="text"
                        placeholder="2025"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-sm text-zinc-300 focus:outline-none focus:border-[#FF5E14]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
                      Description / Context
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Brief 1-2 sentence breakdown of the visual frame, lighting, or composition..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-[#FF5E14]"
                    />
                  </div>
                </div>

                {/* Right Live Aspect Ratio Card Preview (5 Cols) */}
                <div className="md:col-span-5 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[#FF7A1A]">
                      <Eye className="w-3.5 h-3.5" />
                      Live Masonry Card Preview
                    </span>
                    <span className="capitalize text-zinc-500">{aspectRatio}</span>
                  </div>

                  <div className="p-4 rounded-3xl bg-zinc-950 border border-white/10 space-y-3 shadow-inner">
                    <div
                      className={`relative w-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 ${
                        aspectRatio === "portrait"
                          ? "h-72"
                          : aspectRatio === "landscape"
                          ? "h-48"
                          : "h-56"
                      }`}
                    >
                      {image ? (
                        <Image
                          src={image}
                          alt="Preview"
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="h-full flex items-center justify-center text-xs text-zinc-600">
                          Paste valid image URL
                        </div>
                      )}
                      <div className="absolute top-2.5 left-2.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-[#FF7A1A] text-[10px] font-bold uppercase border border-[#FF5E14]/30">
                          {category}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white line-clamp-1">
                        {title || "Untitled Visual"}
                      </h4>
                      <p className="text-[11px] text-zinc-400 line-clamp-2 mt-0.5">
                        {description || "Description will appear on lightbox click."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-zinc-500">
                  Saves to <code className="text-[#FF7A1A]">data/gallery.json</code>
                </span>

                <div className="flex items-center gap-3">
                  <Link
                    href="/gallery"
                    className="px-5 py-2.5 rounded-full bg-zinc-800 text-zinc-300 hover:text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Cancel
                  </Link>

                  <Button
                    type="submit"
                    disabled={isPending}
                    size="md"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    {isPending ? "Uploading..." : "Save to Gallery"}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AdminGuard>
  );
}
