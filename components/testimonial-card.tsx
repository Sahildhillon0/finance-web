import { GlassCard } from "./glass-card"

export function TestimonialCard({
  avatar,
  name,
  role,
  rating = 5,
  quote,
  purchased,
}: {
  avatar: string
  name: string
  role: string
  rating?: number
  quote: string
  purchased: string
}) {
  return (
    <GlassCard className="p-6 md:p-8">
      <div className="flex items-center gap-4">
        <img
          src={avatar || "/placeholder.svg"}
          alt={`${name} avatar`}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-sm text-muted-foreground">{role}</div>
          <div className="mt-1 text-sm text-blue-400" aria-label={`Rating ${rating} out of 5`}>
            {"★".repeat(rating)} <span className="text-muted-foreground">{"★".repeat(5 - rating)}</span>
          </div>
        </div>
      </div>
      <p className="mt-4 text-pretty leading-relaxed text-foreground/90">“{quote}”</p>
      <div className="mt-4 pt-4 border-t border-white/5 text-sm text-blue-400">Purchased: {purchased}</div>
    </GlassCard>
  )
}
