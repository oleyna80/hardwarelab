# .agent/ — Agent Workflow Layer

> Project-level directory for runtime-neutral agent workflows, gates, routing,
> and approved skill wrappers. Policy-bearing files here are committed so
> another workstation or agent runtime can reproduce the project workflow.

## Directory Structure

```
.agent/
├── README.md              # This file
├── ROSTER.md              # Agent routing table + skill assignments
├── AGENT_CONTRACT.md      # Canonical content pipeline conventions
├── critic-gate.md         # Stage 0 critic evidence contract
├── verification-gate.md   # Stage 2/3 verification evidence contract
├── roles/                 # Content pipeline role definitions
│   ├── _COMMON_RULES.md
│   ├── tech-lead.md, coder.md
│   ├── single-researcher.md, researcher.md, translator.md, qa.md
│   └── archive/           # Deprecated roles (history only)
├── workflows/
│   ├── sdd-protocol.md    # Full SDLC stage definitions
│   ├── task-routing.md    # Task dispatch matrix
│   ├── AGENT_GUIDELINES.md
│   └── ...
├── skills/                # Project-local skill wrappers
│   └── <skill-name>/SKILL.md
├── templates/             # Task shell templates
└── reports/               # Agent output reports (immutable evidence)
    ├── tech-lead/
    ├── coder/
    ├── reviewer/
    └── ...
```

## How Skills Work

Each approved skill is a directory under `.agent/skills/<name>/` with a
`SKILL.md` file. Skills define: Triggers (when to use), Workflow (steps),
Guardrails (constraints), and Handoff (output format).

Agents match skills by reading their `## Triggers` or `## When to Use` sections.
The Skill Routing Gate (`AGENTS.md`) requires recording: skills checked, matched,
used, and skipped (with reason).

**Engineering skills** (discovery, security-pass, memory-ops, git-safety, etc.)
are available in `/home/azur/Projects/WSL/azursystech/.agent/skills/` and can
be ported via a skill-curation Work Block when needed.

## Finding the Right Skill

1. Check `.agent/ROSTER.md` for the skill routing table.
2. Search approved `.agent/skills/*/SKILL.md` files for matching triggers.
3. If no local skill file matches, record `skill-file-unavailable` and use
   the nearest committed gate/template as the fallback.

## Adding a Skill

Open a skill-curation Work Block before committing skill directories. Copy a
skill directory from the framework's skills library into `.agent/skills/`, or
create a new one following the existing `SKILL.md` structure. Commit only
the approved exact skill paths.

## Gate Files

`.agent/critic-gate.md` and `.agent/verification-gate.md` are evidence contracts
enforced by `.claude/hooks/critic-gate.sh` and `.claude/hooks/verification-gate.sh`.
See `AGENTS.md § Hook-Enforced Gate Rules` for the enforcement contract.

When starting a new Work Block:
1. Update `.agent/critic-gate.md` with `Status: READY` (after critic review) or
   `Status: SKIPPED` (quick-fix with Owner log entry).
2. Update `.agent/verification-gate.md` with `Status: SKIPPED` for quick-fix,
   or run full verification for standard/full tier Work Blocks.
