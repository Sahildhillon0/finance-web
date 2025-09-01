import { GlassCard } from "./glass-card"

export type Metric = { value: string; label: string }
export function MetricsRow({ items }: { items: Metric[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {items.map((m, i) => (
        <GlassCard key={i} className="p-6 md:p-8 text-center">
          <div className="text-3xl md:text-4xl font-semibold">{m.value}</div>
          <div className="text-muted-foreground mt-1">{m.label}</div>
        </GlassCard>
      ))}
    </div>
  )
}
