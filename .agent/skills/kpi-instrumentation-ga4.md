---
name: KPI Instrumentation GA4
description: Standardize analytics instrumentation for affiliate KPIs (organic sessions, affiliate CTR, conversion inputs) with consistent event schema and QA checks.
---

# KPI Instrumentation GA4

## Objective
Ensure KPI events are implemented consistently so roadmap metrics remain comparable across releases.

## Canonical KPI Source
- `.memory_bank/kpi-framework.md`

## Use When
- Adding/changing CTA components.
- Updating analytics logic, event names, event params.
- Refactoring page templates that affect money-page tracking.

## Event Baseline
- Core event: `affiliate_click`
- Required params:
  - `slug`
  - `locale`
  - `page_type` (`review`, `comparison`, `guide`, `other`)
  - `cta_position` (`hero`, `mid`, `verdict`, `footer`, `other`)
  - `asin` (if available)

## Implementation Checklist
1. Confirm event naming and params are stable (no accidental renames).
2. Keep analytics optional behind existing env/config toggles.
3. Avoid PII in events.
4. Ensure localized pages send identical param schema.
5. Validate no duplicate event fire on single click.

## Verification
- Build passes: `npm run build`
- Affiliate checks pass: `npm run check:affiliate`
- If UI touched, run E2E smoke: `npm run test:e2e` (or targeted Playwright spec)

## Output
- Document instrumentation changes in coder report:
  - `.agent/reports/coder/<YYYY-MM-DD>-<task-slug>-completion.md`
- Mention KPI impact in tech-lead plan/report when relevant.
