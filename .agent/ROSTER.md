# .agent/ROSTER.md — Agent & Skill Registry

> Routing table for agents and skills. Authority model: Control Tower
> (plan/sync), Scoped Coder (execute), Verifier (independent check),
> Reviewer (read-only analysis), Critic (pre-implementation decision review).

---

## Agents

| Agent | Slug (`.claude/agents/`) | Role | Authority |
|---|---|---|---|
| **Control Tower** | — (main chat) | Orchestration, planning, SSOT | Plan approval, scope gate, closeout |
| **Scoped Coder** | `scoped-coder` | Implementation executor | Write approved write-set only |
| **Reviewer** | `reviewer` | Read-only analyst | Code audit, security triage, feedback |
| **Verifier** | `verifier` | Acceptance gate | READY/BLOCKED verdict, halts pipeline |
| **Critic** | `critic` | Decision reviewer | Pre-WB quality gate, SUPPLEMENT/RECONSIDER |
| **GPT Critic** | `gpt-critic` | External adversarial critic | Second-opinion on CT decisions |
| **GPT Verifier** | `gpt-verifier` | External adversarial verifier | Second-opinion on implementation |
| **Solution Architect** | `solution-architect` | Pre-implementation research | Read-only, design/stack decisions |

---

## Content Pipeline Roles

| Role | File | Responsibility |
|---|---|---|
| `tech-lead` | `.agent/roles/tech-lead.md` | Architecture, planning, code review |
| `coder` | `.agent/roles/coder.md` | Implementation |
| `single-researcher` | `.agent/roles/single-researcher.md` | External product research (PASS A) |
| `researcher` | `.agent/roles/researcher.md` | EN review writing + visual assets |
| `translator` | `.agent/roles/translator.md` | FR / DE / RU translations |
| `qa` | `.agent/roles/qa.md` | Final content + compliance gate |

Content pipeline: `single-researcher → researcher → translator → qa`

---

## Installed Skills

| # | Skill | Triggers | Mode | Location |
|---|---|---|---|---|
| 1 | **visual-asset-generator** | "generate image", "create og.png", "create image.webp" | Asset generation | `.agent/skills/visual-asset-generator/` |
| 2 | **webapp-testing** | QA, smoke tests, visual regression | Browser tests, acceptance | `.agent/skills/webapp-testing/` |
| 3 | **frontend-design** | UI component work, Astro/Tailwind design changes | Implementation | `.agent/skills/frontend-design/` |
| 4 | **skill-creator** | Creating new skills | Skill curation | `.agent/skills/skill-creator/` |
| 5 | **affiliate-compliance-delta-watch** | Affiliate link audit, compliance changes | Audit | `.agent/skills/affiliate-compliance-delta-watch.md` |
| 6 | **hardware-accuracy-check** | Review content accuracy, spec validation | Content QA | `.agent/skills/hardware-accuracy-check.md` |
| 7 | **seo-content-structure** | SEO audit, meta tags, structured data | SEO | `.agent/skills/seo-content-structure.md` |
| 8 | **technical-seo-audit** | Technical SEO, Core Web Vitals, sitemap | SEO | `.agent/skills/technical-seo-audit.md` |
| 9 | **translation-integrity-check** | Translation quality gate | Content | `.agent/skills/translation-integrity-check.md` |
| 10 | **vps-release-ops** | VPS deploy, Docker, release | Ops | `.agent/skills/vps-release-ops.md` |
| 11 | **narrative-strategy** | Review narrative, tone, story arc | Content | `.agent/skills/narrative-strategy.md` |
| 12 | **journalistic-hook-mastery** | Hooks, intros, lede writing | Content | `.agent/skills/journalistic-hook-mastery.md` |
| 13 | **integrator-tone-voice** | Brand tone consistency | Content | `.agent/skills/integrator-tone-voice.md` |

---

## Engineering Skills (Not Installed — Port from azursystech When Needed)

Available at `/home/azur/Projects/WSL/azursystech/.agent/skills/`:

| Skill | Triggers | When to port |
|---|---|---|
| **discovery** | "research before coding", "best stack/API", "code map" | Pre-implementation research for complex features |
| **security-pass** | "pentest report", auth/payments/security changes | Any security Work Block |
| **memory-ops** | "log decision", "sync closeout", "housekeep memory" | SSOT sync and memory management |
| **git-safety** | "commit these files", merge conflicts, multi-agent done | Any commit with 2+ agents |
| **systematic-debugging** | Debugging, error isolation | Complex debugging sessions |
| **subagent-mission-brief** | Subagent dispatch, mission framing | Multi-agent Work Blocks |
| **sprint-analysis** | "analyse sprint", velocity review, retro | Sprint retrospectives |

To install: copy skill directory from azursystech into `.agent/skills/`, open a skill-curation Work Block.

---

## Quick Skill Routing

| Brief | → Skill | Agent |
|---|---|---|
| "generate hero image" | visual-asset-generator | researcher |
| "check affiliate links" | affiliate-compliance-delta-watch | Reviewer |
| "validate hardware specs" | hardware-accuracy-check | Reviewer |
| "SEO review" | seo-content-structure | Reviewer |
| "deploy to VPS" | vps-release-ops | Control Tower + Scoped Coder |
| "QA translation" | translation-integrity-check | qa |
| "smoke test" | webapp-testing | Verifier |
| Code review | reviewer agent | Reviewer |
| Implementation | scoped-coder agent | Scoped Coder |
| Pre-commit verification | verifier agent | Verifier |

---

## Model Routing

| Task Class | Model | Rationale |
|---|---|---|
| Discover/Explore | `haiku` | Fast, cheap research |
| Implement/Code/Verify | `sonnet` | Capable, cost-effective |
| Architect/Hard Decisions | `opus` | Strong reasoning |

---

**This ROSTER is canonical for "which skill?" and "who decides?"**
**All implementation and approval flows through Control Tower → Scoped Coder → Verifier.**
