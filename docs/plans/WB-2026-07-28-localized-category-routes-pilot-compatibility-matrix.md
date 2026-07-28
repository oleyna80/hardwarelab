# Compatibility Matrix — WB-2026-07-28-localized-category-routes-pilot

| Surface | Concrete resolution | Acceptance invariant |
| --- | --- | --- |
| Root authority | Replace `AGENTS.md` with pinned text adapted for HardwareLab; add a banner to `AGENT.md` and `.agent/AGENT_CONTRACT.md` that they supply domain guidance only. | Exactly one current authority names lifecycle, role boundaries, and gates; content-pipeline facts remain readable. |
| Active Work Block | Pinned default remains `BLOCKED`; create a local operational WB record matching the canonical ID and two-step transition. | A source write cannot become authorized merely by importing the profile. |
| Claude hooks | Replace the old governance hook wiring with pinned `hard_stop_policy`, work-block, typecheck, and assurance wiring. Keep the existing post-edit secret detector as a separately labelled local extension after the pinned typecheck entry. | One PreToolUse decision path per tool class; secret scan remains post-edit and cannot grant authority. |
| Claude agents/plugins | Pinned five logical roles are the only configured/active agents. Existing `gpt-*`, `codex-reviewer`, and plugin settings remain on disk only if required by the project, not enabled in runtime settings. | No legacy agent or plugin can silently become a parallel approval path. |
| Legacy gate documents | Keep `.agent/critic-gate.md` and `.agent/verification-gate.md`, prepend compatibility status and pointer to new canonical policy. | They may explain history but cannot be interpreted as an active gate. |
| `webapp-testing` | Start from HardwareLab Node/@playwright-test instructions, add upstream browser-smoke/evidence/safety sections, omit the unavailable Python helper, and mirror byte-identical content to `.claude/skills`. | Existing `npm` test workflow remains valid; both runtime copies have identical checksum. |
| Other selected skills | Import verbatim from pinned SHA; retain non-selected local skills unchanged. | Checksums match provenance for every non-merged selected skill. |
| `.memory_bank` | Retain untouched and label historical/read-only; create/use `memory_bank/` only for new framework operational records. | No two documents claim to be the current WB log. |
| Project registries | Merge only actual HardwareLab module/command facts and the control-plane ownership rows. | Registry links and commands resolve; no generic placeholder remains. |
| OpenCode/MCP | Add profile stubs with no credentials, endpoints, or admission record. | They are installed for reproducibility but cannot contact an external system. |
