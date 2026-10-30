# Project Plan P — lite-workspace-update

## Project identity and exact specification

- Repository/project: `oleyna80/hardwarelab` / `lite-workspace-update`.
- Outcome: adopt the accepted Lite workspace procedure in HardwareLab, with a product-specific README correction, preserving the existing Codex-first architecture and application behavior.
- Initiative provenance: Owner's 2026-10-30 request to begin the updated Lite transfer, recorded in the accepted Spec; architecture/documentation preparation here and practical implementation/testing in HardwareLab Codex CLI.
- Accepted Spec: [spec.md](spec.md), commit `cccc54d717b9f72d262ce89e3378bcc4abf872cb`, path `docs/projects/lite-workspace-update/spec.md`, blob `778907a738f1677328092e7849f166cc762d5b92`. Separate acceptance: [owner-decisions.md](owner-decisions.md), exact Owner message on 2026-10-30.
- Planning baseline after the separate CI remediation: branch `chore/sdlc-lite-adoption`, HEAD `5ac777ba28d35e9c4a205123ad677de5df2d4ef3`, tree `ebf305824111afa3128ac98df942f2763830f7ee`. The accepted Spec commit remains `cccc54d717b9f72d262ce89e3378bcc4abf872cb`; earlier adoption source/evidence remain historical subjects. Adopted [ADR-0001](../../decisions/0001-clean-adoption.md) continues to apply. W must pin the actual later execution baseline, including planning/evidence commits.
- Import input: Lite merge `8db525ab1f1443cee944cba07fcccafd71408be8`; exact guide blob `20a5ba7f4be7a921c1ad1ef4acdb8e6b82d49621`, SHA-256 `420fb49b3fc0678c4cad4a2c211175594c8aa44be992dde6199bbfad7d28364d`. Available local source `b08a3f361ef68a2a74a3287360a8c7b60da14a1b` has the same upstream tree; inspect exact objects, not the stale source main working file.

## Finite scope and proposed delegation

Implementation paths, owned by Coder:

1. `docs/workflow/workspaces.md`: exact byte-preserving import, with no HardwareLab variant.
2. `README.md`: preserve product instructions; distinguish initial installation and limited update provenance; link hook connection to the canonical guide; account for the three already-deleted historical sidecars in the source-preservation statement. Describe the original adoption separately from the later, separately authorized two ROG Ally comment corrections; do not present equality of the current `src/` tree to the original main baseline as fact. This update itself changes no article content.

Planning/evidence paths and single writers:

| Path | Writer and purpose |
| --- | --- |
| `docs/projects/lite-workspace-update/owner-decisions.md` | Orchestrator: attributable exact-Spec/P decisions and separate dependency decision references; never invent acceptance |
| `docs/projects/lite-workspace-update/plan.md` | Architect/Orchestrator: this P candidate; freeze each reviewed revision |
| `docs/projects/lite-workspace-update/project-critic.md` | Independent Project Critic: original exact-P findings/verdict |
| `docs/changes/lite-workspace-update/work-block.md` | Orchestrator: actionable stage W conforming to approved P |
| `docs/changes/lite-workspace-update/stage-critic.md` | Independent Stage Critic: original exact-W findings/verdict |
| `docs/changes/lite-workspace-update/implementation.md` | Coder: source candidate, diff, checks and limitations |
| `docs/changes/lite-workspace-update/review.md` | Independent Reviewer: exact-S inspection and findings |
| `docs/changes/lite-workspace-update/validation.md` | Independent Verifier: exact-S executed checks/results |
| `docs/changes/lite-workspace-update/handoff.md` | Orchestrator: durable recovery, original report references, source/evidence/delivery state and next action |

`docs/projects/lite-workspace-update/spec.md` remains frozen at the accepted subject. Do not stage or alter the pre-existing dirty `docs/changes/sdlc-lite-adoption/handoff.md`; preservation digest is `b00e76ad2ca8bad1e22030d92562d1b710ddeeccaec152f15748f028c2653ec8`.

