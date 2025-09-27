"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import MultiImageUploader from "@/components/multi-image-uploader" // add uploader component

export default function SellCarPage() {
  const [imageUrls, setImageUrls] = useState<string[]>([]) // replace files state with imageUrls from MultiImageUploader
  const { toast } = useToast()
  const [submitting, setSubmitting] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      setSubmitting(true)

      if (imageUrls.length === 0) {
        // Warn but proceed to avoid blocking submission
        toast({
          title: "No images uploaded",
          description: "You can submit now and add images later in admin.",
          variant: "default",
        })
      }

      const form = new FormData(e.currentTarget as HTMLFormElement)
      const name = String(form.get("name") || "")
      const model = String(form.get("model") || "")
      const price = Number(form.get("price") || 0)
      const km = Number(form.get("km") || 0)
      const phone = String(form.get("phone") || "")
      const desc = String(form.get("desc") || "")

      console.log("[v0] sell page: submitting", { name, model, price, km, phone, images: imageUrls.length })

      const res = await fetch("/api/sell", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, model, price, km, phone, desc, images: imageUrls }),
      })
      const j = await res.json()
      if (!res.ok) throw new Error(j.error || "Failed to submit")
      toast({ title: "Submitted!", description: "Your listing is pending admin approval." })
      ;(e.currentTarget as HTMLFormElement).reset()
      setImageUrls([])
    } catch (err) {
      toast({ title: "Error", description: (err as Error).message, variant: "destructive" })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-5">
        <Card className="md:col-span-3 border bg-card">
          <CardHeader>
            <CardTitle className="text-2xl">Sell your car</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="grid gap-5">
              <MultiImageUploader
                onUrlsChange={setImageUrls}
                autoUpload
                onError={(m) =>
                  toast({ title: "Upload failed", description: m || "Please try again.", variant: "destructive" })
                }
              />

              <div className="grid gap-2">
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" name="name" placeholder="Full name" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="model">Car Model</Label>
                <Input id="model" name="model" placeholder="e.g., 2019 Hyundai i20 Sportz" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="price">Expected Price (INR)</Label>
                <Input id="price" name="price" type="number" inputMode="numeric" placeholder="450000" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="km">Kilometers Covered</Label>
                <Input id="km" name="km" type="number" inputMode="numeric" placeholder="54000" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" inputMode="tel" placeholder="+91 98xxxxxx" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="desc">Description (optional)</Label>
                <Textarea id="desc" name="desc" placeholder="Condition, service history, extras..." rows={4} />
              </div>

              <Button type="submit" className="h-11 rounded-full" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit Listing"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 border bg-background">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold">List with confidence</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>• Guided onboarding and quick review</li>
              <li>• Get verified buyer leads</li>
              <li>• Secure communication</li>
              <li>• No hidden charges</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
