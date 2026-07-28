# Codex CLI admission — WB-2026-07-28-localized-category-routes-pilot

## Owner decision

- **Approved by Owner:** 2026-07-28.
- **Integration:** `codex-cli` only.
- **Purpose:** start a fresh, trusted local Codex session from the HardwareLab
  repository and obtain evidence that project-local hooks are live.
- **Permitted evidence probes:** a non-mutating status command and expected
  denial probes for a commit and an out-of-scope source write.

## Boundaries

This admission does not approve product source writes, commits, pushes,
destructive operations, deployment, external infrastructure, credentials, or
live data. All existing Work Block write-set and Hard Stop controls remain in
force.

## Expiry

The admission expires with the active Work Block write gate. Any later Codex
CLI invocation requires a renewed Owner decision and admission record.
