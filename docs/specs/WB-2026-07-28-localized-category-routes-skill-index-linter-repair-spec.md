# Specification — WB-009 Skill Index Linter Compatibility Repair

## Control

- **Canonical ID:** `WB-2026-07-28-localized-category-routes-skill-index-linter-repair`
- **Parent:** `WB-2026-07-28-localized-category-routes-pilot` (`WB-009`)
- **Baseline:** `447f4f4c38b37cc06e01db695a4606922c90f274` (PR #13)
- **Owner approval:** 2026-07-28 — one final narrow Work Block for the
  HardwareLab linter incompatibility; no automatic Work Block for any later
  discovered lint defect.

## Objective

Make the HardwareLab skill-definition linter distinguish the documentation
index `.agent/skills/README.md` from skill definitions, without modifying the
README or the upstream framework skill content.

## Accepted change

In `.agent/skills/scripts/lint-agent-skills.mjs`, adjust collection so that
the root index file `.agent/skills/README.md` is excluded from the definition
list. The existing directory rule, which validates each direct child
`<skill>/SKILL.md`, remains unchanged.

## Acceptance criteria

1. The production diff modifies only
   `.agent/skills/scripts/lint-agent-skills.mjs` and excludes only the root
   index README from definition discovery.
2. `.agent/skills/README.md` remains byte-identical and has no synthetic YAML
   frontmatter.
3. Nested/direct skill definition validation still runs and
   `npm run lint:agent-skills` passes locally.
4. The full local Agent Guards command sequence passes: `npm ci`, build,
   affiliate checks, researcher output check against PR #13 base/head, image
   lint, agent docs lint, roles lint, and skills lint.
5. The main feature verification suite passes locally: dependency tree,
   localized routing test, typecheck, production build, static route inventory,
   and runtime smoke for 28 expected routes plus two invalid-route 404s.
6. One implementation and one independent review round only. A newly
   discovered lint defect after this change is recorded as residual evidence;
   it does not automatically open another Work Block.
7. GitHub Actions `Agent Guards / validate` and all CI checks pass on the exact
   resulting PR head before WB-009 status changes to `SUCCESS`.

## Out of scope

- `.agent/skills/README.md`, any `SKILL.md`, upstream framework content,
  product source, dependencies, other linters/workflows, trigger/cache/action
  changes, release-state adoption, deployment, credentials, and
  `test-results/.last-run.json`.

## Hard stops

- No fictitious frontmatter and no broad markdown-file exclusion.
- Any necessary modification beyond the exact index-file exclusion, local
  command failure, red GitHub rerun, or newly discovered lint defect ends this
  final repair pending Owner decision; no automatic successor WB is created.
- Commit, push, and PR update are Owner-authorized; merge remains prohibited.
