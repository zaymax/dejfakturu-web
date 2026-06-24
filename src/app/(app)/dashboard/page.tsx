import Link from "next/link";
import { ArrowUpRight, Clock, FileText, Plus, TriangleAlert } from "lucide-react";
import { InvoiceStatusBadge } from "@/components/invoices/invoice-status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { dashboardStats, invoices } from "@/lib/mock-data";
import { formatCurrency, percentage } from "@/lib/format";

const statCards = [
  {
    label: "Zaplaceno",
    value: dashboardStats.paidCents,
    detail: "81 faktur",
    icon: ArrowUpRight,
  },
  {
    label: "Návrhy",
    value: dashboardStats.draftCents,
    detail: "8 faktur čeká",
    icon: FileText,
  },
  {
    label: "Nezaplaceno",
    value: dashboardStats.issuedCents,
    detail: "1 faktura do splatnosti",
    icon: Clock,
  },
  {
    label: "Po splatnosti",
    value: dashboardStats.overdueCents,
    detail: "vyžaduje pozornost",
    icon: TriangleAlert,
  },
];

export default function DashboardPage() {
  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Přehled</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Souhrn fakturace za rok 2026.
          </p>
        </div>
        <Button asChild>
          <Link href="/faktury/nova">
            <Plus className="size-4" />
            Vystavit fakturu
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <div className="text-sm text-muted-foreground">Celkem vyfakturováno</div>
            <div className="mt-2 font-mono text-3xl font-semibold tabular-nums">
              {formatCurrency(dashboardStats.totalCents)}
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              {dashboardStats.invoiceCount} faktur · {percentage(dashboardStats.paidOnTimeRatio)} uhrazeno včas
            </div>
          </div>
          <div className="grid size-28 place-items-center rounded-full border-8 border-success-bg">
            <div className="text-center">
              <div className="font-mono text-xl font-semibold">
                {percentage(dashboardStats.paidOnTimeRatio)}
              </div>
              <div className="text-xs text-muted-foreground">uhrazeno</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
                <div className="mt-1 text-sm text-muted-foreground">{stat.detail}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader className="border-b">
          <CardTitle>Poslední faktury</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-0">
          {invoices.slice(0, 5).map((invoice, index) => (
            <div key={invoice.id}>
              <Link
                className="grid gap-2 py-3 sm:grid-cols-[120px_1fr_130px_120px] sm:items-center"
                href={`/faktury/${invoice.id}`}
              >
                <span className="font-mono text-[13px] font-medium">{invoice.number}</span>
                <span className="text-sm text-muted-foreground">{invoice.customer}</span>
                <span className="font-mono text-sm font-semibold tabular-nums">{formatCurrency(invoice.totalCents)}</span>
                <InvoiceStatusBadge className="justify-self-start" status={invoice.status} />
              </Link>
              {index < 4 ? <Separator /> : null}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
