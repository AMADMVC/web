import { NextRequest, NextResponse } from "next/server";
import { getAllGalleryItems, saveGalleryItem } from "@/utils/galleryStorage";

export async function GET() {
  try {
    const items = await getAllGalleryItems();
    return NextResponse.json({ items });
  } catch (error) {
    console.error("Error in GET /api/gallery:", error);
    return NextResponse.json({ error: "Failed to fetch gallery items" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, category, tag, image, aspectRatio, description, year } = body;

    if (!title || !image) {
      return NextResponse.json(
        { error: "Title and Image URL are required." },
        { status: 400 }
      );
    }

    const saved = await saveGalleryItem({
      title: title.trim(),
      category: category || "Visual experiments",
      tag: tag?.trim() || "Visual",
      image: image.trim(),
      aspectRatio: aspectRatio || "landscape",
      description: description?.trim() || "",
      year: year?.trim() || new Date().getFullYear().toString(),
    });

    return NextResponse.json({ success: true, item: saved }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/gallery:", error);
    return NextResponse.json({ error: "Failed to save gallery item" }, { status: 500 });
  }
}
