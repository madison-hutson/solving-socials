/**
 * Posts Service
 * Supabase queries for content posts and scheduling
 */

import { supabase } from '@/lib/supabase';
import type { Database } from '@/lib/database.types';

type PostRow = Database['public']['Tables']['posts']['Row'];
type PostInsert = Database['public']['Tables']['posts']['Insert'];
type PostUpdate = Database['public']['Tables']['posts']['Update'];

export type PostStatus = 'draft' | 'scheduled' | 'posted';
export type ContentType = 'reel' | 'carousel' | 'static' | 'story';

export interface PostInput {
  persona_id: string;
  content_type: ContentType;
  caption?: string;
  hashtags?: string[];
  scheduled_for?: Date;
  status?: PostStatus;
}

/**
 * Create a new post
 */
export async function createPost(input: PostInput): Promise<PostRow | null> {
  const insertData: PostInsert = {
    persona_id: input.persona_id,
    content_type: input.content_type,
    caption: input.caption ?? null,
    hashtags: input.hashtags ?? null,
    scheduled_for: input.scheduled_for?.toISOString() ?? null,
    status: input.status ?? 'draft',
  };

  const { data, error } = await supabase
    .from('posts')
    .insert(insertData as never)
    .select()
    .single();

  if (error) {
    console.error('Error creating post:', error);
    throw error;
  }

  return data as PostRow | null;
}

/**
 * Update an existing post
 */
export async function updatePost(id: string, updates: Partial<PostInput>): Promise<PostRow | null> {
  const updateData: PostUpdate = {};

  if (updates.content_type) updateData.content_type = updates.content_type;
  if (updates.caption !== undefined) updateData.caption = updates.caption;
  if (updates.hashtags !== undefined) updateData.hashtags = updates.hashtags;
  if (updates.scheduled_for !== undefined) {
    updateData.scheduled_for = updates.scheduled_for?.toISOString() ?? null;
  }
  if (updates.status) updateData.status = updates.status;

  const { data, error } = await supabase
    .from('posts')
    .update(updateData as never)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating post:', error);
    throw error;
  }

  return data as PostRow | null;
}

/**
 * Mark a post as posted with metrics
 */
export async function markAsPosted(
  id: string,
  metrics?: { likes?: number; comments?: number; shares?: number; saves?: number }
): Promise<boolean> {
  const updateData: PostUpdate = {
    status: 'posted',
    posted_at: new Date().toISOString(),
    ...metrics,
  };

  const { error } = await supabase
    .from('posts')
    .update(updateData as never)
    .eq('id', id);

  if (error) {
    console.error('Error marking post as posted:', error);
    return false;
  }

  return true;
}

/**
 * Get all posts for a persona
 */
export async function getPostsByPersona(personaId: string): Promise<PostRow[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('persona_id', personaId)
    .order('scheduled_for', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

  return (data as PostRow[] | null) ?? [];
}

/**
 * Get all posts within a date range (for calendar view)
 */
export async function getPostsInRange(startDate: Date, endDate: Date): Promise<PostRow[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .gte('scheduled_for', startDate.toISOString())
    .lte('scheduled_for', endDate.toISOString())
    .order('scheduled_for', { ascending: true });

  if (error) {
    console.error('Error fetching posts in range:', error);
    return [];
  }

  return (data as PostRow[] | null) ?? [];
}

/**
 * Get all posts (for calendar)
 */
export async function getAllPosts(): Promise<PostRow[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('scheduled_for', { ascending: true });

  if (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }

  return (data as PostRow[] | null) ?? [];
}

/**
 * Delete a post
 */
export async function deletePost(id: string): Promise<boolean> {
  const { error } = await supabase.from('posts').delete().eq('id', id);

  if (error) {
    console.error('Error deleting post:', error);
    return false;
  }

  return true;
}
