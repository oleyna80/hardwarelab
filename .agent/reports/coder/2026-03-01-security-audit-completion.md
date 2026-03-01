# Security Audit Report — HardwareLab Site
Date: 2026-03-01
Auditor: Codex

## Executive Summary
Code audit completed across API, nginx, env/secrets, dependencies, attack surface, and container setup. High-risk hardening was applied to contact API request handling and reverse-proxy trust boundaries; dependency risk was reduced from 1 critical + 3 high to no high/critical findings. Remaining open risks are architecture/product decisions (CSP inline scripts migration, feed exposure policy, webhook auth model).

## Findings

### [HIGH] Contact API body-size enforcement relied on `Content-Length` header (bypassable)
- **File/Location:** src/pages/api/contact.ts:340, src/pages/api/contact.ts:378
- **Description:** The endpoint checked `content-length` but parsed body via `request.json()`. A client could lie about `Content-Length` and still send oversized streamed payloads.
- **Risk:** DoS/memory pressure against API worker despite nominal 16KB limit.
- **Recommendation:** Enforce byte limit while streaming body before JSON parse.
- **Status:** [x] Fixed

```ts
body = await parseJsonBodyWithLimit(request, MAX_REQUEST_BODY_BYTES);
if (error instanceof PayloadTooLargeError) return jsonResponse({ success: false, error: "Payload too large" }, 413);
```

### [HIGH] Webhook URL host was not validated (SSRF-by-misconfiguration)
- **File/Location:** src/pages/api/contact.ts:485
- **Description:** `N8N_WEBHOOK_URL` was previously used directly by `fetch()` with no hostname allowlist.
- **Risk:** If runtime env is misconfigured/poisoned, app can be forced to call internal/metadata endpoints.
- **Recommendation:** Parse URL and require host in explicit allowlist.
- **Status:** [x] Fixed

```ts
const n8nWebhookUrl = parseAndValidateWebhookUrl(n8nWebhookUrlRaw, parseAllowedWebhookHosts());
```

### [HIGH] Reverse proxy trusted full private RFC1918 ranges for real IP
- **File/Location:** nginx.conf:21-35
- **Description:** `set_real_ip_from` and `$is_allowed_proxy` accepted all private ranges, not only expected upstream network.
- **Risk:** Any rogue container on private ranges could spoof `X-Forwarded-For` and bypass trust assumptions.
- **Recommendation:** Restrict trusted proxy sources to actual upstream network used by NPM.
- **Status:** [x] Fixed

```nginx
set_real_ip_from 127.0.0.1;
set_real_ip_from 172.18.0.0/16;
map $realip_remote_addr $is_allowed_proxy { 127.0.0.1 1; ~^172\.18\. 1; }
```

### [MEDIUM] Rate-limit bypass for `unknown` client IP
- **File/Location:** src/pages/api/contact.ts:269-288
- **Description:** Requests with unresolved IP were not rate-limited.
- **Risk:** Abuse path for clients with missing/stripped forwarding headers.
- **Recommendation:** Apply bucketed limit for `unknown` and add regular stale-key cleanup.
- **Status:** [x] Fixed

### [MEDIUM] CSP profile lacked some hardening directives and cross-domain policy header
- **File/Location:** nginx.conf:54-57
- **Description:** `X-Permitted-Cross-Domain-Policies` was missing; `worker-src`, `manifest-src`, `media-src` were absent.
- **Risk:** Broader browser fallback behavior than needed.
- **Recommendation:** Add explicit restrictive directives.
- **Status:** [x] Fixed

### [MEDIUM] nginx request body limit was wider than application contract
- **File/Location:** nginx.conf:16
- **Description:** nginx allowed 2MB while `/api/contact` expected 16KB-level payloads.
- **Risk:** Unnecessary upstream buffering and mismatch in enforcement layers.
- **Recommendation:** Lower proxy limit to match practical endpoint usage.
- **Status:** [x] Fixed

### [MEDIUM] Production defaults allowed Turnstile bypass unless manually enabled
- **File/Location:** docker-compose.vps.yml:13, .env.vps.example:16
- **Description:** Production compose default was `TURNSTILE_ENFORCE=false`.
- **Risk:** Captcha check can be unintentionally disabled in production.
- **Recommendation:** Default to fail-closed in VPS template/compose.
- **Status:** [x] Fixed

### [MEDIUM] Webhook authentication still uses bearer-style shared secret header
- **File/Location:** src/pages/api/contact.ts:536-539
- **Description:** `X-Webhook-Secret` is sent directly per request.
- **Risk:** Secret leakage via downstream request logs.
- **Recommendation:** Move to HMAC signature (`X-Webhook-Signature`, timestamped payload) and keep dual mode during migration.
- **Status:** [ ] Open

### [LOW] `sec-fetch-site: none` path was permissive
- **File/Location:** src/pages/api/contact.ts:358-365
- **Description:** `none` was accepted along with same-origin/site.
- **Risk:** Weakens browser-context signal checks for non-standard clients.
- **Recommendation:** Accept only `same-origin`/`same-site` when header is present.
- **Status:** [x] Fixed

### [LOW] Input sanitizer did not strip Unicode bidi overrides
- **File/Location:** src/pages/api/contact.ts:50-55
- **Description:** Text sanitizer only removed ASCII control chars.
- **Risk:** Log/UI spoofing with bidi control characters.
- **Recommendation:** Remove bidi override/isolate codepoints during sanitization.
- **Status:** [x] Fixed

