"use client";

import Link from "next/link";
import {
  Check,
  Copy,
  Download,
  Edit3,
  FileText,
  Filter,
  MoreHorizontal,
  Plus,
  Send,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { InvoiceOverviewMetrics } from "@/components/invoices/invoice-overview-metrics";
import { InvoiceStatusBadge } from "@/components/invoices/invoice-status-badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { invoices } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";

type FilterValue = "all" | "paid" | "issued" | "overdue";

const filters: Array<{ label: string; value: FilterValue }> = [
  { label: "Vše", value: "all" },
  { label: "Zaplaceno", value: "paid" },
  { label: "Nezaplaceno", value: "issued" },
  { label: "Po splatnosti", value: "overdue" },
];

export function InvoiceListView() {
  const [filter, setFilter] = useState<FilterValue>("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => filter === "all" || invoice.status === filter);
  }, [filter]);

  const allSelected =
    filteredInvoices.length > 0 &&
    filteredInvoices.every((invoice) => selectedIds.has(invoice.id));

  function toggleAll() {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (allSelected) {
        filteredInvoices.forEach((invoice) => next.delete(invoice.id));
      } else {
        filteredInvoices.forEach((invoice) => next.add(invoice.id));
      }
      return next;
    });
  }

  function toggleInvoice(id: string) {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function notify(label: string) {
    toast.success(label);
  }

  return (
    <div className="grid gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Faktury</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Přehled vašich dokladů za rok 2026.
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

      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" variant="outline">
          <span className="text-muted-foreground">Období</span>
          Celý rok
        </Button>
        <Button size="sm" variant="outline">
          <span className="text-muted-foreground">Odběratel</span>
          Všichni
        </Button>
        <div className="ml-auto flex gap-2">
          <Button size="sm" variant="outline" onClick={() => notify("Export připraven.")}>
            <Download className="size-4" />
            Stáhnout
          </Button>
          <Button size="sm" variant="outline">
            <Filter className="size-4" />
            Filtry
          </Button>
        </div>
      </div>

      <Card>
        <div className="flex flex-col gap-3 border-b px-4 py-3 lg:flex-row lg:items-center">
          <div className="flex flex-wrap gap-1.5">
            <Button size="sm" variant="ghost" onClick={toggleAll}>
              <span
                aria-hidden="true"
                className={cn(
                  "flex size-4 items-center justify-center rounded border",
                  allSelected && "border-primary bg-primary text-primary-foreground"
                )}
              >
                {allSelected ? <Check className="size-3" /> : null}
              </span>
              Vybrat vše
            </Button>
            <Button size="sm" variant="ghost" onClick={() => notify("Vybrané faktury se stahují.")}>
              <Download className="size-4" />
              Stáhnout
            </Button>
            <Button size="sm" variant="ghost" onClick={() => notify("Stav byl aktualizován.")}>
              <Check className="size-4" />
              Označit jako
            </Button>
            <Button size="sm" variant="ghost" onClick={() => notify("Vybrané faktury byly odstraněny.")}>
              <Trash2 className="size-4" />
              Smazat
            </Button>
          </div>

          <div className="flex rounded-lg border bg-muted/30 p-1 lg:ml-auto">
            {filters.map((item) => (
              <Button
                key={item.value}
                onClick={() => setFilter(item.value)}
                size="sm"
                variant={filter === item.value ? "secondary" : "ghost"}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12" />
                <TableHead>Číslo</TableHead>
                <TableHead>Odběratel</TableHead>
                <TableHead>Splatnost</TableHead>
                <TableHead>Typ dokladu</TableHead>
                <TableHead className="text-right">Částka</TableHead>
                <TableHead>Stav</TableHead>
                <TableHead className="w-36 text-right" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.has(invoice.id)}
                      onCheckedChange={() => toggleInvoice(invoice.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <Link className="inline-flex items-center gap-2 font-mono text-[13px]" href={`/faktury/${invoice.id}`}>
                      <span className="flex size-7 items-center justify-center rounded-md border bg-muted/40">
                        <FileText className="size-3.5" />
                      </span>
                      {invoice.number}
                    </Link>
                  </TableCell>
                  <TableCell>{invoice.customer}</TableCell>
                  <TableCell className="text-muted-foreground">{invoice.dueDate}</TableCell>
                  <TableCell className="text-muted-foreground">{invoice.type}</TableCell>
                  <TableCell className="text-right font-mono font-semibold tabular-nums">
                    {formatCurrency(invoice.totalCents)}
                  </TableCell>
                  <TableCell>
                    <InvoiceStatusBadge status={invoice.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button asChild size="icon-sm" variant="ghost">
                        <Link href={`/faktury/${invoice.id}`}>
                          <Edit3 className="size-4" />
                          <span className="sr-only">Upravit</span>
                        </Link>
                      </Button>
                      <Button size="icon-sm" variant="ghost" onClick={() => notify("Faktura duplikována.")}>
                        <Copy className="size-4" />
                        <span className="sr-only">Duplikovat</span>
                      </Button>
                      <Button size="icon-sm" variant="ghost" onClick={() => notify("Faktura připravena k odeslání.")}>
                        <Send className="size-4" />
                        <span className="sr-only">Odeslat</span>
                      </Button>
                      <Button size="icon-sm" variant="ghost" onClick={() => notify("PDF se stahuje.")}>
                        <Download className="size-4" />
                        <span className="sr-only">Stáhnout</span>
                      </Button>
                      <Button size="icon-sm" variant="ghost" onClick={() => notify("Akce provedena.")}>
                        <MoreHorizontal className="size-4" />
                        <span className="sr-only">Další</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
