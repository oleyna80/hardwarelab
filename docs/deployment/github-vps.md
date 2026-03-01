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
