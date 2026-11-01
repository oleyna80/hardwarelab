# Historical verification record — exact S `454cc4d470033746484d750ef7da14b7c44ef9cc`

## 2026-11-01 — stopped, invalidated partial attempt; no PASS

Control Tower stopped this assurance before the remaining mandatory matrix. This record is historical evidence only and is not a verifier PASS/READY for S or any later candidate.

### Candidate custody and provenance correction

- Git exact-S blob for `tests/review-images.spec.ts`: `5501f19dc5049758e581790c676b5013ac275293`.
- Archive file: `/home/azur/Projects/.agent-runs/hardwarelab/images-s2-verifier-20261101-1230/tests/review-images.spec.ts`; its blob is also `5501f19dc5049758e581790c676b5013ac275293`.
- Recorded archive tree and `454cc4d470033746484d750ef7da14b7c44ef9cc^{tree}`: `204316cf599bd8e28ef72d5f39aa3cd029b804b7`.
- The raw-decode content observed during the stop discussion was **not** in this archive. It was read from the dirty source worktree `/home/azur/Projects/WSL/projects/Amazon_aff/hardwarelab-maintenance/tests/review-images.spec.ts`, whose file blob was `7da97299c2413575192d28903b873553e5bd50ed`; its index blob remained exact-S `5501f19dc5049758e581790c676b5013ac275293`.
- Root cause: an incorrect inspection path appended `/source` to the archive root. That nonexistent path caused static inspection to fall back to the current source worktree. This did not establish raw decode in S.

### Attribution disposition

No test or build result from this attempt is assigned PASS to S. The following logs are preserved for diagnosis only and must not be reused as evidence for S or a later candidate without a fresh custody/provenance check:

- `logs/01-npm-ci.log`
- `logs/02-lint.log`
- `logs/03-check-types.log`
- `logs/04-review-image-vitest.log`
- `logs/05-image-node-tests.log`
- `logs/06-production-inventory.json`
- `logs/06-production-inventory.stderr`
- `logs/07-build.log`

The associated contemporaneous checkpoints are `checkpoints/00-pre-npm-ci.txt` through `checkpoints/07-build.txt` and `checkpoints/STOP-source-rework.txt`; their candidate attribution is superseded by this record.

### Not run

`check:affiliate` was aborted before dispatch. `lint:images`, affiliate tests, actual researcher selector, contact test, browser matrix, Lighthouse, full/prod audit, Docker, final security/diff review, and hosted CI were not run. Heavy processes are stopped; the archive, logs, cache, dependencies, and checkpoints are retained at this path for forensic review.

---

# Independent Verifier Report — exact S `bbf7de5ff280cf0f6aa1aeeed996dfc51583d89c`

## 2026-11-01 — local candidate gate PASS; hosted CI not run

**Work Block:** `docs/changes/application-maintenance-images/work-block.md` at exact W `48bd7bc7df43d08d490550dd796d2d9ceb386ad2`.

**Verdict:** **READY — local Verifier PASS for exact S only.** This is not an approval to merge, deploy, or accept the task. Hosted CI, post-release edge headers/CSP, and Owner acceptance are separately `NOT_RUN`/`UNVERIFIED`.

### Custody and isolation

- Verification used a separate Git archive at `/home/azur/Projects/.agent-runs/hardwarelab/images-s3-verifier-20261101-1545`, never the mutable source worktree. `git archive S` was checked with an independent index (`git read-tree S`; `git diff-files --quiet`): its complete tracked tree equals `S^{tree}` `0c4ab3f2de488083f1040412a2e3d11216d3afcc`.
- `tests/review-images.spec.ts` at S is blob `7da97299c2413575192d28903b873553e5bd50ed`. Static evidence in `logs/32-social-image-decode-static.txt` confirms the social assertion performs `sharp(await response.body()).raw().toBuffer({ resolveWithObject: true })` and validates dimensions and byte length. It is therefore distinct from historical S `454cc4d…`, whose blob only used metadata; the preceding historical record remains invalidated and is not used here.
- Fresh dependencies, browser binary/cache, temporary files, copies, artifacts and logs were under the persistent run root above (and short persistent `TMPDIR=/home/azur/Projects/.agent-runs/hardwarelab/tmp-s3v-1545` for Lighthouse). No project copy, `node_modules`, browser cache, or material log was created under `/tmp`.
- Chromium was installed in the isolated cache as Playwright Chromium `143.0.7499.4` / Playwright `1200`. `PLAYWRIGHT_HOST_PLATFORM_OVERRIDE=ubuntu24.04-x64` was necessary on the host and recorded; it is an environment compatibility override, not a source change.

