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
│  - /{fr,ru,de}/index.astro (FR, RU, DE)             │
│  - /reviews/[...slug].astro                         │
└─────────────────────────────────────────────────────┘
                         ▲
                         │ Imports
┌─────────────────────────────────────────────────────┐
│                  COMPONENT LAYER                     │
│  src/components/                                     │
│  ├── layout/  → Header, Footer, Hero                │
│  ├── ui/      → Buttons, Cards, Badges              │
│  ├── ui/      → ReviewHero, ProductHeader           │
│  └── head/    → SEO.astro, Analytics.astro          │
└─────────────────────────────────────────────────────┘
                         ▲
                         │ Data
┌─────────────────────────────────────────────────────┐
│                   CONTENT LAYER                      │
│  src/content/reviews/[lang]/[slug]/index.mdx                   │
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
- `ReviewCard.astro` — Product review card
- `ReviewHero.astro` — Review hero block (image, rating, key specs, CTA)
- `SpecGrid.astro` — Specifications table (`Record<string, string>`)
- `ProsCons.astro` — Pros/cons block
- `UserFeedback.astro` — User quotes block
- `ShareButtons.astro` — Social share buttons

### Layout Components
Located in `src/components/layout/`:
- `Header.astro` — Navigation with language switcher
- `Footer.astro` — Footer with Amazon disclosure
- `Hero.astro` — Hero section for landing pages

### Review Components
Located in `src/components/ui/`:
- `ReviewHero.astro` — Review page hero
- `ProductHeader.astro` — Product title with H1
- `BuildHero.astro` — Build reviews hero

## Theme

**Dark theme is default.** Color scheme uses:
- Background: dark grays
- Accent: indigo/cyan for CTAs
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

Affiliate configuration is centralized in `src/config.ts` and uses `.env`:
- `PUBLIC_AMAZON_TAG_US`
- `PUBLIC_AMAZON_TAG_DE`
- `PUBLIC_AMAZON_TAG_FR`
Amazon marketplace domains are defined in code (`AMAZON_CONFIG.domains`).

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

## Analytics & Performance

- **Google Analytics 4**: Implemented via [Partytown](https://partytown.builder.io/) to run off the main thread.
- **Zero JS Default**: All non-essential scripts must run in web workers or be lazy-loaded.

---

## Пайплайны и гарантии доставки

### Current State

| Pipeline | Status |
|----------|--------|
| GitLab CI | ❌ Не используется |
| GitHub Actions | ✅ Активен (`CI -> Docker Publish -> Deploy to VPS`) |
| Manual Docker | ✅ Fallback-only (`./deploy.sh sha-<commit-sha>`) |

### Deployment Process

```
PR → Merge to `main` → CI checks → GHCR publish (`sha-*`) → Deploy to VPS → Smoke checks
```

### Quality Gates

| Check | Command | When |
|-------|---------|------|
| CI full gate | `npm run check:ci` | Required before publish/deploy |
| TypeScript | `npx astro check` | Required for local validation |
| Build | `npm run build` | Required for code/runtime changes |
| Affiliate compliance | `npm run check:affiliate` | Required before deploy |
| Image Quality | `npm run lint:images` | Required before deploy |
| Agent docs consistency | `npm run lint:agent-docs` | Required for `.agent/**` / `.memory_bank/**` changes |
| Agent roles policy | `npm run lint:agent-roles` | Required for `.agent/**` / `.memory_bank/**` changes |
| Agent skills policy | `npm run lint:agent-skills` | Required for `.agent/**` / `.memory_bank/**` changes |

### Deploy Contract

- Runtime: Astro SSR (`@astrojs/node`) on internal port `4321`.
- Public ingress: Cloudflare → Nginx Proxy Manager → `hardwarelab-web` → `app:4321`.
- Health endpoint: `GET /health` must return `200 OK`.
- Deployment source: immutable GHCR tags `sha-*` (no `latest` for production rollout).

---

## Связанные документы

→ [techContext.md](techContext.md) — инфраструктура и ограничения  
→ [projectbrief.md](projectbrief.md) — цели проекта

---

## 🤖 Agentic Workflow Patterns

### Separation of Concerns (Platform vs. Content)
We strictly separate "Code" concerns from "Content" concerns to prevent context pollution.

1. **Engineering lane**
   - `tech-lead`: planning, architecture, risk control, Memory Bank integrity.
   - `coder`: implementation and self-verification.
   - Handoff pattern: `tech-lead -> coder -> tech-lead/human review`.

2. **Content lane (lean default)**
   - `single-researcher` (external): PASS A research pack.
   - `researcher` (internal): EN `index.mdx` + visuals.
   - `translator`: RU/DE/FR parity and asset sync.
   - `qa`: final build/compliance/i18n gate.
   - Handoff pattern: `single-researcher -> researcher -> translator -> qa`.

3. **Skills layer**
   - `visual-asset-generator` is the canonical image workflow for `image.webp` and `og.png`.

4. **Compliance lane**
   - Pre-release gate is mandatory for money pages:
     - `.agent/workflows/prepublish-affiliate-gate.md`
