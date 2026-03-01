# GitHub -> VPS Deployment

## 1) Pre-publish checks (local)

Run before push:

```bash
npm ci
npm run check:ci
```

## 2) Push to GitHub

```bash
git add .
git commit -m "Prepare release"
git push origin main
```

After push:
- `CI` validates lint/types/build/affiliate/e2e.
- `Docker Publish` runs only after successful `CI` and pushes immutable image tag: `sha-<commit>`.
- `Deploy to VPS` runs only after successful `Docker Publish` and deploys the same immutable tag.

## 3) Prepare VPS (one-time)

Install on VPS:
- Docker Engine
- Docker Compose plugin

Create app directory, for example:

```bash
sudo mkdir -p /opt/hardwarelab
sudo chown -R $USER:$USER /opt/hardwarelab
```

Copy `docker-compose.vps.yml` and create `.env` from `.env.vps.example`:

```bash
cp docker-compose.vps.yml /opt/hardwarelab/
cp .env.vps.example /opt/hardwarelab/.env
```

Update `/opt/hardwarelab/.env`:
- `IMAGE_REPO=ghcr.io/<owner>/<repo>`
- `IMAGE_TAG=sha-<commit-sha>` (immutable deploy source)
- `APP_PORT=8081` (or your choice)

## 4) Configure GitHub Secrets

Repository secrets required by `Deploy to VPS` workflow:
- `VPS_HOST`
- `VPS_USER`
- `VPS_SSH_KEY`
- `VPS_PORT` (optional, default `22`)
- `VPS_APP_DIR` (e.g. `/opt/hardwarelab`)
- `GHCR_USERNAME`
- `GHCR_TOKEN` (PAT with `read:packages`)

## 5) Deploy

Default mode:
- Automatic deploy after successful `CI -> Docker Publish` chain.

Manual mode:
- Run `Deploy to VPS` (`workflow_dispatch`) and pass explicit immutable `image_tag` (must be `sha-*`, never `latest`).

Workflow deploy steps:
1. SSH to VPS
2. `docker login ghcr.io`
3. `docker compose -f docker-compose.vps.yml config` (preflight render)
4. `docker compose -f docker-compose.vps.yml pull`
5. `docker compose -f docker-compose.vps.yml up -d --remove-orphans`

## 6) Verify on VPS

```bash
cd /opt/hardwarelab
docker compose -f docker-compose.vps.yml ps
docker compose -f docker-compose.vps.yml logs -f --tail=100
curl -I http://127.0.0.1:${APP_PORT}
```

## 7) Runtime contract (canonical)

- `app` container: Astro SSR (`@astrojs/node`) on `:4321`, health endpoint `GET /health`.
- `web` container: Nginx reverse proxy using `nginx.proxy.conf` forwarding traffic to `app:4321`.
- Static Nginx contract is deprecated for production deploy path.

## 8) Go-Live checklist (copy/paste)

Replace `NEW_SHA` and run from WSL:

```bash
REPO="oleyna80/hardwarelab"
NEW_SHA="15e95e1d8c6f7630125babc0f5ad4521e63249c2"
IMAGE_TAG="sha-${NEW_SHA}"

gh workflow run "Deploy to VPS" -R "$REPO" -f image_tag="$IMAGE_TAG"
sleep 5
gh run list -R "$REPO" --workflow "Deploy to VPS" --limit 3
```

After workflow success, verify on VPS:

```bash
ssh dmitrii@178.156.212.10 '
set -e
cd /home/dmitrii/projects/hardwarelab-site
docker compose -f docker-compose.vps.yml ps
docker inspect hardwarelab-app --format "{{.Config.Image}}"
curl -fsS http://127.0.0.1:4321/health
'
```

Public smoke checks:

```bash
curl -f https://hardwarelab.org/
curl -f https://hardwarelab.org/health
```

## 9) Rollback checklist (copy/paste)

Replace `PREV_SHA` with last known-good commit SHA and run from WSL:

```bash
REPO="oleyna80/hardwarelab"
PREV_SHA="15e95e1d8c6f7630125babc0f5ad4521e63249c2"
IMAGE_TAG="sha-${PREV_SHA}"

gh workflow run "Deploy to VPS" -R "$REPO" -f image_tag="$IMAGE_TAG"
sleep 5
gh run list -R "$REPO" --workflow "Deploy to VPS" --limit 3
```

If rollback run fails, inspect failed logs:

```bash
RUN_ID="<failed_run_id>"
gh run view -R "$REPO" "$RUN_ID" --log-failed
```

## 10) Monitoring baseline (Phase A)

Repository includes `.github/workflows/uptime-monitor.yml`:
- schedule: every 5 minutes
- checks: `/`, `/health`, `/sitemap-index.xml`
- failure actions:
  - creates/updates GitHub issue `Uptime alert: hardwarelab.org`
  - uploads probe artifacts (`/tmp/uptime`)
  - optionally sends webhook alert (if `UPTIME_ALERT_WEBHOOK` secret is set)
- recovery action:
  - auto-closes open uptime alert issue

Optional configuration:
- Repository Variable: `SITE_BASE_URL` (default fallback: `https://hardwarelab.org`)
- Repository Secret: `UPTIME_ALERT_WEBHOOK` (Telegram/Slack/custom webhook)

Manual run:

```bash
gh workflow run "Uptime Monitor" -R oleyna80/hardwarelab
gh run list -R oleyna80/hardwarelab --workflow "Uptime Monitor" --limit 3
```

Runbook:
- `docs/operations/monitoring-baseline.md`
