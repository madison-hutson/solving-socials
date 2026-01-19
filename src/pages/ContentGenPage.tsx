/**
 * Content Generation Page
 * Claude-powered content generation for personas
 */

import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { AppShell } from '@/components/layout';

export function ContentGenPage(): React.ReactElement {
  return (
    <AppShell title="Content Generation">
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Generate Content
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Generate on-brand content for each persona using Claude API.
        </Typography>
      </Box>
      <Card>
        <CardContent>
          <Typography color="text.secondary">
            Content generation coming in Phase 6.
          </Typography>
        </CardContent>
      </Card>
    </AppShell>
  );
}
