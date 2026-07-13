import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";


import heroHelpers from "@/assets/hero-helpers.jpg";
import { helpers, type Helper } from "@/data/helpers";

export const Route = createFileRoute("/")({
  component: Index,
});


const navLinks = [
  { label: "Match", target: "match" },
  { label: "Helpers", target: "helpers" },
  { label: "Trust", target: "trust" },
  { label: "Responsibilities", target: "responsibilities" },
  { label: "Reviews", target: "testimonials" },
  { label: "FAQ", target: "faq" },
  { label: "Membership", target: "membership" },
  { label: "Hiring Tips", target: "tips" },
  { label: "Contact", target: "contact" },
];

const trustServices = [
  {
    title: "Police verification",
    body: "Every helper undergoes a certified police background check with valid clearance documentation before joining.",
  },
  {
    title: "Medical check",
    body: "Recent health screenings covering general fitness, communicable disease tests, and vaccination records.",
  },
  {
    title: "Document verification",
    body: "Government ID, address proof, and prior work references are validated against official sources.",
  },
  {
    title: "Contract generation",
    body: "Auto-generated, lawyer-reviewed employment contracts tailored to your city's labor rules.",
  },
  {
    title: "Salary benchmarking",
    body: "Compare offered pay against live market rates by role, experience, and neighborhood — no guesswork.",
  },
  {
    title: "Interview scheduling",
    body: "Book video or in-person interviews with shortlisted helpers directly through the platform.",
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
      <MatchingSection />
        <HelpersSection />
        <TrustSection />

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

type QuizAnswers = {
  familySize: string;
  kids: string;
  pets: string;
  home: string;
  schedule: string;
  budget: string;
  language: string;
  cooking: string;
  elderly: string;
  driver: string;
};

const initialAnswers: QuizAnswers = {
  familySize: "",
  kids: "",
  pets: "",
  home: "",
  schedule: "",
  budget: "",
  language: "",
  cooking: "",
  elderly: "",
  driver: "",
};

const quizQuestions: {
  key: keyof QuizAnswers;
  label: string;
  options: { value: string; label: string }[];
}[] = [
  {
    key: "familySize",
    label: "How many people live in your home?",
    options: [
      { value: "1-2", label: "1–2" },
      { value: "3-4", label: "3–4" },
      { value: "5+", label: "5 or more" },
    ],
  },
  {
    key: "kids",
    label: "Do you have kids?",
    options: [
      { value: "none", label: "No kids" },
      { value: "young", label: "Yes, under 6" },
      { value: "school", label: "Yes, school age" },
    ],
  },
  {
    key: "pets",
    label: "Any pets at home?",
    options: [
      { value: "none", label: "No pets" },
      { value: "dog", label: "Dog(s)" },
      { value: "cat", label: "Cat(s)" },
      { value: "other", label: "Other" },
    ],
  },
  {
    key: "home",
    label: "What type of home?",
    options: [
      { value: "apartment", label: "Apartment" },
      { value: "villa", label: "Villa / house" },
    ],
  },
  {
    key: "schedule",
    label: "Full-time or part-time help?",
    options: [
      { value: "full", label: "Full-time" },
      { value: "part", label: "Part-time" },
      { value: "oneoff", label: "One-off / occasional" },
    ],
  },
  {
    key: "budget",
    label: "Hourly budget?",
    options: [
      { value: "low", label: "Under $25" },
      { value: "mid", label: "$25–$35" },
      { value: "high", label: "$35+" },
    ],
  },
  {
    key: "language",
    label: "Preferred language?",
    options: [
      { value: "English", label: "English" },
      { value: "Spanish", label: "Spanish" },
      { value: "French", label: "French" },
      { value: "Hindi", label: "Hindi" },
      { value: "Arabic", label: "Arabic" },
      { value: "any", label: "No preference" },
    ],
  },
  {
    key: "cooking",
    label: "Need cooking help?",
    options: [
      { value: "yes", label: "Yes, daily meals" },
      { value: "sometimes", label: "Occasionally" },
      { value: "no", label: "No" },
    ],
  },
  {
    key: "elderly",
    label: "Elderly care needed?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  {
    key: "driver",
    label: "Driver required?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
];

function scoreHelper(helper: Helper, a: QuizAnswers): number {
  let score = 0;
  const role = helper.role.toLowerCase();

  if (a.kids !== "" && a.kids !== "none" && role.includes("nann")) score += 5;
  if (a.pets !== "" && a.pets !== "none" && role.includes("pet")) score += 5;
  if (a.cooking === "yes" && role.includes("cook")) score += 5;
  if (a.cooking === "sometimes" && role.includes("cook")) score += 2;
  if (a.elderly === "yes" && role.includes("elder")) score += 6;
  if (a.home === "villa" && (role.includes("garden") || role.includes("handy"))) score += 3;
  if (a.home === "apartment" && (role.includes("clean") || role.includes("laundry"))) score += 2;
  if (a.familySize === "5+" && (role.includes("clean") || role.includes("cook"))) score += 2;
  if (a.schedule === "full" && helper.availability.some((d) => /Mon\s*[–-]\s*Fri/i.test(d.day))) score += 1;

  if (a.budget === "low" && helper.rateMax <= 26) score += 3;
  else if (a.budget === "mid" && helper.rateMin >= 22 && helper.rateMax <= 35) score += 3;
  else if (a.budget === "high" && helper.rateMax >= 32) score += 3;
  else if (a.budget !== "") score -= 1;

  if (a.language && a.language !== "any") {
    if (helper.languages.includes(a.language)) score += 3;
  }

  if (a.driver === "yes") {
    const drives = /transport|errand|grocery|drive/i.test(
      [...helper.services, ...helper.responsibilities].join(" "),
    );
    if (drives) score += 3;
  }

  return score;
}

function MatchingSection() {
  const [answers, setAnswers] = useState<QuizAnswers>(initialAnswers);
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = quizQuestions.every((q) => answers[q.key] !== "");

  const matches = submitted
    ? [...helpers]
        .map((h) => ({ helper: h, score: scoreHelper(h, answers) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
    : [];

  const reset = () => {
    setAnswers(initialAnswers);
    setSubmitted(false);
  };

  return (
    <section id="match" className="bg-cream px-6 py-24 md:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-terracotta">
            AI Helper Matching
          </p>
          <h2
            className="text-6xl leading-[0.9] tracking-tight text-charcoal md:text-7xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            FIND YOUR
            <br />
            PERFECT MATCH.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Answer 10 quick questions and we'll match you with the helpers who fit
            your household best.
          </p>
        </div>

        {!submitted ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (allAnswered) setSubmitted(true);
            }}
            className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-10"
          >
            <div className="grid gap-8 md:grid-cols-2">
              {quizQuestions.map((q) => (
                <fieldset key={q.key} className="space-y-3">
                  <legend className="text-sm font-bold uppercase tracking-widest text-charcoal">
                    {q.label}
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {q.options.map((opt) => {
                      const selected = answers[q.key] === opt.value;
                      return (
                        <button
                          type="button"
                          key={opt.value}
                          onClick={() =>
                            setAnswers((prev) => ({ ...prev, [q.key]: opt.value }))
                          }
                          className={`rounded-full border px-4 py-2 text-sm transition ${
                            selected
                              ? "border-sage bg-sage text-white"
                              : "border-charcoal/15 bg-background text-charcoal hover:border-sage/60"
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-muted-foreground">
                {Object.values(answers).filter(Boolean).length} of {quizQuestions.length} answered
              </p>
              <button
                type="submit"
                disabled={!allAnswered}
                className="rounded-lg bg-sage px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-primary disabled:cursor-not-allowed disabled:opacity-40"
              >
                See my matches →
              </button>
            </div>
          </form>
        ) : (
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-10">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <h3
                className="text-4xl tracking-tight text-charcoal"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Your top matches
              </h3>
              <button
                type="button"
                onClick={reset}
                className="rounded-lg border border-charcoal/20 px-4 py-2 text-xs font-bold uppercase tracking-widest text-charcoal transition hover:bg-charcoal/5"
              >
                Retake quiz
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {matches.map(({ helper, score }, i) => (
                <Link
                  key={helper.id}
                  to="/helpers/$helperId"
                  params={{ helperId: helper.id }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-background transition hover:border-sage/50 hover:shadow-lg"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={helper.image}
                      alt={`${helper.name}, ${helper.role}`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-sage px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                      #{i + 1} match
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p
                      className="text-2xl tracking-tight text-charcoal"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {helper.name}
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-widest text-terracotta">
                      {helper.role}
                    </p>
                    <p className="mt-3 text-sm text-muted-foreground">
                      ${helper.rateMin}–${helper.rateMax}/hr · {helper.languages.join(", ")}
                    </p>
                    <p className="mt-3 text-xs text-sage">
                      Compatibility score: {score}
                    </p>
                    <span className="mt-auto pt-4 text-xs font-bold uppercase tracking-widest text-sage">
                      View profile →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
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
  const linkRef = useRef<HTMLAnchorElement>(null);

  const triggerGlow = () => {
    const el = linkRef.current;
    if (!el) return;
    el.classList.remove("animate-green-glow");
    void el.offsetWidth;
    el.classList.add("animate-green-glow");
    setTimeout(() => el.classList.remove("animate-green-glow"), 600);
  };

  return (
    <Link
      ref={linkRef}
      to="/helpers/$helperId"
      params={{ helperId: helper.id }}
      onPointerDown={triggerGlow}
      className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-md transition hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2"
    >


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
        <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-charcoal opacity-0 transition group-hover:opacity-100">
          View profile →
        </span>
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
            {helper.skills.slice(0, 4).map((s) => (
              <span
                key={s}
                className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-charcoal/80"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <span className="mt-5 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-terracotta">
          View full profile <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
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
  {
    id: "t5",
    name: "Rachel M.",
    location: "Chicago, IL",
    helper: "Luis — Handyman",
    rating: 5,
    review:
      "Luis fixed our leaky faucet and assembled a bookshelf in one visit. He was polite, fast, and cleaned up after himself. Highly recommend!",
  },
  {
    id: "t6",
    name: "Brian S.",
    location: "San Diego, CA",
    helper: "Aisha — Laundry & Ironing",
    rating: 5,
    review:
      "Aisha makes our laundry feel like a luxury service. Everything is folded perfectly, and my shirts come back crisp and ready to wear.",
  },
  {
    id: "t7",
    name: "Linda P.",
    location: "Portland, OR",
    helper: "Ryan — Pet Care Helper",
    rating: 5,
    review:
      "Ryan is amazing with our golden retriever. He sends photos from every walk and always follows our feeding schedule. Our dog loves him!",
  },
  {
    id: "t8",
    name: "The Garcia Family",
    location: "Miami, FL",
    helper: "Sofia — Elder Care Companion",
    rating: 5,
    review:
      "Sofia has brought so much comfort to our mother. She is gentle, attentive, and keeps us updated. We finally have peace of mind.",
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

            <MembershipForm />
          </div>
        </div>
      </div>
    </section>
  );
}

const serviceAreas = [
  "Downtown",
  "North Side",
  "South Side",
  "East End",
  "West End",
  "Suburbs",
];

function MembershipForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [area, setArea] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName || trimmedName.length > 100) {
      setError("Please enter a valid name (1-100 characters).");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail) || trimmedEmail.length > 255) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!area) {
      setError("Please select your preferred service area.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mt-8 rounded-xl bg-white/15 p-6 text-center">
        <p className="text-2xl" style={{ fontFamily: "var(--font-display)" }}>
          WELCOME TO THE CLUB, {name.trim().toUpperCase()}!
        </p>
        <p className="mt-2 text-sm text-white/80">
          Your 15% discount is now active. We'll email {email.trim()} with next steps for {area}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-3">
      <div>
        <label htmlFor="member-name" className="mb-1 block text-xs font-bold uppercase tracking-widest text-white/70">
          Full Name
        </label>
        <input
          id="member-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={100}
          required
          placeholder="Jane Doe"
          className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 outline-none transition focus:border-terracotta focus:bg-white/20"
        />
      </div>
      <div>
        <label htmlFor="member-email" className="mb-1 block text-xs font-bold uppercase tracking-widest text-white/70">
          Email
        </label>
        <input
          id="member-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          maxLength={255}
          required
          placeholder="jane@example.com"
          className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 outline-none transition focus:border-terracotta focus:bg-white/20"
        />
      </div>
      <div>
        <label htmlFor="member-area" className="mb-1 block text-xs font-bold uppercase tracking-widest text-white/70">
          Preferred Service Area
        </label>
        <select
          id="member-area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          required
          className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-terracotta focus:bg-white/20"
        >
          <option value="" className="text-charcoal">Select an area…</option>
          {serviceAreas.map((a) => (
            <option key={a} value={a} className="text-charcoal">
              {a}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p className="text-sm text-terracotta" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="mt-2 w-full rounded-xl bg-white py-4 text-center text-sm font-bold uppercase tracking-widest text-sage transition hover:bg-cream"
      >
        Become a Member
      </button>
      <p className="text-center text-xs text-white/60">
        No fees. Cancel anytime. Open to all returning customers.
      </p>
    </form>
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
