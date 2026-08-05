import { useState } from "react";
import { helpers } from "@/data/helpers";
import {
  agreementText,
  liveStatus,
  notify,
  removeVideo,
  resolveChatReport,
  resolveEmergency,
  reviewVideo,
  toggleHelperDisabled,
  useStore,
} from "@/lib/household";
import { setActiveHelperId, setRole } from "@/lib/records";
import { downloadAgreement } from "@/components/FamilyToolsSection";
import { LiveTracking } from "@/components/FamilyToolsSection";

export function AdminOversight() {
  const store = useStore();
  const [openChat, setOpenChat] = useState<string | null>(null);
  const [annTitle, setAnnTitle] = useState("");
  const [annBody, setAnnBody] = useState("");
  const [audience, setAudience] = useState<"all" | "customers" | "helpers">("all");
  const [search, setSearch] = useState("");

  const pendingVideos = Object.values(store.videos);
  const visibleHelpers = helpers.filter(
    (h) =>
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.role.toLowerCase().includes(search.toLowerCase()),
  );

  const openHelperDashboard = (id: string) => {
    setActiveHelperId(id);
    setRole("helper");
    setTimeout(() => document.getElementById("helper-dashboard")?.scrollIntoView({ behavior: "smooth" }), 60);
  };

  return (
    <div className="mt-8 space-y-6">
      {/* Live tracking of the ongoing job */}
      <div className="rounded-2xl bg-white p-5">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-charcoal/70">
          📍 Live job tracking
        </h3>
        <LiveTracking booking={store.activeBooking} />
      </div>

      {/* Switch into a helper dashboard */}
      <div className="rounded-2xl bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal/70">
            🔁 Open a helper dashboard
          </h3>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search helper"
            className="rounded-full border border-charcoal/15 px-4 py-2 text-sm outline-none focus:border-sage"
          />
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {visibleHelpers.slice(0, 12).map((h) => (
            <div key={h.id} className="flex items-center justify-between gap-2 rounded-xl border border-charcoal/10 p-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-charcoal">{h.name}</p>
                <p className="truncate text-xs text-charcoal/60">
                  {h.role} · {liveStatus(h.id).label}
                </p>
              </div>
              <div className="flex shrink-0 gap-1">
                <button
                  onClick={() => openHelperDashboard(h.id)}
                  className="rounded-full bg-sage px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white"
                >
                  Open
                </button>
                <button
                  onClick={() => toggleHelperDisabled(h.id)}
                  className={`rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest ${
                    store.disabledHelpers.includes(h.id)
                      ? "bg-terracotta text-white"
                      : "border border-charcoal/15 text-charcoal/60"
                  }`}
                >
                  {store.disabledHelpers.includes(h.id) ? "Enable" : "Disable"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video moderation */}
      <div className="rounded-2xl bg-white p-5">
        <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal/70">
          📹 Helper introduction videos
        </h3>
        {pendingVideos.length === 0 ? (
          <p className="mt-3 text-sm text-charcoal/60">No uploaded videos to review.</p>
        ) : (
          <ul className="mt-3 divide-y divide-charcoal/10">
            {pendingVideos.map((v) => {
              const h = helpers.find((x) => x.id === v.helperId);
              return (
                <li key={v.helperId} className="flex flex-wrap items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-charcoal">{h?.name ?? v.helperId}</p>
                    <p className="truncate text-xs text-charcoal/60">{v.url}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-charcoal/50">
                      {v.status}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => reviewVideo(v.helperId, "approved")}
                      className="rounded-full bg-sage px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => reviewVideo(v.helperId, "rejected")}
                      className="rounded-full border border-charcoal/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-charcoal/60"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => removeVideo(v.helperId)}
                      className="rounded-full bg-terracotta px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Agreements */}
      <div className="rounded-2xl bg-white p-5">
        <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal/70">
          📄 Signed work agreements
        </h3>
        {store.agreements.length === 0 ? (
          <p className="mt-3 text-sm text-charcoal/60">No agreements yet.</p>
        ) : (
          <ul className="mt-3 divide-y divide-charcoal/10">
            {store.agreements.map((a) => (
              <li key={a.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div>
                  <p className="text-sm font-semibold text-charcoal">
                    {a.helperName} · {a.role}
                  </p>
                  <p className="text-xs text-charcoal/60">
                    Employer {a.signedBy} · from {a.startDate} · ₹{a.monthlyPay.toLocaleString("en-IN")}/month ·
                    helper {a.helperSigned ? "signed" : "pending"}
                  </p>
                </div>
                <button
                  onClick={() => downloadAgreement(agreementText(a), `agreement-${a.helperName.replace(/\s+/g, "-")}.txt`)}
                  className="rounded-full border border-charcoal/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-charcoal"
                >
                  ⬇ Download
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Interviews */}
      <div className="rounded-2xl bg-white p-5">
        <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal/70">
          📅 Scheduled interviews
        </h3>
        {store.interviews.length === 0 ? (
          <p className="mt-3 text-sm text-charcoal/60">No interviews scheduled.</p>
        ) : (
          <ul className="mt-3 divide-y divide-charcoal/10">
            {store.interviews.map((i) => (
              <li key={i.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div>
                  <p className="text-sm font-semibold text-charcoal">{i.helperName}</p>
                  <p className="text-xs text-charcoal/60">
                    {i.mode === "video" ? "Video call" : "In person"} · {i.date} at {i.time}
                  </p>
                </div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-widest ${
                    i.status === "accepted" ? "text-sage" : i.status === "rejected" ? "text-terracotta" : "text-charcoal/50"
                  }`}
                >
                  {i.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Chat reports */}
      <div className="rounded-2xl bg-white p-5">
        <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal/70">
          💬 Reported conversations
        </h3>
        <p className="mt-1 text-xs text-charcoal/50">
          Private chats stay private. Conversations open only when a user reports abuse or a dispute.
        </p>
        {store.chatReports.length === 0 ? (
          <p className="mt-3 text-sm text-charcoal/60">No reports. Nothing to review.</p>
        ) : (
          <ul className="mt-3 divide-y divide-charcoal/10">
            {store.chatReports.map((c) => (
              <li key={c.id} className="py-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-charcoal">{c.helperName}</p>
                    <p className="text-xs text-charcoal/60">
                      {c.reason} · {new Date(c.at).toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setOpenChat(openChat === c.id ? null : c.id)}
                      className="rounded-full border border-charcoal/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-charcoal"
                    >
                      {openChat === c.id ? "Hide" : "View chat"}
                    </button>
                    {!c.resolved && (
                      <button
                        onClick={() => resolveChatReport(c.id)}
                        className="rounded-full bg-sage px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white"
                      >
                        Resolve
                      </button>
                    )}
                  </div>
                </div>
                {openChat === c.id && (
                  <div className="mt-3 space-y-1 rounded-lg bg-cream p-3 text-sm text-charcoal">
                    {store.messages.filter((m) => m.helperId === c.helperId).length === 0 ? (
                      <p className="text-charcoal/60">No messages in this thread.</p>
                    ) : (
                      store.messages
                        .filter((m) => m.helperId === c.helperId)
                        .map((m) => (
                          <p key={m.id}>
                            <strong>{m.from === "you" ? "Customer" : c.helperName}:</strong> {m.text}
                          </p>
                        ))
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Announcements */}
      <div className="rounded-2xl bg-white p-5">
        <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal/70">
          🔔 Send an announcement
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!annTitle.trim() || !annBody.trim()) return;
            notify(annTitle.trim(), annBody.trim(), audience);
            setAnnTitle("");
            setAnnBody("");
          }}
          className="mt-3 space-y-2"
        >
          <div className="flex flex-wrap gap-2">
            {(["all", "customers", "helpers"] as const).map((a) => (
              <button
                type="button"
                key={a}
                onClick={() => setAudience(a)}
                className={`rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest ${
                  audience === a ? "bg-sage text-white" : "border border-charcoal/15 text-charcoal/60"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
          <input
            value={annTitle}
            onChange={(e) => setAnnTitle(e.target.value)}
            placeholder="Announcement title (e.g. App update 2.4)"
            className="w-full rounded-lg border border-charcoal/15 px-3 py-2.5 text-sm outline-none focus:border-sage"
          />
          <textarea
            value={annBody}
            onChange={(e) => setAnnBody(e.target.value)}
            rows={2}
            placeholder="Message to send"
            className="w-full rounded-lg border border-charcoal/15 px-3 py-2.5 text-sm outline-none focus:border-sage"
          />
          <button className="rounded-full bg-charcoal px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white">
            Send notification
          </button>
        </form>
      </div>

      {/* Emergencies */}
      <div className="rounded-2xl bg-white p-5">
        <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal/70">
          🛡️ Emergency reports
        </h3>
        {store.emergencies.length === 0 ? (
          <p className="mt-3 text-sm text-charcoal/60">No emergency reports.</p>
        ) : (
          <ul className="mt-3 divide-y divide-charcoal/10">
            {store.emergencies.map((e) => (
              <li key={e.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-charcoal">
                    {e.name} <span className="text-xs font-normal text-charcoal/50">({e.from})</span>
                  </p>
                  <p className="text-xs text-charcoal/70">{e.message}</p>
                  <p className="text-[10px] uppercase tracking-widest text-charcoal/40">
                    {new Date(e.at).toLocaleString("en-IN")} {e.contact && `· ${e.contact}`}
                  </p>
                </div>
                <div className="flex gap-2">
                  {e.contact && (
                    <a
                      href={`tel:${e.contact.replace(/[^0-9]/g, "")}`}
                      className="rounded-full border border-charcoal/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-charcoal"
                    >
                      Call
                    </a>
                  )}
                  {e.resolved ? (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-sage">Resolved</span>
                  ) : (
                    <>
                      <button
                        onClick={() =>
                          notify("🚨 Escalated", `Emergency from ${e.name} escalated to the safety head.`, "all")
                        }
                        className="rounded-full bg-terracotta px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white"
                      >
                        Escalate
                      </button>
                      <button
                        onClick={() => resolveEmergency(e.id)}
                        className="rounded-full bg-sage px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white"
                      >
                        Resolve
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
