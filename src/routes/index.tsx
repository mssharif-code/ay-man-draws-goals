import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import heroHelpers from "@/assets/hero-helpers.jpg";
import helperCleaner from "@/assets/helper-cleaner.jpg";
import helperCook from "@/assets/helper-cook.jpg";
import helperNanny from "@/assets/helper-nanny.jpg";
import helperGardener from "@/assets/helper-gardener.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const navLinks = [
  { label: "Helpers", target: "helpers" },
  { label: "Responsibilities", target: "responsibilities" },
  { label: "Reviews", target: "testimonials" },
  { label: "FAQ", target: "faq" },
  { label: "Membership", target: "membership" },
  { label: "Hiring Tips", target: "tips" },
  { label: "Contact", target: "contact" },
];

type Helper = {
  id: string;
  name: string;
  role: string;
  image: string;
  rateMin: number;
  rateMax: number;
  responsibilities: string[];
  skills: string[];
};

const helpers: Helper[] = [
  {
    id: "h1",
    name: "Maria",
    role: "House Cleaner",
    image: helperCleaner,
    rateMin: 22,
    rateMax: 28,
    responsibilities: [
      "Dusting, vacuuming, and mopping all rooms",
      "Kitchen and bathroom deep cleaning",
      "Laundry folding and bed making",
      "Organizing clutter and taking out trash",
    ],
    skills: [
      "Attention to detail",
      "Knowledge of safe cleaning products",
      "Time management",
      "Trustworthy with keys",
    ],
  },
  {
    id: "h2",
    name: "Priya",
    role: "Home Cook",
    image: helperCook,
    rateMin: 25,
    rateMax: 35,
    responsibilities: [
      "Meal planning and grocery lists",
      "Cooking fresh daily meals",
      "Kitchen cleanup after cooking",
      "Accommodating dietary restrictions",
    ],
    skills: [
      "Food safety and hygiene",
      "Menu variety",
      "Budget-friendly shopping",
      "Punctual meal delivery",
    ],
  },
  {
    id: "h3",
    name: "Emma",
    role: "Nanny",
    image: helperNanny,
    rateMin: 20,
    rateMax: 30,
    responsibilities: [
      "Child supervision and playtime",
      "Homework help and reading",
      "Meal prep for kids",
      "Light child-related tidying",
    ],
    skills: [
      "First aid / CPR certified",
      "Patient and nurturing",
      "Creative activities",
      "Reliable communication",
    ],
  },
  {
    id: "h4",
    name: "David",
    role: "Gardener",
    image: helperGardener,
    rateMin: 23,
    rateMax: 32,
    responsibilities: [
      "Lawn mowing and hedge trimming",
      "Planting, weeding, and fertilizing",
      "Seasonal yard cleanup",
      "Watering schedules and pest checks",
    ],
    skills: [
      "Plant and soil knowledge",
      "Tool safety",
      "Physical stamina",
      "Eco-friendly practices",
    ],
  },
];

const tips = [
  {
    title: "Check references",
    body: "Ask for at least two past employer contacts and call them. Reliable helpers are happy to share references.",
  },
  {
    title: "Verify identity",
    body: "Request a government ID and, when possible, a recent background check before handing over keys.",
  },
  {
    title: "Start with a trial",
    body: "Book a one-time session first. Use it to observe punctuality, thoroughness, and how they treat your home.",
  },
  {
    title: "Set clear expectations",
    body: "Write down tasks, hours, pay, and house rules. Clear agreements prevent misunderstandings later.",
  },
  {
    title: "Discuss payment upfront",
    body: "Agree on hourly rates, payment day, and overtime before the first visit. Transparency builds trust.",
  },
  {
    title: "Respect and value them",
    body: "Fair pay, timely payments, and a respectful tone turn a good helper into a long-term partner.",
  },
];

