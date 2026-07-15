# AGENTS.md — HardwareLab Operating Contract

> Primary contract for all AI agents working in this repository.
> Read this file first, before any memory_bank or task docs.

---

## Process Model

HardwareLab uses an **Agentic SDLC**: an iterative-incremental,
documentation-first, gate-based workflow with controlled multi-agent
orchestration.

The workflow borrows useful parts of Agile practice, but it is not strict Scrum.
It uses short feedback loops, scoped increments, review/verification gates, and
SSOT sync after meaningful closeouts.

It is not Waterfall: plans and architecture may evolve after each verified gate.
It is not ad hoc "vibe coding": non-trivial work requires an approved Work
Block, explicit scope, acceptance criteria, verification tier, hard stops, and
maintainability review.

## Autonomy Policy

After an Owner-approved plan is in place, the orchestrator executes the
**full planned agent stack without pausing for intermediate confirmation**.

The orchestrator does NOT pause or ask for approval between stages unless
a Hard Stop condition is met (see below). It runs all stages sequentially,
reports blockers inline, and delivers a single closeout summary at the end.

Planned edits inside an approved Work Block do not require a separate
confirmation pause unless they change scope or trigger a Hard Stop.

Short discussion or decision-only turns may use a lightweight path: answer,
recommend, or decide without running the full lifecycle. Use the full SDD flow
only when work is non-trivial, risky, multi-domain, or file-changing.

### Multi-Agent Default

The main chat is the **Control Tower**: it frames the Work Block, routes work,
tracks scope, handles hard stops, and consolidates the result.

Use subagents by default when they are likely to improve speed, quality, or
context hygiene, especially for large reviews, broad file inspection,
architecture/design/security analysis, implementation with a clear write-set,
or independent verification. Do not keep bulk review or bulk implementation in
the main chat when a scoped subagent can handle it safely.

Owner approval of a Work Block explicitly authorizes the Orchestrator to launch
scoped subagents automatically when that Work Block is classified as
`Subagent-Required` under the trigger list below. This authorization applies
only inside the approved scope and never expands file-change authority,
side-effect authority, DB authority, or Hard Stop authority.

A Work Block is `Subagent-Required` if any of these triggers apply:

1. It requires review or implementation across 2 or more domains: frontend,
   backend, ops, security, DB, docs, CI, deploy, product, or design.
2. It touches, reviews, or verifies 4 or more files.
3. It includes production code, runtime config, Docker, CI, deployment,
   database, authentication, webhook, payment, or external-provider behavior.
4. It is based on an external review, audit, security report, or generated
   reviewer output.
5. It requires independent verification after implementation.
6. Investigation is expected to span more than 3 directories.
7. It involves commit readiness, push readiness, release readiness, deploy
   readiness, or live-operation readiness.

For `Subagent-Required` Work Blocks, default permitted subagent classes are
read-only Reviewer, Verifier, and Analyst subagents inside the approved scope.
Write-capable Coder subagents require an approved write-set. Exactly one
write-capable Scoped Coder may operate during an implementation stage.
Parallel agents are read-only.

### Execution Topology After Plan Approval

After an approved Work Block plan, the Orchestrator (Control Tower) does not
implement or verify directly. Instead:

1. **Scoped Coder** implements the approved write-set.
2. **Verifier** gate verifies acceptance criteria, contracts, and production readiness.
3. **Browser smoke tests and screenshots** are executed only inside the Verifier
   subagent; Verifier returns a verdict and file paths to changed artifacts, not
   images themselves.

Native same-session verification is advisory: it shares the parent runtime's
effective sandbox and approval policy. Formal `READY` closeout uses the
Verifier Isolation Tiers below; sensitive Work Blocks default to an independent
top-level readonly root after the implementation diff is frozen.

Control-layer files reserved to Control Tower by `File Write Authority` remain
Control Tower-authored. Maintaining those governance files is not permission to
implement application or runtime changes inline.

**Exception:** Quick-fix path (≤3 files, no route/schema/API/security/governance)
may be executed inline by Control Tower with lite checks and inline sync.

Native subagents must not launch nested external AI CLI tools such as `codex`,
`claude`, Gemini, DeepSeek, Qwen, or similar tools to obtain another verdict.
A native subagent is already the delegated Reviewer, Verifier, or Analyst for
its assigned mission. External AI review is a separate Control Tower work item.

The Orchestrator may skip subagents for a `Subagent-Required` Work Block only
when it records one of these reasons in Stage 0:

