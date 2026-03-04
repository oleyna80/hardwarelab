---
name: Secrets Hygiene Audit
description: Ensure no secrets are leaked in source code, Docker images, CI logs, or config files. Validate secret rotation practices and access scope.
---

# Secrets Hygiene Audit

## Objective
Prevent secret leaks across the entire delivery pipeline — from source code to deployed containers.

## Use When
- Adding new environment variables or API keys.
- Changing CI/CD secrets or workflow configurations.
- Pre-release security review.
- Periodic audit (monthly).

## Source Code Checks

### 1. Gitignore Coverage
Verify these files are in `.gitignore`:
- `.env`
- `.env.local`
- `.env.production`
- Any file matching `*.pem`, `*.key`, `*.p12`

### 2. Dockerignore Coverage
Verify `.dockerignore` excludes:
- `.env`
- `.git`
- `node_modules`

### 3. Hardcoded Secrets Scan
```bash
# Grep for common secret patterns in source
grep -rn --include='*.ts' --include='*.mjs' --include='*.js' --include='*.astro' \
  -E '(password|secret|api_key|apikey|token|private_key)\s*[:=]\s*["\x27][^"\x27]{8,}' src/ scripts/ || echo "No hardcoded secrets found"

# Check for AWS/GCP/Azure key patterns
grep -rn --include='*.ts' --include='*.mjs' --include='*.js' \
  -E '(AKIA[0-9A-Z]{16}|AIza[0-9A-Za-z_-]{35}|sk-[0-9a-zA-Z]{32,})' src/ scripts/ || echo "No cloud keys found"
```

### 4. PUBLIC_ Prefix Convention
- All client-side env vars must use `PUBLIC_` prefix.
- `PUBLIC_*` vars must contain **zero** sensitive data (only IDs, domains, feature flags).
- Server-side secrets (webhook keys, Turnstile secret) must **never** have `PUBLIC_` prefix.

## Docker Image Checks

### 1. Build Args
- Docker build `ARG` values are visible in image history.
- Never pass secrets via `ARG` — use runtime `ENV` via `docker-compose`.
- Verify: `docker history <image>` should show no secret values.

### 2. File Leak Check
```bash
# Verify .env is not in the image
docker run --rm <image> cat /app/.env 2>&1 | grep -q "No such file" && echo "PASS" || echo "FAIL: .env leaked into image"
```

## CI/CD Checks

### 1. GitHub Secrets Scope
- Secrets should be scoped to minimum required workflows.
- Document all required secrets in `.env.vps.example`.

### 2. Log Masking
- CI logs must not print secret values.
- Use `::add-mask::` in GitHub Actions for dynamic secrets.
- Never `echo $SECRET` in workflow steps.

## Example Files Reference
- `.env.example` — template with placeholder values only
- `.env.vps.example` — VPS deployment template

## Verification
```bash
# Quick check: .env in gitignore
grep -q '^\.env$' .gitignore && echo "PASS" || echo "FAIL"

# Quick check: .env in dockerignore
grep -q '\.env' .dockerignore && echo "PASS" || echo "FAIL"

# Verify example files have no real secrets
grep -cE '[0-9a-f]{32,}' .env.example .env.vps.example && echo "WARN: possible real secrets in example files" || echo "PASS"
```

## Guardrails
- Any hardcoded secret in source code is a **critical blocker**.
- `.env` present in Docker image is a **critical blocker**.
- Secret values in CI logs require immediate rotation.
