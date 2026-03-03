# Common Agent Rules

**CRITICAL:** Read this before performing ANY role.

---

## 🔴 RULE ZERO: Memory Bank First

Always read:

```
1. .memory_bank/activeContext.md  — current phase, recent changes, priorities
2. .memory_bank/agents.md         — rules for agents, file hierarchy
```

**Why:**
- Avoid duplicate work
- Understand current project context
- Know about recent changes that may affect your task

---

## 📝 Post-Task Requirements

After performing **ANY significant task** (not routine fixes):

### 1. Update `activeContext.md`

```markdown
## What Just Happened
- ✅ [Your task briefly]
  - Key changes
  - Created files/scripts
```

### 2. Update `progress.md` (if applicable)

If completed a milestone:
- Add to "Milestones Completed"
- Update "In Progress"
- Add changelog entry

---

## 🎯 Determining "significant task"

**Update Memory Bank if:**
- ✅ Created a new role or workflow
- ✅ Implemented feature (code, component, script)
- ✅ Changed architecture or patterns
- ✅ Conducted audit or analysis
- ✅ Completed a milestone

**Do not update for:**
- ❌ Small bugfixes (typos, formatting)
- ❌ Routine checklist fixes
- ❌ Translation tasks (if not first time)

---

## 🧠 Skills

Inside `.agent/skills/` you will find specialized instructions for complex tasks.
**Always check this directory** if your task involves:
- Technical SEO Audit (`technical-seo-audit.md`)
- Hardware Accuracy (`hardware-accuracy-check.md`)
- Architecture Decisions (`astro-architecture-expert.md`)
- Translation parity (`translation-integrity-check.md`)
- KPI/analytics events (`kpi-instrumentation-ga4.md`)
- Release/compliance operations (`vps-release-ops.md`, `affiliate-compliance-delta-watch.md`)
- Security audits (`security-headers-audit.md`, `dependency-supply-chain-audit.md`, `secrets-hygiene-audit.md`, `api-endpoint-security-audit.md`)

If a skill exists for your task, you **MUST** read it using `view_file`.

---

## 📋 Quick Checklist

Before starting work:

- [ ] Read `activeContext.md`
- [ ] Read `agents.md` (if first time)
- [ ] Check `progress.md` for current status
- [ ] Check `.agent/workflows/` for existing procedures
- [ ] Check `.agent/skills/` for relevant capabilities

After completing a task:

- [ ] Updated `activeContext.md` → "What Just Happened"
- [ ] (If milestone) Updated `progress.md` → "Milestones Completed" + changelog
- [ ] (If new patterns) Updated `systemPatterns.md`

---

## 🔗 Related documents

- `.memory_bank/activeContext.md` — **START HERE** (current focus)
- `.memory_bank/agents.md` — rules and hierarchy
- `.memory_bank/progress.md` — project status
- `.memory_bank/systemPatterns.md` — architectural patterns
- `.memory_bank/techContext.md` — infrastructure and constraints
- `.agent/workflows/AGENT_GUIDELINES.md` — coding standards
- `.agent/skills/` — specialized capabilities

---

## ⚠️ Important

Memory Bank is the **only** stable memory between agent sessions.

**Without updating Memory Bank:**
- The next agent won't know about your changes
- Risk of duplicate work
- Loss of context

**With updating Memory Bank:**
- Succession between agents
- Conscious decisions based on history
- Effective coordination

---

## 🗣️ Language Protocol

**Strictly follow this language rule:**
1. **Agent Instructions & Artifacts:** MUST be written in **English**.
   - Plans, Reports, Checklists, Commit Messages, Pull Requests.
2. **User Chat:** MUST be conducted in **Russian**.
   - Responses to user queries, clarifications, status updates in chat.

