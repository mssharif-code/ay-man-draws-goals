import type { Helper } from "@/data/helpers";

export type AttendanceDay = {
  date: string; // YYYY-MM-DD
  present: boolean;
  arrival: string | null; // HH:MM
  departure: string | null;
  late: boolean;
  hours: number;
};

export type HelperAttendance = {
  helperId: string;
  name: string;
  role: string;
  month: string;
  days: AttendanceDay[];
  presentDays: number;
  workingDays: number;
  lateArrivals: number;
  totalHours: number;
  hourlyRate: number;
  grossSalary: number;
  lateDeduction: number;
  netSalary: number;
  lastArrival: string | null;
  lastDeparture: string | null;
};

/** Deterministic pseudo-random from a string seed, so data is stable per helper. */
function seeded(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const pad = (n: number) => String(n).padStart(2, "0");
const SHIFT_START_MIN = 9 * 60; // 9:00 AM expected check-in
const LATE_GRACE_MIN = 10;

export function buildAttendance(helper: Helper, ref: Date = new Date()): HelperAttendance {
  const rand = seeded(helper.id);
  const year = ref.getFullYear();
  const month = ref.getMonth();
  const lastDay = Math.min(ref.getDate(), new Date(year, month + 1, 0).getDate());

  const days: AttendanceDay[] = [];
  for (let d = 1; d <= lastDay; d++) {
    const date = new Date(year, month, d);
    const isSunday = date.getDay() === 0;
    const roll = rand();
    const present = !isSunday && roll > 0.08;
    if (!present) {
      days.push({ date: `${year}-${pad(month + 1)}-${pad(d)}`, present: false, arrival: null, departure: null, late: false, hours: 0 });
      continue;
    }
    const arriveMin = SHIFT_START_MIN + Math.round((rand() - 0.45) * 60);
    const shiftLen = 7 * 60 + Math.round(rand() * 120);
    const departMin = arriveMin + shiftLen;
    days.push({
      date: `${year}-${pad(month + 1)}-${pad(d)}`,
      present: true,
      arrival: `${pad(Math.floor(arriveMin / 60))}:${pad(arriveMin % 60)}`,
      departure: `${pad(Math.floor(departMin / 60) % 24)}:${pad(departMin % 60)}`,
      late: arriveMin > SHIFT_START_MIN + LATE_GRACE_MIN,
      hours: Math.round((shiftLen / 60) * 10) / 10,
    });
  }

  const worked = days.filter((d) => d.present);
  const totalHours = Math.round(worked.reduce((s, d) => s + d.hours, 0) * 10) / 10;
  const lateArrivals = worked.filter((d) => d.late).length;
  const hourlyRate = Math.round((helper.rateMin + helper.rateMax) / 2);
  const grossSalary = Math.round(totalHours * hourlyRate);
  const lateDeduction = lateArrivals * Math.round(hourlyRate * 0.5);
  const last = [...worked].reverse()[0] ?? null;

  return {
    helperId: helper.id,
    name: helper.name,
    role: helper.role,
    month: ref.toLocaleString("en-IN", { month: "long", year: "numeric" }),
    days,
    presentDays: worked.length,
    workingDays: days.filter((d) => new Date(d.date).getDay() !== 0).length,
    lateArrivals,
    totalHours,
    hourlyRate,
    grossSalary,
    lateDeduction,
    netSalary: grossSalary - lateDeduction,
    lastArrival: last?.arrival ?? null,
    lastDeparture: last?.departure ?? null,
  };
}
