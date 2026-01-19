# Solving Socials

**Research platform for optimizing transparent AI social media personas.**

## Research Question

Can openly-AI accounts achieve popularity on social media? What strategies work best when the AI nature is disclosed from day one?

## What This Is

A research tool to:
- **Create and manage AI personas** that openly disclose their AI nature
- **Track performance metrics** (followers, engagement, growth over time)
- **Analyze content performance** (what works, what doesn't)
- **Evolve strategies** based on data (algorithmic optimization)

## What This Is NOT

- Not a bot network or automation tool
- Not deceptive - all personas explicitly state they are AI
- Not violating platform ToS - transparent, disclosed AI accounts

---

## Quick Start

```bash
# Install dependencies
npm install

# Run quality checks
npm run precommit

# Start development (when dev server is set up)
npm run dev
```

## Project Structure

```
├── src/
│   ├── App.tsx              # Root application component
│   ├── types/               # Type definitions (Persona, Metrics, etc.)
│   ├── components/          # React UI components
│   ├── services/            # Business logic
│   ├── api/                 # API endpoints
│   └── db/                  # Database layer
├── tests/                   # Unit and E2E tests
├── docs/                    # Documentation
└── scripts/                 # Build/check scripts
```

## Key Concepts

### Personas
AI identities with explicit disclosure. Each persona has:
- Platform (Twitter, Instagram, TikTok, etc.)
- Handle and bio
- **AI disclosure** (required - how the AI nature is communicated)
- Strategy configuration

### Metrics Tracking
Point-in-time snapshots of:
- Follower count
- Engagement rate
- Content performance
- Growth velocity

### Evolution Engine
Data-driven strategy optimization:
- What content types perform best?
- What posting times work?
- What niches grow fastest?
- How does disclosure style affect engagement?

---

## Documentation

| File | Purpose |
|------|---------|
| `CLAUDE.md` | AI assistant rules and project summary |
| `docs/ARCHITECTURE.md` | Technical structure and data flow |
| `docs/CONTRIBUTING.md` | Code standards and workflow |
| `docs/TASKS.md` | Current session task tracking |

---

## Quality Gates

All commits must pass:
- TypeScript type checking
- ESLint linting
- File length limits (300 lines max)
- Unit tests

---

*Built with Claude Code*
