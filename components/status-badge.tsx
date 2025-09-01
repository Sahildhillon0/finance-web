import { cn } from "@/lib/utils"

export function StatusBadge({ status }: { status: "available" | "sold" }) {
  const ok = status === "available"
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        ok
          ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30"
          : "bg-rose-500/15 text-rose-200 ring-1 ring-rose-500/30",
      )}
    >
      {ok ? "Available" : "Sold"}
    </span>
  )
}
