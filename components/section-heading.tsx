import { cn } from "@/lib/utils"

export function SectionHeading({
  title,
  subtitle,
  className,
}: {
  title: string
  subtitle?: string
  className?: string
}) {
  return (
    <div className={cn("mx-auto mb-8 max-w-3xl text-center", className)}>
      <h2 className="text-balance text-3xl font-bold text-white md:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-2 text-pretty text-slate-300">{subtitle}</p> : null}
    </div>
  )
}
