import { readFile } from "node:fs/promises";
import { join } from "node:path";
import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, rgb } from "pdf-lib";
import {
  calculatePublicInvoiceTotal,
  publicInvoiceSchema,
} from "@/lib/domain/invoice";

export const runtime = "nodejs";

function money(cents: number) {
  return new Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency: "CZK",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

function sanitizeFilename(value: string) {
  return value.replace(/[^a-z0-9-]+/gi, "-").replace(/^-+|-+$/g, "");
}

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = publicInvoiceSchema.safeParse(json);

  if (!parsed.success) {
    return Response.json(
      { error: "Neplatná data faktury." },
      { status: 400 }
    );
  }

  const invoice = parsed.data;
  const totalCents = calculatePublicInvoiceTotal(invoice);
  const pdf = await PDFDocument.create();
  pdf.registerFontkit(fontkit);

  const fontBytes = await readFile(
    join(
      process.cwd(),
      "node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf"
    )
  );
  const font = await pdf.embedFont(fontBytes);
  const page = pdf.addPage([595.28, 841.89]);
  const { height, width } = page.getSize();
  const ink = rgb(0.08, 0.08, 0.09);
  const muted = rgb(0.42, 0.42, 0.46);
  const line = rgb(0.88, 0.88, 0.9);

  page.drawText("FAKTURA", {
    x: 48,
    y: height - 82,
    size: 28,
    font,
    color: ink,
  });
  page.drawText(invoice.invoiceNumber, {
    x: 48,
    y: height - 112,
    size: 12,
    font,
    color: muted,
  });

  page.drawText("Dodavatel", { x: 48, y: height - 172, size: 10, font, color: muted });
  page.drawText(invoice.supplierName, { x: 48, y: height - 194, size: 13, font, color: ink });
  page.drawText("Odběratel", { x: 320, y: height - 172, size: 10, font, color: muted });
  page.drawText(invoice.customerName, { x: 320, y: height - 194, size: 13, font, color: ink });

  page.drawText("Splatnost", { x: 48, y: height - 252, size: 10, font, color: muted });
  page.drawText(invoice.dueDate, { x: 48, y: height - 274, size: 13, font, color: ink });
  page.drawText("Vystaveno", { x: 320, y: height - 252, size: 10, font, color: muted });
  page.drawText(new Intl.DateTimeFormat("cs-CZ").format(new Date()), {
    x: 320,
    y: height - 274,
    size: 13,
    font,
    color: ink,
  });

  page.drawLine({ start: { x: 48, y: height - 330 }, end: { x: width - 48, y: height - 330 }, thickness: 1, color: line });
  page.drawText("Popis", { x: 48, y: height - 358, size: 10, font, color: muted });
  page.drawText("Množství", { x: 330, y: height - 358, size: 10, font, color: muted });
  page.drawText("Cena", { x: 430, y: height - 358, size: 10, font, color: muted });

  page.drawText(invoice.description, { x: 48, y: height - 392, size: 12, font, color: ink });
  page.drawText(String(invoice.quantity), { x: 330, y: height - 392, size: 12, font, color: ink });
  page.drawText(money(Math.round(invoice.unitPrice * 100)), { x: 430, y: height - 392, size: 12, font, color: ink });

  page.drawLine({ start: { x: 48, y: height - 428 }, end: { x: width - 48, y: height - 428 }, thickness: 1, color: line });
  page.drawText("K úhradě", { x: 330, y: height - 470, size: 12, font, color: muted });
  page.drawText(money(totalCents), { x: 430, y: height - 473, size: 18, font, color: ink });

  page.drawText("Vygenerováno v DejFakturu", {
    x: 48,
    y: 54,
    size: 10,
    font,
    color: muted,
  });

  const pdfBytes = await pdf.save();
  const body = pdfBytes.buffer.slice(
    pdfBytes.byteOffset,
    pdfBytes.byteOffset + pdfBytes.byteLength
  ) as ArrayBuffer;
  const filename = `${sanitizeFilename(invoice.invoiceNumber) || "faktura"}.pdf`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
