import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  Check,
  CheckCheck,
  Coffee,
  Heart,
  PenLine,
  Send,
  Smile,
  Star,
  WandSparkles,
  Zap,
} from "lucide-react";
import { QuickInvoiceGenerator } from "@/components/marketing/quick-invoice-generator";
import { LandingMotion } from "@/components/marketing/landing-motion";
import { PaperScene } from "@/components/marketing/paper-scene";

const steps = [
  {
    icon: PenLine,
    title: "Naťukej co a komu",
    body: "Jméno klienta, položka, cena. Tečka. Žádný kolonky, kterým nerozumíš, a žádný „variabilní symbol pro DPH skupinu“.",
  },
  {
    icon: WandSparkles,
    title: "Klikni na Vystavit",
    body: "Číslo faktury, splatnost i DPH dopočítáme za tebe. Ty nemusíš vědět, jak na to — od toho jsme tady my.",
  },
  {
    icon: Send,
    title: "Pošli a měj klid",
    body: "Stáhneš PDF nebo ho pošleš klientovi rovnou z appky. Pak zavři notebook a běž si pro to pivo.",
  },
];

const reasons = [
  {
    icon: Smile,
    accent: "violet",
    title: "Mluvíme lidsky",
    body: "Žádný účetnický žargon. Když na něco klikneš, stane se přesně to, co čekáš.",
  },
  {
    icon: Zap,
    accent: "coral",
    title: "Faktura za 30 vteřin",
    body: "Ne za 30 minut hledání ve videonávodech. Otevři, vyplň, hotovo.",
  },
  {
    icon: BadgeCheck,
    accent: "mint",
    title: "Vždycky správně",
    body: "DPH, náležitosti, číselná řada. Pohlídáme to, aby ti to úřad nevrátil.",
  },
  {
    icon: Heart,
    accent: "ink",
    title: "Bez nervů a háčků",
    body: "Žádný skrytý poplatky, žádný „kontaktujte obchodníka“. Prostě to funguje.",
  },
];

const quotes = [
  {
    text: "Konečně nemusím u faktur brečet. Vystavím ji rychlejc, než si udělám kafe.",
    name: "Petra K.",
    role: "grafička na volné noze",
    initial: "P",
  },
  {
    text: "Měl jsem Excel a panický záchvaty. Teď mám DejFakturu a klid. To je celý.",
    name: "Tomáš V.",
    role: "OSVČ, instalatér",
    initial: "T",
  },
  {
    text: "Nejsem účetní typ. Tohle dá fakt i úplnej blbec — a to říkám jako kompliment.",
    name: "Marek D.",
    role: "freelance vývojář",
    initial: "M",
  },
];

const plans = [
  {
    name: "Občas",
    price: "0",
    period: "Kč navždy",
    desc: "Pro lidi, co fakturujou jen tu a tam. Žádná karta, žádný závazek.",
    cta: "Začít zdarma",
    featured: false,
    perks: [
      "3 faktury měsíčně",
      "PDF ke stažení hned",
      "Vlastní logo a údaje",
    ],
  },
  {
    name: "Na full",
    price: "149",
    period: "Kč / měsíc",
    desc: "Pro ty, co fakturujou pravidelně a chtějí mít všechno na jednom místě.",
    cta: "Vystav první fakturu",
    featured: true,
    perks: [
      "Neomezeně faktur",
      "Klienti a historie na jednom místě",
      "Odesílání e-mailem na jeden klik",
      "Připomínky nezaplacených faktur",
    ],
  },
  {
    name: "Parta",
    price: "349",
    period: "Kč / měsíc",
    desc: "Pro malé týmy a firmy, co potřebují víc rukou u jednoho účtu.",
    cta: "Domluvit to",
    featured: false,
    perks: [
      "Všechno z Na full",
      "Víc uživatelů pod jednou firmou",
      "Exporty pro účetní (ať má radost)",
    ],
  },
];

