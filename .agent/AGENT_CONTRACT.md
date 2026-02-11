# Agent Contract (Canonical Conventions)

`Last validated: 2026-02-08 (Lean Team)`

Этот документ задает обязательные правила для всех ролей и workflow в `.agent/`.

## 0) Active Team

Current active team:
1. `tech-lead`
2. `coder`
3. `single-researcher` (external PASS A)
4. `researcher` (internal extended content role)
5. `translator`
6. `qa`

Content pipeline:
`single-researcher -> researcher -> translator -> qa`

Illustrations owner:
- `researcher` generates `image.webp` and `og.png` using `visual-asset-generator` skill.

## 1) Source Of Truth Matrix

| Domain | Canonical File |
|---|---|
| Current priorities | `.memory_bank/activeContext.md` |
| Strategic phases | `.memory_bank/roadmap.md` |
| KPI definitions | `.memory_bank/kpi-framework.md` |
| Project status / milestones | `.memory_bank/progress.md` |
| Engineering standards | `.agent/workflows/AGENT_GUIDELINES.md` |
| Task dispatch matrix | `.agent/workflows/task-routing.md` |
| Affiliate pre-publish gate | `.agent/workflows/prepublish-affiliate-gate.md` |
| Role protocol | `.agent/roles/_COMMON_RULES.md` |
| Content schema | `src/content/config.ts` |
| Affiliate routing/tags | `src/config.ts` |

If docs conflict with code, code wins and docs must be updated.

## 2) Canonical Paths And Naming

### Roles
- Active roles (default handoff chain) are:
  - `.agent/roles/tech-lead.md`
  - `.agent/roles/coder.md`
  - `.agent/roles/single-researcher.md`
  - `.agent/roles/researcher.md`
  - `.agent/roles/translator.md`
  - `.agent/roles/qa.md`
- Legacy alias note: if old docs mention `tech-audit.md`, use `.agent/roles/tech-auditor.md` (deprecated, history only).

### Review assets
- Hero image: `image.webp`
- Social image: `og.png`

### Report locations
- Tech Lead plan: `.agent/reports/tech-lead/<YYYY-MM-DD>-<task-slug>-plan.md`
- Coder completion: `.agent/reports/coder/<YYYY-MM-DD>-<task-slug>-completion.md`
- QA content report: `src/content/reviews/en/<slug>/_qa-report.md`
- External research pack (input for researcher): `src/content/reviews/en/<slug>/_research-pack.md`

Optional legacy/auxiliary reports (only when explicitly used):
- `.agent/reports/qa-code/<YYYY-MM-DD>-<task-slug>-qa-code.md`
- `.agent/reports/codebase-researcher/<YYYY-MM-DD>-<task-slug>-codebase-research.md`
- `.agent/reports/devops/<YYYY-MM-DD>-<task-slug>-release.md`
- `.agent/reports/compliance/<YYYY-MM-DD>-<task-slug>-compliance.md`
- `.agent/reports/seo-analytics/<YYYY-MM-DD>-<task-slug>-seo-analytics.md`

### Deprecated roles policy
- Deprecated roles are kept for history/reference only.
- They are not part of the default handoff chain.
- Do not route tasks to deprecated roles unless user explicitly asks.
- Full deprecated specs live in `.agent/roles/archive/*.md`.
- Files at `.agent/roles/<deprecated>.md` are compatibility aliases only.

## 3) Mandatory Role Header

Every role file in `.agent/roles/` must contain a pointer to `.agent/roles/_COMMON_RULES.md` before work.

## 4) Documentation SLA

- Any role/workflow change: update related docs in the same PR/commit.
- Revalidate core docs at least once every 2 weeks.
- Include `Last validated: YYYY-MM-DD` in critical orchestration docs.

## 5) Automated Checks

Run:

```bash
npm run lint:agent-docs
npm run lint:agent-roles
npm run lint:agent-skills
```

The check validates:
- Broken local markdown links.
- References to non-existent `npm run` scripts.
- Forbidden stale references (`tech-audit.md`, `image.png` in workflow docs).
- Unexpected role files in `.agent/roles/` root and legacy-alias integrity.
- Skill frontmatter/link integrity and placeholder detection in `.agent/skills/`.
