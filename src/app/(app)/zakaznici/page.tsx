import { Plus } from "lucide-react";
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
import { customers } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/format";

export default function CustomersPage() {
  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Zákazníci</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Uložené odběratelské údaje pro rychlejší vystavení faktur.
          </p>
        </div>
        <Button>
          <Plus className="size-4" />
          Založit zákazníka
        </Button>
      </div>

      <Card>
        <CardHeader className="border-b">
          <CardTitle>Adresář zákazníků</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Název</TableHead>
                  <TableHead>IČO</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Město</TableHead>
                  <TableHead className="text-right">Vyfakturováno</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>{customer.ico}</TableCell>
                    <TableCell className="text-muted-foreground">{customer.email}</TableCell>
                    <TableCell className="text-muted-foreground">{customer.city}</TableCell>
                    <TableCell className="text-right font-mono font-semibold tabular-nums">
                      {formatCurrency(customer.invoicedCents)}
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
