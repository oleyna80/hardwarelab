# Critic Report — WB-009 Repair: Lockfile Reproducibility

## Metadata

- **Work Block:** `WB-2026-07-28-localized-category-routes-lockfile-repair`
- **Role / isolation:** independent Critic, separate read-only session
- **Runtime:** separate Critic agent
- **Initial verdict:** `CHANGES_REQUIRED`
- **Recheck verdict:** `APPROVE`

## Findings and disposition

| Finding | Disposition |
| --- | --- |
| A detached worktree could test the repaired lockfile without the six uncommitted localized-route files, or vice versa. | Resolved in specification revision 2 and the plan: one content-addressed, seven-path candidate manifest is mandatory. |
| “No opportunistic upgrades” was declarative; lock regeneration could move existing resolved versions. | Resolved in specification revision 2 and the plan: a change to an existing resolved version needs a recorded unchanged-manifest/peer-graph chain; otherwise it is an Owner stop. |
| The previous clean check used `--dry-run --ignore-scripts`. | Resolved in the plan: the clean detached worktree must run ordinary `npm ci`, record Node/npm versions, and run `npm ls` there. |

## Scope confirmation

The prior verifier established that `package.json` and `package-lock.json` were
unchanged by the localized-route feature, so the install failure is pre-existing.
The repair remains limited to dependency metadata and evidence; source code,
release-state adoption, dependencies, runtime/configuration changes, and the
unrelated Playwright result remain outside scope.

## Next gate

The Critic rechecked revision 2 and returned `APPROVE`: it confirmed the
seven-path materialization, the resolved-version proof rule, and ordinary
clean-worktree `npm ci`/`npm ls` requirements. The single Coder write attempt
may now begin; any unsupported lockfile churn remains an Owner stop.
