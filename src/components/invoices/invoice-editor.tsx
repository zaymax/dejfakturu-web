"use client";

import {
  CalendarDays,
  Check,
  ChevronDown,
  Download,
  Eye,
  FileText,
  Loader2,
  Percent,
  Plus,
  Save,
  Send,
  Settings,
  Sparkles,
  Trash2,
  UserRound,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";

type LineItem = {
  id: string;
  qty: number;
  unit: string;
  description: string;
  price: number;
};

type InvoiceEditorState = {
  invoiceType: string;
  issueDate: string;
  invoiceNumber: string;
  dueDate: string;
  variableSymbol: string;
  paymentMethod: string;
  issuer: string;
  supplierName: string;
  customerName: string;
  language: string;
  currency: string;
  rounding: string;
  color: string;
  note: string;
};

type InvoiceEditorProps = {
  mode?: "create" | "edit";
  invoiceNumber?: string;
};

const baseItems: LineItem[] = [
  {
    id: "web",
    qty: 1,
    unit: "ks",
    description: "Návrh a vývoj webové prezentace",
    price: 42_000,
  },
  {
    id: "ux",
    qty: 8,
    unit: "hod",
    description: "Konzultace a UX úpravy",
    price: 1_500,
  },
];

const selectClass =
  "h-9 rounded-lg border border-input bg-background px-3 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50";

function moneyFromCrowns(value: number) {
  return formatCurrency(Math.round(value * 100));
}

function FieldIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted/35 text-muted-foreground">
      {children}
    </span>
  );
}

function CheckItem({ checked, children }: { checked: boolean; children: React.ReactNode }) {
  return (
    <div className={cn("flex items-center gap-2 text-sm", !checked && "text-muted-foreground")}>
      <span
        className={cn(
          "flex size-5 items-center justify-center rounded-full border",
          checked && "border-emerald-600 bg-emerald-600 text-white"
        )}
      >
        {checked ? <Check className="size-3" /> : null}
      </span>
      {children}
    </div>
  );
}

