"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function LeadForm({ carId }: { carId: string }) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ carId, name, phone, message }),
      })
      if (!res.ok) throw new Error("Request failed")
      toast({ title: "Request sent", description: "Seller will contact you soon." })
      setName("")
      setPhone("")
      setMessage("")
    } catch (err) {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-3">
      <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <Input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required inputMode="tel" />
      <Input placeholder="Message (optional)" value={message} onChange={(e) => setMessage(e.target.value)} />
      <Button disabled={loading} type="submit" className="w-full">
        Send inquiry
      </Button>
    </form>
  )
}
