# Critic Report — WB-009 Skill Index Linter Compatibility Repair

## Verdict

**APPROVE**.

## Evidence

- The failure reproduces as exactly
  `.agent/skills/README.md: missing YAML frontmatter`.
- `collectSkillFiles()` currently collects every root `*.md`, while directory
  discovery independently validates direct-child `<skill>/SKILL.md` only.
- The root README is an index, not a definition. The remaining root markdown
  entries are definitions and must remain in the validation list.

## Frozen boundary

The Coder may exclude only the root entry named `README.md` from the root-file
branch. No broad markdown exclusion, recursion change, README frontmatter, or
`SKILL.md` change is permitted. The Reviewer must prove that exact condition
and the Verifier must retain the pre-existing dirty test-result file outside
the staged set.

## Residual policy

If a later lint defect appears, record it and leave WB-009 non-`SUCCESS`; do
not automatically open a successor Work Block.