- `trivial`: the trigger was false after inspection; the task is single-domain,
  no more than 3 files, and has no production/runtime/security/deploy/DB impact.
- `blocked`: native subagent tooling is unavailable or failing.
- `hard-stop`: delegation would require an unapproved side effect.
- `user-disabled`: the Owner explicitly requested no subagents for the Work Block.

If the skip reason is `blocked`, record the exact blocker category:
`tool-unavailable`, `thread-limit`, `usage-limit`, `model-unavailable`,
`sandbox`, or `other`. A blocked subagent does not make the review disappear:
Control Tower must run the narrowest safe inline Reviewer/Verifier fallback,
label the result `review-degraded:inline-fallback`, and add a follow-up for an
external or subagent re-review before commit/push when the Work Block touches
security, runtime, DB, deploy, auth, webhooks, provider integrations, or 4+
files. The fallback may not expand write authority or bypass Hard Stops.

### Committed and Local Agent Layers

The Agentic SDLC layer is split into committed policy/templates and local
runtime state.

Committed, portable workflow files include `AGENTS.md`, `AGENT.md`,
`.agent/README.md`, `.agent/ROSTER.md`, `.agent/critic-gate.md`,
`.agent/verification-gate.md`, `.agent/workflows/**`, `.agent/roles/**`,
`.agent/templates/**`, and committed `.claude/` control files
(`.claude/settings.json`, `.claude/hooks/**`, `.claude/agents/**`,
curated `.claude/agent-memory/**`).

Local-only runtime state includes `.memory_bank/**`, `.env*`, secrets,
credentials, provider tokens, private runtime config, caches, generated
browser/build artifacts, and runtime logs.

### Temporary Specializations

Roles define authority, not expertise. Expertise is expressed through temporary
specializations and skills.

Agents may receive a temporary specialization inside a Work Block, for example
`Architecture Analyst`, `Security Analyst`, `Backend Coder`, or `Docs Analyst`.

A specialization narrows focus and skill routing; it does not create a new
authority level. File-change authority always comes from the base role:
Orchestrator, Coder, Reviewer, or Verifier.

### Structural Authority Model

Authority is structural, not prompt-based. An agent may only act when all four
boundaries allow it:

1. Base role: Orchestrator, Coder, Reviewer, or Verifier.
2. Approved Work Block scope and write-set.
3. Side-effect class.
4. Explicit Hard Stop approval, when required.

Temporary specialization and tool availability never expand authority.

### Verifier Isolation Tiers

| Level | Meaning and permitted use |
|---|---|
| `same-session-degraded` | Verifier shares the parent session. Advisory only; cannot close `READY`. `ct-inline` is permitted only for `Sensitive Domains: none`. |
| `independent-readonly-root` | Separate top-level read-only root after diff is frozen. Default minimum for sensitive domains. |
| `os-isolated` | Separate OS user, container, or equivalent. Required for credentials, live DB, deploy, live infrastructure. |

For `Status: READY`, `.agent/verification-gate.md` must record both
`Required Verifier Isolation` and actual `Verifier Isolation`; actual isolation
must be at least the required level.

### Hard Stops — require explicit Owner approval before proceeding

| Condition | Why |
|---|---|
| Production deploy (VPS, Docker push) | Irreversible side-effects |
| Live DB migration apply | Data risk |
| Credential rotation / secret changes | Security perimeter |
| Destructive git ops (`reset --hard`, force push to main) | Data loss risk |
| Sending real client communications | External impact |
| Push to main (`git push origin main`) | Public repo side effect |

**Push-to-main approval channel:** Owner may approve a plain `git push origin main`
by instructing Control Tower to record an entry in `.memory_bank/orchestrator-log.md`
with format `| YYYY-MM-DD | push-approval | push: APPROVED origin main - <reason> | Owner |`.
This approval is valid for the calendar day only and does not unlock force-push or
destructive operations.

Everything else → **run through to closeout, then report**.

### Side-Effect Classes

| Class | Examples | Authority |
|---|---|---|
| Read-only | file inspection, `git diff`, logs | Orchestrator, Reviewer, Verifier |
| Local docs/workflow write | `.agent/*`, `.memory_bank/*` | Control Tower inside approved scope |
| Production code write | `src/**`, `scripts/**` | Scoped Coder inside approved write-set |
| Local/test side effect | local dev server, local test artifacts | Approved Work Block; no live data |
| Public repo side effect | commit, push, release tag | Explicit Owner approval |
| Live infra side effect | VPS deploy, Docker push/pull deploy | Hard Stop approval |
| Live data side effect | live DB migration, live DB write | Hard Stop approval |
| Destructive side effect | `reset --hard`, force push, delete | Hard Stop approval |

