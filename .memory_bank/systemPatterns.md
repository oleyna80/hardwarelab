# System Patterns

Architectural decisions and coding standards for HardwareLab.

---

## Границы подсистем

```
┌─────────────────────────────────────────────────────┐
│                    PUBLIC LAYER                      │
│  public/images, public/robots.txt, dist/*           │
└─────────────────────────────────────────────────────┘
                         ▲
                         │ Static Output
┌─────────────────────────────────────────────────────┐
│                   ROUTING LAYER                      │
│  src/pages/* → Astro file-based routing             │
│  - /index.astro (EN)                                │
│  - /[lang]/index.astro (FR, RU, DE)                 │
│  - /reviews/[...slug].astro                         │
└─────────────────────────────────────────────────────┘
                         ▲
                         │ Imports
┌─────────────────────────────────────────────────────┐
│                  COMPONENT LAYER                     │
│  src/components/                                     │
│  ├── layout/  → Header, Footer, Hero                │
│  ├── ui/      → Buttons, Cards, Badges              │
│  ├── reviews/ → ReviewHero, ProductHeader           │
│  └── head/    → SEO.astro                           │
└─────────────────────────────────────────────────────┘
                         ▲
                         │ Data
┌─────────────────────────────────────────────────────┐
│                   CONTENT LAYER                      │
│  src/content/reviews/[lang]/*.mdx                   │
│  Frontmatter → Zod schema → Type-safe props         │
└─────────────────────────────────────────────────────┘
                         ▲
                         │ Helpers
┌─────────────────────────────────────────────────────┐
│                   UTILITY LAYER                      │
│  src/utils/i18n.ts, src/config.ts                   │
└─────────────────────────────────────────────────────┘
```

---

## Component Rules

### UI Components
All reusable UI components in `src/components/ui/`:
- `AffiliateButton.astro` — Amazon affiliate links with compliance
- `AffiliateDisclosure.astro` — Required disclosure notice
- `CompliantAffiliateLink.astro` — Compliant link wrapper
- `ReviewCard.astro` — Product review card
- `SpecsTable.astro` — Hardware specifications table
- `Badge.astro` — Labels and badges

### Layout Components
Located in `src/components/layout/`:
- `Header.astro` — Navigation with language switcher
- `Footer.astro` — Footer with Amazon disclosure
- `Hero.astro` — Hero section for landing pages

### Review Components
Located in `src/components/reviews/`:
- `ReviewHero.astro` — Review page hero
- `ProductHeader.astro` — Product title with H1
- `BuildHero.astro` — Build reviews hero

## Theme

**Dark theme is default.** Color scheme uses:
- Background: dark grays
- Accent: amber/orange for CTAs
- Text: light grays and white

## i18n Structure

4 supported languages configured in `astro.config.mjs`:

| Language | Code | Route |
|----------|------|-------|
| English | `en` | `/` (default) |
| French | `fr` | `/fr/` |
| Russian | `ru` | `/ru/` |
| German | `de` | `/de/` |

Translation helper: `src/utils/i18n.ts`

## Affiliate Compliance

All Amazon links MUST have:
```html
rel="nofollow sponsored noopener noreferrer"
target="_blank"
```

Environment variables for tags:
- `AMAZON_TAG_US`
- `AMAZON_TAG_UK`
- `AMAZON_TAG_DE`
- `AMAZON_TAG_FR`

## Content Structure

Reviews stored in `src/content/reviews/[lang]/`:
- Frontmatter: title, description, pubDate, heroImage, tags
- MDX format with component imports

## SEO Requirements

Each page needs:
- `<title>` (dynamic via Layout)
- `<meta name="description">`
- `<link rel="canonical">`
- hreflang tags for all locales
- Open Graph + Twitter Card meta tags
- JSON-LD structured data (Article/Product)

---

## Пайплайны и гарантии доставки

### Current State

| Pipeline | Status |
|----------|--------|
| GitLab CI | ❌ Не настроен |
| GitHub Actions | ❌ Не настроен |
| Manual Docker | ✅ Используется |

### Deployment Process

```
Local → Build → Docker Image → VPS (port 8081) → Nginx Proxy Manager → HTTPS
```

### Quality Gates (Manual)

| Check | Command | When |
|-------|---------|------|
| TypeScript | `npx astro check` | Before commit |
| Build | `npm run build` | Before deploy |
| Affiliate compliance | `npm run check:affiliate` | Before deploy |
| E2E tests | `npm run test:e2e` | Optional |

### Recommended CI/CD Pipeline (TODO)

```yaml
# Future GitHub Actions
on: push to main
steps:
  - npm ci
  - npm run build
  - npx astro check
  - npm run check:affiliate
  - docker build & push
  - deploy to VPS
```

---

## Связанные документы

→ [techContext.md](techContext.md) — инфраструктура и ограничения  
→ [projectbrief.md](projectbrief.md) — цели проекта
