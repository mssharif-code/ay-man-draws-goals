import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import heroPlane from "@/assets/hero-plane.jpg";
import flight1 from "@/assets/flight-1.jpg";
import flight2 from "@/assets/flight-2.jpg";
import flight3 from "@/assets/flight-3.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const navLinks = [
  { label: "Flights", target: "flights" },
  { label: "Cabins", target: "cabins" },
  { label: "Support", target: "support" },
  { label: "Contact", target: "contact" },
];

type Flight = {
  id: string;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  date: string;
  depart: string;
  arrive: string;
  duration: string;
  aircraft: string;
  image: string;
  seats: { class: string; price: number; left: number }[];
};

const flights: Flight[] = [
  {
    id: "FH-208",
    from: "New York",
    fromCode: "JFK",
    to: "London",
    toCode: "LHR",
    date: "Fri, Jul 24, 2026",
    depart: "21:40",
    arrive: "09:15",
    duration: "7h 35m",
    aircraft: "Boeing 787-9",
    image: flight1,
    seats: [
      { class: "Economy", price: 389, left: 24 },
      { class: "Premium", price: 749, left: 8 },
      { class: "Business", price: 2149, left: 3 },
    ],
  },
  {
    id: "FH-412",
    from: "Dubai",
    fromCode: "DXB",
    to: "Tokyo",
    toCode: "HND",
    date: "Sun, Aug 09, 2026",
    depart: "03:10",
    arrive: "17:25",
    duration: "9h 15m",
    aircraft: "Airbus A380",
    image: flight2,
    seats: [
      { class: "Economy", price: 612, left: 41 },
      { class: "Premium", price: 1120, left: 12 },
      { class: "First", price: 4890, left: 2 },
    ],
  },
  {
    id: "FH-777",
    from: "Los Angeles",
    fromCode: "LAX",
    to: "Sydney",
    toCode: "SYD",
    date: "Wed, Sep 02, 2026",
    depart: "22:50",
    arrive: "07:20",
    duration: "14h 30m",
    aircraft: "Boeing 777-300ER",
    image: flight3,
    seats: [
      { class: "Economy", price: 899, left: 18 },
      { class: "Premium", price: 1580, left: 6 },
      { class: "Business", price: 3990, left: 4 },
    ],
  },
];

