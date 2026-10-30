# Work Block W — <task-id>: <actionable stage>

> Template only. Mandatory for **new significant stages** under an Owner-approved exact project-local P; not required for routine low-risk work. W is a bounded stage execution contract, not a second lifecycle or actual OS/platform permission.

## Identity, authority and parent conformance

- **Task ID / observable end state / actual repository and authorized branch/worktree:**
- **Stable project ID** (`[a-z0-9]+(-[a-z0-9]+)*`, unique repository-scoped):
- **Exact reviewed parent P:** `docs/projects/<project-id>/plan.md`, P source commit/path/Git blob, original formal Project Critic READY reference and separate Owner exact-P approval evidence
- **Exact Owner-accepted Spec:** `docs/projects/<project-id>/spec.md`, accepted commit/path/Git blob and attributable Owner acceptance
- **Initiative intent provenance:** optional intent document revision **or** authenticated Owner request/Issue revision (not ROADMAP)
- **Actual entry/dependencies:** reviewed P approval, accepted scope, current base/HEAD, conflicting writers, platform permissions and relevant ADRs
- **Explicit W → P/Spec conformance proof:** obligations within approved scope, risks and technical boundaries

## Finite stage scope and acceptance

- **Exact source write paths:** <no wildcards; immutable scope after Stage READY>
- **Exact stage evidence/report paths with author/executor → single Git recorder:** <each path mapped; independent originals retained>
- **Out of scope / legacy contracts and source objects preserved:**
- **Outputs, prerequisites, risks and feasible rollback:**
- **AC-1:** <observable behavior + actual evidence>
- **AC-2:** <observable behavior + actual evidence>
- **Positive/negative tests and native/CI capabilities:** <exact expected records and STOP-before-write checks>

## Authority and STOP

- **Bounded engineering decisions within approved Spec/P/W:**
- **Material Spec/P, security or scope change:** STOP → affected Owner/Project Critic gates
- **W-only correction within unchanged P:** new W/new independent Stage Critic; **no** Owner-per-W gate
- **Wrong/foreign repository, project ID, P/Spec commit/path/blob or approval subject; stale checkpoint; copied records:** STOP, no root/latest/roadmap fallback
- **No hook bypass, forced ref changes, direct main mutation or credential disclosure; actual OS/GitHub rights verified before editing.**

## Independent agents and delivery

- **Orchestrator:** bind exact task/P/Spec, commit W, commission independent Stage Critic, assign single writers and maintain separate handoff/evidence.
- **Stage Critic:** genuine independent READY/REWORK/BLOCKED for exact committed W. Report is separate, never self-approved.
- **Coder:** write only exact authorized source paths after Stage READY; commit source candidate S and actual test results.
- **Reviewer / Verifier:** independent same-S evidence; missing checks are BLOCKED, not guessed PASS.
- **Delivery:** evidence-only S..H inventory, current-head CI H and separate Owner final merge GO; project memory updated only in separately approved integration.

## Frozen review boundary

Commit complete W before independent Stage Critic. W contains **no own future SHA, status updates, verdict or later Owner approval**; these remain in separately committed records. Changed W → new exact commit and fresh independent Stage Critic; preserve previous W/reviews. Role names, Skills, ROADMAP and copied hashes never convey new authorization.
