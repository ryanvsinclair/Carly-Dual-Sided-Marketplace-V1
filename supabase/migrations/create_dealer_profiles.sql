CREATE TABLE IF NOT EXISTS dealer_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) UNIQUE NOT NULL,
  role text DEFAULT 'dealer' NOT NULL,
  created_at timestamp DEFAULT now()
);
