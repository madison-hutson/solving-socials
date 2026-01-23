/**
 * Metrics Service
 * Supabase queries for recording and retrieving metrics snapshots
 */

import { supabase } from '@/lib/supabase';
import type { Database } from '@/lib/database.types';

type MetricsRow = Database['public']['Tables']['metrics']['Row'];
type MetricsInsert = Database['public']['Tables']['metrics']['Insert'];

export interface MetricsInput {
  persona_id: string;
  followers: number;
  engagement_rate?: number | null;
  avg_likes?: number | null;
  notes?: string | null;
}

/**
 * Record a new metrics snapshot
 */
export async function recordMetrics(input: MetricsInput): Promise<MetricsRow | null> {
  const insertData: MetricsInsert = {
    persona_id: input.persona_id,
    followers: input.followers,
    engagement_rate: input.engagement_rate ?? null,
    avg_likes: input.avg_likes ?? null,
    notes: input.notes ?? null,
  };

  const { data, error } = await supabase
    .from('metrics')
    .insert(insertData as never)
    .select()
    .single();

  if (error) {
    console.error('Error recording metrics:', error);
    throw error;
  }

  return data as MetricsRow | null;
}

/**
 * Get all metrics for a persona, ordered by date
 */
export async function getMetricsByPersona(
  personaId: string,
  limit = 30
): Promise<MetricsRow[]> {
  const { data, error } = await supabase
    .from('metrics')
    .select('*')
    .eq('persona_id', personaId)
    .order('recorded_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching metrics:', error);
    return [];
  }

  return (data as MetricsRow[] | null) ?? [];
}

/**
 * Get the latest metrics for all personas
 */
export async function getLatestMetricsAll(): Promise<Map<string, MetricsRow>> {
  const { data, error } = await supabase
    .from('metrics')
    .select('*')
    .order('recorded_at', { ascending: false });

  if (error) {
    console.error('Error fetching all metrics:', error);
    return new Map();
  }

  const metricsList = (data as MetricsRow[] | null) ?? [];
  const metricsMap = new Map<string, MetricsRow>();

  for (const metric of metricsList) {
    if (!metricsMap.has(metric.persona_id)) {
      metricsMap.set(metric.persona_id, metric);
    }
  }

  return metricsMap;
}

/**
 * Delete a metrics entry (for corrections)
 */
export async function deleteMetrics(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('metrics')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting metrics:', error);
    return false;
  }

  return true;
}
