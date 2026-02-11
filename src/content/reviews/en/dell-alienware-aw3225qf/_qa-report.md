# QA Report: dell-alienware-aw3225qf

## Summary
- **PASS** ✅ `npm run build` succeeded (EN + RU/DE/FR included).

## Critical issues (build breakers)
- None found.

## Checks performed
- Frontmatter: dates unquoted; title (51 chars) and description (158 chars) within limits; `heroImage: "./image.webp"`; `ogImage: "./og.png"`; `tags[0] == category` (`monitors`).
- Components: imports use `@/components/ui/*`; `ReviewHero` 6/6 props; `UserFeedback` before `ProsCons`; exactly 1× `<AffiliateButton />` at the end.
- User quotes: 4 quotes, unique users, 2–4 sentences each (as provided in Research Pack).
- Links: `Related Reviews` titles/URLs match `prompts/existing-reviews-hardwarelab.md`.
- Assets: `image.webp` and `og.png` present in the review folder.
- Translations: `src/content/reviews/{ru,de,fr}/dell-alienware-aw3225qf/index.mdx` present; internal `/reviews/...` links preserved; `image.webp` + `og.png` copied into each language folder.

## Fixes applied
- None during QA (Editor already applied small cleanup).

## Remaining issues / follow-ups
- `node scripts/update-existing-reviews.mjs` run after build → `prompts/existing-reviews-hardwarelab.md` updated to include this review.
