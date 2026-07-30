import { useEffect, useState } from "react";
import { helpers, type Helper } from "./data/helpers";
import { supabase, type Booking } from "./lib/supabase";

const tips = [
  {
    title: "Write a clear job post",
    body: "List the tasks, days, and times. Helpers who know exactly what you need are more likely to accept quickly.",
  },
  {
    title: "Check ratings and reviews",
    body: "Prioritise helpers with a rating of 4.5 and above. Read the comments for details about reliability and care.",
  },
  {
    title: "Start with a trial day",
    body: "Book a single shift first. It lets you and the helper find a fit before committing to a longer arrangement.",
  },
  {
    title: "Agree on pay upfront",
    body: "Confirm the hourly rate and payment method before the first shift to avoid any surprises later.",
  },
  {
    title: "Build a respectful routine",
    body: "Treat your helper as a partner. Clear communication and kindness keep good helpers coming back.",
  },
];

const faqs = [
  {
    q: "How are helpers verified?",
    a: "Every helper completes an identity check and a background screening before being listed. We also collect references from past employers.",
  },
  {
    q: "What if I need to cancel a booking?",
    a: "You can cancel up to 4 hours before the scheduled time at no charge. Later cancellations may be charged for the first hour.",
  },
  {
    q: "How do I pay the helper?",
    a: "Payment is handled securely through the app after each shift. You can use UPI, cards, or net banking. Helpers are paid within 24 hours.",
  },
  {
    q: "Can I book the same helper again?",
    a: "Yes. Once you find a helper you like, you can mark them as a favourite and rebook them with one tap whenever you need.",
  },
  {
    q: "What areas do you cover?",
    a: "We currently serve major neighbourhoods across Mumbai, with new areas added every month. Check each helper's profile for their location.",
  },
];

const plans = [
  {
    name: "Pay-as-you-go",
    price: "₹0",
    period: "/booking",
    features: ["No monthly fee", "Book any helper", "Standard support", "Cancel up to 4h before"],
    featured: false,
  },
  {
    name: "Haven Plus",
    price: "₹499",
    period: "/month",
    features: ["10% off every booking", "Priority matching", "Dedicated support", "Free rescheduling"],
    featured: true,
  },
];

