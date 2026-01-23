/**
 * useSponsorships Hook
 * Manages sponsorship state and operations
 */

import { useState, useEffect, useCallback } from 'react';
import {
  getAllSponsorships,
  getSponsorshipsByPersona,
  createSponsorship,
  updateSponsorshipDecision,
  deleteSponsorship,
  getSponsorshipStats,
  type SponsorshipInput,
  type SponsorshipDecision,
} from '@/services/sponsorship.service';
import type { Database } from '@/lib/database.types';

type SponsorshipRow = Database['public']['Tables']['sponsorships']['Row'];

interface SponsorshipStats {
  total: number;
  pending: number;
  accepted: number;
  declined: number;
  totalRevenue: number;
}

interface UseSponsorshipsResult {
  sponsorships: SponsorshipRow[];
  stats: SponsorshipStats;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  addSponsorship: (input: SponsorshipInput) => Promise<SponsorshipRow | null>;
  updateDecision: (id: string, decision: SponsorshipDecision) => Promise<SponsorshipRow | null>;
  removeSponsorship: (id: string) => Promise<boolean>;
}

export function useSponsorships(personaId?: string): UseSponsorshipsResult {
  const [sponsorships, setSponsorships] = useState<SponsorshipRow[]>([]);
  const [stats, setStats] = useState<SponsorshipStats>({
    total: 0,
    pending: 0,
    accepted: 0,
    declined: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [data, statsData] = await Promise.all([
        personaId ? getSponsorshipsByPersona(personaId) : getAllSponsorships(),
        getSponsorshipStats(),
      ]);
      setSponsorships(data);
      setStats(statsData);
    } catch (err) {
      setError('Failed to load sponsorships');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [personaId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const addSponsorship = useCallback(
    async (input: SponsorshipInput): Promise<SponsorshipRow | null> => {
      try {
        const newSponsorship = await createSponsorship(input);
        if (newSponsorship) {
          setSponsorships((prev) => [newSponsorship, ...prev]);
          setStats((prev) => ({
            ...prev,
            total: prev.total + 1,
            pending: prev.pending + 1,
          }));
        }
        return newSponsorship;
      } catch (err) {
        console.error('Failed to add sponsorship:', err);
        return null;
      }
    },
    []
  );

  const updateDecision = useCallback(
    async (id: string, decision: SponsorshipDecision): Promise<SponsorshipRow | null> => {
      try {
        const updated = await updateSponsorshipDecision(id, decision);
        if (updated) {
          setSponsorships((prev) => prev.map((s) => (s.id === id ? updated : s)));
          // Refresh stats after decision update
          const newStats = await getSponsorshipStats();
          setStats(newStats);
        }
        return updated;
      } catch (err) {
        console.error('Failed to update sponsorship:', err);
        return null;
      }
    },
    []
  );

  const removeSponsorship = useCallback(async (id: string): Promise<boolean> => {
    try {
      const success = await deleteSponsorship(id);
      if (success) {
        setSponsorships((prev) => prev.filter((s) => s.id !== id));
        const newStats = await getSponsorshipStats();
        setStats(newStats);
      }
      return success;
    } catch (err) {
      console.error('Failed to delete sponsorship:', err);
      return false;
    }
  }, []);

  return {
    sponsorships,
    stats,
    loading,
    error,
    refresh,
    addSponsorship,
    updateDecision,
    removeSponsorship,
  };
}
