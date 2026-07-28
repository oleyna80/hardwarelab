# Work Block WB-009: Localized Category Routes Pilot

## Control

- **Pilot tracking ID:** `WB-009`
- **Canonical machine ID:** `WB-2026-07-28-localized-category-routes-pilot`
- **Status:** `SUCCESS` — the lockfile repair restored ordinary `npm ci`; two
  Owner-approved, narrow CI-compatibility repairs then restored the actual
  Agent Guards path. Exact-head GitHub checks are green on `90f92ccc`.
- **Owner approval:** 2026-07-28; scope is one SDLC adaptation and one route feature.
- **Baseline:** `main` at `e61ab9342e08` (2026-07-28T08:56:15Z).
- **Upstream under test:** `oleyna80/agentic-sdlc-framework` at immutable SHA
  `c604f8d2085ca3469de54a525880e3f11eba0fa7`; its installer will not run.
- **Feature specification:**
  [`WB-2026-07-28-localized-category-routes-pilot-spec.md`](../specs/WB-2026-07-28-localized-category-routes-pilot-spec.md)
- **Evaluation plan:**
  [`WB-2026-07-28-localized-category-routes-pilot-plan.json`](../evals/WB-2026-07-28-localized-category-routes-pilot-plan.json)
- **Import manifest:**
  [`WB-2026-07-28-localized-category-routes-pilot-import-manifest.md`](WB-2026-07-28-localized-category-routes-pilot-import-manifest.md)
- **Compatibility matrix:**
  [`WB-2026-07-28-localized-category-routes-pilot-compatibility-matrix.md`](WB-2026-07-28-localized-category-routes-pilot-compatibility-matrix.md)
- **WB-008 provenance matrix:**
  [`WB-2026-07-28-localized-category-routes-pilot-framework-provenance-matrix.md`](../reports/work-blocks/WB-2026-07-28-localized-category-routes-pilot-framework-provenance-matrix.md)
- **Lockfile repair child Work Block:**
  [`WB-2026-07-28-localized-category-routes-lockfile-repair.md`](WB-2026-07-28-localized-category-routes-lockfile-repair.md)
- **Final skill-index compatibility child Work Block:**
  [`WB-2026-07-28-localized-category-routes-skill-index-linter-repair.md`](WB-2026-07-28-localized-category-routes-skill-index-linter-repair.md)
- **Live hook proof:**
  [`WB-2026-07-28-localized-category-routes-pilot-codex-live-hook-proof.md`](../reports/work-blocks/WB-2026-07-28-localized-category-routes-pilot-codex-live-hook-proof.md)

## Objective and success criteria

Adapt the exact upstream `multi-runtime` profile to HardwareLab, then deliver
localized category-detail routes for `fr`, `de`, and `ru`. The feature is the
primary outcome. The pilot evaluates whether the updated process produces a
consistent specification, role separation, useful review, active hard stops,
reproducible verification, current closeout artifacts, and acceptable overhead.
Its decisive comparative question is not merely whether agents create the
function, but whether the framework creates it with fewer conflicts, less
rework, less manual context recovery, and fewer non-substantive review cycles.

The final closeout must select exactly one conclusion: **Framework works**,
**useful but heavy**, or **impedes development**. There is one main change scope,
no more than two correction rounds, and no commit, push, deployment, dependency,
or external-content change is authorized.

## Pilot limits and Owner decision boundary

```yaml
pilot_limits:
  maximum_correction_rounds: 2
  maximum_review_rounds: 2
  maximum_active_workers: 3
  scope_expansion_requires_owner: true
  optional_hardening_deferred: true
```

When a limit is reached, the Orchestrator does not begin another correction
cycle. It records the remaining defect or risk and asks the Owner to choose one
of: accept the residual risk, create a separate Work Block, revise the
specification, or stop the pilot. Limits count both completed and abandoned
correction/review attempts; a correction that changes no final artifact is
still churn, not a free retry.

**Owner exception, 2026-07-28:** after the initial two correction rounds, the
Owner approved one documentation-only integrity correction to freeze the
evaluation subject revision. It is counted as governance churn and must be
included in closeout; it does not authorize product-source changes or another
feature correction cycle.

