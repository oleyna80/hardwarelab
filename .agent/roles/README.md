# HardwareLab Roles (Codex Agents)

> **📚 START HERE:** All agents should read [_COMMON_RULES.md](_COMMON_RULES.md) for Memory Bank requirements before starting any role.
> **📏 Canonical conventions:** [.agent/AGENT_CONTRACT.md](../AGENT_CONTRACT.md)

Эта папка содержит **каноничные инструкции по ролям** для агентного конвейера HardwareLab.

Цель: минимальная и быстрая команда ролей без лишних handoff.

## Active Team (Lean)

### Core
- `tech-lead.md` — архитектура, планирование, приоритеты, финальный technical gate.
- `coder.md` — реализация кода, infra/CI changes, self-verification.
- `single-researcher.md` — **внешний агент**: web research и формирование `_research-pack.md`.
- `researcher.md` — **внутренний расширенный контент-агент**: пишет `index.mdx`, делает self-check, генерирует `image.webp` и `og.png` через skills.
  - Visual standard: source square PNG (`1024x1024` default), then convert via `npm run images:review -- --slug <slug> --input <source.png>`.
- `translator.md` — перевод RU/DE/FR + sync ассетов.
- `qa.md` — финальный build/compliance/i18n gate.

## Deprecated Roles (keep for history)

Deprecated full specs were moved to:
- `.agent/roles/archive/bootstrap.md`
- `.agent/roles/archive/tech-auditor.md`
- `.agent/roles/archive/copywriter.md`
- `.agent/roles/archive/editor.md`
- `.agent/roles/archive/art-director.md`
- `.agent/roles/archive/assets.md`
- `.agent/roles/archive/codebase-researcher.md`
- `.agent/roles/archive/qa-code.md`
- `.agent/roles/archive/devops.md`
- `.agent/roles/archive/compliance-audit.md`
- `.agent/roles/archive/seo-analytics.md`

Compatibility aliases remain at original paths in `.agent/roles/*.md`.

## Content Pipeline (Lean)

1) `single-researcher.md` -> `_research-pack.md`  
2) `researcher.md` -> `image.webp` + `og.png` first, then `index.mdx`  
3) `translator.md` -> `ru/de/fr index.mdx` + assets copy  
4) `qa.md` -> final gate (`npm run build`, compliance/i18n checks)

## Canonical Docs

- `.agent/AGENT_CONTRACT.md` (roles, naming, handoff policy)
- `.agent/workflows/external-review-agent-runbook.md` (step-by-step external PASS A -> PASS B -> translation -> QA flow)
- `.agent/workflows/task-routing.md` (which role to run for each task type)
- `.agent/workflows/prepublish-affiliate-gate.md` (release compliance gate)
- `.memory_bank/roadmap.md` (phases and priorities)
- `.memory_bank/kpi-framework.md` (metric definitions and reporting cadence)
- `.agent/templates/` (standard role task shells)

## How To Start

В стартовом сообщении агенту достаточно указать:
1) роль (какой файл из `.agent/roles/*` открыть),
2) входные файлы,
3) куда записать результат,
4) что после шага нужно STOP.
