/**
 * useMetrics Hook
 * Manages metrics recording and history
 */

import { useState, useCallback } from 'react';
import {
  recordMetrics,
  getMetricsByPersona,
  type MetricsInput,
} from '@/services/metrics.service';
import type { Database } from '@/lib/database.types';

type MetricsRow = Database['public']['Tables']['metrics']['Row'];

interface UseMetricsResult {
  recording: boolean;
  error: Error | null;
  record: (input: MetricsInput) => Promise<MetricsRow | null>;
  fetchHistory: (personaId: string) => Promise<MetricsRow[]>;
}

export function useMetrics(): UseMetricsResult {
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const record = useCallback(async (input: MetricsInput): Promise<MetricsRow | null> => {
    setRecording(true);
    setError(null);

    try {
      const result = await recordMetrics(input);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to record metrics');
      setError(error);
      return null;
    } finally {
      setRecording(false);
    }
  }, []);

  const fetchHistory = useCallback(async (personaId: string): Promise<MetricsRow[]> => {
    try {
      return await getMetricsByPersona(personaId);
    } catch (err) {
      console.error('Error fetching history:', err);
      return [];
    }
  }, []);

  return {
    recording,
    error,
    record,
    fetchHistory,
  };
}
