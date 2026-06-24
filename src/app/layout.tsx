import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import "./globals.css";

const geist = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "DejFakturu",
    template: "%s | DejFakturu",
  },
  description:
    "Jednoducha webova fakturace pro zivnostniky a male firmy v Cesku.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className={cn("font-sans", geist.variable)}>
      <body>
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
