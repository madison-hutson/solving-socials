-- Migration: Add missing columns and features to sponsorship tables
-- Date: 2026-01-19
-- Note: Run this if you already created the base sponsorships/follower_snapshots tables

-- Add missing columns to sponsorships
ALTER TABLE sponsorships
  ADD COLUMN IF NOT EXISTS inquiry_notes TEXT,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Add missing column to follower_snapshots
ALTER TABLE follower_snapshots
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();

-- Create post_comments table (for sentiment analysis)
CREATE TABLE IF NOT EXISTS post_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  comment_text TEXT NOT NULL,
  commenter_handle TEXT,
  commented_at TIMESTAMPTZ,
  sentiment_score DECIMAL,
  sentiment_label TEXT,
  is_spam BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes (IF NOT EXISTS not supported, so use DO block)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_sponsorships_persona') THEN
    CREATE INDEX idx_sponsorships_persona ON sponsorships(persona_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_sponsorships_status') THEN
    CREATE INDEX idx_sponsorships_status ON sponsorships(status);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_sponsorships_inquiry_date') THEN
    CREATE INDEX idx_sponsorships_inquiry_date ON sponsorships(inquiry_date);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_follower_snapshots_persona_date') THEN
    CREATE INDEX idx_follower_snapshots_persona_date ON follower_snapshots(persona_id, snapshot_date);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_post_comments_post') THEN
    CREATE INDEX idx_post_comments_post ON post_comments(post_id);
  END IF;
END $$;

-- Create update trigger for sponsorships
CREATE OR REPLACE FUNCTION update_sponsorship_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS sponsorships_updated_at ON sponsorships;
CREATE TRIGGER sponsorships_updated_at
  BEFORE UPDATE ON sponsorships
  FOR EACH ROW
  EXECUTE FUNCTION update_sponsorship_timestamp();

-- Create analysis view
CREATE OR REPLACE VIEW sponsorship_impact AS
SELECT
  s.id as sponsorship_id,
  s.persona_id,
  p.name as persona_name,
  s.brand_name,
  s.status,
  s.decision_date,
  s.compensation_value,
  s.followers_at_inquiry,
  (SELECT m.followers
   FROM metrics m
   WHERE m.persona_id = s.persona_id
   AND m.recorded_at::date <= s.decision_date - INTERVAL '7 days'
   ORDER BY m.recorded_at DESC LIMIT 1) as followers_7d_before,
  (SELECT m.followers
   FROM metrics m
   WHERE m.persona_id = s.persona_id
   AND m.recorded_at::date >= s.decision_date + INTERVAL '7 days'
   ORDER BY m.recorded_at ASC LIMIT 1) as followers_7d_after,
  (SELECT m.engagement_rate
   FROM metrics m
   WHERE m.persona_id = s.persona_id
   AND m.recorded_at::date <= s.decision_date - INTERVAL '7 days'
   ORDER BY m.recorded_at DESC LIMIT 1) as engagement_7d_before,
  (SELECT m.engagement_rate
   FROM metrics m
   WHERE m.persona_id = s.persona_id
   AND m.recorded_at::date >= s.decision_date + INTERVAL '7 days'
   ORDER BY m.recorded_at ASC LIMIT 1) as engagement_7d_after
FROM sponsorships s
JOIN personas p ON s.persona_id = p.id
WHERE s.status = 'accepted';
