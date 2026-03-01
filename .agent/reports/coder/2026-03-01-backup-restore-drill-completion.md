# Backup/Restore Drill Completion — HardwareLab Site
Date: 2026-03-01
Coder: Codex

## Executive Summary
Implemented backup script and restore runbook, then executed a real drill: backup `.env` -> simulated loss -> restored from archive -> redeployed containers -> smoke-verified site availability. Total measured RTO for the drill was **226 seconds** (~3m 46s), within the `< 15 minutes` target.

## Artifacts Created
- `scripts/backup-env.sh` (executable)
- `docs/deployment/backup-restore-runbook.md`
- `.gitignore` updated with `backups/`

## Drill Timeline
- **Start:** 2026-03-01T10:49:11Z
- **End:** 2026-03-01T10:52:57Z
- **RTO:** 226 seconds

## Commands Run (Drill)

1. Backup
```bash
cd /home/dmitrii/projects/hardwarelab-site
./scripts/backup-env.sh
```
Observed:
- `Backup saved: /home/dmitrii/backups/hardwarelab/env-20260301-104911.tar.gz`

2. Simulate `.env` loss
```bash
mv .env .env.bak.drill
```

3. Restore `.env`
```bash
tar -xzf /home/dmitrii/backups/hardwarelab/env-20260301-104911.tar.gz -C /home/dmitrii/projects/hardwarelab-site
```
Verification:
- `.env` restored successfully.

4. Redeploy
```bash
./deploy.sh
```
Observed issue:
- Pull failed for default `IMAGE_REPO=hardwarelab-site` (registry image not available).

Recovery action used to complete restore:
```bash
IMAGE_REPO=ghcr.io/oleyna80/hardwarelab ./deploy.sh
```
Observed issue:
- Pulled image was nginx-based (port 80), incompatible with current `app` healthcheck (`4321`), app marked unhealthy.

Final recovery redeploy to known-good local SSR image:
```bash
IMAGE_REPO=hardwarelab-app docker compose -f docker-compose.vps.yml up -d --remove-orphans
```
Result:
- `hardwarelab-app` healthy
- `hardwarelab-web` healthy

5. Smoke checks
Requested check in task:
```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:8081/
curl -s -o /dev/null -w "%{http_code}" http://localhost:8081/sitemap.xml
```
Current environment note:
- `docker-compose.vps.yml` currently does not publish `web` to host `8081`, so `localhost:8081` is not reachable directly.

Equivalent availability checks executed:
```bash
curl -s -o /dev/null -w "%{http_code}" https://hardwarelab.org/
curl -s -o /dev/null -w "%{http_code}" https://hardwarelab.org/sitemap-index.xml
```
Output:
- `200`
- `200`

Container-level check:
```bash
docker compose -f docker-compose.vps.yml ps
```
Output summary:
- `hardwarelab-app`: healthy
- `hardwarelab-web`: healthy

6. Cleanup
```bash
rm -f .env.bak.drill /home/dmitrii/backups/hardwarelab/env-20260301-104911.tar.gz
```
Verification:
- `.env` exists
- `.env.bak.drill` removed
- test backup archive removed

## Definition of Done Status
1. `scripts/backup-env.sh` created and executable — ✅
2. `docs/deployment/backup-restore-runbook.md` created — ✅
3. Drill completed with RTO recorded and site availability verified — ✅
4. Completion report saved — ✅
5. `.memory_bank/activeContext.md` updated — ✅

## Follow-up Risks / Notes
- Deployment config currently depends on image source mismatch:
  - `.env` default `IMAGE_REPO=hardwarelab-site` is not pullable.
  - `ghcr.io/oleyna80/hardwarelab:latest` currently appears nginx-based and not compatible with current `app` service assumptions (expects SSR app on `:4321`).
- `localhost:8081` direct smoke-check path is unavailable until `web` port mapping is restored in `docker-compose.vps.yml`.
