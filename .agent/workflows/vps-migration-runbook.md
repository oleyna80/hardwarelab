---
description: Phase A runbook for WSL -> VPS migration and production hardening
---

# VPS Migration Runbook (Phase A)

`Last validated: 2026-02-08`

## Goal

Complete technical migration from WSL-hosted workflow to stable VPS production by **2026-03-31**.

Skills to use:
- `.agent/skills/vps-release-ops.md`
- `.agent/skills/kpi-instrumentation-ga4.md` (if deploy includes analytics changes)

## Definition Of Done

- App is deployed on VPS and serves production traffic behind HTTPS.
- Deployment is reproducible from documented commands.
- Backup/restore procedure is tested.
- Monitoring and alerting are active.
- Baseline CI checks are running (`build`, `check:affiliate`, `lint:images`, `lint:agent-docs`, `lint:agent-roles`, `lint:agent-skills`).

## 1) Infrastructure Baseline

1. Provision VPS (Ubuntu/Debian), create non-root deploy user.
2. Install Docker + Docker Compose plugin.
3. Configure reverse proxy (Nginx/Proxy Manager) and TLS certificate.
4. Configure restart policy for service/container.

## 2) Environment And Secrets

1. Prepare `.env` on VPS from `.env.example`.
2. Validate required env vars for affiliate and site domain.
3. Store secrets outside git (server-level env file or secrets manager).

## 3) Deployment Procedure

```bash
npm ci
npm run build
npm run check:affiliate
npm run lint:images
npm run lint:agent-docs
npm run lint:agent-roles
npm run lint:agent-skills
docker compose up -d --build
```

Post-deploy smoke checks:
1. Homepage and at least 3 review URLs load.
2. `/sitemap.xml` and `/robots.txt` are reachable.
3. Affiliate links render with required `rel` attributes.

## 4) Backup And Recovery

1. Define backup scope (repo snapshot, env files, deployment configs).
2. Schedule backup job (daily incremental + weekly full).
3. Document restore commands.
4. Run one restore drill and record duration/outcome.

## 5) Monitoring And Alerts

1. Uptime monitor (5-min interval).
2. Basic error log collection from container/proxy.
3. Alerts to email/telegram on downtime and repeated 5xx.

## 6) CI Baseline

Recommended GitHub Actions checks:
1. `npm ci`
2. `npm run build`
3. `npm run check:affiliate`
4. `npm run lint:images`
5. `npm run lint:agent-docs`
6. `npm run lint:agent-roles`
7. `npm run lint:agent-skills`

## 7) Rollback

1. Keep previous working image/tag.
2. On failure, redeploy last known good image.
3. Verify smoke checks after rollback.

## 8) Audit Artifacts

Save evidence in `.agent/reports/tech-lead/` (or `.agent/reports/devops/` if legacy role explicitly used):
- release checklist
- deploy logs summary
- backup/restore test report
- monitoring setup snapshot
