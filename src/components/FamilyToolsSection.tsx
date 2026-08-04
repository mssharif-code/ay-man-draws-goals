import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { helpers } from "@/data/helpers";
import {
  liveStatus,
  scheduleInterview,
  sendMessage,
  signAgreement,
  toggleFavorite,
  useStore,
} from "@/lib/household";

const VIDEO_SRC =
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";

export function StatusDot({ helperId }: { helperId: string }) {
  const s = liveStatus(helperId);
  const color = s.tone === "on" ? "bg-sage" : s.tone === "busy" ? "bg-amber-500" : "bg-charcoal/30";
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-charcoal/70">
      <span className={`h-2 w-2 rounded-full ${color}`} />
      {s.label}
    </span>
  );
}

export function FavoriteButton({ helperId, helperName }: { helperId: string; helperName: string }) {
  const { favorites } = useStore();
  const active = favorites.includes(helperId);
  return (
    <button
      type="button"
      aria-label={active ? "Remove from favourites" : "Save helper"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(helperId, helperName);
      }}
      className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-2.5 py-1.5 text-base leading-none shadow-sm transition hover:scale-110"
    >
      {active ? "❤️" : "🤍"}
    </button>
  );
}

export function FamilyToolsSection() {
  const store = useStore();
  const saved = helpers.filter((h) => store.favorites.includes(h.id));
  const [videoFor, setVideoFor] = useState<string | null>(null);

  return (
    <section id="tools" className="px-6 py-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-terracotta">
          Family tools
        </p>
        <h2
          className="mb-4 text-5xl leading-[0.9] tracking-tight text-charcoal md:text-7xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          EVERYTHING
          <br />
          IN ONE PLACE.
        </h2>
        <p className="mb-12 max-w-xl text-muted-foreground">
          Save helpers, watch their video intro, message them, check live availability,
          book an interview and sign a digital work agreement.
        </p>

        {/* Saved helpers */}
        <div className="mb-8 rounded-2xl border border-charcoal/10 bg-white p-6">
          <h3 className="mb-4 text-xl font-semibold text-charcoal">❤️ Saved helpers</h3>
          {saved.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Tap the heart on any helper card to save them here.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {saved.map((h) => (
                <div key={h.id} className="rounded-xl border border-charcoal/10 p-4">
                  <div className="mb-3 flex items-center gap-3">
                    <img src={h.image} alt={h.name} className="h-12 w-12 rounded-full object-cover" loading="lazy" />
                    <div>
                      <p className="font-semibold text-charcoal">{h.name}</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        {h.role}
                      </p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <StatusDot helperId={h.id} />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setVideoFor(h.id)}
                      className="rounded-full bg-charcoal px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white"
                    >
                      📹 Video
                    </button>
                    <Link
                      to="/helpers/$helperId"
                      params={{ helperId: h.id }}
                      className="rounded-full border border-charcoal/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-charcoal"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => toggleFavorite(h.id, h.name)}
                      className="rounded-full border border-charcoal/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-charcoal/60"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <LiveAvailability onWatch={setVideoFor} />
          <MessagingPanel />
          <InterviewPanel />
          <AgreementPanel />
        </div>
      </div>

      {videoFor && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/70 p-4"
          onClick={() => setVideoFor(null)}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-charcoal/10 px-5 py-3">
              <p className="font-semibold text-charcoal">
                📹 Video introduction — {helpers.find((h) => h.id === videoFor)?.name}
              </p>
              <button onClick={() => setVideoFor(null)} className="text-charcoal/50 hover:text-charcoal">
                ✕
              </button>
            </div>
            <video src={VIDEO_SRC} controls autoPlay className="aspect-video w-full bg-charcoal" />
            <p className="px-5 py-4 text-sm text-muted-foreground">
              {helpers.find((h) => h.id === videoFor)?.bio}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

function LiveAvailability({ onWatch }: { onWatch: (id: string) => void }) {
  const list = useMemo(() => helpers.slice(0, 8), []);
  return (
    <div className="rounded-2xl border border-charcoal/10 bg-white p-6">
      <h3 className="mb-4 text-xl font-semibold text-charcoal">📍 Live helper availability</h3>
      <ul className="divide-y divide-charcoal/10">
        {list.map((h) => (
          <li key={h.id} className="flex items-center justify-between gap-3 py-2.5">
            <div>
              <p className="text-charcoal">{h.name}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                {h.role} · {h.city}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <StatusDot helperId={h.id} />
              <button
                onClick={() => onWatch(h.id)}
                className="text-[10px] font-bold uppercase tracking-widest text-sage hover:underline"
              >
                📹
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MessagingPanel() {
  const store = useStore();
  const [helperId, setHelperId] = useState(helpers[0]?.id ?? "");
  const [text, setText] = useState("");
  const thread = store.messages.filter((m) => m.helperId === helperId);
  const helper = helpers.find((h) => h.id === helperId);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const t = text.trim();
    if (!t || !helper) return;
    sendMessage(helperId, t);
    setText("");
    setTimeout(() => {
      sendMessage(
        helperId,
        `Namaste! ${helper.name} here — got your message, I'll confirm shortly.`,
        "helper",
      );
    }, 900);
  };

  return (
    <div className="rounded-2xl border border-charcoal/10 bg-white p-6">
      <h3 className="mb-4 text-xl font-semibold text-charcoal">💬 In-app messaging</h3>
      <select
        value={helperId}
        onChange={(e) => setHelperId(e.target.value)}
        className="mb-4 w-full rounded-lg border border-charcoal/15 px-3 py-2.5 text-charcoal outline-none focus:border-sage"
      >
        {helpers.map((h) => (
          <option key={h.id} value={h.id}>
            {h.name} — {h.role}
          </option>
        ))}
      </select>
      <div className="mb-3 h-48 space-y-2 overflow-y-auto rounded-lg bg-cream p-3">
        {thread.length === 0 ? (
          <p className="text-sm text-muted-foreground">No messages yet. Say hello 👋</p>
        ) : (
          thread.map((m) => (
            <div
              key={m.id}
              className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                m.from === "you"
                  ? "ml-auto bg-sage text-white"
                  : "bg-white text-charcoal shadow-sm"
              }`}
            >
              {m.text}
            </div>
          ))
        )}
      </div>
      <form onSubmit={send} className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message…"
          className="flex-1 rounded-lg border border-charcoal/15 px-3 py-2.5 outline-none focus:border-sage"
        />
        <button className="rounded-full bg-charcoal px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white">
          Send
        </button>
      </form>
    </div>
  );
}

function InterviewPanel() {
  const store = useStore();
  const [helperId, setHelperId] = useState(helpers[0]?.id ?? "");
  const [mode, setMode] = useState<"video" | "in-person">("video");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const helper = helpers.find((h) => h.id === helperId);
    if (!helper || !date || !time) return;
    scheduleInterview({ helperId, helperName: helper.name, mode, date, time, note });
    setDate("");
    setTime("");
    setNote("");
  };

  return (
    <div className="rounded-2xl border border-charcoal/10 bg-white p-6">
      <h3 className="mb-4 text-xl font-semibold text-charcoal">📅 Interview scheduling</h3>
      <form onSubmit={submit} className="space-y-3">
        <select
          value={helperId}
          onChange={(e) => setHelperId(e.target.value)}
          className="w-full rounded-lg border border-charcoal/15 px-3 py-2.5 outline-none focus:border-sage"
        >
          {helpers.map((h) => (
            <option key={h.id} value={h.id}>
              {h.name} — {h.role}
            </option>
          ))}
        </select>
        <div className="flex gap-2">
          {(["video", "in-person"] as const).map((m) => (
            <button
              type="button"
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 rounded-full px-3 py-2 text-[11px] font-bold uppercase tracking-widest transition ${
                mode === m ? "bg-sage text-white" : "border border-charcoal/15 text-charcoal/60"
              }`}
            >
              {m === "video" ? "Video call" : "In person"}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="flex-1 rounded-lg border border-charcoal/15 px-3 py-2.5 outline-none focus:border-sage"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className="flex-1 rounded-lg border border-charcoal/15 px-3 py-2.5 outline-none focus:border-sage"
          />
        </div>
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="What would you like to discuss?"
          className="w-full rounded-lg border border-charcoal/15 px-3 py-2.5 outline-none focus:border-sage"
        />
        <button className="w-full rounded-full bg-sage px-5 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-primary">
          Schedule interview
        </button>
      </form>
      {store.interviews.length > 0 && (
        <ul className="mt-4 space-y-2 text-sm">
          {store.interviews.slice(0, 4).map((i) => (
            <li key={i.id} className="rounded-lg bg-cream px-3 py-2 text-charcoal">
              {i.helperName} · {i.mode === "video" ? "Video" : "In person"} · {i.date} at {i.time}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function AgreementPanel() {
  const store = useStore();
  const [helperId, setHelperId] = useState(helpers[0]?.id ?? "");
  const [startDate, setStartDate] = useState("");
  const [hours, setHours] = useState(20);
  const [pay, setPay] = useState(12000);
  const [off, setOff] = useState("Sunday");
  const [signedBy, setSignedBy] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const helper = helpers.find((h) => h.id === helperId);
    if (!helper || !startDate || !signedBy.trim()) return;
    signAgreement({
      helperId,
      helperName: helper.name,
      role: helper.role,
      startDate,
      hoursPerWeek: hours,
      monthlyPay: pay,
      weeklyOff: off,
      signedBy: signedBy.trim(),
    });
    setSignedBy("");
  };

  return (
    <div className="rounded-2xl border border-charcoal/10 bg-white p-6">
      <h3 className="mb-4 text-xl font-semibold text-charcoal">📄 Digital work agreement</h3>
      <form onSubmit={submit} className="space-y-3">
        <select
          value={helperId}
          onChange={(e) => setHelperId(e.target.value)}
          className="w-full rounded-lg border border-charcoal/15 px-3 py-2.5 outline-none focus:border-sage"
        >
          {helpers.map((h) => (
            <option key={h.id} value={h.id}>
              {h.name} — {h.role}
            </option>
          ))}
        </select>
        <div className="flex gap-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="flex-1 rounded-lg border border-charcoal/15 px-3 py-2.5 outline-none focus:border-sage"
          />
          <input
            type="number"
            min={1}
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="w-28 rounded-lg border border-charcoal/15 px-3 py-2.5 outline-none focus:border-sage"
            aria-label="Hours per week"
          />
        </div>
        <div className="flex gap-2">
          <input
            type="number"
            min={0}
            step={500}
            value={pay}
            onChange={(e) => setPay(Number(e.target.value))}
            className="flex-1 rounded-lg border border-charcoal/15 px-3 py-2.5 outline-none focus:border-sage"
            aria-label="Monthly pay in rupees"
          />
          <select
            value={off}
            onChange={(e) => setOff(e.target.value)}
            className="flex-1 rounded-lg border border-charcoal/15 px-3 py-2.5 outline-none focus:border-sage"
          >
            {["Sunday", "Saturday", "Monday", "Rotational"].map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>
        <input
          value={signedBy}
          onChange={(e) => setSignedBy(e.target.value)}
          placeholder="Type your full name to e-sign"
          className="w-full rounded-lg border border-charcoal/15 px-3 py-2.5 outline-none focus:border-sage"
        />
        <p className="text-xs text-muted-foreground">
          Covers duties, weekly off, monthly pay of ₹{pay.toLocaleString("en-IN")}, notice period of 15 days
          and paid festival leave, as per local labour norms.
        </p>
        <button className="w-full rounded-full bg-charcoal px-5 py-3 text-xs font-bold uppercase tracking-widest text-white">
          Sign agreement
        </button>
      </form>
      {store.agreements.length > 0 && (
        <ul className="mt-4 space-y-2 text-sm">
          {store.agreements.slice(0, 3).map((a) => (
            <li key={a.id} className="rounded-lg bg-cream px-3 py-2 text-charcoal">
              ✅ {a.helperName} ({a.role}) · from {a.startDate} · ₹{a.monthlyPay.toLocaleString("en-IN")}/month ·
              signed by {a.signedBy}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
