/**
 * AppShell Layout Component
 * Main layout wrapper with sidebar and header
 */

import React from 'react';
import { Box, Toolbar } from '@mui/material';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

const DRAWER_WIDTH = 240;

interface AppShellProps {
  title: string;
  children: React.ReactNode;
}

export function AppShell({ title, children }: AppShellProps): React.ReactElement {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Header title={title} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${DRAWER_WIDTH}px)`,
          ml: `${DRAWER_WIDTH}px`,
          backgroundColor: 'background.default',
        }}
      >
        <Toolbar /> {/* Spacer for fixed header */}
        {children}
      </Box>
    </Box>
  );
}
