# Work Block — WB-009 Repair: Lockfile Reproducibility

## Control

- **Canonical ID:** `WB-2026-07-28-localized-category-routes-lockfile-repair`
- **Parent:** `WB-2026-07-28-localized-category-routes-pilot` (`WB-009`)
- **Stage:** `STAGE_6_CLOSEOUT`; assurance complete, commit/PR handoff pending
- **Profile:** Managed, deterministic dependency-metadata repair
- **Owner approval:** 2026-07-28 direct instruction
- **Baseline:** `e61ab9342e08`; the original verifier showed the failure existed
  at this baseline before the localized-route feature.

## Expected result

One minimal, reviewed lockfile repair made `npm ci` reproducible in a clean
detached worktree and enabled the exact clean verification suite for the parent
feature. The work stopped after one implementation and one review round.

## Scope

| In scope | Out of scope |
| --- | --- |
| `package-lock.json`; `package.json` only when deterministically necessary; required evidence and parent verification/evaluation updates | source routes/components/data, new dependencies or upgrades, release-state migration, runtime/config/secret changes, deploys, live data, and `test-results/.last-run.json` |

## Design decision ownership

The Architect/Critic determines whether the inconsistency is lock-only or
requires a root manifest correction. The Coder may not broaden this conclusion
or select package upgrades. The Reviewer checks the frozen metadata diff; the
Verifier owns clean-worktree reproduction.

The Coder must preserve every existing resolved package version unless a
recorded dependency/peer-graph chain shows that a different lock entry is
required for the unchanged root manifest to install. A version change without
that proof is an Owner stop rather than a second repair attempt.

## Candidate materialization

Verification will create a detached worktree at `e61ab9342e08` and apply a
single content-addressed manifest containing the repaired `package-lock.json`
and all six already-approved localized-route files. Before `npm ci`, the
Verifier records the exact seven paths and SHA-256 values; this prevents testing
only the lockfile or only the uncommitted feature candidate.

## Implementation and assurance plan

| Stage | Logical role | Result |
| --- | --- | --- |
| Define | Architect, then independent Critic | minimal diagnosis, frozen metadata boundary, and passing verification plan |
| Execute | one Coder | one repair attempt in the approved write-set |
| Assure | Reviewer | one read-only metadata/diff review |
| Assure | Verifier | clean `npm ci`, `npm ls`, tests, typecheck, build, positive and negative route smoke |
| Close | Orchestrator | update parent verification/evaluation, project map, pilot metrics, and PR-ready handoff only if every required result is `READY` |

## Deterministic checks

```text
npm ci
npm ls
focused routing tests
npx astro check
npm run build
28 positive static-route checks
negative 404 checks
clean detached-worktree replay
```

The clean run uses ordinary `npm ci` (not `--dry-run` or `--ignore-scripts`),
then records exact Node/npm versions and runs `npm ls` in that same worktree.

## Hard Stops and limits

- No dependency additions or opportunistic upgrades; an existing resolved
  version may move only with a recorded unchanged-manifest/peer-graph proof.
- No source-code repair under this Work Block.
- No more than one implementation and one review round.
- Commit/push and a non-default-branch PR are Owner-authorized only after all
  checks pass; no default-branch push or release action is authorized.
- A failed check, a necessary scope expansion, or a second correction need
  returns to the Owner.

## Repository preflight

The worktree contains the uncommitted, approved WB-009 framework/feature
candidate plus unrelated `test-results/.last-run.json`. The repair must neither
revert nor stage that unrelated file. A clean detached worktree is mandatory
for verification; the final branch/commit composition is decided only after the
repair has passed assurance.
