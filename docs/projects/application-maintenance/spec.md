# Requirements + Design — HardwareLab application maintenance

## Initiative identity and intent

- Repository: `oleyna80/hardwarelab`; stable project ID: `application-maintenance`.
- Owner request in the architecture conversation on 2026-10-30: maintain the application, update the framework, fix illustrations on some pages and review security. The Owner supplied `https://hardwarelab.org/reviews/steam-deck-oled` as a concrete illustration failure.
- Product fit: preserve the multilingual hardware-review and affiliate website described in [PROJECT_BRIEF.md](../../../PROJECT_BRIEF.md).
- Discovery baseline: branch `chore/sdlc-lite-adoption`, HEAD `a9e221af43049c709dd6c5171bd8ad3d8d08e283`. This identifies inspected source, not the deployed revision or an implementation approval. The later P must specify the implementation branch/base and disposition of the pending Lite adoption delivery.
- Classification: significant because dependency upgrades and security-sensitive behavior require coordinated regression checks. This document is a specification proposal; its exact acceptance belongs in separate Owner evidence.

## Existing behavior and evidence

1. The lockfile/install baseline contains Astro 7.0.9, MDX 7.0.3 and Node adapter 11.0.2. On 2026-10-30 the registry returned Astro 7.4.1, Node adapter 11.1.9 and MDX 8.1.0 as latest. These are discovery observations, not instructions to install every latest major version.
2. Runtime declarations disagree: `.nvmrc` is 20, CI/Docker use Node 22, and `package.json` permits Node >=18. Registry metadata for Astro 7.4.1 and MDX 8.1.0 requires Node >=22.22.0.
3. On the supplied public English page, the hero is `<img src="./image.webp">`. Its resolved URL is `/reviews/image.webp`, and the browser reports `complete=true`, `naturalWidth=0`. Current local MDX already imports `./image.webp` and passes the import to `ReviewHero`; the local file decodes as WebP, 1200×675. The published output and inspected source differ; the deployed commit has not been identified.
4. `npm run lint:images` reports 35 files with format/size issues and exits 0. This checks source files, not rendered image URLs. It cannot establish browser image correctness.
5. Current dependency and source review is recorded in [security_best_practices_report.md](security_best_practices_report.md). Advisory severity, vulnerable dependency presence and demonstrated exploitability are different facts.

## Requirements and design boundaries

### Framework and runtime

- Keep Astro 7, SSR through the Node adapter, MDX, the four languages and the current publishing architecture. Update to a mutually compatible patched Astro/integration/Sharp set. Check peer dependencies and engine requirements before selecting exact versions; record the selected versions and lockfile in implementation evidence.
- Align developer, package, CI and Docker Node requirements on a supported Node 22 patch level meeting the selected packages' minimum. Align Node type definitions with that runtime where needed.
- Update other dependencies when needed for this compatible set, a validated security remediation or the required checks. A major integration version may be used when it supports Astro 7 and is justified by compatibility/security evidence.
- Do not perform an automatic all-packages major upgrade or `npm audit fix --force`. Tailwind 4, a new application architecture and unrelated tooling migrations are outside this initiative. If resolving a material finding needs an otherwise excluded migration, obtain an Owner scope decision.

### Illustration correctness

- Reproduce the Steam Deck page on a clean build of the selected source baseline before deciding whether it needs a new source fix. Determine whether the production symptom is already fixed in source, a build/rendering defect, or a delivery/cache difference. Do not add a redundant patch to match an older deployed page.
- Audit published, non-draft review image references across EN/FR/DE/RU on a local production build. Inventory content-local paths, imported metadata and legitimate public/remote URLs; verify affected rendering paths in `ReviewHero`, cards, related reviews and social metadata.
- Apply the smallest correction to the image contract or affected content. Keep actual product imagery, article text, ratings, affiliate destinations and locale URLs stable unless an image-related correction explicitly requires a change. Do not replace supplied illustrations with generated images.
- Add a meaningful regression check that fails on a broken required review image, including the supplied English route. Required images must finish loading, decode and have nonzero intrinsic dimensions; a successful HTML response alone is insufficient. Handle lazy loading explicitly. Exercise representative desktop/mobile rendering and the existing translations of the affected review locally.
- Separate hard failures (missing/unresolvable/undecodable assets) from optimization warnings. Correct assets that cause a functional failure; do not make all 35 historical size warnings mandatory bulk recompression. Tightening the image checker must distinguish these cases and be proven with positive/negative fixtures or equivalent tests.

