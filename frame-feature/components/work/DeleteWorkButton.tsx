"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { AdminOnly } from "@/components/admin/AdminOnly";

export function DeleteWorkButton({ slug, title }: { slug: string; title: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `"${title}" ko permanently delete karna hai?\n\nYah action undo nahi ho sakti.`
    );
    if (!confirmed) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/work?slug=${encodeURIComponent(slug)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.push("/work");
        router.refresh();
      } else {
        alert("Delete failed. Please try again.");
        setDeleting(false);
      }
    } catch {
      alert("Network error. Please try again.");
      setDeleting(false);
    }
  };

  return (
    <AdminOnly>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-red-900/40 hover:border-red-500/40 border border-white/10 text-zinc-500 hover:text-red-400 text-xs font-bold transition-all disabled:opacity-40 cursor-pointer"
        title="Delete Case Study"
      >
        <Trash2 className="w-3 h-3" />
        {deleting ? "Deleting..." : "Delete"}
      </button>
    </AdminOnly>
  );
}
