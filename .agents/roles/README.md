# Portable Agent / Subagent Role Briefs

This directory defines **logical responsibilities**, not a native subagent installer or independent authority. Shared rules come exclusively from `AGENTS.md`, task gates from `docs/workflow/development.md`, and memory handling from `docs/workflow/memory.md`.

- [orchestrator.md](orchestrator.md)
- [architect.md](architect.md)
- [critic.md](critic.md)
- [coder.md](coder.md)
- [reviewer.md](reviewer.md)
- [verifier.md](verifier.md)

To delegate a nontrivial task, give the agent [subagent-mission.md](../../docs/templates/subagent-mission.md) with exact repository/ref/allowed paths, expected output and actual isolation. A subagent cannot enlarge scope, accept its own review as independent or inherit unspecified external permissions.

Runtime-native deployment/configuration, model names, tools and system prompts are intentionally outside these portable briefs.
