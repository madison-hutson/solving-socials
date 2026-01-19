/**
 * Dashboard Page
 * Shows overview of all personas with key metrics from Supabase
 */

import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Avatar,
  Stack,
  CircularProgress,
  Alert,
} from '@mui/material';
import { AppShell } from '@/components/layout';
import { usePersonas } from '@/hooks/usePersonas';
import type { PersonaWithMetrics } from '@/services/persona.service';

interface ColorsJson {
  primary?: string;
  secondary?: string;
  accent?: string;
}

function getAccentColor(colors: unknown): string {
  if (colors && typeof colors === 'object' && 'accent' in colors) {
    return (colors as ColorsJson).accent ?? '#6366f1';
  }
  return '#6366f1';
}

function formatNumber(num: number | null | undefined): string {
  if (num === null || num === undefined) return '—';
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

function formatEngagement(rate: number | null | undefined): string {
  if (rate === null || rate === undefined) return '—';
  return `${rate.toFixed(1)}%`;
}

function PersonaCard({ persona }: { persona: PersonaWithMetrics }): React.ReactElement {
  const accentColor = getAccentColor(persona.colors);
  const metrics = persona.latest_metrics;

  return (
    <Card
      sx={{
        height: '100%',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
          <Avatar
            src={persona.avatar_url ?? undefined}
            sx={{
              bgcolor: accentColor,
              width: 56,
              height: 56,
              fontSize: '1.5rem',
            }}
          >
            {persona.has_face ? persona.name[0] : '⚡'}
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              {persona.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              @{persona.handle}
            </Typography>
          </Box>
        </Stack>
        <Stack direction="row" spacing={1} mb={2} flexWrap="wrap" useFlexGap>
          {persona.niche && <Chip label={persona.niche} size="small" />}
          {persona.tone && <Chip label={persona.tone} size="small" variant="outlined" />}
          {!persona.has_face && <Chip label="No Face" size="small" color="info" />}
        </Stack>
        <Box sx={{ borderTop: 1, borderColor: 'divider', pt: 2 }}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <Typography variant="caption" color="text.secondary">
                Followers
              </Typography>
              <Typography variant="h6">{formatNumber(metrics?.followers)}</Typography>
            </Grid>
            <Grid size={6}>
              <Typography variant="caption" color="text.secondary">
                Engagement
              </Typography>
              <Typography variant="h6">
                {formatEngagement(metrics?.engagement_rate)}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}

export function DashboardPage(): React.ReactElement {
  const { personas, loading, error } = usePersonas();

  return (
    <AppShell title="Dashboard">
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Persona Overview
        </Typography>
        <Typography variant="body1" color="text.secondary">
          All 5 AI personas for the Instagram experiment. Metrics will populate once accounts are active.
        </Typography>
      </Box>

      {loading && (
        <Box display="flex" justifyContent="center" py={8}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Failed to load personas: {error.message}
        </Alert>
      )}

      {!loading && !error && personas.length === 0 && (
        <Alert severity="info">
          No personas found. Run the seed SQL to populate the database.
        </Alert>
      )}

      {!loading && personas.length > 0 && (
        <Grid container spacing={3}>
          {personas.map((persona) => (
            <Grid key={persona.id} size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
              <PersonaCard persona={persona} />
            </Grid>
          ))}
        </Grid>
      )}
    </AppShell>
  );
}
