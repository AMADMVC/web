import fs from "fs";
import path from "path";

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

const WORK_FILE_PATH = path.join(process.cwd(), "data", "work.json");

export function getAllWorkItems(): StoredProjectItem[] {
  try {
    if (!fs.existsSync(WORK_FILE_PATH)) {
      return [];
    }
    const fileContent = fs.readFileSync(WORK_FILE_PATH, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading work.json:", error);
    return [];
  }
}

export function getWorkItemBySlug(slug: string): StoredProjectItem | null {
  const items = getAllWorkItems();
  return items.find((w) => w.slug.toLowerCase() === slug.toLowerCase()) || null;
}

export function saveWorkItem(
  item: Omit<StoredProjectItem, "id" | "categoryKey">
): StoredProjectItem {
  const items = getAllWorkItems();

  const categoryMap: Record<string, "visual" | "ai" | "content" | "editing"> = {
    "Visual Content": "visual",
    "AI Experiments": "ai",
    "Content Formats": "content",
    "Editing Work": "editing",
  };

  const newItem: StoredProjectItem = {
    ...item,
    id: item.slug || `work-${Date.now()}`,
    categoryKey: categoryMap[item.category] || "ai",
  };

  const existingIdx = items.findIndex((w) => w.slug === newItem.slug);
  if (existingIdx >= 0) {
    items[existingIdx] = { ...items[existingIdx], ...newItem };
  } else {
    items.unshift(newItem);
  }

  const dir = path.dirname(WORK_FILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(WORK_FILE_PATH, JSON.stringify(items, null, 2), "utf-8");
  return newItem;
}

export function deleteWorkItem(slug: string): boolean {
  const items = getAllWorkItems();
  const filtered = items.filter((w) => w.slug.toLowerCase() !== slug.toLowerCase());
  if (filtered.length === items.length) return false; // nothing removed

  const dir = path.dirname(WORK_FILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(WORK_FILE_PATH, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}
