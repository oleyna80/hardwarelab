# WB-009 Specification Drift Audit

## Metadata

- **Work Block ID:** `WB-2026-07-28-localized-category-routes-pilot`
- **Auditor role:** Orchestrator, deterministic-diff-first audit
- **Isolation:** separate clean worktree verification evidence plus current
  repository artifact inspection
- **Specification:** `docs/specs/WB-2026-07-28-localized-category-routes-pilot-spec.md`, revision `3`
- **Implementation baseline:** `e61ab9342e08` + the six-path candidate diff
- **Verdict:** `ALIGNED`

## Alignment matrix

| Contract | Implementation | Evidence | Classification |
|---|---|---|---|
| AC-01: `fr`, `de`, `ru` valid category pages | localized static wrapper enumerates supported languages × catalog slugs | clean build generated all expected routes | ALIGNED |
| AC-02: locale-specific UI/review links | shared renderer receives requested `lang`; catalog owns locale copy | static-page inspection and route smoke | ALIGNED |
| AC-03: invalid route remains not-found | static params and route classifier reject unknown slug and English localized form | two 404 smoke checks and Vitest negative contract | ALIGNED |
| AC-04: type/build and equivalent smoke | unit test, Astro type check, production build, generated-page and HTTP smoke | verification report | ALIGNED |
| AC-05: current lifecycle evidence | active Work Block, review, verification, evaluation, event log, and reporting-only closeout updated together | referenced current artifacts | ALIGNED |

## Gaps and residual risks

- The strict clean `npm ci` replay is blocked by a baseline lockfile mismatch.
  This is an environment reproducibility blocker, not a disagreement between
  the approved specification and the candidate source.
- Exact added-then-deleted line churn was not captured at each intermediate
  source revision; the closeout records this as a measurement-design gap.

## Closeout decision

- **Drift gate:** `READY` (`ALIGNED`)
- **Successful closeout allowed:** no; independent verification and evaluation
  remain blocked by the lockfile reproducibility failure.
- **Next action:** Owner decides whether to open a separate lockfile Work Block
  and repeat clean verification.
