import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

export interface StoredGalleryItem {
  id: string;
  title: string;
  category: "Photos" | "Frames" | "Edits" | "Visual experiments";
  tag: string;
  image: string;
  aspectRatio: "portrait" | "landscape" | "square";
  description: string;
  year: string;
  mediaType?: "image" | "iframe";
  iframeEmbed?: string;
}

export async function getAllGalleryItems(): Promise<StoredGalleryItem[]> {
  try {
    const galleryRef = collection(db, "gallery");
    const q = query(galleryRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const items: StoredGalleryItem[] = [];

    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      items.push({
        id: docSnap.id,
        title: data.title || "",
        category: data.category || "Visual experiments",
        tag: data.tag || "Visual",
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
  item: Omit<StoredGalleryItem, "id">
): Promise<StoredGalleryItem> {
  const galleryRef = collection(db, "gallery");
  const docRef = await addDoc(galleryRef, {
    title: item.title,
    category: item.category,
    tag: item.tag,
    imageUrl: item.image,
    aspectRatio: item.aspectRatio,
    description: item.description,
    year: item.year,
    mediaType: item.mediaType || "image",
    iframeEmbed: item.iframeEmbed || "",
    createdAt: serverTimestamp(),
  });

  return {
    ...item,
    id: docRef.id,
  };
}
