/**
 * Sponsorship Page
 * Track sponsorship inquiries, decisions, and analyze impact
 */

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
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
  Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AppShell } from '@/components/layout';
import { SponsorshipFormDialog, DecisionDialog } from '@/components/sponsorship';
import { useSponsorships } from '@/hooks/useSponsorships';
import { usePersonas } from '@/hooks/usePersonas';
import type { SponsorshipInput, SponsorshipDecision } from '@/services/sponsorship.service';
import type { Database } from '@/lib/database.types';

type SponsorshipRow = Database['public']['Tables']['sponsorships']['Row'];

function getStatusColor(status: string): 'default' | 'warning' | 'success' | 'error' | 'info' {
  switch (status) {
    case 'accepted': return 'success';
    case 'declined': return 'error';
    case 'negotiating': return 'info';
    default: return 'warning';
  }
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatCurrency(value: number | null): string {
  if (value === null || value === undefined) return '-';
  return `$${value.toLocaleString()}`;
}

export function SponsorshipPage(): React.ReactElement {
  const { personas, loading: personasLoading } = usePersonas();
  const { sponsorships, stats, loading, error, addSponsorship, updateDecision, removeSponsorship } =
    useSponsorships();

  const [formOpen, setFormOpen] = useState(false);
  const [decisionOpen, setDecisionOpen] = useState(false);
  const [selectedSponsorship, setSelectedSponsorship] = useState<SponsorshipRow | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false, message: '', severity: 'success',
  });

  const handleCreate = async (input: SponsorshipInput): Promise<boolean> => {
    const result = await addSponsorship(input);
    if (result) {
      setSnackbar({ open: true, message: 'Sponsorship logged', severity: 'success' });
      return true;
    }
    setSnackbar({ open: true, message: 'Failed to log sponsorship', severity: 'error' });
    return false;
  };

  const handleDecision = async (decision: SponsorshipDecision): Promise<boolean> => {
    if (!selectedSponsorship) return false;
    const result = await updateDecision(selectedSponsorship.id, decision);
    if (result) {
      setSnackbar({ open: true, message: 'Decision recorded', severity: 'success' });
      return true;
    }
    setSnackbar({ open: true, message: 'Failed to record decision', severity: 'error' });
    return false;
  };

  const handleDelete = async (id: string) => {
    const success = await removeSponsorship(id);
    setSnackbar({
      open: true,
      message: success ? 'Sponsorship deleted' : 'Failed to delete',
      severity: success ? 'success' : 'error',
    });
  };

  const openDecisionDialog = (sponsorship: SponsorshipRow) => {
    setSelectedSponsorship(sponsorship);
    setDecisionOpen(true);
  };

  const getPersonaName = (id: string): string => personas.find((p) => p.id === id)?.name ?? 'Unknown';

  return (
    <AppShell title="Sponsorships">
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>Sponsorship Tracking</Typography>
        <Typography variant="body1" color="text.secondary">
          Log inquiries, record decisions, and analyze sponsorship impact on metrics.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={2} mb={4}>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Card><CardContent>
            <Typography variant="h4">{stats.total}</Typography>
            <Typography color="text.secondary">Total Inquiries</Typography>
          </CardContent></Card>
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Card><CardContent>
            <Typography variant="h4" color="warning.main">{stats.pending}</Typography>
            <Typography color="text.secondary">Pending</Typography>
          </CardContent></Card>
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Card><CardContent>
            <Typography variant="h4" color="success.main">{stats.accepted}</Typography>
            <Typography color="text.secondary">Accepted</Typography>
          </CardContent></Card>
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Card><CardContent>
            <Typography variant="h4" color="primary.main">{formatCurrency(stats.totalRevenue)}</Typography>
            <Typography color="text.secondary">Total Revenue</Typography>
          </CardContent></Card>
        </Grid>
      </Grid>

      <Stack direction="row" spacing={2} mb={3}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setFormOpen(true)}>
          Log Inquiry
        </Button>
      </Stack>

      {(loading || personasLoading) && (
        <Box display="flex" justifyContent="center" py={4}><CircularProgress /></Box>
      )}
      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && (
        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Persona</TableCell>
                  <TableCell>Brand</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Value</TableCell>
                  <TableCell>Followers</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sponsorships.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      <Typography color="text.secondary" py={2}>
                        No sponsorship inquiries yet.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  sponsorships.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell>{formatDate(s.inquiry_date)}</TableCell>
                      <TableCell>{getPersonaName(s.persona_id)}</TableCell>
                      <TableCell><Typography fontWeight="medium">{s.brand_name}</Typography></TableCell>
                      <TableCell>{s.brand_category ?? '-'}</TableCell>
                      <TableCell><Chip label={s.status} size="small" color={getStatusColor(s.status)} /></TableCell>
                      <TableCell>{formatCurrency(s.compensation_value)}</TableCell>
                      <TableCell>{s.followers_at_inquiry?.toLocaleString() ?? '-'}</TableCell>
                      <TableCell align="right">
                        {s.status === 'pending' && (
                          <IconButton size="small" onClick={() => openDecisionDialog(s)} title="Record decision">
                            <EditIcon fontSize="small" />
                          </IconButton>
                        )}
                        <IconButton size="small" color="error" onClick={() => handleDelete(s.id)} title="Delete">
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

      <SponsorshipFormDialog open={formOpen} onClose={() => setFormOpen(false)} onSubmit={handleCreate} personas={personas} />
      <DecisionDialog
        open={decisionOpen}
        onClose={() => { setDecisionOpen(false); setSelectedSponsorship(null); }}
        onSubmit={handleDecision}
        brandName={selectedSponsorship?.brand_name ?? ''}
      />
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar((s) => ({ ...s, open: false }))}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar((s) => ({ ...s, open: false }))}>{snackbar.message}</Alert>
      </Snackbar>
    </AppShell>
  );
}
