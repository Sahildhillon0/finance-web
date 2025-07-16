export const runtime = "nodejs";

import { type NextRequest, NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import { join } from "path"
import { authenticateRequest } from "@/lib/auth"

export async function POST(request: NextRequest) {
  console.log("[UPLOAD] Incoming upload request")

  try {
    const data = await request.formData()
    console.log("[UPLOAD] Got form data", data)
    const file = data.get("file")
    console.log("[UPLOAD] file object:", file)
    if (!file || typeof file !== "object" || !("arrayBuffer" in file)) {
      console.log("[UPLOAD] Invalid or missing file", file)
      return NextResponse.json({ error: "No file uploaded or invalid file object" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    console.log("[UPLOAD] Buffer created, size:", buffer.length)

    // Use original filename if available, else fallback
    const originalName = "name" in file ? (file as any).name : "upload"
    const filename = `${Date.now()}-${originalName.replace(/[^a-zA-Z0-9.]/g, "_")}`;
    const uploadDir = join(process.cwd(), "public", "uploads");

    // Ensure uploads directory exists (sync is safe here for one-off check)
    const fs = await import("fs");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
      console.log("[UPLOAD] Created uploads directory:", uploadDir);
    }

    const path = join(uploadDir, filename);
    console.log("[UPLOAD] Saving to path:", path);

    await writeFile(path, buffer);

    console.log("[UPLOAD] File saved successfully");

    return NextResponse.json({
      url: `/uploads/${filename}`,
      message: "File uploaded successfully",
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
