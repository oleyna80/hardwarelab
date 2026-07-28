# Pinned Profile Import Manifest — WB-2026-07-28-localized-category-routes-pilot

## Provenance and rule

Source is the checked-out immutable upstream tree at
`c604f8d2085ca3469de54a525880e3f11eba0fa7`. The manifest was resolved with
the upstream `resolve_profile_state(..., "multi-runtime")` routine after
catalog validation; the bootstrap/install routine was not run. No source not
listed below may be imported. `test-results/.last-run.json` is prohibited.

## Bootstrap write set — exact paths

### Common controls and documentation

`AGENTS.md`, `PROJECT_MAP.md`, `FILE_REGISTRY.yml`, `.gitignore`,
`governance/{README,authority,lifecycle,artifacts,evaluation,runtime-capabilities}.md`,
`runtimes/{README,codex/README,claude-code/README,opencode/README,generic/README}.md`,
`integrations/{README,claude-code-codex-plugin/README,mcp/README,file-handoff/README}.md`,
`.agent/{bootstrap-profile.json,ROSTER.md,active-work-block.default.json,active-work-block.json,AGENT_CONTRACT.md,critic-gate.md,verification-gate.md}`,
`.agent/hooks/hard_stop_policy.py`, `.agent/workflows/sdd-protocol.md`,
`.agent/skills/README.md`, `docs/session-bootstrap.md`,
`docs/engineering-memory/README.md`, `docs/evals/README.md`,
`docs/plans/README.md`, `docs/specs/README.md`, `docs/tasklist/README.md`,
`docs/reports/{README.md,evaluations/README.md}`,
`docs/templates/{work-block-template.md,spec-drift-report-template.md,integration-admission-template.md,evaluation-plan-template.json,evaluation-report-template.json,trajectory-event-template.json}`, and
`scripts/{bootstrap.sh,validate-installation-profile.py,validate-evaluation.py}`.

The bootstrap gate also authorizes `AGENT.md` solely for its subordination
banner, and `memory_bank/{context,decisions,external-team-log,orchestrator-log,progress,review-log}.md`
solely as new canonical operational records. `.memory_bank/**` remains
explicitly excluded and untouched.

### Runtime adapters

`CLAUDE.md`, `.claude/settings.json`,
`.claude/agents/{solution-architect,critic,scoped-coder,reviewer,verifier}.md`,
`.claude/hooks/{work_block_gate.py,assurance_gate.py,critic-gate.sh,hard-stop.sh,typecheck.sh,verification-gate.sh}`,
`.claude/skills/README.md`, `.codex/config.toml.template`, `.codex/config.toml`,
`.codex/hooks.json`, `.codex/agents/{architect,critic,coder,reviewer,verifier}.toml`,
`.codex/hooks/{hard_stop_policy.py,pre_tool_use_policy.py,stage0_write_gate.py,subagent_context.py}`,
`opencode.json`, `.opencode/agents/{architect,critic,coder,reviewer,verifier}.md`,
and `.mcp.json`.

`.codex/config.toml` is a local activation copy of the pinned template and is
outside profile-validator requirements; it exists only to make the Codex hook
testable in a new trusted session.

### Selected skills

Copy whole source directories (not merely `SKILL.md`) from `skills/<name>/` to
both `.agent/skills/<name>/` and `.claude/skills/<name>/` for exactly:

`architecture-discovery`, `technical-discovery`, `task-decomposition`,
`scoped-coder`, `reviewer`, `verifier`, `spec-drift-audit`,
`memory-bank-manager`, `ssot-sync-closeout`, `subagent-mission-brief`,
`orchestrator-log`, `context-snapshot`, `critic-review`, `scoped-commit-guard`,
`shell-context-guard`, `project-estimation`, `systematic-debugging`,
`webapp-testing`, `agent-operations-review`, `output-skill`, `merge-protocol`,
`security-audit-triage`, `security-verification-gate`, `codex-verification`, and
`handoff-live-smoke`.

`webapp-testing` is the sole content merge described in the compatibility
matrix. All other selected skills are imported verbatim. Existing non-selected
skill directories are retained and are not modified.

### Local operational artifacts

The bootstrap stage may additionally update only this WB's documentation:
`docs/plans/WB-2026-07-28-localized-category-routes-pilot*.md`,
`docs/specs/WB-2026-07-28-localized-category-routes-pilot-spec.md`,
`docs/evals/WB-2026-07-28-localized-category-routes-pilot-plan.json`,
`docs/architecture/drafts/WB-2026-07-28-localized-category-routes-pilot-architecture.md`,
and `docs/reports/{work-blocks,evaluations}/WB-2026-07-28-localized-category-routes-pilot*`.

## Feature write set — unavailable until live proof passes

`src/data/categoryCatalog.ts`,
`src/components/categories/CategoryDetailPage.astro`,
`src/pages/categories/[category].astro`,
`src/pages/[lang]/categories/[category].astro`, `src/utils/routing.ts`, and the
one directly associated routing/unit test discovered before Coder handoff.
No other source path, dependency lockfile, content review, configuration, or
test-result artifact is authorized.

## Integrity checks before and after import

Record source SHA, manifest path list, file checksums for every imported
verbatim artifact, `webapp-testing` diff, generated profile-state JSON, and
`git diff --name-only`. The installed profile validator must resolve
`multi-runtime`; only the declared local activation config and documented
supplemental legacy artifacts may differ from the pure scaffold.
