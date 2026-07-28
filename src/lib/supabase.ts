import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(url, anonKey);

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
