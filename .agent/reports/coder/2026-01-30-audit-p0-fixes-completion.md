# ✅ Coder Report — Audit P0 Fixes (2026-01-30)

## 📋 Task
Implement P0 items from tech‑lead audit plan: localized review parity, affiliate region consistency, review JSON‑LD.

## ✅ Changes Made
### Files changed
- `src/components/head/SEO.astro` — added Product/Review JSON‑LD, image resolution helper, inline JSON‑LD script, removed Google Fonts links.
- `src/layouts/Layout.astro` — extended props for review metadata and conditional SEO props to avoid exactOptionalPropertyTypes issues.
- `src/components/ui/ProductHeader.astro` — region‑aware Amazon URL with ASIN fallback by locale.
- `src/components/ui/AffiliateButton.astro` — removed stray `aria-label` text from `class` string.
- `src/components/ui/BuildHero.astro` — removed unused import.
- `src/pages/reviews/[...slug].astro` — pass review metadata to Layout.
- `src/pages/fr/reviews/[...slug].astro` — remove debug logs, add `lang`, `article`, `pubDate`, `image`, review schema props, pass lang to CTA.
- `src/pages/ru/reviews/[...slug].astro` — same as FR.
- `src/pages/de/reviews/[...slug].astro` — same as FR.
- `src/pages/builds/[...slug].astro` — pass `image` to Layout for OG consistency.

## 🧪 Verification
- `npm run build` — ✅ success (with existing content warnings)
- `npm run lint` — ⚠️ warnings only (existing in scripts)
- `npm run check:affiliate` — ✅ success
- `npx astro check` — ❌ fails due to pre‑existing type issues unrelated to this task (ProductCarousel, ProsCons, BaseLayout, etc.)

## ⚠️ Notes / Follow‑ups
- `public/og-default.jpg` is still missing; fallback remains.
- `npx astro check` errors appear pre‑existing and out of scope for this change set.
