import Link from "next/link";
import { Plus } from "lucide-react";
import { InvoiceOverviewMetrics } from "@/components/invoices/invoice-overview-metrics";
import { InvoiceStatusBadge } from "@/components/invoices/invoice-status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { invoices } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/format";

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

      <InvoiceOverviewMetrics />

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
