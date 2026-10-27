# Project Memory Protocol — Canonical Domain Procedure

The committed repository, approved task documents, Git and GitHub evidence preserve engineering work across agent sessions. **Chat history, agent local caches and ignored workspaces are not project memory.** Memory files are informative, not authority or proof of current Git state.

## One home for each kind of knowledge

| Information | Canonical home | Other references |
| --- | --- | --- |
| Product intent, audience, boundaries | `PROJECT_BRIEF.md` | Enduring why/product identity; not per-feature implementation authority |
| Agent behavior and source precedence | `AGENTS.md` | Adapters never redefine it |
| Development, Git and security procedure | `docs/workflow/`, `docs/security/` | Templates/roles link; no parallel protocols |
| Actual behavior and tests | Current source/test tree | Evidence is verified against Git |
| Human product journey / maturity / intended direction | Optional `ROADMAP.md` | Dated, verified major milestones and proposed next goals; **no approval or current task authority** |
| Initiative intent / approved requirements + design | `docs/projects/<project-id>/spec.md` and optional `intent.md` | Exact accepted Spec revision + Owner request/Issue provenance; intent file is optional |
| Stage contract W / historical legacy plan | `docs/changes/<task-id>/work-block.md` or legacy task plan | Exact reviewed W, independent Stage Critic and approved parent P; historical legacy provenance retained |
| Durable design rationale | `docs/decisions/<id>.md` | `memory_bank/decisions.md` contains links/status only |
| **Approved project contract P** | `docs/projects/<project-id>/plan.md` + separate exact Project Critic/Owner evidence | Frozen project execution strategy; historical root `plan.md` remains original legacy evidence only |
| **Per-task live handoff** (especially parallel branches) | `docs/changes/<task>/handoff.md` on the task branch | Store phases, Critic/Reviewer/Verifier SHAs, PR and next action outside frozen WB |
| **Integrated project overview** | `memory_bank/context.md` | Summary of last reconciled common baseline, not the only active task |
| Recent integrated milestones | `memory_bank/progress.md` | Link task reports/commits; no copied reports |
| Material integrated coordination events | `memory_bank/orchestrator-log.md` | Short audit index, not raw agent logs |
| Final merge/CI state | Live Git/GitHub refs/checks | Memory cites dated exact evidence, never overrides it |

The four root `memory_bank/*.md` files are Git-tracked. Do not ignore `memory_bank/`. Do not commit secrets, private client data, tool dumps, raw transcripts, internal scratchpads or local credentials. Other branches do not automatically receive memory updates until integration.

## 0. First use after creating a new repository

**Before trusting inherited memory or starting feature work**, confirm the actual Git repository identity against `PROJECT_BRIEF.md`. If this is a new project created from the Lite template, follow **`docs/workflow/initialization.md`** first. A new project's inherited Lite branch names, PR numbers, milestones and ADRs are template-source history, not current project facts. Treat the project as uninitialized until the first-use checklist is committed.

## 1. Session start and recovery

1. Read `AGENTS.md`, project brief/map, and the *last integrated* `memory_bank/context.md` and `progress.md`.
2. Inspect the actual repository, branch, HEAD, worktree status and relevant remote PRs. Resolve discrepancies by checking current Git/PR facts before using a stale memory instruction.
3. For new significant work, identify authorized **task ID first** and its branch-local exact W/handoff, then verify repository identity, stable unique project ID, exact project-local P commit/path/blob, original Project Critic READY and separate Owner exact-P approval, exact accepted project-local Spec commit/path/blob and Owner acceptance, authenticated intent/request provenance, W conformance and independent Stage Critic READY. Neither `ROADMAP.md`, most recent `plan.md`, historical root P nor an adjacent project may substitute for a missing binding. Ambiguity/mismatch → STOP before affected writes. For routine work explain optional gates NOT_APPLICABLE; preserve accepted legacy task-plan provenance. Never edit frozen Spec/P/W for status.
4. For the default branch, identify unfinished work from active PRs and task records; the shared context is **not** a complete authoritative registry of unmerged branches.
5. Consult linked accepted decisions and relevant reports only as needed.

## 2. Parallel tasks — shared memory ownership

