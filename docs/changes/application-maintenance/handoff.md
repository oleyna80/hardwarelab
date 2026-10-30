# application-maintenance — architecture checkpoint

Current planning phase and next gate are recorded in the final checkpoint below. The initial Spec-preparation observations in this section are historical.

- Date: 2026-10-30; phase: intent/scope accepted; specification candidate prepared for exact-revision acceptance. Verify checkpoint commit identity in Git; this document does not record its own future commit.
- Repository/worktree: `oleyna80/hardwarelab`, `/home/azur/Projects/WSL/projects/Amazon_aff/hardwarelab-lite`.
- Observed predecessor HEAD: `a9e221af43049c709dd6c5171bd8ad3d8d08e283`, branch `chore/sdlc-lite-adoption`.
- Owner initiative: framework maintenance, illustration fixes and security review; supplied example: `https://hardwarelab.org/reviews/steam-deck-oled`.
- Proposed Spec: `docs/projects/application-maintenance/spec.md`; intake evidence: `docs/projects/application-maintenance/security_best_practices_report.md`.
- No P/W, Project/Stage Critic verdict, source candidate S, independent assurance, implementation or delivery approval exists for this initiative. Do not borrow them from `lite-workspace-update` or adoption.

## Owner decision — initiative intake

On 2026-10-30, after reading the discussion documents, the Owner stated in the architecture conversation: «Проверил документы для обсуждения. принимаю», then clarified the lifecycle position: «сейчас определяем интент - проблему, которую нужно решить. Круг задач определен. переходим к спек и потом план+критик+владелец. после этого отдаем в работу».

This accepts the initiative's problem/scope and directs preparation of the specification, followed by P, independent Project Critic and Owner decision before implementation handoff. The exchange did not identify an exact committed Spec revision; do not reinterpret it as exact-Spec/P approval or implementation authority. No separate intent file is needed: this attributable decision and the linked Spec preserve the initiative request under development.md §2.1.

## Work performed and preserved

Read applicable project instructions/source/configuration; queried current package metadata/audits and official documentation/advisories; inspected the supplied public page in a browser and made three ordinary localized-page GETs. Confirmed the production broken hero and a difference from the local MDX import. `lint:images` reports 35 warnings with exit 0; full audit reports 43 package entries, production-filtered audit 16. These do not constitute application verification PASS or proof of production exploitability.

Created only this checkpoint and the two new project documents. Application code, dependency lockfile and runtime configuration were not changed. No install, merge, push, deployment, production exploit or live form submission was performed.

Preexisting uncommitted work, outside the new task draft:

- `.dockerignore`: previously Owner-authorized routine exclusion change; SHA-256 `d4399b482b0542db687bec6444e21fe7ec04ae8c3af6a0a2766960b330e1baf5`.
- `docs/changes/sdlc-lite-adoption/handoff.md`: preserve byte-for-byte; SHA-256 `b00e76ad2ca8bad1e22030d92562d1b710ddeeccaec152f15748f028c2653ec8`.

## Next action and limits

The initial Spec-acceptance next action is superseded by the dated checkpoints below. Merge and any automatically triggered production publishing/deployment still require separate Owner disposition.

## Planning checkpoint — 2026-10-30

- Observed predecessor HEAD: `3360d201366c2cad3d8bd843cec4984e68f805f6`, tree `6e5c4c48357d50f1b48a33de4a60118486ad18b1`; verified worktree `/home/azur/Projects/WSL/projects/Amazon_aff/hardwarelab-lite`, branch `chore/sdlc-lite-adoption`, origin `git@github.com:oleyna80/hardwarelab.git`.
- Owner accepted the exact Spec at that commit, blob `08e0c7e6b6653e320c096836a21a8cf7ffb62239`, and requested P. The original message and acceptance boundary are in [owner-decisions.md](../../projects/application-maintenance/owner-decisions.md). Accepted Spec and historical preliminary assessment remain unchanged.
- Complete [P proposal](../../projects/application-maintenance/plan.md) has two dependent stages: compatible runtime/security, then illustrations/final regression. Its finite [content/asset scope](../../projects/application-maintenance/image-write-set.txt) is frozen as a P input; W narrows actual affected paths. No source files were edited and no application checks were represented as newly passed.
- PR #14 was observed OPEN/Draft with remote head `a9e221af43049c709dd6c5171bd8ad3d8d08e283`, base main `72ada873d66d19de2609515b443766065fe132c9`. Existing PR body CI references are not new candidate CI. P proposes a separate clean maintenance worktree/task branch and a stacked PR base, explicitly requiring Owner exact-P approval for that project-specific base choice. No worktree/branch, push or PR was created.
- Planning write-set: new project `plan.md`, `owner-decisions.md`, `image-write-set.txt`, and this task checkpoint. Existing `.dockerignore` and adoption-handoff dirty changes remain excluded, with the hashes recorded above; no other staged content is authorized by this checkpoint.
- Planning checks: repository/ref/spec identity, finite path list and scope/hash consistency, full planning diff/whitespace and normal commit hooks. Application tests, upgraded install, Docker execution, source assurance and candidate CI are NOT_RUN in this planning phase.
- Next: independently review committed exact P and scope-list blobs against the accepted Spec. Preserve the original Project Critic report separately. READY then goes to Owner exact-P review; REWORK returns to bounded planning correction. Only approved P can be handed to the project Codex CLI Orchestrator for W → Stage Critic → execution. There is no Owner-per-conforming-W approval and no implementation authority from this checkpoint.

## Project Critic checkpoint — 2026-10-30

- Observed predecessor HEAD: `e6d460b76370020d9a5e22d6cafc7b55cfb35dff`, same verified original worktree/branch. That commit contains complete P, its finite scope input, Spec acceptance record and planning checkpoint; it changes only four task-planning files.
- Exact reviewed P: `docs/projects/application-maintenance/plan.md`, commit `e6d460b76370020d9a5e22d6cafc7b55cfb35dff`, blob `62e685cec97758866d3e5ff627fc98a195e20961`. Scope-list blob: `79159117388e500f5b9cc8fb56628835de653dd3`. Accepted Spec commit/blob remain unchanged.
- Independent native mission `/root/maintenance_project_critic` returned READY, with no blocking findings. [Original report](../../projects/application-maintenance/project-critic.md), blob `dd640b0f7e9d9ab4714c6f38755765ccbc4c3f60`, SHA-256 `fa8bd63330b656b3b24b12ff052132ddfab5fbbe2b0f7f3b11700f67abe10c47`, is preserved byte-for-byte. It is a planning verdict, not source/security/CI PASS. The mission shares filesystem/Git and does not establish OS isolation.
- Nonblocking execution notes concern full decode, explicit focused-test commands/CI wiring, owned local server and concrete Node/native runtime verification. They explain existing P requirements and do not add acceptance criteria or require a P revision.
- The evidence checkpoint includes only the original Critic report and this handoff update; reviewed P/Spec/scope are frozen. Normal planning commit hooks and scope/whitespace/hash checks completed on the predecessor; application checks remain NOT_RUN. Both unrelated dirty-file hashes remain as recorded above; no install, new workspace, push, PR mutation, merge or deployment occurred.
- Current phase: ready for Owner exact-P review. Present the exact reviewed P and READY report, explicitly including the proposed stacked PR base and delegated autonomous task bounds. Owner P approval has not yet been given. After it, prepare the Orchestrator handoff and actionable W in project Codex CLI; preserve separate Stage Critic and same-S source assurance gates.
