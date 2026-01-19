/**
 * Calendar Page
 * Content scheduling and posting calendar view
 */

import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { AppShell } from '@/components/layout';

export function CalendarPage(): React.ReactElement {
  return (
    <AppShell title="Content Calendar">
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Content Calendar
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Schedule and track posts across all personas. 5 posts/week per persona.
        </Typography>
      </Box>
      <Card>
        <CardContent>
          <Typography color="text.secondary">
            Calendar view coming in Phase 4.
          </Typography>
        </CardContent>
      </Card>
    </AppShell>
  );
}
