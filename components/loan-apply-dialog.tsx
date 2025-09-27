"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { api } from "@/lib/api"

type Car = {
  id: string
  title: string
  make: string
  model: string
  year: number
  price: number
}

export function LoanApplyDialog({ car }: { car?: Car }) {
  const [open, setOpen] = useState(false)
  const [stateVal, setStateVal] = useState("dl")
  const { toast } = useToast()
  
  const indianStates = [
    { code: 'dl', name: 'Delhi' },
    { code: 'hr', name: 'Haryana' },
    { code: 'an', name: 'Andaman and Nicobar Islands' },
    { code: 'ap', name: 'Andhra Pradesh' },
    { code: 'ar', name: 'Arunachal Pradesh' },
    { code: 'as', name: 'Assam' },
    { code: 'br', name: 'Bihar' },
    { code: 'ch', name: 'Chandigarh' },
    { code: 'ct', name: 'Chhattisgarh' },
    { code: 'dn', name: 'Dadra and Nagar Haveli and Daman and Diu' },
    { code: 'ga', name: 'Goa' },
    { code: 'gj', name: 'Gujarat' },
    { code: 'hp', name: 'Himachal Pradesh' },
    { code: 'jk', name: 'Jammu and Kashmir' },
    { code: 'jh', name: 'Jharkhand' },
    { code: 'ka', name: 'Karnataka' },
    { code: 'kl', name: 'Kerala' },
    { code: 'la', name: 'Ladakh' },
    { code: 'ld', name: 'Lakshadweep' },
    { code: 'mp', name: 'Madhya Pradesh' },
    { code: 'mh', name: 'Maharashtra' },
    { code: 'mn', name: 'Manipur' },
    { code: 'ml', name: 'Meghalaya' },
    { code: 'mz', name: 'Mizoram' },
    { code: 'nl', name: 'Nagaland' },
    { code: 'or', name: 'Odisha' },
    { code: 'py', name: 'Puducherry' },
    { code: 'pb', name: 'Punjab' },
    { code: 'rj', name: 'Rajasthan' },
    { code: 'sk', name: 'Sikkim' },
    { code: 'tn', name: 'Tamil Nadu' },
    { code: 'ts', name: 'Telangana' },
    { code: 'tr', name: 'Tripura' },
    { code: 'up', name: 'Uttar Pradesh' },
    { code: 'uk', name: 'Uttarakhand' },
    { code: 'wb', name: 'West Bengal' },
  ]

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const name = String(fd.get("name") || "")
    const mobile = String(fd.get("mobile") || "")
    
    try {
      await api.post("/api/loan-requests", { 
        name, 
        mobile, 
        state: stateVal,
        carId: car?.id,
        carTitle: car?.title || 'Not specified',
        carMake: car?.make || 'Not specified',
        carModel: car?.model || 'Not specified',
        carYear: car?.year || new Date().getFullYear(),
        carPrice: car?.price || 0
      })
      
      toast({ 
        title: "Thanks!", 
        description: "We received your request. Our team will contact you shortly." 
      })
      setOpen(false)
    } catch (error) {
      console.error('Loan request failed:', error)
      toast({ 
        title: "Something went wrong", 
        description: error instanceof Error ? error.message : "Please try again.", 
        variant: "destructive" 
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full px-6">Apply for Loan</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Left form */}
          <div className="p-6 md:p-8">
            <DialogHeader className="text-left">
              <DialogTitle>Talk to Our Finance Professionals</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Name" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="mobile">Mobile</Label>
                <Input id="mobile" name="mobile" placeholder="Mobile" inputMode="tel" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="state">Select State</Label>
                <Select value={stateVal} onValueChange={setStateVal} name="state">
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    {indianStates.map((state) => (
                      <SelectItem key={state.code} value={state.code}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="mt-2 h-11 rounded-md">
                Submit
              </Button>
            </form>
          </div>

          {/* Right info/illustration panel */}
          <div className="hidden md:flex flex-col justify-center gap-3 bg-muted/40 p-8">
            <h3 className="text-lg font-semibold">Loan Options for New and Used Vehicle Financing</h3>
            <p className="text-sm text-muted-foreground">
              Compare plans across lenders and choose flexible EMIs for cars, tractors, or commercial vehicles.
            </p>
            <img
              src={"/placeholder.svg?height=220&width=320&query=loan%20financing%20illustration"}
              alt=""
              className="mx-auto rounded-md"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
