import fs from "fs";
import path from "path";

export interface StoredBlogPost {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  category: "AI" | "Visuals" | "Content" | "Workflows" | "Engineering";
  categoryKey: string;
  featured?: boolean;
  publishedAt: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  coverImage: string;
  tags: string[];
  tableOfContents?: {
    id: string;
    title: string;
  }[];
  rawContent: string;
}

const POSTS_FILE_PATH = path.join(process.cwd(), "data", "posts.json");

export function getAllPosts(): StoredBlogPost[] {
  try {
    if (!fs.existsSync(POSTS_FILE_PATH)) {
      return [];
    }
    const fileContent = fs.readFileSync(POSTS_FILE_PATH, "utf-8");
    const posts: StoredBlogPost[] = JSON.parse(fileContent);
    return posts;
  } catch (error) {
    console.error("Error reading posts.json:", error);
    return [];
  }
}

export function getPostBySlug(slug: string): StoredBlogPost | null {
  const posts = getAllPosts();
  return posts.find((p) => p.slug.toLowerCase() === slug.toLowerCase()) || null;
}

export function savePost(newPost: Omit<StoredBlogPost, "id" | "publishedAt" | "categoryKey" | "tableOfContents">): StoredBlogPost {
  const posts = getAllPosts();

  // Extract table of contents from markdown headings (## Heading)
  const headings = extractHeadings(newPost.rawContent);

  const fullPost: StoredBlogPost = {
    ...newPost,
    id: `post-${Date.now()}`,
    categoryKey: newPost.category.toLowerCase().replace(/[^a-z0-9]/g, ""),
    publishedAt: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    tableOfContents: headings,
  };

  // Check if post with same slug already exists and update it, else prepend
  const existingIdx = posts.findIndex((p) => p.slug === fullPost.slug);
  if (existingIdx >= 0) {
    posts[existingIdx] = { ...posts[existingIdx], ...fullPost };
  } else {
    posts.unshift(fullPost);
  }

  // Ensure data directory exists
  const dir = path.dirname(POSTS_FILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(POSTS_FILE_PATH, JSON.stringify(posts, null, 2), "utf-8");
  return fullPost;
}

export function extractHeadings(markdown: string): { id: string; title: string }[] {
  const headingRegex = /^##\s+(.+)$/gm;
  const headings: { id: string; title: string }[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const title = match[1].trim();
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    headings.push({ id, title });
  }

  return headings;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
