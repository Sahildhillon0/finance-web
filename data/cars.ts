export type CarRecord = {
  id: string
  title: string
  make: string
  model: string
  year: number
  price: number
  km: number
  fuel: "Petrol" | "Diesel" | "CNG" | "Electric"
  body: "Hatchback" | "Sedan" | "SUV" | "MPV"
  transmission: "Manual" | "Automatic"
  location: string
  images?: string[]
  condition?: "New" | "Used"
  approved?: boolean
}
