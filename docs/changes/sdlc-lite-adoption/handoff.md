# HardwareLab — Clean SDLC Lite Initialization Handoff

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
2. Inspect the local hooks and separately configure `git config --local core.hooksPath .githooks` if approved; acknowledge cooperative limitations.
3. Audit `src/`, `package.json`, CI and migrated application QA references; assess any missing app utilities without reintroducing old agent contracts.
4. Run `npm ci`, `npm run lint`, `npm run check:types`, `npm run build`, `npm run check:affiliate`, `npm run lint:images`, `npm run test:e2e` and relevant specific content checks where fixtures exist.
5. Confirm actual GitHub Actions checks at PR HEAD and full diff to base. Report precise successes/failures (including environment-only failures) without invented PASS.
6. Have independent Critic/Reviewer/Verifier evaluate adoption per applicable Lite workflow; send blockers and proposals to Owner. Do NOT run the separate Astro/Tailwind update in this work block.

## Security and production boundary
- No merge, manual workflow dispatch, container publish, SSH, VPS deploy, credential access or branch-protection change without Owner GO.
- Existing automated Docker Publish/Deploy workflows are gated on `main`; inspect live GitHub rules separately as needed.
- Before future merge, preserve archive ref for old agents; fixed historical SHA `72ada873d66d19de2609515b443766065fe132c9` supports permanent retrieval subject to repository history retention.
