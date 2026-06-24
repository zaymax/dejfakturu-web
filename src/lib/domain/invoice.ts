import { z } from "zod";

export const publicInvoiceSchema = z.object({
  supplierName: z.string().trim().min(1).max(120),
  customerName: z.string().trim().min(1).max(120),
  invoiceNumber: z.string().trim().min(1).max(40),
  description: z.string().trim().min(1).max(200),
  quantity: z.coerce.number().positive().max(999_999),
  unitPrice: z.coerce.number().nonnegative().max(999_999_999),
  dueDate: z.string().trim().min(1).max(40),
});

export type PublicInvoiceInput = z.infer<typeof publicInvoiceSchema>;

export function calculatePublicInvoiceTotal(input: PublicInvoiceInput) {
  return Math.round(input.quantity * input.unitPrice * 100);
}
