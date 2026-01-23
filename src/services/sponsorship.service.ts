/**
 * Sponsorship Service
 * CRUD operations for sponsorship tracking and analysis
 */

import { supabase } from '@/lib/supabase';
import type { Database } from '@/lib/database.types';

type SponsorshipRow = Database['public']['Tables']['sponsorships']['Row'];
type SponsorshipInsert = Database['public']['Tables']['sponsorships']['Insert'];
type SponsorshipUpdate = Database['public']['Tables']['sponsorships']['Update'];

export type SponsorshipStatus = 'pending' | 'accepted' | 'declined' | 'negotiating';
export type ContactMethod = 'dm' | 'email' | 'comment' | 'other';
export type CompensationType = 'cash' | 'product' | 'affiliate' | 'hybrid';

export interface SponsorshipInput {
  persona_id: string;
  inquiry_date: Date;
  brand_name: string;
  brand_category?: string;
  contact_method?: ContactMethod;
  inquiry_notes?: string;
  status?: SponsorshipStatus;
  followers_at_inquiry?: number;
  engagement_rate_at_inquiry?: number;
}

export interface SponsorshipDecision {
  status: SponsorshipStatus;
  decision_date?: Date;
  decline_reason?: string;
  compensation_type?: CompensationType;
  compensation_value?: number;
  deliverables?: string;
  exclusivity_days?: number;
}

/**
 * Create a new sponsorship inquiry
 */
export async function createSponsorship(input: SponsorshipInput): Promise<SponsorshipRow | null> {
  const inquiryDateStr = input.inquiry_date.toISOString().slice(0, 10);
  const insertData: SponsorshipInsert = {
    persona_id: input.persona_id,
    inquiry_date: inquiryDateStr,
    brand_name: input.brand_name,
    brand_category: input.brand_category ?? null,
    contact_method: input.contact_method ?? null,
    inquiry_notes: input.inquiry_notes ?? null,
    status: input.status ?? 'pending',
    followers_at_inquiry: input.followers_at_inquiry ?? null,
    engagement_rate_at_inquiry: input.engagement_rate_at_inquiry ?? null,
  };

  const { data, error } = await supabase
    .from('sponsorships')
    .insert(insertData as never)
    .select()
    .single();

  if (error) {
    console.error('Error creating sponsorship:', error);
    throw error;
  }

  return data as SponsorshipRow | null;
}

/**
 * Update sponsorship with decision
 */
export async function updateSponsorshipDecision(
  id: string,
  decision: SponsorshipDecision
): Promise<SponsorshipRow | null> {
  const updateData: SponsorshipUpdate = {
    status: decision.status,
    decision_date: decision.decision_date?.toISOString().split('T')[0] ?? null,
    decline_reason: decision.decline_reason ?? null,
    compensation_type: decision.compensation_type ?? null,
    compensation_value: decision.compensation_value ?? null,
    deliverables: decision.deliverables ?? null,
    exclusivity_days: decision.exclusivity_days ?? null,
  };

  const { data, error } = await supabase
    .from('sponsorships')
    .update(updateData as never)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating sponsorship:', error);
    throw error;
  }

  return data as SponsorshipRow | null;
}

/**
 * Link sponsorship to a post
 */
export async function linkSponsorshipToPost(
  sponsorshipId: string,
  postId: string
): Promise<boolean> {
  const { error } = await supabase
    .from('sponsorships')
    .update({ post_id: postId } as never)
    .eq('id', sponsorshipId);

  if (error) {
    console.error('Error linking sponsorship to post:', error);
    return false;
  }

  return true;
}

/**
 * Get all sponsorships
 */
export async function getAllSponsorships(): Promise<SponsorshipRow[]> {
  const { data, error } = await supabase
    .from('sponsorships')
    .select('*')
    .order('inquiry_date', { ascending: false });

  if (error) {
    console.error('Error fetching sponsorships:', error);
    return [];
  }

  return (data as SponsorshipRow[] | null) ?? [];
}

/**
 * Get sponsorships by persona
 */
export async function getSponsorshipsByPersona(personaId: string): Promise<SponsorshipRow[]> {
  const { data, error } = await supabase
    .from('sponsorships')
    .select('*')
    .eq('persona_id', personaId)
    .order('inquiry_date', { ascending: false });

  if (error) {
    console.error('Error fetching sponsorships:', error);
    return [];
  }

  return (data as SponsorshipRow[] | null) ?? [];
}

/**
 * Get sponsorships by status
 */
export async function getSponsorshipsByStatus(status: SponsorshipStatus): Promise<SponsorshipRow[]> {
  const { data, error } = await supabase
    .from('sponsorships')
    .select('*')
    .eq('status', status)
    .order('inquiry_date', { ascending: false });

  if (error) {
    console.error('Error fetching sponsorships:', error);
    return [];
  }

  return (data as SponsorshipRow[] | null) ?? [];
}

/**
 * Delete a sponsorship
 */
export async function deleteSponsorship(id: string): Promise<boolean> {
  const { error } = await supabase.from('sponsorships').delete().eq('id', id);

  if (error) {
    console.error('Error deleting sponsorship:', error);
    return false;
  }

  return true;
}

/**
 * Get sponsorship stats summary
 */
export async function getSponsorshipStats(): Promise<{
  total: number;
  pending: number;
  accepted: number;
  declined: number;
  totalRevenue: number;
}> {
  const { data, error } = await supabase.from('sponsorships').select('status, compensation_value');

  if (error) {
    console.error('Error fetching sponsorship stats:', error);
    return { total: 0, pending: 0, accepted: 0, declined: 0, totalRevenue: 0 };
  }

  const sponsorships = (data as Array<{ status: string; compensation_value: number | null }>) ?? [];

  return {
    total: sponsorships.length,
    pending: sponsorships.filter((s) => s.status === 'pending').length,
    accepted: sponsorships.filter((s) => s.status === 'accepted').length,
    declined: sponsorships.filter((s) => s.status === 'declined').length,
    totalRevenue: sponsorships
      .filter((s) => s.status === 'accepted' && s.compensation_value)
      .reduce((sum, s) => sum + (s.compensation_value ?? 0), 0),
  };
}
