# Historical Reviewer report — REWORK on exact S2

**Historical status:** this is the original independent Reviewer report for frozen source candidate S2 `454cc4d470033746484d750ef7da14b7c44ef9cc`. It is historical evidence only: it does not assess any later commit or uncommitted worktree change, and its REWORK verdict is not changed by this record.

## Reviewer Report

**Candidate:** exact S2 `454cc4d470033746484d750ef7da14b7c44ef9cc`
**Verdict Reviewer:** **REWORK**
**Reviewed:** W `48bd7bc7df43d08d490550dd796d2d9ceb386ad2`, approved P `e6d460b76370020d9a5e22d6cafc7b55cfb35dff`, stage diff `W..S2`, prospective diff `main..S2`, image inventory/fixtures, content, CI and security boundary.

**Files reviewed:** `tests/review-images.spec.ts`, `scripts/app-checks/{review-image-inventory,audit-images}.{mjs,test.mjs}`, `src/{content.config.ts,utils/review-image.{ts,test.ts}}`, seven MDX content files, `.github/workflows/ci.yml`, stage evidence documents.

### By severity

- HIGH: 0
- MEDIUM: 1 — required social image is fetched but the test does not prove full image decode.
- LOW: 1 — implementation evidence claims an assertion which frozen S2 does not make.

### Details

