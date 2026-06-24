import type { CSSProperties } from "react";
import { Badge } from "@/components/ui/badge";
import { statusLabels, type InvoiceStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const statusStyles: Record<InvoiceStatus, CSSProperties> = {
  paid: {
    backgroundColor: "var(--success-bg)",
    borderColor: "color-mix(in oklab, var(--success) 25%, transparent)",
    color: "var(--success-fg)",
  },
  draft: {
    backgroundColor: "var(--info-bg)",
    borderColor: "color-mix(in oklab, var(--info) 25%, transparent)",
    color: "var(--info-fg)",
  },
  issued: {
    backgroundColor: "var(--warning-bg)",
    borderColor: "color-mix(in oklab, var(--warning) 30%, transparent)",
    color: "var(--warning-fg)",
  },
  overdue: {
    backgroundColor: "var(--destructive-bg)",
    borderColor: "color-mix(in oklab, var(--destructive) 30%, transparent)",
    color: "var(--destructive-fg)",
  },
};

const dotStyles: Record<InvoiceStatus, CSSProperties> = {
  paid: { backgroundColor: "var(--success)" },
  draft: { backgroundColor: "var(--info)" },
  issued: { backgroundColor: "var(--warning)" },
  overdue: { backgroundColor: "var(--destructive)" },
};

export function InvoiceStatusBadge({
  className,
  status,
}: {
  className?: string;
  status: InvoiceStatus;
}) {
  return (
    <Badge
      className={cn("h-auto gap-1.5 rounded-full border px-2.5 py-0.5", className)}
      style={statusStyles[status]}
      variant="outline"
    >
      <span
        aria-hidden="true"
        className="size-1.5 rounded-full"
        data-slot="status-dot"
        style={dotStyles[status]}
      />
      {statusLabels[status]}
    </Badge>
  );
}