- Each concurrent task owns its unique `docs/changes/<task>/handoff.md` (or an issue/PR description for a trivial task with no long-lived handoff). Do not store competing "current active task" claims in the shared `memory_bank/context.md`.
- The shared `memory_bank/context.md`, `progress.md`, and `orchestrator-log.md` describe the **last reconciled integrated baseline**. Only the designated integration/coordinator change updates them; parallel feature branches must **not** edit these shared files.
- A single-task project may update shared memory on its task branch **only when** there is no overlapping writer and the update is part of that task's reviewable PR. Otherwise keep task-specific changes local.
- Before integrating a task branch, inspect current `main`, merged/unmerged PRs and **all affected task handoffs**. Preserve any unfinished task in its own file or PR; never resolve a context merge conflict by selecting a single task and silently losing another.
- If two task branches changed the same shared memory files, **stop and reconcile explicitly** in a bounded integration PR. Update the integrated summary from live Git/PR evidence, retain independent handoffs and show the Owner the resolution.
- Concurrent agents cannot treat a per-branch commit as globally visible project memory. A fresh session in another branch must discover ongoing work through GitHub PRs, agreed handoff paths, or direct coordination.

## 3. Canonical conditional checkpoint matrix

| Situation | Minimum checkpoint |
| --- | --- |
| **Short routine**, uninterrupted, no parallel task/handoff | Adequate existing task PR/issue containing objective/scope, branch/base/exact candidate, changes/checks, gate N/A rationale, risks and next action; **no separate handoff file required** |
| Routine interrupted before PR, long/multi-session, blocked or delegated | Own `docs/changes/<task>/handoff.md` plus safe authorized **Git-committed** checkpoint; future PR cannot replace it |
| **Significant** or **parallel** task | Own **committed** branch-local `docs/changes/<task>/handoff.md` linking exact P/W and independent results; shared memory is not task state |

The checkpoint states objective, classification, scope/permissions, exact branch/base, **observed predecessor HEAD** (not a self-referential future commit), dirty/untracked files, verified tests/role verdicts, blockers and concrete next action. Record a subsequently observed SHA in later evidence. Chat, agent-local `MEMORY.md`, `/tmp` scratch, compacted messages and uncommitted drafts are **lookup hints**, not project authority or a completed durable checkpoint.

**Resume/compaction:** before the next write, independently restore objective, applicable instructions, verified absolute target, branch/HEAD/status, authorized scope, all dirty/untracked paths, task checkpoint and next action; apply `docs/workflow/workspaces.md`. Never assume prior cwd/tool state/temp path survived. If reconstruction is uncertain, say STOP/NOT_VERIFIED; a synthetic replay does not prove native compaction.

If commit/publication is not allowed, preserve safe local work and explicitly report `NOT_COMMITTED` and missing authority; never secretly stage/push or invent recovery PASS. Sudden process failure may prevent checkpoint, which the next session must detect from actual Git state.

Each parallel task owns its own handoff. Only a designated authorized integration writer reconciles shared memory from live merged Git/PR evidence, retaining all active task records; no direct `main` changes. Independent report originals remain reachable by Git commit/blob; explicitly authorized cosmetic presentation changes require exact original/new mapping and cannot alter verdicts. Project Critic READY, Owner P approval, Stage Critic READY and source S assurance are separate claims.

## 4. Keep memory usable

- `context.md`: **short integrated overview**, last reconciliation commit/date, links to open work; not a universal mutable singleton for every task.
- `progress.md`: approximately 15 recent **integrated** milestones, with links to older task/Git evidence.
- `decisions.md`: index of approved decisions, not duplicate decision text.
- `orchestrator-log.md`: short material event index, not tool trace. Never record secrets.
- `docs/projects/<project-id>/plan.md` for new significant projects: approved frozen P; operating status lives in task handoffs/reports. Historical root `plan.md` remains an exact legacy object, not a default or mutable roadmap.
- `ROADMAP.md` (optional in downstream projects): one designated documentation/integration writer updates the human journey only on meaningful integrated milestones or Owner product-direction changes. Each achieved claim is dated and links verified Git/PR evidence; future directions are explicitly proposed. A stale snapshot never authorizes work or overrides live Git.
- Product Brief is enduring intent, unlike ROADMAP (dated navigation), shared integrated memory (brief last reconciled factual baseline), Spec (approved requirements/design), P (execution contract) or task handoff (branch-local state).
- Frozen `work-block.md`: accepted stage contract. A legacy task `plan.md` retains its own original Critic review binding and must not be silently migrated.
- Task-local `handoff.md`: recoverable working phase (including optional DELIVERY_READY), exact frozen WB and candidate SHA, separate gate links, PR disposition and next action on a particular branch.
- When a decision is superseded, retain the old ADR with status/provenance and link the new one.
- Check `git ls-files`, `git status`, actual HEAD, active PRs and Git history when claiming an item is committed or available to other agents.

## 5. Fresh-session success criterion

Without any chat history, a new agent should be able to discover the project objective, the canonical rules, accepted decisions, the **specific task branch's** scope/handoff, the most recent verified checks, current blocking conditions and the next action. When evidence is missing or ambiguous, report that instead of inventing status or authority.
