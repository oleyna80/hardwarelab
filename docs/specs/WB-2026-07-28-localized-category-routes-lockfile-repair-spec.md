# Specification — WB-009 Repair: Reproducible Lockfile Installation

## Status

- **Revision:** 2 (Critic amendments incorporated; implementation remains gated)
- **Parent:** `WB-2026-07-28-localized-category-routes-pilot` / `WB-009`
- **Owner instruction:** 2026-07-28 — complete WB-008 integration first, then
  repair the pre-existing lockfile mismatch and repeat clean verification.

## Objective

Restore reproducible installation from the repository's declared dependency
graph so `npm ci` succeeds in a clean detached worktree, then re-run the
already-approved localized-category route verification.

## Accepted repair boundary

The Coder may change `package-lock.json` and may change `package.json` only if
the deterministic diagnosis proves a minimal root dependency-metadata change is
necessary. It must not upgrade dependencies opportunistically, alter source
code, add dependencies, change runtime configuration, or migrate the
release-state gate.

## Acceptance criteria

1. `npm ci` succeeds from a clean detached worktree on Node 22 / npm 10.
2. The installed dependency tree has no invalid or extraneous nodes relevant to
   the lockfile repair (`npm ls` exits successfully).
3. The current localized-route candidate passes its focused tests, Astro
   typecheck, production build, 28 positive static-route checks, and negative
   404 checks after a clean locked install.
4. The repair diff is limited to the declared dependency metadata and evidence
   artifacts. `package.json` remains byte-identical unless criterion 1 cannot
   otherwise be met and the Critic-approved diagnosis identifies the exact
   metadata correction.
5. There is one implementation round and one independent review round. Any
   failure beyond that is an Owner decision, not another correction loop.
6. The clean detached-worktree candidate is materialized from the same
   content-addressed patch manifest for all six existing localized-route files
   plus the repaired `package-lock.json`; its path list and SHA-256 values are
   recorded in verification evidence before checks start.
7. A resolved package version already recorded in the baseline lockfile may
   change only when it is necessary to satisfy the unchanged root manifest and
   existing peer dependency graph. The Coder must record the dependency chain
   proving that necessity. Any other resolved-version change is an Owner stop,
   not a correction round.

## Out of scope

- New product features or localized-route behavior changes.
- Dependency upgrades for freshness, security hardening, or cleanup.
- Release-state gate adoption, GitHub Actions changes, runtime configuration,
  deployment, external data, credentials, or a default-branch push.
- Changes to `test-results/.last-run.json`, which remains unrelated pre-existing
  dirt.
- Re-resolving the lockfile merely to obtain newer compatible versions.

## Parent outcome

If all criteria pass, this Work Block supplies the missing clean-install
evidence to WB-009. The parent may then be re-assured and closed as `SUCCESS`;
this repair does not itself rewrite the original feature specification.