### [LOW] `latest-reviews` is intentionally public and includes `asin`/marketing metadata
- **File/Location:** src/pages/api/latest-reviews.json.ts:71-87
- **Description:** Feed exposes `asin`, `rating`, `priceCategory`, `socialText`; CORS is `*`.
- **Risk:** Easier third-party scraping and reuse of curated data.
- **Recommendation:** Product decision: keep open for distribution, or remove sensitive fields and narrow CORS.
- **Status:** [ ] Open

### [INFO] Health endpoint exposure
- **File/Location:** src/pages/health.ts:1-9
- **Description:** Returns plain `ok`; no version/env/state disclosure.
- **Risk:** Minimal.
- **Recommendation:** Keep as is.
- **Status:** [x] Fixed

### [INFO] Backup/debug files attack surface
- **File/Location:** src/pages/_index-new.astro.backup, src/pages/_index-old.astro.backup, debug-collections.js
- **Description:** Backup files use `.astro.backup` extension and are not Astro routes; `debug-collections.js` is repo-root script (not served from `src/pages` or `public`).
- **Risk:** No direct public exposure in current routing model.
- **Recommendation:** Optional cleanup for repo hygiene.
- **Status:** [x] Fixed

### [INFO] Docker/container baseline
- **File/Location:** Dockerfile:37-54, docker-compose.vps.yml:1-66, .dockerignore:1-25
- **Description:** Runtime container runs as non-root (`USER node`), `NODE_ENV=production` set, secrets injected via runtime env, `.dockerignore` excludes `.env`, `.git`, `.agent`, `.memory_bank`.
- **Risk:** No high-impact issue found in this area.
- **Recommendation:** Keep current model.
- **Status:** [x] Fixed

### [MEDIUM] Remaining dependency advisories are dev-toolchain only
- **File/Location:** package-lock.json (transitive), package.json:40-51
- **Description:** After `npm audit fix`, remaining moderate findings are tied to `@astrojs/check` / `yaml-language-server` chain (`lodash` advisory GHSA-xxjr-mmjv-4gpg). Full fix requires breaking downgrade path via `npm audit fix --force`.
- **Risk:** Dev/CI tooling exposure, not production runtime request path.
- **Recommendation:** Track upstream fix in `@astrojs/check` ecosystem; avoid `--force` downgrade without compatibility review.
- **Status:** [ ] Open

## npm audit results

### Initial run (`npm audit --audit-level=moderate`)
- 16 vulnerabilities total: 1 critical, 3 high, 7 moderate, 5 low.
- Major advisories included:
  - `basic-ftp` (critical, GHSA-5rq4-664w-9x2c, transitive via `@lhci/cli`, dev-only)
  - `minimatch` (high, GHSA-3ppc-4f35-3m26 / GHSA-7r86-cg39-jmmj / GHSA-23c5-xmqv-rm74, mostly dev chains)
  - `rollup` (high, GHSA-mw96-cpmx-2vgc, transitive via `astro`/`vite`, build tool)
  - `@isaacs/brace-expansion` (high, GHSA-7h2j-956f-4vf2, dev chain)

### After remediation (`npm audit fix`)
- 9 vulnerabilities total: 0 critical, 0 high, 5 moderate, 4 low.
- Remaining moderate+ findings:
  - `lodash` advisory GHSA-xxjr-mmjv-4gpg in `yaml-language-server` chain (`@astrojs/check` ecosystem), transitive, dev/tooling scope.

### Production runtime view (`npm audit --omit=dev --audit-level=moderate`)
- `found 0 vulnerabilities`

### Target package check
- `astro`: no direct advisory remaining after fix (runtime prod audit clean).
- `@astrojs/mdx`: no advisory reported.
- `sharp`: no advisory reported.

## Area Coverage Summary

1. **API Endpoints:** Covered (`contact.ts`, `latest-reviews.json.ts`, `health.ts`).
2. **nginx Configuration:** Covered; trust boundary and header hardening updated.
3. **Environment & Secrets:** Covered; safer defaults + webhook host allowlist added.
4. **Dependencies:** Covered with pre/post audit evidence.
5. **Information Disclosure & Attack Surface:** Covered; no routing exposure from backup/debug files.
6. **Docker & Container Security:** Covered; no critical misconfig found.

## What Was Fixed
- Hardened `contact.ts`:
  - stream-level request-body limit,
  - no bypass for `unknown` rate-limit identity,
  - periodic + bounded rate-limit key cleanup,
  - webhook URL host allowlisting,
  - stricter `sec-fetch-site` acceptance,
  - bidi character stripping.
- Hardened `nginx.conf`:
  - narrowed trusted proxy network,
  - reduced `client_max_body_size`,
  - added `X-Permitted-Cross-Domain-Policies`,
  - expanded explicit CSP directives.
- Hardened production defaults:
  - `TURNSTILE_ENFORCE` defaulted to `true` for VPS,
  - introduced `N8N_WEBHOOK_ALLOWED_HOSTS` in env templates/compose.
- Dependency risk reduction:
  - executed `npm audit fix`; removed all high/critical findings and cleaned production moderate+ to zero.

## What Requires Human Decision
- Migrate webhook auth from shared header secret to HMAC-signed payload contract with n8n.
- Decide policy for `/api/latest-reviews.json` field exposure + wildcard CORS.
- Plan CSP migration off `'unsafe-inline'` (nonce/hash-based approach) without breaking analytics/consent scripts.
- Decide whether to apply `npm audit fix --force` for dev-tooling chain (`@astrojs/check` ecosystem), considering potential breakage.
