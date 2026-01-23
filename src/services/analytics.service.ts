/**
 * Analytics Service
 * Aggregates metrics data for charts and insights
 */

import { supabase } from '@/lib/supabase';
import type { Database } from '@/lib/database.types';

type MetricsRow = Database['public']['Tables']['metrics']['Row'];
type PersonaRow = Database['public']['Tables']['personas']['Row'];

interface GrowthDataPoint {
  date: string;
  [personaName: string]: string | number;
}

interface PersonaGrowthData {
  persona: PersonaRow;
  metrics: MetricsRow[];
}

/**
 * Get all metrics for all personas for charting
 */
export async function getAllMetricsForCharts(): Promise<PersonaGrowthData[]> {
  // Fetch all personas
  const { data: personas, error: personasError } = await supabase
    .from('personas')
    .select('*')
    .order('name');

  if (personasError || !personas) {
    console.error('Error fetching personas:', personasError);
    return [];
  }

  // Fetch all metrics
  const { data: allMetrics, error: metricsError } = await supabase
    .from('metrics')
    .select('*')
    .order('recorded_at', { ascending: true });

  if (metricsError) {
    console.error('Error fetching metrics:', metricsError);
    return [];
  }

  const metricsList = (allMetrics as MetricsRow[] | null) ?? [];
  const personaList = personas as PersonaRow[];

  // Group metrics by persona
  return personaList.map((persona) => ({
    persona,
    metrics: metricsList.filter((m) => m.persona_id === persona.id),
  }));
}

/**
 * Transform metrics into chart-friendly format for growth over time
 */
export function transformToGrowthData(
  personaData: PersonaGrowthData[]
): GrowthDataPoint[] {
  // Collect all unique dates
  const dateSet = new Set<string>();
  for (const pd of personaData) {
    for (const m of pd.metrics) {
      const date = new Date(m.recorded_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
      dateSet.add(date);
    }
  }

  const dates = Array.from(dateSet).sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });

  // Build data points
  return dates.map((date) => {
    const point: GrowthDataPoint = { date };
    for (const pd of personaData) {
      const metric = pd.metrics.find((m) => {
        const mDate = new Date(m.recorded_at).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        });
        return mDate === date;
      });
      if (metric) {
        point[pd.persona.name] = metric.followers;
      }
    }
    return point;
  });
}

/**
 * Get latest engagement rates for comparison chart
 */
export function getLatestEngagementRates(
  personaData: PersonaGrowthData[]
): Array<{ name: string; engagement: number; color: string }> {
  return personaData
    .map((pd) => {
      const latestMetric = pd.metrics[pd.metrics.length - 1];
      const colors = pd.persona.colors as { accent?: string } | null;
      return {
        name: pd.persona.name,
        engagement: latestMetric?.engagement_rate ?? 0,
        color: colors?.accent ?? '#6366f1',
      };
    })
    .filter((d) => d.engagement > 0);
}

/**
 * Calculate growth rate between first and last metric
 */
export function calculateGrowthRate(metrics: MetricsRow[]): number | null {
  if (metrics.length < 2) return null;
  const first = metrics[0];
  const last = metrics[metrics.length - 1];
  if (!first || !last || first.followers === 0) return null;
  return ((last.followers - first.followers) / first.followers) * 100;
}
