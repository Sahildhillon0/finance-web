// types/car.ts
export type CarStatus = "available" | "sold" | "pending"
export type CarType = "new" | "old"

export interface Car {
  _id?: string
  name: string
  description: string
  price: number
  status: CarStatus
  type: CarType
  availability: "in-stock" | "sold" | "reserved"
  images: string[]
  createdAt?: string | Date
  updatedAt?: string | Date
}
