import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { InvoiceEditor } from "@/components/invoices/invoice-editor";
import { invoices } from "@/lib/mock-data";

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const invoice = invoices.find((item) => item.id === id);

  if (!invoice) {
    notFound();
  }

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
        <h1 className="text-2xl font-semibold">Upravit fakturu</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Faktura {invoice.number} · {invoice.customer}
        </p>
      </div>
      <InvoiceEditor invoiceNumber={invoice.number} mode="edit" />
    </div>
  );
}
