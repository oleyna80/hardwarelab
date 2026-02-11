# Tech Lead Plan — Audit Fixes (2026-01-30)

## Goal
Address critical SEO, affiliate, and i18n issues discovered in the codebase audit.

## P0 Tasks (must ship together)
1. **Localized review pages parity**
   - Ensure FR/RU/DE review pages pass `lang`, `article`, `pubDate`, and `image` (use `ogImage || heroImage`) into `Layout`.
   - Pass `lang` into `ProductHeader` and `AffiliateButton` where applicable for localized labels/regions.
   - Remove debug `console.log` statements in these pages.
   - Files: 
     - `src/pages/fr/reviews/[...slug].astro`
     - `src/pages/ru/reviews/[...slug].astro`
     - `src/pages/de/reviews/[...slug].astro`

2. **Affiliate region consistency**
   - Update `ProductHeader` to resolve regional ASINs using `lang` and `AMAZON_CONFIG.getAffiliateLink(finalAsin, region)` (match `AffiliateButton` logic).
   - Expand ASIN type to support `{ us, fr?, de?, ... }` and keep fallback to `us`.
   - Files:
     - `src/components/ui/ProductHeader.astro`
     - (Optional helper extraction) `src/utils/affiliate.ts`

3. **Structured data for reviews**
   - Extend `SEO.astro` or add a review-specific schema emitter that outputs `Product` + `Review` JSON‑LD when `article=true` and review data is available.
   - Minimal fields: `Product` (name, image, aggregateRating?) + `Review` (reviewRating, author, datePublished).
   - Wire from review pages (frontmatter) to SEO props.
   - Files:
     - `src/components/head/SEO.astro`
     - `src/pages/*/reviews/[...slug].astro`

## P1 Tasks
4. **OG default strategy**
   - Choose one:
     - Add `public/og-default.jpg` (real image asset), OR
     - Make `ogImage` required in schema and remove fallback.
   - Files:
     - `src/components/head/SEO.astro`
     - `src/content/config.ts`
     - `public/og-default.jpg` (if chosen)

5. **Font loading cleanup**
   - Remove Google Fonts `<link>` from `SEO.astro` to avoid duplicate font loads.
   - Keep self‑hosted `@fontsource` imports.
   - File: `src/components/head/SEO.astro`

6. **AffiliateButton class bug**
   - Remove stray `aria-label="..."` from `class` template string.
   - File: `src/components/ui/AffiliateButton.astro`

## Definition of Done
- Localized review pages render correct `lang`, OG locale, `Article` schema, and correct affiliate region links.
- Structured data validates with Product/Review schema for review pages.
- No debug logs in static build output.
- No duplicate font loading.
- `npm run build` passes.

## Risks / Notes
- JSON‑LD changes must avoid breaking existing SEO schema. Prefer additive structured data.
- Ensure schema uses `pubDate`/`lastUpdated` from frontmatter when available.

## NEXT: Coder (Implementation)

CONTEXT & RULES:
- 📚 **Read First:** `.memory_bank/activeContext.md` & `.memory_bank/systemPatterns.md`
- 🎯 **Goal:** Fix P0 issues from audit (localized review parity, affiliate region, structured data).
- 📂 **Specific Files:** Study `src/components/head/SEO.astro`, `src/components/ui/ProductHeader.astro`, `src/pages/*/reviews/[...slug].astro`.
- 🧱 **Architecture:** Follow patterns in `.memory_bank/systemPatterns.md`.

PLAN:
1. Align localized review pages with EN page props (`lang`, `article`, `pubDate`, `image`) and remove debug logs.
2. Implement region‑aware affiliate link building in `ProductHeader`.
3. Add Product/Review JSON‑LD for review pages (additive to existing SEO schema).

🛑 CRITICAL CONSTRAINTS:
- Memory Limit: 512MB RAM (Avoid heavy deps).
- Compliance: Check Amazon Affiliate rules if touching UI.

✅ DEFINITION OF DONE (Verification Protocol):
1. **Automated Check:** `npm run build` MUST pass without errors.
2. **Visual Proof:** If possible, `npm run dev` and verify a review page renders without console errors.
3. **Artifacts:** Update `.memory_bank/activeContext.md` with what was accomplished.
