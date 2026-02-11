# QA TASK TEMPLATE

## Context
- Slug:
- Release level check required: yes/no

## Inputs
- EN: `src/content/reviews/en/<slug>/index.mdx`
- RU/DE/FR: `src/content/reviews/{ru,de,fr}/<slug>/index.mdx`
- Research pack: `src/content/reviews/en/<slug>/_research-pack.md`

## Required Skills
- `seo-content-structure`
- `translation-integrity-check`
- (Optional) `affiliate-compliance-delta-watch`

## Commands
- `npm run check:review-package -- <slug>`
- `npm run build`
- `npm run check:affiliate`

## Deliverables
- QA report: `src/content/reviews/en/<slug>/_qa-report.md`
- Optional release report: `.agent/reports/compliance/<YYYY-MM-DD>-<task-slug>-compliance.md`
- Final PASS/FAIL handoff block
