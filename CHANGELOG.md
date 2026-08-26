# Changelog

All notable changes to **Rizonesoft AI Email Writer** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Consolidated `manifest.xml`, `manifest.dev.xml`, and `manifest.prod.xml` into a single `manifest.xml`
- Dev manifest is now derived at CI time via `sed` transforms in the deploy workflow
- Rebranded project from "Glide" to **Rizonesoft AI Email Writer** (short name **AI Compose**)
- Updated Outlook ribbon labels, taskpane title, and all manifest display names
- Updated README, CHANGELOG, CONTRIBUTING, and SECURITY documentation
- Migrated settings storage key from `glide_settings` to `ai_compose_settings`

### Added

- Initial project scaffolding (Outlook Task Pane add-in, TypeScript)
- Project hygiene files (`.editorconfig`, `.prettierrc`, `.eslintrc.json`)
- Community files (`CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`)
- MIT License

---

© Rizonetech (Pty) Ltd. • [rizonesoft.com](https://rizonesoft.com)
