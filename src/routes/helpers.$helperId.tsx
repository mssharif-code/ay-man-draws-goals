import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { helpers, getHelperById, type Helper } from "@/data/helpers";

export const Route = createFileRoute("/helpers/$helperId")({
  loader: ({ params }) => {
    const helper = getHelperById(params.helperId);
    if (!helper) throw notFound();
    return { helper };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Helper not found" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { helper } = loaderData;
    const title = `${helper.name} — ${helper.role} | Household Helpers`;
    const description = `${helper.name} is a ${helper.role.toLowerCase()} with ${helper.experienceYears}+ years of experience. View services, availability, and rates.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: HelperDetail,
  notFoundComponent: HelperNotFound,
  errorComponent: HelperError,
});

function HelperNotFound() {
  return (
    <div className="min-h-screen bg-background px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-terracotta">
          404
        </p>
        <h1
          className="mb-6 text-5xl tracking-tight text-charcoal"
          style={{ fontFamily: "var(--font-display)" }}
        >
          HELPER NOT FOUND.
        </h1>
        <Link
          to="/"
          hash="helpers"
          className="inline-block rounded-full bg-charcoal px-6 py-3 text-xs font-bold uppercase tracking-widest text-white"
        >
          Back to helpers
        </Link>
      </div>
    </div>
  );
}

function HelperError({ error }: { error: Error }) {
  return (
    <div className="min-h-screen bg-background px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="mb-4 text-3xl text-charcoal">Something went wrong</h1>
        <p className="text-muted-foreground">{error.message}</p>
      </div>
    </div>
  );
}

function HelperDetail() {
  const { helper } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="border-b border-charcoal/10 px-6 py-5 md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            to="/"
            className="text-xl tracking-tight text-charcoal"
            style={{ fontFamily: "var(--font-display)" }}
          >
            HOUSEHOLD HELPERS
          </Link>
          <Link
            to="/"
            hash="helpers"
            className="text-xs font-bold uppercase tracking-widest text-charcoal/70 hover:text-charcoal"
          >
            ← All helpers
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-3xl">
            <img
              src={helper.image}
              alt={`${helper.name}, ${helper.role}`}
              className="h-full w-full object-cover"
              width={1024}
              height={1024}
            />
          </div>
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-terracotta">
              {helper.role}
            </p>
            <h1
              className="mb-6 text-7xl leading-[0.9] tracking-tight text-charcoal md:text-8xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {helper.name.toUpperCase()}.
            </h1>
            <p className="mb-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
              {helper.bio}
            </p>

            <div className="mb-8 grid grid-cols-3 gap-4">
              <Stat label="Experience" value={`${helper.experienceYears}+ yrs`} />
              <Stat label="Rate / hr" value={`$${helper.rateMin}–${helper.rateMax}`} />
              <Stat label="Languages" value={String(helper.languages.length)} />
            </div>

            <Link
              to="/"
              hash="contact"
              className="inline-block rounded-full bg-terracotta px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-terracotta/90"
            >
              Request {helper.name}
            </Link>
          </div>
        </div>
      </section>

      {/* Services + Availability */}
      <section className="bg-cream px-6 py-20 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-sage">
              Services offered
            </p>
            <h2
              className="mb-8 text-5xl tracking-tight text-charcoal"
              style={{ fontFamily: "var(--font-display)" }}
            >
              WHAT {helper.name.toUpperCase()} DOES.
            </h2>
            <ul className="space-y-4">
              {helper.services.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm"
                >
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-terracotta" />
                  <span className="text-charcoal">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-sage">
              Weekly availability
            </p>
            <h2
              className="mb-8 text-5xl tracking-tight text-charcoal"
              style={{ fontFamily: "var(--font-display)" }}
            >
              WHEN TO BOOK.
            </h2>
            <div className="overflow-hidden rounded-xl bg-white shadow-sm">
              {helper.availability.map((slot, i) => (
                <div
                  key={slot.day}
                  className={`flex items-center justify-between px-5 py-4 ${
                    i !== helper.availability.length - 1
                      ? "border-b border-charcoal/10"
                      : ""
                  }`}
                >
                  <span className="text-xs font-bold uppercase tracking-widest text-charcoal/70">
                    {slot.day}
                  </span>
                  <span className="text-charcoal">{slot.hours}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Languages spoken
              </p>
              <div className="flex flex-wrap gap-2">
                {helper.languages.map((l) => (
                  <span
                    key={l}
                    className="rounded-full bg-sage/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sage"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience details */}
      <section className="px-6 py-20 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-terracotta">
              Typical responsibilities
            </p>
            <h3
              className="mb-6 text-4xl tracking-tight text-charcoal"
              style={{ fontFamily: "var(--font-display)" }}
            >
              ON THE JOB.
            </h3>
            <ul className="space-y-3">
              {helper.responsibilities.map((r) => (
                <li key={r} className="flex items-start gap-2 text-charcoal">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-terracotta">
              Skills & strengths
            </p>
            <h3
              className="mb-6 text-4xl tracking-tight text-charcoal"
              style={{ fontFamily: "var(--font-display)" }}
            >
              WHY CLIENTS TRUST {helper.name.toUpperCase()}.
            </h3>
            <div className="flex flex-wrap gap-2">
              {helper.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-muted px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-charcoal/80"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Other helpers */}
      <section className="bg-charcoal px-6 py-20 text-white md:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-white/60">
            Also available
          </p>
          <h3
            className="mb-10 text-5xl tracking-tight md:text-6xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            MORE HELPERS.
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {helpers
              .filter((h) => h.id !== helper.id)
              .slice(0, 4)
              .map((h) => (
                <Link
                  key={h.id}
                  to="/helpers/$helperId"
                  params={{ helperId: h.id }}
                  className="group block overflow-hidden rounded-xl bg-white/5 transition hover:bg-white/10"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={h.image}
                      alt={h.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <p
                      className="text-2xl tracking-tight"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {h.name}
                    </p>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-white/60">
                      {h.role}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <p
        className="text-2xl tracking-tight text-charcoal"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {value}
      </p>
    </div>
  );
}
