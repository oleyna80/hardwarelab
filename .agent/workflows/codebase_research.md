---
description: Current codebase overview and quick reference
---

# HardwareLab Codebase Research

> Last updated: January 2026

## Project Overview

**HardwareLab** is an Amazon affiliate tech review site focused on:
- Mini PCs (Beelink, Intel NUC, Mac Mini)
- Single Board Computers (Raspberry Pi, Orange Pi)
- NAS devices (Synology, QNAP)
- Gaming consoles (PlayStation, Xbox)

---

## Tech Stack

| Component | Technology | Version |
|-----------|------------|---------|
| Framework | Astro | 5.16.6 |
| Styling | Tailwind CSS | 3.3.x |
| Content | MDX | @astrojs/mdx |
| Language | TypeScript | Strict mode |
| Package Manager | npm | 10.x |
| Build Output | Static (SSG) | dist/ |

---

## Directory Structure

```
hardwarelab/
├── src/
│   ├── assets/
│   │   ├── fonts/          # Custom fonts
│   │   ├── styles/         # Global CSS
│   │   └── images/         # Optimized images
│   ├── components/
│   │   ├── layout/         # Header, Footer, Hero
│   │   └── ui/             # AffiliateButton, SpecGrid, ProsCons
│   ├── content/
│   │   └── reviews/        # MDX reviews by language
│   │       ├── en/         # English (11 reviews)
│   │       ├── fr/         # French
│   │       ├── de/         # German
│   │       └── ru/         # Russian
│   ├── layouts/            # Layout.astro
│   ├── pages/
│   │   ├── index.astro     # EN homepage
│   │   ├── reviews/        # EN review pages
│   │   ├── fr/             # French pages
│   │   ├── de/             # German pages
│   │   └── ru/             # Russian pages
│   ├── utils/              # i18n.ts, helpers
│   └── types/              # TypeScript types
├── public/
│   └── images/             # Static images
├── .agent/
│   └── workflows/          # Agent instructions (13 files)
├── scripts/                # Utility scripts
├── tests/                  # Playwright tests
├── prompts/                # AI generation prompts
├── dist/                   # Build output
└── docker-compose.yml      # Docker config
```

---

## Internationalization (i18n)

| Language | Code | Status | Reviews |
|----------|------|--------|---------|
| English | en | ✅ Default | 11 |
| French | fr | ✅ Active | partial |
| German | de | ✅ Active | partial |
| Russian | ru | ✅ Active | partial |

**Config:** `astro.config.mjs` → `i18n.locales`
**Helper:** `src/utils/i18n.ts`

---

## Current Reviews (EN)

| Product | Category | File |
|---------|----------|------|
| Raspberry Pi 5 | SBC | raspberry-pi-5.mdx |
| Orange Pi 5 Plus | SBC | orange-pi-5-plus.mdx |
| Beelink SER5 Max | Mini PC | beelink-ser5-max.mdx |
| Beelink SER5 Max 6800U | Mini PC | beelink-ser5-max-6800u.mdx |
| Intel NUC 13 Pro | Mini PC | intel-nuc-13-pro.mdx |
| Mac Mini M4 | Mini PC | mac-mini-m4.mdx |
| Synology DS923+ | NAS | synology-ds923.mdx |
| Synology DS423+ | NAS | synology-ds423-plus.mdx |
| PlayStation 5 Pro | Console | playstation-5-pro.mdx |
| Xbox Series S | Console | xbox-series-s-robot-white.mdx |
| Xbox Series X 2TB | Console | xbox-series-x-2tb-galaxy-black.mdx |

---

## Key Components

### Layout Components
- `Layout.astro` - Main page wrapper with i18n
- `Header.astro` - Navigation with language switcher
- `Footer.astro` - Footer with affiliate disclosure
- `Hero.astro` - Homepage hero section

### UI Components
- `AffiliateButton.astro` - Amazon link with tracking
- `SpecGrid.astro` - Product specifications table
- `ProsCons.astro` - Pros/cons comparison
- `UserFeedback.astro` - User quotes section
- `ProductHeader.astro` - Review page header
- `ReviewCard.astro` - Review preview card

---

## Key Files

| Purpose | File |
|---------|------|
| Astro config | `astro.config.mjs` |
| Tailwind config | `tailwind.config.mjs` |
| TypeScript config | `tsconfig.json` |
| Content schemas | `src/content/config.ts` |
| Amazon config | `src/config.ts` |
| i18n helper | `src/utils/i18n.ts` |
| Environment | `.env` (gitignored) |
| Environment example | `.env.example` |

---

## Scripts

```bash
npm run dev          # Development server (localhost:4321)
npm run build        # Production build → dist/
npm run preview      # Preview production build
npm run check:affiliate  # Check affiliate compliance
npm run test:e2e     # Playwright E2E tests
```

---

## Agent Workflows

Located in `.agent/workflows/`:

| File | Purpose |
|------|---------|
| AGENT_GUIDELINES.md | Core development guidelines |
| amazon-affiliate-compliance.md | Amazon legal requirements |
| analytics-tracking.md | GA4 and conversion tracking |
| component-development.md | UI component patterns |
| content-creation.md | Review writing workflow |
| content-strategy.md | Keyword research, calendar |
| deployment.md | Build and deploy process |
| performance-monitoring.md | Core Web Vitals |
| seo-optimization.md | SEO best practices |
| testing-strategy.md | Testing guidelines |
| troubleshooting.md | Common issues and fixes |

---

## Environment Variables

Required in `.env`:
```bash
PUBLIC_SITE_DOMAIN=https://your-domain.com
PUBLIC_AMAZON_AFFILIATE_TAG=your-tag-20
PUBLIC_AMAZON_DOMAIN=amazon.com
PUBLIC_GA_ID=G-XXXXXXXXXX
PUBLIC_ANALYTICS_ENABLED=true
```

---

## Quick Commands

```bash
# Development
npm run dev

# Build and check
npm run build
npm run check:affiliate

# Find reviews without internal links
grep -L "](/reviews/" src/content/reviews/en/*.mdx

# Count pages built
ls dist/**/*.html | wc -l

# Check for TypeScript errors
npx astro check
```

---

## Design System

- **Colors:** zinc (grays), indigo/cyan (accents), amber (CTA)
- **Fonts:** Inter (sans), JetBrains Mono (mono)
- **Theme:** Dark mode first, mobile first
- **Style:** Clean, minimal, "Linear-style" with subtle glow effects
