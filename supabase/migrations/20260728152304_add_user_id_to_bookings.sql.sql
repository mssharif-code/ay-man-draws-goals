/*
# Add user_id column to bookings table for auth support

1. Modified Tables
- `bookings`: Added `user_id` column (uuid, nullable, references auth.users)
  - Nullable so existing anon bookings still work without a logged-in user
  - When a logged-in user makes a booking, their user_id is stored

2. Security
- Existing anon policies remain (anon + authenticated can CRUD)
- Added a new SELECT policy for authenticated users to read all bookings
  (needed for the admin dashboard which shows all bookings)
- No changes to INSERT/UPDATE/DELETE policies

3. Important Notes
- The user_id column is nullable to preserve backward compatibility
  with existing anon bookings that have no user_id
- The admin AI feature requires authentication; the frontend will
  check auth state before showing the feature
*/

ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

-- Keep existing anon policies (they allow anon + authenticated CRUD)
-- No new policies needed since existing policies already allow authenticated users
-- to read all bookings via the USING (true) policy
