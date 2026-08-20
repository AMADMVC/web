"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RefreshCw,
  Eye,
  Filter,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface ManagedItem {
  id: string;
  slug?: string;
  title: string;
  category?: string;
  status: "draft" | "published";
  date?: string;
  publishedAt?: string;
  year?: string;
  image?: string;
  coverImage?: string;
  summary?: string;
  excerpt?: string;
}

interface ContentManagerProps {
  title: string;
  description: string;
  apiEndpoint: string;
  createHref: string;
  editHrefPrefix?: string;
  viewHrefPrefix?: string;
  type: "blog" | "work" | "gallery" | "notes" | "team";
}

export function ContentManager({
  title,
  description,
  apiEndpoint,
  createHref,
  editHrefPrefix,
  viewHrefPrefix,
  type,
}: ContentManagerProps) {
  const [items, setItems] = useState<ManagedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");
  const [togglingId, setTogglingId] = useState<string | null>(null);

  // Delete modal state
  const [itemToDelete, setItemToDelete] = useState<ManagedItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiEndpoint}?all=true`, { cache: "no-store" });
      const data = await res.json();
      const list: ManagedItem[] =
        data.posts || data.items || data.projects || data.gallery || [];
      setItems(list);
    } catch (err) {
      console.error(`Error fetching ${type} items:`, err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [apiEndpoint]);

  const handleToggleStatus = async (item: ManagedItem) => {
    const nextStatus = item.status === "published" ? "draft" : "published";
    const targetIdentifier = item.slug || item.id;
    setTogglingId(item.id);

    // Optimistic update
    setItems((prev) =>
      prev.map((it) => (it.id === item.id ? { ...it, status: nextStatus } : it))
    );

    try {
      const res = await fetch(apiEndpoint, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: item.id,
          slug: item.slug,
          status: nextStatus,
        }),
      });

      if (!res.ok) {
        // Revert on error
        setItems((prev) =>
          prev.map((it) => (it.id === item.id ? { ...it, status: item.status } : it))
        );
      }
    } catch (err) {
      console.error("Failed to toggle status:", err);
      // Revert on error
      setItems((prev) =>
        prev.map((it) => (it.id === item.id ? { ...it, status: item.status } : it))
      );
    } finally {
      setTogglingId(null);
    }
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    setIsDeleting(true);
    const identifier = itemToDelete.slug || itemToDelete.id;

    try {
      const queryParam = itemToDelete.slug
        ? `slug=${encodeURIComponent(itemToDelete.slug)}`
        : `id=${encodeURIComponent(itemToDelete.id)}`;
      const res = await fetch(`${apiEndpoint}?${queryParam}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setItems((prev) => prev.filter((it) => it.id !== itemToDelete.id));
        setItemToDelete(null);
      } else {
        alert("Failed to delete item. Please try again.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error occurred while deleting item.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Filter items based on search and status
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.slug && item.slug.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;
    if (filterStatus === "all") return true;
    return item.status === filterStatus;
  });

  const totalCount = items.length;
  const publishedCount = items.filter((i) => i.status === "published").length;
  const draftCount = items.filter((i) => i.status === "draft").length;

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/8">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#FF5E14]" />
            <span>{title}</span>
          </h3>
          <p className="text-xs text-zinc-400 mt-1">{description}</p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchItems}
            title="Refresh list"
            className="p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:border-[#FF5E14]/40 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#FF5E14]" : ""}`} />
          </button>
          <Link href={createHref}>
            <Button size="sm" icon={<Plus className="w-4 h-4" />}>
              Create New
            </Button>
          </Link>
        </div>
      </div>

      {/* Control bar: Search + Filter Tabs + Metrics */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={`Search ${title.toLowerCase()}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-950/80 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-[#FF5E14] transition-colors"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-950 border border-white/8 text-xs font-semibold">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filterStatus === "all"
                ? "bg-zinc-800 text-white shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            All ({totalCount})
          </button>
          <button
            onClick={() => setFilterStatus("published")}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              filterStatus === "published"
                ? "bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 shadow-sm"
                : "text-zinc-400 hover:text-emerald-400"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Published ({publishedCount})
          </button>
          <button
            onClick={() => setFilterStatus("draft")}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              filterStatus === "draft"
                ? "bg-amber-950/70 border border-amber-500/40 text-amber-400 shadow-sm"
                : "text-zinc-400 hover:text-amber-400"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Drafts ({draftCount})
          </button>
        </div>
      </div>

      {/* Content Table / Card Grid */}
      <div className="rounded-2xl bg-[#121316]/90 border border-white/10 overflow-hidden shadow-xl backdrop-blur-md">
        {loading && items.length === 0 ? (
          <div className="py-20 text-center text-zinc-500 text-xs flex flex-col items-center justify-center gap-3">
            <div className="w-6 h-6 rounded-full border-2 border-[#FF5E14] border-t-transparent animate-spin" />
            <span>Loading content from database...</span>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-16 text-center text-zinc-500 text-xs space-y-2">
            <p className="font-semibold text-zinc-400">No records found matching criteria.</p>
            <p className="text-[11px] text-zinc-600">
              {searchQuery ? "Try refining your search query." : "Click 'Create New' above to add your first item."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filteredItems.map((item) => {
              const displayDate = item.publishedAt || item.date || item.year || "Recent";
              const isPublished = item.status === "published";
              const viewUrl = viewHrefPrefix
                ? `${viewHrefPrefix}/${item.slug || item.id}`
                : null;
              const editUrl = editHrefPrefix
                ? `${editHrefPrefix}?slug=${item.slug || item.id}`
                : null;

              return (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                >
                  {/* Left: Thumbnail & Info */}
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    {(item.image || item.coverImage) && (
                      <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 overflow-hidden shrink-0">
                        <img
                          src={item.image || item.coverImage}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-bold text-white truncate max-w-md">
                          {item.title}
                        </h4>
                        {item.category && (
                          <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-zinc-400 font-medium">
                            {item.category}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-zinc-500 font-mono">
                        {item.slug && <span>/{item.slug}</span>}
                        <span>&bull;</span>
                        <span>{displayDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Status Toggle + Action Buttons */}
                  <div className="flex items-center gap-2.5 self-end sm:self-center shrink-0">
                    {/* Status Pill Toggle Button */}
                    <button
                      type="button"
                      disabled={togglingId === item.id}
                      onClick={() => handleToggleStatus(item)}
                      className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wide flex items-center gap-1.5 transition-all border cursor-pointer ${
                        isPublished
                          ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-400 hover:bg-emerald-900/60"
                          : "bg-amber-950/60 border-amber-500/40 text-amber-400 hover:bg-amber-900/60"
                      }`}
                      title="Click to toggle Draft / Published"
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isPublished ? "bg-emerald-400" : "bg-amber-400"
                        } ${togglingId === item.id ? "animate-ping" : ""}`}
                      />
                      <span>{isPublished ? "Published" : "Draft"}</span>
                    </button>

                    {/* Live View link */}
                    {viewUrl && isPublished && (
                      <Link
                        href={viewUrl}
                        target="_blank"
                        className="p-2 rounded-xl bg-zinc-900/80 border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-colors"
                        title="View Public Post"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    )}

                    {/* Edit button */}
                    {editUrl && (
                      <Link
                        href={editUrl}
                        className="p-2 rounded-xl bg-zinc-900/80 border border-white/10 text-zinc-400 hover:text-white hover:border-[#FF5E14]/40 transition-colors"
                        title="Edit Item"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>
                    )}

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={() => setItemToDelete(item)}
                      className="p-2 rounded-xl bg-zinc-900/80 border border-white/10 text-zinc-400 hover:text-red-400 hover:border-red-500/40 transition-colors cursor-pointer"
                      title="Delete Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Confirmation Modal for Delete */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-[#141518] border border-white/15 p-6 sm:p-8 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(239,68,68,0.25)]">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-lg font-black text-white">Confirm Deletion</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Are you sure you want to delete{" "}
                <span className="text-white font-bold">&ldquo;{itemToDelete.title}&rdquo;</span>?
                This action is permanent and cannot be undone.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setItemToDelete(null)}
                disabled={isDeleting}
                className="flex-1 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 text-xs font-bold hover:bg-zinc-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isDeleting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Permanently</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
