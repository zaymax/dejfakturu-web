export type InvoiceStatus = "draft" | "issued" | "paid" | "overdue";

export type InvoiceListItem = {
  id: string;
  number: string;
  customer: string;
  dueDate: string;
  type: string;
  totalCents: number;
  status: InvoiceStatus;
};

export const invoices: InvoiceListItem[] = [
  {
    id: "2026-0005",
    number: "2026-0005",
    customer: "R ALTRA spol. s r.o.",
    dueDate: "15. 06. 2026",
    type: "Faktura bez DPH",
    totalCents: 124_339_00,
    status: "issued",
  },
  {
    id: "2026-0004",
    number: "2026-0004",
    customer: "Nordic Design Studio",
    dueDate: "02. 06. 2026",
    type: "Faktura s DPH",
    totalCents: 86_500_00,
    status: "paid",
  },
  {
    id: "2026-0003",
    number: "2026-0003",
    customer: "Brno Tech s.r.o.",
    dueDate: "28. 05. 2026",
    type: "Faktura bez DPH",
    totalCents: 45_200_00,
    status: "paid",
  },
  {
    id: "2026-0002",
    number: "2026-0002",
    customer: "Atelier Vlna",
    dueDate: "10. 05. 2026",
    type: "Zálohová faktura",
    totalCents: 18_900_00,
    status: "overdue",
  },
  {
    id: "2025-0097",
    number: "2025-0097",
    customer: "Praha Bistro a.s.",
    dueDate: "14. 04. 2026",
    type: "Faktura s DPH",
    totalCents: 9_650_00,
    status: "draft",
  },
];

export const customers = [
  {
    id: "raltra",
    name: "R ALTRA spol. s r.o.",
    ico: "08765432",
    email: "finance@raltra.cz",
    city: "Praha",
    invoicedCents: 124_339_00,
  },
  {
    id: "nordic",
    name: "Nordic Design Studio",
    ico: "06999111",
    email: "hello@nordic.studio",
    city: "Brno",
    invoicedCents: 86_500_00,
  },
  {
    id: "brno-tech",
    name: "Brno Tech s.r.o.",
    ico: "04321098",
    email: "uctarna@brnotech.cz",
    city: "Brno",
    invoicedCents: 45_200_00,
  },
];

const invoiceSummaryCents = {
  paidCents: 5_704_927_00,
  draftCents: 347_920_00,
  issuedCents: 124_339_00,
  overdueCents: 2_637_00,
};

export const dashboardStats = {
  totalCents:
    invoiceSummaryCents.paidCents +
    invoiceSummaryCents.draftCents +
    invoiceSummaryCents.issuedCents +
    invoiceSummaryCents.overdueCents,
  ...invoiceSummaryCents,
  invoiceCount: 92,
  paidOnTimeRatio: 92,
};

export const statusLabels: Record<InvoiceStatus, string> = {
  draft: "Návrh",
  issued: "Nezaplaceno",
  paid: "Zaplaceno",
  overdue: "Po splatnosti",
};
