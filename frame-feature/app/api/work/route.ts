import { NextRequest, NextResponse } from "next/server";
import {
  getAllWorkItems,
  getWorkItemBySlug,
  saveWorkItem,
  deleteWorkItem,
  updateWorkItemStatus,
} from "@/utils/workStorage";
import { slugify, ContentStatus } from "@/utils/blogStorage";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const includeAll = searchParams.get("all") === "true";

    if (slug) {
      const item = await getWorkItemBySlug(slug, includeAll);
      if (!item) {
        return NextResponse.json({ error: "Project not found" }, { status: 404 });
      }
      return NextResponse.json({ item });
    }

    const items = await getAllWorkItems(includeAll);
    return NextResponse.json({ items });
  } catch (error) {
    console.error("Error in GET /api/work:", error);
    return NextResponse.json({ error: "Failed to fetch work items" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      title,
      slug: customSlug,
      metaTitle,
      metaDescription,
      category,
      status,
      summary,
      image,
      year,
      tags,
      idea,
      tools,
      processMethod,
      output,
      whatWorked,
      whatDidnt,
    } = body;

    if (!title || !image || !idea) {
      return NextResponse.json(
        { error: "Title, Image URL, and Idea description are required." },
        { status: 400 }
      );
    }

    const finalSlug = slugify(customSlug || title);
    const finalMetaTitle = metaTitle?.trim() || `${title} | Frame Feature Work`;
    const finalMetaDescription =
      metaDescription?.trim() ||
      summary?.trim() ||
      idea.slice(0, 155);
    const finalStatus: ContentStatus = status === "draft" ? "draft" : "published";

    const saved = await saveWorkItem({
      id,
      title: title.trim(),
      slug: finalSlug,
      metaTitle: finalMetaTitle,
      metaDescription: finalMetaDescription,
      category: category || "AI Experiments",
      status: finalStatus,
      summary: summary?.trim() || idea.slice(0, 140),
      image: image.trim(),
      year: year?.trim() || new Date().getFullYear().toString(),
      tags: Array.isArray(tags)
        ? tags
        : typeof tags === "string"
        ? tags.split(",").map((t: string) => t.trim()).filter(Boolean)
        : ["Visual", "Study"],
      idea: idea.trim(),
      process: {
        tools: Array.isArray(tools)
          ? tools
          : typeof tools === "string"
          ? tools.split(",").map((t: string) => t.trim()).filter(Boolean)
          : ["Midjourney", "ComfyUI"],
        method: processMethod?.trim() || "Constructed iterative visual prompt workflows.",
      },
      output: output?.trim() || "Visual output frames and composition study.",
      learning: {
        whatWorked: whatWorked?.trim() || "High contrast and focused negative space.",
        whatDidnt: whatDidnt?.trim() || "Unconstrained prompt tokens caused noise.",
      },
    });

    return NextResponse.json({ success: true, item: saved }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/work:", error);
    return NextResponse.json({ error: "Failed to save project" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, id, status } = body;
    const target = slug || id;

    if (!target || !status) {
      return NextResponse.json(
        { error: "Target identifier (slug/id) and status are required." },
        { status: 400 }
      );
    }

    const updated = await updateWorkItemStatus(target, status as ContentStatus);
    if (!updated) {
      return NextResponse.json({ error: "Failed to update project status" }, { status: 404 });
    }

    return NextResponse.json({ success: true, status });
  } catch (error) {
    console.error("Error in PATCH /api/work:", error);
    return NextResponse.json({ error: "Failed to update project status" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const id = searchParams.get("id");
    const target = slug || id;

    if (!target) {
      return NextResponse.json({ error: "Slug or ID is required" }, { status: 400 });
    }

    const deleted = await deleteWorkItem(target);
    if (!deleted) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, deleted: target });
  } catch (error) {
    console.error("Error in DELETE /api/work:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
