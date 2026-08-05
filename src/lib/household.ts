import { useEffect, useState } from "react";

const EVENT = "helpers:household";

export type Chore = {
  id: string;
  title: string;
  area: string;
  day: string;
  done: boolean;
};

export type GroceryItem = { id: string; name: string; qty: string; bought: boolean };

export type Message = { id: string; helperId: string; from: "you" | "helper"; text: string; at: string };

export type Interview = {
  id: string;
  helperId: string;
  helperName: string;
  mode: "video" | "in-person";
  date: string;
  time: string;
  note: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
};

export type Agreement = {
  id: string;
  helperId: string;
  helperName: string;
  role: string;
  startDate: string;
  hoursPerWeek: number;
  monthlyPay: number;
  weeklyOff: string;
  signedBy: string;
  signedAt: string;
  helperSigned: boolean;
};

export type AppNotification = {
  id: string;
  title: string;
  body: string;
  at: string;
  read: boolean;
  audience?: "all" | "customers" | "helpers";
};

export type ActiveBooking = {
  id: string;
  helperId: string;
  helperName: string;
  helperRole: string;
  service: string;
  date: string;
  slot: string;
  hours: number;
  total: number;
  customerName: string;
  createdAt: string;
};

export type HelperAvailability = "Available" | "Busy" | "On Leave";

export type HelperVideo = {
  helperId: string;
  url: string;
  status: "pending" | "approved" | "rejected";
  updatedAt: string;
};

export type EmergencyReport = {
  id: string;
  from: "customer" | "helper";
  name: string;
  contact: string;
  message: string;
  at: string;
  resolved: boolean;
};

export type ChatReport = {
  id: string;
  helperId: string;
  helperName: string;
  reason: string;
  at: string;
  resolved: boolean;
};

type Store = {
  favorites: string[];
  chores: Chore[];
  groceries: GroceryItem[];
  messages: Message[];
  interviews: Interview[];
  agreements: Agreement[];
  notifications: AppNotification[];
  routine: string[];
  activeBooking: ActiveBooking | null;
  helperStatus: Record<string, HelperAvailability>;
  videos: Record<string, HelperVideo>;
  disabledHelpers: string[];
  emergencies: EmergencyReport[];
  chatReports: ChatReport[];
};

const KEY = "helpers.household";

const empty: Store = {
  favorites: [],
  chores: [],
  groceries: [],
  messages: [],
  interviews: [],
  agreements: [],
  notifications: [],
  routine: [],
  activeBooking: null,
  helperStatus: {},
  videos: {},
  disabledHelpers: [],
  emergencies: [],
  chatReports: [],
};

export function getStore(): Store {
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? { ...empty, ...(JSON.parse(raw) as Partial<Store>) } : empty;
  } catch {
    return empty;
  }
}

export function setStore(update: (s: Store) => Store) {
  if (typeof window === "undefined") return;
  const next = update(getStore());
  window.localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(EVENT));
}

export function useStore(): Store {
  const [value, setValue] = useState<Store>(empty);
  useEffect(() => {
    const sync = () => setValue(getStore());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    const tick = window.setInterval(sync, 15000);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
      window.clearInterval(tick);
    };
  }, []);
  return value;
}

const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export function notify(title: string, body: string, audience: AppNotification["audience"] = "all") {
  setStore((s) => ({
    ...s,
    notifications: [
      { id: uid(), title, body, at: new Date().toISOString(), read: false, audience },
      ...s.notifications,
    ].slice(0, 60),
  }));
}

export function toggleFavorite(helperId: string, helperName?: string) {
  const isFav = getStore().favorites.includes(helperId);
  setStore((s) => ({
    ...s,
    favorites: isFav ? s.favorites.filter((f) => f !== helperId) : [helperId, ...s.favorites],
  }));
  notify(
    isFav ? "Removed from favourites" : "Saved to favourites",
    `${helperName ?? "Helper"} was ${isFav ? "removed from" : "added to"} your saved helpers.`,
    "customers",
  );
}

export function addChores(items: Omit<Chore, "id" | "done">[]) {
  setStore((s) => ({
    ...s,
    chores: [...items.map((c) => ({ ...c, id: uid(), done: false })), ...s.chores],
  }));
}

export function toggleChore(id: string) {
  setStore((s) => ({
    ...s,
    chores: s.chores.map((c) => (c.id === id ? { ...c, done: !c.done } : c)),
  }));
}

export function clearChores() {
  setStore((s) => ({ ...s, chores: [] }));
}

