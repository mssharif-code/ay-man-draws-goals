import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Role = "customer" | "admin";

type RoleContextValue = {
  role: Role;
  setRole: (r: Role) => void;
};

const RoleContext = createContext<RoleContextValue | null>(null);

const STORAGE_KEY = "hh-role";

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>("customer");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Role | null;
    if (stored === "customer" || stored === "admin") {
      setRoleState(stored);
    }
  }, []);

  const setRole = (r: Role) => {
    setRoleState(r);
    localStorage.setItem(STORAGE_KEY, r);
  };

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole(): RoleContextValue {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used within RoleProvider");
  return ctx;
}
