import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase, type Booking } from "@/lib/supabase";
import { useRole } from "@/lib/role-context";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/admin")({
  beforeLoad: () => {
    const stored = localStorage.getItem("hh-role");
    if (stored !== "admin") {
      throw redirect({ to: "/" });
    }
  },
  component: AdminDashboard,
});

function AdminDashboard() {
  const { role } = useRole();
  const { session } = useAuth();

  if (role !== "admin") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-6">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-terracotta">
            Access denied
          </p>
          <h1
            className="mt-3 text-3xl tracking-tight text-charcoal"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Admins only.
          </h1>
          <p className="mt-3 text-charcoal/60">
            Switch to Super Admin using the toggle above to view the dashboard.
          </p>
        </div>
      </div>
    );
  }

  if (!session) {
    return <SignInScreen />;
  }

  return <DashboardContent />;
}

function SignInScreen() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const fn = mode === "signin" ? signIn : signUp;
    const { error } = await fn(email, password);
    if (error) setError(error);
    setBusy(false);
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-sage">
            Super Admin
          </p>
          <h1
            className="text-4xl tracking-tight text-charcoal"
            style={{ fontFamily: "var(--font-display)" }}
          >
            SIGN IN.
          </h1>
          <p className="mt-3 text-charcoal/60">
            You must be signed in to access the AI helper feature.
          </p>
        </div>
        <form
          onSubmit={submit}
          className="space-y-4 rounded-2xl border border-border bg-white p-8 shadow-sm"
        >
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-charcoal">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-charcoal focus:border-sage focus:outline-none"
              placeholder="admin@helpers.in"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-charcoal">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-charcoal focus:border-sage focus:outline-none"
              placeholder="********"
            />
          </div>
          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-lg bg-sage px-4 py-3 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-primary disabled:opacity-50"
          >
            {busy ? "Please wait..." : mode === "signin" ? "Sign in" : "Create account"}
          </button>
          <button
            type="button"
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setError(null);
            }}
            className="w-full text-center text-xs text-charcoal/60 hover:text-charcoal"
          >
            {mode === "signin"
              ? "Need an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

function DashboardContent() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("bookings")
      .select(
        "id, customer_name, helper_name, helper_role, service, hours, total, created_at, user_id",
      )
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    else setBookings(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const stats = useMemo(() => {
    const totalBookings = bookings.length;
    const totalSales = bookings.reduce((sum, r) => sum + r.total, 0);
    const totalHours = bookings.reduce((sum, r) => sum + r.hours, 0);

    const byHelper = new Map<
      string,
      { name: string; role: string; count: number; revenue: number }
    >();
    for (const r of bookings) {
      const entry =
        byHelper.get(r.helper_name) ?? {
          name: r.helper_name,
          role: r.helper_role,
          count: 0,
          revenue: 0,
        };
      entry.count += 1;
      entry.revenue += r.total;
      byHelper.set(r.helper_name, entry);
    }
    const topHelpers = [...byHelper.values()].sort((a, b) => b.count - a.count);

    const byRole = new Map<string, number>();
    for (const r of bookings) {
      byRole.set(r.helper_role, (byRole.get(r.helper_role) ?? 0) + 1);
    }
    const roleBreakdown = [...byRole.entries()].sort((a, b) => b[1] - a[1]);

    return { totalBookings, totalSales, totalHours, topHelpers, roleBreakdown };
  }, [bookings]);

  const maxCount = stats.topHelpers[0]?.count ?? 1;
  const maxRole = stats.roleBreakdown[0]?.[1] ?? 1;

  const askAi = async () => {
    setAiLoading(true);
    setAiError(null);
    setAiAnswer(null);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content:
                "Which helper was used last? Look at the most recent booking data and tell me the helper's name, role, the customer who booked them, and when the booking was made.",
            },
          ],
        }),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || `Request failed (${res.status})`);
      }
      const data = (await res.json()) as { reply?: string; error?: string };
      if (data.error) throw new Error(data.error);
      setAiAnswer(data.reply ?? "No response from AI.");
    } catch (err) {
      setAiError(
        err instanceof Error ? err.message : "Failed to get AI response.",
      );
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-sage px-6 py-16 text-white md:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-white/70">
            Super Admin
          </p>
          <h1
            className="text-5xl leading-[0.9] tracking-tight md:text-6xl lg:text-7xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            COMPANY
            <br />
            DASHBOARD.
          </h1>
          <p className="mt-5 max-w-md text-white/80">
            Live overview of sales, bookings, and helper performance across the platform.
          </p>
        </div>
      </section>

      {/* AI Feature: Which helper was used last */}
      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-terracotta">
            AI Insight
          </p>
          <h2
            className="mb-3 text-4xl tracking-tight text-charcoal md:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            WHICH HELPER WAS USED LAST?
          </h2>
          <p className="mb-8 max-w-2xl text-charcoal/60">
            Ask the built-in AI connector to analyze your latest booking data and
            tell you which helper was most recently booked.
          </p>
          <button
            onClick={askAi}
            disabled={aiLoading}
            className="rounded-lg bg-terracotta px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition hover:brightness-90 disabled:opacity-50"
          >
            {aiLoading ? "Asking AI..." : "Ask AI which helper was used last"}
          </button>

          {aiError && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
              {aiError}
            </div>
          )}

          {aiLoading && (
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-border bg-cream p-6">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-sage border-t-transparent" />
              <span className="text-sm text-charcoal/60">
                The AI connector is analyzing your bookings...
              </span>
            </div>
          )}

          {aiAnswer && !aiLoading && (
            <div className="mt-6 rounded-2xl border border-sage/30 bg-cream p-6">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sage text-white text-sm font-bold">
                  AI
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-sage">
                  AI Connector Response
                </span>
              </div>
              <p className="text-sm leading-relaxed text-charcoal whitespace-pre-wrap">
                {aiAnswer}
              </p>
            </div>
          )}
        </div>
      </section>

      {loading ? (
        <section className="px-6 py-20 md:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-border bg-cream p-8 text-center text-charcoal/60">
              Loading dashboard...
            </div>
          </div>
        </section>
      ) : error ? (
        <section className="px-6 py-20 md:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-700">
              Could not load data: {error}
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className="px-6 py-16 md:px-10">
            <div className="mx-auto max-w-7xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-sage">
                At a glance
              </p>
              <h2
                className="mb-10 text-4xl tracking-tight text-charcoal md:text-5xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                KEY NUMBERS.
              </h2>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <StatCard label="Total sales" value={`₹${stats.totalSales.toLocaleString("en-IN")}`} />
                <StatCard label="Total bookings" value={String(stats.totalBookings)} />
                <StatCard label="Hours booked" value={String(stats.totalHours)} />
                <StatCard label="Active helpers" value={String(stats.topHelpers.length)} />
              </div>
            </div>
          </section>

          <section className="bg-cream px-6 py-16 md:px-10">
            <div className="mx-auto max-w-7xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-terracotta">
                Helper performance
              </p>
              <h2
                className="mb-3 text-4xl tracking-tight text-charcoal md:text-5xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                MOST USED HELPERS.
              </h2>
              <p className="mb-10 text-charcoal/60">
                Ranked by number of bookings, with total revenue per helper.
              </p>
              {stats.topHelpers.length === 0 ? (
                <div className="rounded-2xl border border-border bg-white p-8 text-center text-charcoal/60">
                  No bookings yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {stats.topHelpers.map((h) => (
                    <div
                      key={h.name}
                      className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5"
                    >
                      <div className="flex w-32 flex-col gap-0.5 md:w-48">
                        <span className="text-sm font-bold text-charcoal">{h.name}</span>
                        <span className="text-xs text-charcoal/50">
                          {h.role} · ₹{h.revenue.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="h-3 flex-1 overflow-hidden rounded-full bg-cream">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-sage to-primary transition-all duration-500"
                          style={{ width: `${(h.count / maxCount) * 100}%` }}
                        />
                      </div>
                      <span className="w-8 text-right text-sm font-bold text-sage">
                        {h.count}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="px-6 py-16 md:px-10">
            <div className="mx-auto max-w-7xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-sage">
                By role
              </p>
              <h2
                className="mb-10 text-4xl tracking-tight text-charcoal md:text-5xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                BOOKINGS BY ROLE.
              </h2>
              {stats.roleBreakdown.length === 0 ? (
                <div className="rounded-2xl border border-border bg-cream p-8 text-center text-charcoal/60">
                  No data yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {stats.roleBreakdown.map(([role, count]) => (
                    <div
                      key={role}
                      className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5"
                    >
                      <div className="flex w-32 flex-col md:w-48">
                        <span className="text-sm font-bold text-charcoal">{role}</span>
                      </div>
                      <div className="h-3 flex-1 overflow-hidden rounded-full bg-cream">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-terracotta to-sage transition-all duration-500"
                          style={{ width: `${(count / maxRole) * 100}%` }}
                        />
                      </div>
                      <span className="w-8 text-right text-sm font-bold text-terracotta">
                        {count}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="bg-cream px-6 py-16 md:px-10">
            <div className="mx-auto max-w-7xl">
              <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-terracotta">
                    All bookings
                  </p>
                  <h2
                    className="text-4xl tracking-tight text-charcoal md:text-5xl"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    RECENT BOOKINGS.
                  </h2>
                </div>
                <button
                  onClick={load}
                  className="rounded-lg border border-border bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-charcoal transition hover:bg-cream"
                >
                  Refresh data
                </button>
              </div>
              {bookings.length === 0 ? (
                <div className="rounded-2xl border border-border bg-white p-8 text-center text-charcoal/60">
                  No bookings yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {bookings.map((b) => (
                    <div
                      key={b.id}
                      className="flex flex-col gap-1 rounded-2xl border border-border bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="text-base font-semibold text-charcoal">
                          {b.customer_name}
                        </p>
                        <p className="text-sm text-charcoal/70">
                          Booked {b.helper_name} · {b.helper_role}
                        </p>
                        <p className="text-xs text-charcoal/50">
                          {b.service} · {b.hours}h · ₹{b.total.toLocaleString("en-IN")}
                        </p>
                      </div>
                      <div className="text-left text-xs text-charcoal/50 sm:text-right">
                        {new Date(b.created_at).toLocaleString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
      <p className="text-[10px] font-bold uppercase tracking-widest text-charcoal/50">
        {label}
      </p>
      <p
        className="mt-2 text-3xl tracking-tight text-sage"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {value}
      </p>
    </div>
  );
}
