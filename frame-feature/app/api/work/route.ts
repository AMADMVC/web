import { NextRequest, NextResponse } from "next/server";
import { getAllWorkItems, getWorkItemBySlug, saveWorkItem, deleteWorkItem } from "@/utils/workStorage";
import { slugify } from "@/utils/blogStorage";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (slug) {
      const item = getWorkItemBySlug(slug);
      if (!item) {
        return NextResponse.json({ error: "Project not found" }, { status: 404 });
      }
      return NextResponse.json({ item });
    }

    const items = getAllWorkItems();
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
      title,
      slug: customSlug,
      metaTitle,
      metaDescription,
      category,
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

    const saved = saveWorkItem({
      title: title.trim(),
      slug: finalSlug,
      metaTitle: finalMetaTitle,
      metaDescription: finalMetaDescription,
      category: category || "AI Experiments",
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

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const deleted = deleteWorkItem(slug);
    if (!deleted) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, deleted: slug });
  } catch (error) {
    console.error("Error in DELETE /api/work:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
