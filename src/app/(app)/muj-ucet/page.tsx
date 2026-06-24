import { Building2, CreditCard, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AccountPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Můj účet</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Vlastní fakturační údaje, bankovní účet a výchozí nastavení dokladů.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <UserRound className="size-4" />
              Profil
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="name">Jméno</Label>
              <Input id="name" defaultValue="Maksim Zaytsev" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" defaultValue="maksim@example.com" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <Building2 className="size-4" />
              Firma
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="company">Název</Label>
              <Input id="company" defaultValue="Maksim Zaytsev" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="ico">IČO</Label>
              <Input id="ico" defaultValue="04962311" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="size-4" />
              Platby
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="account">Bankovní účet</Label>
              <Input id="account" defaultValue="2863409193/0800" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="due">Výchozí splatnost</Label>
              <Input id="due" defaultValue="14 dní" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Button>Uložit změny</Button>
      </div>
    </div>
  );
}
