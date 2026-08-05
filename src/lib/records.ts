import { useEffect, useState } from "react";

export type BookingRecord = {
  id: string;
  customerName: string;
  helperName: string;
  helperRole: string;
  service: string;
  hours: number;
  total: number;
  createdAt: string;
};

export type Role = "customer" | "helper" | "admin";

const RECORDS_KEY = "helpers.records";
const ROLE_KEY = "helpers.role";
const CUSTOMER_KEY = "helpers.customer";
const ACTIVE_HELPER_KEY = "helpers.activeHelper";
const EVENT = "helpers:store";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event(EVENT));
}

export function getRecords(): BookingRecord[] {
  return read<BookingRecord[]>(RECORDS_KEY, []);
}

export function addRecord(record: Omit<BookingRecord, "id" | "createdAt">) {
  const entry: BookingRecord = {
    ...record,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };
  write(RECORDS_KEY, [entry, ...getRecords()]);
  return entry;
}

export function getRole(): Role {
  return read<Role>(ROLE_KEY, "customer");
}

export function setRole(role: Role) {
  write(ROLE_KEY, role);
}

export function getCustomerName(): string {
  return read<string>(CUSTOMER_KEY, "");
}

export function setCustomerName(name: string) {
  write(CUSTOMER_KEY, name);
}

/** Which helper's dashboard is currently being viewed (helper login / admin impersonation). */
export function getActiveHelperId(): string {
  return read<string>(ACTIVE_HELPER_KEY, "");
}

export function setActiveHelperId(id: string) {
  write(ACTIVE_HELPER_KEY, id);
}


function useStoreValue<T>(getter: () => T, initial: T): T {
  const [value, setValue] = useState<T>(initial);
  useEffect(() => {
    const sync = () => setValue(getter());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return value;
}

/** Current role. Starts as "customer" during SSR/first paint. */
export function useRole(): Role {
  return useStoreValue(getRole, "customer");
}

export function useRecords(): BookingRecord[] {
  return useStoreValue<BookingRecord[]>(getRecords, []);
}

export function useCustomerName(): string {
  return useStoreValue(getCustomerName, "");
}