Proposed delegated operations, effective only after applicable exact-P Owner approval and stage gates: scoped task-branch commits of enumerated files with normal hooks; bounded REWORK; read-only source/ref/PR/CI inspection; non-force publication to the existing `chore/sdlc-lite-adoption` branch and update of its existing PR #14; observation of automatically triggered PR checks. Refresh PR identity/base before publishing. No new worktree, source checkout update, remote branch deletion, history rewrite, manual workflow dispatch or direct main write is delegated.

Excluded: parser or selector changes; application/content/test/dependency changes; all other Lite contracts/roles/templates; source-project histories/approvals; integrated memory; hook code/activation/configuration; native agent hooks; global settings; merge/deploy/VPS/credentials/protection changes. Separate remediation cannot be smuggled into this write-set. Actual OS/platform permissions remain binding.

## Delivery dependency and feasibility

The accepted Spec records a researcher-output CI failure at adoption H `2067aac149c45c3e30f6503a8d6b659a1c68dd29`. That historical observation and accepted Spec stay unchanged. The Owner chose separate remediation before this transfer; authority and executed checks are recorded in the original [parser/content handoff](../../changes/researcher-quote-parser/handoff.md) and [Playwright runner handoff](../../changes/ci-playwright-runner/handoff.md), indexed by [owner-decisions.md](owner-decisions.md).

Delivered predecessors on the same branch:

