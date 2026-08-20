import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  where,
  limit,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { ContentStatus } from "./blogStorage";

export interface StoredNoteItem {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: "Visuals" | "AI" | "Content" | "Workflows";
  categoryKey: "visuals" | "ai" | "content" | "workflows";
  status: ContentStatus;
  readTime: string;
  summary: string;
  content: string[];
  takeaway: string;
  socialEmbed?: string;
}

export async function getAllNotes(includeAll: boolean = false): Promise<StoredNoteItem[]> {
  try {
    const notesRef = collection(db, "notes");
    const q = query(notesRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const items: StoredNoteItem[] = [];

    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const status: ContentStatus = data.status === "draft" ? "draft" : "published";

      if (!includeAll && status === "draft") {
        return;
      }

      items.push({
        id: docSnap.id,
        slug: data.slug || "",
        title: data.title || "",
        date: data.date || "",
        category: data.category || "AI",
        categoryKey: data.categoryKey || "ai",
        status,
        readTime: data.readTime || "1 min read",
        summary: data.summary || "",
        content: data.content || [],
        takeaway: data.takeaway || "",
        socialEmbed: data.socialEmbed || "",
      });
    });
    return items;
  } catch (error) {
    console.error("Error reading notes from Firestore:", error);
    return [];
  }
}

export async function saveNote(
  item: Omit<StoredNoteItem, "id" | "categoryKey"> & { id?: string; status?: ContentStatus }
): Promise<StoredNoteItem> {
  const categoryMap: Record<string, "visuals" | "ai" | "content" | "workflows"> = {
    "Visuals": "visuals",
    "AI": "ai",
    "Content": "content",
    "Workflows": "workflows",
  };

  const categoryKey = categoryMap[item.category] || "ai";
  const status: ContentStatus = item.status || "published";
  const notesRef = collection(db, "notes");

  const payload = {
    title: item.title,
    slug: item.slug.toLowerCase(),
    date: item.date || new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
    category: item.category,
    categoryKey,
    status,
    readTime: item.readTime || "1 min read",
    summary: item.summary,
    content: item.content,
    takeaway: item.takeaway,
    socialEmbed: item.socialEmbed || "",
    updatedAt: serverTimestamp(),
  };

  let id = item.id || "";
  if (id) {
    await updateDoc(doc(db, "notes", id), payload);
  } else {
    const docRef = await addDoc(notesRef, {
      ...payload,
      createdAt: serverTimestamp(),
    });
    id = docRef.id;
  }

  return {
    ...item,
    id,
    status,
    categoryKey,
  };
}

export async function updateNoteStatus(id: string, status: ContentStatus): Promise<boolean> {
  try {
    await updateDoc(doc(db, "notes", id), {
      status,
      updatedAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error("Error updating note status:", error);
    return false;
  }
}

export async function deleteNote(id: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, "notes", id));
    return true;
  } catch (error) {
    console.error("Error deleting note from Firestore:", error);
    return false;
  }
}
