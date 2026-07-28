# Architecture Brief — Localized Category Routes Pilot

## Decision

Use the pinned upstream `multi-runtime` profile. It is the only exact profile
that preserves HardwareLab's Claude runtime while governing the Codex runtime
used for this pilot. The upstream bootstrap is unsuitable for a non-empty
repository and will not be run.

The profile import is a controlled adaptation: templates and runtime adapters
are copied from `c604f8d2085ca3469de54a525880e3f11eba0fa7` by manifest; project
data, local secret scanning, and local skill capability are merged explicitly.
OpenCode and MCP are required profile surfaces but remain inert.

## Feature design

Create `src/data/categoryCatalog.ts` as the sole typed source for supported
category slugs and localized metadata. Extract presentation to
`src/components/categories/CategoryDetailPage.astro`. Keep
`src/pages/categories/[category].astro` as a thin English wrapper and add
`src/pages/[lang]/categories/[category].astro`, whose `getStaticPaths()` emits
only `fr`, `de`, and `ru` with supported catalog slugs.

All visible category UI (title, description, breadcrumb, count, empty state,
and related-category CTA) comes from the requested locale's catalog data.
Filtering first matches the review's category, uses tags only when category is
absent, and then requires the locale review-ID prefix. This prevents an English
fallback or a tag collision from appearing as localized content. Update routing
classification and its direct test so localized category detail is a money page.

## Compatibility map

| Surface | Treatment |
| --- | --- |
| `AGENTS.md` | Replace/adapt upstream authority with HardwareLab-specific commands and paths. |
| `AGENT.md`, `.agent/AGENT_CONTRACT.md` | Retain domain guidance; explicitly subordinate lifecycle, roles, and gates. |
| `.agent/ROSTER.md`, active-WB model, workflow, policies | Replace/adapt from pinned version. |
| `.agent/critic-gate.md`, `.agent/verification-gate.md` | Compatibility views only; no independent authority. |
| `.codex/**` | Add pinned adapter and activate local config from its template for fresh-session proof. |
| `.claude/settings.json` | Semantic merge: pinned role/hook routing is authoritative; retain equivalent post-edit secret scan as documented extension. |
| Existing extra Claude agents/hooks | Retain disabled and register as supplemental only. |
| `webapp-testing` collision | Merge the project's Node/Playwright workflow with upstream guardrails, then mirror the same authoritative version to Claude. |
| `frontend-design`, `skill-creator` collisions | Replace with pinned versions after recording the diff and provenance. |
| `PROJECT_MAP.md`, `FILE_REGISTRY.yml`, `.gitignore` | Merge project facts and new control-plane ownership. |
| `.memory_bank/**` | Retain historical/read-only. New `memory_bank/**` becomes canonical for this WB. |

## Verification design

Profile validation and direct policy fixtures are deterministic checks, not
evidence that the current Codex process loaded hooks. A fresh trusted Codex
session from the repository root must deny `git push origin main --dry-run`
before execution after `.codex/config.toml` activation. Failure to obtain that
fresh-session evidence produces `UNVERIFIED`.

For clean verification, export a binary patch from a temporary index containing
only the WB allowlist; record its checksum and apply it to a detached worktree
at `e61ab9342e08`. Run the profile validator, `npm ci`, targeted tests, Astro
check, build, and positive/negative route smoke there.

## Coder handoff condition

Only after Critic accepts this brief and the profile adaptation passes its
fixtures and live proof may one Scoped Coder receive source write authority.
No source implementation is authorized in Stage 0.
