import Link from "next/link";
import { Download, Filter, MoreHorizontal, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { invoices, statusLabels } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/format";

function statusVariant(status: string) {
  if (status === "overdue") return "destructive";
  if (status === "paid") return "default";
  return "outline";
}

export default function InvoicesPage() {
  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Faktury</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Přehled dokladů, stavů a částek.
          </p>
        </div>
        <Button asChild>
          <Link href="/faktury/nova">
            <Plus className="size-4" />
            Vystavit fakturu
          </Link>
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button variant="outline">
          <Filter className="size-4" />
          Filtry
        </Button>
        <Button variant="outline">
          <Download className="size-4" />
          Export
        </Button>
      </div>

      <Card>
        <CardHeader className="border-b">
          <CardTitle>Všechny faktury</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Číslo</TableHead>
                  <TableHead>Odběratel</TableHead>
                  <TableHead>Splatnost</TableHead>
                  <TableHead>Typ</TableHead>
                  <TableHead className="text-right">Částka</TableHead>
                  <TableHead>Stav</TableHead>
                  <TableHead className="w-12" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">
                      <Link href={`/faktury/${invoice.id}`}>{invoice.number}</Link>
                    </TableCell>
                    <TableCell>{invoice.customer}</TableCell>
                    <TableCell className="text-muted-foreground">{invoice.dueDate}</TableCell>
                    <TableCell className="text-muted-foreground">{invoice.type}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(invoice.totalCents)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusVariant(invoice.status)}>
                        {statusLabels[invoice.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="icon" variant="ghost">
                        <MoreHorizontal className="size-4" />
                        <span className="sr-only">Akce</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
