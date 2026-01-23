/**
 * GrowthChart Component
 * Line chart showing follower growth over time for multiple personas
 */

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Box, Typography } from '@mui/material';

interface DataPoint {
  date: string;
  [personaName: string]: string | number;
}

interface PersonaConfig {
  name: string;
  color: string;
}

interface GrowthChartProps {
  data: DataPoint[];
  personas: PersonaConfig[];
  title?: string;
}

export function GrowthChart({ data, personas, title = 'Follower Growth' }: GrowthChartProps): React.ReactElement {
  if (data.length === 0) {
    return (
      <Box py={4} textAlign="center">
        <Typography color="text.secondary">No data available yet</Typography>
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
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
          <YAxis stroke="#94a3b8" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: 8,
            }}
          />
          <Legend />
          {personas.map((persona) => (
            <Line
              key={persona.name}
              type="monotone"
              dataKey={persona.name}
              stroke={persona.color}
              strokeWidth={2}
              dot={{ fill: persona.color, strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