function StickyNav() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-navy/85 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <a
          href="#top"
          onClick={(e) => handleClick(e, "top")}
          className="flex items-center gap-2 text-2xl tracking-tight text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span className="text-amber-hi">✈</span> FLY HIGH
        </a>
        <div className="flex items-center gap-1 md:gap-3">
          {navLinks.map((l) => (
            <a
              key={l.target}
              href={`#${l.target}`}
              onClick={(e) => handleClick(e, l.target)}
              className="rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-widest text-white/70 transition-colors hover:bg-white/10 hover:text-white md:text-sm"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#flights"
            onClick={(e) => handleClick(e, "flights")}
            className="ml-2 hidden rounded-md bg-amber-hi px-4 py-2 text-xs font-bold uppercase tracking-widest text-navy transition hover:brightness-95 md:inline-block"
          >
            Book Now
          </a>
        </div>
      </div>
    </nav>
  );
}

function Index() {
  return (
    <div id="top" className="min-h-screen bg-background">
      <StickyNav />
      <Hero />
      <SearchBar />
      <FlightsSection />
      <CabinsSection />
      <SupportSection />
      <ContactSection />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-end overflow-hidden">
      <img
        src={heroPlane}
        alt="Jet soaring above golden sunset clouds"
        className="absolute inset-0 h-full w-full object-cover"
        width={1024}
        height={1024}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/30" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-32 md:px-10">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-amber-hi">
          Est. 2026 · 120+ Destinations
        </p>
        <h1
          className="text-[16vw] leading-[0.85] tracking-tight text-white md:text-[11vw] lg:text-[9vw]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          FLY <span className="text-amber-hi">HIGH.</span>
          <br />
          GO FAR.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl">
          Bold fares. Premium cabins. Round-the-clock crew. Book your next
          journey in under sixty seconds.
        </p>
      </div>
    </section>
  );
}

function SearchBar() {
  return (
    <section className="relative z-20 -mt-14 px-6 md:px-10">
      <div className="mx-auto max-w-6xl rounded-2xl bg-card p-6 shadow-2xl md:p-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          <Field label="From" value="JFK · New York" />
          <Field label="To" value="LHR · London" />
          <Field label="Depart" value="Jul 24, 2026" />
          <Field label="Return" value="Aug 03, 2026" />
          <button className="col-span-2 rounded-xl bg-navy px-6 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-primary md:col-span-1">
            Search
          </button>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-cloud px-4 py-3">
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}

function FlightsSection() {
  return (
    <section id="flights" className="px-6 py-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex items-end justify-between gap-8">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-amber-hi">
              Featured Routes
            </p>
            <h2
              className="text-6xl leading-[0.9] tracking-tight text-foreground md:text-7xl lg:text-8xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              PICK YOUR
              <br />
              SKY.
            </h2>
          </div>
          <p className="hidden max-w-sm text-muted-foreground md:block">
            Handpicked routes with real-time seat availability across Economy,
            Premium, Business, and First.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {flights.map((f) => (
            <FlightCard key={f.id} flight={f} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FlightCard({ flight }: { flight: Flight }) {
  const [selected, setSelected] = useState(0);
  const seat = flight.seats[selected];
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-md transition hover:shadow-xl">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={flight.image}
          alt={`${flight.from} to ${flight.to}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          width={1024}
          height={640}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
        <div className="absolute left-4 top-4 rounded-md bg-amber-hi px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-navy">
          {flight.id}
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">From</p>
            <p className="text-4xl tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              {flight.fromCode}
            </p>
          </div>
          <div className="pb-1 text-2xl opacity-70">→</div>
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">To</p>
            <p className="text-4xl tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              {flight.toCode}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm font-semibold text-foreground">
          {flight.from} → {flight.to}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {flight.date} · {flight.aircraft}
        </p>

        <div className="mt-5 grid grid-cols-3 gap-3 rounded-xl bg-cloud p-4 text-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Depart</p>
            <p className="mt-1 text-xl text-foreground" style={{ fontFamily: "var(--font-display)" }}>
              {flight.depart}
            </p>
          </div>
          <div className="border-x border-border">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Duration</p>
            <p className="mt-1 text-sm font-semibold text-foreground">{flight.duration}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Arrive</p>
            <p className="mt-1 text-xl text-foreground" style={{ fontFamily: "var(--font-display)" }}>
              {flight.arrive}
            </p>
          </div>
        </div>

        <div className="mt-5">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Seat class
          </p>
          <div className="flex gap-2">
            {flight.seats.map((s, i) => (
              <button
                key={s.class}
                onClick={() => setSelected(i)}
                className={`flex-1 rounded-md border px-2 py-2 text-xs font-semibold transition ${
                  i === selected
                    ? "border-navy bg-navy text-white"
                    : "border-border bg-transparent text-foreground hover:border-navy"
                }`}
              >
                {s.class}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Per seat</p>
            <p className="text-4xl tracking-tight text-foreground" style={{ fontFamily: "var(--font-display)" }}>
              ${seat.price}
            </p>
            <p className="text-xs text-muted-foreground">{seat.left} seats left</p>
          </div>
          <button className="rounded-lg bg-amber-hi px-4 py-3 text-xs font-bold uppercase tracking-widest text-navy transition hover:brightness-95">
            Book Seat
          </button>
        </div>
      </div>
    </article>
  );
}

function CabinsSection() {
  const cabins = [
    { name: "Economy", price: "from $199", perks: ["Free carry-on", "In-flight meal", "Entertainment"] },
    { name: "Premium", price: "from $549", perks: ["Extra legroom", "Priority boarding", "Chef menu"] },
    { name: "Business", price: "from $1,890", perks: ["Lie-flat suite", "Lounge access", "Fast-track security"] },
    { name: "First", price: "from $4,200", perks: ["Private suite", "Chauffeur transfer", "À la carte dining"] },
  ];
  return (
    <section id="cabins" className="bg-navy px-6 py-24 text-white md:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-amber-hi">Cabins</p>
        <h2
          className="mb-14 text-6xl leading-[0.9] tracking-tight md:text-7xl lg:text-8xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          FLY YOUR WAY.
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cabins.map((c) => (
            <div
              key={c.name}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-amber-hi/60"
            >
              <h3 className="text-4xl tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                {c.name}
              </h3>
              <p className="mt-1 text-sm text-amber-hi">{c.price}</p>
              <ul className="mt-5 space-y-2 text-sm text-white/80">
                {c.perks.map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <span className="h-1 w-4 bg-amber-hi" /> {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SupportSection() {
  const items = [
    { k: "24/7", v: "Live agents on chat, phone, and email — every day of the year." },
    { k: "< 2 min", v: "Average response time on our priority support line." },
    { k: "100%", v: "Free changes and refunds within 24 hours of booking." },
    { k: "48 lang", v: "Multilingual crew and support across 48 languages." },
  ];
  return (
    <section id="support" className="px-6 py-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-amber-hi">
              Customer Service
            </p>
            <h2
              className="text-6xl leading-[0.9] tracking-tight text-foreground md:text-7xl lg:text-8xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              WE'VE
              <br />
              GOT YOU.
            </h2>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Real humans, real fast. Whether it's a schedule change, a special
              meal, or a lost bag — our crew is on it.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" className="rounded-lg bg-navy px-5 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-primary">
                Chat with us
              </a>
              <a href="tel:+18003594444" className="rounded-lg border border-navy px-5 py-3 text-xs font-bold uppercase tracking-widest text-navy transition hover:bg-navy hover:text-white">
                Call 1-800-FLYHIGH
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {items.map((i) => (
              <div key={i.k} className="rounded-2xl border border-border bg-cloud p-6">
                <p className="text-5xl tracking-tight text-navy" style={{ fontFamily: "var(--font-display)" }}>
                  {i.k}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{i.v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <footer id="contact" className="bg-cloud px-6 py-20 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <h3 className="text-5xl tracking-tight text-navy md:text-6xl" style={{ fontFamily: "var(--font-display)" }}>
              READY FOR TAKEOFF?
            </h3>
            <p className="mt-3 max-w-md text-muted-foreground">
              Join millions who fly higher every week. Reach us anytime.
            </p>
          </div>
          <div className="text-sm text-muted-foreground md:text-right">
            <p>support@flyhigh.com</p>
            <p>1-800-FLYHIGH</p>
            <p>HQ · 42 Runway Ave, JFK Terminal 8</p>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-xs uppercase tracking-widest text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Fly High Airlines</p>
          <p>Fly High · Go Far</p>
        </div>
      </div>
    </footer>
  );
}
