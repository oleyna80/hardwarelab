# Project Critic — application-maintenance

## Verdict and mission

**READY — exact P is ready for Owner review.** No blocking planning correction was found. This verdict does not approve P, W, implementation, publication, merge or deployment, and is not an application/security/CI PASS.

- Mission: `/root/maintenance_project_critic`, separate native sub-agent mission, 2026-10-30.
- Role contract: `.agents/roles/critic.md`, Project Critic after committed P and accepted Spec, before Owner exact-P approval.
- Repository: `oleyna80/hardwarelab`; origin observed `git@github.com:oleyna80/hardwarelab.git`.
- Worktree: `/home/azur/Projects/WSL/projects/Amazon_aff/hardwarelab-lite`; branch `chore/sdlc-lite-adoption`.
- Reviewed P commit: `e6d460b76370020d9a5e22d6cafc7b55cfb35dff`.
- Reviewed P path: `docs/projects/application-maintenance/plan.md`; blob `62e685cec97758866d3e5ff627fc98a195e20961`.
- Frozen scope input: `docs/projects/application-maintenance/image-write-set.txt`; blob `79159117388e500f5b9cc8fb56628835de653dd3`; SHA-256 `f2612acb881aa87bd64d60b1b2cd0d6a0ea9eba48d6731b523153aa086ad62ba`.
- Accepted Spec: commit `3360d201366c2cad3d8bd843cec4984e68f805f6`, path `docs/projects/application-maintenance/spec.md`, blob `08e0c7e6b6653e320c096836a21a8cf7ffb62239`.

The Spec is an ancestor of reviewed P; its blob at P agrees. Attributable acceptance in `owner-decisions.md` records the Owner's exact-Spec acceptance and request for planning. P deliberately leaves execution delegation and the stacked PR base for the next Owner decision. Requiring Owner P approval before this Project Critic would reverse the canonical gate order.

## Technical assessment

### Scope and decomposition

Two dependent stages are sufficient. S1 establishes compatible Astro 7/Node/adapter/MDX/Sharp behavior and security disposition; S2 audits the image contract on that resulting runtime and supplies final functional/regression assurance. Capturing Steam Deck before dependency changes protects the causal comparison. Repeating final audits and image verification after runtime/image changes is justified; a separate security project or a third documentation stage would add little value.

P keeps Node SSR, Tailwind 3 and four languages, limits dependency changes to compatibility/security/check needs, and forbids an indiscriminate major sweep. It does not prescribe stale latest versions as the solution. The source confirms conflicting Node declarations (`.nvmrc` 20, package >=18, CI/Docker 22), a direct Sharp constraint distinct from the framework, and separate MDX/Node integrations. Checking the selected dependency tree, native Sharp and container runtime therefore addresses real coupled risks.

The source paths are finite and sufficient for the intended fixes: schema plus hero/card/carousel/related/SEO, all four review routes, dedicated helper/inventory/audit/browser test paths, contact handler/helper/tests, and runtime/check configuration. The frozen content list has 373 unique literal paths, including 93 existing `index.mdx` paths (EN 29, FR 21, DE 21, RU 22), no wildcard/escape entries, and 91 presently absent optional asset names. P correctly calls these a permission ceiling, not missing-image findings or a demand to create assets. W must narrow actual edits to demonstrated failures. A missing future path requires disposition rather than an invented wildcard permission.

### Images and source/deployment distinction

The inspected Steam Deck content in all four languages already imports `./image.webp` and passes metadata to `ReviewHero`. `ReviewHero`, `ReviewCard`, `ReviewBannerCarousel` and `RelatedReview` have distinct string/metadata branches. SEO resolves metadata separately. The existing audit scans matching files and reads Sharp metadata, catches errors without a hard-failure exit, and never proves rendered URLs. A fix limited to the supplied English MDX would therefore be unsupported by current source.

P covers the necessary distinction: clean baseline reproduction, actual collection/published inventory, local required-reference resolution and decode, built-page desktop/mobile checks with lazy loading, representative containers and social URLs, plus controlled negative cases. It does not equate 200 HTML, file existence or screenshots with image correctness. Existing size warnings remain warnings. Production 404s and the dated broken hero are investigation leads; the plan correctly leaves deployed identity and release verification unknown/pending.

### Security and runtime

