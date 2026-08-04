import { useMemo, useState } from "react";
import {
  addChores,
  addGrocery,
  clearChores,
  notify,
  removeGrocery,
  setRoutine,
  toggleChore,
  toggleGrocery,
  useStore,
} from "@/lib/household";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const fallbackPlan = (size: string) => [
  { day: "Monday", area: "Kitchen", title: `Deep clean counters, chimney filter and sink (${size} home)` },
  { day: "Monday", area: "Laundry", title: "Wash and line-dry the week's whites" },
  { day: "Tuesday", area: "Bedrooms", title: "Change bedsheets and pillow covers" },
  { day: "Wednesday", area: "Bathrooms", title: "Scrub tiles, taps and mirrors" },
  { day: "Thursday", area: "Living room", title: "Dust shelves, fans and sofa vacuum" },
  { day: "Friday", area: "Kitchen", title: "Fridge clean-out and pantry restock check" },
  { day: "Saturday", area: "Balcony", title: "Water plants, sweep balcony and mop" },
  { day: "Sunday", area: "Family", title: "Plan next week's menu with the cook" },
];

const fallbackRoutine = [
  "Mon — Kitchen reset + laundry load",
  "Tue — Bedrooms and linen change",
  "Wed — Bathrooms deep clean",
  "Thu — Living areas dusting and vacuum",
  "Fri — Fridge, pantry and grocery list",
  "Sat — Balcony, plants and floors",
  "Sun — Rest day, menu planning only",
];

