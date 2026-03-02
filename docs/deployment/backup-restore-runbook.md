# Backup & Restore Runbook — HardwareLab VPS

## Scope
This runbook covers recovery for the HardwareLab site deployment on VPS. The site is stateless, so the only critical VPS-local backup artifact is runtime `.env`.

## What Must Be Backed Up
- Critical: `/home/dmitrii/projects/hardwarelab-site/.env`
- Recoverable from git: source code, `docker-compose.vps.yml`, `deploy.sh`
- Optional: Nginx Proxy Manager data volume backup

## Backup Procedure

1. Run backup script:
   ```bash
   cd /home/dmitrii/projects/hardwarelab-site
   ./scripts/backup-env.sh
   ```
2. Confirm archive exists under:
   - `/home/dmitrii/backups/hardwarelab/env-YYYYMMDD-HHMMSS.tar.gz`
3. Store backup file off-host (recommended) for disaster recovery.

## Restore Procedure (Full Site Recovery)

### Assumptions
- Fresh VPS (Ubuntu 24.04) or same VPS after data loss
- Docker + Docker Compose plugin installed
- Nginx Proxy Manager running with `npm_default` network

### Step 1: Clone repo
```bash
git clone https://github.com/<org>/hardwarelab-site.git \
  /home/dmitrii/projects/hardwarelab-site
cd /home/dmitrii/projects/hardwarelab-site
```

### Step 2: Restore `.env`
```bash
# From backup:
tar -xzf /path/to/env-YYYYMMDD-HHMMSS.tar.gz -C /home/dmitrii/projects/hardwarelab-site

# Or recreate manually from .env.vps.example and fill in secrets.
```

### Step 3: Authenticate to GHCR
```bash
# PAT must have `read:packages` scope:
echo "ghp_TOKEN" | docker login ghcr.io -u oleyna80 --password-stdin
```

### Step 4: Connect to `npm_default` network (if new VPS)
```bash
# Run deploy first, then:
docker network connect npm_default hardwarelab-web --alias hardwarelab-web
```

### Step 5: Deploy
```bash
cd /home/dmitrii/projects/hardwarelab-site
# IMAGE_TAG must be immutable sha-* (latest is forbidden)
IMAGE_TAG=$(grep -E '^IMAGE_TAG=' .env | head -n1 | cut -d= -f2-)
test -n "$IMAGE_TAG" && [ "$IMAGE_TAG" != "latest" ]
./deploy.sh "$IMAGE_TAG"
```

### Step 6: Smoke check
```bash
# Internal container check (preferred — no host port exposure required):
docker compose -f docker-compose.vps.yml ps
# Expected: hardwarelab-app = healthy, hardwarelab-web = healthy

# SSR health from inside app container:
docker exec hardwarelab-app wget -qO- http://127.0.0.1:4321/health
# Expected: {"status":"ok"}

# External check (requires live DNS/HTTPS):
curl -s -o /dev/null -w "%{http_code}" https://hardwarelab.org/
# Expected: 200
```

## Recovery Time Objective (RTO)
Target: under 15 minutes from a fresh VPS when valid backup and image access are available.

## Drill Checklist
1. Take backup (`./scripts/backup-env.sh`)
2. Simulate `.env` loss (rename)
3. Restore `.env` from archive
4. Redeploy with immutable tag from `.env` (`IMAGE_TAG=sha-*`, never `latest`)
5. Verify app health via `docker compose -f docker-compose.vps.yml ps` (both services healthy), `docker exec hardwarelab-app wget -qO- http://127.0.0.1:4321/health`, and `https://hardwarelab.org/` returns `200`
6. Cleanup drill artifacts
