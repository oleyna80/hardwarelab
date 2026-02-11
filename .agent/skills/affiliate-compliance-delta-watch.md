---
name: Affiliate Compliance Delta Watch
description: Detect policy deltas in Amazon Associates requirements, map changes to project impact, and produce a release-safe remediation checklist.
---

# Affiliate Compliance Delta Watch

## Objective
Track what changed in affiliate policy requirements and translate that into concrete repo actions before release.

## Use When
- Pre-release compliance review for money pages.
- Updating disclosure/CTA/link behavior.
- Periodic policy revalidation (monthly/quarterly).

## Workflow
1. Collect baseline from project docs:
   - `.agent/workflows/amazon-affiliate-compliance.md`
   - `.agent/workflows/prepublish-affiliate-gate.md`
2. Validate current implementation touchpoints:
   - `src/components/ui/AffiliateButton.astro`
   - `src/components/layout/Footer.astro`
   - `.agent/skills/scripts/check-affiliate-links.js`
3. Compare current policy state vs baseline and classify:
   - `UNCHANGED`, `CHANGED`, `NEW`, `UNKNOWN`
4. Build impact matrix:
   - affected files
   - severity (`critical`, `major`, `minor`)
   - required owner (`tech-lead`, `coder`, `researcher`, `translator`, `qa`)
5. Emit remediation checklist with pass/fail criteria.

## Output
- Compliance report:
  - `.agent/reports/compliance/<YYYY-MM-DD>-<task-slug>-compliance.md`
- Use template:
  - `.agent/reports/compliance/_template.md`

## Guardrails
- If policy interpretation is uncertain, mark as `UNKNOWN` and treat as blocking for release.
- Never relax disclosure or link-rel requirements without explicit policy confirmation.
