export const runtime = "nodejs";

import { type NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file = data.get("file");
    if (!file || typeof file !== "object" || !("arrayBuffer" in file)) {
      return NextResponse.json({ error: "No file uploaded or invalid file object" }, { status: 400 });
    }
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const originalName = "name" in file ? (file as any).name : "upload";
    // Upload buffer to Cloudinary
    try {
      const uploadResult = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "cars", public_id: originalName.split(".")[0] },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        ).end(buffer);
      });
      return NextResponse.json({ url: uploadResult.secure_url, message: "File uploaded successfully" });
    } catch (error: any) {
      return NextResponse.json({ error: error.message || "Failed to upload to Cloudinary" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
