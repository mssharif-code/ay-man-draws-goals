import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { getHelperById, type Helper } from "@/data/helpers";

export const Route = createFileRoute("/book/$helperId")({
  loader: ({ params }) => {
    const helper = getHelperById(params.helperId);
    if (!helper) throw notFound();
    return { helper };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.helper.name ?? "Helper";
    return {
      meta: [
        { title: `Book ${name} — Household Helpers India` },
        { name: "description", content: `Complete your booking and payment for ${name}.` },
        { name: "robots", content: "noindex" },
      ],
    };
  },
  component: BookHelper,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background px-6 py-24 text-center">
      <h1 className="text-3xl text-charcoal">Helper not found</h1>
      <Link to="/" className="mt-6 inline-block text-sage underline">Back home</Link>
    </div>
  ),
});

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Delhi","Goa","Gujarat",
  "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra",
  "Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu",
  "Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Chandigarh","Puducherry",
  "Jammu & Kashmir","Ladakh","Andaman & Nicobar","Dadra & Nagar Haveli","Daman & Diu","Lakshadweep",
];

const BANKS = [
  "State Bank of India","HDFC Bank","ICICI Bank","Axis Bank","Kotak Mahindra Bank","Punjab National Bank",
  "Bank of Baroda","Canara Bank","Union Bank of India","IndusInd Bank","Yes Bank","IDFC First Bank",
  "IDBI Bank","Bank of India","Central Bank of India","Federal Bank","South Indian Bank","RBL Bank",
];

