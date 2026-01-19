/**
 * Metrics Entry Page
 * Manual entry form for daily/weekly metrics snapshots
 */

import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { AppShell } from '@/components/layout';

export function MetricsEntryPage(): React.ReactElement {
  return (
    <AppShell title="Metrics Entry">
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Record Metrics
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Enter daily metrics snapshots for each persona. Metrics are point-in-time and never overwritten.
        </Typography>
      </Box>
      <Card>
        <CardContent>
          <Typography color="text.secondary">
            Metrics entry form coming in Phase 3.
          </Typography>
        </CardContent>
      </Card>
    </AppShell>
  );
}
