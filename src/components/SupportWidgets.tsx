import { useState } from "react";
import { markAllRead, reportEmergency, useStore } from "@/lib/household";

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

/** Notification feed filtered for a dashboard audience. */
export function NotificationFeed({ audience }: { audience: "customers" | "helpers" }) {
  const { notifications } = useStore();
  const list = notifications.filter((n) => !n.audience || n.audience === "all" || n.audience === audience);
  return (
    <div className="rounded-2xl border border-charcoal/10 bg-white p-6">
      <h3 className="mb-4 text-xl font-semibold text-charcoal">🔔 Notifications</h3>
      {list.length === 0 ? (
        <p className="text-sm text-muted-foreground">No notifications yet.</p>
      ) : (
        <ul className="max-h-64 space-y-2 overflow-y-auto">
          {list.slice(0, 12).map((n) => (
            <li key={n.id} className="rounded-lg bg-cream px-3 py-2">
              <p className="text-sm font-semibold text-charcoal">{n.title}</p>
              <p className="text-xs text-charcoal/70">{n.body}</p>
            </li>
          ))}
        </ul>
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

export function EmergencySupportButton({
  from,
  name,
  className = "",
}: {
  from: "customer" | "helper";
  name: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    reportEmergency({ from, name: name || (from === "helper" ? "Helper" : "Customer"), contact, message: message.trim() });
    setMessage("");
    setContact("");
    setSent(true);
  };

  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
          setSent(false);
        }}
        className={`rounded-full bg-terracotta px-5 py-3 text-xs font-bold uppercase tracking-widest text-white ${className}`}
      >
        🛡️ Emergency support
      </button>
      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-charcoal/60 p-4 sm:items-center"
          onClick={() => setOpen(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-sm overflow-y-auto rounded-2xl bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-1 text-2xl font-semibold text-charcoal">🛡️ Emergency support</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Tap to call, or send a report straight to our safety desk.
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
            {sent ? (
              <p className="mt-4 rounded-lg bg-cream px-4 py-3 text-sm text-charcoal">
                ✅ Report sent. Our safety desk will contact you right away.
              </p>
            ) : (
              <form onSubmit={submit} className="mt-4 space-y-2">
                <input
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Phone number to reach you"
                  className="w-full rounded-lg border border-charcoal/15 px-3 py-2.5 text-sm outline-none focus:border-sage"
                />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe the emergency…"
                  rows={3}
                  className="w-full rounded-lg border border-charcoal/15 px-3 py-2.5 text-sm outline-none focus:border-sage"
                />
                <button className="w-full rounded-full bg-terracotta px-5 py-3 text-xs font-bold uppercase tracking-widest text-white">
                  Send emergency report
                </button>
              </form>
            )}
            <button
              onClick={() => setOpen(false)}
              className="mt-3 w-full rounded-full bg-charcoal px-5 py-3 text-xs font-bold uppercase tracking-widest text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
