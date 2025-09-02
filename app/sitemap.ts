// app/sitemap.ts
import type { MetadataRoute } from "next"
import { getDb } from "@/lib/mongodb"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  const db = await getDb()
  const items = await db
    .collection("cars")
    .find({}, { projection: { _id: 1 } })
    .limit(200)
    .toArray()

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${base}/browse-cars`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${base}/about`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${base}/services`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${base}/testimonials`, changeFrequency: "monthly" as const, priority: 0.6 },
  ]

  const dynamicPages: MetadataRoute.Sitemap = items.map((i) => ({
    url: `${base}/cars/${i._id}`,
    changeFrequency: "weekly" as const,
    priority: 0.8
  }))

  return [...staticPages, ...dynamicPages]
}
