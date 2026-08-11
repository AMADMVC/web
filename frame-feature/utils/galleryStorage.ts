import fs from "fs";
import path from "path";

export interface StoredGalleryItem {
  id: string;
  title: string;
  category: "Photos" | "Frames" | "Edits" | "Visual experiments";
  tag: string;
  image: string;
  aspectRatio: "portrait" | "landscape" | "square";
  description: string;
  year: string;
}

const GALLERY_FILE_PATH = path.join(process.cwd(), "data", "gallery.json");

export function getAllGalleryItems(): StoredGalleryItem[] {
  try {
    if (!fs.existsSync(GALLERY_FILE_PATH)) {
      return [];
    }
    const fileContent = fs.readFileSync(GALLERY_FILE_PATH, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading gallery.json:", error);
    return [];
  }
}

export function saveGalleryItem(
  item: Omit<StoredGalleryItem, "id">
): StoredGalleryItem {
  const items = getAllGalleryItems();

  const newItem: StoredGalleryItem = {
    ...item,
    id: `g-${Date.now()}`,
  };

  items.unshift(newItem);

  const dir = path.dirname(GALLERY_FILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(GALLERY_FILE_PATH, JSON.stringify(items, null, 2), "utf-8");
  return newItem;
}
