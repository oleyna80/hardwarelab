---
description: Current codebase overview and quick reference
---

# HardwareLab Codebase Research

> Last validated: 2026-02-08

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
│   │       ├── en/         # English (20+ reviews)
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
│   ├── workflows/          # Agent instructions (13 files)
│   └── skills/
│       └── scripts/        # Utility scripts (migrated from root)
├── tests/                  # Playwright tests
├── prompts/                # AI generation prompts
├── dist/                   # Build output
└── docker-compose.yml      # Docker config
```

---

## Internationalization (i18n)

| Language | Code | Status | Reviews |
|----------|------|--------|---------|
| English | en | ✅ Default | Active |
| French | fr | ✅ Active | Active |
| German | de | ✅ Active | Active |
| Russian | ru | ✅ Active | Active |

**Config:** `astro.config.mjs` → `i18n.locales`
**Helper:** `src/utils/i18n.ts`

---

## Current Reviews (EN)

| Product | Category | File |
|---------|----------|------|
| Raspberry Pi 5 | SBC | `src/content/reviews/en/raspberry-pi-5/index.mdx` |
| Orange Pi 5 Plus 16GB | SBC | `src/content/reviews/en/orange-pi-5-plus/index.mdx` |
| Beelink SER5 5500U | Mini PC | `src/content/reviews/en/beelink-ser5-5500u/index.mdx` |
| Beelink SER5 MAX (Ryzen 7 6800U) | Mini PC | `src/content/reviews/en/beelink-ser5-max-6800u/index.mdx` |
| ASUS Intel NUC 13 Pro | Mini PC | `src/content/reviews/en/asus-intel-nuc-13-pro/index.mdx` |
| Mac mini M4 (base) | Mini PC | `src/content/reviews/en/mac-mini-m4/index.mdx` |
| Mac mini M4 Pro (24GB/512GB) | Mini PC | `src/content/reviews/en/mac-mini-m4-pro-24gb-512gb/index.mdx` |
| Synology DS923+ | NAS | `src/content/reviews/en/synology-ds923/index.mdx` |
| Synology DS423+ | NAS | `src/content/reviews/en/synology-ds423-plus/index.mdx` |
| PlayStation 5 Pro | Console | `src/content/reviews/en/playstation-5-pro/index.mdx` |
| Xbox Series S 1TB (Robot White) | Console | `src/content/reviews/en/xbox-series-s-robot-white/index.mdx` |
| Xbox Series X 1TB (Carbon Black) | Console | `src/content/reviews/en/xbox-series-x-1tb-carbon-black/index.mdx` |
| Xbox Series X 1TB Digital (Robot White) | Console | `src/content/reviews/en/xbox-series-x-1tb-digital-robot-white/index.mdx` |
| Xbox Series X 2TB (Galaxy Black) | Console | `src/content/reviews/en/xbox-series-x-2tb-galaxy-black/index.mdx` |

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
PUBLIC_AMAZON_TAG_US=your-tag-20
PUBLIC_AMAZON_TAG_DE=your-tag-03
PUBLIC_AMAZON_TAG_FR=your-tag-21
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
grep -L "](/reviews/" src/content/reviews/en/*/index.mdx

# Count pages built
ls dist/**/*.html | wc -l

# Check for TypeScript errors
npx astro check
```

---

## Design System

- **Colors:** zinc (grays), indigo/cyan (accents and CTAs)
- **Fonts:** Inter (sans), JetBrains Mono (mono)
- **Theme:** Dark mode first, mobile first
- **Style:** Clean, minimal, "Linear-style" with subtle glow effects
