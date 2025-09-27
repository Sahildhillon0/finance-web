import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export type CarCardProps = {
  id: string
  title: string
  price: number
  year: number
  km: number
  fuel: string
  image?: string
  images?: string[]
}

export function CarCard(props: CarCardProps) {
  const { id, title, price, year, km, fuel, images: imagesProp, image } = props
  const images = Array.isArray(imagesProp) ? imagesProp : []
  const mainImage = images[0] || image || "/placeholder.svg?height=180&width=320&query=car%20photo"
  
  return (
    <Link href={`/cars/${id}`} className="block group">
      <Card className="h-full transition-transform duration-200 group-hover:shadow-lg group-hover:-translate-y-1">
        <div className="aspect-[16/10] w-full overflow-hidden rounded-t-xl bg-muted relative">
          <img
            src={mainImage}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {images.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
              +{images.length - 1} more
            </div>
          )}
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-base line-clamp-1">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-foreground text-lg">₹{price.toLocaleString("en-IN")}</span>
            <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">{year}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>{fuel}</span>
            <span>{km.toLocaleString()} km</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
