/**
 * Solving Socials - Root Application Component
 *
 * Research platform for optimizing transparent AI social media personas.
 * All personas managed through this platform explicitly disclose their AI nature.
 */

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  DashboardPage,
  MetricsEntryPage,
  CalendarPage,
  AnalyticsPage,
  ContentGenPage,
} from '@/pages';

export function App(): React.ReactElement {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/metrics" element={<MetricsEntryPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/content" element={<ContentGenPage />} />
    </Routes>
  );
}

export default App;
