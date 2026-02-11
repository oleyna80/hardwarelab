---
description: Final pre-publish gate for affiliate compliance and monetization hygiene
---

# Pre-Publish Affiliate Gate

`Last validated: 2026-02-08`

Use this gate before publishing any review/comparison page that contains affiliate links.

## Scope

- Review pages: `src/content/reviews/**/index.mdx`
- Comparison or money pages with affiliate CTAs
- All locales (EN, RU, DE, FR)

## Mandatory Checks

1. Build integrity
```bash
npm run check:review-package -- <slug>
npm run build
```

2. Affiliate policy checks
```bash
npm run check:affiliate
```

3. Content-level compliance
- Disclosure exists and is visible before the first affiliate CTA.
- No prohibited CTA language (incentivized clicks, fake urgency, guaranteed claims).
- No hard price statements without date/disclaimer.
- Affiliate links use expected routing/tag strategy for locale.

4. i18n parity (if translations exist)
- `ru/de/fr` versions exist for required pages.
- Localized pages do not break disclosure/compliance rules.
- `image.webp` and `og.png` exist where frontmatter references them.

## Artifacts

For release-level checks, write a report to:
- `.agent/reports/compliance/<YYYY-MM-DD>-<task-slug>-compliance.md`

Use template:
- `.agent/reports/compliance/_template.md`

For content QA gate on a specific review:
- `src/content/reviews/en/<slug>/_qa-report.md`

## Pass/Fail Rule

- PASS only if `npm run build` and `npm run check:affiliate` both pass
  and no critical policy/content issues remain.
- FAIL if any critical issue is open.

## Related

- `.agent/workflows/amazon-affiliate-compliance.md`
- `.agent/workflows/review-creation-full.md`
- `.agent/workflows/review-update.md`
- `.agent/AGENT_CONTRACT.md`
- `.agent/skills/affiliate-compliance-delta-watch.md`
- `.agent/skills/translation-integrity-check.md`
