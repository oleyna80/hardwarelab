# Project Plan P — application-maintenance

## 1. Identity and accepted specification

- Repository: `oleyna80/hardwarelab`; unique stable project ID: `application-maintenance`.
- Outcome: a compatible patched Astro 7 application, correct review illustrations and an evidence-based security disposition, ready for separate Owner integration/release decisions. Preserve multilingual publishing, article text, ratings and affiliate behavior.
- Accepted Spec: `docs/projects/application-maintenance/spec.md`, commit `3360d201366c2cad3d8bd843cec4984e68f805f6`, blob `08e0c7e6b6653e320c096836a21a8cf7ffb62239`. Exact acceptance and attributable initiative request are recorded in [owner-decisions.md](owner-decisions.md) and [the task handoff](../../changes/application-maintenance/handoff.md).
- Planning baseline: that same commit, tree `6e5c4c48357d50f1b48a33de4a60118486ad18b1`, branch `chore/sdlc-lite-adoption`. Adopted [ADR-0001](../../decisions/0001-clean-adoption.md) governs clean Lite adoption; it does not approve application maintenance. This project follows [development.md](../../workflow/development.md), not another project's approvals.
- The dated discovery versions/advisory counts in the Spec and preliminary report are observations. Recheck registry metadata, official advisories, peer/engine constraints and the full selected dependency tree before choosing versions. Keep Astro 7, Node SSR, Tailwind 3 and EN/FR/DE/RU; no automatic major-package sweep or `npm audit fix --force`.

## 2. Pending Lite delivery and implementation workspace

