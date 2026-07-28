# Work Block — WB-009 Skill Index Linter Compatibility Repair

## Control

- **Canonical ID:** `WB-2026-07-28-localized-category-routes-skill-index-linter-repair`
- **Parent:** `WB-2026-07-28-localized-category-routes-pilot` (`WB-009`)
- **Stage:** `SUCCESS`
- **Profile:** Managed, final one-file linter compatibility repair
- **Baseline / PR:** `447f4f4c38b37cc06e01db695a4606922c90f274` / #13

## Stage 0 preflight

| Field | Frozen value |
| --- | --- |
| Side-effect class | repository-local deterministic lint implementation; CI executes it on PR only |
| Database/data mode | none |
| Runtime/function bindings | `.agent/skills/scripts/lint-agent-skills.mjs`, `npm run lint:agent-skills`, `Agent Guards / validate` |
| Evaluation posture | not required; deterministic local suite and GitHub Actions on exact PR head are authoritative |
| Write gate | `READY`: Owner approved this final non-default-branch lint repair and PR update; merge is prohibited |
| Successor policy | no automatic Work Block for a subsequently discovered lint defect |

## Expected result

The linter validates real `SKILL.md` definitions while leaving the root skills
README as ordinary documentation. Both the complete local assurance suite and
GitHub PR checks are green before parent closeout.

## Write-set

| In scope | Out of scope |
| --- | --- |
| `.agent/skills/scripts/lint-agent-skills.mjs`; this WB's plan/spec/review/verification/drift evidence; parent status artifacts only after green CI | README and every upstream skill definition, product/package files, other linters/workflows, release-state, deployment, `test-results/.last-run.json` |

## Role boundaries

| Stage | Role | Responsibility |
| --- | --- | --- |
| Specify | Orchestrator, independent Critic | freeze the exact exclusion and hard stops |
| Implement | one Coder | change collection for the root index only |
| Review | independent Reviewer | inspect path scope and prove definition discovery remains intact |
| Verify | independent Verifier | run the full local suites and inspect exact-head GitHub checks |
| Drift audit | deterministic audit | require `ALIGNED` between specification, literal diff, verification and parent closeout |
| Close | Orchestrator | update WB-009 only if all required checks are green |

## Local verification sequence

```text
npm ci
npm run build
npm run check:affiliate
bash scripts/run-researcher-output-checks.sh pull_request <PR-base-SHA> <before-SHA> <head-SHA>
npm run lint:images
npm run lint:agent-docs
npm run lint:agent-roles
npm run lint:agent-skills
npm ls
npx vitest run src/utils/routing.test.ts
npm run check:types
static route inventory (28 expected paths)
runtime smoke (28 x 200; 2 x 404)
```

## Hard stops and limits

- One implementation and one review round.
- No README frontmatter, no change to a `SKILL.md`, and no broad exclusion of
  root markdown.
- Any new lint defect is reported, not repaired automatically.
- No merge/default-branch write.

## Completion record

- One implementation round produced only the literal root `README.md`
  exclusion; the index README itself and all `SKILL.md` files remained
  unchanged.
- One independent review round and one independent verifier round returned
  `APPROVE` and `READY`, respectively.
- The complete local Agent Guards sequence and the primary route suite passed.
- GitHub Actions passed `Agent Guards / validate`, CI `quality`, `e2e`, and
  `lighthouse` on repair head `90f92ccc`; the documentation-only final PR head
  `1641bfaa` repeated the same green checks.
- No later lint defect opened a successor Work Block.
