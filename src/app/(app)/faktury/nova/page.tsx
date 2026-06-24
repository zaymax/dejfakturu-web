import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { InvoiceEditor } from "@/components/invoices/invoice-editor";

export default function NewInvoicePage() {
  return (
    <div className="grid gap-6">
      <Link
        className="flex w-fit items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        href="/faktury"
      >
        <ArrowLeft className="size-4" />
        Zpět na faktury
      </Link>
      <div>
        <h1 className="text-2xl font-semibold">Nová faktura</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Faktura 2026-0006 · průběžně ukládáme jako návrh
        </p>
      </div>
      <InvoiceEditor />
    </div>
  );
}
