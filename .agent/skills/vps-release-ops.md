---
name: VPS Release Ops
description: Deterministic release operations for VPS deployment: preflight, deploy, smoke checks, rollback, and evidence capture.
---

# VPS Release Ops

## Objective
Ship safely to VPS with reproducible commands and explicit rollback readiness.

## Use When
- Running Phase A migration tasks.
- Any production deploy or release rehearsal.
- Backup/restore and monitoring readiness checks.

## Canonical Runbook
- `.agent/workflows/vps-migration-runbook.md`

## Release Sequence
1. Preflight:
   - `npm ci`
   - `npm run build`
   - `npm run check:affiliate`
   - `npm run lint:images`
   - `npm run lint:agent-docs`
   - `npm run lint:agent-roles`
   - `npm run lint:agent-skills`
2. Deploy:
   - `docker compose up -d --build`
3. Smoke:
   - homepage + sample review pages load
   - `/sitemap.xml` and `/robots.txt` reachable
4. Rollback readiness:
   - confirm last-known-good image/tag exists
5. Evidence capture:
   - deploy logs summary
   - smoke results
   - backup/restore status
   - monitoring status

## Output
- Preferred report path:
  - `.agent/reports/tech-lead/<YYYY-MM-DD>-<task-slug>-plan.md`
- Legacy optional:
  - `.agent/reports/devops/<YYYY-MM-DD>-<task-slug>-release.md`

## Guardrails
- Any failed preflight check blocks deploy.
- Never deploy without rollback target identified.
