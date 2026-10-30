## Reviewer Report — independent technical review

**Mission:** `/root/runtime_reviewer`

**Verdict: REWORK**

Reviewed exact immutable source candidate:

`S = 872adc236d9b2cf8da1310b0a55f1c3cd3c2a8b9`

Review basis:

- Stage baseline: `c2fced7fc0b2f4f5031f6dfe11001e54b07df9bd`
- W: `e3f801a4e5aaf4d9ad79c04893ad46aa842082b1`
- P: `e6d460b76370020d9a5e22d6cafc7b55cfb35dff`
- Stage Critic READY: `170e0d8ae80e69b68bfe777fa1bfa826b799eb6e`

**Files/boundaries reviewed:** full `c2fced7..S` diff; W/P; implementation, baseline and security-review records; `.github/workflows/ci.yml`; `.nvmrc`; `Dockerfile`; `package.json` and lockfile; Playwright/Lighthouse configuration; `contact.ts` and `contact.test.ts`; JSON-LD output.

### By severity

- 🔴 HIGH: 1 — E2E/Lighthouse direct SSR servers do not explicitly run in production mode.
- 🟡 MEDIUM: 1 — webhook-redirect test does not represent actual Fetch behavior for `redirect: "error"`.
- ⚪ LOW: 0

| Severity | File:Line | Finding | Evidence | Recommendation |
|---|---|---|---|---|
| 🔴 HIGH | `playwright.config.ts:12`, `lighthouserc.json:5` | The commands used for browser E2E and Lighthouse start the built Node SSR entrypoint without `NODE_ENV=production`. | Both commands set only `HOST` and `PORT`. The contact route determines production CORS policy from `process.env.NODE_ENV === "production"` at `contact.ts:13`; development origins remain permitted when false at `contact.ts:69`. The Docker runtime does set production mode at `Dockerfile:32`, but the new direct-server E2E/Lighthouse commands do not. Required production-runtime checks may therefore validate development policy instead. | Prefix both server commands with `NODE_ENV=production`. Add a focused test which imports/runs the route in production mode and proves a dev-only `http://localhost` origin is rejected. |
| 🟡 MEDIUM | `contact.test.ts:34` | The new redirect test tests a synthetic `302 Response`, not the behavior of native Fetch with `redirect: "error"`. | The test mock returns `new Response(..., { status: 302 })` and asserts a `502` result. With `redirect: "error"` set at `contact.ts:543`, native Fetch rejects on redirect; control reaches the outer fail-closed handling returning `503` at `contact.ts:568`. The present test therefore does not cover the actual redirect transport path. | Make the fetch mock reject with a Fetch-like `TypeError` and assert the actual `503` failure response. Preferably add a bounded loopback redirect test for transport-level confirmation. |

### Other review results

- The full stage diff is within the source/evidence/configuration write-set; no unrelated source, release, content, asset, or secret path was found.
- Static package/lock inspection shows the Node 22.23.4, Astro 7, adapter, Sharp and Docker version alignment is internally coherent.
- CI contains the specified focused affiliate, contact, researcher, E2E and Lighthouse commands.
- The foreground SSR process configuration is structurally suitable, subject to the missing explicit production mode above.
- JSON-LD serialisation escapes `<` at `SEO.astro:206`, mitigating closing-script injection.
- Turnstile timeout and webhook redirect rejection are source-level fail-closed hardening measures.
- The security review’s zero-production-audit result and the remaining development-only Lighthouse/LHCI dependency chain are a reasonable preliminary triage. Final exact-S execution/container evidence remains required.

### Explicit inspection limits and sequential gates

The following are **not source findings in S** and must remain separated from this REWORK result:

- Exact-S local matrix and Docker/native-Sharp runtime execution evidence are not established in the reviewed implementation record. They must be performed again on the corrected replacement S.
- Hosted CI is **NOT_OBSERVED**. Under P/W it is an evidence-only H-phase requirement after same-S Reviewer/Verifier assurance, not a defect in current source S.
- No live provider, deployed contact endpoint, secret, or production infrastructure was accessed.
- Remaining security claims needing runtime/deployment proof include proxy-header trust, rate-limit process scope, optional Turnstile policy and hostname/action verification, external-provider behavior, CSP/edge headers, deployment secrets/configuration, and final container runtime restrictions.

This verdict binds only `872adc236d9b2cf8da1310b0a55f1c3cd3c2a8b9`. A replacement source candidate requires a new independent review.