export function InvoiceEditor({
  mode = "create",
  invoiceNumber = "2026-0006",
}: InvoiceEditorProps) {
  const [isPending, setIsPending] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [discountEnabled, setDiscountEnabled] = useState(false);
  const [recurring, setRecurring] = useState(false);
  const [items, setItems] = useState<LineItem[]>(baseItems);
  const [state, setState] = useState<InvoiceEditorState>({
    invoiceType: "Faktura bez DPH (nejsem plátce DPH)",
    issueDate: "13. 06. 2026",
    invoiceNumber,
    dueDate: "24. 06. 2026",
    variableSymbol: invoiceNumber.replace(/\D/g, ""),
    paymentMethod: "Bankovní převod",
    issuer: "Maksim Zaytsev",
    supplierName: "Maksim Zaytsev",
    customerName: mode === "edit" ? "R ALTRA spol. s r.o." : "",
    language: "Čeština",
    currency: "CZK - Kč",
    rounding: "Na celé koruny",
    color: "Grafit",
    note: "",
  });

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.qty * item.price, 0);
  }, [items]);
  const discount = discountEnabled ? subtotal * 0.1 : 0;
  const total = subtotal - discount;
  const hasCustomer = state.customerName.trim().length > 0;
  const readiness = hasCustomer ? 100 : 75;

  function update<K extends keyof InvoiceEditorState>(
    key: K,
    value: InvoiceEditorState[K]
  ) {
    setState((current) => ({ ...current, [key]: value }));
  }

  function updateItem<K extends keyof LineItem>(id: string, key: K, value: LineItem[K]) {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, [key]: value } : item))
    );
  }

  function addItem() {
    setItems((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        qty: 1,
        unit: "ks",
        description: "",
        price: 0,
      },
    ]);
  }

  function removeItem(id: string) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  function lookupCustomer() {
    update("customerName", state.customerName.trim() || "ČEZ a.s.");
    toast.success("Údaje odběratele dohledány z rejstříku.");
  }

  async function downloadPdf() {
    const firstItem = items[0] ?? {
      description: "Fakturované služby",
      qty: 1,
      price: 0,
    };

    setIsPending(true);
    try {
      const response = await fetch("/api/public-invoice/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          supplierName: state.supplierName,
          customerName: state.customerName || "Nezadaný odběratel",
          invoiceNumber: state.invoiceNumber,
          description: firstItem.description || "Fakturované služby",
          quantity: firstItem.qty,
          unitPrice: firstItem.price,
          dueDate: state.dueDate,
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
    <div className="grid gap-6">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="grid gap-4">
          <Card>
            <CardHeader className="border-b">
              <div className="flex items-start gap-3">
                <FieldIcon>
                  <FileText className="size-4" />
                </FieldIcon>
                <div>
                  <CardTitle>Základní údaje</CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Druh, číslování a termíny dokladu
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-1.5">
                  <Label htmlFor="invoiceType">Druh faktury</Label>
                  <select
                    className={selectClass}
                    id="invoiceType"
                    onChange={(event) => update("invoiceType", event.target.value)}
                    value={state.invoiceType}
                  >
                    <option>Faktura bez DPH (nejsem plátce DPH)</option>
                    <option>Faktura s DPH</option>
                    <option>Zálohová faktura</option>
                    <option>Proforma faktura</option>
                  </select>
                  <p className="text-xs text-muted-foreground">
                    Nejste plátce DPH? Zvolte fakturu bez DPH.
                  </p>
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="issueDate">Datum vystavení</Label>
                  <div className="relative">
                    <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      className="pl-9"
                      id="issueDate"
                      onChange={(event) => update("issueDate", event.target.value)}
                      value={state.issueDate}
                    />
                  </div>
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="invoiceNumber">Číslo faktury</Label>
                  <Input
                    id="invoiceNumber"
                    onChange={(event) => {
                      update("invoiceNumber", event.target.value);
                      update("variableSymbol", event.target.value.replace(/\D/g, ""));
                    }}
                    value={state.invoiceNumber}
                  />
                  <p className="text-xs text-muted-foreground">
                    Poslední: 2026-0005 · Konstantní nebo specifický symbol
                  </p>
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="dueDate">Splatnost</Label>
                  <div className="relative">
                    <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      className="pl-9"
                      id="dueDate"
                      onChange={(event) => update("dueDate", event.target.value)}
                      value={state.dueDate}
                    />
                  </div>
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="variableSymbol">Variabilní symbol</Label>
                  <Input
                    id="variableSymbol"
                    onChange={(event) => update("variableSymbol", event.target.value)}
                    value={state.variableSymbol}
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="paymentMethod">Forma úhrady</Label>
                  <select
                    className={selectClass}
                    id="paymentMethod"
                    onChange={(event) => update("paymentMethod", event.target.value)}
                    value={state.paymentMethod}
                  >
                    <option>Bankovní převod</option>
                    <option>Hotově</option>
                    <option>Platební kartou</option>
                    <option>Dobírka</option>
                  </select>
                </div>
                <div className="grid gap-1.5 md:col-span-2">
                  <Label htmlFor="issuer">Vystavil</Label>
                  <Input
                    id="issuer"
                    onChange={(event) => update("issuer", event.target.value)}
                    value={state.issuer}
                  />
                  <p className="text-xs text-muted-foreground">
                    Zobrazí se v patičce všech vašich faktur.
                  </p>
                </div>
              </div>
              <div className="rounded-lg border bg-muted/35 p-3 text-sm text-muted-foreground">
                Bankovní účet <b className="text-foreground">2863409193/0800</b> - IBAN nevyplněno. Bankovní údaje se zobrazí na faktuře.
              </div>
            </CardContent>
          </Card>

          <Card>
            <button
              className="flex w-full items-center gap-3 px-4 py-4 text-left"
              onClick={() => setSettingsOpen((open) => !open)}
              type="button"
            >
              <FieldIcon>
                <Settings className="size-4" />
              </FieldIcon>
              <div className="min-w-0 flex-1">
                <CardTitle>Obecné nastavení</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  Jazyk, měna, vzhled a další nastavení
                </p>
              </div>
              <ChevronDown className={cn("size-4 transition-transform", settingsOpen && "rotate-180")} />
            </button>
            {settingsOpen ? (
              <CardContent className="grid gap-4 border-t">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-1.5">
                    <Label htmlFor="language">Jazyk faktury</Label>
                    <select className={selectClass} id="language" onChange={(event) => update("language", event.target.value)} value={state.language}>
                      <option>Čeština</option>
                      <option>English</option>
                      <option>Deutsch</option>
                    </select>
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="currency">Měna</Label>
                    <select className={selectClass} id="currency" onChange={(event) => update("currency", event.target.value)} value={state.currency}>
                      <option>CZK - Kč</option>
                      <option>EUR - €</option>
                      <option>USD - $</option>
                    </select>
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="rounding">Zaokrouhlení</Label>
                    <select className={selectClass} id="rounding" onChange={(event) => update("rounding", event.target.value)} value={state.rounding}>
                      <option>Na celé koruny</option>
                      <option>Bez zaokrouhlení</option>
                    </select>
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="color">Barva dokladu</Label>
                    <select className={selectClass} id="color" onChange={(event) => update("color", event.target.value)} value={state.color}>
                      <option>Grafit</option>
                      <option>Indigo</option>
                      <option>Smaragd</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            ) : null}
          </Card>

          <Card>
            <CardContent>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                <FieldIcon>
                  <UserRound className="size-4" />
                </FieldIcon>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-medium uppercase text-muted-foreground">Dodavatel</div>
                  <div className="mt-1 font-medium">Maksim Zaytsev · IČO 04962311</div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Michalovice 197, 293 01, Mladá Boleslav
                    <br />
                    E-mail: Zadat e-mail · Telefon: Zadat telefon · Web: Zadat web
                  </p>
                </div>
                <Button size="sm" variant="ghost">Upravit</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <FieldIcon>
                  <Users className="size-4" />
                </FieldIcon>
                <div className="relative min-w-0 flex-1">
                  <Input
                    onChange={(event) => update("customerName", event.target.value)}
                    placeholder="Zadejte jméno, název nebo IČO - zbytek dohledáme"
                    value={state.customerName}
                  />
                  <Button
                    className="absolute right-1 top-1 size-7"
                    onClick={lookupCustomer}
                    size="icon-sm"
                    type="button"
                    variant="ghost"
                  >
                    <Sparkles className="size-4" />
                    <span className="sr-only">Automaticky dohledat</span>
                  </Button>
                </div>
                <Button size="sm" variant="ghost">Zadám ručně</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b">
              <div className="flex items-start gap-3">
                <FieldIcon>
                  <FileText className="size-4" />
                </FieldIcon>
                <div>
                  <CardTitle>Položky faktury</CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Co fakturujete - ceny počítáme automaticky
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="hidden grid-cols-[92px_80px_1fr_140px_140px_40px] gap-2 text-xs font-medium text-muted-foreground lg:grid">
                <div>Počet</div>
                <div>M.J.</div>
                <div>Popis</div>
                <div className="text-right">Cena</div>
                <div className="text-right">Celkem</div>
                <div />
              </div>

              <div className="grid gap-3">
                {items.map((item) => (
                  <div
                    className="grid gap-2 rounded-lg border p-3 lg:grid-cols-[92px_80px_1fr_140px_140px_40px] lg:items-center lg:border-0 lg:p-0"
                    key={item.id}
                  >
                    <Input
                      min="0"
                      onChange={(event) => updateItem(item.id, "qty", Number(event.target.value))}
                      type="number"
                      value={item.qty}
                    />
                    <Input
                      onChange={(event) => updateItem(item.id, "unit", event.target.value)}
                      value={item.unit}
                    />
                    <Input
                      onChange={(event) => updateItem(item.id, "description", event.target.value)}
                      placeholder="Popis položky"
                      value={item.description}
                    />
                    <Input
                      min="0"
                      onChange={(event) => updateItem(item.id, "price", Number(event.target.value))}
                      type="number"
                      value={item.price}
                    />
                    <div className="text-right font-medium tabular-nums">
                      {moneyFromCrowns(item.qty * item.price)}
                    </div>
                    <Button
                      disabled={items.length === 1}
                      onClick={() => removeItem(item.id)}
                      size="icon-sm"
                      type="button"
                      variant="ghost"
                    >
                      <Trash2 className="size-4" />
                      <span className="sr-only">Odebrat položku</span>
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                <Button onClick={addItem} size="sm" type="button" variant="ghost">
                  <Plus className="size-4" />
                  Přidat položku
                </Button>
                <Button onClick={() => toast.success("Výběr uložených položek připravíme v dalším kroku.")} size="sm" type="button" variant="ghost">
                  Vybrat z uložených
                </Button>
                <Button
                  onClick={() => setDiscountEnabled((enabled) => !enabled)}
                  size="sm"
                  type="button"
                  variant={discountEnabled ? "secondary" : "ghost"}
                >
                  <Percent className="size-4" />
                  Sleva na fakturu
                </Button>
              </div>

              <div className="ml-auto grid w-full max-w-md gap-2 rounded-lg border p-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mezisoučet</span>
                  <span className="font-medium tabular-nums">{moneyFromCrowns(subtotal)}</span>
                </div>
                {discountEnabled ? (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sleva (10 %)</span>
                    <span className="font-medium tabular-nums">-{moneyFromCrowns(discount)}</span>
                  </div>
                ) : null}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Celkem bez DPH</span>
                  <span className="font-medium tabular-nums">{moneyFromCrowns(total)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-base font-semibold">
                  <span>Celkem s DPH</span>
                  <span className="tabular-nums">{moneyFromCrowns(total)}</span>
                </div>
              </div>

              <Textarea
                onChange={(event) => update("note", event.target.value)}
                placeholder="Přidat poznámku"
                value={state.note}
              />
            </CardContent>

            <div className="flex items-center gap-3 border-t bg-muted/35 px-4 py-3">
              <button
                aria-pressed={recurring}
                className={cn(
                  "h-6 w-11 rounded-full border p-0.5 transition-colors",
                  recurring ? "bg-primary" : "bg-background"
                )}
                onClick={() => setRecurring((enabled) => !enabled)}
                type="button"
              >
                <span
                  className={cn(
                    "block size-4 rounded-full bg-muted-foreground transition-transform",
                    recurring && "translate-x-5 bg-primary-foreground"
                  )}
                />
              </button>
              <div>
                <div className="text-sm font-medium">Pravidelně fakturovat</div>
                <div className="text-xs text-muted-foreground">
                  Automaticky vytvářet tuto fakturu každý měsíc
                </div>
              </div>
            </div>
          </Card>
        </div>

        <aside className="grid h-fit gap-4 lg:sticky lg:top-20">
          <Card>
            <CardContent className="p-0">
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <FileText className="size-5" />
                  </span>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Faktura</div>
                    <div className="font-medium">{state.invoiceNumber}</div>
                  </div>
                </div>
                <div className="mt-5 grid gap-2 text-sm">
                  <div className="flex justify-between gap-3">
                    <span className="text-muted-foreground">Dodavatel</span>
                    <b className="font-medium">{state.supplierName}</b>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-muted-foreground">Odběratel</span>
                    <b className="text-right font-medium">{state.customerName || "- nevyplněno -"}</b>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-muted-foreground">Vystaveno</span>
                    <b className="font-medium">{state.issueDate}</b>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-muted-foreground">Splatnost</span>
                    <b className="font-medium">{state.dueDate}</b>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between gap-3">
                    <span className="text-muted-foreground">Položek</span>
                    <b className="font-medium">{items.length}</b>
                  </div>
                  <div className="mt-2 flex items-baseline justify-between gap-3">
                    <span className="text-xs font-medium text-muted-foreground">K úhradě</span>
                    <span className="text-xl font-semibold tabular-nums">{moneyFromCrowns(total)}</span>
                  </div>
                </div>
              </div>
              <div className="border-t bg-muted/35 p-5">
                <div className="flex items-center justify-between text-sm">
                  <span>Připravenost faktury</span>
                  <span>{readiness} %</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                  <span className="block h-full rounded-full bg-primary" style={{ width: `${readiness}%` }} />
                </div>
                <div className="mt-4 grid gap-2">
                  <CheckItem checked>Základní údaje vyplněny</CheckItem>
                  <CheckItem checked={items.length > 0}>Položky přidány</CheckItem>
                  <CheckItem checked>Bankovní účet nastaven</CheckItem>
                  <CheckItem checked={hasCustomer}>Doplňte odběratele</CheckItem>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>

      <div className="sticky bottom-0 z-20 -mx-4 flex flex-col gap-3 border-t bg-background/95 px-4 py-3 backdrop-blur sm:flex-row sm:items-center sm:px-6">
        <div>
          <div className="text-xs text-muted-foreground">K úhradě s DPH</div>
          <div className="text-lg font-semibold tabular-nums">{moneyFromCrowns(total)}</div>
        </div>
        <div className="flex flex-wrap gap-2 sm:ml-auto">
          <Button type="button" variant="ghost">
            <Eye className="size-4" />
            Náhled
          </Button>
          <Button onClick={() => toast.success("Návrh faktury uložen.")} type="button" variant="secondary">
            <Save className="size-4" />
            Uložit návrh
          </Button>
          <Button onClick={() => toast.success("Faktura vystavena a odeslána e-mailem.")} type="button" variant="outline">
            <Send className="size-4" />
            Vystavit a odeslat
          </Button>
          <Button disabled={isPending} onClick={downloadPdf} type="button">
            {isPending ? <Loader2 className="size-4 animate-spin" /> : <Download className="size-4" />}
            Vystavit a stáhnout
          </Button>
        </div>
      </div>
    </div>
  );
}
