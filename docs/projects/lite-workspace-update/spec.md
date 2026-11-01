# Requirements + Design — HardwareLab Lite workspace update

## Initiative identity and intent

- Repository: `oleyna80/hardwarelab`.
- Stable project ID: `lite-workspace-update`.
- Owner intent: in the architecture conversation on 2026-10-30, the Owner requested reviewing the conversation and active directories and beginning transfer of the updated Lite to `/home/azur/Projects/WSL/projects/Amazon_aff/hardwarelab-lite`. Earlier instructions assign architecture/documentation/environment preparation to this conversation and practical implementation/testing to project Codex CLI.
- Product fit: maintain the existing Codex-first Lite adoption described in [PROJECT_BRIEF.md](../../../PROJECT_BRIEF.md) and [ADR-0001](../../decisions/0001-clean-adoption.md), preserving HardwareLab application behavior.
- Starting task branch: `chore/sdlc-lite-adoption`; starting HEAD: `2067aac149c45c3e30f6503a8d6b659a1c68dd29`. This is an evidence-only child of previously reviewed source `ab6f702b283c876e51ca2f9d1e205cd99528e3fe`, not a reviewed candidate for this new update.
- Classification: significant because adopting the revised canonical workspace-creation procedure changes normative workflow. This is not classified by Markdown file count. The separate hook-connection explanation alone would be a bounded usage-documentation correction.

## Existing behavior and exact upstream input