## Scope and boundaries

### In scope

- Manually adapt the upstream `multi-runtime` profile: orchestration controls,
  selected skills, Codex and Claude adapters, disabled OpenCode/MCP adapter
  stubs, policy scripts, and validators. Preserve upstream provenance.
- Resolve the local control hierarchy: an adapted root `AGENTS.md` becomes
  current; existing `AGENT.md` and `.agent/AGENT_CONTRACT.md` are retained as
  subordinate historical/project guidance; `memory_bank/` is canonical and
  `.memory_bank/` historical.
- Merge `.claude/settings.json` rather than blind replace: new role/hook wiring
  is authoritative, an equivalent secret-scan remains a local extension, and
  old gates/extra agents remain present but inactive and documented.
- Feature paths: `src/data/categoryCatalog.ts`,
  `src/components/categories/CategoryDetailPage.astro`,
  `src/pages/categories/[category].astro`,
  `src/pages/[lang]/categories/[category].astro`, `src/utils/routing.ts`, and
  the directly related test only if one exists.
- Required live evidence: policy fixtures, role handoffs, review, independent
  verification, drift audit, project map, metrics, and clean-worktree replay.

### Out of scope

- Altering `/home/azur/Projects/WSL/agentic-sdlc-framework`.
- Translating or editing review files, changing affiliate logic/SEO redirects,
  database/schema/configuration outside profile adaptation, dependencies,
  publication/deployment, commits, or pushes.
- `test-results/.last-run.json`, which is unrelated pre-existing dirt.

## Profile adaptation rules

The upstream bootstrap deletes state on non-empty targets and therefore is not
permitted. Every imported artifact is classified before copy: **replace/adapt**
for templates and canonical controls; **merge** for `.claude/settings.json` and
skill collisions; **retain** for project-specific guidance and legacy support.
No legacy artifact is silently deleted. The final profile validator must report
the exact `multi-runtime` resolved state.

Codex is the runtime actually used for the pilot. `.codex/config.toml` must be
explicitly activated from the profile template before the hard-stop live proof.
Static policy fixtures alone are not a live-hook proof. If a fresh trusted Codex
session cannot load the project configuration, the corresponding verdict is
`UNVERIFIED`, not `READY`.

## Roles and write gates

| Stage | Role | Permission and expected output |
| --- | --- | --- |
| 0 | Orchestrator + Architecture Analyst + Critic | Read-only analysis and Stage-0/critic artifacts; Critic must resolve the profile choice before writes. |
| 1A | Orchestrator | After Critic passes the manifest and matrix, opens a time-limited **bootstrap-only** gate for the exact profile set. |
| 1B | One Coder | Sole writer for bootstrap artifacts; runs deterministic profile/policy checks. Source files stay prohibited. |
| 1C | Orchestrator + Verifier | Starts a fresh trusted Codex session and records live denial proof. Failure leaves feature authority `UNVERIFIED`. |
| 2 | Orchestrator | Only after 1C passes, opens a separate time-limited feature write set. |
| 3 | One Coder | Sole writer for the approved feature paths; implements the architecture brief. |
| 4 | Reviewer | Read-only defect review; findings are classed by baseline, migration, coder, reviewer, or verifier origin. |
| 5 | Verifier | Read-only independent clean replay and formal `READY`/`UNVERIFIED` verdict. |
| 6 | Orchestrator | Drift audit, project map, closeout, overhead measurement, and final pilot conclusion. |

Any attempt to write source while `BLOCKED`/before feature `READY`, commit, push,
destructive command, or live external action is an expected denial control
event. The bootstrap gate expires after profile validation/live-proof handoff;
the feature gate expires at the end of the WB or after the second correction
round. Recovery requires a new critic review and explicit Owner decision.

## Model routing, task tree, and decision ownership

Model selection is recorded in the event log as the actual model slug,
reasoning-effort setting, and role; this Work Block does not write a project
default model or provider configuration. The approved model-class policy is:

