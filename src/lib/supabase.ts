import { createClient } from "@supabase/supabase-js";

export type Booking = {
  id: string;
  customer_name: string;
  helper_name: string;
  helper_role: string;
  service: string;
  hours: number;
  total: number;
  created_at: string;
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? "";
const supabaseKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ??
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  "";

/**
 * Booking storage client. When the backend env vars are not configured the
 * client still constructs (so the build and SSR never crash) — requests simply
 * fail and the UI shows its error state.
 */
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseKey || "public-anon-key",
  { auth: { persistSession: false } },
);

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);