HardwareLab originally imported Lite `55ebee6cf26db99d708f089f297344ef0341f698`. The update input is source repository `oleyna80/agentic-sdlc-lite` main commit [`8db525ab1f1443cee944cba07fcccafd71408be8`](https://github.com/oleyna80/agentic-sdlc-lite/commit/8db525ab1f1443cee944cba07fcccafd71408be8), merged through PR #18.

The upstream merge tree is `4252320ec6dd7ad0d605463f021f7075e591fe1f`, identical to locally available upstream evidence HEAD `b08a3f361ef68a2a74a3287360a8c7b60da14a1b`. These identities establish input bytes, not HardwareLab approval or assurance. The old source `main` checkout remains at `55ebee6...`; copying its current working file would import the old procedure.

Exact source document:

- Path: `docs/workflow/workspaces.md`.
- Git blob: `20a5ba7f4be7a921c1ad1ef4acdb8e6b82d49621`.
- SHA-256: `420fb49b3fc0678c4cad4a2c211175594c8aa44be992dde6199bbfad7d28364d`.
- HardwareLab predecessor blob: `baadc348775a69f720ac0cf23f931658e518e47f`.

Comparison of 29 canonical contract/role/procedure/security/template/hook/Lite-CI files found 27 byte-identical files. The other differences are the workspace guide to transfer and HardwareLab's existing intentional Lite-CI omission of mandatory `CLAUDE.md`. Preserve that CI adaptation.

Existing effective hook configuration is already worktree-specific: common `extensions.worktreeConfig=true`, target `config.worktree` sets `core.hooksPath=.githooks`, and the main worktree has no effective `core.hooksPath`. A documentation transfer does not require another configuration migration.

## Requirements and finite implementation scope

1. Replace **only** HardwareLab `docs/workflow/workspaces.md` with the exact source document identified above. Adopt its operation guide, available/fresh base distinction, preservation of relevant dirty/untracked/ignored state, hook-effect inspection and guarded creation checks. Retain its existing cleanup authorization boundary. No local variant or second procedure is introduced.
2. Adapt HardwareLab `README.md` rather than copying the source repository README:
   - Keep HardwareLab identity and original installation provenance at `55ebee6...`; add explicit provenance for this limited workspace-document update at `8db525a...`.
   - Replace the shared `git config --local core.hooksPath .githooks` recipe with a link to `docs/workflow/workspaces.md#connecting-git-hooks` and a short statement to inspect existing hooks and select configuration scope before an authorized change.
   - Correct the assertion that the entire `src/` tree still equals the original baseline: application content is unchanged except for the previously authorized deletion of three historical `_editor-report.md` / `_tech-audit-review.md` sidecars. Do not restore those files or change article content.
   - Preserve HardwareLab setup, QA, deployment references and Owner boundaries.
3. Keep new planning, decisions, implementation/verification evidence and recovery checkpoints in this project's own `docs/projects/lite-workspace-update/` and `docs/changes/lite-workspace-update/` locations. The later P/W must enumerate exact evidence paths and assign one writer per overlapping path.
4. Preserve the existing uncommitted `docs/changes/sdlc-lite-adoption/handoff.md` byte for byte. It is prior work, not part of this update's implementation or an implicitly authorized commit.

### Out of scope

- Changes to `AGENTS.md`, roles, templates, security/lifecycle/memory procedures other than the exact workspace-guide transfer.
- Source Lite project Specs/P/W, approvals, task histories, reports, ROADMAP or operational memory copied into HardwareLab.
- Hook code or activation, Git configuration, native agent hooks, global agent settings, worktree creation/deletion/pruning, source checkout/ref updates, or branch switching.
- Application code, article/research-pack content, QA scripts, tests, dependencies/lockfile, Astro/Tailwind upgrades or production workflow changes.
- Staging/committing prior dirty work, rewriting previous assurance, changing shared integrated memory, merge, publish/deploy, manual workflow dispatch, VPS/credential access or repository protection changes.

## Design choices and alternatives

- Use a pinned document import plus a small product-specific README edit. A blanket framework copy would overwrite a deliberate CI adaptation and risks importing source-project authority/history.
- Keep existing Git hooks. No new agent lifecycle requirement was identified that calls for a native hook. Git hooks remain cooperative checks, not sandboxing or proof of agent-tool enforcement.
- Source procedure runtime evidence can justify selecting these upstream bytes. It does not substitute for HardwareLab-local inspection, a new source candidate, or required independent assurance of that candidate. No repeat of the entire upstream fixture matrix is proposed for an exact byte-preserving import; any local procedure modification changes that premise and requires reassessment.
- Separate application CI remediation from this documentation write-set. Do not hide a content-check failure by removing checks, filtering away the affected article or claiming the local `check:ci` command covers the whole hosted workflow.

## Known delivery dependency and decision before formal P

At starting HEAD, [Lite Checks succeeded](https://github.com/oleyna80/hardwarelab/actions/runs/40581954110) and [application CI failed](https://github.com/oleyna80/hardwarelab/actions/runs/40581954112). Earlier same-S local assurance remains historical evidence for the old source candidate only.

The 2026-10-29 investigation found that removing historical sidecars selects the Beelink review for researcher validation. Its parser expects `User Quotes (source-verbatim)` while the unchanged research pack uses `6) User Quotes (source-verbatim, 4–6)`. A read-only in-memory diagnostic extracted zero quotes from the original heading and six after changing only the heading in memory; all six article comments then matched. This is a diagnosis, not a committed fix, whole-validator PASS or fresh CI run. It should be rechecked in the separately scoped remediation task.

The Owner must choose the delivery dependency before a formal P is put forward as feasible: authorize a separate bounded parser correction with positive/negative checks, or provide another explicit permitted route satisfying the required CI. This specification does not authorize that correction. A documentation candidate can be inspected locally, but required CI remains a delivery blocker until actually green. Do not grant unqualified Critic READY to a P with no permitted route through this known gate.

The existing automatic main-branch release chain is CI success → Docker Publish → VPS deploy. A future merge decision must account for that external effect; this update does not authorize triggering it.

## Observable acceptance criteria

- **AC-01 — exact import:** target workspace-guide Git blob and SHA-256 equal the pinned source values. Inspect its full diff to the predecessor, not just the final commit.
- **AC-02 — README adaptation:** local link and `Connecting Git hooks` anchor resolve; the unqualified shared-config recipe is absent; initial installation and limited update provenance are distinct; the source-tree preservation statement accounts for the three historical deletions.
- **AC-03 — bounded change:** the only implementation paths are `README.md` and `docs/workflow/workspaces.md`; evidence paths are enumerated by later P/W. Existing prior dirty handoff, hook bytes/configuration, CI adaptation, application sources, tests, dependencies, production workflows and other worktrees remain unchanged.
- **AC-04 — static coverage:** check all relevant tracked and untracked task bytes for whitespace/conflict markers/local links, and syntax-check every Bash fence in the imported document with `bash -n` without executing placeholder examples. These checks are not runtime-hook or worktree-operation PASS.
- **AC-05 — project CLI assurance:** use the approved project P and Stage-Critic-ready W in the HardwareLab Codex CLI; commit a new exact source candidate, obtain independent Reviewer READY and Verifier PASS on that same candidate, and preserve original reports. Do not inherit old HardwareLab or upstream role verdicts as new acceptance.
- **AC-06 — delivery:** inspect source-to-evidence HEAD diff, obtain all applicable actual CI on the delivery HEAD and update delivery evidence only within authorized scope. Existing failed/queued/skipped checks cannot be reported as success. Missing authorized CI remediation keeps delivery blocked. Owner acceptance, PR merge and deployment remain separate facts.

## Approval and revision boundary

This file proposes requirements/design; it is not implementation authority, P, W or an approval record. The separate Owner decision must identify repository, exact committed Spec revision/path/blob and accepted scope. Prepare formal P only after that acceptance, resolve the known CI delivery dependency, and follow the project lifecycle for Project Critic, exact-P Owner approval, W and independent Stage Critic. Keep decisions/status outside the frozen accepted Spec.
