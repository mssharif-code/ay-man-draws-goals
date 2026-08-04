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
};

export type AppNotification = {
  id: string;
  title: string;
  body: string;
  at: string;
  read: boolean;
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
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return value;
}

const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export function notify(title: string, body: string) {
  setStore((s) => ({
    ...s,
    notifications: [{ id: uid(), title, body, at: new Date().toISOString(), read: false }, ...s.notifications].slice(0, 40),
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

export function scheduleInterview(i: Omit<Interview, "id" | "createdAt">) {
  setStore((s) => ({
    ...s,
    interviews: [{ ...i, id: uid(), createdAt: new Date().toISOString() }, ...s.interviews],
  }));
  notify("Interview scheduled", `${i.mode === "video" ? "Video" : "In-person"} interview with ${i.helperName} on ${i.date} at ${i.time}.`);
}

export function signAgreement(a: Omit<Agreement, "id" | "signedAt">) {
  setStore((s) => ({
    ...s,
    agreements: [{ ...a, id: uid(), signedAt: new Date().toISOString() }, ...s.agreements],
  }));
  notify("Work agreement signed", `Digital agreement with ${a.helperName} is now active.`);
}

export function markAllRead() {
  setStore((s) => ({ ...s, notifications: s.notifications.map((n) => ({ ...n, read: true })) }));
}

/** Deterministic pseudo-live availability for a helper. */
export function liveStatus(helperId: string): { label: string; tone: "on" | "busy" | "off" } {
  let h = 0;
  for (const ch of helperId) h = (h * 31 + ch.charCodeAt(0)) % 997;
  const hour = new Date().getHours();
  const slot = (h + hour) % 3;
  if (hour < 7 || hour >= 21) return { label: "Off duty", tone: "off" };
  if (slot === 0) return { label: "Available now", tone: "on" };
  if (slot === 1) return { label: "On a job", tone: "busy" };
  return { label: "Free in 2 hrs", tone: "off" };
}
