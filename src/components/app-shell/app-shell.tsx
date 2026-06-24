"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Building2,
  CircleDollarSign,
  Download,
  FileText,
  Home,
  Menu,
  Moon,
  Plus,
  Search,
  Settings,
  Users,
} from "lucide-react";
import { useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Přehled", icon: Home },
  { href: "/faktury", label: "Faktury", icon: FileText, badge: "92" },
  { href: "/zakaznici", label: "Zákazníci", icon: Users },
  { href: "/exporty", label: "Exporty", icon: Download },
  { href: "/vydaje", label: "Výdaje", icon: CircleDollarSign },
  { href: "/muj-ucet", label: "Můj účet", icon: Settings },
];

function Brand() {
  return (
    <Link className="flex items-center gap-2.5" href="/dashboard">
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <FileText className="size-4" />
      </span>
      <span className="font-semibold">DejFakturu</span>
    </Link>
  );
}

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="grid gap-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            className={cn(
              "flex h-9 items-center gap-2 rounded-lg px-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
              isActive && "bg-accent text-foreground"
            )}
            href={item.href}
            key={item.href}
            onClick={onNavigate}
          >
            <Icon className="size-4" />
            <span>{item.label}</span>
            {item.badge ? (
              <span className="ml-auto rounded-md border px-1.5 py-0.5 text-xs">
                {item.badge}
              </span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}

function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-64 shrink-0 border-r bg-card px-3 py-4 md:sticky md:top-0 md:flex md:flex-col">
      <Brand />
      <div className="mt-6 text-xs font-medium text-muted-foreground">
        Hlavní
      </div>
      <div className="mt-2">
        <SidebarNav />
      </div>
      <div className="mt-auto border-t pt-3">
        <div className="flex items-center gap-2 rounded-lg px-2 py-2">
          <Avatar className="size-8 rounded-lg">
            <AvatarFallback className="rounded-lg">MZ</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium">Maksim Zaytsev</div>
            <div className="truncate text-xs text-muted-foreground">
              IČO 04962311
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const saved = window.localStorage.getItem("dejfakturu-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = saved ? saved === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", shouldUseDark);
  }, []);

  function toggleTheme() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("dejfakturu-theme", next ? "dark" : "light");
  }

  return (
    <div className="min-h-screen bg-background md:flex">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-background/90 px-4 backdrop-blur">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="md:hidden" size="icon" variant="outline">
                <Menu className="size-4" />
                <span className="sr-only">Otevřít navigaci</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-72 p-4" side="left">
              <SheetHeader className="sr-only">
                <SheetTitle>Navigace</SheetTitle>
              </SheetHeader>
              <Brand />
              <div className="mt-6">
                <SidebarNav />
              </div>
            </SheetContent>
          </Sheet>

          <div className="relative hidden w-full max-w-sm sm:block">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="h-9 pl-8 pr-12"
              placeholder="Hledat fakturu, zákazníka, částku"
            />
            <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md border px-1.5 py-0.5 text-[11px] text-muted-foreground">
              ⌘K
            </span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Button onClick={toggleTheme} size="icon" type="button" variant="outline">
              <Moon className="size-4" />
              <span className="sr-only">Přepnout motiv</span>
            </Button>
            <Button className="relative" size="icon" variant="outline">
              <span className="absolute right-2 top-2 size-2 rounded-full bg-destructive ring-2 ring-background" />
              <Bell className="size-4" />
              <span className="sr-only">Oznámení</span>
            </Button>
            <Button asChild>
              <Link href="/faktury/nova">
                <Plus className="size-4" />
                Vystavit fakturu
              </Link>
            </Button>
          </div>
        </header>
        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
      <Building2 className="size-8 text-muted-foreground" />
      <h2 className="mt-3 text-lg font-medium">{title}</h2>
      <p className="mt-1 max-w-md text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
