/**
 * Storage Service
 * Supabase Storage for persona images, audio, and other assets
 */

import { supabase } from '@/lib/supabase';

const BUCKET_NAME = 'persona-assets';

export type AssetType = 'avatar' | 'expression' | 'voiceover' | 'video' | 'other';

/**
 * Build a storage path for an asset
 * Format: {personaId}/{assetType}/{filename}
 */
function buildPath(personaId: string, assetType: AssetType, filename: string): string {
  return `${personaId}/${assetType}/${filename}`;
}

/**
 * Upload a file to persona assets storage
 */
export async function uploadAsset(
  personaId: string,
  assetType: AssetType,
  file: File
): Promise<string | null> {
  const timestamp = Date.now();
  const extension = file.name.split('.').pop() ?? 'bin';
  const filename = `${timestamp}.${extension}`;
  const path = buildPath(personaId, assetType, filename);

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('Error uploading asset:', error);
    return null;
  }

  return getPublicUrl(path);
}

/**
 * Get public URL for an asset
 */
export function getPublicUrl(path: string): string {
  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * List all assets for a persona by type
 */
export async function listPersonaAssets(
  personaId: string,
  assetType: AssetType
): Promise<string[]> {
  const folderPath = `${personaId}/${assetType}`;

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .list(folderPath);

  if (error) {
    console.error('Error listing assets:', error);
    return [];
  }

  if (!data) {
    return [];
  }

  return data
    .filter((item) => item.name !== '.emptyFolderPlaceholder')
    .map((item) => getPublicUrl(`${folderPath}/${item.name}`));
}

/**
 * Delete an asset
 */
export async function deleteAsset(path: string): Promise<boolean> {
  const { error } = await supabase.storage.from(BUCKET_NAME).remove([path]);

  if (error) {
    console.error('Error deleting asset:', error);
    return false;
  }

  return true;
}

/**
 * Upload avatar and update persona record
 */
export async function uploadPersonaAvatar(
  personaId: string,
  file: File
): Promise<string | null> {
  const url = await uploadAsset(personaId, 'avatar', file);

  if (!url) {
    return null;
  }

  // Update the persona record with the new avatar URL
  const updateData = {
    avatar_url: url,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from('personas')
    .update(updateData as never)
    .eq('id', personaId);

  if (error) {
    console.error('Error updating persona avatar:', error);
    // Still return URL even if DB update fails
  }

  return url;
}
