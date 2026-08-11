"use client";

import Link from "next/link";
import { Pencil } from "lucide-react";
import { AdminOnly } from "@/components/admin/AdminOnly";
import { DeleteWorkButton } from "@/components/work/DeleteWorkButton";

export function WorkAdminBar({ slug, title }: { slug: string; title: string }) {
  return (
    <AdminOnly>
      <div className="flex items-center gap-2">
        <Link
          href={`/work/edit/${slug}`}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-[#FF5E14]/20 hover:border-[#FF5E14]/40 border border-white/10 text-zinc-400 hover:text-[#FF7A1A] text-xs font-bold transition-all"
        >
          <Pencil className="w-3 h-3" />
          Edit Case Study
        </Link>
        <DeleteWorkButton slug={slug} title={title} />
      </div>
    </AdminOnly>
  );
}
