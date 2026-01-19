/**
 * Header Component
 * Top bar with page title and actions
 */

import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Chip } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

const DRAWER_WIDTH = 240;

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps): React.ReactElement {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        ml: `${DRAWER_WIDTH}px`,
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar>
        <Typography variant="h5" component="h1" fontWeight={600} sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip
            label="Experiment: Phase 1"
            size="small"
            color="primary"
            variant="outlined"
          />
          <IconButton
            color="inherit"
            href="https://github.com/madison-hutson/solving-socials"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository"
          >
            <GitHubIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
