/**
 * Persona Service
 * Supabase queries for personas and their metrics
 */

import { supabase } from '@/lib/supabase';
import type { Database } from '@/lib/database.types';

type PersonaRow = Database['public']['Tables']['personas']['Row'];
type MetricsRow = Database['public']['Tables']['metrics']['Row'];
type PersonaUpdate = Database['public']['Tables']['personas']['Update'];

export interface PersonaWithMetrics extends PersonaRow {
  latest_metrics: MetricsRow | null;
}

/**
 * Fetch all personas with their latest metrics
 */
export async function getPersonasWithMetrics(): Promise<PersonaWithMetrics[]> {
  // Fetch all personas
  const { data: personas, error: personasError } = await supabase
    .from('personas')
    .select('*')
    .order('name');

  if (personasError) {
    console.error('Error fetching personas:', personasError);
    throw personasError;
  }

  const personaList = personas as PersonaRow[] | null;
  if (!personaList || personaList.length === 0) {
    return [];
  }

  // Fetch latest metrics for each persona
  const personaIds = personaList.map((p) => p.id);
  const { data: allMetrics, error: metricsError } = await supabase
    .from('metrics')
    .select('*')
    .in('persona_id', personaIds)
    .order('recorded_at', { ascending: false });

  if (metricsError) {
    console.error('Error fetching metrics:', metricsError);
    // Continue without metrics rather than failing
  }

  // Map latest metrics to each persona
  const metricsList = allMetrics as MetricsRow[] | null;
  const metricsMap = new Map<string, MetricsRow>();
  if (metricsList) {
    for (const metric of metricsList) {
      // Only keep the first (most recent) metric per persona
      if (!metricsMap.has(metric.persona_id)) {
        metricsMap.set(metric.persona_id, metric);
      }
    }
  }

  return personaList.map((persona) => ({
    ...persona,
    latest_metrics: metricsMap.get(persona.id) ?? null,
  }));
}

/**
 * Fetch a single persona by ID
 */
export async function getPersonaById(id: string): Promise<PersonaRow | null> {
  const { data, error } = await supabase
    .from('personas')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching persona:', error);
    return null;
  }

  return data as PersonaRow | null;
}

/**
 * Update a persona's avatar URL
 */
export async function updatePersonaAvatar(
  id: string,
  avatarUrl: string
): Promise<boolean> {
  const updateData: PersonaUpdate = {
    avatar_url: avatarUrl,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from('personas')
    .update(updateData as never)
    .eq('id', id);

  if (error) {
    console.error('Error updating avatar:', error);
    return false;
  }

  return true;
}

/**
 * Get metrics history for a persona
 */
export async function getMetricsHistory(
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
    console.error('Error fetching metrics history:', error);
    return [];
  }

  return (data as MetricsRow[] | null) ?? [];
}
