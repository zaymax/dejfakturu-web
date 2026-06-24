import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-mono",
  display: "swap",
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
    <html lang="cs" className={cn("font-sans", inter.variable, jetBrainsMono.variable)}>
      <body>
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