| Severity | File:Line | Finding | Evidence | Recommendation |
|---|---|---|---|---|
| MEDIUM | `tests/review-images.spec.ts:22-24` | E2E social assertion is insufficient for W’s mandatory fetch/**decode** condition. | It calls `sharp(await response.body()).metadata()` and checks only parsed width/height. Unlike the same file’s body/card identity path at `:34`, it never materializes decoded pixels via `raw().toBuffer()`. A truncated/corrupt social image that preserves parseable header metadata is not proven to fail. Exact W requires fetch/decode of required social URLs at `work-block.md:22`. | In `social()`, fully decode the fetched response, e.g. `raw().toBuffer({ resolveWithObject: true })`, assert nonzero dimensions and consistency of decoded buffer length. Freeze a new S and rerun the focused Playwright spec; its result must bind that new S. |
| LOW | `docs/changes/application-maintenance-images/implementation.md:11` | Frozen evidence overstates implemented assertion coverage. | The report says the Playwright spec “fetches and decodes social images,” while exact S2 test source only invokes `metadata()` at `tests/review-images.spec.ts:22`. The report itself correctly says it is not an independent verdict, but its technical claim is nevertheless inconsistent with the candidate. | After fixing the test, preserve the original report and add/update the appropriate evidence for the new candidate with exact command/SHA/outcome. Do not represent the current mutable worktree correction as evidence for S2. |

### Confirmed observations

- `W` is an ancestor of S2; `git diff --check W..S2` is clean. The complete stage diff contains 19 files and stays inside the W write-set, including the seven conditional content paths.
- The immutable S2 source was used for findings. The active worktree had an uncommitted modification of `tests/review-images.spec.ts`; it was deliberately excluded from this review.
- The inventory’s source contract excludes underscore drafts, limits published locales to EN/FR/DE/RU, resolves/fully decodes local content/public assets, distinguishes remote availability as unknown, and records optional body-hero absence. It has explicit fixtures for missing/unresolvable, unsafe, corrupt, unresolved import, public/remote, and draft cases.
- Current published content patterns contain no raw Markdown image, `<img>`, or `<Image>` syntax outside the tracked component pathways; all current `ReviewHero` props are identifier imports. The script’s stated limitation for future arbitrary MDX expressions is honestly disclosed at `implementation.md:9`.
- The corrected Samsung tag and six localized `heroImage`/`ogImage` additions are narrow content changes; no editorial/affiliate/asset replacement diff was observed.
- No gate reduction found. Relative to `main`, CI removes `paths-ignore` (broader triggering), retains lint/type/build/affiliate/image/researcher gates, adds the three required image commands, and keeps E2E dependent on quality. This is not a replacement of existing quality gates.
- Static security review found no additional confirmed vulnerability in the new image string validation: it rejects control characters, backslashes, dot-segments, protocol-relative URLs, non-HTTP(S), and URL credentials. Remote references are not fetched by the inventory.
- No heavyweight matrix, build, browser, audit, or hosted CI run was performed by this Reviewer; those remain Verifier/candidate evidence work. The Coder implementation report itself declares final-matrix and S2 assurance pending.

**Rework condition:** correct the social full-decode assertion and evidence drift on a new frozen source candidate, then obtain fresh same-S Reviewer/Verifier assurance. This REWORK applies only to S2 `454cc4d470033746484d750ef7da14b7c44ef9cc`; it does not assess the uncommitted workspace edit.

---

# Independent Reviewer report — READY on exact S

**Historical status:** this is a new, separate independent review of immutable source candidate S `bbf7de5ff280cf0f6aa1aeeed996dfc51583d89c`. It preserves the preceding S2 report unchanged: S2 remains **REWORK** and that verdict is neither replaced nor retroactively amended.

## Reviewer Report

**Candidate:** exact S `bbf7de5ff280cf0f6aa1aeeed996dfc51583d89c`
**Verdict Reviewer:** **READY**
**Reviewed:** W `48bd7bc7df43d08d490550dd796d2d9ceb386ad2`, approved P `e6d460b76370020d9a5e22d6cafc7b55cfb35dff`, complete stage diff `W..S`, prospective `main..S` diff, image-inventory/negative-fixture/test contracts, corrected content, CI gates and static security boundary.

**Files reviewed:** `tests/review-images.spec.ts`, `scripts/app-checks/{review-image-inventory,audit-images}.{mjs,test.mjs}`, `src/{content.config.ts,utils/review-image.{ts,test.ts}}`, seven affected MDX files, `.github/workflows/ci.yml`, and image-stage evidence documents.

### By severity

- HIGH: 0
- MEDIUM: 0
- LOW: 0

### Details

| Severity | File:Line | Finding | Evidence | Recommendation |
|---|---|---|---|---|
| — | — | No findings in the immutable S under this review. | The earlier required social-decode path is now present and the complete reviewed diffs introduce no additional contract, scope, gate, architecture, content, or confirmed security defect. | Proceed to independent Verifier assurance on this exact S; do not transfer any execution result from S2. |

### Evidence and disposition of the previous REWORK

- **Previous MEDIUM is fixed:** `tests/review-images.spec.ts:22-25` fetches the required social URL, invokes Sharp `raw().toBuffer({ resolveWithObject: true })`, asserts non-zero decoded dimensions, and verifies decoded byte count as `width * height * channels`. This is a full pixel materialization, not the metadata-only parsing at S2. It satisfies W `work-block.md:22` static test-contract requirement for fetch/decode of social imagery.
- **Previous LOW is fixed:** `implementation.md:32-34` explicitly corrects the S2 overstatement, identifies its immutable SHA, and says the former browser result cannot verify the later source change. Its S2 execution narrative is therefore preserved as historical evidence rather than reused for S.
- The inventory covers published non-draft EN/FR/DE/RU records, classifies metadata/import/content-relative/public/remote/optional forms, fully decodes local assets, and distinguishes remote availability as unknown. Its negative fixtures cover unresolved Hero imports, missing and corrupt files, unsafe references, public/remote positives and draft exclusion. The audit fixtures retain missing/corrupt failures and valid oversized-image warning/zero-exit behavior.
- The browser specification covers the four-language Steam Deck desktop/mobile hero path with lazy-load/decode/product-pixel identity checks, representative listing and related paths, Samsung and localized content fixes, plus social metadata/JSON-LD. The new social helper is shared by those affected paths.
- Static security review found no additional confirmed issue in `src/utils/review-image.ts:3-15`: empty/whitespace/control/backslash strings, dot segments, protocol-relative paths, non-HTTP(S) schemes and URL credentials are rejected; remote inventory records remain availability-unknown and are not fetched.
- The seven MDX edits are narrow hero/OG metadata or the missing Samsung rendering tag; no asset replacement, affiliate-copy rewrite, or unsupported content claim appears in the stage diff. Existing CI gates remain; the three image checks are added to the quality job, and the prospective diff removes a `paths-ignore` exclusion rather than reducing trigger coverage.
- `W` and approved `P` are ancestors of S. `git diff --check W..S` and `git diff --check main..S` were clean. The complete `W..S` change set contains 21 files and remains within the stage write-set.

### Review limits and handoff

This Reviewer performed Git-object/static inspection only and did **not** run the heavyweight candidate matrix, build, browser suite, audit, hosted CI, Lighthouse, Docker, or npm-audit commands. No such result is claimed for S. The documented S2 command outputs are explicitly historical and cannot establish S because `tests/review-images.spec.ts` changed after S2. This **READY** is a Reviewer source-review verdict only; it is not a Verifier PASS, H/evidence-only comparison, hosted-CI result, merge, deployment, or Owner acceptance. Independent Verifier evidence must bind the same exact S `bbf7de5ff280cf0f6aa1aeeed996dfc51583d89c`.
