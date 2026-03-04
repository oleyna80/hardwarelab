# Agent Rules

Операционные правила для AI-агентов, работающих с HardwareLab.

---

## Зачем нужна Memory Bank

Ты действуешь как инженер **без долгосрочной памяти**: `/.memory_bank` — единственный устойчивый контекст. Каждый раз перед работой перечитывай содержимое, чтобы сохранять преемственность и эффективность.

---

## Active Team (Lean)

Текущий рабочий состав:
1. `tech-lead`
2. `coder`
3. `single-researcher` (external)
4. `researcher`
5. `translator`
6. `qa`

Контентный конвейер: `single-researcher -> researcher -> translator -> qa`.

---

## 🔴 RULE ZERO

**Перед ЛЮБОЙ работой:**

```
READ .memory_bank/activeContext.md FIRST
```

Этот файл содержит текущую фазу проекта, последние изменения и приоритеты. Пропуск этого шага ведёт к дублированию работы или конфликтующим изменениям.

---

## Иерархия файлов

```
projectbrief.md → productContext.md → activeContext.md
       ↓                   ↑
systemPatterns.md    techContext.md
       \               /
        → progress.md
```

### Основные файлы

| Файл | Назначение |
|------|------------|
| `projectbrief.md` | Цели и рамки проекта |
| `roadmap.md` | Фазный план, KPI и приоритеты |
| `kpi-framework.md` | Формулы KPI, источники данных и cadence |
| `.agent/AGENT_CONTRACT.md` | Каноничные правила путей, имен и handoff |
| `productContext.md` | Аудитория и монетизация |
| `techContext.md` | Стек, VPS ограничения |
| `systemPatterns.md` | Архитектура, паттерны |
| `activeContext.md` | Текущие задачи и фокус |
| `progress.md` | Статус и история |

---

## Post-Task Requirements

После выполнения **значимой задачи** (feature/аудит/архитектурные изменения; не рутинные мелкие фиксы):

1. **Обнови `activeContext.md`**
   - Измени "What Just Happened"
   - Скорректируй "Current Focus" и "Next Priority"

2. **Обнови `progress.md`** (если применимо)
   - Отметь выполненные пункты ✅
   - Если завершён milestone: добавь в "Milestones Completed" и changelog
   - Обнови "Контроль изменений" если были коммиты

---

## File Hygiene

### ❌ НЕ ДЕЛАЙ
- Создание `.md` файлов в корне проекта
- Дублирование существующих знаний
- Оставление orphan документов

### ✅ ДЕЛАЙ
- Добавляй знания в соответствующий файл Memory Bank
- Архивируй старые отчёты в `.memory_bank/archive/`
- Используй workflows в `.agent/workflows/`

---

## 🧠 Skills

В папке `.agent/skills/` находятся специализированные инструкции.
Ты **ОБЯЗАН** проверить эту папку, если твоя задача касается:
- Архитектуры (`astro-architecture-expert`)
- Точности железа (`hardware-accuracy-check`)
- SEO (`technical-seo-audit`)
- VPS/release операций (`vps-release-ops`)
- KPI/аналитики (`kpi-instrumentation-ga4`)
- Финального compliance/translation gate (`affiliate-compliance-delta-watch`, `translation-integrity-check`)
- Безопасности (`security-headers-audit`, `dependency-supply-chain-audit`, `secrets-hygiene-audit`, `api-endpoint-security-audit`)

Используй `view_file` для чтения навыка перед работой.

---

## Technical Standards

Для coding standards, TypeScript, Tailwind и troubleshooting:

→ See [AGENT_GUIDELINES.md](/.agent/workflows/AGENT_GUIDELINES.md)
→ Task routing: [task-routing.md](/.agent/workflows/task-routing.md)
→ Role task templates: [.agent/templates/](/.agent/templates/)
→ Phase A migration ops: [vps-migration-runbook.md](/.agent/workflows/vps-migration-runbook.md)
→ Content publish gate: [prepublish-affiliate-gate.md](/.agent/workflows/prepublish-affiliate-gate.md)

---

## VPS Resource Awareness

> [!WARNING]
> **2 GB RAM total** — избегай тяжёлых build-операций в runtime и не запускай сборку на VPS.
> **2 vCPU** — ресурсы ограничены, держи деплой через готовые GHCR-образы.

Детали в [techContext.md](techContext.md).

---

## Checklist Before Starting

- [ ] Прочитай `activeContext.md`
- [ ] Проверь `roadmap.md` (если задача влияет на приоритеты/фазы)
- [ ] Проверь `kpi-framework.md` (если задача влияет на метрики/отчетность)
- [ ] Проверь `progress.md` на релевантный статус
- [ ] Если меняешь код → смотри `systemPatterns.md`
- [ ] Если инфраструктура → смотри `techContext.md`
- [ ] Проверь `.agent/workflows/` на существующие процедуры
- [ ] Проверь `.agent/skills/` на наличие полезных инструкций