- `d3c784472e3c044a9f1d1c6c6502a140fe6b0d09`: bounded quote-heading parser correction and six regression tests. Its two remaining real-article mismatches were reported, not hidden.
- `c01ea15a5f016f0633129c381306f012728c27e3`: separately authorized corrections of only two ROG Ally comment values to match existing research-pack quotes. Exact comparison and selector semantics were retained.
- `e26613dfbfc7e13340c7af0f61dee18331d3e412`: separately authorized one-line `jobs.e2e.runs-on` pin to `ubuntu-24.04`; no test/dependency change.
- `5ac777ba28d35e9c4a205123ad677de5df2d4ef3`: delivered runner evidence. On 2026-10-30 live GitHub inspection found [Lite Checks 41041755601](https://github.com/oleyna80/hardwarelab/actions/runs/41041755601) SUCCESS and [CI 41041756052](https://github.com/oleyna80/hardwarelab/actions/runs/41041756052) SUCCESS for this PR head; quality, E2E and Lighthouse, including researcher checks and the E2E execution step, all succeeded. PR #14 remains OPEN/Draft against base `72ada873d66d19de2609515b443766065fe132c9`.

This satisfies the previously known delivery dependency at the planning baseline; it is not CI or independent assurance of a future Lite candidate. Preserve all six changed predecessor paths (workflow, parser, test, article and the two remediation handoffs) as baseline inputs. They are not this task's implementation or evidence-only changes after its future S. The exact guide import and two-file implementation scope remain unchanged; README must express preservation in its historical context. Recheck baseline/CI at W preparation and before delivery; new material drift requires reassessment and any affected revision gates. No intermediate merge is required.

## One execution stage

| Stage | Actual entry/dependency | Outputs | Acceptance and gates |
| --- | --- | --- | --- |
| S1 — exact guide adoption and delivery | Accepted exact Spec; committed exact-P Project Critic READY followed by separate Owner approval; resolved CI dependency; committed conforming W and independent Stage Critic READY; verified project CLI worktree/permissions and preserved dirty state | Two implementation files; exact source candidate S; original implementation/Reviewer/Verifier reports; evidence-only H if needed; existing PR updated within delegated bounds and actual CI evidence | Spec AC-01–06; independent Reviewer READY and Verifier PASS on the same S; checked S..H and actual required CI at delivery H; separate Owner final acceptance/merge decision |

W is drafted only when the dependency is delivered. W pins actual execution baseline/tree, exact P/Spec subjects and original approval/report references, finite evidence paths/writers, tests, permitted operations and recovery. No second implementation stage or repeated upstream 36-case runtime campaign is needed for an exact document import.

## Checks and assurance strategy

1. Establish source availability and verify guide Git blob plus SHA-256 before import. After import verify both again; inspect the complete predecessor-to-candidate guide diff and README adaptation.
2. Verify README local link/anchor, installation/update provenance, the three historical deletions and truthful separation of the two later article corrections. Check relevant tracked and untracked task bytes for introduced whitespace errors, conflict markers and broken local links. Do not mistake future evidence paths in P for files that must already exist.
3. Extract every Bash fence from the imported guide and run `bash -n` individually without executing examples. Record coverage/count, statuses and diagnostics. Syntax success is not runtime worktree/hook assurance. Do not execute placeholder operations or change configuration to manufacture runtime PASS.
4. Inspect exact execution-baseline-to-S path/content diff: only the two implementation files plus enumerated evidence; verify accepted Spec bytes, prior dirty handoff digest, hooks/configuration, preserved CI adaptation and all excluded paths. Separately inspect the whole PR-base-to-delivery diff, retaining provenance of earlier adoption and the authorized CI dependency.
5. Independent Reviewer inspects the same S and full source diff; independent Verifier executes required checks against that S with source/index/config preservation. Record source availability, actual tests, inherited upstream evidence and NOT_RUN separately. Coder self-checks cannot substitute for these roles. Keep originals reachable by exact Git commit/blob across REWORK; do not amend reports or freeze a new source under an old verdict.
6. Use the actual `.github/workflows/lite-checks.yml` and `.github/workflows/ci.yml` contracts, with the real PR base and event semantics. Local `check:ci` omits image lint, changed-slug researcher validation and Lighthouse; it is not a substitute for all hosted jobs. At delivery H require actual Lite Checks and CI quality, E2E and Lighthouse success. Rerun/inspect changed-slug validation against the whole PR base, not just this documentation commit. New failures require diagnosis and bounded authorized remediation; unrelated fixes require scope reassessment.
7. Evidence-only commits after accepted S may create H only after an inspected S..H diff proves no source, requirements, tests or gate change. Obtain actual CI for H; record subsequently observed CI in PR/later evidence, avoiding self-referential future-CI claims. Update PR #14's description with current provenance, exact checked head and actual CI/report links; replace historical pre-validation claims with bounded observed results. A PR-only final CI update needs no extra repository commit. Existing source or CI verdicts are not new-head acceptance.

## Recovery, risks and Owner stops

- Orchestrator owns handoff and serializes overlapping file/index operations. Never run independent checks concurrently with Coder/source changes. Preserve other worktrees and all unrelated dirty/untracked/ignored work; no automatic cleanup or stash.
- Before each significant transition recover task → W → exact P/Project Critic/Owner → accepted Spec/intent binding and inspect actual identity/ref/HEAD/status. Source-project approvals and old HardwareLab assurance do not transfer.
- Material Spec or P changes require the affected Owner/Project Critic cycle; conforming W changes require a new W/Stage Critic. Preserve historical revisions/reports in reachable Git; do not edit frozen subjects for progress.
- Primary risks: wrong source checkout, accidental overwrite of HardwareLab CI adaptation, mixed prior dirty work, false CI completeness, and dependency edits misreported as evidence-only H. The pinned import, two-file source scope, baseline accounting and actual-head CI address these risks.
- STOP the affected action on missing authority/object/report, preservation mismatch, source-byte mismatch, failed required checks or material drift. Preserve diagnostics and local work; do not bypass hooks or weaken checks. Undoing a committed change requires an authorized scoped revert, never reset/clean/history rewriting.
- No merge is included. Main CI success can trigger Docker Publish and VPS deployment automatically; a future Owner merge GO must explicitly account for this consequence. No deployment, manual dispatch or production action is authorized here.

## Independent review boundary

Inspect the complete refreshed proposal and dependency evidence, then obtain permission for the scoped local commit of this P, `owner-decisions.md` and the task handoff. Independent Project Critic then reviews exact committed P/Spec subjects and gate feasibility; Owner approval follows Critic READY. Until those gates and W/Stage Critic are satisfied, this document grants no implementation authority. Keep working status, decisions and reviewed hashes outside the frozen P. Do not copy the source Lite process-feedback register or any other new source-project document as part of this pinned update.
