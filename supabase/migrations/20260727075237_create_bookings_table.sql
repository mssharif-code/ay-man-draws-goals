/*
# Create bookings table (single-tenant, no auth)

1. New Tables
- `bookings`
- `id` (uuid, primary key)
- `customer_name` (text, not null) — the name of the customer who booked
- `helper_name` (text, not null) — the name of the helper booked
- `helper_role` (text, not null) — the helper's role, e.g. "Home Cook"
- `service` (text, not null) — the chosen service
- `hours` (integer, not null) — number of hours booked
- `total` (integer, not null) — total amount paid in INR
- `created_at` (timestamptz, default now()) — the time the booking was saved

2. Security
- Enable RLS on `bookings`.
- Allow anon + authenticated CRUD because this is a no-auth, single-tenant app
  where the saved-records list is intentionally shared/public.
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  helper_name text NOT NULL,
  helper_role text NOT NULL,
  service text NOT NULL,
  hours integer NOT NULL,
  total integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_bookings" ON bookings;
CREATE POLICY "anon_select_bookings" ON bookings FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_bookings" ON bookings;
CREATE POLICY "anon_insert_bookings" ON bookings FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_bookings" ON bookings;
CREATE POLICY "anon_update_bookings" ON bookings FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_bookings" ON bookings;
CREATE POLICY "anon_delete_bookings" ON bookings FOR DELETE
  TO anon, authenticated USING (true);
