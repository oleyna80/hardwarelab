# Critic Report — WB-009 CI Node Runtime Repair

## Verdict

**APPROVE** after one specification amendment.

## Evidence

- GitHub Actions `Agent Guards / validate` failed on PR #13 before application
  build execution because Node `20.20.2` is unsupported by Astro, which
  requires `>=22.12.0`.
- `.github/workflows/agent-guards.yml` has one Node literal, `"20"`.
- All three `actions/setup-node` steps in `.github/workflows/ci.yml` use
  `"22"`; changing the sole divergent literal aligns with the established CI
  pattern without changing dependencies, jobs, triggers, cache, or actions.

## Required amendment incorporated

The Stage 0 preflight now records side-effect/data/evaluation/write-gate
posture, and the plan requires a deterministic drift audit before parent
closeout. The pre-existing `package.json#engines` mismatch is a residual risk,
not grounds to widen this Work Block.

## Boundary

One Coder may make exactly `node-version: "20"` → `node-version: "22"` in
`agent-guards.yml`; a failed rerun or any wider workflow requirement returns to
the Owner.
