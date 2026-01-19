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
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
