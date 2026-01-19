# Architecture

## Project Overview

**Solving Socials** is a research platform for optimizing transparent AI social media personas. The goal is to explore algorithmic approaches to social media growth with full AI disclosure from day one.

**Research Question:** Can openly-AI accounts achieve popularity? What strategies work best?

**Owner:** Madison Hutson

## Tech Stack

- **Frontend:** React 19 + TypeScript + Vite
- **UI Library:** Material UI 7 with Emotion
- **Database:** Supabase (PostgreSQL + Auth + Real-time)
- **Routing:** React Router 7
- **Charts:** Recharts
- **Testing:** Vitest (unit), Playwright (E2E)

## Application Modes/Features

| Mode/Feature | Purpose | Key Data |
|--------------|---------|----------|
| Persona Management | Create, edit, archive AI personas | name, platform, handle, aiDisclosure |
| Performance Tracking | Track follower growth, engagement | followers, engagement rate, impressions |
| Content Analytics | Analyze what content performs best | post type, hashtags, timing, engagement |
| Evolution Engine | Optimize strategies based on data | strategy adjustments, A/B comparisons |

## Directory Structure

```
/
├── src/                     # Application source code
│   ├── main.tsx             # Entry point with providers
│   ├── App.tsx              # Root component with routing
│   ├── vite-env.d.ts        # Vite environment types
│   ├── types/               # Type definitions
│   │   ├── index.ts         # Type exports
│   │   └── persona.ts       # Persona, metrics, content types
│   ├── lib/                 # External service clients
│   │   ├── supabase.ts      # Supabase client
│   │   └── database.types.ts # Supabase generated types
│   ├── styles/              # Theme and global styles
│   │   └── theme.ts         # MUI theme configuration
│   ├── components/          # React UI components
│   │   └── layout/          # Layout components (AppShell, Header, Sidebar)
│   ├── pages/               # Page components
│   │   ├── DashboardPage.tsx
│   │   ├── MetricsEntryPage.tsx
│   │   ├── CalendarPage.tsx
│   │   ├── AnalyticsPage.tsx
│   │   └── ContentGenPage.tsx
│   ├── services/            # Business logic
│   └── utils/               # Utility functions
├── personas/                # Persona specification files (YAML)
│   ├── _template.yaml       # Template for new personas
│   ├── persona_a.yaml       # Gaming/Earnest
│   ├── persona_b.yaml       # Gaming/Ironic
│   ├── persona_c.yaml       # Lifestyle/Earnest
│   ├── persona_d.yaml       # Trend-reactive/Face
│   └── persona_e.yaml       # Trend-reactive/No Face
├── assets/                  # Visual assets per persona
│   └── persona_X/           # Reference images, logos
├── content/                 # Content pipeline
│   ├── generated/           # LLM-generated drafts
│   └── published/           # Posted content archive
├── tracking/                # Performance data
│   ├── posts.csv            # Per-post metrics
│   └── weekly_metrics.csv   # Weekly rollups
├── analysis/                # Weekly analysis reports
│   └── _template.md         # Analysis template
├── tests/                   # Test files
│   ├── endpoint-inventory.json
│   ├── component-inventory.json
│   └── e2e/
├── docs/                    # Documentation
│   ├── platforms/           # Platform-specific intelligence
│   └── EXPERIMENT.md        # Experiment design & methodology
└── scripts/                 # Build/automation scripts
    ├── check-file-length.js # 300-line enforcer
    └── generate_content.py  # Content generation pipeline
```

## Data Sources

### Supabase Database (PostgreSQL)

| Table | Purpose |
|-------|---------|
| personas | AI persona profiles (synced from YAML specs) |
| metrics | Point-in-time follower/engagement snapshots |
| posts | Content posted with performance data |
| content_drafts | Claude-generated content awaiting posting |

### External APIs

| Service | Data | Notes |
|---------|------|-------|
| Supabase | Database, Auth, Real-time | Cloud PostgreSQL |
| Claude API | Content generation | For on-brand captions |
| Instagram | Metrics | Manual entry initially, API later |

## API Endpoints

### Health (`/api/`)
- `GET /health` - Health check endpoint

### Personas (`/api/personas/`) - Planned
- `GET /personas` - List all personas
- `POST /personas` - Create new persona
- `GET /personas/:id` - Get persona details
- `PUT /personas/:id` - Update persona
- `DELETE /personas/:id` - Archive persona

### Metrics (`/api/metrics/`) - Planned
- `GET /metrics/:personaId` - Get metrics for persona
- `POST /metrics/:personaId` - Record new metrics snapshot

### Analytics (`/api/analytics/`) - Planned
- `GET /analytics/growth/:personaId` - Growth analysis
- `GET /analytics/content/:personaId` - Content performance
- `GET /analytics/compare` - Compare personas

## Key Patterns

### AI Disclosure Requirement
Every persona MUST have visible AI disclosure from day one. The `aiDisclosure` field tracks how this is communicated (bio, pinned post, etc.).

```typescript
interface Persona {
  aiDisclosure: string; // Required - how AI nature is disclosed
}
```

### Metrics Snapshots
Metrics are stored as point-in-time snapshots, not overwritten. This enables growth tracking over time.

```typescript
interface PersonaMetrics {
  personaId: string;
  timestamp: Date;  // When snapshot was taken
  followers: number;
  // ...
}
```

## Environment Variables

| Variable | Purpose | Required |
|----------|---------|----------|
| `VITE_SUPABASE_URL` | Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `VITE_CLAUDE_API_KEY` | Claude API key for content gen | No (Phase 6) |

---

*Last Updated: 2026-01-19*
