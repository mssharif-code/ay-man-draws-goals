import { useState } from "react";
import { markAllRead, useStore } from "@/lib/household";

export function NotificationBell() {
  const { notifications } = useStore();
  const [open, setOpen] = useState(false);
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => {
          setOpen((o) => !o);
          if (!open) markAllRead();
        }}
        aria-label="Notifications"
        className="relative rounded-full border border-charcoal/10 bg-white px-3 py-1.5 text-sm"
      >
        🔔
        {unread > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-terracotta px-1 text-[10px] font-bold text-white">
            {unread}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 max-h-80 w-72 overflow-y-auto rounded-xl border border-charcoal/10 bg-white p-3 shadow-xl">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Notifications
          </p>
          {notifications.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nothing yet.</p>
          ) : (
            <ul className="space-y-2">
              {notifications.map((n) => (
                <li key={n.id} className="rounded-lg bg-cream px-3 py-2">
                  <p className="text-sm font-semibold text-charcoal">{n.title}</p>
                  <p className="text-xs text-charcoal/70">{n.body}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-widest text-charcoal/40">
                    {new Date(n.at).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

const emergencyContacts = [
  { label: "Helpers 24×7 support", value: "1800-102-4455" },
  { label: "Police", value: "100" },
  { label: "Ambulance", value: "108" },
  { label: "Women's helpline", value: "1091" },
  { label: "Fire", value: "101" },
];

export function EmergencySupport() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 left-5 z-[55] rounded-full bg-terracotta px-4 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-lg"
      >
        🛡️ SOS
      </button>
      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-charcoal/60 p-4 sm:items-center"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-1 text-2xl font-semibold text-charcoal">🛡️ Emergency support</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Tap to call. Our safety desk stays on the line until help arrives.
            </p>
            <ul className="space-y-2">
              {emergencyContacts.map((c) => (
                <li key={c.value}>
                  <a
                    href={`tel:${c.value.replace(/[^0-9]/g, "")}`}
                    className="flex items-center justify-between rounded-lg border border-charcoal/10 px-4 py-3 hover:bg-cream"
                  >
                    <span className="text-charcoal">{c.label}</span>
                    <span className="font-bold text-terracotta">{c.value}</span>
                  </a>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setOpen(false)}
              className="mt-4 w-full rounded-full bg-charcoal px-5 py-3 text-xs font-bold uppercase tracking-widest text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
