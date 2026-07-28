# Verification — WB-009 Skill Index Linter Compatibility Repair

## Control

- **Canonical ID:** `WB-2026-07-28-localized-category-routes-skill-index-linter-repair`
- **Parent:** `WB-2026-07-28-localized-category-routes-pilot` (`WB-009`)
- **Baseline:** `447f4f4c38b37cc06e01db695a4606922c90f274`
- **Local runtime:** Node `v22.22.3`, npm `10.9.8`
- **Local verdict:** `READY_FOR_CI`

## Exact implementation evidence

The only production diff adds `entry.name !== "README.md"` to the root-file
collection branch of `.agent/skills/scripts/lint-agent-skills.mjs`. It retains
the existing `.md` predicate and leaves the direct-child
`<skill>/SKILL.md` collection branch unchanged.

`.agent/skills/README.md` was not modified; its SHA-256 before and after the
implementation is `a6b1176e0fe0238040c2fdebefe2ab1f89bd5f23683f02afe9b4dac00e1f8339`.
The local collection check found 16 remaining root definitions and 29 direct
`SKILL.md` definitions, so the rule is not a broad root-markdown exclusion.

## Local Agent Guards and main verification suite

| Check | Result | Evidence |
| --- | --- | --- |
| Clean locked install | PASS | `npm ci --no-audit --no-fund` installed 902 packages |
| Production build | PASS | `npm run build` exited 0 |
| Affiliate guard | PASS | `npm run check:affiliate` checked 93 pages |
| Researcher output guard | PASS | PR comparison reported no changed EN review slugs |
| Image guard | PASS with existing notices | `npm run lint:images` exited 0; it reported 35 existing image-size notices |
| Agent docs / roles / skills | PASS | `npm run lint:agent-docs`, `npm run lint:agent-roles`, and `npm run lint:agent-skills` exited 0 |
| Dependency tree | PASS | `npm ls` exited 0 |
| Localized route contract | PASS | `npx vitest run src/utils/routing.test.ts`: 4/4 passed |
| Type check | PASS | `npm run check:types`: 0 errors, 0 warnings, 92 hints |
| Static route inventory | PASS | 28 expected pages (7 slugs x 4 locale paths); no generated `/en/categories` tree |
| Runtime smoke | PASS | 28 expected routes returned `200 text/html`; `/fr/categories/not-a-category` and `/en/categories/mini-pc` returned `404` |
| Whitespace / scope | PASS | `git diff --check` clean; `test-results/.last-run.json` remains unstaged and outside this WB |

## Residual observations and hard stop

`npm ls` reports optional extraneous native packages and typecheck retains
pre-existing hints; neither command failed and neither is in this final repair
scope. The image guard's 35 notices also predate this repair and its policy is
non-blocking. No related change is made automatically.

The required remaining hard stop is the exact-head GitHub Actions result. A
new lint defect, red CI, or a required edit beyond the literal root README
exclusion must be reported for Owner decision; it must not create a successor
Work Block automatically.

## Independent verifier

The read-only independent Verifier returned `READY` for this child repair. It
independently confirmed the literal exclusion, README byte identity, retained
16 root definitions and 29 direct `SKILL.md` definitions, and passing skills,
docs, and roles linters. Its verdict expressly does not close the parent until
GitHub checks pass on the exact resulting PR head.
