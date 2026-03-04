---
name: API Endpoint Security Audit
description: Validate SSR API endpoints against OWASP-relevant threats — input validation, rate limiting, CSRF, origin checks, error handling, and webhook security.
---

# API Endpoint Security Audit

## Objective
Ensure all SSR API routes (`src/pages/api/*`) are hardened against common web vulnerabilities relevant to the project's attack surface.

## Use When
- Creating or modifying API endpoints.
- Changing form handling, webhook logic, or authentication flows.
- Pre-release security review.
- Adding new SSR routes (`export const prerender = false`).

## Endpoint Inventory
Maintain awareness of all SSR endpoints:
- `src/pages/api/contact.ts` — contact form handler
- `src/pages/api/latest-reviews.json.ts` — JSON feed
- Any future `api/*.ts` files

## Security Checklist Per Endpoint

### 1. Input Validation
- [ ] All user inputs sanitized (HTML entities stripped, length-limited).
- [ ] Email validation with regex (no open relay risk).
- [ ] Enum inputs validated against whitelist (form types, locales).
- [ ] No `eval()`, `new Function()`, or dynamic SQL/query construction.

### 2. Rate Limiting
- [ ] Nginx-level rate limit configured for endpoint (`limit_req_zone`).
- [ ] Application-level rate limit as defense-in-depth.
- [ ] Rate limit is per-IP, not per-session.

### 3. Origin / CSRF Protection
- [ ] `Origin` or `Referer` header validated against allowlist.
- [ ] Allowlist configured via `ALLOWED_ORIGINS` env var.
- [ ] Captcha (Turnstile) verification on form submissions.
- [ ] `TURNSTILE_ENFORCE` set to `true` in production.

### 4. Payload Safety
- [ ] Request body size limited (nginx: `client_max_body_size`; app: streaming limit).
- [ ] JSON parsing with size guard (no unbounded `request.json()`).
- [ ] Binary/multipart uploads blocked unless explicitly needed.

### 5. Error Handling
- [ ] Error responses return generic messages, not stack traces.
- [ ] Internal errors logged server-side, not exposed to client.
- [ ] HTTP status codes are correct (400 for bad input, 429 for rate limit, 500 for internal).

### 6. Webhook Security (if applicable)
- [ ] Outbound webhook URL validated against hostname allowlist.
- [ ] HMAC signature computed and sent with webhook payload.
- [ ] Webhook secret is 32+ bytes and stored in env (not hardcoded).
- [ ] Webhook failures don't leak internal state to the client.

### 7. Response Headers
- [ ] Security headers applied to API responses (inherited from nginx).
- [ ] `Content-Type` set correctly (e.g., `application/json`).
- [ ] No sensitive data in response headers.

## Verification
```bash
# Build passes with all endpoints
npm run build

# Test contact endpoint with invalid payload (should return 400)
curl -X POST http://localhost:4321/api/contact \
  -H "Content-Type: application/json" \
  -H "Origin: https://hardwarelab.org" \
  -d '{}' -w "\n%{http_code}\n"

# Test with oversized payload (should return 413)
curl -X POST http://localhost:4321/api/contact \
  -H "Content-Type: application/json" \
  -H "Origin: https://hardwarelab.org" \
  -d "$(python3 -c 'print("{\"name\":\"" + "A"*100000 + "\"}")')" -w "\n%{http_code}\n"

# Test from disallowed origin (should return 403)
curl -X POST http://localhost:4321/api/contact \
  -H "Content-Type: application/json" \
  -H "Origin: https://evil.com" \
  -d '{"name":"test","email":"t@t.com","message":"hi","formType":"general","locale":"en"}' -w "\n%{http_code}\n"
```

## Output
- Security findings in tech-lead or coder report.
- Critical findings block release.

## Guardrails
- Any endpoint without input validation is a **critical blocker**.
- Any endpoint without rate limiting is a **major finding**.
- Error responses leaking stack traces or internal paths: **major finding**.
- Missing origin validation on state-changing endpoints: **critical blocker**.
