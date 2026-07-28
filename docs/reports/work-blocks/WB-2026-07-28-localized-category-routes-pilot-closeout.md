# WB-009 Success Closeout

## Outcome

**Pilot conclusion: Framework useful, but heavy.**

The pilot delivered a working localized-category feature and, after one
separately scoped lockfile repair, proved it reproducible with ordinary `npm ci`
in a fresh detached worktree. It also demonstrated the intended controls:
specification and task boundaries survived a deliberate Worker A → Worker B
context switch; the live Hard Stop denied an unauthorized commit probe; review
found three real routing defects; and the initial clean verifier prevented a
false PR-ready claim for a pre-existing lockfile mismatch.

The framework is useful but has meaningful overhead. It produced many
overlapping evidence artifacts, required two feature correction/review rounds,
and a strong-model Codex CLI Critic invocation exceeded its 120-second runtime
budget without a usable result. The same assessment was completed by the
native read-only Critic role. This supports economical model routing for routine
work and deterministic verification, but not raw low-cost CLI prompt runs as
an unobserved mechanical shortcut.

## Delivery and assurance state

| Area | Result |
|---|---|
| Working feature | Yes — localized routes for FR/DE/RU plus English category routes |
| Parent review | Two permitted rounds found and corrected three real defects; final frozen candidate received independent full verifier coverage |
| Lockfile review | `APPROVE`, 0 findings in its single permitted round |
| Verification | `READY`: ordinary clean install, tree, test, typecheck, build, inventory and runtime smoke pass |
| Evaluation | `READY`: all blocking application, route, and trajectory criteria pass |
| Drift | `ALIGNED` |
| Closeout | `SUCCESS`; PR-ready, not deployed |

## Metrics

| Metric | Observation |
|---|---|
| Idea to verified PR-ready candidate | about 2 h 10 min (10:38 CEST to final clean-verification evidence); PR creation follows this closeout |
| Owner decisions | 5: pilot/scope, evaluation-plan integrity correction, Codex CLI admission, hook trust/sandbox authority, and the narrow lockfile repair after WB-008 merge |
| Agent handoffs | 5 explicit: Worker A → Worker B, Critic → Coder, Coder → Reviewer, Reviewer → Verifier, Verifier → Orchestrator |
| Defects before review | 1 known product defect: missing localized category routes |
| Defects found by review | 3 substantive route defects: dead localized breadcrumb, broad unknown/extra-segment money classification, and `/en/categories/<slug>` false positive |
| Defects found by verification | 1 pre-existing release blocker: lockfile mismatch; repaired in a separate one-round WB |
| Blocking controls | 2: live Hard Stop denied unauthorized commit probe; clean verifier blocked the premature closeout |
| Commits / abandoned commits | Pending final PR commit / 0 abandoned commits |
| Re-edited files | 3 feature files across two correction rounds; `package-lock.json` in the separate repair round |
| Git merge conflicts | 0; one concurrent-writer process collision was stopped before a Git conflict or final-source overwrite |
| Correction / review rounds | Feature 2 / 2 and 2 / 2; lockfile repair 1 / 1 and 1 / 1 |
| Changes absent from final result | 0 confirmed source changes; one aborted raw Codex CLI invocation made no source edit |
| Lockfile churn | `package-lock.json` +60/−36; all retained as necessary AJV topology repair |
| Lines created then deleted | Not captured exactly for intermediate feature revisions — instrumentation gap remains |
| Manual correction | 0 manual product-source edits; 1 Owner-approved documentation-only integrity correction; two process interventions (concurrent/malformed CLI runs) |
| Context recovery | Worker B needed no chat context and named no missing repository fact |
| Implementation vs governance time | Not precisely separable from retained timestamps — instrumentation gap remains |
| Second-function speed | Not executed; comparison remains future work |

## Documents that helped

- Frozen specification, architecture brief, and Worker A handoff enabled
  repository-only context recovery.
- Active Work Block and feature-gate admission constrained source writes.
- Live hook proof established a real Hard Stop, not only a fixture claim.
- Correction reports made reviewer findings traceable.
- The clean-worktree report separated a feature defect from repository
  reproducibility and prevented an unsafe closeout.

## Documents or fields to simplify

- The active Work Block, canonical plan, evaluation plan, event log, and short
  handoff reports duplicate identifiers, scope, and check outcomes. Keep the
  Work Block, specification, event log, and a consolidated assurance report;
  make small handoffs optional when the diff is self-explanatory.
- Capture patch hashes, file re-edit counts, added/deleted lines, and command
  start/end automatically to avoid manual metric reconstruction.
- Use a managed Codex wrapper/PTY lifecycle for mechanical tasks. Raw prompt
  invocation had high overhead and insufficient process visibility.

## Deferred follow-up

The stable upstream WB-008 release-state contract is intentionally **not**
adopted here. A separate Work Block may later adopt only its executable
release-state contract, validator, adversarial tests, CI gate, and a local
HardwareLab reconciliation; historical WB-008 documents are not a copy target.
