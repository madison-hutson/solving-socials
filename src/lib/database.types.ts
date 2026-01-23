/**
 * Supabase Database Types
 * Auto-generated types for database tables
 * Run `npx supabase gen types typescript` to regenerate after schema changes
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      personas: {
        Row: {
          id: string;
          name: string;
          handle: string;
          platform: string;
          bio: string | null;
          niche: string | null;
          tone: string | null;
          status: string;
          has_face: boolean;
          colors: Json | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          handle: string;
          platform: string;
          bio?: string | null;
          niche?: string | null;
          tone?: string | null;
          status?: string;
          has_face?: boolean;
          colors?: Json | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          handle?: string;
          platform?: string;
          bio?: string | null;
          niche?: string | null;
          tone?: string | null;
          status?: string;
          has_face?: boolean;
          colors?: Json | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      metrics: {
        Row: {
          id: string;
          persona_id: string;
          recorded_at: string;
          followers: number;
          engagement_rate: number | null;
          avg_likes: number | null;
          notes: string | null;
        };
        Insert: {
          id?: string;
          persona_id: string;
          recorded_at?: string;
          followers: number;
          engagement_rate?: number | null;
          avg_likes?: number | null;
          notes?: string | null;
        };
        Update: {
          id?: string;
          persona_id?: string;
          recorded_at?: string;
          followers?: number;
          engagement_rate?: number | null;
          avg_likes?: number | null;
          notes?: string | null;
        };
      };
      posts: {
        Row: {
          id: string;
          persona_id: string;
          content_type: string;
          caption: string | null;
          hashtags: string[] | null;
          scheduled_for: string | null;
          posted_at: string | null;
          status: string;
          likes: number | null;
          comments: number | null;
          shares: number | null;
          saves: number | null;
        };
        Insert: {
          id?: string;
          persona_id: string;
          content_type: string;
          caption?: string | null;
          hashtags?: string[] | null;
          scheduled_for?: string | null;
          posted_at?: string | null;
          status?: string;
          likes?: number | null;
          comments?: number | null;
          shares?: number | null;
          saves?: number | null;
        };
        Update: {
          id?: string;
          persona_id?: string;
          content_type?: string;
          caption?: string | null;
          hashtags?: string[] | null;
          scheduled_for?: string | null;
          posted_at?: string | null;
          status?: string;
          likes?: number | null;
          comments?: number | null;
          shares?: number | null;
          saves?: number | null;
        };
      };
      content_drafts: {
        Row: {
          id: string;
          persona_id: string;
          content_type: string;
          topic: string | null;
          generated_caption: string | null;
          hashtags: string[] | null;
          status: string;
          post_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          persona_id: string;
          content_type: string;
          topic?: string | null;
          generated_caption?: string | null;
          hashtags?: string[] | null;
          status?: string;
          post_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          persona_id?: string;
          content_type?: string;
          topic?: string | null;
          generated_caption?: string | null;
          hashtags?: string[] | null;
          status?: string;
          post_id?: string | null;
          created_at?: string;
        };
      };
      sponsorships: {
        Row: {
          id: string;
          persona_id: string;
          inquiry_date: string;
          brand_name: string;
          brand_category: string | null;
          contact_method: string | null;
          inquiry_notes: string | null;
          status: string;
          decision_date: string | null;
          decline_reason: string | null;
          compensation_type: string | null;
          compensation_value: number | null;
          deliverables: string | null;
          exclusivity_days: number | null;
          post_id: string | null;
          followers_at_inquiry: number | null;
          engagement_rate_at_inquiry: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          persona_id: string;
          inquiry_date: string;
          brand_name: string;
          brand_category?: string | null;
          contact_method?: string | null;
          inquiry_notes?: string | null;
          status?: string;
          decision_date?: string | null;
          decline_reason?: string | null;
          compensation_type?: string | null;
          compensation_value?: number | null;
          deliverables?: string | null;
          exclusivity_days?: number | null;
          post_id?: string | null;
          followers_at_inquiry?: number | null;
          engagement_rate_at_inquiry?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          persona_id?: string;
          inquiry_date?: string;
          brand_name?: string;
          brand_category?: string | null;
          contact_method?: string | null;
          inquiry_notes?: string | null;
          status?: string;
          decision_date?: string | null;
          decline_reason?: string | null;
          compensation_type?: string | null;
          compensation_value?: number | null;
          deliverables?: string | null;
          exclusivity_days?: number | null;
          post_id?: string | null;
          followers_at_inquiry?: number | null;
          engagement_rate_at_inquiry?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      follower_snapshots: {
        Row: {
          id: string;
          persona_id: string;
          snapshot_date: string;
          follower_count: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          persona_id: string;
          snapshot_date: string;
          follower_count: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          persona_id?: string;
          snapshot_date?: string;
          follower_count?: number;
          created_at?: string;
        };
      };
      post_comments: {
        Row: {
          id: string;
          post_id: string;
          comment_text: string;
          commenter_handle: string | null;
          commented_at: string | null;
          sentiment_score: number | null;
          sentiment_label: string | null;
          is_spam: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          comment_text: string;
          commenter_handle?: string | null;
          commented_at?: string | null;
          sentiment_score?: number | null;
          sentiment_label?: string | null;
          is_spam?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          comment_text?: string;
          commenter_handle?: string | null;
          commented_at?: string | null;
          sentiment_score?: number | null;
          sentiment_label?: string | null;
          is_spam?: boolean;
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