### Changed-files and static review

- `H1=bf4e050c9e36b08288ce33cdaa6f71570e866116..S` changes 22 files, 476 insertions and 45 deletions: localized review image front matter; image schema/utility and unit tests; image audit/inventory scripts and negative tests; browser test; CI selector; and task evidence. Full list/stat and `git diff --check` are in `logs/31-stage-diff.txt` (clean).
- Prospective `main=72ada873d66d19de2609515b443766065fe132c9...S` diff, name/status, full patch and whitespace check are in `logs/30-prospective-*`; it also passed `git diff --check`.
- Manual changed-diff secret review found no credential material. The only regex hits are intentional policy prose and `url.password` validation in the new image validator; see `logs/33-stage-secret-review.txt`. `scripts/secret-scan.sh` is absent at S, so that script was not silently substituted for a passing scan.

### Executed matrix

All commands below used Node `22.23.4`, the isolated archive, persistent `TMPDIR`/npm cache, and ran sequentially. Their short per-step custody/outcome checkpoints are `checkpoints/01-npm-ci.txt` through `checkpoints/30-prospective-diff-and-secret-review.txt`; complete output is in the named logs.

| Check | Result and evidence |
| --- | --- |
| Fresh dependency install | `npm ci` PASS; `logs/01-npm-ci.log`. |
| Static/build/affiliate | `npm run lint`, `npm run check:types`, `npm run build`, `npm run check:affiliate` all PASS; `logs/02-lint.log`–`05-check-affiliate.log`. Types reported no errors or warnings; affiliate checker checked 93 monetized pages. |
| Image lint and existing tests | `npm run lint:images` PASS (192 files, 0 errors, 35 valid-large-image warnings); `npm run test:affiliate` PASS (6/6); `logs/06-lint-images.log`, `07-test-affiliate.log`. |
| Researcher and contact regression tests | `node --test scripts/app-checks/check-researcher-output.test.mjs` PASS (6/6) and `npx vitest run src/pages/api/contact.test.ts` PASS (5/5); `logs/08-researcher-unit.log`, `09-contact-focused.log`. |
| New image positive/negative tests | `npx vitest run src/utils/review-image.test.ts` PASS (12/12); `node --test scripts/app-checks/audit-images.test.mjs scripts/app-checks/review-image-inventory.test.mjs` PASS (2/2); `logs/10-review-image-unit.log`, `11-image-node-tests.log`. The latter intentionally exercises missing, corrupt and unsafe refs as failures, valid oversize images as warnings, and published-local decode. |
| Production inventory | `node scripts/app-checks/review-image-inventory.mjs` PASS: 331 records, `en=29`, `fr=21`, `de=21`, `ru=22`, no errors; `logs/12-production-inventory.json` and `12-production-inventory-summary.json`. |
| Actual CI researcher selector | With verified `merge-base --is-ancestor H1 S`, `bash scripts/run-researcher-output-checks.sh pull_request H1 '' S` PASS. It selected and validated the changed EN slug `samsung-57-odyssey-neo-g9-g95nc`; `logs/13-researcher-selector.log`. |
| Focused browser image matrix | `npx playwright test tests/review-images.spec.ts` PASS: 19/19 in `logs/15-review-images-browser.log`. It covers EN/FR/DE/RU Steam Deck at desktop `1440×900` and mobile `390×844`, listing cards, lazy/decode/natural dimensions, identity comparison, social full raw decode, corrected Samsung hero, and localized PlayStation/Raspberry social images. |
| Full browser suite | `npm run test:e2e` PASS: 23/23; `logs/16-full-e2e.log`. |
| Local Lighthouse, no upload | PASS. The task-owned config `lighthouse/lighthouserc-local-no-upload.json` preserves the two original paths and all assertions/thresholds, uses isolated free loopback port `4175` because `4173` was occupied, and removes the repository's `upload.target=temporary-public-storage`; exact diff is `logs/17-lighthouse-config.diff`. `lhci collect --config=… --collect.settings.chromePath=…` followed by `lhci assert --config=…` passed for both URLs (performance `0.99` each); `logs/20-lighthouse-collect-retry.log`, `21-lighthouse-assert.log`. The one initial collect failed only because Chrome's UNIX socket path exceeded its length limit under the longer persistent run-root TMPDIR (`logs/18-lighthouse-collect.log`); it was diagnosed and rerun once with the documented shorter persistent TMPDIR, not blindly repeated. Neither command ran `lhci upload`. |
| Dependency audit | Full `npm audit --json` completed with 26 dev-graph records (`2 low`, `10 moderate`, `14 high`, `0 critical`), exit 1 as expected; exact records are `logs/22-npm-audit-full-records.jsonl`. They are limited to lint/Lighthouse CLI tooling (`eslint`/`glob` and the `@lhci/cli` → Lighthouse/Puppeteer chain), not the shipped dependency graph. `npm audit --omit=dev --json` PASS with `0` records at every severity; `logs/23-npm-audit-production.json`. Full-record disposition is therefore: do not claim clean full audit; retain the dev-tool findings for the Orchestrator's owned `security-review.md` refresh, while the deployable production graph is clean. |
| Committed-context Docker runtime | `git archive S | docker build -t hardwarelab-s3verifier-bbf7de5:local -` PASS (`logs/25-docker-build.log`); isolated run was loopback-only `127.0.0.1:4185:4321`, with no mounts or secrets (`logs/26-docker-run.log`). It returned HTTP 200 for `/` and `/reviews/playstation-5-disc-slim` (`logs/27-docker-root-headers.txt`, `27-docker-*.html`); an actual generated OG image returned HTTP 200, `image/webp`, 34510 bytes (`logs/28-docker-image-headers.txt`). Native runtime Sharp decoded a generated PNG as `sharp=0.35.5`, `vips=8.18.7`, `2×3`, `png` (`logs/28-docker-native-sharp.json`). The image declares no Docker `HEALTHCHECK`; running-state proof is recorded as `health=NO_HEALTHCHECK_IN_IMAGE`, not misreported as an application healthcheck. The owned `--rm` container was stopped and removed (`logs/29-docker-stop.log`); no foreign process or port owner was stopped. |

