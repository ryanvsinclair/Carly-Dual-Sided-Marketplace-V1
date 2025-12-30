ALTER TABLE dealer_profiles ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'pending';
