# Lite workspace update — architecture checkpoint

## Current observation — 2026-10-30

- Task/project: `lite-workspace-update`, repository `oleyna80/hardwarelab`.
- Authorized destination: `/home/azur/Projects/WSL/projects/Amazon_aff/hardwarelab-lite`; branch `chore/sdlc-lite-adoption`; observed predecessor HEAD `2067aac149c45c3e30f6503a8d6b659a1c68dd29`.
- Owner requested beginning transfer of updated Lite. Preparation here; practical implementation/testing in project Codex CLI, as previously agreed.
- Classification: significant normative workspace-procedure adoption; [draft requirements/design](../../projects/lite-workspace-update/spec.md). No accepted exact local Spec, P, W or new independent gates exist. Source-project approval does not transfer to HardwareLab.
- Current work: draft Spec and this checkpoint only. No canonical document, README, application, hook or configuration edit. At initial preparation these files were NOT_COMMITTED; no staging, commit, push, merge, deployment or workflow dispatch had been performed. See the subsequent local-commit authorization below.

## Preserved prior state

- At entry, the only dirty path was `docs/changes/sdlc-lite-adoption/handoff.md` (unstaged); index was empty. Its SHA-256 was `b00e76ad2ca8bad1e22030d92562d1b710ddeeccaec152f15748f028c2653ec8`. Preserve it without staging it as part of this task.
- Source local main remains `55ebee6cf26db99d708f089f297344ef0341f698`; source task worktree remains `b08a3f361ef68a2a74a3287360a8c7b60da14a1b`. Live upstream main is `8db525ab1f1443cee944cba07fcccafd71408be8`; its GitHub tree equals the locally available source task tree `4252320ec6dd7ad0d605463f021f7075e591fe1f`.
- The exact upstream workspace document was read through GitHub at the merge commit; blob `20a5ba7f4be7a921c1ad1ef4acdb8e6b82d49621`. Local source bytes have SHA-256 `420fb49b3fc0678c4cad4a2c211175594c8aa44be992dde6199bbfad7d28364d`.
- Of 29 compared canonical files, 27 match. The workspace guide requires transfer; `.github/workflows/lite-checks.yml` has the existing intentional HardwareLab adaptation. README needs a product-specific edit, not wholesale copying.
- Target hooks are already worktree-scoped; main has no effective `core.hooksPath`. No actual hook execution was tested in this architecture session.
- [PR #14](https://github.com/oleyna80/hardwarelab/pull/14) is still open/Draft at the observed HEAD. Live workflow results at that HEAD remain Lite Checks success and application CI failure. Its description still contains historical pre-validation statements; no remote edits were made.

## Checks and limits

- Executed: source/main live-ref query, exact source merge-tree metadata inspection, upstream document blob inspection, 29-file byte comparison, target branch/HEAD/status/index inspection, and effective hook-config inspection in target and main.
- Original task's Reviewer/Verifier apply to `ab6f702...`; no new same-candidate acceptance is claimed.
- The parser diagnosis in Spec refers to the previous read-only investigation; no parser or application test rerun here.
- Executed on both new draft files: UTF-8/final-newline/trailing-whitespace/conflict-marker checks; all three local Markdown links resolve. `git diff --check` passed for the existing tracked diff. These are draft checks, not implementation assurance.
- Final preservation check: prior dirty handoff SHA-256 still equals the entry value; README and workspace guide remain byte-identical to HEAD; index remains empty and HEAD remains `2067aac149c45c3e30f6503a8d6b659a1c68dd29`.

## Next action and authority boundary

On 2026-10-30 the Owner explicitly authorized: "Разрешаю отдельный локальный коммит только новой спецификации и нового checkpoint, затем перейти к принятию спецификации и подготовке плана". This permits a local commit of only `docs/projects/lite-workspace-update/spec.md` and this checkpoint. It does not itself record acceptance of the exact committed Spec or authorize committing other work or publishing.

Commit only these two inspected files with the normal hooks; keep the old dirty handoff outside the index. Record the resulting exact Spec commit/path/blob in the architecture conversation for Owner acceptance; no future self-referential commit SHA is asserted here. Obtain that acceptance and resolve the separate CI-remediation dependency, then prepare formal P for independent Project Critic before exact-P Owner approval. P/W must define the later Codex CLI mission and evidence writers. Canonical-file transfer starts only after the applicable stage gates.

Do not copy upstream Spec/P/approvals, activate native hooks, alter Git configuration, fix the application parser, or merge/deploy as an incidental part of this documentation task.
