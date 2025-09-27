import type { CarRecord as BaseCarRecord } from "@/data/cars"
import { cars as seedCars } from "@/data/cars"

export type CarRecord = BaseCarRecord & {
  condition: "New" | "Used"
}

let store: CarRecord[] = seedCars.map((c) => ({
  ...c,
  condition: "Used",
}))

export function listCars(): CarRecord[] {
  return store
}

export function getCarById(id: string): CarRecord | undefined {
  return store.find((c) => c.id === id)
}

export type NewCarInput = Omit<CarRecord, "id"> & { images?: string[] }

function genId(): string {
  return `c-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`
}

export function addCar(input: NewCarInput): CarRecord {
  const id = genId()
  const car: CarRecord = {
    id,
    title: input.title,
    make: input.make,
    model: input.model,
    year: input.year,
    price: input.price,
    km: input.km,
    fuel: input.fuel,
    body: input.body,
    transmission: input.transmission,
    location: input.location,
    condition: input.condition ?? "Used",
    images: input.images && input.images.length > 0 ? input.images : undefined,
  }
  store = [car, ...store]
  return car
}
