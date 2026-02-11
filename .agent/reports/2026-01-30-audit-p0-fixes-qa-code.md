## Summary
FAIL
- `npm run build` succeeded (content collection warnings only).
- `npm run lint` completed with existing warnings in scripts (no errors).
- `npm run check:affiliate` passed.
- `npx astro check` failed with multiple TypeScript errors in existing components (ProductCarousel, ProsCons, TerminalBlock, BaseLayout, etc.).

## Commands
| Command | Status | Notes |
|---------|--------|-------|
| `npm run build` | ✅ PASS | Content collection warnings about empty directories; build completed. |
| `npm run lint` | ⚠️ WARN | 4 warnings in `scripts/*` (no errors). |
| `npm run check:affiliate` | ✅ PASS | 214 links, all compliant. |
| `npx astro check` | ❌ FAIL | Multiple TS errors in unrelated files (see Failures). |

## Failures
`npx astro check` (TypeScript diagnostics):
- `src/components/ui/ProductCarousel.astro` — undefined `touchStartX/touchEndX`, possibly undefined `changedTouches`, unused vars.
- `src/components/ui/ProsCons.astro` and `src/components/ui/VerdictBox.astro` — `key` prop not valid on `li`.
- `src/components/ui/TerminalBlock.astro` — `onClick` prop invalid in Astro, `this` implicitly `any`.
- `src/layouts/BaseLayout.astro` — `themeToggle` possibly null; `theme` implicitly `any`.
- `src/pages/about.astro` — unused import `t`.
- `src/pages/index-new.astro` — `Hero` lang type mismatch.

## Risks / Notes
- Failures appear pre‑existing and not introduced by current change set, but QA gate still FAILs.
- Lint warnings are in `scripts/*` and pre‑existing.

## Revision Prompt for Coder
Fix `npx astro check` errors so QA can pass. Focus on:
1) `src/components/ui/ProductCarousel.astro` — define and use `touchStartX/touchEndX` properly with null‑safe touch handling.
2) Remove invalid `key` on `li` in `ProsCons` / `VerdictBox`.
3) `TerminalBlock.astro` — use `onclick`/`on:click` patterns for Astro and avoid `this` implicit any.
4) `BaseLayout.astro` — null‑guard `themeToggle` and type `theme` param.
5) Remove unused import in `about.astro`.
6) Fix `Hero` lang prop type in `index-new.astro` (allow `de` or narrow type).
