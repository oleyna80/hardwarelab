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
- `CI` workflow validates lint/types/build/affiliate/e2e.
- `Docker Publish` builds and pushes image to `ghcr.io/<owner>/<repo>`.

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
- `IMAGE_TAG=latest` (or a release tag)
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

Run workflow `Deploy to VPS` manually (`workflow_dispatch`) and set `image_tag`.

The workflow will:
1. SSH to VPS
2. `docker login ghcr.io`
3. `docker compose -f docker-compose.vps.yml pull`
4. `docker compose -f docker-compose.vps.yml up -d --remove-orphans`

## 6) Verify on VPS

```bash
cd /opt/hardwarelab
docker compose -f docker-compose.vps.yml ps
docker compose -f docker-compose.vps.yml logs -f --tail=100
curl -I http://127.0.0.1:${APP_PORT}
```

## 7) Reverse proxy (recommended)

Put Nginx/Caddy in front of app for:
- HTTPS (Let's Encrypt)
- domain routing (`hardwarelab.org`)
- gzip/brotli and security headers
