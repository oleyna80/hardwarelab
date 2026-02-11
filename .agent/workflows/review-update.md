---
description: Lean workflow for updating legacy reviews
---

# Review Update / Rewrite (Lean)

`Last validated: 2026-02-08`

Use this workflow to modernize outdated reviews.

## Roles In Order

1. `single-researcher` (external): refresh `_research-pack.md` with latest data.
2. `researcher` (internal): full EN rewrite + self-check + regenerate visuals (`image.webp`, `og.png`).
3. `translator`: overwrite RU/DE/FR and run assets copy script.
4. `qa`: final build/compliance/i18n gate.

## Required Steps

1. Update `src/content/reviews/en/<slug>/_research-pack.md`.
2. Rewrite `src/content/reviews/en/<slug>/index.mdx`.
3. Ensure EN assets exist:
   - `src/content/reviews/en/<slug>/image.webp`
   - `src/content/reviews/en/<slug>/og.png`
4. Run translations and sync assets:

```bash
node .agent/skills/scripts/copy-assets-to-translations.mjs <slug>
```

5. Run final QA (`npm run build` must pass after translations).

## Checklist

- [ ] Research pack refreshed
- [ ] EN review rewritten
- [ ] EN visuals regenerated
- [ ] RU/DE/FR overwritten
- [ ] Translation assets synced
- [ ] Final QA PASS
- [ ] Pre-publish affiliate gate PASS (`.agent/workflows/prepublish-affiliate-gate.md`)
