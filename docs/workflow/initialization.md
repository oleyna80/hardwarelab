# First-use Initialization — New Project from SDLC Lite

**Mandatory once per new repository generated from this template**, before feature implementation. The *source* repository `oleyna80/agentic-sdlc-lite` retains its genuine development history; new projects must not inherit that history as their own context or decisions.

## Detect uninitialized project

Check verified repository identity and `GITHUB_REPOSITORY`, branch, HEAD and `PROJECT_BRIEF.md`. The limited first-use CI guard checks exact identity, INITIALIZED and five active-memory marker groups; passing it is not full initialization acceptance. If the repository is not the source `oleyna80/agentic-sdlc-lite` but `PROJECT_BRIEF.md` still describes the Lite template, **STOP feature work**: the repository is not initialized. Do not trust inherited memory, branch names, source `docs/projects/*` initiative contracts/approvals or `ROADMAP.md` status as this new project's authority.

## Initialization checklist

1. Create a `docs/initialize-project` task branch, unless this is an initial repository bootstrap with an explicitly approved different workflow. Do not rewrite the source template's `main`.
2. Replace `PROJECT_BRIEF.md` with **your product name, actual project repository ID, audience, scope, interfaces, data/secret boundaries and deployment assumptions**. Set the project identity field and mark setup complete.
3. Update `PROJECT_MAP.md` with real source directories, test/build commands and environment paths. Mark any inherited source repository **root `plan.md`** as legacy, not a current plan or roadmap. Inherited source `docs/projects/<project-id>/intent.md`, `spec.md`, `plan.md`, Owner/Critic reports and project approvals are **inactive**, even when identical bytes were copied; do not select or reapprove them automatically. Review them for explicit, repository-specific adoption or source-only archival/removal within the setup's separately authorized finite write scope. For new significant work, accept a new exact project-local Spec, prepare `docs/projects/<new-project-id>/plan.md`, obtain independent Project Critic READY and separate Owner exact-P approval before W/Stage Critic. Routine setup does not approve P.
4. **Reset only the new project's inherited operational memory files**:
   - `memory_bank/context.md` — current project objective, verified branch/HEAD and next setup action; no Lite PR #1 or source branches.
   - `memory_bank/progress.md` — initial milestone and checks for the *new* repository.
   - `memory_bank/decisions.md` — links only to decisions explicitly adopted in the new project.
   - `memory_bank/orchestrator-log.md` — new project's initial setup event.
5. Review inherited `docs/decisions/` records. In particular, ADR-0001 reflects the **source Lite framework decision**: either explicitly adopt its relevant principles in a project-specific decision, or remove/move inherited source-only ADRs from the new repository. Do not automatically accept decisions with source-repository scope.
6. Review inherited `docs/changes/` task records, handoffs and report references relating only to original Lite development; render them inactive as **source-only evidence** or remove/replace them within the authorized setup scope. No blanket deletion or approval transfer. Historical task plans remain references to their original provenance, not active derived-project authority. Keep generic `docs/templates/` untouched. An inherited source `ROADMAP.md` is **not** the derived project's history, maturity or plan: replace it with a fresh dated project overview if desired, or omit it altogether. ROADMAP is optional.
7. Configure actual GitHub branch protection/rulesets and required checks as supported by the account/repository plan. Inspect remote rights; installing hooks is optional and does not replace platform enforcement.
8. Run the available Lite Checks and a fresh-session recovery check from the new checkout. Confirm no inherited source projects, source Owner/Critic approvals, source ROADMAP statuses, old PRs/branches or source-project IDs are treated as **active** authority in the new project's Brief, Map, Spec/P/W, operational memory and task handoffs. Absence of a downstream `ROADMAP.md` is valid; CI's limited guard does not by itself prove semantic initialization.
9. Commit and open PR; Owner accepts initialization before normal implementation. After merge, new-agent session entry uses this repository's own committed memory.

No destructive bulk cleanup or magic initializer is implied. This procedure changes only the *new* repository through normal, explicitly approved Git operations.

## Source-repository exception

The real `oleyna80/agentic-sdlc-lite` repository is the template source and keeps its own valid PR/branch/milestone evidence. Creating a new repository from it is a different operation and **must not** copy the source project's active state unexamined.

## Checklist completion evidence

Record in the new repo's setup PR: actual repository identity, new `PROJECT_BRIEF.md`, reset memory, adopted/removed ADRs, installed/verified hooks if used, platform protection status, CI evidence and the next project task.
