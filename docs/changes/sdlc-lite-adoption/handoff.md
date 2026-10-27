# HardwareLab — Clean SDLC Lite Initialization Handoff

## R1 continuation checkpoint — 2026-10-27

**BLOCKED / NOT_COMMITTED.** The Owner's hooks configuration correction is now observed: `extensions.worktreeConfig=true` in common config, `core.hooksPath=.githooks` in the Lite worktree config, and no effective `core.hooksPath` in the main worktree. Hook syntax and executable bits pass; actual hook execution was not observed. The main worktree has a separate modified `test-results/.last-run.json`, preserved without inspection or change.

HEAD remains `20350b5f6fa059e4dccf81b67d05d18be7789faf`. The only R1 changes are the three authorized sidecar deletions, this handoff, and the untracked `native-validation.md`. Full tracked diff and the untracked report were inspected; the index is empty. The execution sandbox still permits read-only access to Git metadata, so no staging or commit was attempted. Exact S and same-S independent Reviewer/Verifier remain outstanding; earlier working-tree review and checks are not same-S acceptance.

**Next action:** in a session with write access to this existing Git metadata, recheck identity, HEAD, status and effective hooks; stage only the five listed R1 paths, inspect the complete staged diff and run `git diff --cached --check`, then commit with hooks enabled. Capture exact S, run applicable checks and request separate independent Reviewer and Verifier on S; preserve their reports and update handoff as evidence-only after S. Do not push, merge, deploy or update dependencies. The earlier checkpoints below are historical where superseded by this one.

## R1 checkpoint — 2026-10-27

**BLOCKED:** final exact Git source S, worktree-local hooks configuration and mandatory same-S independent Reviewer/Verifier remain unavailable because Git metadata is read-only in this execution environment. HEAD is `20350b5f6fa059e4dccf81b67d05d18be7789faf`; three authorized historical sidecar deletions and these evidence files are uncommitted. Preserve them. See [native-validation.md](native-validation.md) for the exact cleanup, browser procedure, findings and original first-iteration evidence.

**Next action:** in an environment with authorized write access to the existing Git metadata, recheck worktree configuration and follow the documented safe hooks migration; verify effective hooks in both worktrees. Review the complete uncommitted diff, establish a scoped source commit S, rerun applicable checks, and obtain independent Reviewer READY and Verifier PASS on that same S. Record evidence separately, check any S..H diff and applicable CI when publication is later authorized. Do not push in R1; keep PR #14 Draft, with no merge or deployment. The older checkpoint and checklist below are historical and superseded where inconsistent.

## HW-LITE-001 validation checkpoint — 2026-10-27

- Observed predecessor/source candidate: `20350b5f6fa059e4dccf81b67d05d18be7789faf`; parent `72ada873d66d19de2609515b443766065fe132c9`. The task-local report is [native-validation.md](native-validation.md); its current local changes are not committed or pushed.
- Recommendation: **REWORK_REQUIRED**. Temporary Chromium fallback enabled 4/4 E2E and `check:ci` PASS; default local setup still fails on Ubuntu 26.04. Image audit reports 35 issues with exit 0; one existing researcher package fails validation. Independent Reviewer/Verifier identified three retained historical instructions to deleted roles; formal independent runtime Verifier PASS is not established. GitHub `main` protection was not observed, and shared Git `core.hooksPath` affects other worktrees.
- Next action: Owner decides whether to classify the three source handoffs as historical or authorize a narrow cleanup, and decides platform protection disposition. Then obtain applicable exact-source independent assurance, durable task evidence and CI on any delivery HEAD. Keep PR #14 Draft; no merge, deploy or dependency upgrade.
- The checklist below is the original initialization handoff; where it differs from the dated report, the latter records the newer observation. It is not an activation grant for hooks.

## Project identity and owner intent
- Repository: `oleyna80/hardwarelab`, experimental branch `chore/sdlc-lite-adoption`, parent `72ada873d66d19de2609515b443766065fe132c9`.
- Reusable framework: `oleyna80/agentic-sdlc-lite` at `55ebee6cf26db99d708f089f297344ef0341f698`.
- Owner explicitly requested **only application + clean Lite** in this branch and full local testing through Codex afterward. The old framework stays in original Git ancestry and is not active.
- This is a first-use engineering-environment bootstrap, not an approved product feature task.

## Installed scope
- Preserved the unchanged `src/`, `public/`, `tests/` Git tree objects, Docker/deployment definition, current lockfile and ordinary product CI.
- Dropped old process instructions, all previous agents/Skills, histories, hooks, reports and alternative harness configs from the proposed tree.
- Relocated six necessary application QA scripts into `scripts/app-checks/` and rewired `package.json`, `scripts/review-publish.mjs`, `scripts/run-researcher-output-checks.sh`; removed obsolete process lint npm commands and old Agent Guards CI.
- Imported Lite main root `AGENTS.md`, role briefs, canonical workflow/security docs, templates and optional `.githooks/`; installed fresh HardwareLab identity, architecture map and committed memory.
- Only canonical Lite procedures are active. Old branch documentation is **read-only historical evidence**. No inherited project P/Stage W or old Critic decisions are valid.

## No unsupported claims
- GitHub API commits do **not** invoke local hooks. No hook enforcement, local Codex agent execution, `npm ci`, Astro builds, Playwright or same-source independent Reviewer/Verifier have been performed merely by creating this branch.
- GitHub Actions status and full diff must be checked on resulting PR HEAD. PR creation is not acceptance or integration.
- Do not claim to have migrated all legacy business knowledge; this is deliberately a fresh initialization. Re-discover facts from code and targeted historical reads.

## Native Codex validation checklist
1. Verify actual repo/worktree/branch/HEAD/status and Git remote. Check that `AGENTS.md` is single active root; no old `AGENT.md`, `CLAUDE.md`, `.agent/`, `.claude/`, `.codex/`, `.memory_bank/`, `governance/`, `.opencode/`, `.roo/`, `.antigravity/`, `runtimes/`, `integrations/` exist as active tracked paths.
2. Historical instruction superseded: do not set `core.hooksPath` in shared local config; see the R1 worktree-specific procedure in the report.
3. Audit `src/`, `package.json`, CI and migrated application QA references; assess any missing app utilities without reintroducing old agent contracts.
4. Run `npm ci`, `npm run lint`, `npm run check:types`, `npm run build`, `npm run check:affiliate`, `npm run lint:images`, `npm run test:e2e` and relevant specific content checks where fixtures exist.
5. Confirm actual GitHub Actions checks at PR HEAD and full diff to base. Report precise successes/failures (including environment-only failures) without invented PASS.
6. Have independent Critic/Reviewer/Verifier evaluate adoption per applicable Lite workflow; send blockers and proposals to Owner. Do NOT run the separate Astro/Tailwind update in this work block.

## Security and production boundary
- No merge, manual workflow dispatch, container publish, SSH, VPS deploy, credential access or branch-protection change without Owner GO.
- Existing automated Docker Publish/Deploy workflows are gated on `main`; inspect live GitHub rules separately as needed.
- Before future merge, preserve archive ref for old agents; fixed historical SHA `72ada873d66d19de2609515b443766065fe132c9` supports permanent retrieval subject to repository history retention.
