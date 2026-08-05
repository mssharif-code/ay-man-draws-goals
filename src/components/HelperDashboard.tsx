import { useState } from "react";
import { helpers } from "@/data/helpers";
import {
  agreementText,
  helperSignAgreement,
  respondInterview,
  sendMessage,
  setHelperStatus,
  submitVideo,
  useStore,
  type HelperAvailability,
} from "@/lib/household";
import { setActiveHelperId, setRole, useActiveHelperId, useRole } from "@/lib/records";
import { EmergencySupportButton, NotificationFeed } from "@/components/SupportWidgets";
import { DEFAULT_VIDEO, downloadAgreement } from "@/components/FamilyToolsSection";

export function HelperPicker() {
  const activeId = useActiveHelperId();
  return (
    <select
      value={activeId || helpers[0]?.id}
      onChange={(e) => setActiveHelperId(e.target.value)}
      className="rounded-full border border-charcoal/15 bg-white px-3 py-1.5 text-xs text-charcoal outline-none"
      aria-label="Select helper"
    >
      {helpers.map((h) => (
        <option key={h.id} value={h.id}>
          {h.name} — {h.role}
        </option>
      ))}
    </select>
  );
}

export function HelperDashboard() {
  const store = useStore();
  const role = useRole();
  const activeId = useActiveHelperId();
  const helper = helpers.find((h) => h.id === activeId) ?? helpers[0]!;
  const video = store.videos[helper.id];
  const [videoUrl, setVideoUrl] = useState("");
  const booking = store.activeBooking?.helperId === helper.id ? store.activeBooking : null;
  const myInterviews = store.interviews.filter((i) => i.helperId === helper.id);
  const myAgreements = store.agreements.filter((a) => a.helperId === helper.id);
  const status: HelperAvailability = store.helperStatus[helper.id] ?? "Available";

  return (
    <section id="helper-dashboard" className="bg-cream px-6 py-20 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src={helper.image} alt={helper.name} className="h-16 w-16 rounded-full object-cover" />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.4em] text-terracotta">Helper dashboard</p>
              <h2 className="text-3xl text-charcoal md:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
                {helper.name}
              </h2>
              <p className="text-sm text-charcoal/60">
                {helper.role} · {helper.city}, {helper.state}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {role === "admin" && (
              <>
                <span className="text-[10px] font-bold uppercase tracking-widest text-charcoal/50">
                  Viewing as helper
                </span>
                <HelperPicker />
                <button
                  onClick={() => setRole("admin")}
                  className="rounded-full bg-charcoal px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white"
                >
                  Back to admin
                </button>
              </>
            )}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Availability */}
          <div className="rounded-2xl border border-charcoal/10 bg-white p-6">
            <h3 className="mb-4 text-xl font-semibold text-charcoal">📍 My availability</h3>
            <div className="flex flex-wrap gap-2">
              {(["Available", "Busy", "On Leave"] as HelperAvailability[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setHelperStatus(helper.id, s)}
                  className={`rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition ${
                    status === s ? "bg-sage text-white" : "border border-charcoal/15 text-charcoal/60"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            {store.disabledHelpers.includes(helper.id) && (
              <p className="mt-3 rounded-lg bg-terracotta/10 px-3 py-2 text-xs text-terracotta">
                Your profile is temporarily disabled by the admin.
              </p>
            )}
          </div>

          {/* Video */}
          <div className="rounded-2xl border border-charcoal/10 bg-white p-6">
            <h3 className="mb-3 text-xl font-semibold text-charcoal">📹 Introduction video</h3>
            <video src={video?.url || DEFAULT_VIDEO} controls className="mb-3 aspect-video w-full rounded-lg bg-charcoal" />
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-charcoal/50">
              Status: {video ? video.status : "default video"}
            </p>
            <div className="flex gap-2">
              <input
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="Paste new video URL"
                className="flex-1 rounded-lg border border-charcoal/15 px-3 py-2.5 text-sm outline-none focus:border-sage"
              />
              <button
                onClick={() => {
                  if (!videoUrl.trim()) return;
                  submitVideo(helper.id, videoUrl.trim());
                  setVideoUrl("");
                }}
                className="rounded-full bg-charcoal px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white"
              >
                Upload
              </button>
            </div>
          </div>

          {/* Interviews */}
          <div className="rounded-2xl border border-charcoal/10 bg-white p-6">
            <h3 className="mb-4 text-xl font-semibold text-charcoal">📅 Interview requests</h3>
            {myInterviews.length === 0 ? (
              <p className="text-sm text-muted-foreground">No interview requests yet.</p>
            ) : (
              <ul className="space-y-2">
                {myInterviews.map((i) => (
                  <li key={i.id} className="rounded-lg bg-cream px-3 py-2.5">
                    <p className="text-sm text-charcoal">
                      {i.mode === "video" ? "Video call" : "In person"} · {i.date} at {i.time}
                    </p>
                    {i.note && <p className="text-xs text-charcoal/60">{i.note}</p>}
                    {i.status === "pending" ? (
                      <div className="mt-2 flex gap-2">
                        <button
                          onClick={() => respondInterview(i.id, "accepted")}
                          className="rounded-full bg-sage px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => respondInterview(i.id, "rejected")}
                          className="rounded-full border border-charcoal/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-charcoal/60"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-charcoal/50">
                        {i.status}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Chat */}
          <HelperChat
            helperId={helper.id}
            customerName={booking?.customerName ?? ""}
            unlocked={Boolean(booking)}
          />

          {/* Agreements */}
          <div className="rounded-2xl border border-charcoal/10 bg-white p-6">
            <h3 className="mb-4 text-xl font-semibold text-charcoal">📄 Work agreements</h3>
            {myAgreements.length === 0 ? (
              <p className="text-sm text-muted-foreground">No agreements to review yet.</p>
            ) : (
              <ul className="space-y-2">
                {myAgreements.map((a) => (
                  <li key={a.id} className="rounded-lg bg-cream px-3 py-2.5 text-sm text-charcoal">
                    <p>
                      From {a.startDate} · {a.hoursPerWeek} hrs/week · ₹{a.monthlyPay.toLocaleString("en-IN")}/month ·
                      off on {a.weeklyOff}
                    </p>
                    <p className="text-xs text-charcoal/60">Employer: {a.signedBy}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {a.helperSigned ? (
                        <span className="text-[10px] font-bold uppercase tracking-widest text-sage">✅ Signed</span>
                      ) : (
                        <button
                          onClick={() => helperSignAgreement(a.id)}
                          className="rounded-full bg-sage px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white"
                        >
                          Review &amp; sign
                        </button>
                      )}
                      <button
                        onClick={() => downloadAgreement(agreementText(a), `agreement-${a.helperName.replace(/\s+/g, "-")}.txt`)}
                        className="text-[10px] font-bold uppercase tracking-widest text-charcoal/60 hover:underline"
                      >
                        ⬇ Download
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <NotificationFeed audience="helpers" />

          <div className="flex flex-col justify-center gap-3 rounded-2xl border border-terracotta/30 bg-terracotta/5 p-6">
            <h3 className="text-xl font-semibold text-charcoal">🛡️ Contact support</h3>
            <p className="text-sm text-muted-foreground">
              Feeling unsafe or facing an issue at work? Reach our safety desk instantly.
            </p>
            <EmergencySupportButton from="helper" name={helper.name} className="self-start" />
          </div>
        </div>
      </div>
    </section>
  );
}

function HelperChat({
  helperId,
  customerName,
  unlocked,
}: {
  helperId: string;
  customerName: string;
  unlocked: boolean;
}) {
  const store = useStore();
  const [text, setText] = useState("");
  const thread = store.messages.filter((m) => m.helperId === helperId);

  if (!unlocked) {
    return (
      <div className="rounded-2xl border border-charcoal/10 bg-white p-6">
        <h3 className="mb-3 text-xl font-semibold text-charcoal">💬 Chat with customer</h3>
        <p className="text-sm text-muted-foreground">
          🔒 Chat opens when a customer books you. Past bookings are closed.
        </p>
      </div>
    );
  }

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    sendMessage(helperId, t, "helper");
    setText("");
  };

  return (
    <div className="rounded-2xl border border-charcoal/10 bg-white p-6">
      <h3 className="mb-4 text-xl font-semibold text-charcoal">
        💬 Chat with {customerName || "customer"}
      </h3>
      <div className="mb-3 h-48 space-y-2 overflow-y-auto rounded-lg bg-cream p-3">
        {thread.length === 0 ? (
          <p className="text-sm text-muted-foreground">No messages yet.</p>
        ) : (
          thread.map((m) => (
            <div
              key={m.id}
              className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                m.from === "helper" ? "ml-auto bg-sage text-white" : "bg-white text-charcoal shadow-sm"
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
          placeholder="Reply to the family…"
          className="flex-1 rounded-lg border border-charcoal/15 px-3 py-2.5 outline-none focus:border-sage"
        />
        <button className="rounded-full bg-charcoal px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white">
          Send
        </button>
      </form>
    </div>
  );
}
