import { NextRequest, NextResponse } from "next/server";
import { getAllNotes, saveNote, deleteNote } from "@/utils/notesStorage";
import { slugify } from "@/utils/blogStorage";

export async function GET(request: NextRequest) {
  try {
    const items = await getAllNotes();
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
      title,
      slug: customSlug,
      date,
      category,
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
    const finalContent = Array.isArray(content)
      ? content
      : typeof content === "string"
      ? content.split("\n").map((line: string) => line.trim()).filter(Boolean)
      : [];

    const saved = await saveNote({
      title: title.trim(),
      slug: finalSlug,
      date: date?.trim() || new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      category: category || "AI",
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
