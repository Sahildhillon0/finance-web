import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CtaBand({
  title,
  highlight,
  subtitle,
  primary,
  secondary,
}: {
  title: string
  highlight?: string
  subtitle?: string
  primary: { label: string; href: string }
  secondary?: { label: string; href: string }
}) {
  return (
    <div className="rounded-2xl p-8 md:p-12 bg-gradient-to-r from-blue-500/15 via-blue-400/10 to-amber-300/15 border border-white/5">
      <h3 className="text-2xl md:text-3xl font-semibold text-center">
        {title}{" "}
        {highlight ? (
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-amber-300">{highlight}</span>
        ) : null}
      </h3>
      {subtitle ? <p className="text-center mt-3 text-muted-foreground">{subtitle}</p> : null}
      <div className="mt-6 flex items-center justify-center gap-3">
        <Button asChild>
          <Link href={primary.href}>{primary.label}</Link>
        </Button>
        {secondary ? (
          <Button asChild variant="secondary">
            <Link href={secondary.href}>{secondary.label}</Link>
          </Button>
        ) : null}
      </div>
    </div>
  )
}
