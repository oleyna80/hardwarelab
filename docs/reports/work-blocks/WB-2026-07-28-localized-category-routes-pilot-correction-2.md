# WB-009 Correction Round 2

## Reviewer finding addressed

Localized category-detail classification accepted every supported `Language`,
including English. The generated localized category routes are limited to the
catalog's `localizedCategoryLanguages` (`fr`, `de`, and `ru`) combined with
supported category slugs. Consequently, `/en/categories/mini-pc` must remain a
localized `other` route and must not be a money page.

## Correction

- `classifyRoute()` now requires both a supported catalog slug and membership
  in `localizedCategoryLanguages` before classifying a localized category
  detail route.
- Added a direct Vitest contract asserting `/en/categories/mini-pc` produces
  `kind: "other"`, `lang: "en"`, `isLocalized: true`, and
  `isMoneyPage: false`.
- Valid `fr`, `de`, and `ru` single-slug catalog routes retain their
  `category-detail` money-page classification. Unknown slugs and extra
  segments retain localized `other` classification.

## Paths changed

- `src/utils/routing.ts`
- `src/utils/routing.test.ts`
- `docs/reports/work-blocks/WB-2026-07-28-localized-category-routes-pilot-correction-2.md`

## Checks

- `npx vitest run src/utils/routing.test.ts` — passed: 1 file, 4 tests.
- `npm run check:types` — passed: 0 errors, 0 warnings, 92 existing hints.
- `git diff --check -- src/utils/routing.ts src/utils/routing.test.ts` — passed.

## Scope

No scope expansion. No dependencies, configuration, content, install, server,
commit, or push actions were performed.
