# DejFakturu

Webova fakturacni aplikace pro zivnostniky a male firmy. Marketingova stranka
umi vygenerovat jednoduchou PDF fakturu bez uctu; prihlasena cast postupne
pokryje dashboard, faktury, zakazniky a vlastni fakturacni udaje.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui 4
- PostgreSQL
- Prisma 7 s `@prisma/adapter-pg`
- `pdf-lib` pro serverove generovani PDF

## Struktura

- `src/app/(marketing)` - verejna landing page a rychly PDF generator
- `src/app/(auth)` - login a registrace
- `src/app/(app)` - prihlasena aplikace
- `src/app/api/public-invoice/pdf` - PDF endpoint pro faktury bez ulozeni do DB
- `src/components/ui` - shadcn komponenty
- `src/components/invoices` - fakturacni UI
- `src/lib/domain` - domenova validace a vypocty
- `src/lib/db` - Prisma klient
- `prisma/schema.prisma` - datovy model
- `design/index-shadcn.html` - puvodni navrh jako reference

## Lokální spuštění

```bash
npm install
cp .env.example .env
npm run db:generate
npm run dev
```

Aplikace bezi na `http://localhost:3000`.

## Databáze

Vychozi volba je PostgreSQL. Pred prvni migraci nastavte `DATABASE_URL` v `.env`.

```bash
npm run db:migrate
npm run db:studio
```

Schema uz pocita s:

- vice organizacemi na uzivatele,
- rolemi v organizaci,
- zakazniky,
- fakturami a polozkami,
- ciselnymi radami,
- Auth.js-kompatibilnimi tabulkami pro budouci prihlasovani.

## Kontroly

```bash
npm run lint
npm run typecheck
npm run build
npm audit
```

Aktualni stable Next.js a Prisma mohou v `npm audit` hlasit moderate zavislosti,
kde `npm audit fix --force` navrhuje downgrade na starsi major verze. Force fix
nepoustet bez rucni kontroly, protoze by sel proti cilene aktualni platforme.

## Další kroky

1. Napojit login/registraci na zvolene auth reseni.
2. Nahradit mock data v `src/lib/mock-data.ts` dotazy pres Prisma.
3. Rozdelit ulozeni faktury, vystaveni a PDF export na server actions/API.
4. Dodelat CRUD zakazniku a vlastnich udaju.
5. Pripravit produkcni PDF sablonu a uloziste pro vygenerovane dokumenty.
