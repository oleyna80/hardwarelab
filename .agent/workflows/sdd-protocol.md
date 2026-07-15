# SDLC Protocol — Stage Definitions

> Defines the 4-stage pipeline: Plan & Discover, Implement, Verify, Sync & Report.
> Referenced by AGENTS.md § Stage Flow.

---

## Workflow Mapping

| Project workflow | SDD stage |
|---|---|
| Plan / Spec | Stage 0: Plan & Discover |
| Implementation | Stage 1: Implement |
| Review / Verification | Stage 2: Verify |
| Closeout / SSOT Sync / Owner report | Stage 3: Sync & Report |

`.agent/critic-gate.md` and `.agent/verification-gate.md` are evidence
contracts. A runtime may enforce them with hooks, but the policy is valid even
when no mechanical hook script is installed.

## Stage State Machine

```
blocked → ready → in_progress → completed
  ↑                      ↓
  └──────── retry ───────┘
```

States:
- **blocked** — dependency not met, Hard Stop triggered, or Owner approval needed
- **ready** — dependencies cleared, write gate open, ready to execute
- **in_progress** — currently executing
- **completed** — required stage work and evidence are complete; this does not
  imply that verification passed

Track these fields separately:

- **Stage execution state:** `blocked | ready | in_progress | completed`
- **Verification verdict:** `READY | BLOCKED | UNVERIFIED`
- **Stage 3 mode:** `success-closeout | reporting-only`

Only `READY` permits `success-closeout`. `BLOCKED` or `UNVERIFIED` permits
Stage 3 reporting work only.

---

## Stage 0: Plan & Discover

**Owner:** Control Tower
**Write authority:** `.agent/README.md`, `.agent/ROSTER.md`,
`.agent/critic-gate.md`, `.agent/verification-gate.md`,
`.agent/workflows/**`, approved `.agent/skills/**`, `.memory_bank/**`

### Entry Conditions
- Work Block framed by Owner or Control Tower
- Session Start Read Set loaded

### Activities
1. **Parallel Decomposition Matrix** — classify: domains, files, side-effect class, DB mode, hard stops, verification tier
2. **Skill Routing Gate** — check `.agent/ROSTER.md`, match approved or local skill files when present, record decisions
3. **Subagent Topology** — classify `Subagent-Required` triggers, plan dispatch
4. **Preflight** — output Stage 0 Preflight block: skills, subagent topology, side-effect class, hard stops, write gate status
5. **Research** — if needed, launch `solution-architect` for pre-implementation analysis
6. **Critic Review** — launch `critic` agent to independently review Control Tower decisions
7. **Plan Approval** — produce plan, get Owner approval if non-trivial

### Stage 0 Trigger Tables

| Critic required when any condition matches | Skip rule |
|---|---|
| 3+ planned implementation files | Owner approval required to skip |
| Side-effect class is production code write or higher | Owner approval required to skip |
| New subagent topology | Owner approval required to skip |
| 2+ matched skills are skipped | Owner approval required to skip |
| Security, auth, payments, DB, deploy, or external provider work | Owner approval required to skip |

### Exit Conditions
- Write gate: `READY`
- Critic verdict: APPROVE or SUPPLEMENT (if RECONSIDER — re-run Stage 0 with corrections)
- `.agent/critic-gate.md` records evidence-backed critic status before source edits
- Plan approved (for non-trivial work)

---

## Stage 1: Implement

**Owner:** Scoped Coder (one per write-set)
**Write authority:** Approved write-set only (see File Write Authority in AGENTS.md)

### Entry Conditions
- Write gate: `READY`
- Approved plan or task description
- Approved write-set
- Side-effect class classified

### Activities
1. Read plan, task description, AC, relevant code
2. Implement changes within approved write-set
3. Run Pre-Edit Lifecycle Check for recently created files
4. Self-check: scope not expanded, no secret leakage, no Hard Stop triggered
5. Report: `DONE` / `DONE_WITH_CONCERNS` / `NEEDS_CONTEXT` / `BLOCKED`

### Exit Conditions
- All planned changes implemented
- No scope creep
- Report filed with change summary

