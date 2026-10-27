# HardwareLab — Application Architecture Overview

This is a navigation overview based on the preserved source roots, not a completed architecture/security audit.

- **Pages and UI:** Astro files in `src/pages/`, `src/layouts/`, `src/components/`.
- **Content:** language-specific MDX reviews under `src/content/reviews/`, schema/validation in source.
- **Localization:** EN root and locale prefixes FR, RU and DE.
- **Affiliate/disclosures:** UI components, content conventions, `scripts/check-disclosure.mjs`, `scripts/app-checks/check-affiliate-links.js`.
- **Static assets:** `public/` and review-associated image files.
- **Quality:** ESLint, Astro check/build, affiliate/image/researcher validation, Playwright and Lighthouse workflows.
- **Runtime:** Node SSR container; GitHub Actions publishes images and deploys to VPS via workflows gated on `main` for automatic triggers.
- **Secrets:** external GitHub/VPS credentials are not included in this repository's source.
- **Migration boundary:** Application source, content, tests and runtime dependencies are deliberately unchanged. Full architecture discovery should be verified by Codex from actual files.

Use `AGENTS.md` and `docs/workflow/development.md` for engineering authority, not this overview.
