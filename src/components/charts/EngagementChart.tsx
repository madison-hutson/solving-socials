/**
 * EngagementChart Component
 * Bar chart comparing engagement rates across personas
 */

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Box, Typography } from '@mui/material';

interface EngagementData {
  name: string;
  engagement: number;
  color: string;
}

interface EngagementChartProps {
  data: EngagementData[];
  title?: string;
}

export function EngagementChart({ data, title = 'Engagement Rate Comparison' }: EngagementChartProps): React.ReactElement {
  if (data.length === 0) {
    return (
      <Box py={4} textAlign="center">
        <Typography color="text.secondary">No engagement data yet</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {title && (
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
      )}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
          <YAxis stroke="#94a3b8" fontSize={12} unit="%" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: 8,
            }}
            formatter={(value) => [`${(value as number).toFixed(1)}%`, 'Engagement']}
          />
          <Bar dataKey="engagement" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
