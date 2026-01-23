/**
 * Analytics Page
 * Charts and insights for persona performance comparison
 */

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Alert,
  Chip,
  Stack,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { AppShell } from '@/components/layout';
import { GrowthChart, EngagementChart } from '@/components/charts';
import {
  getAllMetricsForCharts,
  transformToGrowthData,
  getLatestEngagementRates,
  calculateGrowthRate,
} from '@/services/analytics.service';

interface PersonaSummary {
  name: string;
  followers: number;
  growthRate: number | null;
  color: string;
}

export function AnalyticsPage(): React.ReactElement {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [growthData, setGrowthData] = useState<Array<{ date: string; [key: string]: string | number }>>([]);
  const [engagementData, setEngagementData] = useState<Array<{ name: string; engagement: number; color: string }>>([]);
  const [personaConfigs, setPersonaConfigs] = useState<Array<{ name: string; color: string }>>([]);
  const [summaries, setSummaries] = useState<PersonaSummary[]>([]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        const personaData = await getAllMetricsForCharts();

        // Transform for growth chart
        const growth = transformToGrowthData(personaData);
        setGrowthData(growth);

        // Get persona configs for chart colors
        const configs = personaData.map((pd) => {
          const colors = pd.persona.colors as { accent?: string } | null;
          return {
            name: pd.persona.name,
            color: colors?.accent ?? '#6366f1',
          };
        });
        setPersonaConfigs(configs);

        // Get engagement comparison data
        const engagement = getLatestEngagementRates(personaData);
        setEngagementData(engagement);

        // Build summaries
        const sums: PersonaSummary[] = personaData.map((pd) => {
          const colors = pd.persona.colors as { accent?: string } | null;
          const lastMetric = pd.metrics[pd.metrics.length - 1];
          return {
            name: pd.persona.name,
            followers: lastMetric?.followers ?? 0,
            growthRate: calculateGrowthRate(pd.metrics),
            color: colors?.accent ?? '#6366f1',
          };
        });
        setSummaries(sums);
      } catch (err) {
        setError('Failed to load analytics data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    void loadData();
  }, []);

  return (
    <AppShell title="Analytics">
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Performance Analytics
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Compare growth and engagement across all personas.
        </Typography>
      </Box>

      {loading && (
        <Box display="flex" justifyContent="center" py={8}>
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && (
        <>
          {/* Summary Cards */}
          <Grid container spacing={2} mb={4}>
            {summaries.map((s) => (
              <Grid key={s.name} size={{ xs: 6, sm: 4, md: 2.4 }}>
                <Card>
                  <CardContent sx={{ py: 2 }}>
                    <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          bgcolor: s.color,
                        }}
                      />
                      <Typography variant="subtitle2">{s.name}</Typography>
                    </Stack>
                    <Typography variant="h5">{s.followers.toLocaleString()}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      followers
                    </Typography>
                    {s.growthRate !== null && (
                      <Chip
                        size="small"
                        icon={s.growthRate >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
                        label={`${s.growthRate >= 0 ? '+' : ''}${s.growthRate.toFixed(1)}%`}
                        color={s.growthRate >= 0 ? 'success' : 'error'}
                        sx={{ mt: 1 }}
                      />
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Charts */}
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, lg: 7 }}>
              <Card>
                <CardContent>
                  <GrowthChart data={growthData} personas={personaConfigs} />
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, lg: 5 }}>
              <Card>
                <CardContent>
                  <EngagementChart data={engagementData} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {growthData.length === 0 && (
            <Alert severity="info" sx={{ mt: 3 }}>
              No metrics data yet. Record some metrics in the Metrics Entry page to see charts.
            </Alert>
          )}
        </>
      )}
    </AppShell>
  );
}
