---
name: Dependency Supply Chain Audit
description: Detect known vulnerabilities in npm dependencies and Docker base images. Prevent supply-chain attacks via audit tools and lock-file integrity checks.
---

# Dependency Supply Chain Audit

## Objective
Prevent known CVEs and supply-chain attacks from reaching production through dependencies or base images.

## Use When
- Adding or updating npm packages.
- Bumping Node.js or Alpine base image version in `Dockerfile`.
- Monthly periodic audit.
- Pre-release preflight.

## npm Dependency Checks

### 1. Vulnerability Scan
```bash
npm audit --audit-level=high
```
- Zero `high` or `critical` findings required for release.
- `moderate` findings: document and schedule fix within 30 days.

### 2. Lock File Integrity
```bash
# Verify lock file is in sync with package.json
npm ci
```
- `package-lock.json` must be committed and match `package.json`.
- Never use `npm install` in CI — always `npm ci`.

### 3. Suspicious Packages
Check for red flags:
- `postinstall` / `preinstall` scripts from unfamiliar packages.
- Packages with very low download counts or recent ownership transfers.
- Typosquatting (e.g., `expres` instead of `express`).

```bash
# List all packages with install scripts
npm pkg get scripts --workspaces --json 2>/dev/null || true
# Or inspect manually:
grep -r '"postinstall"' node_modules/*/package.json | head -20
```

## Docker Base Image Checks

### 1. Pin Image Versions
- `Dockerfile` must use specific tags, not `latest`.
- Current: `node:22-alpine` — acceptable (major pin).
- Ideal: pin to digest for reproducibility in critical releases.

### 2. CVE Scanning (when available)
```bash
# If trivy is installed:
trivy image node:22-alpine --severity HIGH,CRITICAL

# Or use Docker Scout:
docker scout cves node:22-alpine --only-severity critical,high
```

### 3. Minimal Image
- Runtime stage must use `--omit=dev` and `--ignore-scripts`.
- No build tools or source code in runtime image.
- Verify: `docker run --rm <image> ls /app/src` should fail (no src in runtime).

## CI Integration Recommendation
Add to CI pipeline:
```yaml
- name: npm audit
  run: npm audit --audit-level=high
```

## Output
- Document findings in coder/tech-lead report.
- If CVEs found: create remediation checklist with severity and fix timeline.

## Guardrails
- Any `critical` npm vulnerability blocks release.
- Base image CVE with known exploit blocks release.
- Never suppress audit warnings without documented justification.
