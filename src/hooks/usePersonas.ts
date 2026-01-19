/**
 * usePersonas Hook
 * Fetches and manages persona data from Supabase
 */

import { useState, useEffect, useCallback } from 'react';
import {
  getPersonasWithMetrics,
  type PersonaWithMetrics,
} from '@/services/persona.service';

interface UsePersonasResult {
  personas: PersonaWithMetrics[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function usePersonas(): UsePersonasResult {
  const [personas, setPersonas] = useState<PersonaWithMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPersonas = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getPersonasWithMetrics();
      setPersonas(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch personas'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchPersonas();
  }, [fetchPersonas]);

  return {
    personas,
    loading,
    error,
    refetch: fetchPersonas,
  };
}