function BookHelper() {
  const { helper } = Route.useLoaderData() as { helper: Helper };
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    bank: "",
    hours: 8,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const total = helper.rateMax * form.hours;

  const update = (k: keyof typeof form, v: string | number) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (form.fullName.trim().length < 2) err.fullName = "Please enter your full name";
    if (!/^[^\s@]+@gmail\.com$/i.test(form.email.trim())) err.email = "Enter a valid Gmail address";
    if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) err.mobile = "Enter a 10-digit Indian mobile number";
    if (form.address.trim().length < 6) err.address = "Please enter your house address";
    if (!form.city.trim()) err.city = "Please enter your city";
    if (!form.state) err.state = "Please select your state";
    if (!form.bank) err.bank = "Please choose a bank for net banking";
    setErrors(err);
    if (Object.keys(err).length === 0) setDone(true);
  };

  if (done) {
    return (
      <div className="min-h-screen bg-cream px-6 py-24">
        <div className="mx-auto max-w-xl rounded-3xl bg-white p-10 text-center shadow-lg">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-sage text-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7"><path d="M20 6L9 17l-5-5"/></svg>
          </div>
          <h1 className="text-3xl text-charcoal" style={{ fontFamily: "var(--font-display)" }}>
            Payment initiated
          </h1>
          <p className="mt-3 text-charcoal/70">
            You will now be redirected to <strong>{form.bank}</strong> net banking to pay
            <strong> ₹{total.toLocaleString("en-IN")}</strong> for {form.hours} hours with {helper.name}.
          </p>
          <p className="mt-2 text-sm text-charcoal/60">
            A confirmation will be emailed to <strong>{form.email}</strong>.
          </p>
          <Link to="/" className="mt-8 inline-block rounded-lg bg-sage px-6 py-3 text-xs font-bold uppercase tracking-widest text-white">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-charcoal/10 px-6 py-5 md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link to="/" className="text-xl tracking-tight text-charcoal" style={{ fontFamily: "var(--font-display)" }}>
            HOUSEHOLD HELPERS
          </Link>
          <Link to="/helpers/$helperId" params={{ helperId: helper.id }} className="text-xs font-bold uppercase tracking-widest text-charcoal/70 hover:text-charcoal">
            ← Back to profile
          </Link>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:px-10 lg:grid-cols-3">
        {/* Summary */}
        <aside className="lg:col-span-1">
          <div className="sticky top-6 overflow-hidden rounded-2xl border border-charcoal/10 bg-white shadow-sm">
            <img src={helper.image} alt={helper.name} className="h-48 w-full object-cover" />
            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-terracotta">{helper.role}</p>
              <p className="mt-1 text-2xl text-charcoal" style={{ fontFamily: "var(--font-display)" }}>
                {helper.name}
              </p>
              <p className="mt-1 text-sm text-charcoal/60">{helper.city}, {helper.state} · Speaks {helper.nativeLanguage}</p>
              <div className="mt-4 border-t border-charcoal/10 pt-4 text-sm">
                <div className="flex justify-between"><span>Rate</span><span>₹{helper.rateMin}–₹{helper.rateMax}/hr</span></div>
                <div className="mt-2 flex justify-between"><span>Hours</span>
                  <input
                    type="number" min={1} max={200} value={form.hours}
                    onChange={(e) => update("hours", Math.max(1, Number(e.target.value) || 1))}
                    className="w-20 rounded border border-charcoal/20 px-2 py-1 text-right"
                  />
                </div>
                <div className="mt-3 flex justify-between border-t border-charcoal/10 pt-3 text-base font-bold text-charcoal">
                  <span>Total</span><span>₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2">
          <h1 className="text-4xl tracking-tight text-charcoal" style={{ fontFamily: "var(--font-display)" }}>
            Complete your booking.
          </h1>
          <p className="mt-2 text-charcoal/70">Pay securely via net banking. Your details stay confidential.</p>

          <div className="mt-8 space-y-6 rounded-2xl border border-charcoal/10 bg-white p-6 shadow-sm md:p-8">
            <Field label="Full name" error={errors.fullName}>
              <input value={form.fullName} onChange={(e) => update("fullName", e.target.value)}
                placeholder="e.g. Rahul Verma" className="input" />
            </Field>

            <Field label="Gmail address" error={errors.email}>
              <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)}
                placeholder="yourname@gmail.com" className="input" />
            </Field>

            <Field label="Mobile number" error={errors.mobile}>
              <div className="flex gap-2">
                <span className="inline-flex items-center rounded-lg border border-charcoal/20 bg-cream px-3 text-sm text-charcoal/70">+91</span>
                <input value={form.mobile} onChange={(e) => update("mobile", e.target.value.replace(/\D/g, "").slice(0,10))}
                  placeholder="10-digit mobile" className="input flex-1" />
              </div>
            </Field>

            <Field label="House address" error={errors.address}>
              <textarea value={form.address} onChange={(e) => update("address", e.target.value)}
                rows={2} placeholder="Flat / house no., street, area" className="input" />
            </Field>

            <div className="grid gap-6 md:grid-cols-2">
              <Field label="City" error={errors.city}>
                <input value={form.city} onChange={(e) => update("city", e.target.value)}
                  placeholder="e.g. Mumbai" className="input" />
              </Field>
              <Field label="State" error={errors.state}>
                <select value={form.state} onChange={(e) => update("state", e.target.value)} className="input">
                  <option value="">Select state</option>
                  {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </Field>
            </div>

            <div className="rounded-xl border border-charcoal/10 bg-cream/60 p-5">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-sage">Payment · Net banking</p>
              <Field label="Choose your bank" error={errors.bank}>
                <select value={form.bank} onChange={(e) => update("bank", e.target.value)} className="input">
                  <option value="">Select a bank</option>
                  {BANKS.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </Field>
              <p className="mt-3 text-xs text-charcoal/60">
                You'll be redirected to your bank's secure login to complete the payment of
                <strong> ₹{total.toLocaleString("en-IN")}</strong>.
              </p>
            </div>

            <button type="submit"
              className="w-full rounded-lg bg-sage px-6 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-primary">
              Pay ₹{total.toLocaleString("en-IN")} via net banking
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid rgba(0,0,0,0.15);
          background: white;
          padding: 0.65rem 0.85rem;
          font-size: 0.95rem;
          color: inherit;
          outline: none;
        }
        .input:focus { border-color: #7A9E7E; box-shadow: 0 0 0 3px rgba(122,158,126,0.15); }
      `}</style>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-charcoal/70">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-terracotta">{error}</span>}
    </label>
  );
}