export function setRoutine(routine: string[]) {
  setStore((s) => ({ ...s, routine }));
}

export function addGrocery(name: string, qty: string) {
  setStore((s) => ({ ...s, groceries: [{ id: uid(), name, qty, bought: false }, ...s.groceries] }));
}

export function toggleGrocery(id: string) {
  setStore((s) => ({
    ...s,
    groceries: s.groceries.map((g) => (g.id === id ? { ...g, bought: !g.bought } : g)),
  }));
}

export function removeGrocery(id: string) {
  setStore((s) => ({ ...s, groceries: s.groceries.filter((g) => g.id !== id) }));
}

export function sendMessage(helperId: string, text: string, from: "you" | "helper" = "you") {
  setStore((s) => ({
    ...s,
    messages: [...s.messages, { id: uid(), helperId, from, text, at: new Date().toISOString() }],
  }));
}

/* ---------------- Active booking + live tracking ---------------- */

export function startBooking(b: Omit<ActiveBooking, "id" | "createdAt">) {
  setStore((s) => ({
    ...s,
    activeBooking: { ...b, id: uid(), createdAt: new Date().toISOString() },
    helperStatus: { ...s.helperStatus, [b.helperId]: "Busy" },
  }));
  notify("Booking confirmed", `${b.helperName} is assigned for ${b.service} on ${b.date}.`, "all");
}

export function endBooking() {
  const b = getStore().activeBooking;
  setStore((s) => ({
    ...s,
    activeBooking: null,
    helperStatus: b ? { ...s.helperStatus, [b.helperId]: "Available" } : s.helperStatus,
  }));
  if (b) notify("Job completed", `${b.helperName} has finished the visit.`, "all");
}

export type TrackStage = {
  index: number;
  label: string;
  detail: string;
  etaMinutes: number;
  percent: number;
};

const STAGES = [
  { label: "Booking accepted", detail: "Helper confirmed your booking." },
  { label: "Getting ready", detail: "Helper is preparing and packing supplies." },
  { label: "On the way", detail: "Helper has left and is travelling to your address." },
  { label: "Nearby", detail: "Helper is in your neighbourhood." },
  { label: "Arrived", detail: "Helper has reached your home." },
];

/** Deterministic live-tracking state derived from how long ago the booking started. */
export function trackBooking(booking: ActiveBooking): TrackStage {
  const minutes = (Date.now() - new Date(booking.createdAt).getTime()) / 60000;
  const total = 20; // simulated 20 minute journey
  const idx = Math.min(STAGES.length - 1, Math.floor((minutes / total) * STAGES.length));
  const stage = STAGES[idx]!;
  return {
    index: idx,
    label: stage.label,
    detail: stage.detail,
    etaMinutes: Math.max(0, Math.round(total - minutes)),
    percent: Math.min(100, Math.round((minutes / total) * 100)),
  };
}

/* ---------------- Interviews ---------------- */

export function scheduleInterview(i: Omit<Interview, "id" | "createdAt" | "status">) {
  setStore((s) => ({
    ...s,
    interviews: [
      { ...i, id: uid(), status: "pending", createdAt: new Date().toISOString() },
      ...s.interviews,
    ],
  }));
  notify(
    "Interview requested",
    `${i.mode === "video" ? "Video" : "In-person"} interview with ${i.helperName} on ${i.date} at ${i.time}.`,
    "all",
  );
}

export function respondInterview(id: string, status: "accepted" | "rejected") {
  const i = getStore().interviews.find((x) => x.id === id);
  setStore((s) => ({
    ...s,
    interviews: s.interviews.map((x) => (x.id === id ? { ...x, status } : x)),
  }));
  if (i) notify(`Interview ${status}`, `${i.helperName} ${status} the interview on ${i.date} at ${i.time}.`, "all");
}

/* ---------------- Agreements ---------------- */

export function signAgreement(a: Omit<Agreement, "id" | "signedAt" | "helperSigned">) {
  setStore((s) => ({
    ...s,
    agreements: [
      { ...a, id: uid(), signedAt: new Date().toISOString(), helperSigned: false },
      ...s.agreements,
    ],
  }));
  notify("Work agreement signed", `Digital agreement with ${a.helperName} is awaiting helper signature.`, "all");
}

export function helperSignAgreement(id: string) {
  const a = getStore().agreements.find((x) => x.id === id);
  setStore((s) => ({
    ...s,
    agreements: s.agreements.map((x) => (x.id === id ? { ...x, helperSigned: true } : x)),
  }));
  if (a) notify("Agreement countersigned", `${a.helperName} signed the work agreement.`, "all");
}

