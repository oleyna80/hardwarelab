# HardwareLab

Amazon affiliate hardware review site built with Astro 5.

## 🔧 Tech Stack

| Component | Version |
|-----------|---------|
| [Astro](https://astro.build) | 5.17.3 |
| [Tailwind CSS](https://tailwindcss.com) | 3.3.x |
| [MDX](https://mdxjs.com) | @astrojs/mdx |
| TypeScript | 5.x |
| Docker | Multi-stage (Node build → Node SSR runtime) |

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev          # Start dev server at localhost:4321
```

### Production (Docker)
```bash
docker compose up -d --build   # Local SSR container at http://localhost:8081
```

For VPS production deploys, use GitHub Actions + immutable `sha-*` images.

### Release Preflight
```bash
npm run check:ci
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
| `/fr/`, `/ru/`, `/de/` | `src/pages/{fr,ru,de}/index.astro` | Localized homepages |
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
│   ├── ui/         # Buttons, Cards, Review UI
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
| `npm run check:types` | Run Astro type checks |
| `npm run check:ci` | Full release gate: lint + types + build + affiliate + e2e |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run check:affiliate` | Validate affiliate links |
| `npm run lint:agent-docs` | Validate agent and memory-bank docs |
| `npm run lint:agent-roles` | Validate lean role set and legacy alias integrity |
| `npm run lint:agent-skills` | Validate agent skill frontmatter, links, and placeholders |
| `npm run check:review-package -- <slug>` | Smoke-check EN/RU/DE/FR review package integrity |
| `npm run test:e2e` | Run Playwright tests |

## GitHub & VPS Deployment

- CI workflow: `.github/workflows/ci.yml`
- Docker publish workflow (GHCR): `.github/workflows/docker-publish.yml`
- Manual VPS deploy workflow: `.github/workflows/deploy-vps.yml`
- VPS compose file: `docker-compose.vps.yml`
- VPS env template: `.env.vps.example`
- Full runbook: `docs/deployment/github-vps.md`

## 📚 Documentation

- **AI Agents**: Start with [.memory_bank/activeContext.md](.memory_bank/activeContext.md)
- **Roadmap**: [.memory_bank/roadmap.md](.memory_bank/roadmap.md)
- **KPI Framework**: [.memory_bank/kpi-framework.md](.memory_bank/kpi-framework.md)
- **Agent Contract**: [.agent/AGENT_CONTRACT.md](.agent/AGENT_CONTRACT.md)
- **Task Routing**: [.agent/workflows/task-routing.md](.agent/workflows/task-routing.md)
- **Pre-publish Compliance Gate**: [.agent/workflows/prepublish-affiliate-gate.md](.agent/workflows/prepublish-affiliate-gate.md)
- **Role Templates**: [.agent/templates/](.agent/templates/)
- **Workflows**: See [.agent/workflows/](.agent/workflows/)
- **Component Guide**: [.agent/workflows/component-development.md](.agent/workflows/component-development.md)
