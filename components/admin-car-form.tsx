"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

type Props = {
  onCreated?: () => void
}

export function AdminCarForm({ onCreated }: Props) {
  const [title, setTitle] = useState("")
  const [make, setMake] = useState("")
  const [model, setModel] = useState("")
  const [year, setYear] = useState<number | "">("")
  const [price, setPrice] = useState<number | "">("")
  const [km, setKm] = useState<number | "">("")
  const [fuel, setFuel] = useState<"Petrol" | "Diesel" | "CNG" | "Electric" | "">("")
  const [body, setBody] = useState<"Hatchback" | "Sedan" | "SUV" | "MPV" | "">("")
  const [transmission, setTransmission] = useState<"Manual" | "Automatic" | "">("")
  const [location, setLocation] = useState("")
  const [condition, setCondition] = useState<"New" | "Used" | "">("")
  const [images, setImages] = useState<string[]>([])
  const [imageUrl, setImageUrl] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const fileRef = useRef<HTMLInputElement | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const payload = {
        title,
        make,
        model,
        year: Number(year),
        price: Number(price),
        km: Number(km),
        fuel,
        body,
        transmission,
        location,
        condition,
        images: images.length ? images : imageUrl ? [imageUrl] : [],
        approved: true, // admin-created cars go live immediately
      }
      const res = await fetch("/api/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j.error || `Failed (${res.status})`)
      }
      // reset
      setTitle("")
      setMake("")
      setModel("")
      setYear("")
      setPrice("")
      setKm("")
      setFuel("")
      setBody("")
      setTransmission("")
      setLocation("")
      setCondition("")
      setImages([])
      setImageUrl("")
      if (fileRef.current) fileRef.current.value = ""
      onCreated?.()
    } catch (err) {
      console.log("[v0] Create car failed:", (err as Error).message)
      alert((err as Error).message)
    } finally {
      setSubmitting(false)
    }
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || files.length === 0) return
    const fd = new FormData()
    Array.from(files).forEach((f) => fd.append("files", f))
    fetch("/api/upload", { method: "POST", body: fd })
      .then((r) => r.json())
      .then((j) => {
        if (!Array.isArray(j.urls)) throw new Error("Upload failed")
        setImages((prev) => [...j.urls, ...prev])
      })
      .catch((err) => {
        console.log("[v0] File upload error:", err)
        alert("Failed to upload one of the images")
      })
  }

  return (
    <form onSubmit={onSubmit} className="rounded-lg border p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="md:col-span-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Maruti Swift VXI"
          required
        />
      </div>
      <div>
        <Label htmlFor="make">Make</Label>
        <Input id="make" value={make} onChange={(e) => setMake(e.target.value)} placeholder="Maruti" required />
      </div>
      <div>
        <Label htmlFor="model">Model</Label>
        <Input id="model" value={model} onChange={(e) => setModel(e.target.value)} placeholder="Swift" required />
      </div>

      <div>
        <Label htmlFor="year">Year</Label>
        <Input
          id="year"
          type="number"
          min={1990}
          value={year}
          onChange={(e) => setYear(e.target.value ? Number(e.target.value) : "")}
          required
        />
      </div>
      <div>
        <Label htmlFor="price">Price (₹)</Label>
        <Input
          id="price"
          type="number"
          min={0}
          value={price}
          onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : "")}
          required
        />
      </div>
      <div>
        <Label htmlFor="km">KM</Label>
        <Input
          id="km"
          type="number"
          min={0}
          value={km}
          onChange={(e) => setKm(e.target.value ? Number(e.target.value) : "")}
          required
        />
      </div>
      <div>
        <Label>Transmission</Label>
        <Select value={transmission} onValueChange={(v: any) => setTransmission(v)}>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Manual">Manual</SelectItem>
            <SelectItem value="Automatic">Automatic</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Fuel</Label>
        <Select value={fuel} onValueChange={(v: any) => setFuel(v)}>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Petrol">Petrol</SelectItem>
            <SelectItem value="Diesel">Diesel</SelectItem>
            <SelectItem value="CNG">CNG</SelectItem>
            <SelectItem value="Electric">Electric</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Body</Label>
        <Select value={body} onValueChange={(v: any) => setBody(v)}>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Hatchback">Hatchback</SelectItem>
            <SelectItem value="Sedan">Sedan</SelectItem>
            <SelectItem value="SUV">SUV</SelectItem>
            <SelectItem value="MPV">MPV</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Condition</Label>
        <Select value={condition} onValueChange={(v: any) => setCondition(v)}>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Used">Used</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Pune"
          required
        />
      </div>

      <div className="md:col-span-2">
        <Label htmlFor="imageUrl">Image URL (optional)</Label>
        <Input id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." />
        <p className="text-xs text-muted-foreground mt-1">
          Or upload files below; we store them as data URLs for demo purposes.
        </p>
        <Input ref={fileRef} type="file" multiple accept="image/*" onChange={onFileChange} className="mt-2" />
        {images.length > 0 && (
          <div className="mt-2 flex gap-2 overflow-x-auto">
            {images.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={src || "/placeholder.svg"}
                alt={`Preview ${i + 1}`}
                className="h-14 w-14 object-cover rounded border"
              />
            ))}
          </div>
        )}
      </div>

      <div className="md:col-span-4 flex justify-end">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Adding..." : "Add Car"}
        </Button>
      </div>
    </form>
  )
}
