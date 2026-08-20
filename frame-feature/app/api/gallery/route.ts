import { NextRequest, NextResponse } from "next/server";
import {
  getAllGalleryItems,
  saveGalleryItem,
  deleteGalleryItem,
  updateGalleryItemStatus,
} from "@/utils/galleryStorage";
import { ContentStatus } from "@/utils/blogStorage";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeAll = searchParams.get("all") === "true";
    const items = await getAllGalleryItems(includeAll);
    return NextResponse.json({ items });
  } catch (error) {
    console.error("Error in GET /api/gallery:", error);
    return NextResponse.json({ error: "Failed to fetch gallery items" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, category, tag, status, image, aspectRatio, description, year } = body;

    if (!title || !image) {
      return NextResponse.json(
        { error: "Title and Image URL are required." },
        { status: 400 }
      );
    }

    const finalStatus: ContentStatus = status === "draft" ? "draft" : "published";

    const saved = await saveGalleryItem({
      id,
      title: title.trim(),
      category: category || "Visual experiments",
      tag: tag?.trim() || "Visual",
      status: finalStatus,
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

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Item ID and status are required." }, { status: 400 });
    }

    const updated = await updateGalleryItemStatus(id, status as ContentStatus);
    if (!updated) {
      return NextResponse.json({ error: "Failed to update gallery item status" }, { status: 404 });
    }

    return NextResponse.json({ success: true, status });
  } catch (error) {
    console.error("Error in PATCH /api/gallery:", error);
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Gallery item ID is required" }, { status: 400 });
    }

    const deleted = await deleteGalleryItem(id);
    if (!deleted) {
      return NextResponse.json({ error: "Failed to delete gallery item" }, { status: 500 });
    }

    return NextResponse.json({ success: true, deleted: id });
  } catch (error) {
    console.error("Error in DELETE /api/gallery:", error);
    return NextResponse.json({ error: "Failed to delete gallery item" }, { status: 500 });
  }
}
