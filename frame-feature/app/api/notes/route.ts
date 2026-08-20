import { NextRequest, NextResponse } from "next/server";
import { getAllNotes, saveNote, deleteNote, updateNoteStatus } from "@/utils/notesStorage";
import { slugify, ContentStatus } from "@/utils/blogStorage";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeAll = searchParams.get("all") === "true";
    const items = await getAllNotes(includeAll);
    return NextResponse.json({ items });
  } catch (error) {
    console.error("Error in GET /api/notes:", error);
    return NextResponse.json({ error: "Failed to fetch notes" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      title,
      slug: customSlug,
      date,
      category,
      status,
      readTime,
      summary,
      content,
      takeaway,
      socialEmbed,
    } = body;

    if (!title || !summary || !takeaway) {
      return NextResponse.json(
        { error: "Title, Summary, and Takeaway are required fields." },
        { status: 400 }
      );
    }

    const finalSlug = slugify(customSlug || title);
    const finalStatus: ContentStatus = status === "draft" ? "draft" : "published";
    const finalContent = Array.isArray(content)
      ? content
      : typeof content === "string"
      ? content.split("\n").map((line: string) => line.trim()).filter(Boolean)
      : [];

    const saved = await saveNote({
      id,
      title: title.trim(),
      slug: finalSlug,
      date: date?.trim() || new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      category: category || "AI",
      status: finalStatus,
      readTime: readTime?.trim() || "1 min read",
      summary: summary.trim(),
      content: finalContent,
      takeaway: takeaway.trim(),
      socialEmbed: socialEmbed?.trim() || "",
    });

    return NextResponse.json({ success: true, item: saved }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/notes:", error);
    return NextResponse.json({ error: "Failed to save note" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Note ID and status are required." }, { status: 400 });
    }

    const updated = await updateNoteStatus(id, status as ContentStatus);
    if (!updated) {
      return NextResponse.json({ error: "Failed to update note status" }, { status: 404 });
    }

    return NextResponse.json({ success: true, status });
  } catch (error) {
    console.error("Error in PATCH /api/notes:", error);
    return NextResponse.json({ error: "Failed to update note status" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Note ID is required" }, { status: 400 });
    }

    const deleted = await deleteNote(id);
    if (!deleted) {
      return NextResponse.json({ error: "Failed to delete note from database" }, { status: 500 });
    }

    return NextResponse.json({ success: true, deleted: id });
  } catch (error) {
    console.error("Error in DELETE /api/notes:", error);
    return NextResponse.json({ error: "Failed to delete note" }, { status: 500 });
  }
}
