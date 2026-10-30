# Researcher quote parser — proposed Codex CLI task

## Purpose and sequence

Prepare a separate bounded correction for the existing researcher-output CI failure, before implementing `lite-workspace-update`. The Owner agreed to a separate task and asked when it should run; parser-first is the architecture recommendation. This brief is prepared for Owner review and project CLI handoff, not evidence of implementation or permission to publish.

Classification: **routine**, provided the correction stays within the existing `source-verbatim` heading contract, preserves exact quote comparison and section boundaries, and adds no dependency or application behavior change. Per `docs/workflow/development.md` §1, a separate project Spec/P, W, Project/Stage Critic and independent Reviewer/Verifier are **NOT_APPLICABLE** for this bounded routine fix. Focused regression checks and full diff self-review remain required. Reassess scope if investigation requires more.

## Observed baseline — 2026-10-30

- Repository: `oleyna80/hardwarelab`; worktree `/home/azur/Projects/WSL/projects/Amazon_aff/hardwarelab-lite`; branch `chore/sdlc-lite-adoption`; local HEAD `cccc54d717b9f72d262ce89e3378bcc4abf872cb`.
- PR [#14](https://github.com/oleyna80/hardwarelab/pull/14): OPEN/Draft, remote head `2067aac149c45c3e30f6503a8d6b659a1c68dd29`, base `main`. Actual CI [run 40581954112](https://github.com/oleyna80/hardwarelab/actions/runs/40581954112): quality FAILURE, E2E and Lighthouse SKIPPED. Lite Checks SUCCESS. No claim of CI on the newer local HEAD.
- Fresh local execution on Node `v22.22.3`: `node scripts/app-checks/check-researcher-output.mjs beelink-ser5-5500u` and the same command for `rog-ally-z1-2024-asus-512gb-white` each exited 1: no quotes parsed, six verbatim-match errors. These are actual failing checks, not a repaired result.
- Parser requests the exact heading `User Quotes (source-verbatim)`; both affected packs use `## 6) User Quotes (source-verbatim, 4–6)`. The changed-slug selector includes both articles because historical sidecars were deleted earlier in the PR.
- `gh run view --log-failed` returned exit 0 with empty output on this observation; no fresh hosted-log diagnosis is claimed. PR check status and local reproduction are separately observed.

## Finite implementation and evidence scope

1. `scripts/app-checks/check-researcher-output.mjs` — minimal recognition change confined to research-pack quote headings. Preserve unrelated heading consumers such as Related Reviews.
2. `scripts/app-checks/check-researcher-output.test.mjs` — new focused regression tests using Node's built-in test runner; no package/dependency/config change. Exercise the real validator through temporary fixture roots if this avoids production refactoring solely for testing.
3. `docs/changes/researcher-quote-parser/handoff.md` — update this task's observed results, diff, checks, limitations, candidate/delivery subjects and next action. Keep initial observations distinguishable from later outcomes.

Do not edit articles/research packs, quote text, the changed-slug selector, workflows, dependencies, `_utils.mjs`, hooks/configuration, Lite documents or shared integrated memory. Do not broaden acceptance to unrelated historical headings such as `User Quotes (Verbatim)` or `MDX-ready` in this task. If the bounded correction cannot pass the real validator, report the new evidence and escalate rather than silently expanding scope.

## Implementation and checks

1. Start a project CLI session rooted at the exact HardwareLab worktree. Read applicable instructions, recover actual branch/HEAD/status and inspect this task. Reproduce the failure before editing. Inspect actual heading variants and choose the smallest anchored recognition change supporting the legacy exact heading plus the affected numbered/count-qualified heading. Retain H2/H3 section boundaries and existing quote parsing/comparison semantics; do not scan the whole document for matching quotes.
2. Add meaningful regression checks: legacy heading still passes; the affected numbered heading passes; a one-character article-quote mismatch fails; matching quotes only in another section cannot satisfy validation; a malformed/unrelated heading cannot supply quotes. Isolate fixtures outside tracked content, clean up only task-owned temporary artifacts, and check real CLI exit codes/diagnostics. Demonstrate the numbered-heading regression fails with predecessor parser bytes and passes with the patch. Avoid changing production code merely to export a private helper for tests.
3. Run `node --test scripts/app-checks/check-researcher-output.test.mjs`, `node --check` on both task scripts, and `npm run lint`. Run the full real validator for both affected slugs. Run the actual selector against the actual PR base and execution HEAD: `bash scripts/run-researcher-output-checks.sh pull_request <verified-PR-base-SHA> '' HEAD`. Before committing, the selector can execute the working parser while selecting slugs from the committed HEAD; label that accurately. Recheck with the exact candidate after an authorized commit.
4. Review complete task diff, tracked/untracked whitespace/conflict markers, preservation of unrelated bytes and any broader baseline drift. Local positive/negative tests are not hosted CI success. Report other failures separately; do not fix unrelated issues.
5. If scoped publication is separately authorized, publish only to the existing task branch, observe actual Lite Checks and CI quality/E2E/Lighthouse on delivery HEAD, and record the checked result and URL. Do not use `check:ci` alone as evidence of all hosted jobs. No intermediate merge is needed: the successful parser candidate becomes an explicitly accounted predecessor for Lite transfer.

## Preservation and authority

At preparation, the index was empty. Existing tracked modifications: `docs/changes/sdlc-lite-adoption/handoff.md` and `docs/changes/lite-workspace-update/handoff.md`. Existing untracked drafts: `docs/projects/lite-workspace-update/owner-decisions.md` and `plan.md`. Preserve all four without staging them. The accepted Lite Spec remains blob `778907a738f1677328092e7849f166cc762d5b92`; old adoption-handoff SHA-256 is `b00e76ad2ca8bad1e22030d92562d1b710ddeeccaec152f15748f028c2653ec8`. Refresh preservation digests at CLI entry for all unrelated dirty drafts. No other writer may edit task paths during implementation.

Current authorization covers architecture/task preparation here; implementation is to be launched in project Codex CLI. Proposed launch delegation for Owner review: edit only the three enumerated task files, execute focused checks, make normal scoped local task-branch commits, non-force push this branch and observe automatically triggered PR CI, with bounded rework inside this scope. Publishing the branch would also publish its already-local predecessor `cccc54d717b9f72d262ce89e3378bcc4abf872cb` (accepted Lite Spec and initial checkpoint); include this explicitly in the launch decision. These commit/publication rights are **proposed, not yet granted** by this document. Sending an explicit launch instruction with these rights supplies that decision; the brief alone does not.

No permission for merge, deployment, manual workflow dispatch, source checkout changes, new worktrees, history rewriting, bypassing hooks or cleanup of unrelated work. Missing permission blocks only the affected operation; preserve local results and report NOT_COMMITTED/NOT_PUBLISHED/NOT_RUN as applicable.

## Preparation status

Task brief prepared; no parser/test file edited and no repair claimed. This file and current Lite planning updates are NOT_COMMITTED. Next: Owner confirms parser-first execution and launch delegation; project CLI implements the routine task, then the Lite plan resumes with the dependency evidence and actual execution baseline.

## Execution checkpoint — 2026-10-30

Owner explicitly authorized the bounded implementation, task commits and ordinary non-force push including predecessor `cccc54d717b9f72d262ce89e3378bcc4abf872cb`; merge and deploy remain excluded. Branch and predecessor matched the baseline; PR #14 remained draft at remote `2067aac149c45c3e30f6503a8d6b659a1c68dd29`, base `72ada873d66d19de2609515b443766065fe132c9`. The preparation status above is historical.

The parser now recognizes both the exact legacy heading and the affected numbered/count-qualified heading, with existing section termination and exact quote comparison retained. Six real-CLI fixture tests passed, covering both headings, one-character mismatch, other-section quotes, unrelated and malformed headings. The numbered fixture failed against predecessor parser bytes as expected. Both `node --check` commands and `npm run lint` passed.

Real validator: Beelink passed; ROG Ally failed with two verbatim mismatches. The article's Minecraft comment omits the final sentence present in its research-pack quote; its Cyberpunk comment ends in a period absent from the pack. The actual selector run against the verified PR base and committed predecessor HEAD, using the working-tree parser, selected both slugs and failed on those same two mismatches. This is not hosted CI evidence.

**BLOCKED:** the brief explicitly requires escalation if the bounded correction cannot pass the real validator and excludes edits to articles, research packs and comparison semantics. The source correction and tests remain a partial candidate; no successful full validator or CI result is claimed. Next: Owner decide whether to authorize a separately scoped correction of the two source discrepancies, preserving exact comparison. Do not proceed to the dependent Lite transfer as though this check passed. Unrelated dirty drafts were preserved and their entry SHA-256 digests rechecked unchanged.

The partial candidate was committed and pushed as `d3c784472e3c044a9f1d1c6c6502a140fe6b0d09`, including authorized predecessor `cccc54d717b9f72d262ce89e3378bcc4abf872cb`. The selector on that exact local candidate reproduced the same two failures. Hosted [Lite Checks 41037487175](https://github.com/oleyna80/hardwarelab/actions/runs/41037487175) succeeded; [CI 41037487173](https://github.com/oleyna80/hardwarelab/actions/runs/41037487173) failed quality at researcher output checks, with Beelink passing and the same two ROG Ally errors; E2E and Lighthouse were skipped. The PR workflow ran on GitHub's generated merge commit `dbedeb82930238d581b72da39bb92f04bb23707f` for that head. This checkpoint records an observed predecessor, not a claim about later CI.

## Owner-authorized continuation — 2026-10-30

In the architecture conversation, the Owner answered **«да, разрешаю»** to the explicit proposal to correct the two ROG Ally comments, make scoped local commits, non-force push the same branch and check CI, without merge or deployment. This decision extends the original article exclusion only for the two corrections below. The earlier scope blocker is resolved; the recorded validation/CI failures remain historical failures until successful reruns are observed. Classification remains routine for these two bounded content corrections; the existing NOT_APPLICABLE rationale applies.

Verified continuation predecessor: `4cf17e881f673fc251a11049c2dd50c253560fdd` on `chore/sdlc-lite-adoption` in the same HardwareLab worktree. The index was empty. This continuation entry is initially **NOT_COMMITTED**; no article correction has been made here. Implementation and testing continue in project Codex CLI.

Continuation write-set:

1. `src/content/reviews/en/rog-ally-z1-2024-asus-512gb-white/index.mdx` — only the two `comment` values: append ` I really like this little device.` to the Minecraft/Kingdom Hearts comment, and remove the terminal period after `super nice` in the Cyberpunk comment. Match the existing research-pack quotes exactly; retain all other text, typography and metadata.
2. `docs/changes/researcher-quote-parser/handoff.md` — retain earlier observations and record this continuation's changes, executed checks, actual candidate/delivery commits, hosted results and next action.

The existing parser and tests are unchanged by this continuation. Research packs, comparison semantics, selector, workflows, dependencies, hooks/configuration, Lite documents and shared integrated memory remain outside scope. A new need outside these two files requires Owner disposition; ordinary rework within them is authorized.

At CLI entry, verify actual repository/branch/HEAD/status and refresh preservation digests for the four unrelated files listed above. Preserve them without staging; retain accepted Spec blob `778907a738f1677328092e7849f166cc762d5b92` and the recorded adoption-handoff digest. The local continuation entry in this handoff belongs to the authorized task and may be included in its scoped commit.

Run the existing six fixture tests, syntax checks for both scripts, `npm run lint`, both real-slug validators, and the actual selector against the freshly verified PR base and execution HEAD. Distinguish pre-commit working-tree execution from the subsequent exact committed candidate. Review the full continuation diff: only the two literal comment corrections plus this task's evidence. Do not weaken the validator or treat skipped checks as success.

Make normal scoped local commits with existing hooks and ordinary non-force push to `chore/sdlc-lite-adoption`; observe automatically triggered Lite Checks and CI quality/E2E/Lighthouse on the actual delivery HEAD. Record actual run URLs/results, including any failure or unavailable check. Use sensible polling intervals. Do not create a self-referential reporting loop: identify observed predecessors in committed checkpoints and report the final HEAD/CI separately when needed. No merge, deploy or manual workflow dispatch is authorized. Resume dependent Lite transfer planning only with the actual outcome of this correction and its CI evidence.

## Continuation execution — 2026-10-30

The current Owner instruction authorized this continuation. Entry HEAD and remote PR head were `4cf17e881f673fc251a11049c2dd50c253560fdd`, PR base `72ada873d66d19de2609515b443766065fe132c9`; the index was empty. The four unrelated draft SHA-256 digests matched the previously observed values, and the accepted Spec blob remained `778907a738f1677328092e7849f166cc762d5b92`. The old ROG Ally validator failure was reproduced before editing.

Only the two specified article comments were aligned with their existing research-pack quotes. The six fixture tests, both script syntax checks, `npm run lint`, both real-slug validators and the PR-base selector passed locally. The pre-commit selector selected paths from predecessor HEAD while reading the corrected working tree. The continuation diff was reviewed and whitespace checked; unrelated drafts were not staged. Next: verify the selector against the committed candidate, push the authorized branch and observe actual hosted checks; preserve earlier CI failures as historical evidence.
