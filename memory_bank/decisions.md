# HardwareLab — Decisions

- **2026-10-27 — Owner direction:** Run a clean SDLC Lite integration experiment in a new branch of `oleyna80/hardwarelab`. Preserve actual application code, tests and dependencies; remove all previous active agent infrastructure, Skills, hooks and legacy memories; use Codex locally. This authorizes a draft PR, **not** merge or production operations.
- **2026-10-27 — scoped tooling repair:** Move application QA scripts from historical `.agent/skills/scripts/` to `scripts/app-checks/` so CI and content publishing remain functional without any legacy Skills. See `docs/decisions/0001-clean-adoption.md`.
- Do not inherit or reactivate ADR/approval claims from `oleyna80/agentic-sdlc-lite` or historical HardwareLab work blocks.