export default function App() {
  const [active, setActive] = useState<Helper | null>(null);
  const [records, setRecords] = useState<Booking[]>([]);
  const [loadingRecords, setLoadingRecords] = useState(true);

  const loadRecords = async () => {
    setLoadingRecords(true);
    const { data, error } = await supabase
      .from("bookings")
      .select("id, customer_name, helper_name, helper_role, service, hours, total, created_at")
      .order("created_at", { ascending: false });
    if (!error && data) setRecords(data as Booking[]);
    setLoadingRecords(false);
  };

  useEffect(() => {
    loadRecords();
  }, []);

  return (
    <>
      <header className="header">
        <div className="container header-inner">
          <div className="brand">
            <span className="brand-dot" />
            Helper Haven
          </div>
          <nav className="nav">
            <a href="#helpers">Helpers</a>
            <a href="#responsibilities">Responsibilities</a>
            <a href="#tips">Tips</a>
            <a href="#membership">Membership</a>
            <a href="#faq">FAQ</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <p className="eyebrow">Trusted local helpers</p>
            <h1>Book a helper you can trust, in minutes.</h1>
            <p>
              Browse vetted cooks, carers, cleaners and child-minders near you. See what they do,
              what to check before hiring, and book with confidence.
            </p>
            <a className="hero-cta" href="#helpers">
              Find a helper
            </a>
          </div>
        </section>

        <section id="helpers" className="section">
          <div className="container">
            <p className="eyebrow">Our helpers</p>
            <h2 className="section-title">Meet the helpers</h2>
            <p className="section-sub">
              Each helper is background-checked and reviewed by families like yours.
            </p>
            <div className="helper-grid">
              {helpers.map((h) => (
                <article key={h.id} className="helper-card">
                  <img className="helper-photo" src={h.photo} alt={h.name} loading="lazy" />
                  <div className="helper-body">
                    <div className="helper-top">
                      <span className="helper-name">{h.name}</span>
                      <span className="helper-rating">★ {h.rating.toFixed(1)}</span>
                    </div>
                    <p className="helper-role">{h.role}</p>
                    <p className="helper-loc">{h.location}</p>
                    <p className="helper-rate">
                      <strong>₹{h.rate}</strong> / hour
                    </p>
                    <button className="btn-book" onClick={() => setActive(h)}>
                      Book {h.name.split(" ")[0]}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="responsibilities" className="section section-alt">
          <div className="container">
            <p className="eyebrow">What they do</p>
            <h2 className="section-title">Helper responsibilities</h2>
            <p className="section-sub">
              Know exactly what each helper takes care of before you book.
            </p>
            <div className="resp-list">
              {helpers.map((h) => (
                <div key={h.id} className="resp-card">
                  <h3>{h.role} — {h.name}</h3>
                  <ul>
                    {h.responsibilities.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="tips" className="section">
          <div className="container">
            <p className="eyebrow">Before you hire</p>
            <h2 className="section-title">Hiring tips</h2>
            <p className="section-sub">Five simple steps to find and keep the right helper.</p>
            <div className="tip-list">
              {tips.map((t, i) => (
                <div key={t.title} className="tip-item">
                  <span className="tip-num">{i + 1}</span>
                  <div className="tip-text">
                    <strong>{t.title}</strong>
                    {t.body}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="membership" className="section section-alt">
          <div className="container">
            <p className="eyebrow">Membership</p>
            <h2 className="section-title">Choose your plan</h2>
            <p className="section-sub">Book freely or save every month with Haven Plus.</p>
            <div className="plans">
              {plans.map((p) => (
                <div key={p.name} className={`plan ${p.featured ? "featured" : ""}`}>
                  {p.featured && <span className="plan-badge">Popular</span>}
                  <h3>{p.name}</h3>
                  <p className="plan-price">
                    {p.price} <span>{p.period}</span>
                  </p>
                  <ul>
                    {p.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <button className="plan-btn">Choose {p.name}</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="section">
          <div className="container">
            <p className="eyebrow">Questions</p>
            <h2 className="section-title">Frequently asked questions</h2>
            <p className="section-sub">Everything you might want to know before booking.</p>
            <FaqList />
          </div>
        </section>

        <section id="records" className="section section-alt">
          <div className="container">
            <p className="eyebrow">Saved records</p>
            <h2 className="section-title">Your booking records</h2>
            <p className="section-sub">
              Every booking made here is saved with the customer's name and the time.
            </p>
            {loadingRecords ? (
              <div className="records-empty">Loading records…</div>
            ) : records.length === 0 ? (
              <div className="records-empty">
                No bookings yet. Book a helper above and it will appear here.
              </div>
            ) : (
              <div>
                {records.map((r) => (
                  <div key={r.id} className="record-item">
                    <div className="record-main">
                      <p className="record-name">{r.customer_name}</p>
                      <p className="record-detail">
                        Booked {r.helper_name} · {r.helper_role} · {r.service} · {r.hours}h ·
                        ₹{r.total.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <span className="record-time">
                      {new Date(r.created_at).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                ))}
                <button className="refresh-btn" onClick={loadRecords}>
                  Refresh records
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="brand">
            <span className="brand-dot" />
            Helper Haven
          </div>
          <p>Trusted local helpers, one booking at a time.</p>
        </div>
      </footer>

      {active && (
        <BookingModal
          helper={active}
          onClose={() => setActive(null)}
          onSaved={() => {
            setActive(null);
            loadRecords();
          }}
        />
      )}
    </>
  );
}

function FaqList() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="faq-list">
      {faqs.map((f, i) => (
        <div key={f.q} className={`faq-item ${open === i ? "open" : ""}`}>
          <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
            <span>{f.q}</span>
            <span className="faq-icon">+</span>
          </button>
          {open === i && <p className="faq-a">{f.a}</p>}
        </div>
      ))}
    </div>
  );
}

function BookingModal({
  helper,
  onClose,
  onSaved,
}: {
  helper: Helper;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [name, setName] = useState("");
  const [service, setService] = useState(helper.responsibilities[0]);
  const [hours, setHours] = useState(2);
  const [errors, setErrors] = useState<{ name?: string; hours?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const total = helper.rate * hours;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err: { name?: string; hours?: string } = {};
    if (!name.trim()) err.name = "Please enter your name.";
    if (!hours || hours < 1) err.hours = "Book at least 1 hour.";
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    setSubmitting(true);
    setServerError(null);
    const { error } = await supabase.from("bookings").insert({
      customer_name: name.trim(),
      helper_name: helper.name,
      helper_role: helper.role,
      service,
      hours,
      total,
    });
    setSubmitting(false);

    if (error) {
      setServerError("Something went wrong saving your booking. Please try again.");
      return;
    }
    setDone(true);
    setTimeout(onSaved, 1400);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3>Book {helper.name}</h3>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="modal-body">
          {done ? (
            <div className="success">
              <div className="success-badge">✓</div>
              <h3>Booking saved!</h3>
              <p>
                {helper.name} will be notified. Your record has been saved below.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="bk-name">Your name</label>
                <input
                  id="bk-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                />
                {errors.name && <p className="field-error">{errors.name}</p>}
              </div>

              <div className="field">
                <label htmlFor="bk-service">Service</label>
                <select
                  id="bk-service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                >
                  {helper.responsibilities.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="bk-hours">Hours</label>
                <input
                  id="bk-hours"
                  type="number"
                  min={1}
                  max={12}
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                />
                {errors.hours && <p className="field-error">{errors.hours}</p>}
              </div>

              <div className="summary">
                <div className="summary-row">
                  <span>Rate</span>
                  <span>₹{helper.rate}/hour</span>
                </div>
                <div className="summary-row">
                  <span>Hours</span>
                  <span>{hours}</span>
                </div>
                <div className="summary-row summary-total">
                  <span>Total</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {serverError && (
                <p className="field-error" style={{ marginBottom: 12 }}>
                  {serverError}
                </p>
              )}

              <button className="btn-submit" type="submit" disabled={submitting}>
                {submitting ? "Saving…" : `Confirm booking · ₹${total.toLocaleString("en-IN")}`}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