export function AiAssistantSection() {
  const store = useStore();
  const [size, setSize] = useState("3 BHK, 4 members");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [groceryName, setGroceryName] = useState("");
  const [groceryQty, setGroceryQty] = useState("");

  const done = store.chores.filter((c) => c.done).length;
  const pct = store.chores.length ? Math.round((done / store.chores.length) * 100) : 0;

  const reminders = useMemo(() => {
    const today = DAYS[(new Date().getDay() + 6) % 7];
    const todays = store.chores.filter((c) => c.day === today && !c.done);
    const list = todays.slice(0, 3).map((c) => `Today: ${c.title} (${c.area})`);
    const pending = store.groceries.filter((g) => !g.bought).length;
    if (pending) list.push(`${pending} grocery item${pending > 1 ? "s" : ""} still to buy`);
    if (!list.length) list.push("Nothing pending right now — you're all caught up.");
    return list;
  }, [store.chores, store.groceries]);

  const generate = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: `Create a weekly household cleaning and chore plan for an Indian family home: ${size}. Reply with 8 to 12 lines ONLY, each formatted exactly as: Day | Area | Task. No extra text.`,
            },
          ],
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = (await res.json()) as { reply?: string };
      const rows = (data.reply ?? "")
        .split("\n")
        .map((l) => l.replace(/^[-*\d.\s]+/, "").split("|").map((p) => p.trim()))
        .filter((p) => p.length >= 3 && DAYS.some((d) => p[0].toLowerCase().startsWith(d.slice(0, 3).toLowerCase())))
        .map((p) => ({
          day: DAYS.find((d) => d.toLowerCase().startsWith(p[0].slice(0, 3).toLowerCase())) ?? "Monday",
          area: p[1],
          title: p.slice(2).join(" - "),
        }));
      if (!rows.length) throw new Error("Could not read the plan");
      clearChores();
      addChores(rows);
      setRoutine(
        DAYS.map((d) => {
          const items = rows.filter((r) => r.day === d).map((r) => r.area);
          return `${d.slice(0, 3)} — ${items.length ? Array.from(new Set(items)).join(", ") : "Rest day"}`;
        }),
      );
      notify("Weekly plan ready", `AI created ${rows.length} tasks for your ${size}.`);
    } catch {
      clearChores();
      addChores(fallbackPlan(size));
      setRoutine(fallbackRoutine);
      setError("AI is unavailable right now — loaded a standard plan instead.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="assistant" className="bg-cream px-6 py-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-sage">
          🏆 AI Household Assistant
        </p>
        <h2
          className="mb-4 text-5xl leading-[0.9] tracking-tight text-charcoal md:text-7xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          AFTER HIRING,
          <br />
          IT KEEPS HELPING.
        </h2>
        <p className="mb-10 max-w-xl text-muted-foreground">
          Daily task lists, cleaning schedules, reminders, chore tracking, groceries and a
          full weekly routine — generated for your home and shared with your helper.
        </p>

        <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-charcoal/10 bg-white p-5 sm:flex-row sm:items-end">
          <label className="flex-1">
            <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Your home
            </span>
            <input
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full rounded-lg border border-charcoal/15 px-4 py-3 text-charcoal outline-none focus:border-sage"
              placeholder="e.g. 2 BHK, 3 members, 1 toddler"
            />
          </label>
          <button
            onClick={generate}
            disabled={loading}
            className="rounded-full bg-sage px-7 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-primary disabled:opacity-60"
          >
            {loading ? "Planning…" : "Generate weekly plan"}
          </button>
        </div>
        {error && <p className="mb-6 text-sm text-terracotta">{error}</p>}

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Tasks + tracking */}
          <div className="rounded-2xl border border-charcoal/10 bg-white p-6 lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-charcoal">Daily task list & chore tracking</h3>
              {store.chores.length > 0 && (
                <button
                  onClick={clearChores}
                  className="text-[11px] font-bold uppercase tracking-widest text-charcoal/50 hover:text-terracotta"
                >
                  Clear
                </button>
              )}
            </div>
            {store.chores.length > 0 && (
              <div className="mb-5">
                <div className="h-2 w-full overflow-hidden rounded-full bg-charcoal/10">
                  <div className="h-full rounded-full bg-sage transition-all" style={{ width: `${pct}%` }} />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {done} of {store.chores.length} chores completed · {pct}%
                </p>
              </div>
            )}
            {store.chores.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No tasks yet. Generate a weekly plan to get started.
              </p>
            ) : (
              <ul className="space-y-2">
                {DAYS.filter((d) => store.chores.some((c) => c.day === d)).map((d) => (
                  <li key={d}>
                    <p className="mb-1 mt-3 text-[10px] font-bold uppercase tracking-widest text-sage">{d}</p>
                    <ul className="space-y-1.5">
                      {store.chores
                        .filter((c) => c.day === d)
                        .map((c) => (
                          <li key={c.id}>
                            <label className="flex cursor-pointer items-start gap-3 rounded-lg px-2 py-2 hover:bg-cream">
                              <input
                                type="checkbox"
                                checked={c.done}
                                onChange={() => toggleChore(c.id)}
                                className="mt-1 h-4 w-4 accent-[var(--color-sage,#6b8f71)]"
                              />
                              <span className={c.done ? "text-charcoal/40 line-through" : "text-charcoal"}>
                                {c.title}
                                <span className="ml-2 rounded-full bg-charcoal/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-charcoal/60">
                                  {c.area}
                                </span>
                              </span>
                            </label>
                          </li>
                        ))}
                    </ul>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="space-y-6">
            {/* Reminders */}
            <div className="rounded-2xl border border-charcoal/10 bg-white p-6">
              <h3 className="mb-3 text-xl font-semibold text-charcoal">🔔 Reminders</h3>
              <ul className="space-y-2 text-sm text-charcoal">
                {reminders.map((r) => (
                  <li key={r} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            {/* Routine */}
            <div className="rounded-2xl border border-charcoal/10 bg-white p-6">
              <h3 className="mb-3 text-xl font-semibold text-charcoal">Weekly routine</h3>
              <ul className="space-y-1.5 text-sm text-charcoal">
                {(store.routine.length ? store.routine : fallbackRoutine).map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Groceries */}
        <div className="mt-6 rounded-2xl border border-charcoal/10 bg-white p-6">
          <h3 className="mb-4 text-xl font-semibold text-charcoal">🛒 Grocery management</h3>
          <form
            className="mb-4 flex flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              if (!groceryName.trim()) return;
              addGrocery(groceryName.trim(), groceryQty.trim() || "1");
              setGroceryName("");
              setGroceryQty("");
            }}
          >
            <input
              value={groceryName}
              onChange={(e) => setGroceryName(e.target.value)}
              placeholder="Item (e.g. Toor dal)"
              className="flex-1 rounded-lg border border-charcoal/15 px-4 py-2.5 outline-none focus:border-sage"
            />
            <input
              value={groceryQty}
              onChange={(e) => setGroceryQty(e.target.value)}
              placeholder="Qty (e.g. 2 kg)"
              className="rounded-lg border border-charcoal/15 px-4 py-2.5 outline-none focus:border-sage sm:w-40"
            />
            <button className="rounded-full bg-charcoal px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white">
              Add
            </button>
          </form>
          {store.groceries.length === 0 ? (
            <p className="text-sm text-muted-foreground">Your grocery list is empty.</p>
          ) : (
            <ul className="grid gap-2 sm:grid-cols-2">
              {store.groceries.map((g) => (
                <li
                  key={g.id}
                  className="flex items-center justify-between gap-3 rounded-lg border border-charcoal/10 px-3 py-2"
                >
                  <label className="flex flex-1 cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={g.bought}
                      onChange={() => toggleGrocery(g.id)}
                      className="h-4 w-4"
                    />
                    <span className={g.bought ? "text-charcoal/40 line-through" : "text-charcoal"}>
                      {g.name} · {g.qty}
                    </span>
                  </label>
                  <button
                    onClick={() => removeGrocery(g.id)}
                    className="text-xs font-bold text-charcoal/40 hover:text-terracotta"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