| Function | Model class | Operating rule |
| --- | --- | --- |
| Orchestrator / Architect | strongest reasoning model | High reasoning for cross-cutting decisions. |
| Scope decomposition | strongest reasoning model | Complete before any worker writes. |
| Routine implementation | fast coding model | Use only after the design decisions are frozen. |
| Mechanical fixes | economical coding model | Low reasoning, narrow deterministic change. |
| Reviewer | strong model distinct from the Coder where available | Read-only and independently prompted. |
| Verifier | medium model plus deterministic tools | Verdict follows the commands and evidence, not model preference. |
| Drift check | deterministic validation first | A low-cost model may only explain the deterministic diff. |

For Codex model classes in this environment, the initial working mapping is
`gpt-5.6-sol` (strong reasoning), `gpt-5.6-terra` (routine coding and
verification), and `gpt-5.6-luna` (clear mechanical tasks). This is a
role-routing hypothesis, not a cost claim or a persisted project setting. The
pilot must capture real usage before it is adopted as a baseline.

The task tree is deliberately small and sequential by default; concurrency is
not a success criterion:

```text
Owner
  └── Orchestrator / Planner
        ├── Worker A: catalog and locale-contract implementation
        ├── Worker B: route rendering and static-path implementation
        ├── Worker C: focused route smoke support, only if needed
        └── Independent Reviewer / Verifier
```

Only one Coder may write at a time. The named Worker A/B/C phases are
sequential handoffs within that sole-writer rule, not a swarm. The requested
Telegram intake → listing normalization → preview/publish tree and its listing
schema, listing state machine, preview/approval boundary, publication API, and
idempotency strategy are explicitly **not** decisions for this localized-route
feature. They require an Owner-approved replacement or separate Work Block;
workers must never silently introduce or re-decide them here.

For this feature, the Architecture Analyst freezes the typed category catalog,
supported locale/slug enumeration, invalid-route behavior, renderer boundary,
and route-smoke contract before the Coder starts. Workers implement those
decisions and may flag contradictions, but may not reopen them.

## Context-recovery experiment

This pilot deliberately tests repository-state recovery. The Planner records a
specification, frozen decisions, write set, and task decomposition. Worker A
completes the first approved implementation slice and records a repository
handoff. That session is then stopped. Worker B starts with no chat transcript
or oral handoff and may use only repository state, the active Work Block,
specification, architecture brief, and committed/working-tree evidence.

The event log must record: whether Worker B asked for chat context, each missing
fact that blocked progress, the artifact that supplied or failed to supply it,
and whether the handoff is judged reproducible. Chat context is a test failure
when needed for information that should have been represented in the repository;
it may be used only after recording the failure and obtaining Owner direction.

## Implementation architecture

The Coder will introduce one typed category catalog with `CategorySlug` and
locale metadata, one shared `CategoryDetailPage` renderer, a thin English
wrapper, and a static localized wrapper. The localized wrapper emits only
`fr`/`de`/`ru` × supported slugs. Category filtering uses `category` first and
uses tag fallback only where the category is absent; review IDs must match the
requested locale. Routing classification and its direct test remain consistent.

## Verification and measurements

The Verifier builds a binary patch from a temporary Git index containing only
the approved paths, records its SHA-256, and applies it to a fresh detached
worktree at the baseline. It runs `npm ci`, targeted tests, Astro check, build,
and route smoke; no uncommitted source tree is treated as a clean proof.

The event log records elapsed time, Owner decisions, agent handoffs, defects
before/after review, denied control probes, manual corrections, artifact value,
duplicates, and separate one-time bootstrap versus recurring feature cost. It
also records churn: commits made, commits corrected or abandoned, files changed
again after their first edit, merge conflicts, correction rounds, changes absent
from the final patch, lines added then deleted, and implementation time versus
governance time. A second-function speed estimate is advisory only unless
actually executed.

The final conclusion must explicitly assess those four comparative dimensions:
conflicts, repeated work, manual context recovery, and non-substantive review
cycles. A functioning feature does not by itself qualify as **Framework works**
when the evidence shows that the process increased any of them without a
compensating, recorded risk reduction.

## Immediate stop conditions

Stop for Owner direction if the profile adaptation needs a dependency, secret,
deployment, destructive action, source path outside the set above, collision
that cannot be merged safely, a required fresh Codex session cannot be started,
or verification fails beyond two correction rounds.
