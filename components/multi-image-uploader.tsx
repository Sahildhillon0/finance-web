"use client"

import React from "react"

type Props = {
  onUrlsChange: (urls: string[]) => void
  autoUpload?: boolean
  onError?: (message: string) => void
}

export default function MultiImageUploader({ onUrlsChange, autoUpload = true, onError }: Props) {
  const [files, setFiles] = React.useState<File[]>([])
  const [previews, setPreviews] = React.useState<string[]>([])
  const [uploading, setUploading] = React.useState(false)
  const [urls, setUrls] = React.useState<string[]>([])

  function handleSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const f = Array.from(e.target.files || [])
    setFiles(f)
    const nextPreviews = f.map((file) => URL.createObjectURL(file))
    setPreviews(nextPreviews)
    console.log("[v0] uploader: selected files =", f.length)
    if (autoUpload && f.length > 0) {
      // Trigger upload immediately using the freshly selected files
      void doUpload(f)
    }
  }

  async function doUpload(selected?: File[]) {
    const toUpload = selected ?? files
    if (toUpload.length === 0) return
    setUploading(true)
    try {
      const form = new FormData()
      toUpload.forEach((f) => form.append("images", f))
      const res = await fetch("/api/upload", { method: "POST", body: form })
      if (!res.ok) throw new Error("Upload failed")
      const data = await res.json()
      console.log("[v0] uploader: uploaded urls =", data?.urls?.length ?? 0)
      setUrls(data.urls || [])
      onUrlsChange(data.urls || [])
    } catch (e) {
      const msg = (e as Error).message
      console.error("[v0] Upload error:", msg)
      onUrlsChange([])
      onError?.(msg)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium">Car Images</label>
      <input type="file" accept="image/*" multiple onChange={handleSelect} className="block w-full" />
      {previews.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {previews.map((src, i) => (
            <img
              key={i}
              src={src || "/placeholder.svg"}
              alt={`Preview ${i + 1}`}
              className="h-24 w-full object-cover rounded"
            />
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={() => doUpload()}
        disabled={uploading || files.length === 0}
        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
      >
        {uploading ? "Uploading..." : autoUpload ? "Re-upload images" : "Upload images"}
      </button>
      {urls.length > 0 && (
        <p className="text-xs text-muted-foreground">
          Uploaded {urls.length} image{urls.length > 1 ? "s" : ""}.
        </p>
      )}
    </div>
  )
}
