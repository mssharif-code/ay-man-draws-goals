import { useMemo } from "react";
import type { Helper } from "@/data/helpers";
import { buildAttendance } from "@/lib/attendance";
import { useRole } from "@/lib/records";

/** Admin-only attendance + salary panel for a single helper. Renders nothing for customers. */
export function HelperAttendancePanel({ helper }: { helper: Helper }) {
  const role = useRole();
  const data = useMemo(() => buildAttendance(helper), [helper]);

  if (role !== "admin") return null;

  const recent = [...data.days].reverse().slice(0, 10);

  const stats = [
    { label: "Last arrival", value: data.lastArrival ?? "—" },
    { label: "Last departure", value: data.lastDeparture ?? "—" },
    { label: "Monthly attendance", value: `${data.presentDays}/${data.workingDays} days` },
    { label: "Late arrivals", value: String(data.lateArrivals) },
    { label: "Hours worked", value: `${data.totalHours} h` },
    { label: "Net salary", value: `₹${data.netSalary.toLocaleString("en-IN")}` },
  ];

  return (
    <section className="bg-charcoal px-5 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.35em] text-sage">Super admin only</p>
        <h3 className="text-3xl text-white md:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
          Attendance &amp; salary.
        </h3>
        <p className="mt-2 text-sm text-white/60">
          {data.name} · {data.role} · {data.month}. Helpers and customers cannot see this.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-white/5 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-white/50">{s.label}</p>
              <p className="mt-2 text-lg font-semibold text-white">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl bg-white p-5">
          <h4 className="text-sm font-bold uppercase tracking-wider text-charcoal/70">Salary calculation</h4>
          <ul className="mt-3 space-y-2 text-sm text-charcoal">
            <li className="flex justify-between">
              <span>Hourly rate</span>
              <span>₹{data.hourlyRate.toLocaleString("en-IN")}</span>
            </li>
            <li className="flex justify-between">
              <span>Hours worked ({data.totalHours} h)</span>
              <span>₹{data.grossSalary.toLocaleString("en-IN")}</span>
            </li>
            <li className="flex justify-between text-terracotta">
              <span>Late arrival deduction ({data.lateArrivals})</span>
              <span>−₹{data.lateDeduction.toLocaleString("en-IN")}</span>
            </li>
            <li className="flex justify-between border-t border-charcoal/10 pt-2 font-semibold">
              <span>Net payable</span>
              <span>₹{data.netSalary.toLocaleString("en-IN")}</span>
            </li>
          </ul>
        </div>

        <div className="mt-6 overflow-x-auto rounded-2xl bg-white p-5">
          <h4 className="text-sm font-bold uppercase tracking-wider text-charcoal/70">Recent check-ins</h4>
          <table className="mt-3 w-full min-w-[420px] text-left text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-wider text-charcoal/50">
                <th className="py-2">Date</th>
                <th>Arrival</th>
                <th>Departure</th>
                <th>Hours</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal/10">
              {recent.map((d) => (
                <tr key={d.date}>
                  <td className="py-2 text-charcoal">{d.date}</td>
                  <td className="text-charcoal/80">{d.arrival ?? "—"}</td>
                  <td className="text-charcoal/80">{d.departure ?? "—"}</td>
                  <td className="text-charcoal/80">{d.present ? `${d.hours} h` : "—"}</td>
                  <td className={d.present ? (d.late ? "text-terracotta" : "text-sage") : "text-charcoal/40"}>
                    {d.present ? (d.late ? "Late" : "On time") : "Absent"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
