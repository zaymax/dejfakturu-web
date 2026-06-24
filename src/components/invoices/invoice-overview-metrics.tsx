import { Check, CircleAlert, Clock, Edit3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { dashboardStats } from "@/lib/mock-data";
import { formatCurrency, percentage } from "@/lib/format";
import { cn } from "@/lib/utils";

const statCards = [
  {
    icon: Check,
    label: "Zaplaceno",
    value: dashboardStats.paidCents,
    meta: "81 faktur",
  },
  {
    icon: Edit3,
    label: "Návrh",
    value: dashboardStats.draftCents,
    meta: "8 faktur čeká na vystavení",
  },
  {
    icon: Clock,
    label: "Nezaplaceno",
    value: dashboardStats.issuedCents,
    meta: "1 faktura do splatnosti",
  },
  {
    icon: CircleAlert,
    label: "Po splatnosti",
    value: dashboardStats.overdueCents,
    meta: "vyžaduje pozornost",
  },
];

export function InvoiceOverviewMetrics({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-5", className)}>
      <Card>
        <CardContent className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <div className="text-sm font-medium text-muted-foreground">
              Celkem vyfakturováno
            </div>
            <div className="mt-1 font-mono text-3xl font-semibold tabular-nums">
              {formatCurrency(dashboardStats.totalCents)}
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              {dashboardStats.invoiceCount} faktur · {percentage(dashboardStats.paidOnTimeRatio)} uhrazeno včas
            </div>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
              <span><span className="mr-1.5 inline-block size-2 rounded-sm bg-success" />Zaplaceno <b className="font-mono text-foreground">{formatCurrency(dashboardStats.paidCents)}</b></span>
              <span><span className="mr-1.5 inline-block size-2 rounded-sm bg-info" />Návrh <b className="font-mono text-foreground">{formatCurrency(dashboardStats.draftCents)}</b></span>
              <span><span className="mr-1.5 inline-block size-2 rounded-sm bg-warning" />Nezaplaceno <b className="font-mono text-foreground">{formatCurrency(dashboardStats.issuedCents)}</b></span>
              <span><span className="mr-1.5 inline-block size-2 rounded-sm bg-destructive" />Po splatnosti <b className="font-mono text-foreground">{formatCurrency(dashboardStats.overdueCents)}</b></span>
            </div>
          </div>
          <div className="relative grid size-32 place-items-center justify-self-start sm:justify-self-end">
            <svg className="absolute inset-0 size-32 -rotate-90" viewBox="0 0 118 118">
              <circle cx="59" cy="59" fill="none" r="50" stroke="currentColor" strokeWidth="12" className="text-muted" />
              <circle
                cx="59"
                cy="59"
                fill="none"
                r="50"
                stroke="currentColor"
                strokeDasharray="314.2"
                strokeDashoffset={314.2 * (1 - dashboardStats.paidOnTimeRatio / 100)}
                strokeLinecap="round"
                strokeWidth="12"
                className="text-success"
              />
            </svg>
            <div className="text-center">
              <div className="font-mono text-xl font-semibold">{percentage(dashboardStats.paidOnTimeRatio)}</div>
              <div className="text-xs text-muted-foreground">uhrazeno</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                  <Icon className="size-4 text-muted-foreground" />
                </div>
                <div className="mt-3 font-mono text-2xl font-semibold tabular-nums">
                  {formatCurrency(stat.value)}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.meta}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
