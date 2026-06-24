"use client";

import { useMemo, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/format";

type GeneratorState = {
  supplierName: string;
  customerName: string;
  invoiceNumber: string;
  description: string;
  quantity: string;
  unitPrice: string;
  dueDate: string;
};

const initialState: GeneratorState = {
  supplierName: "",
  customerName: "",
  invoiceNumber: "2026-0001",
  description: "Webové služby",
  quantity: "1",
  unitPrice: "12000",
  dueDate: "14 dní",
};

async function downloadInvoice(payload: GeneratorState) {
  const response = await fetch("/api/public-invoice/pdf", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      quantity: Number(payload.quantity),
      unitPrice: Number(payload.unitPrice),
    }),
  });

  if (!response.ok) {
    throw new Error("PDF se nepodařilo vygenerovat.");
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${payload.invoiceNumber || "faktura"}.pdf`;
  link.click();
  URL.revokeObjectURL(url);
}

export function QuickInvoiceGenerator() {
  const [state, setState] = useState(initialState);
  const [isPending, setIsPending] = useState(false);
  const total = useMemo(() => {
    return Math.round(Number(state.quantity || 0) * Number(state.unitPrice || 0) * 100);
  }, [state.quantity, state.unitPrice]);

  function update<K extends keyof GeneratorState>(key: K, value: GeneratorState[K]) {
    setState((current) => ({ ...current, [key]: value }));
  }

  async function submit() {
    setIsPending(true);
    try {
      await downloadInvoice(state);
      toast.success("PDF faktura je připravená ke stažení.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Něco se nepovedlo.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="border-b">
        <CardTitle>Rychlá faktura bez účtu</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 pt-1">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="grid gap-1.5">
            <Label htmlFor="supplierName">Dodavatel</Label>
            <Input
              id="supplierName"
              onChange={(event) => update("supplierName", event.target.value)}
              placeholder="Vaše jméno nebo firma"
              value={state.supplierName}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="customerName">Odběratel</Label>
            <Input
              id="customerName"
              onChange={(event) => update("customerName", event.target.value)}
              placeholder="Název zákazníka"
              value={state.customerName}
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-[1fr_120px_150px]">
          <div className="grid gap-1.5">
            <Label htmlFor="description">Položka</Label>
            <Textarea
              className="min-h-9"
              id="description"
              onChange={(event) => update("description", event.target.value)}
              value={state.description}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="quantity">Počet</Label>
            <Input
              id="quantity"
              min="0"
              onChange={(event) => update("quantity", event.target.value)}
              type="number"
              value={state.quantity}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="unitPrice">Cena</Label>
            <Input
              id="unitPrice"
              min="0"
              onChange={(event) => update("unitPrice", event.target.value)}
              type="number"
              value={state.unitPrice}
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="grid gap-1.5">
            <Label htmlFor="invoiceNumber">Číslo faktury</Label>
            <Input
              id="invoiceNumber"
              onChange={(event) => update("invoiceNumber", event.target.value)}
              value={state.invoiceNumber}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="dueDate">Splatnost</Label>
            <Input
              id="dueDate"
              onChange={(event) => update("dueDate", event.target.value)}
              value={state.dueDate}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center">
          <div>
            <div className="text-sm text-muted-foreground">K úhradě</div>
            <div className="font-mono text-2xl font-semibold tabular-nums">{formatCurrency(total)}</div>
          </div>
          <Button className="sm:ml-auto" disabled={isPending} onClick={submit}>
            {isPending ? <Loader2 className="size-4 animate-spin" /> : <Download className="size-4" />}
            Vygenerovat PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
