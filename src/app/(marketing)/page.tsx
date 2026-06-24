import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { QuickInvoiceGenerator } from "@/components/marketing/quick-invoice-generator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const benefits = [
  "Faktury, zákazníci a vlastní údaje na jednom místě",
  "PDF ke stažení hned po vystavení",
  "Číselné řady, splatnosti a bankovní údaje bez opakování",
];

export default function MarketingPage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6">
        <Link className="flex items-center gap-2 font-semibold" href="/">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <FileText className="size-4" />
          </span>
          DejFakturu
        </Link>
        <nav className="ml-auto flex items-center gap-2">
          <Button asChild variant="ghost">
            <Link href="/login">Přihlásit</Link>
          </Button>
          <Button asChild>
            <Link href="/registrace">Začít</Link>
          </Button>
        </nav>
      </header>

      <section className="border-y bg-muted/35">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:py-14">
          <div className="flex flex-col justify-center">
            <Badge className="w-fit" variant="outline">
              Fakturace pro malé firmy
            </Badge>
            <h1 className="mt-5 max-w-xl text-4xl font-semibold leading-tight sm:text-5xl">
              DejFakturu
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
              Vystavte PDF fakturu bez účtu, nebo si založte workspace pro
              dlouhodobou správu zákazníků, dokladů a vlastních údajů.
            </p>
            <div className="mt-6 grid gap-3">
              {benefits.map((benefit) => (
                <div className="flex items-center gap-2 text-sm" key={benefit}>
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  {benefit}
                </div>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-2">
              <Button asChild size="lg">
                <Link href="/registrace">
                  Vytvořit účet
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/dashboard">Otevřít demo aplikaci</Link>
              </Button>
            </div>
          </div>
          <QuickInvoiceGenerator />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:px-6 md:grid-cols-3">
        <Card>
          <CardContent>
            <Sparkles className="size-5 text-blue-600" />
            <h2 className="mt-4 font-medium">Rychlé vystavení</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Nová faktura vede uživatele po minimálním počtu polí a průběžně
              ukazuje částku k úhradě.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <FileText className="size-5 text-emerald-600" />
            <h2 className="mt-4 font-medium">Přehled dokladů</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Stav faktur, splatnosti, zákazníci a exporty mají vlastní místo v
              aplikaci.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <ShieldCheck className="size-5 text-amber-600" />
            <h2 className="mt-4 font-medium">Připravené na růst</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Datový model počítá s více organizacemi, rolemi, Auth.js a
              historií faktur.
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
