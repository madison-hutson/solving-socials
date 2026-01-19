/**
 * Analytics Page
 * Charts and insights for persona performance comparison
 */

import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { AppShell } from '@/components/layout';

export function AnalyticsPage(): React.ReactElement {
  return (
    <AppShell title="Analytics">
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Performance Analytics
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Compare growth rates, engagement, and content performance across personas.
        </Typography>
      </Box>
      <Card>
        <CardContent>
          <Typography color="text.secondary">
            Analytics charts coming in Phase 5.
          </Typography>
        </CardContent>
      </Card>
    </AppShell>
  );
}
