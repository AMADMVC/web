import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  limit,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

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

export async function getAllPosts(): Promise<StoredBlogPost[]> {
  try {
    const blogsRef = collection(db, "blogs");
    const q = query(blogsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const posts: StoredBlogPost[] = [];
    
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const createdAt = data.createdAt;
      let publishedAtStr = new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      if (createdAt && typeof createdAt.toDate === "function") {
        publishedAtStr = createdAt.toDate().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      }
      posts.push({
        id: docSnap.id,
        slug: data.slug || "",
        title: data.title || "",
        metaTitle: data.metaTitle || `${data.title} | Frame Feature`,
        metaDescription: data.metaDescription || data.excerpt || "",
        excerpt: data.excerpt || "",
        category: data.category || "AI",
        categoryKey: data.categoryKey || (data.category ? data.category.toLowerCase().replace(/[^a-z0-9]/g, "") : "ai"),
        featured: data.featured || false,
        publishedAt: publishedAtStr,
        readTime: data.readTime || "1 min read",
        author: data.author || {
          name: "Amaan",
          role: "Visual & AI Creator",
          avatar: "/gallery/1786386563351-Founder.JPG",
        },
        coverImage: data.coverImageUrl || data.coverImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
        tags: data.tags || [],
        tableOfContents: data.tableOfContents || [],
        rawContent: data.content || data.rawContent || "",
      });
    });
    return posts;
  } catch (error) {
    console.error("Error reading posts from Firestore:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<StoredBlogPost | null> {
  try {
    const blogsRef = collection(db, "blogs");
    const q = query(blogsRef, where("slug", "==", slug.toLowerCase()), limit(1));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return null;
    }
    const docSnap = querySnapshot.docs[0];
    const data = docSnap.data();
    const createdAt = data.createdAt;
    let publishedAtStr = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    if (createdAt && typeof createdAt.toDate === "function") {
      publishedAtStr = createdAt.toDate().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
    return {
      id: docSnap.id,
      slug: data.slug || "",
      title: data.title || "",
      metaTitle: data.metaTitle || `${data.title} | Frame Feature`,
      metaDescription: data.metaDescription || data.excerpt || "",
      excerpt: data.excerpt || "",
      category: data.category || "AI",
      categoryKey: data.categoryKey || (data.category ? data.category.toLowerCase().replace(/[^a-z0-9]/g, "") : "ai"),
      featured: data.featured || false,
      publishedAt: publishedAtStr,
      readTime: data.readTime || "1 min read",
      author: data.author || {
        name: "Amaan",
        role: "Visual & AI Creator",
        avatar: "/gallery/1786386563351-Founder.JPG",
      },
      coverImage: data.coverImageUrl || data.coverImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      tags: data.tags || [],
      tableOfContents: data.tableOfContents || [],
      rawContent: data.content || data.rawContent || "",
    };
  } catch (error) {
    console.error("Error reading post by slug from Firestore:", error);
    return null;
  }
}

export async function savePost(
  newPost: Omit<StoredBlogPost, "id" | "publishedAt" | "categoryKey" | "tableOfContents">
): Promise<StoredBlogPost> {
  const headings = extractHeadings(newPost.rawContent);
  const categoryKey = newPost.category.toLowerCase().replace(/[^a-z0-9]/g, "");

  const blogsRef = collection(db, "blogs");
  const q = query(blogsRef, where("slug", "==", newPost.slug.toLowerCase()), limit(1));
  const querySnapshot = await getDocs(q);

  const postPayload = {
    title: newPost.title,
    slug: newPost.slug.toLowerCase(),
    metaTitle: newPost.metaTitle,
    metaDescription: newPost.metaDescription,
    excerpt: newPost.excerpt,
    category: newPost.category,
    categoryKey,
    readTime: newPost.readTime,
    author: newPost.author,
    coverImageUrl: newPost.coverImage,
    tags: newPost.tags,
    tableOfContents: headings,
    content: newPost.rawContent,
    updatedAt: serverTimestamp(),
  };

  let id = "";
  if (!querySnapshot.empty) {
    const docToUpdate = querySnapshot.docs[0];
    id = docToUpdate.id;
    await updateDoc(doc(db, "blogs", id), postPayload);
  } else {
    const docRef = await addDoc(blogsRef, {
      ...postPayload,
      createdAt: serverTimestamp(),
    });
    id = docRef.id;
  }

  return {
    ...newPost,
    id,
    categoryKey,
    publishedAt: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    tableOfContents: headings,
  };
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
