import { NextRequest, NextResponse } from "next/server";
import {
  getAllPosts,
  getPostBySlug,
  savePost,
  deletePost,
  updatePostStatus,
  slugify,
  ContentStatus,
} from "@/utils/blogStorage";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const includeAll = searchParams.get("all") === "true";

    if (slug) {
      const post = await getPostBySlug(slug, includeAll);
      if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      }
      return NextResponse.json({ post });
    }

    const posts = await getAllPosts(includeAll);
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error in GET /api/blog:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
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
      excerpt,
      category,
      status,
      readTime,
      authorName,
      authorRole,
      authorAvatar,
      coverImage,
      tags,
      rawContent,
    } = body;

    if (!title || !rawContent) {
      return NextResponse.json(
        { error: "Title and content are required." },
        { status: 400 }
      );
    }

    const finalSlug = slugify(customSlug || title);
    const finalMetaTitle = metaTitle?.trim() || `${title} | Frame Feature`;
    const finalMetaDescription =
      metaDescription?.trim() ||
      excerpt?.trim() ||
      rawContent.slice(0, 155).replace(/[#*>\-_`]/g, "").trim();
    const finalStatus: ContentStatus = status === "draft" ? "draft" : "published";

    const saved = await savePost({
      id,
      title: title.trim(),
      slug: finalSlug,
      metaTitle: finalMetaTitle,
      metaDescription: finalMetaDescription,
      excerpt: excerpt?.trim() || finalMetaDescription.slice(0, 160),
      category: category || "AI",
      status: finalStatus,
      readTime: readTime || `${Math.max(1, Math.ceil(rawContent.split(/\s+/).length / 200))} min read`,
      author: {
        name: authorName || "Amaan",
        role: authorRole || "Visual & AI Creator",
        avatar:
          authorAvatar ||
          "/gallery/1786386563351-Founder.JPG",
      },
      coverImage:
        coverImage ||
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      tags: Array.isArray(tags) ? tags : typeof tags === "string" ? tags.split(",").map((t: string) => t.trim()).filter(Boolean) : ["AI", "Visuals"],
      rawContent: rawContent.trim(),
    });

    return NextResponse.json({ success: true, post: saved }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/blog:", error);
    return NextResponse.json(
      { error: "Failed to save blog post." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, id, status } = body;
    const targetIdentifier = slug || id;

    if (!targetIdentifier || !status) {
      return NextResponse.json(
        { error: "Target identifier (slug/id) and status are required." },
        { status: 400 }
      );
    }

    const updated = await updatePostStatus(targetIdentifier, status as ContentStatus);
    if (!updated) {
      return NextResponse.json({ error: "Failed to update blog status." }, { status: 404 });
    }

    return NextResponse.json({ success: true, status });
  } catch (error) {
    console.error("Error in PATCH /api/blog:", error);
    return NextResponse.json({ error: "Failed to update post status" }, { status: 500 });
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

    const deleted = await deletePost(target);
    if (!deleted) {
      return NextResponse.json({ error: "Post not found or delete failed" }, { status: 404 });
    }

    return NextResponse.json({ success: true, deleted: target });
  } catch (error) {
    console.error("Error in DELETE /api/blog:", error);
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 });
  }
}
