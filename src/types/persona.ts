/**
 * Core type definitions for AI personas
 */

export type Platform = 'twitter' | 'instagram' | 'tiktok' | 'youtube' | 'threads' | 'bluesky';

export type PersonaStatus = 'active' | 'paused' | 'revealed' | 'archived';

export interface Persona {
  id: string;
  name: string;
  platform: Platform;
  handle: string;
  bio: string;
  niche: string;
  aiDisclosure: string; // How AI nature is disclosed (bio text, pinned post, etc.)
  status: PersonaStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface PersonaMetrics {
  personaId: string;
  timestamp: Date;
  followers: number;
  following: number;
  posts: number;
  engagementRate: number; // likes + comments + shares / followers
  avgLikesPerPost: number;
  avgCommentsPerPost: number;
}

export interface ContentPost {
  id: string;
  personaId: string;
  platform: Platform;
  contentType: 'text' | 'image' | 'video' | 'carousel' | 'story';
  content: string;
  hashtags: string[];
  postedAt: Date;
  likes: number;
  comments: number;
  shares: number;
  impressions: number;
  reach: number;
}

export interface PersonaStrategy {
  personaId: string;
  postingFrequency: 'daily' | 'twice-daily' | 'weekly' | 'variable';
  contentMix: Record<string, number>; // e.g., { 'educational': 40, 'entertainment': 30, 'engagement': 30 }
  peakPostingTimes: string[]; // e.g., ['09:00', '18:00']
  targetAudience: string;
  voiceTone: string;
  evolutionNotes: string; // Notes on strategy changes over time
}
