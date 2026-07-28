import { useMemo } from "react";
import { type Booking } from "../lib/supabase";

export function AdminView({
  records,
  loadingRecords,
  onReload,
}: {
  records: Booking[];
  loadingRecords: boolean;
  onReload: () => void;
}) {
  const stats = useMemo(() => {
    const totalBookings = records.length;
    const totalSales = records.reduce((sum, r) => sum + r.total, 0);
    const totalHours = records.reduce((sum, r) => sum + r.hours, 0);

    const byHelper = new Map<string, { name: string; role: string; count: number; revenue: number }>();
    for (const r of records) {
      const key = r.helper_name;
      const entry = byHelper.get(key) ?? { name: key, role: r.helper_role, count: 0, revenue: 0 };
      entry.count += 1;
      entry.revenue += r.total;
      byHelper.set(key, entry);
    }
    const topHelpers = [...byHelper.values()].sort((a, b) => b.count - a.count);

    const byRole = new Map<string, number>();
    for (const r of records) {
      byRole.set(r.helper_role, (byRole.get(r.helper_role) ?? 0) + 1);
    }
    const roleBreakdown = [...byRole.entries()].sort((a, b) => b[1] - a[1]);

    return { totalBookings, totalSales, totalHours, topHelpers, roleBreakdown };
  }, [records]);

  const maxCount = stats.topHelpers[0]?.count ?? 1;
  const maxRole = stats.roleBreakdown[0]?.[1] ?? 1;

  return (
    <main>
      <section className="admin-hero">
        <div className="container">
          <p className="eyebrow">Super Admin</p>
          <h1>Company dashboard</h1>
          <p>Live overview of sales, bookings, and helper performance across Helper Haven.</p>
        </div>
      </section>

      {loadingRecords ? (
        <section className="section">
          <div className="container">
            <div className="records-empty">Loading dashboard…</div>
          </div>
        </section>
      ) : (
        <>
          <section className="section">
            <div className="container">
              <p className="eyebrow">At a glance</p>
              <h2 className="section-title">Key numbers</h2>
              <div className="stat-grid">
                <div className="stat-card">
                  <p className="stat-label">Total sales</p>
                  <p className="stat-value">₹{stats.totalSales.toLocaleString("en-IN")}</p>
                </div>
                <div className="stat-card">
                  <p className="stat-label">Total bookings</p>
                  <p className="stat-value">{stats.totalBookings}</p>
                </div>
                <div className="stat-card">
                  <p className="stat-label">Hours booked</p>
                  <p className="stat-value">{stats.totalHours}</p>
                </div>
                <div className="stat-card">
                  <p className="stat-label">Active helpers</p>
                  <p className="stat-value">{stats.topHelpers.length || 0}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="section section-alt">
            <div className="container">
              <p className="eyebrow">Helper performance</p>
              <h2 className="section-title">Most used helpers</h2>
              <p className="section-sub">Ranked by number of bookings.</p>
              {stats.topHelpers.length === 0 ? (
                <div className="records-empty">No bookings yet.</div>
              ) : (
                <div className="bar-list">
                  {stats.topHelpers.map((h) => (
                    <div key={h.name} className="bar-row">
                      <div className="bar-info">
                        <span className="bar-name">{h.name}</span>
                        <span className="bar-meta">{h.role} · ₹{h.revenue.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="bar-track">
                        <div className="bar-fill" style={{ width: `${(h.count / maxCount) * 100}%` }} />
                      </div>
                      <span className="bar-count">{h.count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="section">
            <div className="container">
              <p className="eyebrow">By role</p>
              <h2 className="section-title">Bookings by helper role</h2>
              <div className="bar-list">
                {stats.roleBreakdown.length === 0 ? (
                  <div className="records-empty">No data yet.</div>
                ) : (
                  stats.roleBreakdown.map(([role, count]) => (
                    <div key={role} className="bar-row">
                      <div className="bar-info">
                        <span className="bar-name">{role}</span>
                      </div>
                      <div className="bar-track">
                        <div className="bar-fill" style={{ width: `${(count / maxRole) * 100}%` }} />
                      </div>
                      <span className="bar-count">{count}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>

          <section className="section section-alt">
            <div className="container">
              <p className="eyebrow">All bookings</p>
              <h2 className="section-title">Recent bookings</h2>
              <p className="section-sub">Every booking across the platform, newest first.</p>
              {records.length === 0 ? (
                <div className="records-empty">No bookings yet.</div>
              ) : (
                <div>
                  {records.map((r) => (
                    <div key={r.id} className="record-item">
                      <div className="record-main">
                        <p className="record-name">{r.customer_name}</p>
                        <p className="record-detail">
                          {r.helper_name} · {r.helper_role} · {r.service} · {r.hours}h ·
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
                  <button className="refresh-btn" onClick={onReload}>Refresh data</button>
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </main>
  );
}
