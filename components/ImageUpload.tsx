"use client";
import { useState } from "react";

export default function ImageUpload({ onUpload }: { onUpload?: (url: string) => void }) {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        if (onUpload) onUpload(data.url);
        setPreview(data.url);
      } else {
        setError(data.error || "Upload failed");
      }
    } catch (err: any) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        disabled={uploading}
        className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground"
      />
      {uploading && <div className="text-sm text-muted-foreground">Uploading...</div>}
      {error && <div className="text-sm text-red-500">{error}</div>}
      {preview && (
        <div className="mt-2">
          <img src={preview} alt="Preview" className="max-h-32 rounded shadow" />
          <div className="text-xs break-all">{preview}</div>
        </div>
      )}
    </div>
  );
}