PR [#14](https://github.com/oleyna80/hardwarelab/pull/14) was observed OPEN/Draft during planning: head `a9e221af43049c709dd6c5171bd8ad3d8d08e283`, base `main` at `72ada873d66d19de2609515b443766065fe132c9`. Local planning is ahead of that remote head. Do not treat PR text, this snapshot or a mergeability flag as current CI or merged delivery.

After exact-P approval, create task branch `chore/application-maintenance` and sibling worktree `/home/azur/Projects/WSL/projects/Amazon_aff/hardwarelab-maintenance` from the exact committed checkpoint containing this P, its original READY report and Owner approval. The first W records that checkpoint commit/tree and verifies ancestry to the accepted Spec. Follow [workspaces.md](../../workflow/workspaces.md): inspect repository/ownership, path/ref collisions, effective hooks including `post-checkout`, shared Git metadata and other worktrees before creation; verify the actual destination afterward. Existing collisions or an unverified checkout side effect require disposition, not removal/reuse. No hook installation, activation, configuration changes or bypass is delegated.

Propose one **stacked draft task PR** targeting `chore/sdlc-lite-adoption`, keeping application changes separate from pending PR #14. This is an explicit, project-only proposal to vary development.md §4's usual PR-to-main target; it takes effect only with Owner exact-P approval including this base choice. No other lifecycle exception is proposed. Do not push the adoption branch, modify PR #14 or merge either PR. Validate both the incremental task diff and the full prospective diff to current `main`; distinguish inherited adoption changes from new maintenance changes.

Before first publication and final delivery, recheck remote refs, PR #14 state, ancestry and overlapping writers. If the adoption base changes/merges, an unexpected task ref exists or new overlap appears, pause the affected publication/integration, show the actual diff/ancestry and obtain an Owner base decision. No automatic rebase, merge, retarget or force-push. A pending intermediate merge is not itself a prerequisite for local maintenance or stacked PR checks.

Preserve byte-for-byte in the original worktree, outside all maintenance commits:

- `.dockerignore`, SHA-256 `d4399b482b0542db687bec6444e21fe7ec04ae8c3af6a0a2766960b330e1baf5`.
- `docs/changes/sdlc-lite-adoption/handoff.md`, SHA-256 `b00e76ad2ca8bad1e22030d92562d1b710ddeeccaec152f15748f028c2653ec8`.

Do not copy dirty working files into the clean maintenance worktree, stash/reset them or silently incorporate the separate Docker-ignore work. Container evidence must identify the committed context actually built.

## 3. Finite source scope and single-writer ownership

These are permitted paths, not a requirement to edit every file. Each W chooses a smaller exact subset, explains each change and names one Coder writer; overlap is serialized. Read-only review may inspect other non-secret repository source/configuration. No secret/environment-value collection.

### Shared runtime/check configuration — S1, with necessary S2 check wiring

`package.json`; `package-lock.json`; `.nvmrc`; `Dockerfile`; `astro.config.mjs`; `tsconfig.json`; `eslint.config.mjs`; `playwright.config.ts`; `lighthouserc.json`; `.github/workflows/ci.yml`.

Only compatibility, Node alignment, focused check execution and isolated container validation are allowed here. Preserve existing required jobs, assertions, performance thresholds and disclosure/affiliate gates. Do not modify release workflows, deployment configuration or security exposure policy. A container user change is optional only when justified by the review and verified in a local build/start check, without requiring infrastructure changes.

### Application security — S1, with S2 regression-only changes if needed

`src/pages/api/contact.ts`; `src/pages/api/contact.test.ts`; `src/utils/contact-security.ts`; `src/utils/contact-security.test.ts`; `src/components/head/SEO.astro`.

Apply only confirmed, bounded vulnerabilities or necessary compatible remediation in existing behavior. Test changed input-limit/origin/webhook/timeout behavior using synthetic requests and mocked outbound fetches. No real captcha/webhook requests. Do not change production enforcement settings, credential interfaces, allowed exposure or CSP under the guise of hardening. Unsupported hostname/action assumptions, proxy trust or production enforcement remain explicitly unknown; a fix requiring a new deployment contract needs Owner disposition.

### Illustration contract and regression — S2

`src/content.config.ts`; `src/components/ui/ReviewHero.astro`; `src/components/ui/ReviewCard.astro`; `src/components/ui/ReviewBannerCarousel.astro`; `src/components/content/RelatedReview.astro`; `src/components/head/SEO.astro`; `src/utils/review-image.ts`; `src/utils/review-image.test.ts`; `src/pages/reviews/[...slug].astro`; `src/pages/fr/reviews/[...slug].astro`; `src/pages/de/reviews/[...slug].astro`; `src/pages/ru/reviews/[...slug].astro`; `scripts/app-checks/audit-images.mjs`; `scripts/app-checks/audit-images.test.mjs`; `scripts/app-checks/review-image-inventory.mjs`; `scripts/app-checks/review-image-inventory.test.mjs`; `tests/review-images.spec.ts`.

The exact content/asset paths are listed, without wildcard expansion, in [image-write-set.txt](image-write-set.txt), SHA-256 `f2612acb881aa87bd64d60b1b2cd0d6a0ea9eba48d6731b523153aa086ad62ba`. This finite P input contains 93 existing review `index.mdx` paths and enumerated image names in those same directories, including optional missing `image.webp`/`image.png` names. It is frozen with P. It is a permission ceiling, not the published-image inventory or proof that an asset exists. W must narrow it to demonstrated failures; no draft/research text, new reviews, bulk recompression, generated substitute product imagery or unrelated editorial/routing work. Existing product images may be repaired/referenced correctly; adding an asset needs a legitimate existing source and recorded provenance. An unlisted necessary path requires a P scope decision, not wildcard inference.

### Evidence paths and writers

Project evidence: `docs/projects/application-maintenance/owner-decisions.md` (Architect records attributable Owner decisions); `docs/projects/application-maintenance/project-critic.md` (independent Project Critic original report).

Project task evidence, coordinated by Orchestrator: `docs/changes/application-maintenance/handoff.md`; `docs/changes/application-maintenance/baseline.md`; `docs/changes/application-maintenance/image-inventory.md`; `docs/changes/application-maintenance/security-review.md`; `docs/changes/application-maintenance/delivery.md`.

S1 task ID `application-maintenance-runtime`:

- `docs/changes/application-maintenance-runtime/work-block.md` — Orchestrator/Architect, frozen before Stage Critic.
- `docs/changes/application-maintenance-runtime/stage-critic.md` — independent Stage Critic.
- `docs/changes/application-maintenance-runtime/implementation.md` — Coder.
- `docs/changes/application-maintenance-runtime/review.md` — independent Reviewer.
- `docs/changes/application-maintenance-runtime/validation.md` — independent Verifier.
- `docs/changes/application-maintenance-runtime/handoff.md` — Orchestrator.

S2 task ID `application-maintenance-images`:

- `docs/changes/application-maintenance-images/work-block.md` — Orchestrator/Architect, frozen before Stage Critic.
- `docs/changes/application-maintenance-images/stage-critic.md` — independent Stage Critic.
- `docs/changes/application-maintenance-images/implementation.md` — Coder.
- `docs/changes/application-maintenance-images/review.md` — independent Reviewer.
- `docs/changes/application-maintenance-images/validation.md` — independent Verifier.
- `docs/changes/application-maintenance-images/handoff.md` — Orchestrator.

Original independent reports retain their bytes and exact Git provenance. A read-only role may return a report for the designated evidence writer to store verbatim, identifying the producing mission and transcription. Do not rewrite verdicts or replace originals with a coordinator's summary. Stage reports can append separately identified reruns without deleting prior failures. Preserve Spec and preliminary `security_best_practices_report.md`; final findings belong in the new security review. Do not update shared integrated `memory_bank/`, P or the scope list for task status.

## 4. Proposed delegation and stops

Owner approval of exact P is requested to delegate: the inspected worktree/branch creation above; conforming W preparation and Stage Critic; bounded implementation/REWORK and independent native role missions; ordinary task-only commits with effective hooks; registry/official-document/advisory reads, clean dependency installation and browser downloads; loopback-only application/test processes; synthetic disposable fixtures; local Docker build/start without production mounts/secrets; non-force push of only `chore/application-maintenance`; creation/update of only the new stacked draft PR; its ordinary automatic CI and task PR evidence/artifact publication. Check actual platform permissions before each affected operation. This proposal grants nothing until the separate Owner decision.

Local generated artifacts may occupy normal build/test directories (`node_modules`, `.astro`, `dist`, `test-results`, `playwright-report`, `.lighthouseci`) and a uniquely allocated task temporary directory. Inspect collisions and ignore state first; do not stage generated output or delete another run's data. Publish only sanitized public-site/synthetic task evidence. Do not upload local Lighthouse results to temporary public storage; run collection/assertion locally without the upload phase. Existing task-PR CI may publish its normal sanitized Lighthouse artifact/results under the delegated CI boundary.

Owner stops: material Spec/P/architecture change, unlisted source paths, unavailable mandatory gate, unresolved confirmed reachable critical/high residual, secret/exposure incident, privileged service access, security-policy change, adoption-base drift affecting integration, final acceptance/merge and deployment. No `sudo`, credentials/IAM changes, server administration, real contact submissions, production exploit/load tests, force/reset/clean/stash, hook bypass, new hook activation, manual release workflow dispatch or direct main writes. Existing automatic publishing/deployment on main is the reason merge stays a separate Owner action.

## 5. Stages and entry gates

| Stage | Entry/dependency | Outputs | Acceptance and transition |
| --- | --- | --- | --- |
| S1 — compatible runtime and security maintenance | Accepted exact Spec; complete P with original Project Critic READY and exact Owner approval; clean verified task worktree; committed conforming W and independent Stage Critic READY | Clean baseline Steam Deck reproduction before dependency changes; selected compatible Astro/MDX/adapter/Sharp/Node set; justified bounded security fixes/tests; dependency/source security disposition; local container evidence; stage reports | AC-01 and the runtime/security portion of AC-05; existing applicable quality/E2E/Lighthouse/Lite checks, focused security checks and container smoke actually pass. Reviewer READY and Verifier PASS on the same S1 source commit, checked evidence-only H1 and actual required CI on H1. No intermediate merge. |
| S2 — illustrations and final regression/delivery | Completed S1 outputs and real gates; new exact conforming W, independent Stage Critic READY; stable integration base | Four-language published-image inventory, minimal proven contract/content fixes, failing-image regression, warning/error separation, final security refresh and release/rollback notes | AC-02–AC-04 and all final AC-01–AC-07; complete applicable check matrix; independent Reviewer READY + Verifier PASS on the same final source S2, checked evidence-only H2 and actual required CI on H2; delivery for separate Owner acceptance. |

W is detailed only when its stage is actionable. Owner does not approve every conforming W. Orchestrator coordinates bounded Coder, Critic, Reviewer and Verifier missions and may use several Coders for independent disjoint paths; one writer per path, no concurrent source mutation during exact-S assurance. This document does not require a swarm. Keep missions short: exact inputs, file paths, expected output, gate and stop conditions; let roles read committed files instead of pasting whole session histories. Context-budget errors are failed missions to retry with smaller context, not substitute reports or a reason to skip independence.

## 6. Check strategy and gate feasibility

### Clean baseline and runtime

Record the actual runtime, install/lockfile state and selected baseline in `baseline.md`. A clean pre-change install/build must attempt `/reviews/steam-deck-oled` locally, collect hero URL/decode/dimensions and compare with the dated public observation. Record a baseline failure honestly and diagnose it; do not require repairing the old vulnerable baseline or silently suppress its engine/install error. If it cannot run safely, preserve that limitation, seek Stage Critic disposition on the reproduction method and keep the final clean-build requirement mandatory. Never infer the deployed SHA from local Git. No redundant MDX fix if the source already renders correctly.

Select one supported Node 22 patch meeting the selected packages' minimum; align `.nvmrc`, package engine, CI and Docker runtime declarations without weakening engine checks. Record resolved framework/integration/Sharp versions, peers, advisories and transitive duplicate image processors. Clean `npm ci`, type/build and native Sharp execution must agree locally and in the container. Test the built runtime with synthetic non-secret environment, loopback publication and representative page/image GETs. A Docker binary alone is not a successful build/start. If a local daemon is inaccessible, a bounded build/start smoke job in the existing CI workflow is an allowed equivalent route, with no registry push or deployment; lack of both routes blocks that gate.

### Illustration coverage

Build the inventory from the collection's actual published/non-draft entries in all four languages. Record totals and classified references: content-relative/import metadata, public and legitimate remote URLs; distinguish optional placeholders from required images. Resolve imports/relative files and decode local assets. Cover hero, card, carousel/related and og/twitter/JSON-LD image paths where present; preserve legitimate URL semantics. Source file existence alone is insufficient.

On the local production server, verify the English Steam Deck page and its FR/DE/RU translations at representative desktop and mobile sizes. For each affected rendering path, scroll lazy images into view, await loading and assert decode plus nonzero natural dimensions and correct product identity; fetch/decode required social image URLs. Test representative listing/related containers, not just a direct asset URL. Audit all published required local references; report remote unavailability separately rather than claiming full external availability from source inspection. An unresolved required local asset failure blocks delivery.

Prove new checks reject controlled missing/unresolvable and undecodable fixtures, and accept valid metadata/public/remote-reference forms as applicable. An intentionally oversized valid image remains an optimization warning with exit 0; functional failures exit nonzero. Do not damage tracked production assets to create the negative fixture. Fixtures live in test-owned temporary data or in the enumerated test files. Screenshots support identification/cropping review but do not replace browser assertions.

### Security evidence

Run both `npm audit --json` and `npm audit --omit=dev --json` after installation and again for the final candidate. Nonzero audit due to advisories is evidence to disposition, not automatically a tooling failure or a waiver. Record every remaining advisory ID/package/resolved version, severity/source, production vs tooling use, reachable input/prerequisites, fix/mitigation/next action and uncertainty. Audit service failure or missing entries is incomplete coverage. Prioritize framework/AVIF/Sharp, adapter, Vitest and Zod observations; re-evaluate them against actual selected versions.

Inspect SSR/image inputs, trusted MDX, contact size/origin/rate-limit/proxy trust, Turnstile and webhook/timeouts, serialized HTML/JSON-LD, headers/CSP, secrets boundaries and runtime user/files. Only synthetic isolated checks for candidate application fixes. Explicitly distinguish source controls, executed positive/negative tests, unverified production configuration and optional hardening. Confirmed reachable critical/high residuals need explicit Owner disposition before acceptance; an unexplained residual is not safe because the rest of CI passes.

### Mandatory execution matrix

For each stage, the actionable W fixes concrete commands/environment and output expectations before Coder. At minimum run the following applicable existing checks on that stage's candidate, then include all new focused checks in S2's final matrix:

- Clean `npm ci`; `npm run lint`; `npm run check:types`; `npm run build` (includes disclosure); `npm run check:affiliate`; `npm run lint:images`.
- `npm run test:affiliate`; `node --test scripts/app-checks/check-researcher-output.test.mjs`; focused security/image unit/negative checks introduced by the stage; `npm run test:e2e` with installed Chromium and an isolated local production server. Verify actual commands rather than assuming `check:ci` includes every gate.
- Researcher-output checks use the actual CI selector and available verified Git base/head objects. Capture selected EN reviews; an empty changed-review set is N/A for that selector only, not evidence that all articles passed. Preserve full existing check bodies; unrelated editorial violations require disposition, not silent edits or disabled checks.
- Lighthouse collection and assertions using the existing config/thresholds, local upload disabled; actual CI Lighthouse job success. Bind to the task-built server/port, never reuse an unrelated process or production URL. Record browser/OS support; a cache/host override needs evidence and does not establish hosted CI.
- Actual applicable `.github/workflows/ci.yml` jobs (quality, E2E, Lighthouse, plus any bounded required smoke/check wiring) and `.github/workflows/lite-checks.yml` on the published candidate. Reproduced step bodies or fixtures are local evidence, not hosted success. The existing CI does not yet run every focused unit test: add justified commands in the permitted workflow rather than assuming it does.

Known feasibility limits during planning: Node 22.22.3 and a Docker client were observed locally; daemon access, the selected upgraded set and future candidate checks have not been verified. Prior PR #14 success is predecessor evidence only. CI E2E has an Ubuntu 24.04 pin; preserve or justify compatible support. At both Critic gates, verify a real permitted route to CI, supported browser/container execution and independent roles. Missing mandatory capability yields NOT_RUN/BLOCKED and escalation, not self-PASS.

## 7. Recovery, assurance and delivery

Every stage W binds repository/task ID → exact P commit/path/blob plus frozen scope-list blob → original Project Critic READY and separate Owner P approval → accepted exact Spec/Owner decision and initiative provenance. Inspect ancestry, applicability, actual permissions and current handoffs on entry/resume. No fallback to latest/root/adjacent P. Material changes get new affected Spec/P/Critic/Owner decisions; a conforming W revision gets a new Stage Critic without Owner-per-W approval.

Reviewer and Verifier work independently on the same immutable source S, including the complete change from stage baseline and its prospective PR base. Their native mission identity, exact source/report subjects, executed commands, failures and limitations are durable evidence. If source, tests, runtime config, gates or requirements change, create a new S and repeat affected assurance. After source approval, only genuine evidence may advance H; inspect S..H and run actual required CI on H. Do not write H's future SHA into its own commit.

To avoid a report-only CI loop, store final observed H CI URLs/status in the task PR after H exists; do not create a new repository commit solely to insert its own CI links. Keep necessary recovery and original role reports committed before that final CI run. A later substantive/evidence commit still requires its applicable H CI; PR metadata does not waive the gate.

Final `delivery.md` and handoffs identify exact S and observed predecessor, frozen inputs, original role results, full diff scope, audit dispositions, local container/image evidence, PR/CI lookup and remaining production unknowns. The task PR records the subsequently observed final H and its actual CI URLs. Mark production fix/smoke as pending separate deployment. Explain release verification: after Owner-controlled integration/release, identify deployed immutable image SHA, check the supplied page and translations/related/social imagery and normal security headers read-only. Rollback proposal is the previously known-good immutable image through the existing release process; no reset, remote deletion or execution of rollback is delegated here. Record the previous release as unknown if it cannot be observed without new access.

Stop final delivery on missing mandatory evidence, unresolved broken required local images, engine/peer/native-build failures, failing required CI or undisposed confirmed reachable critical/high risk. Orchestrator may resolve ordinary REWORK autonomously within P. Present the completed task for Owner acceptance; PR merge and its automatic publish/deploy consequences remain separate explicit decisions.