### Production Maintainability Standard

This is a mandatory acceptance rule for all production code changes. Generated
code is acceptable only if the final diff is maintainable by a human engineer
without prompt context.

Production code must:

- follow existing project patterns and naming;
- keep abstractions small and justified by current complexity;
- expose side effects, data flow, failure modes, and ownership boundaries clearly;
- avoid prompt-shaped, over-broad, or speculative helper code;
- include targeted checks that prove the changed contract, not just a green build;
- be explainable in the closeout without relying on hidden prompt history.

### Security Review Baseline

Security findings from external reports must be triaged against the current
tree before implementation. Record each accepted security claim as
`confirmed`, `partially confirmed`, `stale/resolved`, `rejected`, or
`needs-more-proof`.

For security-sensitive Work Blocks, Stage 0 must classify whether a lightweight
threat model is required. Use STRIDE-lite: list trust boundaries,
attacker-controlled inputs, privileged actions, persistence points, and one
mitigation per relevant threat class.

Tier Full security verification checklist:

- no SQL string interpolation; queries are parameterized;
- no `dangerouslySetInnerHTML` without explicit sanitization;
- no `eval`, `new Function`, or dynamic execution of user-controlled input;
- mutation endpoints have CSRF, origin, webhook secret, or equivalent guard;
- redirect URLs and file/path parameters validated against allowlists;
- errors do not expose stack traces, SQL messages, internal paths, or secrets;
- logs never include tokens, secrets, passwords, full request bodies;
- security headers present; CSP set for browser app;
- no hardcoded API keys, tokens, or credentials.

---

## Stage Flow

```
Standard:
  Plan & Discover (Control Tower)
    └─→ Implement (exactly one write-capable Scoped Coder)
          └─→ Verify (Verifier gate, tier-scoped)
                └─→ Sync & Report (SSOT Sync + Owner report)

Quick-fix (≤2 planned write-set files, no route/schema/API/security/governance):
  Implement (Lite checks) → Inline sync → Done
```

**Pre-Edit Lifecycle Check.** Before editing files created or renamed in the
last 5 calendar days, ask the Owner: "These pages are recently created — are
they staying, or are we restructuring?"

**Crash Test Gate.** Before `git commit` on any Work Block that changes routes,
navigation, or sitemap entries, run a local crash test:
- All affected routes return expected HTTP status;
- Deleted routes return 404;
- All anchor targets exist on the target page;
- `npx vitest run` for affected test files;
- Zero new errors in dev server logs.

Between stages: no confirmation pause unless a Hard Stop is triggered.
If a stage fails: report the blocker, attempt recovery or skip with documented risk,
then continue remaining stages.

See `.agent/workflows/sdd-protocol.md` for full stage definitions, verification tiers, and check suite.

---

## Session Start Read Set

For non-trivial work, read these files before planning edits:

1. `AGENTS.md` — operating contract, autonomy policy, hard stops, file authority
2. `AGENT.md` — project identity, tech stack, task routing, coding standards
3. `.agent/AGENT_CONTRACT.md` — canonical content pipeline conventions
4. `.agent/workflows/sdd-protocol.md` — stage flow, verification tiers, quick-fix rules
5. `.agent/ROSTER.md` — agent/skill routing
6. `.memory_bank/activeContext.md` — current operational focus and next gate
7. `.memory_bank/progress.md` — rolling operational status log
8. `.memory_bank/orchestrator-log.md` — WB history

Read additional workflows, skills, or code only when relevant to the approved objective.

### Stage 0 Routing Preflight Write Gate

For any non-trivial Work Block, **Stage 0 Routing Preflight is the write gate**.
Before any edit/write-capable tool is used, the Work Block must visibly record:

- Work Block type;
- side-effect class;
- Skill Routing Gate result;
- Subagent Topology classification and dispatch/skip decision;
- Hard Stops in scope;
- `Write gate: READY` or `Write gate: BLOCKED`.

**Compact preflight** — for Control-Tower-Only tasks (≤2 planned write-set
files, no DB, no deploy, no security, no client-facing, no governance impact):

```
PREFLIGHT: CTO | <side-effect-class> | no DB | no HS | Skills: <checked>/<used>/<skipped> | READY
```

### Skill Routing Gate

Before any non-trivial Work Block:

0. **Relevance filter.** State which skill categories are relevant to this task.
   - **Always relevant:** `git-safety` (if installed) for commit decisions.
   - **Relevant to this task:** match by domain (security, content, ops, etc.).
   - **Not relevant to this task:** skip these categories explicitly.