P does not convert the preliminary advisory counts into proven exploitation. It requires complete full/production audit dispositions, framework/Sharp input tracing, trusted MDX review, source/configuration security review and candidate-specific synthetic positive/negative tests. Contact source currently contains body/origin/rate-limit/webhook controls, a timed webhook request, and a separate Turnstile request; proxy trust, provider response binding and request timeouts deserve the planned assessment. Their presence alone proves neither production configuration nor a vulnerability.

The bounded security write-set can host confirmed compatible fixes without deployment-policy changes. Unknown production enforcement/CSP/proxy state remains explicit. An undisposed confirmed reachable critical/high residual prevents final delivery. Container execution is a real gate: committed Docker context, install/native processor, build/start and representative requests; an optional user change must earn its compatibility evidence. CI smoke in permitted `ci.yml` is a feasible fallback if local Docker execution is unavailable. Neither a client binary nor a prior run is promoted to success.

### Gate feasibility and final matrix

The existing `package.json` confirms that `check:ci` omits image lint, affiliate unit tests, researcher tests and Lighthouse. P explicitly lists these checks and requires justified focused-test wiring in the permitted workflow. This closes a common coverage gap rather than relying on the aggregate script name.

Both application CI and Lite Checks have an unrestricted `pull_request` trigger; application CI already provides quality, E2E and Lighthouse jobs, and the E2E runner is pinned to Ubuntu 24.04. Thus a task PR targeting the adoption branch has a source/configuration route to hosted checks without merging PR #14 first. The workflow can carry bounded new unit/negative/smoke steps under P. Actual service availability, permissions, browser support and future execution still need verification at actionable W; this review establishes the route, not those future results.

P preserves the real researcher selector and Git-base dependency. The selector may skip if objects are absent, so recording verified base/head objects and actual selected EN slugs is necessary; P requires this and does not label an empty selection as all-content PASS. An unrelated editorial failure requires disposition rather than scope expansion.

The planned local Lighthouse collection/assertion without upload respects the local publication boundary while retaining thresholds; existing automatic task-PR CI upload/results are a separately proposed delegated effect. The final matrix includes clean install, lint/types/build/disclosure, affiliate/image/researcher checks, introduced tests, built-server E2E, Lighthouse, Lite CI and container evidence, plus audits/security dispositions. Same-S Reviewer/Verifier, checked evidence-only H and actual required H CI are retained at each stage. Storing final CI observations in PR metadata avoids a self-referential report-only commit loop without waiving CI.

### Pending adoption and Owner decision

A stacked draft PR is a reasonable temporary integration strategy while PR #14 remains pending: incremental maintenance review stays separate, and P also requires review of the full prospective diff to main. The first task worktree is derived from a committed checkpoint containing P, original READY and Owner decision; dirty original files are excluded. The task branch may consequently carry planning/evidence descendants beyond the remote adoption snapshot, which must be visible in the actual incremental diff.

The target-base exception to development.md's ordinary PR-to-main route is explicit and requires Owner exact-P approval including the base choice. P neither invents that approval nor delegates adoption-branch push, PR #14 mutation, rebase/merge/retarget or force-push. Remote/base drift causes affected publication/integration to pause for a concrete Owner base decision. PR #14's snapshot is not current remote proof, and this review does not refresh it. No intermediate merge is required merely to run local/stacked checks.

### Proportionality

The two stage W/Critic/Reviewer/Verifier cycles follow the significant-work contract and correspond to different runtime/image candidates. Future W details are deferred until actionable. Evidence files and mission prompts should remain concise, and disjoint Coders are optional. No extra registry/controller, swarm, hook redesign or repeated Owner approval per conforming W is introduced. Technical evidence, rather than additional provenance paperwork, should consume the implementation effort.

## Blocking findings

None. No minimum P correction is required for Owner review.

## Nonblocking implementation notes

