import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { ContentStatus } from "./blogStorage";

export interface StoredGalleryItem {
  id: string;
  title: string;
  category: "Photos" | "Frames" | "Edits" | "Visual experiments";
  tag: string;
  status: ContentStatus;
  image: string;
  aspectRatio: "portrait" | "landscape" | "square";
  description: string;
  year: string;
  mediaType?: "image" | "iframe";
  iframeEmbed?: string;
}

export async function getAllGalleryItems(includeAll: boolean = false): Promise<StoredGalleryItem[]> {
  try {
    const galleryRef = collection(db, "gallery");
    const q = query(galleryRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const items: StoredGalleryItem[] = [];

    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const status: ContentStatus = data.status === "draft" ? "draft" : "published";

      if (!includeAll && status === "draft") {
        return;
      }

      items.push({
        id: docSnap.id,
        title: data.title || "",
        category: data.category || "Visual experiments",
        tag: data.tag || "Visual",
        status,
        image: data.imageUrl || data.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
        aspectRatio: data.aspectRatio || "landscape",
        description: data.description || "",
        year: data.year || new Date().getFullYear().toString(),
        mediaType: data.mediaType || "image",
        iframeEmbed: data.iframeEmbed || "",
      });
    });
    return items;
  } catch (error) {
    console.error("Error reading gallery from Firestore:", error);
    return [];
  }
}

export async function saveGalleryItem(
  item: Omit<StoredGalleryItem, "id"> & { id?: string; status?: ContentStatus }
): Promise<StoredGalleryItem> {
  const galleryRef = collection(db, "gallery");
  const status: ContentStatus = item.status || "published";

  const payload = {
    title: item.title,
    category: item.category,
    tag: item.tag,
    status,
    imageUrl: item.image,
    aspectRatio: item.aspectRatio,
    description: item.description,
    year: item.year,
    mediaType: item.mediaType || "image",
    iframeEmbed: item.iframeEmbed || "",
    updatedAt: serverTimestamp(),
  };

  let id = item.id || "";
  if (id) {
    await updateDoc(doc(db, "gallery", id), payload);
  } else {
    const docRef = await addDoc(galleryRef, {
      ...payload,
      createdAt: serverTimestamp(),
    });
    id = docRef.id;
  }

  return {
    ...item,
    id,
    status,
  };
}

export async function updateGalleryItemStatus(id: string, status: ContentStatus): Promise<boolean> {
  try {
    await updateDoc(doc(db, "gallery", id), {
      status,
      updatedAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error("Error updating gallery item status:", error);
    return false;
  }
}

export async function deleteGalleryItem(id: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, "gallery", id));
    return true;
  } catch (error) {
    console.error("Error deleting gallery item from Firestore:", error);
    return false;
  }
}
