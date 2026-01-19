# Changelog

All notable changes to Solving Socials will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Project Bootstrap:** Initial scaffolding from claude-project-scaffolding template
- **Core Types:** Persona, PersonaMetrics, ContentPost, PersonaStrategy types
- **App Component:** Root React component shell for dashboard
- **Documentation:** Full docs structure with project-specific content
  - ARCHITECTURE.md with data model and API design
  - README.md with project overview and research question

### Infrastructure
- TypeScript strict mode configuration
- React 19 with JSX support
- Vitest for unit testing
- Playwright for E2E testing
- ESLint + Prettier for code quality
- Husky pre-commit hooks
- 300-line file length enforcement
- Inventory-based drift detection

---

## [0.1.0] - 2026-01-19

### Added
- Initial project setup
- Persona management type definitions
- Performance tracking type definitions
- Content analytics type definitions
- Basic dashboard shell component

---

## Version History Summary

| Version | Date | Highlights |
|---------|------|------------|
| 0.1.0 | 2026-01-19 | Initial bootstrap with type definitions |

---

## Changelog Entry Guidelines

### Entry Format
```markdown
### [Category]
- **[Feature/Area]:** Description of change
  - Sub-detail if needed
  - Another sub-detail
```

### Categories
- **Added** - New features
- **Changed** - Changes to existing functionality
- **Deprecated** - Features to be removed in future
- **Removed** - Removed features
- **Fixed** - Bug fixes
- **Security** - Security-related changes

### Good Entry Examples
```markdown
### Added
- **Persona Management:** CRUD operations for AI personas
  - Create new persona with platform, handle, disclosure
  - Edit existing persona details
  - Archive inactive personas

### Fixed
- **Metrics Tracking:** Fixed engagement rate calculation for zero-follower accounts
```

---

*Last Updated: 2026-01-19*
