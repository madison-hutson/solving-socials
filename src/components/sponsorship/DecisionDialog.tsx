/**
 * DecisionDialog Component
 * Dialog for recording sponsorship decisions (accept/decline)
 */

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Typography,
  Divider,
} from '@mui/material';
import type { SponsorshipDecision, SponsorshipStatus, CompensationType } from '@/services/sponsorship.service';

const COMPENSATION_TYPES: CompensationType[] = ['cash', 'product', 'affiliate', 'hybrid'];
const DECLINE_REASONS = [
  'Brand misalignment',
  'Compensation too low',
  'Exclusivity too restrictive',
  'Would conflict with AI disclosure',
  'Health/supplement claims',
  'Too early in experiment',
  'Other',
];

interface DecisionDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (decision: SponsorshipDecision) => Promise<boolean>;
  brandName: string;
}

export function DecisionDialog({
  open,
  onClose,
  onSubmit,
  brandName,
}: DecisionDialogProps): React.ReactElement {
  const [status, setStatus] = useState<SponsorshipStatus>('pending');
  const [decisionDate, setDecisionDate] = useState(new Date().toISOString().split('T')[0]);
  const [declineReason, setDeclineReason] = useState('');
  const [compensationType, setCompensationType] = useState<CompensationType>('cash');
  const [compensationValue, setCompensationValue] = useState('');
  const [deliverables, setDeliverables] = useState('');
  const [exclusivityDays, setExclusivityDays] = useState('0');

  const resetForm = () => {
    setStatus('pending');
    setDecisionDate(new Date().toISOString().split('T')[0]);
    setDeclineReason('');
    setCompensationType('cash');
    setCompensationValue('');
    setDeliverables('');
    setExclusivityDays('0');
  };

  const handleSubmit = async () => {
    const parsedDate = decisionDate ? new Date(decisionDate) : new Date();
    const decision: SponsorshipDecision = {
      status,
      decision_date: parsedDate,
    };

    if (status === 'declined') {
      decision.decline_reason = declineReason || undefined;
    }

    if (status === 'accepted') {
      decision.compensation_type = compensationType;
      decision.compensation_value = compensationValue ? parseFloat(compensationValue) : undefined;
      decision.deliverables = deliverables || undefined;
      decision.exclusivity_days = exclusivityDays ? parseInt(exclusivityDays, 10) : 0;
    }

    const success = await onSubmit(decision);
    if (success) {
      resetForm();
      onClose();
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Record Decision: {brandName}</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <FormControl fullWidth>
            <InputLabel>Decision</InputLabel>
            <Select
              value={status}
              label="Decision"
              onChange={(e) => setStatus(e.target.value as SponsorshipStatus)}
            >
              <MenuItem value="accepted">Accept</MenuItem>
              <MenuItem value="declined">Decline</MenuItem>
              <MenuItem value="negotiating">Still Negotiating</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Decision Date"
            type="date"
            value={decisionDate}
            onChange={(e) => setDecisionDate(e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
          />

          {status === 'declined' && (
            <>
              <Divider />
              <Typography variant="subtitle2" color="text.secondary">
                Decline Details
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Reason</InputLabel>
                <Select
                  value={declineReason}
                  label="Reason"
                  onChange={(e) => setDeclineReason(e.target.value)}
                >
                  {DECLINE_REASONS.map((reason) => (
                    <MenuItem key={reason} value={reason}>
                      {reason}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}

          {status === 'accepted' && (
            <>
              <Divider />
              <Typography variant="subtitle2" color="text.secondary">
                Deal Terms
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Compensation Type</InputLabel>
                <Select
                  value={compensationType}
                  label="Compensation Type"
                  onChange={(e) => setCompensationType(e.target.value as CompensationType)}
                >
                  {COMPENSATION_TYPES.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Compensation Value (USD)"
                type="number"
                value={compensationValue}
                onChange={(e) => setCompensationValue(e.target.value)}
                placeholder="0.00"
              />

              <TextField
                label="Deliverables"
                value={deliverables}
                onChange={(e) => setDeliverables(e.target.value)}
                placeholder="e.g., 1 reel + 2 stories"
              />

              <TextField
                label="Exclusivity Days"
                type="number"
                value={exclusivityDays}
                onChange={(e) => setExclusivityDays(e.target.value)}
                helperText="Days you can't promote competitors (0 = none)"
              />
            </>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          color={status === 'declined' ? 'error' : 'primary'}
        >
          {status === 'accepted' ? 'Accept Deal' : status === 'declined' ? 'Decline' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
