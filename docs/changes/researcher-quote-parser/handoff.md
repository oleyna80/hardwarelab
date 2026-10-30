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
