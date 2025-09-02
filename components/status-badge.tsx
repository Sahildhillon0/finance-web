import { cn } from "@/lib/utils"

export function StatusBadge({ status }: { status: "available" | "sold" | "pending" }) {
  const statusConfig = {
    available: {
      text: "Available",
      className: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30"
    },
    sold: {
      text: "Sold",
      className: "bg-rose-500/15 text-rose-200 ring-rose-500/30"
    },
    pending: {
      text: "Pending",
      className: "bg-amber-500/15 text-amber-200 ring-amber-500/30"
    }
  };

  const { text, className } = statusConfig[status] || statusConfig.available;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1",
        className
      )}
    >
      {text}
    </span>
  )
}
