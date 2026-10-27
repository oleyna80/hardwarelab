# Agent Operating Contract — SDLC Lite

**One root contract.** Other documents, role briefs, templates, memory, reports and Skills do not grant permissions or create a competing lifecycle. Actual OS/sandbox/platform/security controls remain binding.

## Source precedence

1. Current explicit Owner instructions, actual permissions and applicable security boundaries.
2. This root `AGENTS.md` (shared behavior).
3. Approved, **task-bound** project specification and plan P (exact Git subjects), actionable stage W, task requirements and Owner decisions within those boundaries; adopted ADRs in `docs/decisions/`. Paths and matching hashes alone are not approval.
4. Canonical procedures: `docs/workflow/development.md` (the **only** lifecycle), `docs/workflow/memory.md`, `docs/workflow/initialization.md`, `docs/workflow/workspaces.md` and `docs/security/boundaries.md`.
5. Subordinate `.agents/roles/`, templates and optional Skills (techniques, not authority).
6. `memory_bank/`, task handoffs, reports and local caches (observations; verify against Git).

Resolve ambiguity or incompatible requirements before the affected action; do not invent approval or let task notes override security controls.

## Session entry / recovery

1. Read `PROJECT_BRIEF.md`, `PROJECT_MAP.md` and applicable parent instructions. Verify actual repository identity, absolute worktree, branch, HEAD, tracked/staged/untracked state and authorized target.
2. For a derived repository, follow `docs/workflow/initialization.md` before feature work; source-template memory is not the derived project's authority.
3. Read last-integrated `memory_bank/context.md` and `progress.md`; locate the **current task's** branch-local handoff/PR/issue and verify its facts against Git. Another branch's unmerged memory is not current authority.
4. For **new significant work**, identify the authorized task first; resolve its repository-scoped stable project ID and `docs/projects/<project-id>/spec.md` (accepted exact requirements/design), `docs/projects/<project-id>/plan.md` (independently reviewed frozen P) and `docs/changes/<task-id>/work-block.md` (exact W), with their original commit/path/blob subjects and distinct Owner/Project/Stage Critic evidence. Validate W → P → accepted Spec → authenticated initiative intent/Owner request before execution. **No fallback** to the latest P, a folder scan, `main:plan.md`, a matching filename or ROADMAP; ambiguity/missing evidence → STOP. For routine work explain NOT_APPLICABLE as needed. Historical approved root `plan.md` and legacy per-task plans remain bound only to their original exact subjects.
5. Restore objective, constraints, dependencies, write-set, required tests, actual privileges and next action. After resume/compaction or a target/ref change repeat affected preflight **before any write**; do not trust inherited cwd, scratch or an agent summary as authoritative.

## Operating rules

- Classify **routine vs significant by risk/impact**, not by code versus Markdown. A tiny reversible safe code fix may be routine; normative policy/security changes may be significant. The route and gates are specified **only** in `docs/workflow/development.md`.
- **Engineering judgment and review proportionality:** Address the assigned technical question first. Prefer the simplest sufficient solution for actual requirements, scale, and credible risk; evaluate relevant alternatives, instruction conflicts, duplication, complexity, and total engineering cost (including agent time and review effort). Challenge Owner-proposed technical choices when evidence supports a better approach; explain trade-offs and propose the change for Owner disposition rather than silently expanding scope. Distinguish concrete blockers and material risks from optional improvements, and match review depth to the task's purpose and phase. Do not substitute repetitive approval/provenance checks for technical analysis when those checks are already satisfied; assess the feasibility of future tests during design review without claiming they have run or treating their absence as a failed implementation. Preserve existing lifecycle, required assurance, real security boundaries, and Owner decisions.
- **Significant project:** Owner accepts exact project-local requirements/design `spec.md` (initiative `intent.md` optional when an authenticated request/Issue revision suffices); Orchestrator/Architect prepares committed project-local `plan.md` P; independent **Project Critic READY precedes Owner approval of exact P**. Approved Spec/P remain frozen exact revisions; statuses/decisions/verdicts live elsewhere. Project ID: stable repository-scoped lowercase ASCII kebab-case, unique and not reused.
- **Autonomous stage:** within approved P, Orchestrator commits actionable W and verifies conformance; independent **Stage Critic READY on exact W** precedes Coder. No new Owner approval per conforming W. Stage READY alone does not grant OS/tool permissions. Scope changes outside P require Owner.
- Coder implements within the approved write-set; independent Reviewer READY and Verifier PASS must bind the same exact source candidate S. Subsequent evidence-only delivery HEAD H requires checked S..H diff and applicable CI at H. No invented PASS, READY or merge status.
- Keep `main` unchanged without separate Owner GO. Covered task commits, non-force push, CI, ordinary REWORK and bounded engineering decisions can be autonomous under approved P and actual permissions. Final acceptance/merge, deployment, privileged/sensitive external actions and material exceptions remain Owner-controlled.
- Before filesystem mutation confirm the actual destination, current repository/worktree scope and unrelated dirty/untracked state. For Git mutations use `git -C <verified-absolute-worktree>`; it is **not isolation**. One writer per overlapping paths; preserve other worktrees.
- Run targeted checks with truthful tracked/untracked/cached content coverage; inspect full diff. Prevent secrets or credentials from entering evidence. Never bypass hooks, force-push, delete unrelated work or expand scope without authority.
- Keep durable task checkpoints and separate independent reports in Git. `PROJECT_BRIEF.md` is enduring product intent; optional `ROADMAP.md` is a dated non-authoritative journey (origins/current position/direction), **never** an execution grant. `memory_bank/` describes last integrated work, **not** live parallel task state. Chat, scratch and agent-local MEMORY are lookup hints only.

## End-of-task / handoff

Use the conditional checkpoint matrix in `docs/workflow/memory.md`. Record exact observed Git SHA, task, scope, verified checks, blockers and next action where required. Working `DELIVERY_READY`, task `COMPLETE/BLOCKED/CANCELLED`, roadmap-stage acceptance, PR merge and deployment are **different facts**; preserve their evidence separately. Only separately authorized integration reconciles shared memory.

**No Controller:** Lite has no admission service, SQLite registry, dispatcher, runtime privilege gate, skill installer or automatic merger.
