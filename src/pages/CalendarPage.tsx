/**
 * Calendar Page
 * Content scheduling and posting calendar view
 */

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Stack,
  CircularProgress,
  Alert,
  Snackbar,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import { AppShell } from '@/components/layout';
import { PostFormDialog } from '@/components/calendar';
import { usePosts } from '@/hooks/usePosts';
import { usePersonas } from '@/hooks/usePersonas';
import type { PostInput } from '@/services/posts.service';

function getStatusColor(status: string): 'default' | 'warning' | 'success' {
  switch (status) {
    case 'posted':
      return 'success';
    case 'scheduled':
      return 'warning';
    default:
      return 'default';
  }
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function CalendarPage(): React.ReactElement {
  const { personas, loading: personasLoading } = usePersonas();
  const [filterPersona, setFilterPersona] = useState<string>('all');
  const { posts, loading, error, addPost, removePost, setPosted } = usePosts(
    filterPersona === 'all' ? undefined : filterPersona
  );

  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleCreate = async (input: PostInput): Promise<boolean> => {
    const result = await addPost(input);
    if (result) {
      setSnackbar({ open: true, message: 'Post created successfully', severity: 'success' });
      return true;
    } else {
      setSnackbar({ open: true, message: 'Failed to create post', severity: 'error' });
      return false;
    }
  };

  const handleMarkPosted = async (id: string) => {
    const success = await setPosted(id);
    if (success) {
      setSnackbar({ open: true, message: 'Marked as posted', severity: 'success' });
    } else {
      setSnackbar({ open: true, message: 'Failed to update post', severity: 'error' });
    }
  };

  const handleDelete = async (id: string) => {
    const success = await removePost(id);
    if (success) {
      setSnackbar({ open: true, message: 'Post deleted', severity: 'success' });
    } else {
      setSnackbar({ open: true, message: 'Failed to delete post', severity: 'error' });
    }
  };

  const getPersonaName = (id: string): string => {
    return personas.find((p) => p.id === id)?.name ?? 'Unknown';
  };

  const getPersonaColor = (id: string): string => {
    const persona = personas.find((p) => p.id === id);
    const colors = persona?.colors as { accent?: string } | null;
    return colors?.accent ?? '#6366f1';
  };

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

      {/* Controls */}
      <Stack direction="row" spacing={2} mb={3} alignItems="center">
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Persona</InputLabel>
          <Select
            value={filterPersona}
            label="Filter by Persona"
            onChange={(e) => setFilterPersona(e.target.value)}
          >
            <MenuItem value="all">All Personas</MenuItem>
            {personas.map((p) => (
              <MenuItem key={p.id} value={p.id}>
                {p.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setDialogOpen(true)}>
          New Post
        </Button>
      </Stack>

      {/* Loading/Error States */}
      {(loading || personasLoading) && (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {/* Posts Table */}
      {!loading && !error && (
        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Persona</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Caption</TableCell>
                  <TableCell>Scheduled</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {posts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography color="text.secondary" py={2}>
                        No posts yet. Click "New Post" to create one.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  posts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Box
                            sx={{
                              width: 10,
                              height: 10,
                              borderRadius: '50%',
                              bgcolor: getPersonaColor(post.persona_id),
                            }}
                          />
                          <Typography variant="body2">{getPersonaName(post.persona_id)}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Chip label={post.content_type} size="small" variant="outlined" />
                      </TableCell>
                      <TableCell sx={{ maxWidth: 200 }}>
                        <Typography variant="body2" noWrap>
                          {post.caption ?? '-'}
                        </Typography>
                      </TableCell>
                      <TableCell>{formatDate(post.scheduled_for)}</TableCell>
                      <TableCell>
                        <Chip label={post.status} size="small" color={getStatusColor(post.status)} />
                      </TableCell>
                      <TableCell align="right">
                        {post.status !== 'posted' && (
                          <IconButton
                            size="small"
                            color="success"
                            onClick={() => handleMarkPosted(post.id)}
                            title="Mark as posted"
                          >
                            <CheckIcon fontSize="small" />
                          </IconButton>
                        )}
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(post.id)}
                          title="Delete"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {/* Create Post Dialog */}
      <PostFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleCreate}
        personas={personas}
      />

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar((s) => ({ ...s, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </AppShell>
  );
}