### Security review and remediation

- Review production and development dependency advisories separately; trace relevant source/configuration paths for exploit prerequisites. Inspect SSR/image processing, MDX trust, contact input limits, origin checks, Turnstile, webhook destination controls/timeouts, proxy headers/CSP, secrets exposure and container execution boundaries.
- Use source review and isolated local checks with synthetic data. Public-site access is limited to ordinary read-only requests. No production exploit, captcha bypass, webhook submission, load test, authenticated VPS inspection, provider configuration change or secret disclosure is authorized by this specification.
- Remediate confirmed application vulnerabilities and applicable dependency risks within the existing architecture. Record each remaining advisory with package/version, source, prerequisite/reachability evidence, severity, remediation or disposition and verification limit. An unresolved confirmed reachable critical/high issue requires Owner disposition before delivery acceptance; it cannot be relabeled as safe because a check passed.
- Keep speculative hardening distinct from confirmed vulnerabilities. Missing deployment evidence must remain unknown. Changes to security policy, exposure or privileged infrastructure require separate scope approval.

## Scope and external effects

In scope: dependency manifests/lockfile, runtime version declarations, required integration configuration, affected image components/schema/content/assets, focused validators/tests and compatible CI/Docker changes, bounded application security fixes and task evidence. The P/W must narrow these categories to actual write-sets and required checks.

Out of scope: new features, redesign, unrelated content editing, a general localization/SEO rewrite, SDLC/hook redesign or activation, server administration, credentials/IAM, remote infrastructure changes, merging and deployment. The discovery observations of localized production URLs returning 404 are leads for source/deployment comparison, not permission for a separate routing redesign.

Preserve the existing unrelated `.dockerignore` change and `docs/changes/sdlc-lite-adoption/handoff.md` bytes. Do not include them in maintenance implementation commits implicitly. Do not overwrite shared integrated memory with unmerged task status.

## Observable acceptance criteria

- [ ] AC-01: A clean install uses the recorded compatible patched Astro 7/integration/image-processing set; Node requirements agree across package/local/CI/container declarations. Engine/peer conflicts are resolved without disabling checks.
- [ ] AC-02: The supplied Steam Deck route renders a decodable, correctly identified hero on a local production build at desktop and mobile sizes. The report explains the observed source/deployment difference without claiming an unverified production fix.
- [ ] AC-03: An inventory covers published review image references in all four languages; no unresolved broken required local image remains. Rendered checks cover the supplied route, affected localized routes, card/related-image paths and social image URLs. The new regression check demonstrably rejects a broken image case.
- [ ] AC-04: Image decode/missing-asset failures cause a nonzero validation result; existing optimization warnings are separately reported and do not silently become an unachievable gate.
- [ ] AC-05: Updated full and production dependency audits plus a source/configuration security report distinguish verified issues, mitigations, unknowns and development-only conditions. Confirmed reachable critical/high residuals have explicit Owner disposition; other residuals have evidence-based rationale and a next action.
- [ ] AC-06: Applicable existing lint, type, build/disclosure, affiliate, image, researcher, E2E, Lighthouse and Lite CI checks actually pass on the delivery candidate. Add meaningful focused security/image checks where the selected remediation requires them; do not replace required gates with an audit count or screenshots.
- [ ] AC-07: Independent Reviewer and Verifier evidence binds the same S; any evidence-only H has a checked S..H delta and actual applicable CI. Delivery identifies exact source, limitations, release verification and rollback instructions. Production smoke verification remains pending until separately authorized deployment.

## Alternatives, sequencing and approval boundary

Prefer a compatible security-patched framework baseline before final image regression assurance, because image processing and MDX depend on it. Initial image reproduction may run earlier. Perform security discovery throughout; final dependency/source review checks the resulting candidate. The P decides stage decomposition and any justified dependency ordering.

Keeping the known-vulnerable framework unchanged while repairing only one MDX file leaves maintenance incomplete. Updating every major package adds unrelated migration risk. The chosen scope balances a patched runtime with targeted functional corrections.

Before implementation, the Owner accepts an exact committed Spec; then the complete project-local P receives independent Project Critic review and exact Owner approval under [development.md](../../workflow/development.md). Decisions, status and acceptance references stay outside this Spec. Merge/deployment remain separate decisions, including any automatic publish/deploy triggered by merging to `main`.
