/**
 * SponsorshipFormDialog Component
 * Dialog for logging new sponsorship inquiries
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
} from '@mui/material';
import type { SponsorshipInput, ContactMethod } from '@/services/sponsorship.service';

const CONTACT_METHODS: ContactMethod[] = ['dm', 'email', 'comment', 'other'];
const BRAND_CATEGORIES = [
  'gaming peripheral',
  'gaming chair',
  'energy drink',
  'wellness app',
  'supplement',
  'fashion',
  'tech',
  'finance',
  'other',
];

interface Persona {
  id: string;
  name: string;
}

interface SponsorshipFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (input: SponsorshipInput) => Promise<boolean>;
  personas: Persona[];
  currentMetrics?: { followers: number; engagementRate: number };
}

export function SponsorshipFormDialog({
  open,
  onClose,
  onSubmit,
  personas,
  currentMetrics,
}: SponsorshipFormDialogProps): React.ReactElement {
  const [personaId, setPersonaId] = useState('');
  const [inquiryDate, setInquiryDate] = useState(new Date().toISOString().split('T')[0]);
  const [brandName, setBrandName] = useState('');
  const [brandCategory, setBrandCategory] = useState('');
  const [contactMethod, setContactMethod] = useState<ContactMethod>('dm');
  const [inquiryNotes, setInquiryNotes] = useState('');

  const resetForm = () => {
    setPersonaId('');
    setInquiryDate(new Date().toISOString().split('T')[0]);
    setBrandName('');
    setBrandCategory('');
    setContactMethod('dm');
    setInquiryNotes('');
  };

  const handleSubmit = async () => {
    if (!personaId || !brandName) return;

    const parsedDate = inquiryDate ? new Date(inquiryDate) : new Date();
    const input: SponsorshipInput = {
      persona_id: personaId,
      inquiry_date: parsedDate,
      brand_name: brandName,
      brand_category: brandCategory || undefined,
      contact_method: contactMethod,
      inquiry_notes: inquiryNotes || undefined,
      followers_at_inquiry: currentMetrics?.followers,
      engagement_rate_at_inquiry: currentMetrics?.engagementRate,
    };

    const success = await onSubmit(input);
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
      <DialogTitle>Log Sponsorship Inquiry</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <FormControl fullWidth>
            <InputLabel>Persona</InputLabel>
            <Select value={personaId} label="Persona" onChange={(e) => setPersonaId(e.target.value)}>
              {personas.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Inquiry Date"
            type="date"
            value={inquiryDate}
            onChange={(e) => setInquiryDate(e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
          />

          <TextField
            label="Brand Name"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="e.g., Razer, GFuel, Calm"
            required
          />

          <FormControl fullWidth>
            <InputLabel>Brand Category</InputLabel>
            <Select
              value={brandCategory}
              label="Brand Category"
              onChange={(e) => setBrandCategory(e.target.value)}
            >
              {BRAND_CATEGORIES.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Contact Method</InputLabel>
            <Select
              value={contactMethod}
              label="Contact Method"
              onChange={(e) => setContactMethod(e.target.value as ContactMethod)}
            >
              {CONTACT_METHODS.map((method) => (
                <MenuItem key={method} value={method}>
                  {method.toUpperCase()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Notes"
            multiline
            rows={3}
            value={inquiryNotes}
            onChange={(e) => setInquiryNotes(e.target.value)}
            placeholder="What did they say? Any specific asks?"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={!personaId || !brandName}>
          Log Inquiry
        </Button>
      </DialogActions>
    </Dialog>
  );
}
