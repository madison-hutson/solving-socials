/**
 * PostFormDialog Component
 * Dialog for creating new posts
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
import type { PostInput, ContentType, PostStatus } from '@/services/posts.service';

const CONTENT_TYPES: ContentType[] = ['reel', 'carousel', 'static', 'story'];

interface Persona {
  id: string;
  name: string;
  handle: string;
}

interface PostFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (input: PostInput) => Promise<boolean>;
  personas: Persona[];
}

export function PostFormDialog({ open, onClose, onSubmit, personas }: PostFormDialogProps): React.ReactElement {
  const [formPersona, setFormPersona] = useState('');
  const [formType, setFormType] = useState<ContentType>('reel');
  const [formCaption, setFormCaption] = useState('');
  const [formHashtags, setFormHashtags] = useState('');
  const [formScheduled, setFormScheduled] = useState('');
  const [formStatus, setFormStatus] = useState<PostStatus>('draft');

  const resetForm = () => {
    setFormPersona('');
    setFormType('reel');
    setFormCaption('');
    setFormHashtags('');
    setFormScheduled('');
    setFormStatus('draft');
  };

  const handleSubmit = async () => {
    if (!formPersona) return;

    const input: PostInput = {
      persona_id: formPersona,
      content_type: formType,
      caption: formCaption || undefined,
      hashtags: formHashtags ? formHashtags.split(',').map((h) => h.trim()) : undefined,
      scheduled_for: formScheduled ? new Date(formScheduled) : undefined,
      status: formStatus,
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
      <DialogTitle>Create New Post</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <FormControl fullWidth>
            <InputLabel>Persona</InputLabel>
            <Select value={formPersona} label="Persona" onChange={(e) => setFormPersona(e.target.value)}>
              {personas.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.name} (@{p.handle})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Content Type</InputLabel>
            <Select
              value={formType}
              label="Content Type"
              onChange={(e) => setFormType(e.target.value as ContentType)}
            >
              {CONTENT_TYPES.map((t) => (
                <MenuItem key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Caption"
            multiline
            rows={3}
            value={formCaption}
            onChange={(e) => setFormCaption(e.target.value)}
            placeholder="Write your post caption..."
          />

          <TextField
            label="Hashtags"
            value={formHashtags}
            onChange={(e) => setFormHashtags(e.target.value)}
            placeholder="gaming, valorant, clips (comma-separated)"
            helperText="Separate hashtags with commas"
          />

          <TextField
            label="Scheduled For"
            type="datetime-local"
            value={formScheduled}
            onChange={(e) => setFormScheduled(e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
          />

          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={formStatus}
              label="Status"
              onChange={(e) => setFormStatus(e.target.value as PostStatus)}
            >
              <MenuItem value="draft">Draft</MenuItem>
              <MenuItem value="scheduled">Scheduled</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={!formPersona}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