---

## Stage 2: Verify

**Owner:** Verifier (read-only)
**Write authority:** `.agent/reports/*` (verification artifacts only)

### Entry Conditions
- Implementation complete (Stage 1 DONE)
- Verification tier specified (lite/standard/full)

### Verifier Isolation Decision Table

| Condition | Required Verifier Isolation | Formal closeout mode |
|---|---|---|
| Quick-fix / non-sensitive, Lite | `same-session-degraded` | `ct-inline` allowed with `Sensitive Domains: none` |
| Non-sensitive Standard work | `same-session-degraded` or higher | `ct-inline` only at same-session |
| Auth, security, hooks, runtime/config | `independent-readonly-root` | Separate top-level readonly root |
| Credentials, live DB, deploy, live infra | `os-isolated` | Separate OS user/container |

### Activities

#### Lite Tier
- [ ] Changed files match task description
- [ ] No obvious regressions
- [ ] Types pass (`npx astro check`)
- [ ] Build succeeds (`npm run build`)
- [ ] Tests pass (`npm run test:affiliate`)

#### Standard Tier (extends Lite)
- [ ] Route contract: URLs return expected status codes
- [ ] Schema contract: field keys, types match spec
- [ ] Anchor targets exist
- [ ] No new dev server errors
- [ ] Security baseline: no secrets, injections; affiliate links have `rel="nofollow sponsored"`
- [ ] Production Maintainability Standard met

#### Full Tier (extends Standard)
- [ ] STRIDE-lite threat model verified
- [ ] Security review checklist complete (`AGENTS.md § Security Review Baseline`)
- [ ] `npm audit --omit=dev --audit-level=high` clean
- [ ] Runtime proof via `curl -fsSI`
- [ ] CSP/security headers verified
- [ ] CSRF/origin guard for API mutation endpoints
- [ ] Affiliate pre-publish gate: `.agent/workflows/prepublish-affiliate-gate.md`

### Exit Conditions
- Verdict: `READY`, `BLOCKED`, or `UNVERIFIED`
- All blockers documented with file:line evidence
- Verification report written to `.agent/reports/`
- `.agent/verification-gate.md` records verifier status, required isolation, actual isolation

---

## Merge Protocol (Parallel Agents Only)

**Owner:** Control Tower

> Runs between Stage 2 and Stage 3 when 2+ subagents were dispatched in parallel.
> Skip for single-agent or sequential Work Blocks.

### Activities
1. Gather all subagent reports from `.agent/reports/`
2. Deduplicate: group findings by `file:line`
3. Detect conflicts: READY vs ISSUES → ISSUES wins; ISSUES vs BLOCKED → BLOCKED wins
4. Classify: P0 (must fix) / P1 (should fix) / P2 (might fix) / Accepted
5. Write consolidation report to `.agent/reports/`
6. Update `.memory_bank/orchestrator-log.md`

---

## Stage 3: Sync & Report

**Owner:** Control Tower
**Write authority:** `.agent/reports/*`, `.memory_bank/*`

### Entry Conditions
- Verification evidence complete with verdict `READY`, `BLOCKED`, or `UNVERIFIED`

### Activities
1. **Classify closeout** — `success-closeout` only for `READY`; otherwise `reporting-only`
2. **SSOT Sync** — update `.memory_bank/activeContext.md` and `progress.md`
3. **Crash Test Gate** — if routes changed: run local crash test
4. **Closeout Report** — what was done, verification result, risks accepted, follow-ups
5. **Owner Report** — present closeout summary

### Exit Conditions
- Memory bank updated
- Closeout report written
- Owner notified

---

## Quick-Fix Path

Skip Stages 0, 2, 3 only for trivial changes: at most 2 planned write-set
files, no logic, route, schema, API, security, or governance impact.
Flow: Implement (Lite self-check) → Inline sync → Done.
Still applies: Hard Stops, no scope expansion, affiliate links compliant.

For quick-fix: set `Status: SKIPPED` and `Quick-Fix: true` in both gate files,
add log entries to `.memory_bank/orchestrator-log.md`.
