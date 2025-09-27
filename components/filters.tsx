"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useCallback } from "react"

export function Filters() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const update = useCallback(
    (key: string, value?: string) => {
      const params = new URLSearchParams(searchParams)
      if (value && value.length) params.set(key, value)
      else params.delete(key)
      router.replace(`${pathname}?${params.toString()}`)
    },
    [searchParams, router, pathname],
  )

  return (
    <div className="rounded-xl border p-4 grid grid-cols-2 md:grid-cols-3 gap-3">
      <Input
        placeholder="Make"
        defaultValue={searchParams.get("make") ?? ""}
        onChange={(e) => update("make", e.target.value)}
      />
      <Input
        placeholder="Model"
        defaultValue={searchParams.get("model") ?? ""}
        onChange={(e) => update("model", e.target.value)}
      />
      <Input
        placeholder="Min Price"
        inputMode="numeric"
        defaultValue={searchParams.get("minPrice") ?? ""}
        onChange={(e) => update("minPrice", e.target.value)}
      />
      <Input
        placeholder="Max Price"
        inputMode="numeric"
        defaultValue={searchParams.get("maxPrice") ?? ""}
        onChange={(e) => update("maxPrice", e.target.value)}
      />
      <Select defaultValue={searchParams.get("fuel") ?? ""} onValueChange={(v) => update("fuel", v)}>
        <SelectTrigger>
          <SelectValue placeholder="Fuel" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any">Any</SelectItem>
          <SelectItem value="Petrol">Petrol</SelectItem>
          <SelectItem value="Diesel">Diesel</SelectItem>
          <SelectItem value="CNG">CNG</SelectItem>
          <SelectItem value="Electric">Electric</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue={searchParams.get("body") ?? ""} onValueChange={(v) => update("body", v)}>
        <SelectTrigger>
          <SelectValue placeholder="Body Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any">Any</SelectItem>
          <SelectItem value="Hatchback">Hatchback</SelectItem>
          <SelectItem value="Sedan">Sedan</SelectItem>
          <SelectItem value="SUV">SUV</SelectItem>
          <SelectItem value="MPV">MPV</SelectItem>
        </SelectContent>
      </Select>
      <div className="col-span-2 md:col-span-3 flex justify-end">
        <Button variant="secondary" onClick={() => router.replace(pathname)}>
          Reset
        </Button>
      </div>
    </div>
  )
}
