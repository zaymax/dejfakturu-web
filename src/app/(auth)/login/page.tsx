import Link from "next/link";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-muted/35 px-4 py-10">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <Link className="mb-4 flex items-center gap-2 font-semibold" href="/">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <FileText className="size-4" />
            </span>
            DejFakturu
          </Link>
          <CardTitle>Přihlášení</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="password">Heslo</Label>
              <Input id="password" type="password" />
            </div>
            <Button type="button">Přihlásit</Button>
          </form>
          <p className="mt-4 text-sm text-muted-foreground">
            Nemáte účet?{" "}
            <Link className="font-medium text-foreground" href="/registrace">
              Registrovat
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
