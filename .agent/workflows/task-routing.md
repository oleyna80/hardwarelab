---
description: Fast routing matrix for selecting the right role, required skills, and output artifacts.
---

# Task Routing Matrix

`Last validated: 2026-02-08`

Use this file to pick the correct agent role with minimal ambiguity.

## Quick Rule

1. If task changes product content -> content lane (`single-researcher -> researcher -> translator -> qa`).
2. If task changes code/platform/CI -> engineering lane (`tech-lead -> coder -> tech-lead/human review`).
3. If task is release/compliance critical -> apply pre-publish gate before final PASS.

## Routing Table

| Task Type | Primary Role | Mandatory Skills | Output |
|---|---|---|---|
| New review research pack | `single-researcher` | `hardware-accuracy-check` | `src/content/reviews/en/<slug>/_research-pack.md` |
| EN review writing + visuals | `researcher` | `seo-content-structure`, `integrator-tone-voice`, `journalistic-hook-mastery`, `visual-asset-generator` | `en/<slug>/index.mdx`, `image.webp`, `og.png` |
| RU/DE/FR translation | `translator` | `translation-integrity-check` | `ru/de/fr/<slug>/index.mdx` + copied assets |
| Final content gate | `qa` | `seo-content-structure`, `translation-integrity-check`, `affiliate-compliance-delta-watch` | `en/<slug>/_qa-report.md` (+ optional compliance report) |
| Feature/bug in codebase | `tech-lead` -> `coder` | `astro-architecture-expert`, `technical-seo-audit` (+ `kpi-instrumentation-ga4` if analytics) | tech plan + coder completion report |
| VPS deploy/release rehearsal | `tech-lead` | `vps-release-ops` | `.agent/reports/tech-lead/<date>-<slug>-plan.md` |
| Affiliate policy delta review | `qa` or `tech-lead` | `affiliate-compliance-delta-watch` | `.agent/reports/compliance/<date>-<slug>-compliance.md` |
| KPI tracking changes | `coder` (planned by tech-lead) | `kpi-instrumentation-ga4` | code + coder report with KPI impact note |
| Agent docs/roles/skills governance | `tech-lead` | `memory-bank-manager` | updated docs + lint pass evidence |

## Required Gates

1. Docs changes:
   - `npm run lint:agent-docs`
   - `npm run lint:agent-roles`
   - `npm run lint:agent-skills`
2. Content release:
   - `npm run check:review-package -- <slug>`
   - `npm run build`
   - `npm run check:affiliate`
   - pre-publish workflow: `.agent/workflows/prepublish-affiliate-gate.md`
3. Platform release:
   - VPS runbook: `.agent/workflows/vps-migration-runbook.md`

## Templates

Use standardized task shells from:
- `.agent/templates/tech-lead-task.md`
- `.agent/templates/coder-task.md`
- `.agent/templates/researcher-task.md`
- `.agent/templates/qa-task.md`