### Boundaries and follow-up evidence

- **Hosted CI: NOT_RUN.** No push, PR mutation, or hosted workflow was authorized or performed. A later evidence-only H needs its own `S..H` diff review and applicable hosted CI result; this local PASS does not transfer to H.
- **Edge/CSP headers: UNVERIFIED.** The local committed Docker server returned expected content headers but no deployment proxy/edge configuration was available or touched. Post-release header proof remains an authorized deployment-side check, not a local source assertion.
- **Security-review publication: UNVERIFIED as a separate owned artifact.** The fresh audit disposition above is the verifier evidence. `docs/changes/application-maintenance/security-review.md` is owned by the Orchestrator and was already being modified by another worker, so this verifier did not alter it.
- No source, configuration, runtime, environment, Dockerfile, secrets, or Git history was modified by this verification. This report is the sole verification-artifact mutation.

### Custody correction — 2026-11-01

The first version of this exact-S report incorrectly transcribed `204316cf599bd8e28ef72d5f39aa3cd029b804b7`, the tree of historical invalidated candidate `454cc4d470033746484d750ef7da14b7c44ef9cc`, into the new-S custody sentence. This was a report-generation error, not a property of the archive or the original custody index.

- The original retained `state/exact-s.index` writes `0c4ab3f2de488083f1040412a2e3d11216d3afcc`.
- A fresh separate index at `state/custody-recheck-20261101-1615.index` performed `read-tree S`, `update-index --refresh`, `diff-files --quiet`, and `write-tree`; it returned exit 0 and the same tree. Its exact command output is `logs/34-custody-recheck.txt`.
- The recheck compared the archive at the run root to all 555 tracked paths; its `tests/review-images.spec.ts` blob and `S:tests/review-images.spec.ts` are both `7da97299c2413575192d28903b873553e5bd50ed`.

Custody is therefore confirmed for exact S with tree `0c4ab3f2de488083f1040412a2e3d11216d3afcc`; the local Verifier PASS above is reinstated only on that corrected evidence.
