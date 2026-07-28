# Superseded Preliminary Work Block: Localized Category Routes Pilot

> Superseded on 2026-07-28 before implementation. The canonical Work Block is
> `docs/plans/WB-2026-07-28-localized-category-routes-pilot.md`; the approved
> specification is `docs/specs/WB-2026-07-28-localized-category-routes-pilot-spec.md`.

## Статус и полномочия

- **Статус:** `PROPOSED — awaiting Owner approval for implementation`
- **Создан:** 2026-07-28T10:38:52+02:00
- **Repository / baseline:** `oleyna80/hardwarelab` at `e61ab934`
- **Framework reference (research only):** `oleyna80/agentic-sdlc-framework` at `c604f8d2085ca3469de54a525880e3f11eba0fa7`
- **Owner decision required now:** approve the implementation scope below. A commit, push, deploy, dependency/configuration change, or production side effect is not approved by this Work Block.

This evaluates the framework as an operating contract; no files are copied from the framework checkout.

## Outcome / original idea

Repair the localized category links already emitted by HardwareLab so that a visitor who follows a category link in French, German, or Russian reaches a working category page in the same locale.

### Observed defect

`src/pages/fr|de|ru/index.astro` and `src/pages/fr|de|ru/reviews/index.astro` emit routes such as `/fr/categories/mini-pc`, but the current route tree has only `src/pages/categories/[category].astro`. The localized destinations therefore have no page.

## Acceptance criteria

1. Every supported category URL currently emitted by the `fr`, `de`, and `ru` home/review-index pages returns HTTP 200 in a production build.
2. The page contains reviews for its requested locale and category only; a localized card keeps its locale in its review URL.
3. Breadcrumb, “all reviews”, and related-category links preserve the requested locale.
4. English category URLs and unsupported locale/category URLs retain their current behaviour; no broad rewrite of category taxonomy or content is included.
5. `npm run check:types`, `npm run build`, existing affiliate checks, and new route coverage pass from a fresh, dependency-installed checkout.

## Proposed implementation shape (Architecture Analyst to confirm)

- Extract the existing category metadata/tag mapping into one shared, typed utility.
- Add one static localized category route for `fr`, `de`, and `ru`; generate only valid locale/category pairs.
- Reuse `Layout`, `ReviewCard`, content collections, and `src/utils/i18n.ts`; do not duplicate three language-specific page implementations.
- Add an E2E/browser test that opens representative and generated localized category paths and checks the locale-preserving links.

## Approved-for-planning write-set

The following is a proposed implementation write-set, not yet authorization to edit production code:

- `src/utils/categories.ts` (new, exact name to be confirmed by Architecture)
- `src/pages/categories/[category].astro`
- `src/pages/[lang]/categories/[category].astro` (new)
- `tests/localized-category-routes.spec.ts` (new)
- `.agent/project-overview.md` (only the localized category route-map section and validation date)
- `docs/reports/work-blocks/WB-2026-07-28-localized-category-routes-pilot.md`
- `docs/reports/reviews/WB-2026-07-28-localized-category-routes-{critic,review,verification}.md` (new evidence)
- `.agent/critic-gate.md`, `.agent/verification-gate.md`, and the existing orchestrator log only if the project gate requires the lifecycle state to be refreshed.

## Explicitly out of scope

- Copying, merging, or changing `/home/azur/Projects/WSL/agentic-sdlc-framework`.
- Content rewrites, translations, category taxonomy changes, routes other than localized category detail routes, analytics, affiliate logic, dependencies, configuration, secrets, database, deployment, and external communication.
- The pre-existing dirty file `test-results/.last-run.json`.
- Commit, push, or opening a GitHub PR until separately approved by Owner.

## Roles and handoffs

| Stage | Single role | Required output |
| --- | --- | --- |
| Plan / Spec | Orchestrator | this WB, accepted architecture, measurement plan |
| Architecture | Architecture Analyst (read-only) | minimal route and reuse design; exact write-set |
| Stage 0 critique | Critic (read-only) | approve/supplement/reconsider of scope, gates, and evaluation plan |
| Implementation | one Coder only | frozen-diff implementation and self-check evidence |
| Review | Reviewer (read-only) | real-defect findings on the frozen diff and route behaviour |
| Verification | Verifier (read-only) | independent clean-checkout evidence and READY/BLOCKED/UNVERIFIED verdict |
| Closeout | Orchestrator | updated WB, scoped project map, evaluation verdict, PR-ready handoff |

No role may edit outside its stated stage; only the Coder may modify production/test files.

## Hard Stops and safe gate probes

The pilot must demonstrate controls without executing a destructive or external action.

1. **Write-set probe:** submit the existing, unrelated `test-results/.last-run.json` as a synthetic pre-write payload to the project critic gate. Expected result: blocked because it is absent from the approved write-set. The file itself must not be changed.
2. **Command Hard Stop probe:** submit a synthetic `git push origin main` PreToolUse payload to `.claude/hooks/hard-stop.sh`. Expected result: denied without a same-day Owner approval; no push is run.
3. **Positive control:** submit an allowed planned-report path and record that the gate permits it only after the Stage 0 evidence is complete.

Any unexpected allowance is a pilot defect and blocks implementation until resolved or explicitly accepted by Owner.

## Reproducible verification

After implementation and before a PR is opened, the Verifier must use a fresh local checkout/worktree at the frozen candidate commit, install dependencies with the lockfile, and run the acceptance checks there. The report must record the commit, Node/npm versions, commands, outcomes, and any generated-artifact handling. A verifier that cannot run in that environment must return `UNVERIFIED`, not `READY`.

## Evaluation and measurements

Start time: **2026-07-28T10:38:52+02:00**. Stop time is the PR-ready handoff (or an explicit BLOCKED closeout).

| Metric | Method | Initial value |
| --- | --- | --- |
| Idea to PR-ready time | timestamps in this WB | running |
| Owner decisions | count explicit approvals/choices | 1 pending: implementation scope |
| Agent handoffs | count completed role-to-role artifacts | 0 |
| Defects before / after review | separate baseline, coder, reviewer, verifier counts | baseline: 1 localized-route defect |
| Blocking checks | count expected and unexpected denials | 0 |
| Useful vs duplicate documents | each role names evidence it used; closeout classifies each artifact | pending |
| Manual corrections | numbered correction rounds; maximum 2 | 0 / 2 |
| Second-function repeatability | closeout estimates the next comparable route feature using actual artefact reuse | pending |

### Evaluation verdict rules

- `Framework works`: working feature, clean verification succeeds, lifecycle artifacts are accurate, and the required evidence materially guided decisions.
- `Useful but heavy`: feature and verification succeed, but one or more required artifacts/gates duplicate evidence or cause avoidable handoffs.
- `Impedes development`: the required process prevents a safe, scoped implementation or cannot reach reproducible verification within the two correction rounds.

No verdict may be claimed when a required check is unavailable; use `UNVERIFIED` and explain the missing evidence.

## Risks / stop conditions

- Current project gate paths and report conventions may conflict; resolve the narrow conflict before source edits, or record it as a framework-friction finding. Do not bypass a gate.
- Localized category labels/descriptions may require existing translation keys. If the implementation needs new translations beyond the scope, stop for Owner decision rather than adding a partial locale policy.
- A new dependency, config change, migration, deploy, unrelated dirty file, or third correction round stops the pilot and requires Owner direction.

## Next stage

Architecture assessment and independent Stage 0 critique. Source edits cannot begin until the Owner approves this WB's implementation scope and the critic reports an acceptable control plan.
