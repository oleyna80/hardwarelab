# Specification — WB-009 CI Node Runtime Repair

## Control

- **Canonical ID:** `WB-2026-07-28-localized-category-routes-ci-node-runtime-repair`
- **Parent:** `WB-2026-07-28-localized-category-routes-pilot` (`WB-009`)
- **Baseline:** `85befcfd47d1e1209a92e5451522e3c1e3db4600` (PR #13)
- **Owner approval:** 2026-07-28 — separate narrow Work Block to update the
  CI Node version and repeat verification.

## Objective

Make the `Agent Guards / validate` workflow use the same Node 22 runtime as
the repository's other GitHub Actions workflows, so its build is compatible
with Astro's declared minimum Node version and PR #13 can receive independent
CI verification.

## Accepted change

Change only `node-version` in the `Setup Node` step of
`.github/workflows/agent-guards.yml` from `"20"` to `"22"`.

## Acceptance criteria

1. The workflow diff contains exactly the declared runtime-version change; no
   dependency, application, secret, trigger, cache, or job-structure changes.
2. The selected version is `"22"`, matching all `actions/setup-node` uses in
   `.github/workflows/ci.yml` and satisfying the build's `>=22.12.0` runtime
   requirement.
3. GitHub Actions `Agent Guards / validate` passes on the resulting PR head.
4. Existing `CI` checks remain passing on that same head.
5. The PR head is rechecked after the CI result; only then may the parent
   closeout and verification state be updated to `SUCCESS`.

## Out of scope

- Application source, category routes, tests, lockfile, package manifest,
  dependency upgrades, workflow redesign, action-version updates, cache-key
  changes, release-state adoption, deployments, credentials, and default-branch
  changes.
- `test-results/.last-run.json`, an unrelated pre-existing local modification.

## Residual risk

`package.json` still declares `engines.node >=18` while the resolved Astro
toolchain requires Node `>=22.12.0`. This pre-existing local-development
contract mismatch is recorded for a future decision; it is not evidence for a
broader change to this CI-only Work Block.

## Limits and hard stops

- One implementation round and one independent review round.
- Any required workflow change beyond the one version literal, a failed rerun
  after this change, or any test failure is an Owner decision.
- Commit, push, and PR update are Owner-authorized for this non-default branch;
  merge is not authorized.