1. **Make decode stronger than metadata inspection.** The existing audit uses `sharp(...).metadata()`. S2 should exercise actual pixel decoding for required local raster images and the truncated/corrupt fixture, while preserving legitimate public/remote forms. Browser assertions should await decode and dimensions. This implements existing P requirements; metadata-only reuse would fail them.
2. **Make every introduced test executable and observable.** New contact/helper/image tests do not currently have package scripts. W should name the exact Vitest/Node commands and corresponding `ci.yml` steps, then record their results separately from E2E and `check:ci`. No additional test-runner migration is needed merely to add these cases.
3. **Own the local server and environment.** `playwright.config.ts` presently allows reuse outside CI and Lighthouse has a fixed port. W should use isolated allocation/preflight and explicit flags/config to bind the checks to its built candidate, disable unwanted analytics with synthetic public settings where appropriate, and prevent real contact/provider traffic. P already authorizes the necessary configuration paths and prohibits unrelated process reuse.
4. **Keep runtime alignment concrete.** W should identify the selected Node 22 patch/minimum consistently across package/local/CI/container declarations and verify the musl/native image-processing path as well as local execution. Floating `22` labels alone should not be represented as proof of the selected patch or engines.

These notes narrow execution details already required by P; they are not new acceptance criteria or reasons to expand scope.

## Executed commands and inspected sources

Read-only commands actually used in this mission:

- `pwd`, `git status --short`, `git status --porcelain=v1 --untracked-files=all`, `git remote get-url origin`, `git branch --show-current`, `git rev-parse HEAD`, `git rev-parse --show-toplevel HEAD`.
- `git rev-parse HEAD:<path>` for P, Spec, scope list, root AGENTS, Critic role and development protocol; `git merge-base --is-ancestor <Spec> <P>`; `git diff --exit-code <P> -- <reviewed contracts and planning inputs>` (exit 0).
- `sha256sum` on the scope list and two preserved dirty paths; `git diff --name-only`; `git diff --check e6d460b^ e6d460b -- <planning paths>` (exit 0); `git ls-tree HEAD <report-path>` and report absence checks before creation.
- `cat`, `nl -ba`, `sed`, `rg` and `rg --files` for the sources below; read-only Python path-list counts/existence/uniqueness checks. A combined source read returned a missing-file diagnostic for `src/utils/contact-security.ts`; this is an enumerated proposed helper, not an existing file or failed application check. Subsequent relevant reads completed.

Inspected project sources: parent `/home/azur/AGENTS.md`; root `AGENTS.md`; `.agents/roles/critic.md`; `docs/workflow/development.md`; `docs/workflow/workspaces.md`; `docs/security/boundaries.md`; ADR-0001; `PROJECT_BRIEF.md`; `PROJECT_MAP.md`; integrated `memory_bank/context.md` and `progress.md`; accepted Spec/P, scope list, owner-decisions, application-maintenance handoff and preliminary security report; package manifest/lockfile; `.nvmrc`; Dockerfile and committed `.dockerignore`; Astro/Playwright/Lighthouse configuration; both application/Lite CI workflows; image schema/components/SEO/layout/review routes and Steam Deck MDX; contact source; image audit and researcher selector; existing affiliate browser/unit-test references.

Historical agent memory was used only as a lookup hint to avoid treating adoption-era checks or environment workarounds as fresh evidence. Current verdict facts come from the current committed inputs/source/configuration and the attributable task record.

## Actual limitations and preservation

No install, build, application test, audit request, browser run, Docker execution, hosted CI, registry/version refresh, remote PR/ref query, private network transfer or production check was performed. Past package/advisory/CI observations remain dated input. This design review cannot certify future package compatibility, clean build, container access, browser execution, current GitHub permissions or production reachability. Their absence here is not a failed future implementation gate; the actionable W must verify capability and stop when its mandatory route is unavailable.

Mission separation is native sub-agent separation from the preparing coordinator. It shares the filesystem/Git and has no OS isolation; independence is procedural, with no source mutation or assurance proxy claim. This mission authored only this previously absent original report. It did not commit or alter reviewed P/Spec/scope, implementation or Git state.

The two preexisting dirty paths were observed with the P-recorded SHA-256 values before report creation: `.dockerignore` `d4399b482b0542db687bec6444e21fe7ec04ae8c3af6a0a2766960b330e1baf5`; adoption handoff `b00e76ad2ca8bad1e22030d92562d1b710ddeeccaec152f15748f028c2653ec8`. They are outside the mission write-set and were not touched.

**Next permitted gate:** present this original READY report with the exact P subjects to Owner for exact-P review, including explicit disposition of the stacked PR base and proposed delegated bounds. Only after that approval may a conforming committed W and independent Stage Critic precede implementation.