export function agreementText(a: Agreement) {
  return [
    "HOUSEHOLD WORK AGREEMENT",
    "",
    `Helper: ${a.helperName} (${a.role})`,
    `Employer: ${a.signedBy}`,
    `Start date: ${a.startDate}`,
    `Hours per week: ${a.hoursPerWeek}`,
    `Monthly pay: INR ${a.monthlyPay}`,
    `Weekly off: ${a.weeklyOff}`,
    `Notice period: 15 days. Paid festival leave as per local labour norms.`,
    "",
    `Signed by employer on ${new Date(a.signedAt).toLocaleString("en-IN")}`,
    `Helper signature: ${a.helperSigned ? "Signed" : "Pending"}`,
  ].join("\n");
}

/* ---------------- Availability / videos / moderation ---------------- */

export function setHelperStatus(helperId: string, status: HelperAvailability) {
  setStore((s) => ({ ...s, helperStatus: { ...s.helperStatus, [helperId]: status } }));
}

export function submitVideo(helperId: string, url: string) {
  setStore((s) => ({
    ...s,
    videos: {
      ...s.videos,
      [helperId]: { helperId, url, status: "pending", updatedAt: new Date().toISOString() },
    },
  }));
  notify("Video submitted", "Your introduction video is pending admin approval.", "helpers");
}

export function reviewVideo(helperId: string, status: "approved" | "rejected") {
  setStore((s) => {
    const v = s.videos[helperId];
    if (!v) return s;
    return { ...s, videos: { ...s.videos, [helperId]: { ...v, status, updatedAt: new Date().toISOString() } } };
  });
  notify(`Video ${status}`, `An introduction video was ${status} by the admin.`, "all");
}

export function removeVideo(helperId: string) {
  setStore((s) => {
    const next = { ...s.videos };
    delete next[helperId];
    return { ...s, videos: next };
  });
  notify("Video removed", "An introduction video was removed for inappropriate content.", "all");
}

export function toggleHelperDisabled(helperId: string) {
  setStore((s) => ({
    ...s,
    disabledHelpers: s.disabledHelpers.includes(helperId)
      ? s.disabledHelpers.filter((h) => h !== helperId)
      : [helperId, ...s.disabledHelpers],
  }));
}

export function reportEmergency(r: Omit<EmergencyReport, "id" | "at" | "resolved">) {
  setStore((s) => ({
    ...s,
    emergencies: [{ ...r, id: uid(), at: new Date().toISOString(), resolved: false }, ...s.emergencies],
  }));
  notify("🛡️ Emergency reported", `${r.name}: ${r.message}`, "all");
}

export function resolveEmergency(id: string) {
  setStore((s) => ({
    ...s,
    emergencies: s.emergencies.map((e) => (e.id === id ? { ...e, resolved: true } : e)),
  }));
}

export function reportChat(helperId: string, helperName: string, reason: string) {
  setStore((s) => ({
    ...s,
    chatReports: [
      { id: uid(), helperId, helperName, reason, at: new Date().toISOString(), resolved: false },
      ...s.chatReports,
    ],
  }));
  notify("Chat reported", `A conversation with ${helperName} was reported for review.`, "all");
}

export function resolveChatReport(id: string) {
  setStore((s) => ({
    ...s,
    chatReports: s.chatReports.map((c) => (c.id === id ? { ...c, resolved: true } : c)),
  }));
}

export function markAllRead() {
  setStore((s) => ({ ...s, notifications: s.notifications.map((n) => ({ ...n, read: true })) }));
}

/** Live availability: manual status wins, otherwise a deterministic pseudo-live value. */
export function liveStatus(helperId: string): { label: string; tone: "on" | "busy" | "off" } {
  const store = getStore();
  if (store.disabledHelpers.includes(helperId)) return { label: "Disabled", tone: "off" };
  const manual = store.helperStatus[helperId];
  if (manual) {
    return {
      label: manual,
      tone: manual === "Available" ? "on" : manual === "Busy" ? "busy" : "off",
    };
  }
  let h = 0;
  for (const ch of helperId) h = (h * 31 + ch.charCodeAt(0)) % 997;
  const hour = new Date().getHours();
  const slot = (h + hour) % 3;
  if (hour < 7 || hour >= 21) return { label: "Off duty", tone: "off" };
  if (slot === 0) return { label: "Available now", tone: "on" };
  if (slot === 1) return { label: "On a job", tone: "busy" };
  return { label: "Free in 2 hrs", tone: "off" };
}
