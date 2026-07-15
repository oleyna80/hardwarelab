# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

See **[AGENTS.md](./AGENTS.md)** for the full SDLC operating contract (autonomy policy, Hard Stops, stage flow, skill routing gate).
See **[AGENT.md](./AGENT.md)** for project identity, tech stack, task routing, and coding standards.
See **[.agent/ROSTER.md](.agent/ROSTER.md)** for agent and skill routing.

---

## Commands

```bash
npm run dev              # dev server at http://localhost:4321
npm run build            # runs check:disclosure then astro build
npm run check:types      # npx astro check (TypeScript)
npm run lint             # eslint

# Targeted checks
npm run check:affiliate                          # verify affiliate links
npm run check:review-package -- <slug>           # validate a single review package
npm run check:researcher-output -- <slug>        # validate researcher output

# Images
npm run images:review -- --slug <slug> --input <path/to/source.png>

# Content pipeline helpers
npm run review:new -- "Product Name" --category mini-pc   # scaffold + PASS A prompt
npm run review:write -- <slug>                             # PASS B writing prompt
npm run review:publish -- <slug>                           # publish checklist

# Tests
npm run test:affiliate   # vitest unit tests for affiliate.ts
npm run test:e2e         # playwright

# Full CI gate
npm run check:ci         # lint + types + build + affiliate + e2e
```

**After code changes, run:**
```bash
npx astro check
npm run lint:agent-docs && npm run lint:agent-roles && npm run lint:agent-skills
```

**Cache issues:**
```bash
rm -rf .astro/ && npm run dev
```

---

## Architecture

### Framework
Astro **7.0.9** in **SSR mode** (`output: 'server'`, `@astrojs/node` adapter). Tailwind via `postcss.config.mjs` (no `@astrojs/tailwind`). React islands only — no full SPA.

### Content Layer API (Astro 7)
Content config lives at **`src/content.config.ts`** (not `src/content/config.ts`).

Reviews use a `glob()` loader with a custom `generateId` that preserves the old slug format:
```ts
// id format: "de/product-slug"  (not "de/product-slug/index")
const reviewId = ({ entry }) => entry.replace(/\.(md|mdx)$/, '').replace(/\/index$/, '');
```

**Breaking changes from Astro 5:**
- `review.slug` → `review.id`
- `await review.render()` → `import { render } from 'astro:content'` then `await render(review)`
- Filter by locale: `review.id.startsWith('de/')`

### i18n Routing
- EN is the **default locale** — no prefix: `/reviews/slug`, `/categories`
- Other locales use prefix: `/de/reviews/slug`, `/fr/`, `/ru/`
- `prefixDefaultLocale: false` (set in `astro.config.mjs`)

**Locale prefix helper** (used in all locale pages and Header.astro):
```ts
const lp = (path: string) => lang === "en" ? path : `/${lang}${path}`;
```

**Locale page pattern:** Each locale has mirrored pages under `src/pages/{de,fr,ru}/`. Every page declares `const lang: Language = "de"` and filters collection: `review.id.startsWith('de/')`.

**Language switcher:** `window.__switchLanguage(lang)` defined in `Header.astro`; strips/replaces locale prefix on the current URL.

### Affiliate System
- Config: `src/config.ts` — Amazon tags and domains per region (US/DE/FR), loaded from env vars
- Logic: `src/utils/affiliate.ts` — `resolveAffiliateLink(asin, amazonUrl, lang)` returns `AffiliateResult`
- Region mapping: `en`→`us`, `de`→`de`, `fr`→`fr`, `ru`→`us`
- All affiliate links must have `rel="nofollow sponsored"` — enforced by `check:affiliate` script
- `asin` field accepts either a plain string (US) or `{ us, de, fr, it, es }` object

### Review Frontmatter Schema
Canonical Zod schema in `src/content.config.ts`. Key constraints:
- Published reviews require `asin` (string or regional object) **or** `amazonUrl`
- `draft: true` bypasses affiliate validation
- `priceCategory` and `rating` are always required

### SDLC Gates (`.claude/hooks/`)
Active hooks run on every tool call:
- **PreToolUse/Bash** → `hard-stop.sh`: blocks destructive commands (`rm -rf`, force push, etc.)
- **PreToolUse/Edit|Write** → `critic-gate.sh`: requires `.agent/critic-gate.md` with `Status: READY` or `SKIPPED` for any non-trivial Work Block
- **PostToolUse/Write|Edit** → `typecheck.sh`: runs `tsc --noEmit` on modified `.ts/.tsx` files
- **Stop** → `verification-gate.sh`: requires `.agent/verification-gate.md` before session closeout

Gate files: `.agent/critic-gate.md`, `.agent/verification-gate.md`  
Log: `.memory_bank/orchestrator-log.md`

For quick fixes (≤3 files, no route/schema changes): set `Status: SKIPPED` + `Quick-Fix: true` in both gate files and add log entries.

### Environment Variables
Copy `.env.example` → `.env`. Required for local dev:
```
PUBLIC_SITE_DOMAIN=http://localhost:4321
PUBLIC_AMAZON_TAG_US=...
PUBLIC_AMAZON_TAG_DE=...
PUBLIC_AMAZON_TAG_FR=...
PUBLIC_GA_ID=G-...          # leave blank locally
PUBLIC_ANALYTICS_ENABLED=false
```

### Content Pipeline (New Review)
```
review:new → PASS A (single-researcher) → review:write → PASS B (researcher) → translator → qa → review:publish
```
Research pack lands at `src/content/reviews/en/<slug>/_research-pack.md`.  
Assets: `image.webp` (1200×675) and `og.png` (1200×630) generated from a square PNG source.
