---
name: Security Headers Audit
description: Validate HTTP security headers (CSP, HSTS, X-Frame-Options, etc.) on deployed site and in nginx config to prevent regressions.
---

# Security Headers Audit

## Objective
Ensure all HTTP security headers remain correctly configured and haven't regressed after nginx/proxy config changes.

## Use When
- Changing `nginx.proxy.conf` or any proxy/reverse-proxy setup.
- Pre-release verification on staging/production.
- Periodic security review (monthly).

## Required Headers Checklist

| Header | Expected Value | Source |
|--------|---------------|--------|
| `Content-Security-Policy` | Match `nginx.proxy.conf` CSP directive | nginx |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` | nginx |
| `X-Content-Type-Options` | `nosniff` | nginx |
| `X-Frame-Options` | `SAMEORIGIN` | nginx |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | nginx |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | nginx |
| `Cross-Origin-Opener-Policy` | `same-origin` | nginx |
| `Cross-Origin-Resource-Policy` | `same-origin` | nginx |
| `X-Permitted-Cross-Domain-Policies` | `none` | nginx |

## Negative Checks
- ❌ `Server` header must NOT leak version (`server_tokens off`)
- ❌ `X-Powered-By` must NOT be present (Node/Express default)

## CSP Consistency
When updating CSP, verify allowed sources match actual dependencies:
- `script-src`: Google Tag Manager, Google Analytics, Cloudflare Insights
- `connect-src`: Google Analytics endpoints, Cloudflare
- `style-src`: `'unsafe-inline'` required for Astro/Tailwind
- No `'unsafe-eval'` anywhere

## Verification Commands
```bash
# Check headers on live site
curl -sI https://hardwarelab.org | grep -iE '(content-security|strict-transport|x-frame|x-content-type|referrer-policy|permissions-policy|cross-origin|x-permitted|server:|x-powered)'

# Check headers on local Docker
curl -sI http://localhost:8081 | grep -iE '(content-security|strict-transport|x-frame|x-content-type|referrer-policy|permissions-policy|cross-origin|x-permitted|server:|x-powered)'
```

## Guardrails
- Any missing header is a **blocker** for release.
- CSP changes must be reviewed by `tech-lead` before deploy.
- Never add `'unsafe-eval'` to CSP without explicit justification.
