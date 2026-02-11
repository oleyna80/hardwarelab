# Tech Lead Codebase Audit — 2026-01-30

## Scope
- Review pages (EN/FR/RU/DE)
- SEO head / structured data
- Affiliate link plumbing
- Fonts / performance hygiene

## Findings (ordered by severity)

### P1 — SEO regression on localized review pages (lang/schema/meta not set)
- FR/RU/DE review pages do not pass `lang`, `article`, `pubDate`, or `image` into Layout.
  - Impact: HTML lang defaults to `en`, hreflang/og:locale mismatch, JSON-LD not marked as Article, OG image fallback used.
  - Files:
    - `src/pages/fr/reviews/[...slug].astro:61`
    - `src/pages/ru/reviews/[...slug].astro:61`
    - `src/pages/de/reviews/[...slug].astro:61`

### P1 — Review pages lack Product/Review JSON-LD
- Current schema is only `Article`/`WebSite` in SEO component.
  - Impact: Rich results for product reviews are not eligible (missing Product + Review schema).
  - File: `src/components/head/SEO.astro:70`

### P1 — Regional affiliate support inconsistent in ProductHeader
- ProductHeader ignores language/region when building Amazon URL and only supports `{ us, fr }` in type.
  - Impact: FR/DE/RU pages may link to US storefront/tag, lowering conversion and risking compliance.
  - File: `src/components/ui/ProductHeader.astro:8-19`

### P1 — Missing default OG image
- SEO fallback points to `/og-default.jpg`, but the file does not exist in `public/`.
  - Impact: Broken social previews for pages without `image`/`ogImage`.
  - File: `src/components/head/SEO.astro:29-32`

### P2 — Debug logging shipped in static paths/render
- `console.log` in getStaticPaths/render for FR/RU/DE reviews.
  - Impact: Noisy build logs, potential leakage of content structure.
  - Files:
    - `src/pages/fr/reviews/[...slug].astro:10-56`
    - `src/pages/ru/reviews/[...slug].astro:10-56`
    - `src/pages/de/reviews/[...slug].astro:10-56`

### P2 — Duplicate font loading (self-hosted + Google Fonts)
- Fonts are imported via `@fontsource/*` and also injected as external Google Fonts in SEO.
  - Impact: Duplicate downloads, extra render-blocking requests.
  - Files:
    - `src/styles/global.css:1-2`
    - `src/components/head/SEO.astro:145-150`

### P2 — Invalid class attribute content in AffiliateButton
- `aria-label="..."` appears inside the `class` template string.
  - Impact: Invalid class string; may cause unexpected styling or hydration differences.
  - File: `src/components/ui/AffiliateButton.astro:113-122`

## Recommended Remediation (high-level)
1. Standardize review page props: always pass `lang`, `article`, `pubDate`, and image fields in all locales.
2. Add Product + Review JSON-LD (or extend SEO component to emit proper schema for reviews).
3. Align affiliate links with region: reuse `AMAZON_CONFIG.getAffiliateLink` with region, and expand ASIN typing.
4. Provide a real default OG image in `public/` or enforce required `ogImage` in schema.
5. Remove debug logs and duplicate font loading; keep self-hosted fonts only.

## Notes
- No automated checks were executed (audit-only).