function StickyNav() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-cream/90 backdrop-blur-md border-b border-charcoal/5">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <a
          href="#top"
          onClick={(e) => handleClick(e, "top")}
          className="text-2xl font-semibold tracking-tight text-charcoal"
          style={{ fontFamily: "var(--font-display)" }}
        >
          HELPERS
        </a>
        <div className="flex items-center gap-1 md:gap-3">
          {navLinks.map((l) => (
            <a
              key={l.target}
              href={`#${l.target}`}
              onClick={(e) => handleClick(e, l.target)}
              className="rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-widest text-charcoal/70 transition-colors hover:bg-charcoal/5 hover:text-charcoal md:text-sm"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#helpers"
            onClick={(e) => handleClick(e, "helpers")}
            className="ml-2 hidden rounded-md bg-sage px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-primary md:inline-block"
          >
            Find a Helper
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
      <HelpersSection />
      <ResponsibilitiesSection />
      <TestimonialsSection />
      <FaqSection />
      <MembershipSection />
      <TipsSection />
      <ContactSection />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-end overflow-hidden">
      <img
        src={heroHelpers}
        alt="Team of trusted household helpers standing together in a bright home"
        className="absolute inset-0 h-full w-full object-cover"
        width={1280}
        height={720}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/70 to-cream/30" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-32 md:px-10">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-sage">
          Verified · Reliable · Caring
        </p>
        <h1
          className="max-w-3xl text-[14vw] leading-[0.85] tracking-tight text-charcoal md:text-[9vw] lg:text-[7vw]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          HELP FOR
          <br />
          YOUR <span className="text-sage">HOME.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-charcoal/80 md:text-xl">
          Find skilled household helpers you can trust. Cleaners, cooks, nannies,
          gardeners — all in one place with clear rates and honest tips.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#helpers"
            className="rounded-lg bg-sage px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-primary"
          >
            Meet the Helpers
          </a>
          <a
            href="#tips"
            className="rounded-lg border border-charcoal/20 bg-white/80 px-6 py-3 text-sm font-bold uppercase tracking-widest text-charcoal transition hover:bg-white"
          >
            Hiring Tips
          </a>
        </div>
      </div>
    </section>
  );
}

function HelpersSection() {
  return (
    <section id="helpers" className="px-6 py-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-terracotta">
              Our Helpers
            </p>
            <h2
              className="text-6xl leading-[0.9] tracking-tight text-charcoal md:text-7xl lg:text-8xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              MEET THE
              <br />
              TEAM.
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">
            Every helper is background-checked, reference-verified, and ready to
            make your home run smoother.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {helpers.map((h) => (
            <HelperCard key={h.id} helper={h} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HelperCard({ helper }: { helper: Helper }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-md transition hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={helper.image}
          alt={`${helper.name}, ${helper.role}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          width={1024}
          height={1024}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <p className="text-3xl tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            {helper.name}
          </p>
          <p className="text-xs font-semibold uppercase tracking-widest opacity-90">{helper.role}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Estimated rate
          </p>
          <p className="text-4xl tracking-tight text-sage" style={{ fontFamily: "var(--font-display)" }}>
            ${helper.rateMin}–${helper.rateMax}
          </p>
          <p className="text-xs text-muted-foreground">per hour</p>
        </div>

        <div className="mb-4">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Key responsibilities
          </p>
          <ul className="space-y-1.5 text-sm text-foreground">
            {helper.responsibilities.slice(0, 3).map((r) => (
              <li key={r} className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1.5 shrink-0 rounded-full bg-terracotta" />
                <span className="leading-snug">{r}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Required skills
          </p>
          <div className="flex flex-wrap gap-2">
            {helper.skills.map((s) => (
              <span
                key={s}
                className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-charcoal/80"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function ResponsibilitiesSection() {
  return (
    <section id="responsibilities" className="bg-sage px-6 py-24 text-white md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-white/70">
            What to Expect
          </p>
          <h2
            className="text-6xl leading-[0.9] tracking-tight md:text-7xl lg:text-8xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            RESPONSIBILITIES
            <br />
            & SKILLS.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {helpers.map((h) => (
            <div
              key={h.id}
              className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur transition hover:border-white/30"
            >
              <h3 className="text-3xl tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                {h.role}
              </h3>
              <p className="mt-1 text-sm font-semibold text-terracotta">{h.name}</p>

              <div className="mt-5">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-white/70">
                  Typical duties
                </p>
                <ul className="space-y-2 text-sm text-white/90">
                  {h.responsibilities.map((r) => (
                    <li key={r} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-3 shrink-0 bg-terracotta" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-white/70">
                  Must-have skills
                </p>
                <ul className="space-y-2 text-sm text-white/90">
                  {h.skills.map((s) => (
                    <li key={s} className="flex items-center gap-2">
                      <span className="text-terracotta">✓</span> {s}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-6 text-3xl tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                ${h.rateMin}–${h.rateMax}<span className="text-sm font-normal opacity-70">/hr</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TipsSection() {
  return (
    <section id="tips" className="px-6 py-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-terracotta">
              Hire Smart
            </p>
            <h2
              className="text-6xl leading-[0.9] tracking-tight text-charcoal md:text-7xl lg:text-8xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              TRUSTED
              <br />
              TIPS.
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">
            Hiring someone into your home is personal. Follow these steps to find
            a helper you can rely on for years.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tips.map((t, i) => (
            <div
              key={t.title}
              className="rounded-2xl border border-border bg-card p-6 transition hover:border-sage/40"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage text-sm font-bold text-white">
                {i + 1}
              </div>
              <h3 className="mt-5 text-2xl tracking-tight text-charcoal" style={{ fontFamily: "var(--font-display)" }}>
                {t.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    id: "t1",
    name: "Sarah L.",
    location: "Austin, TX",
    helper: "Maria — House Cleaner",
    rating: 5,
    review:
      "Maria is a lifesaver. My home has never looked this clean, and she always shows up right on time. I trust her completely with my keys.",
  },
  {
    id: "t2",
    name: "James & Priya R.",
    location: "Seattle, WA",
    helper: "Priya — Home Cook",
    rating: 5,
    review:
      "Priya prepares delicious, healthy meals for our whole family. She respects our dietary needs and leaves the kitchen spotless every time.",
  },
  {
    id: "t3",
    name: "Monica T.",
    location: "Denver, CO",
    helper: "Emma — Nanny",
    rating: 4,
    review:
      "Emma is wonderful with our two kids. She's patient, creative, and always sends us updates. A true peace of mind for working parents.",
  },
  {
    id: "t4",
    name: "David K.",
    location: "Phoenix, AZ",
    helper: "David — Gardener",
    rating: 5,
    review:
      "Our yard went from embarrassing to the best on the block. David is knowledgeable, hardworking, and uses eco-friendly products.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Rated ${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={i < rating ? 0 : 2}
          className={`h-4 w-4 ${i < rating ? "text-amber-400" : "text-charcoal/20"}`}
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-cream px-6 py-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-terracotta">
              Customer Reviews
            </p>
            <h2
              className="text-6xl leading-[0.9] tracking-tight text-charcoal md:text-7xl lg:text-8xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              HAPPY
              <br />
              HOMES.
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">
            Real reviews from real families who found trusted help through Helpers.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <article
              key={t.id}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:shadow-lg"
            >
              <StarRating rating={t.rating} />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
                "{t.review}"
              </p>
              <div className="mt-6 border-t border-border pt-4">
                <p className="font-semibold text-charcoal">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.location}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-sage">
                  {t.helper}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    question: "How much does a household helper cost per hour?",
    answer:
      "Rates typically range from $20 to $35 per hour depending on the role, experience, and your location. Cleaners and nannies usually start around $20–$28/hr, while experienced cooks and specialized gardeners may charge up to $35/hr.",
  },
  {
    question: "Are the helpers background-checked?",
    answer:
      "Yes. Every helper on our platform goes through identity verification and a background check. We also collect references from previous employers before they can accept bookings.",
  },
  {
    question: "What tasks can a helper help with?",
    answer:
      "Helpers cover cleaning, cooking, childcare, and gardening. Each helper profile lists their specific responsibilities and skills so you can choose the right fit for your home.",
  },
  {
    question: "How do I schedule a helper?",
    answer:
      "Pick a helper, choose a date and time, and confirm your booking. Most helpers are available for one-time visits, weekly schedules, or recurring appointments.",
  },
  {
    question: "What if I'm not satisfied with the service?",
    answer:
      "We offer a satisfaction guarantee. If something isn't right, contact us within 24 hours and we'll reschedule a visit or help you find a better-matched helper.",
  },
  {
    question: "Do I need to provide cleaning supplies or equipment?",
    answer:
      "It depends on the helper. Cleaners usually bring their own supplies, but it's best to confirm during booking. Cooks and gardeners may use your kitchen tools or yard equipment unless arranged otherwise.",
  },
];

function FaqSection() {
  return (
    <section id="faq" className="px-6 py-24 md:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-terracotta">
            Common Questions
          </p>
          <h2
            className="text-6xl leading-[0.9] tracking-tight text-charcoal md:text-7xl lg:text-8xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            QUESTIONS?
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-muted-foreground">
            Everything you need to know about hiring household helpers and how pricing works.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-border bg-card p-6 open:border-sage/40 open:shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-semibold tracking-tight text-charcoal">
                {item.question}
                <span className="ml-4 text-sage transition group-open:rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

const membershipBenefits = [
  "15% off every booking after your third visit",
  "Priority scheduling with your favorite helper",
  "Free rescheduling up to 24 hours before a visit",
  "Exclusive member-only seasonal offers",
];

function MembershipSection() {
  return (
    <section id="membership" className="bg-sage px-6 py-24 text-white md:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-white/70">
              Helpers Club
            </p>
            <h2
              className="text-5xl leading-[0.9] tracking-tight md:text-6xl lg:text-7xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              SAVE MORE
              <br />
              AS A REGULAR.
            </h2>
            <p className="mt-5 max-w-md text-white/80">
              Join our free membership program and unlock discounts reserved for
              returning customers. The more you book, the more you save.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur">
            <div className="mb-6 flex items-baseline gap-2">
              <span className="text-6xl tracking-tight md:text-7xl" style={{ fontFamily: "var(--font-display)" }}>
                15%
              </span>
              <span className="text-lg font-semibold uppercase tracking-widest text-terracotta">
                Off every booking
              </span>
            </div>

            <ul className="space-y-3">
              {membershipBenefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-sm text-white/90">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-terracotta text-xs font-bold text-white">
                    ✓
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="mt-8 inline-block w-full rounded-xl bg-white py-4 text-center text-sm font-bold uppercase tracking-widest text-sage transition hover:bg-cream"
            >
              Become a Member
            </a>
            <p className="mt-3 text-center text-xs text-white/60">
              No fees. Cancel anytime. Open to all returning customers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <footer id="contact" className="bg-charcoal px-6 py-20 text-white md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <h3 className="text-5xl tracking-tight md:text-6xl" style={{ fontFamily: "var(--font-display)" }}>
              READY TO HIRE?
            </h3>
            <p className="mt-3 max-w-md text-white/70">
              Tell us what you need and we'll match you with a verified helper in
              your area within 24 hours.
            </p>
          </div>
          <div className="text-sm text-white/70 md:text-right">
            <p>hello@helpers.com</p>
            <p>1-800-HELPERS</p>
            <p>Mon–Sat · 8am – 8pm</p>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs uppercase tracking-widest text-white/50 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Helpers</p>
          <p>Trusted help for happy homes</p>
        </div>
      </div>
    </footer>
  );
}
