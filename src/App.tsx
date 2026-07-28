import { useEffect, useState } from "react";
import { supabase, type Booking } from "./lib/supabase";
import { CustomerView } from "./components/CustomerView";
import { AdminView } from "./components/AdminView";

export type Role = "customer" | "admin";

export default function App() {
  const [role, setRole] = useState<Role>(() => {
    return (localStorage.getItem("hh-role") as Role) || "customer";
  });

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

  const switchRole = (r: Role) => {
    setRole(r);
    localStorage.setItem("hh-role", r);
  };

  return (
    <>
      <header className="header">
        <div className="container header-inner">
          <div className="brand">
            <span className="brand-dot" />
            Helper Haven
          </div>
          <RoleSwitcher role={role} onSwitch={switchRole} />
        </div>
      </header>

      {role === "customer" ? (
        <CustomerView
          records={records}
          loadingRecords={loadingRecords}
          onReload={loadRecords}
        />
      ) : (
        <AdminView records={records} loadingRecords={loadingRecords} onReload={loadRecords} />
      )}

      <footer className="footer">
        <div className="container">
          <div className="brand">
            <span className="brand-dot" />
            Helper Haven
          </div>
          <p>Trusted local helpers, one booking at a time.</p>
        </div>
      </footer>
    </>
  );
}

function RoleSwitcher({ role, onSwitch }: { role: Role; onSwitch: (r: Role) => void }) {
  return (
    <div className="role-switcher">
      <button
        className={`role-btn ${role === "customer" ? "active" : ""}`}
        onClick={() => onSwitch("customer")}
      >
        Customer
      </button>
      <button
        className={`role-btn ${role === "admin" ? "active" : ""}`}
        onClick={() => onSwitch("admin")}
      >
        Super Admin
      </button>
    </div>
  );
}