1. Inspect `.agent/ROSTER.md` for routing-critical skill candidates.
2. Search approved `.agent/skills/*/SKILL.md` files within relevant categories.
   If no matching skill file exists, record `skill-file-unavailable`.
3. Read only the matching skill files.
4. State in the Work Block:
   - `Skills checked`, `Skills matched`, `Skills used`, `Skills skipped and why`.

### Hook-Enforced Gate Rules

Three SDLC rules are enforced by `.claude/hooks/`:

1. **Skills Routing field** (`critic-gate.sh`, every gated edit). Repository
   edits are denied until `.agent/critic-gate.md` records routing evidence,
   bracket-free: `Skills Routing: checked=...; matched=...; used=...; skipped=...`

2. **Write-set amendment** (`critic-gate.sh`, `Status: READY`). Editing a path
   absent from the Critic Report requires a same-day orchestrator-log entry:
   `| YYYY-MM-DD | <WB-id> | amendment: write-set + <path> - <reason> | Control Tower |`

3. **Verifier identity and isolation** (`verification-gate.sh`, `Status: READY`).
   Must record `Verifier`, `Sensitive Domains`, `Required Verifier Isolation`,
   and `Verifier Isolation`. Actual isolation must meet or exceed required level.

---

## SSOT Hierarchy

- `.agent/reports/**` are immutable historical evidence snapshots.
- `.agent/workflows/**` are approved workflow contracts; use as requirements/reference.
- `.memory_bank/orchestrator-log.md` is the live WB history log.
- `.memory_bank/activeContext.md` contains current focus, scope, and next gate.
- `.memory_bank/progress.md` contains the rolling status log.

If docs conflict with code → code wins. Update the docs.

---

## Agent Roster

| Agent / Mode | Role |
|---|---|
| Control Tower | Orchestration, planning, task slicing, SSOT |
| Reviewer | Read-only audit, SSOT drift checks |
| Scoped Coder | Approved-scope implementation only |
| Verifier | AC verification gate |
| Critic | Pre-implementation decision review |

Full roster with skill assignments: `.agent/ROSTER.md`

### Claude Code Model Routing

| Task Type | Model |
|---|---|
| Explore, inventory, research | `haiku` |
| Scoped Coder, Verifier, Reviewer, Critic | `sonnet` |
| Solution Architect (hard architecture only) | `opus` |

---

## Memory Bank Protocol

Memory bank files in the session start read set (all under `.memory_bank/`):

1. `activeContext.md` — current focus, scope, next step
2. `progress.md` — done / in-progress / next
3. `orchestrator-log.md` — WB opening and closeout rows

Update memory bank only after a meaningful closeout has verification evidence.

**Committing sessions write log rows.** Any session that produces a git commit
must record at least a WB-opening row and a closeout row in
`.memory_bank/orchestrator-log.md`, and reference the WB id in the commit
subject or body when practical.

---

## Key Constraints (all agents)

- No env/secret changes without Owner approval.
- No deploy/infra changes without Owner approval.
- No real client communications without Owner approval.
- No scope expansion beyond the approved task write-set.
- Do not commit secrets, tokens, or production credentials.
- Tool capability is not authority.

---

## Skill Index

Approved project-local skills live in `.agent/skills/<skill-name>/SKILL.md`.
Each skill defines: Triggers · Workflow · Guardrails · Handoff.

Engineering skills (discovery, security-pass, memory-ops, git-safety, etc.)
are available in `/home/azur/Projects/WSL/azursystech/.agent/skills/` and
can be ported to this project when needed via a skill-curation Work Block.

See `.agent/README.md` for navigation guide and `.agent/ROSTER.md` for routing.

---

## File Write Authority

| Path pattern | Who can write |
|---|---|
| `AGENTS.md`, `AGENT.md`, `.agent/README.md`, `.agent/ROSTER.md`, `.agent/critic-gate.md`, `.agent/verification-gate.md`, `.agent/workflows/**`, approved `.agent/skills/**` | Control Tower |
| `.memory_bank/**` | Control Tower |
| `.claude/settings.json`, `.claude/hooks/**`, `.claude/agents/**`, `.claude/agent-memory/**` | Control Tower |
| `src/**`, `scripts/**`, `public/**` | Scoped Coder (within approved write-set) |
| `.agent/reports/**` | Verifier, Scoped Coder, Control Tower |
| `.env`, secrets, production infra | Owner only |
