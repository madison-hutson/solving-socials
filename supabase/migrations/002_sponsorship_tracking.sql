-- Migration: Sponsorship Tracking Tables
-- Date: 2026-01-19
-- Purpose: Track sponsorship inquiries, decisions, and related metrics

-- Sponsorship inquiries and deals
CREATE TABLE sponsorships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  persona_id UUID NOT NULL REFERENCES personas(id) ON DELETE CASCADE,

  -- Inquiry details
  inquiry_date DATE NOT NULL,
  brand_name TEXT NOT NULL,
  brand_category TEXT,  -- e.g., 'gaming peripheral', 'wellness app', 'fashion'
  contact_method TEXT,  -- 'dm', 'email', 'comment', 'other'
  inquiry_notes TEXT,   -- what they said, context

  -- Decision
  status TEXT NOT NULL DEFAULT 'pending',  -- 'pending', 'accepted', 'declined', 'negotiating'
  decision_date DATE,
  decline_reason TEXT,  -- if declined, why?

  -- Deal terms (if accepted)
  compensation_type TEXT,  -- 'cash', 'product', 'affiliate', 'hybrid'
  compensation_value DECIMAL,  -- USD equivalent
  deliverables TEXT,  -- what they asked for (e.g., '1 reel + 2 stories')
  exclusivity_days INTEGER DEFAULT 0,  -- days of exclusivity required

  -- Link to the sponsored post (if accepted and posted)
  post_id UUID REFERENCES posts(id) ON DELETE SET NULL,

  -- Metrics snapshot at inquiry time (for analysis)
  followers_at_inquiry INTEGER,
  engagement_rate_at_inquiry DECIMAL,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Daily follower snapshots for unfollow rate calculation
-- Need daily granularity to detect post-sponsorship unfollows
CREATE TABLE follower_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  persona_id UUID NOT NULL REFERENCES personas(id) ON DELETE CASCADE,
  snapshot_date DATE NOT NULL,
  follower_count INTEGER NOT NULL,

  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(persona_id, snapshot_date)
);

-- Comments on posts for sentiment analysis
CREATE TABLE post_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,

  comment_text TEXT NOT NULL,
  commenter_handle TEXT,
  commented_at TIMESTAMPTZ,

  -- Sentiment analysis (populated by Claude API or manual)
  sentiment_score DECIMAL,  -- -1.0 (negative) to 1.0 (positive)
  sentiment_label TEXT,     -- 'positive', 'neutral', 'negative', 'mixed'

  is_spam BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX idx_sponsorships_persona ON sponsorships(persona_id);
CREATE INDEX idx_sponsorships_status ON sponsorships(status);
CREATE INDEX idx_sponsorships_inquiry_date ON sponsorships(inquiry_date);
CREATE INDEX idx_follower_snapshots_persona_date ON follower_snapshots(persona_id, snapshot_date);
CREATE INDEX idx_post_comments_post ON post_comments(post_id);

-- Update trigger for sponsorships
CREATE OR REPLACE FUNCTION update_sponsorship_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER sponsorships_updated_at
  BEFORE UPDATE ON sponsorships
  FOR EACH ROW
  EXECUTE FUNCTION update_sponsorship_timestamp();

-- Useful views for analysis

-- Sponsorship impact analysis view
CREATE VIEW sponsorship_impact AS
SELECT
  s.id as sponsorship_id,
  s.persona_id,
  p.name as persona_name,
  s.brand_name,
  s.status,
  s.decision_date,
  s.compensation_value,
  s.followers_at_inquiry,
  -- Get metrics 7 days before
  (SELECT m.followers
   FROM metrics m
   WHERE m.persona_id = s.persona_id
   AND m.recorded_at::date <= s.decision_date - INTERVAL '7 days'
   ORDER BY m.recorded_at DESC LIMIT 1) as followers_7d_before,
  -- Get metrics 7 days after
  (SELECT m.followers
   FROM metrics m
   WHERE m.persona_id = s.persona_id
   AND m.recorded_at::date >= s.decision_date + INTERVAL '7 days'
   ORDER BY m.recorded_at ASC LIMIT 1) as followers_7d_after,
  -- Get engagement 7 days before
  (SELECT m.engagement_rate
   FROM metrics m
   WHERE m.persona_id = s.persona_id
   AND m.recorded_at::date <= s.decision_date - INTERVAL '7 days'
   ORDER BY m.recorded_at DESC LIMIT 1) as engagement_7d_before,
  -- Get engagement 7 days after
  (SELECT m.engagement_rate
   FROM metrics m
   WHERE m.persona_id = s.persona_id
   AND m.recorded_at::date >= s.decision_date + INTERVAL '7 days'
   ORDER BY m.recorded_at ASC LIMIT 1) as engagement_7d_after
FROM sponsorships s
JOIN personas p ON s.persona_id = p.id
WHERE s.status = 'accepted';
