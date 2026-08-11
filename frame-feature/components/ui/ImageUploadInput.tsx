"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, CheckCircle2, Loader2, Image as ImageIcon } from "lucide-react";

interface ImageUploadInputProps {
  value: string;
  onChange: (url: string) => void;
  folder?: "gallery" | "work" | "blog" | "uploads";
  label?: string;
  required?: boolean;
}

export function ImageUploadInput({
  value,
  onChange,
  folder = "uploads",
  label = "Image Source",
  required = true,
}: ImageUploadInputProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError("");
    setUploadSuccess(false);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      onChange(data.url);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 4000);
    } catch (err: any) {
      setError(err.message || "Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-zinc-300">
          {label} {required && "*"}
        </label>
        <span className="text-[11px] text-zinc-500">
          Upload file or paste URL/path
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        {/* Text Input for URL or local path */}
        <div className="relative flex-1">
          <input
            type="text"
            required={required}
            placeholder="e.g. /work/IMG_4171.JPG or https://..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-[#FF5E14]"
          />
        </div>

        {/* Upload from Computer Button */}
        <button
          type="button"
          disabled={isUploading}
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-[#FF5E14] hover:text-white text-zinc-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shrink-0 border border-white/5 cursor-pointer disabled:opacity-50"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Uploading...</span>
            </>
          ) : uploadSuccess ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Uploaded!</span>
            </>
          ) : (
            <>
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Choose File</span>
            </>
          )}
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {error && (
        <p className="text-[11px] text-red-400 font-medium">{error}</p>
      )}
    </div>
  );
}
