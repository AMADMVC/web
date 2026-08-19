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
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

export interface StoredProjectItem {
  id: string;
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  category: "Visual Content" | "AI Experiments" | "Content Formats" | "Editing Work";
  categoryKey: "visual" | "ai" | "content" | "editing";
  summary: string;
  image: string;
  year: string;
  tags: string[];
  idea: string;
  process: {
    tools: string[];
    method: string;
  };
  output: string;
  learning: {
    whatWorked: string;
    whatDidnt: string;
  };
}

export async function getAllWorkItems(): Promise<StoredProjectItem[]> {
  try {
    const workRef = collection(db, "projects");
    const q = query(workRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const items: StoredProjectItem[] = [];

    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      items.push({
        id: docSnap.id,
        slug: data.slug || "",
        title: data.title || "",
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        category: data.category || "AI Experiments",
        categoryKey: data.categoryKey || "ai",
        summary: data.summary || "",
        image: data.imageUrl || data.image || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
        year: data.year || new Date().getFullYear().toString(),
        tags: data.tags || [],
        idea: data.idea || "",
        process: data.process || { tools: [], method: "" },
        output: data.output || "",
        learning: data.learning || { whatWorked: "", whatDidnt: "" },
      });
    });
    return items;
  } catch (error) {
    console.error("Error reading work items from Firestore:", error);
    return [];
  }
}

export async function getWorkItemBySlug(slug: string): Promise<StoredProjectItem | null> {
  try {
    const workRef = collection(db, "projects");
    const q = query(workRef, where("slug", "==", slug.toLowerCase()), limit(1));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return null;
    }
    const docSnap = querySnapshot.docs[0];
    const data = docSnap.data();
    return {
      id: docSnap.id,
      slug: data.slug || "",
      title: data.title || "",
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      category: data.category || "AI Experiments",
      categoryKey: data.categoryKey || "ai",
      summary: data.summary || "",
      image: data.imageUrl || data.image || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      year: data.year || new Date().getFullYear().toString(),
      tags: data.tags || [],
      idea: data.idea || "",
      process: data.process || { tools: [], method: "" },
      output: data.output || "",
      learning: data.learning || { whatWorked: "", whatDidnt: "" },
    };
  } catch (error) {
    console.error("Error reading work item by slug from Firestore:", error);
    return null;
  }
}

export async function saveWorkItem(
  item: Omit<StoredProjectItem, "id" | "categoryKey">
): Promise<StoredProjectItem> {
  const categoryMap: Record<string, "visual" | "ai" | "content" | "editing"> = {
    "Visual Content": "visual",
    "AI Experiments": "ai",
    "Content Formats": "content",
    "Editing Work": "editing",
  };

  const categoryKey = categoryMap[item.category] || "ai";
  const workRef = collection(db, "projects");
  const q = query(workRef, where("slug", "==", item.slug.toLowerCase()), limit(1));
  const querySnapshot = await getDocs(q);

  const payload = {
    title: item.title,
    slug: item.slug.toLowerCase(),
    metaTitle: item.metaTitle || `${item.title} | Frame Feature Work`,
    metaDescription: item.metaDescription || item.summary || item.idea.slice(0, 155),
    category: item.category,
    categoryKey,
    summary: item.summary,
    imageUrl: item.image,
    year: item.year,
    tags: item.tags,
    idea: item.idea,
    process: item.process,
    output: item.output,
    learning: item.learning,
    updatedAt: serverTimestamp(),
  };

  let id = "";
  if (!querySnapshot.empty) {
    const docToUpdate = querySnapshot.docs[0];
    id = docToUpdate.id;
    await updateDoc(doc(db, "projects", id), payload);
  } else {
    const docRef = await addDoc(workRef, {
      ...payload,
      createdAt: serverTimestamp(),
    });
    id = docRef.id;
  }

  return {
    ...item,
    id,
    categoryKey,
  };
}

export async function deleteWorkItem(slug: string): Promise<boolean> {
  try {
    const workRef = collection(db, "projects");
    const q = query(workRef, where("slug", "==", slug.toLowerCase()), limit(1));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return false;
    }
    
    const docToDelete = querySnapshot.docs[0];
    await deleteDoc(doc(db, "projects", docToDelete.id));
    return true;
  } catch (error) {
    console.error("Error deleting work item from Firestore:", error);
    return false;
  }
}
