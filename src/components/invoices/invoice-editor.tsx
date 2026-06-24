"use client";

import { useMemo, useState } from "react";
import { Download, Loader2, Save, Send } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/format";

type InvoiceEditorState = {
  supplierName: string;
  customerName: string;
  invoiceNumber: string;
  description: string;
  quantity: string;
  unitPrice: string;
  dueDate: string;
};

type InvoiceEditorProps = {
  mode?: "create" | "edit";
  invoiceNumber?: string;
};

export function InvoiceEditor({
  mode = "create",
  invoiceNumber = "2026-0006",
}: InvoiceEditorProps) {
  const [isPending, setIsPending] = useState(false);
  const [state, setState] = useState<InvoiceEditorState>({
    supplierName: "Maksim Zaytsev",
    customerName: mode === "edit" ? "R ALTRA spol. s r.o." : "",
    invoiceNumber,
    description: "Návrh a vývoj webové prezentace",
    quantity: "1",
    unitPrice: "42000",
    dueDate: "14 dní",
  });

  const total = useMemo(() => {
    return Math.round(Number(state.quantity || 0) * Number(state.unitPrice || 0) * 100);
  }, [state.quantity, state.unitPrice]);

  const readiness = state.customerName.trim() ? 100 : 75;

  function update<K extends keyof InvoiceEditorState>(
    key: K,
    value: InvoiceEditorState[K]
  ) {
    setState((current) => ({ ...current, [key]: value }));
  }

  async function downloadPdf() {
    setIsPending(true);
    try {
      const response = await fetch("/api/public-invoice/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...state,
          quantity: Number(state.quantity),
          unitPrice: Number(state.unitPrice),
        }),
      });

      if (!response.ok) {
        throw new Error("PDF se nepodařilo vygenerovat.");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${state.invoiceNumber || "faktura"}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
      toast.success("Faktura vystavena a PDF se stahuje.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Něco se nepovedlo.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="grid gap-4">
        <Card>
          <CardHeader className="border-b">
            <CardTitle>Základní údaje</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
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
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor="supplier">Dodavatel</Label>
                <Input
                  id="supplier"
                  onChange={(event) => update("supplierName", event.target.value)}
                  value={state.supplierName}
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="customer">Odběratel</Label>
                <Input
                  id="customer"
                  onChange={(event) => update("customerName", event.target.value)}
                  placeholder="Zadejte název nebo IČO"
                  value={state.customerName}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b">
            <CardTitle>Položky faktury</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-3 lg:grid-cols-[1fr_120px_160px]">
              <div className="grid gap-1.5">
                <Label htmlFor="description">Popis</Label>
                <Textarea
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
                <Label htmlFor="price">Cena za jednotku</Label>
                <Input
                  id="price"
                  min="0"
                  onChange={(event) => update("unitPrice", event.target.value)}
                  type="number"
                  value={state.unitPrice}
                />
              </div>
            </div>

            <div className="ml-auto w-full max-w-sm space-y-2 rounded-lg border p-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Mezisoučet</span>
                <span>{formatCurrency(total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">DPH</span>
                <span>0 Kč</span>
              </div>
              <Separator />
              <div className="flex justify-between text-base font-semibold">
                <span>Celkem</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <aside className="grid h-fit gap-4 lg:sticky lg:top-20">
        <Card>
          <CardHeader className="border-b">
            <CardTitle>Náhled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border bg-muted/30 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs text-muted-foreground">Faktura</div>
                  <div className="font-semibold">{state.invoiceNumber}</div>
                </div>
                <Badge variant={readiness === 100 ? "default" : "secondary"}>
                  {readiness} %
                </Badge>
              </div>
              <Separator className="my-5" />
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-muted-foreground">Dodavatel</div>
                  <div>{state.supplierName || "-"}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Odběratel</div>
                  <div>{state.customerName || "-"}</div>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">K úhradě</span>
                  <span className="font-semibold">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-2">
          <Button variant="secondary" onClick={() => toast.success("Návrh uložen.")}>
            <Save className="size-4" />
            Uložit návrh
          </Button>
          <Button variant="outline" onClick={() => toast.success("Faktura připravena k odeslání.")}>
            <Send className="size-4" />
            Vystavit a odeslat
          </Button>
          <Button disabled={isPending} onClick={downloadPdf}>
            {isPending ? <Loader2 className="size-4 animate-spin" /> : <Download className="size-4" />}
            Vystavit a stáhnout
          </Button>
        </div>
      </aside>
    </div>
  );
}
