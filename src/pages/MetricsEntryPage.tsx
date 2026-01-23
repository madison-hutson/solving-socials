/**
 * Metrics Entry Page
 * Manual entry form for daily/weekly metrics snapshots
 */

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  MenuItem,
  Alert,
  Snackbar,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from '@mui/material';
import { AppShell } from '@/components/layout';
import { usePersonas } from '@/hooks/usePersonas';
import { useMetrics } from '@/hooks/useMetrics';
import type { Database } from '@/lib/database.types';

type MetricsRow = Database['public']['Tables']['metrics']['Row'];

export function MetricsEntryPage(): React.ReactElement {
  const { personas, loading: personasLoading } = usePersonas();
  const { record, recording, fetchHistory } = useMetrics();

  const [selectedPersonaId, setSelectedPersonaId] = useState('');
  const [followers, setFollowers] = useState('');
  const [engagementRate, setEngagementRate] = useState('');
  const [avgLikes, setAvgLikes] = useState('');
  const [notes, setNotes] = useState('');
  const [history, setHistory] = useState<MetricsRow[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  // Load history when persona changes
  useEffect(() => {
    if (selectedPersonaId) {
      setHistoryLoading(true);
      fetchHistory(selectedPersonaId).then((data) => {
        setHistory(data);
        setHistoryLoading(false);
      });
    } else {
      setHistory([]);
    }
  }, [selectedPersonaId, fetchHistory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPersonaId || !followers) {
      setSnackbar({ open: true, message: 'Please select a persona and enter followers', severity: 'error' });
      return;
    }

    const result = await record({
      persona_id: selectedPersonaId,
      followers: parseInt(followers, 10),
      engagement_rate: engagementRate ? parseFloat(engagementRate) : null,
      avg_likes: avgLikes ? parseInt(avgLikes, 10) : null,
      notes: notes || null,
    });

    if (result) {
      setSnackbar({ open: true, message: 'Metrics recorded successfully!', severity: 'success' });
      setFollowers('');
      setEngagementRate('');
      setAvgLikes('');
      setNotes('');
      // Refresh history
      const newHistory = await fetchHistory(selectedPersonaId);
      setHistory(newHistory);
    } else {
      setSnackbar({ open: true, message: 'Failed to record metrics', severity: 'error' });
    }
  };

  const selectedPersona = personas.find((p) => p.id === selectedPersonaId);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <AppShell title="Metrics Entry">
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Record Metrics
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Enter metrics from Instagram Insights. Each entry is a point-in-time snapshot.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                New Entry
              </Typography>
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  select
                  fullWidth
                  label="Persona"
                  value={selectedPersonaId}
                  onChange={(e) => setSelectedPersonaId(e.target.value)}
                  margin="normal"
                  disabled={personasLoading}
                >
                  {personas.map((p) => (
                    <MenuItem key={p.id} value={p.id}>
                      {p.name} (@{p.handle})
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  fullWidth
                  label="Followers"
                  type="number"
                  value={followers}
                  onChange={(e) => setFollowers(e.target.value)}
                  margin="normal"
                  required
                  placeholder="e.g., 150"
                />

                <TextField
                  fullWidth
                  label="Engagement Rate (%)"
                  type="number"
                  value={engagementRate}
                  onChange={(e) => setEngagementRate(e.target.value)}
                  margin="normal"
                  placeholder="e.g., 5.2"
                  inputProps={{ step: '0.1' }}
                />

                <TextField
                  fullWidth
                  label="Avg Likes per Post"
                  type="number"
                  value={avgLikes}
                  onChange={(e) => setAvgLikes(e.target.value)}
                  margin="normal"
                  placeholder="e.g., 25"
                />

                <TextField
                  fullWidth
                  label="Notes"
                  multiline
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  margin="normal"
                  placeholder="e.g., Posted viral reel today"
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2 }}
                  disabled={recording || !selectedPersonaId}
                >
                  {recording ? <CircularProgress size={24} /> : 'Record Metrics'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent History {selectedPersona && `- ${selectedPersona.name}`}
              </Typography>

              {!selectedPersonaId && (
                <Typography color="text.secondary">
                  Select a persona to view history
                </Typography>
              )}

              {selectedPersonaId && historyLoading && (
                <Box display="flex" justifyContent="center" py={4}>
                  <CircularProgress />
                </Box>
              )}

              {selectedPersonaId && !historyLoading && history.length === 0 && (
                <Alert severity="info">No metrics recorded yet for this persona.</Alert>
              )}

              {selectedPersonaId && !historyLoading && history.length > 0 && (
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell align="right">Followers</TableCell>
                        <TableCell align="right">Eng. %</TableCell>
                        <TableCell align="right">Avg Likes</TableCell>
                        <TableCell>Notes</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {history.slice(0, 10).map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>{formatDate(row.recorded_at)}</TableCell>
                          <TableCell align="right">{row.followers}</TableCell>
                          <TableCell align="right">
                            {row.engagement_rate ? `${row.engagement_rate}%` : '—'}
                          </TableCell>
                          <TableCell align="right">{row.avg_likes ?? '—'}</TableCell>
                          <TableCell sx={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {row.notes ?? '—'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </AppShell>
  );
}
