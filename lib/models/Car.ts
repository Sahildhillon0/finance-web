export interface Car {
  _id?: string
  name: string
  description: string
  price: number
  images: string[]
  availability: "in-stock" | "out-of-stock"
  createdAt: Date
  updatedAt: Date
}

export interface CreateCarData {
  name: string
  description: string
  price: number
  images: string[]
  availability: "in-stock" | "out-of-stock"
}