export default function MarketingPage() {
  return (
    <div className="lp">
      <LandingMotion />

      <nav className="lp-nav">
        <div className="lp-shell lp-nav-inner">
          <Link className="lp-logo" href="/">
            <span className="lp-logo-glyph" aria-hidden="true">
              ✦
            </span>
            DejFakturu
          </Link>
          <div className="lp-nav-links">
            <a href="#jak">Jak to chodí</a>
            <a href="#proc">Proč my</a>
            <a href="#cenik">Ceník</a>
          </div>
          <div className="lp-nav-cta">
            <Link className="lp-nav-login" href="/login">
              Přihlásit
            </Link>
            <Link className="lp-btn lp-btn-primary" href="/registrace">
              Vystav fakturu
            </Link>
          </div>
        </div>
      </nav>

      {/* ---------- HERO ---------- */}
      <header className="lp-hero">
        <PaperScene />
        <div className="lp-shell lp-hero-grid">
          <div>
            <span className="lp-eyebrow" data-hero>
              Nejsme účetní. Jsme pro lidi.
            </span>
            <h1 data-hero>
              Faktura hotová,
              <br />
              než tě stihne
              <br />
              <span className="lp-mark">přejít chuť</span>.
            </h1>
            <p className="lp-hero-sub" data-hero>
              Fakturační software pro lidi, co nesnášejí administrativu. Žádný
              tabulky, žádný žargon, žádný účetní za zády. Vyplníš, klikneš, máš
              PDF — za 30 vteřin.
            </p>
            <div className="lp-hero-cta" data-hero>
              <Link
                className="lp-btn lp-btn-primary lp-btn-lg"
                href="/registrace"
              >
                Vystav první fakturu zdarma
                <ArrowRight aria-hidden="true" />
              </Link>
              <a className="lp-btn lp-btn-ghost lp-btn-lg" href="#jak">
                Mrkni, jak to chodí
                <ArrowDown aria-hidden="true" />
              </a>
            </div>
            <div className="lp-hero-trust" data-hero>
              <span>
                <Check aria-hidden="true" /> Bez platební karty
              </span>
              <span>
                <Check aria-hidden="true" /> Bez závazků
              </span>
              <span>
                <Check aria-hidden="true" /> Bez školení
              </span>
            </div>
          </div>

          {/* live sample invoice */}
          <div className="lp-invoice" data-hero-card>
            <div className="lp-invoice-stamp">
              <Zap aria-hidden="true" />
              Hotovo za 28 s
            </div>
            <div className="lp-invoice-top">
              <div>
                <div className="lp-invoice-label">Faktura</div>
                <div className="lp-invoice-num">2026-0042</div>
              </div>
              <span className="lp-pill">Zaplaceno</span>
            </div>
            <div className="lp-invoice-rows">
              <div className="lp-invoice-row">
                <span>Web na míru</span>
                <span>15 000 Kč</span>
              </div>
              <div className="lp-invoice-row">
                <span>DPH 21 %</span>
                <span>3 150 Kč</span>
              </div>
            </div>
            <div className="lp-invoice-total">
              <span className="lp-invoice-label">K úhradě</span>
              <span className="lp-invoice-amount" data-count="18150">
                18 150 Kč
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ---------- HOW IT WORKS ---------- */}
      <section className="lp-section" id="jak">
        <div className="lp-shell">
          <div className="lp-head">
            <span className="lp-eyebrow" data-reveal>
              Jak to chodí
            </span>
            <h2 data-reveal>Tři kroky. Pak je faktura venku.</h2>
            <p data-reveal>
              Vážně jen tři. Nemusíš nic studovat, nic nastavovat, nikomu volat.
              Tohle dá i ten, kdo „na počítače fakt není“.
            </p>
          </div>

          <div className="lp-steps" data-reveal-group>
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <article className="lp-step" key={step.title}>
                  <div className="lp-step-num">
                    <b>{index + 1}</b>
                    <span>/ 3</span>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                  <span className="lp-step-arrow" aria-hidden="true">
                    <ArrowRight />
                  </span>
                  <Icon
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: "1.75rem",
                      right: "1.75rem",
                      width: "1.4rem",
                      height: "1.4rem",
                      color: "var(--violet)",
                    }}
                  />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- WHY US ---------- */}
      <section className="lp-section lp-section-cloud" id="proc">
        <div className="lp-shell">
          <div className="lp-head">
            <span className="lp-eyebrow" data-reveal>
              Proč my
            </span>
            <h2 data-reveal>Děláme jedinou věc. A pořádně.</h2>
            <p data-reveal>
              Žádné moduly, kterým nikdo nerozumí. Žádné účetnické peklo. Jen
              fakturace, co dává smysl od první vteřiny.
            </p>
          </div>

          <div className="lp-why" data-reveal-group>
            {reasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <article
                  className="lp-why-card"
                  data-accent={reason.accent}
                  key={reason.title}
                >
                  <div className="lp-why-icon">
                    <Icon aria-hidden="true" />
                  </div>
                  <h3>{reason.title}</h3>
                  <p>{reason.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- SOCIAL PROOF ---------- */}
      <section className="lp-section">
        <div className="lp-shell">
          <div className="lp-head">
            <span className="lp-eyebrow" data-reveal>
              Lidi to milujou
            </span>
            <h2 data-reveal>
              Přes 12 000 OSVČ už nefakturuje
              <br />v Excelu po nocích.
            </h2>
          </div>

          <div className="lp-logos" data-reveal>
            <span>Studio Vlk</span>
            <span>Kavárna Zrno</span>
            <span>Dřevo&amp;Co</span>
            <span>Pixelárna</span>
            <span>Trafika 24</span>
          </div>

          <div className="lp-quotes" data-reveal-group>
            {quotes.map((quote) => (
              <figure className="lp-quote" key={quote.name}>
                <div className="lp-quote-stars" aria-label="5 z 5 hvězd">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} aria-hidden="true" />
                  ))}
                </div>
                <blockquote>
                  <p>„{quote.text}“</p>
                </blockquote>
                <figcaption className="lp-quote-who">
                  <span className="lp-quote-avatar" aria-hidden="true">
                    {quote.initial}
                  </span>
                  <span>
                    <b>{quote.name}</b>
                    <small>{quote.role}</small>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- LIVE DEMO ---------- */}
      <section className="lp-section lp-section-cloud">
        <div className="lp-shell">
          <div className="lp-head">
            <span className="lp-eyebrow" data-reveal>
              Nevěříš? Zkus to.
            </span>
            <h2 data-reveal>Vystav si fakturu rovnou tady. Bez účtu.</h2>
            <p data-reveal>
              Tohle není obrázek. Je to vážně funkční appka. Vyplň, klikni a
              stáhne se ti hotové PDF. Pak nám možná dáš za pravdu.
            </p>
          </div>

          <div className="lp-demo" data-reveal>
            <div className="lp-demo-bar" aria-hidden="true">
              <span className="lp-demo-dot" />
              <span className="lp-demo-dot" />
              <span className="lp-demo-dot" />
              <span className="lp-demo-url">dejfakturu.cz/nova</span>
            </div>
            <div className="lp-demo-body">
              <QuickInvoiceGenerator />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- PRICING ---------- */}
      <section className="lp-section" id="cenik">
        <div className="lp-shell">
          <div className="lp-head">
            <span className="lp-eyebrow" data-reveal>
              Ceník
            </span>
            <h2 data-reveal>Bez hvězdiček a malých písmen.</h2>
            <p data-reveal>
              Žádné skryté háčky, žádné „od“. Co vidíš, to platíš. A začít můžeš
              úplně zadarmo.
            </p>
          </div>

          <div className="lp-prices" data-reveal-group>
            {plans.map((plan) => (
              <article
                className="lp-price"
                data-featured={plan.featured}
                key={plan.name}
              >
                <div className="lp-price-name">
                  {plan.name}
                  {plan.featured ? (
                    <span className="lp-price-tag">Nejoblíbenější</span>
                  ) : null}
                </div>
                <div className="lp-price-cost">
                  <b>{plan.price}</b>
                  <small>{plan.period}</small>
                </div>
                <p className="lp-price-desc">{plan.desc}</p>
                <ul className="lp-price-list">
                  {plan.perks.map((perk) => (
                    <li key={perk}>
                      <CheckCheck aria-hidden="true" />
                      {perk}
                    </li>
                  ))}
                </ul>
                <Link
                  className={`lp-btn ${
                    plan.featured ? "lp-btn-primary" : "lp-btn-ghost"
                  }`}
                  href="/registrace"
                >
                  {plan.cta}
                </Link>
              </article>
            ))}
          </div>
          <p className="lp-price-note">
            Všechny ceny bez DPH. Zrušit můžeš kdykoliv, na dva kliky. Fakt.
          </p>
        </div>
      </section>

      {/* ---------- FINAL CTA ---------- */}
      <section className="lp-final" data-reveal>
        <span className="lp-eyebrow" style={{ color: "var(--lime)" }}>
          Tak co, jdeme na to?
        </span>
        <h2>Dej tu fakturu a měj to z krku.</h2>
        <p>
          První fakturu vystavíš dřív, než dočteš tuhle větu. Bez karty, bez
          závazků, bez výmluv.
        </p>
        <Link className="lp-btn lp-btn-primary lp-btn-lg" href="/registrace">
          Vystav první fakturu zdarma
          <ArrowRight aria-hidden="true" />
        </Link>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="lp-footer">
        <div className="lp-shell lp-footer-inner">
          <span>
            © {new Date().getFullYear()} DejFakturu — fakturace pro lidi, ne pro
            účetní.
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            Děláno s <Coffee style={{ width: "1rem", height: "1rem" }} /> v
            Česku
          </span>
        </div>
      </footer>
    </div>
  );
}
