import { NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

export async function POST(req: Request) {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return NextResponse.json({ error: "Cloudinary is not configured" }, { status: 500 })
    }

    const form = await req.formData()
    // Accept both "files" and "images" field names to be robust
    const candidates = [...form.getAll("files"), ...form.getAll("images")]
    const files = candidates.filter((f): f is File => f instanceof File)

    // [v0] debug logs
    console.log("[v0] upload route: candidates=", candidates.length, " files=", files.length)

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 })
    }

    const uploads = await Promise.all(
      files.map(
        (file) =>
          new Promise<string>(async (resolve, reject) => {
            try {
              const buffer = Buffer.from(await file.arrayBuffer())
              const stream = cloudinary.uploader.upload_stream(
                { folder: "cars", resource_type: "image" },
                (err, result) => {
                  if (err || !result) return reject(err || new Error("Upload failed"))
                  resolve(result.secure_url)
                },
              )
              stream.end(buffer)
            } catch (e) {
              reject(e)
            }
          }),
      ),
    )

    // [v0] debug logs
    console.log("[v0] upload route: uploaded urls count=", uploads.length)

    return NextResponse.json({ urls: uploads })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Upload failed" }, { status: 500 })
  }
}
