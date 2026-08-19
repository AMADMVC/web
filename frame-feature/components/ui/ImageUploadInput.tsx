"use client";

import React, { useState, useRef, useEffect } from "react";
import { UploadCloud, CheckCircle2, Loader2, Image as ImageIcon, ChevronDown } from "lucide-react";

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
  const [existingFiles, setExistingFiles] = useState<string[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch list of files in this public folder
  useEffect(() => {
    async function loadFiles() {
      setLoadingFiles(true);
      try {
        const res = await fetch(`/api/upload?folder=${folder}`);
        if (res.ok) {
          const data = await res.json();
          if (data.files) {
            setExistingFiles(data.files);
          }
        }
      } catch (err) {
        console.error("Failed to load existing files:", err);
      } finally {
        setLoadingFiles(false);
      }
    }
    loadFiles();
  }, [folder]);

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
      
      // Add the newly uploaded file to existing files dropdown immediately
      if (data.fileName && !existingFiles.includes(data.fileName)) {
        setExistingFiles(prev => [data.fileName, ...prev].sort((a, b) => a.localeCompare(b)));
      }
      
      setTimeout(() => setUploadSuccess(false), 4000);
    } catch (err: any) {
      setError(err.message || "Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  const currentFileName = value.startsWith(`/${folder}/`)
    ? value.replace(`/${folder}/`, "")
    : "";

  return (
    <div className="space-y-3.5">
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

      {/* Select options from existing folder directory */}
      {existingFiles.length > 0 && (
        <div className="space-y-1.5 p-3 rounded-2xl bg-zinc-950/50 border border-white/5">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500">
            Or select from existing {folder} files:
          </span>
          <div className="relative">
            <select
              value={currentFileName}
              onChange={(e) => {
                if (e.target.value) {
                  onChange(`/${folder}/${e.target.value}`);
                } else {
                  onChange("");
                }
              }}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-xs text-zinc-300 appearance-none focus:outline-none focus:border-[#FF5E14] cursor-pointer"
            >
              <option value="">-- Choose an option --</option>
              {existingFiles.map((file) => (
                <option key={file} value={file}>
                  {file}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-zinc-500">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      )}

      {error && (
        <p className="text-[11px] text-red-400 font-medium">{error}</p>
      )}
    </div>
  );
}

