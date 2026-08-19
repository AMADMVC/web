import { NextRequest, NextResponse } from "next/server";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "@/lib/firebase";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "uploads";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();

    // Sanitize filename
    const cleanFileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const storageRef = ref(storage, `${folder}/${cleanFileName}`);
    
    // Upload bytes to Firebase Storage
    const uploadResult = await uploadBytes(storageRef, bytes);
    const publicUrl = await getDownloadURL(uploadResult.ref);

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: cleanFileName,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload file" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const folder = searchParams.get("folder") || "gallery";

    // Safety check to prevent directory traversal
    if (folder.includes("..") || folder.includes("/") || folder.includes("\\")) {
      return NextResponse.json({ error: "Invalid folder name" }, { status: 400 });
    }

    let files: string[] = [];

    // 1. Read local files from public folder if they exist
    try {
      const path = await import("path");
      const fs = await import("fs");
      const targetDir = path.join(process.cwd(), "public", folder);
      if (fs.existsSync(targetDir)) {
        const localFiles = fs.readdirSync(targetDir)
          .filter((file) => {
            const ext = path.extname(file).toLowerCase();
            return [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"].includes(ext);
          });
        files = [...localFiles];
      }
    } catch (e) {
      console.warn("Could not read local files:", e);
    }

    // 2. Read files from Firebase Storage folder
    try {
      const folderRef = ref(storage, folder);
      const listResult = await listAll(folderRef);
      const firebaseFiles = listResult.items.map((item) => item.name);
      files = [...files, ...firebaseFiles];
    } catch (e) {
      console.warn("Could not read firebase files:", e);
    }

    // De-duplicate and sort
    const uniqueFiles = Array.from(new Set(files)).sort((a, b) => a.localeCompare(b));

    return NextResponse.json({ files: uniqueFiles });
  } catch (error: any) {
    console.error("List files error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to list files" },
      { status: 500 }
    );
  }
}


