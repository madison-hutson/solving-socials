/**
 * usePosts Hook
 * Manages posts state and operations for the calendar
 */

import { useState, useEffect, useCallback } from 'react';
import {
  getAllPosts,
  getPostsByPersona,
  createPost,
  updatePost,
  deletePost,
  markAsPosted,
  type PostInput,
} from '@/services/posts.service';
import type { Database } from '@/lib/database.types';

type PostRow = Database['public']['Tables']['posts']['Row'];

interface UsePostsResult {
  posts: PostRow[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  addPost: (input: PostInput) => Promise<PostRow | null>;
  editPost: (id: string, updates: Partial<PostInput>) => Promise<PostRow | null>;
  removePost: (id: string) => Promise<boolean>;
  setPosted: (id: string, metrics?: { likes?: number; comments?: number }) => Promise<boolean>;
}

export function usePosts(personaId?: string): UsePostsResult {
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = personaId ? await getPostsByPersona(personaId) : await getAllPosts();
      setPosts(data);
    } catch (err) {
      setError('Failed to load posts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [personaId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const addPost = useCallback(async (input: PostInput): Promise<PostRow | null> => {
    try {
      const newPost = await createPost(input);
      if (newPost) {
        setPosts((prev) => [...prev, newPost].sort((a, b) => {
          const aDate = a.scheduled_for ?? '';
          const bDate = b.scheduled_for ?? '';
          return aDate.localeCompare(bDate);
        }));
      }
      return newPost;
    } catch (err) {
      console.error('Failed to add post:', err);
      return null;
    }
  }, []);

  const editPost = useCallback(async (id: string, updates: Partial<PostInput>): Promise<PostRow | null> => {
    try {
      const updated = await updatePost(id, updates);
      if (updated) {
        setPosts((prev) => prev.map((p) => (p.id === id ? updated : p)));
      }
      return updated;
    } catch (err) {
      console.error('Failed to edit post:', err);
      return null;
    }
  }, []);

  const removePost = useCallback(async (id: string): Promise<boolean> => {
    try {
      const success = await deletePost(id);
      if (success) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
      }
      return success;
    } catch (err) {
      console.error('Failed to delete post:', err);
      return false;
    }
  }, []);

  const setPosted = useCallback(async (
    id: string,
    metrics?: { likes?: number; comments?: number }
  ): Promise<boolean> => {
    try {
      const success = await markAsPosted(id, metrics);
      if (success) {
        setPosts((prev) =>
          prev.map((p) =>
            p.id === id ? { ...p, status: 'posted', posted_at: new Date().toISOString() } : p
          )
        );
      }
      return success;
    } catch (err) {
      console.error('Failed to mark as posted:', err);
      return false;
    }
  }, []);

  return {
    posts,
    loading,
    error,
    refresh,
    addPost,
    editPost,
    removePost,
    setPosted,
  };
}
