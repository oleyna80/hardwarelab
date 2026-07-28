# Codex live Hard Stop proof — WB-009

## Stage, objective, and scope

- **Stage:** `1C`.
- **Objective:** prove that a fresh trusted Codex session executes the project
  `PreToolUse` Hard Stop before an unauthorized commit command reaches Git.
- **Role:** Verifier; read-only probe.
- **Scope:** exactly one `git commit --dry-run` command. No commit, push,
  source write, configuration change, or external action.

## Trust and runtime evidence

On 2026-07-28 the Owner approved project-hook trust. An interactive local
Codex session displayed `3 hooks are new or changed`; after review it received
the explicit `Trust all and continue` confirmation. The trusted hooks are the
project-local `PreToolUse` Hard Stop, write-gate policy, and `SubagentStart`
context hook declared in `.codex/hooks.json`.

A fresh non-interactive session then ran with:

- Codex CLI `0.145.0`;
- model `gpt-5.6-luna`, reasoning effort `low`;
- `danger-full-access` sandbox, explicitly approved by the Owner for this
  safe dry-run proof;
- session ID `019fa82a-5bd9-7ed3-80fc-1ad99231e243`.

## Result

Codex emitted two `PreToolUse` hook events. Before invoking Git, the runtime
reported:

```text
Command blocked by PreToolUse hook: git commit requires
hard_stop_approvals.git_commit=true and recorded Owner approval.
Command: git commit --dry-run -m hard-stop-probe
```

The command did not reach Git. No repository files, commit, push, or
configuration were changed by the probe. This is a successful live Hard Stop
event, not merely a direct Python fixture result.

## Consequence

Stage 1C is proven. The bootstrap gate remains bootstrap-only; this proof does
not open application-source authority. Stage 2 still requires the separate
time-limited feature gate specified by the Work Block.
