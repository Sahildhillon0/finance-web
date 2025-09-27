"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function HomeHero() {
  const router = useRouter()
  const [mode, setMode] = useState<"new" | "used">("new")
  const [filterType, setFilterType] = useState<"budget" | "brand">("budget")
  const [budget, setBudget] = useState<string>("")
  const [body, setBody] = useState<string>("")

  function search() {
    const params = new URLSearchParams()
    if (mode === "used") params.set("used", "1")
    if (filterType === "budget" && budget) {
      const [min, max] = budget.split("-")
      if (min) params.set("minPrice", String(Number(min) * 100000))
      if (max) params.set("maxPrice", String(Number(max) * 100000))
    }
    if (body) params.set("body", body)
    router.push(`/listings?${params.toString()}`)
  }

  return (
    <section className="container mx-auto px-4 pt-4 md:pt-6">
      <div className="relative overflow-hidden rounded-2xl border bg-card">
        <img src="/honda-city.jpg" alt="" className="h-[320px] w-full object-cover md:h-[420px]" />
        <div className="absolute left-4 top-4 md:left-8 md:top-8 w-[90%] max-w-[520px] rounded-xl bg-background/95 p-5 md:p-6 shadow-lg ring-1 ring-border">
          <h2 className="mb-2 text-xl md:text-2xl font-semibold text-balance">Find your right car</h2>
          <Tabs value={mode} onValueChange={(v) => setMode(v as any)} className="w-full">
            <TabsList className="grid grid-cols-2 mb-3">
              <TabsTrigger value="new">New Car</TabsTrigger>
              <TabsTrigger value="used">Used Car</TabsTrigger>
            </TabsList>
            <TabsContent value="new" className="mt-0" />
            <TabsContent value="used" className="mt-0" />
          </Tabs>

          <RadioGroup
            value={filterType}
            onValueChange={(v) => setFilterType(v as any)}
            className="mb-3 grid grid-cols-2"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem id="by-budget" value="budget" />
              <Label htmlFor="by-budget">By Budget</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem id="by-brand" value="brand" />
              <Label htmlFor="by-brand">By Brand</Label>
            </div>
          </RadioGroup>

          {filterType === "budget" ? (
            <div className="grid grid-cols-1 gap-2">
              <Select onValueChange={setBudget}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Budget (Lakh)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-5">Under 5</SelectItem>
                  <SelectItem value="5-10">5 - 10</SelectItem>
                  <SelectItem value="10-20">10 - 20</SelectItem>
                  <SelectItem value="20-999">20+</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={setBody}>
                <SelectTrigger>
                  <SelectValue placeholder="All Vehicle Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="Hatchback">Hatchback</SelectItem>
                  <SelectItem value="Sedan">Sedan</SelectItem>
                  <SelectItem value="SUV">SUV</SelectItem>
                  <SelectItem value="MPV">MPV</SelectItem>
                </SelectContent>
              </Select>
              <Button className="mt-1" onClick={search}>
                Search
              </Button>
              <Button variant="outline" className="mt-1 bg-transparent" asChild>
                <a href="/loan">Apply for Loan</a>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2">
              <Select onValueChange={(v) => router.push(`/listings?make=${encodeURIComponent(v)}`)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Maruti">Maruti</SelectItem>
                  <SelectItem value="Hyundai">Hyundai</SelectItem>
                  <SelectItem value="Kia">Kia</SelectItem>
                  <SelectItem value="Tata">Tata</SelectItem>
                  <SelectItem value="Toyota">Toyota</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={setBody}>
                <SelectTrigger>
                  <SelectValue placeholder="All Vehicle Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="Hatchback">Hatchback</SelectItem>
                  <SelectItem value="Sedan">Sedan</SelectItem>
                  <SelectItem value="SUV">SUV</SelectItem>
                  <SelectItem value="MPV">MPV</SelectItem>
                </SelectContent>
              </Select>
              <Button className="mt-1" onClick={search}>
                Search
              </Button>
              <Button variant="outline" className="mt-1 bg-transparent" asChild>
                <a href="/loan">Apply for Loan</a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
