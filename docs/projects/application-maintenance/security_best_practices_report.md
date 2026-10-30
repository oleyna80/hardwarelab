# HardwareLab — preliminary security and maintenance assessment

Observation date: 2026-10-30. Inspected source: `a9e221af43049c709dd6c5171bd8ad3d8d08e283`, `chore/sdlc-lite-adoption`, repository `oleyna80/hardwarelab`.

This is intake evidence, not completed independent assurance or a security clearance. No dependencies were installed/updated, no application fix was made, and no exploit was attempted. The deployed revision, effective production headers/environment and VPS configuration were not established. Source review used the `security-best-practices` skill's JavaScript frontend guidance and official Astro advisories; there was no Astro-specific backend reference in that skill.

## Executed observations

| Observation | Result and limit |
| --- | --- |
| `npm outdated --json` | Astro installed 7.0.9; registry latest 7.4.1. Node adapter installed 11.0.2; latest 11.1.9. MDX installed 7.0.3; latest 8.1.0. Version freshness is not compatibility proof. |
| `npm audit --json` | Exit 1; 43 vulnerable package entries: 3 critical, 31 high, 7 moderate, 2 low. These are package counts, not distinct vulnerabilities or demonstrated exploits. |
| `npm audit --omit=dev --json` | Exit 1; 16 vulnerable package entries: 1 critical, 12 high, 3 moderate. Astro is the critical entry. Production dependency inclusion alone does not establish runtime reachability. |
| `npm view astro@7.4.1 engines --json` | Node >=22.22.0. MDX 8.1.0 declares the same minimum and Astro ^7.2.10 as a peer. Select and verify the complete compatible set during implementation. |
| `npm run lint:images` | Exit 0 with 35 format/size warnings; no decode errors reported in this run. The source checker does not load rendered URLs. |
| Browser on the Owner-supplied URL | Hero `src="./image.webp"`, resolved `/reviews/image.webp`, complete but intrinsic dimensions 0×0. Network observed a 302 for that URL; final image HTTP status was not established. |
| Three ordinary localized GETs | `/fr/reviews/steam-deck-oled`, `/de/reviews/steam-deck-oled`, `/ru/reviews/steam-deck-oled` returned 404 at observation time. This does not prove the current local routes are broken. |
| Local hero file metadata | `src/content/reviews/en/steam-deck-oled/image.webp`: WebP, 1200×675. Current MDX uses an explicit import; Git history shows that change in `f3982e9f987fcd7476fcc37a26b2f7ea9b3629e0`. |

## Priority findings and candidates

### SEC-01 — critical upstream AVIF-processing advisory; local dependency affected, exploitability unconfirmed

- Evidence: `package-lock.json`/installed Astro 7.0.9 and the audit entry [GHSA-26w7-cxv4-gfx2](https://github.com/withastro/astro/security/advisories/GHSA-26w7-cxv4-gfx2).
- The maintainer reports code execution when Astro's Sharp service processes an attacker-controlled AVIF. The fix is Astro 7.2.8 requiring Sharp 0.35.4. Current `package.json` also directly constrains Sharp to ^0.33.0, so updating Astro alone must not be assumed to patch every image-processing path.
- Scope inspected: `astro.config.mjs` uses server output and the Node adapter; no custom image service or remote image allowlist is declared there. Public related-image URLs use `/_image`. This is not evidence that an arbitrary remote image is accepted. No upload-to-image or attacker-controlled image path has been demonstrated.
- Action: select a patched compatible Astro/Sharp set; inspect the final dependency tree and imported Sharp users. Establish image-input trust and test restrictions locally. Do not run a malicious AVIF against production.

### SEC-02 — Node adapter advisory; availability impact depends on configuration

- Evidence: adapter 11.0.2 and [GHSA-qh8j-hqjv-7m4x](https://github.com/withastro/astro/security/advisories/GHSA-qh8j-hqjv-7m4x), patched in 11.1.3.
- The maintainer rates this specific advisory Low: malformed Host produces an error response in default standalone mode; process termination requires opt-in `staticHeaders: true`. `astro.config.mjs` selects standalone without that opt-in. The repository proxy sets `Host $host`; deployed proxy behavior was not verified.
- Action: update the adapter with the framework; do not describe the audit package's aggregated High label as a demonstrated production crash.

### SEC-03 — critical Vitest development-server advisory; exposed server not observed

- Evidence: development dependency Vitest 4.0.16; audit includes [GHSA-5xrq-8626-4rwp](https://github.com/advisories/GHSA-5xrq-8626-4rwp) and later mocker advisories.
- `package.json` uses `vitest run` for affiliate tests. No exposed Vitest UI server was observed. This is a development/tooling risk requiring remediation/triage, not evidence of public-site code execution.
- Action: choose a compatible patched Vitest set and rerun affected tests. Review all critical development entries in the final complete audit; this preliminary report does not enumerate every transitive entry.

### SEC-04 — Zod collection-size DoS advisory; source-to-input boundary needs triage

- Evidence: direct Zod 3.25.76, [GHSA-mrhx-c7xc-m3w5](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5). Registry audit suggests a Zod 4 fix, a major change.
- Inspected schema use is principally repository content validation in `src/content.config.ts`; the contact handler validates its fields manually. An attacker-controlled oversized collection reaching an affected parser has not been demonstrated.
- Action: inventory direct/transitive users after the framework update; distinguish trusted build inputs from request inputs. Do not force a Zod migration or override incompatible framework dependencies just to reduce the audit counter.

## Source review observations, not confirmed vulnerabilities

- `src/pages/api/contact.ts` limits request bodies to 16 KiB, checks origin/referrer context, validates fields, rate-limits in memory, verifies Turnstile when enforced and restricts configured webhook hosts/protocols. The webhook delivery uses a five-second abort timeout. These are inspected controls, not independently executed negative tests.
- Turnstile verification checks success; hostname/action binding and verification-request timeout need further assessment. Production enforcement/environment values were not read. No real form submission or provider call was made.
- Proxy trust/rate limiting depends on the deployed network and overwritten client-IP headers. Repository configuration alone cannot prove protection or an IP-spoofing bypass.
- `src/components/head/SEO.astro` injects serialized JSON-LD through `set:html`; Footer uses localized HTML. No attacker-controlled input reaching these sinks was established. Treat serialization/HTML trust as review items, not automatic XSS findings.
- `nginx.proxy.conf` declares security headers/CSP. Whether the deployed header permits the required Turnstile sources needs a normal browser/header check. Do not loosen CSP or claim a production policy from repository text alone.
- The Docker runtime has no explicit non-root user. This is a hardening candidate; an exploit or elevated production capability was not demonstrated. Container boundary changes require compatibility checks and an approved implementation write-set.
- No secret values were inspected or included in this report. No dedicated full-history secret scanner was run; this is not a clean-secret-history claim.

## Next evidence required

Produce a final complete advisory disposition against the updated lockfile, with reachability and residual actions; verify relevant source changes and negative cases in isolation; run required application/CI checks. Compare local production rendering with the observed page before changing image code. Identify the actual release revision only through an authorized observable source; do not infer it from the local branch name.
