# HardwareLab

Amazon affiliate hardware review site built with Astro 5.

## 🔧 Tech Stack

| Component | Version |
|-----------|---------|
| [Astro](https://astro.build) | 5.16.6 |
| [Tailwind CSS](https://tailwindcss.com) | 3.3.x |
| [MDX](https://mdxjs.com) | @astrojs/mdx |
| TypeScript | 5.x |
| Docker | Multi-stage (Node → Nginx) |

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev          # Start dev server at localhost:4321
```

### Production (Docker)
```bash
docker compose up -d --build   # Build and run at port 8081
```

## 🌐 Domains & Ports

| Environment | URL |
|-------------|-----|
| Development | `http://localhost:4321` |
| Production (Docker) | `http://localhost:8081` |
| Live | `https://hardwarelab.org` |

## 🌍 Internationalization

Supported languages: **English** (default), **French**, **Russian**, **German**

| Language | Route Prefix |
|----------|--------------|
| English | `/` |
| French | `/fr/` |
| Russian | `/ru/` |
| German | `/de/` |

## 🏗️ Architecture Overview

### Subsystems

| Layer | Location | Purpose |
|-------|----------|---------|
| **Routing** | `src/pages/` | File-based routing, entry points |
| **Components** | `src/components/` | UI, Layout, Reviews |
| **Content** | `src/content/reviews/` | MDX product reviews |
| **Layouts** | `src/layouts/` | Page wrappers (Layout.astro) |
| **Utilities** | `src/utils/` | i18n, formatters, helpers |
| **Public** | `public/` | Static assets, robots.txt |

### Routes (Top-level Pages)

| Route | File | Description |
|-------|------|-------------|
| `/` | `src/pages/index.astro` | Homepage (EN) |
| `/fr/`, `/ru/`, `/de/` | `src/pages/[lang]/index.astro` | Localized homepages |
| `/reviews/*` | `src/pages/reviews/[...slug].astro` | Product reviews |
| `/builds/*` | `src/pages/builds/[...slug].astro` | Build reviews |
| `/categories/*` | `src/pages/categories/[category].astro` | Category pages |
| `/about`, `/privacy` | `src/pages/*.astro` | Static pages |

### Key Modules

| Module | Path | Responsibility |
|--------|------|----------------|
| `i18n` | `src/utils/i18n.ts` | Translations, language switching |
| `SEO` | `src/components/head/SEO.astro` | Meta tags, OG, hreflang |
| `Affiliate` | `src/components/ui/AffiliateButton.astro` | Amazon links with compliance |
| `Content Schema` | `src/content/config.ts` | Zod validation for MDX |

### Module Dependencies

```
pages/* ──imports──→ layouts/Layout.astro
    │                       │
    │                       ├──→ components/layout/Header.astro
    │                       ├──→ components/layout/Footer.astro
    │                       └──→ components/head/SEO.astro
    │
    └──getCollection──→ content/reviews/[lang]/*.mdx
                              │
                              └──validated by──→ content/config.ts
```

## 📁 Directory Structure

```
src/
├── components/
│   ├── layout/     # Header, Footer, Hero
│   ├── ui/         # Buttons, Cards, Badges
│   ├── reviews/    # ReviewHero, ProductHeader
│   └── head/       # SEO.astro
├── content/        # MDX reviews by language
├── layouts/        # Page templates
├── pages/          # Route pages
└── utils/          # i18n, helpers
.memory_bank/       # Project knowledge base
.agent/workflows/   # AI workflows
```

## 🧞 Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run check:affiliate` | Validate affiliate links |
| `npm run test:e2e` | Run Playwright tests |

## 📚 Documentation

- **AI Agents**: Start with [.memory_bank/activeContext.md](.memory_bank/activeContext.md)
- **Workflows**: See [.agent/workflows/](.agent/workflows/)
- **Component Guide**: [.agent/workflows/component-development.md](.agent/workflows/component-development.md)
