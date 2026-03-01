# Progress

Consolidated project status and milestones.

## Current Status

**Phase**: Roadmap Phase A — Technical Foundation + VPS Migration  
**Last Updated**: 2026-03-01

## Milestones Completed

### ✅ Uptime Alert-Test Mode Added (Mar 1, 2026)
- Added safe synthetic alert mode (`alert_test_mode=true`) to `.github/workflows/uptime-monitor.yml`.
- Synthetic mode forces failure path after successful probes to validate alert delivery logic.
- Synthetic mode skips incident issue lifecycle to avoid false positives in issue tracker.
- Updated monitoring runbook with dedicated command for webhook validation.

### ✅ Lighthouse CI Baseline Gate Activated (Mar 1, 2026)
- Added `lighthouserc.json` with baseline performance assertion (`categories:performance >= 0.5`) for key pages.
- Added `check:lighthouse` npm script and CI `lighthouse` job (`needs: quality`).
- Added Lighthouse report artifact upload (`.lighthouseci`) for failed/successful CI diagnostics.
- Added Chrome runtime hardening flags in LHCI config for containerized CI stability.
- Captured current baseline for `/`: `0.53` (local run with Playwright Chromium).

### ✅ Observability Baseline Activated (Mar 1, 2026)
- Added scheduled uptime workflow (`Uptime Monitor`) every 5 minutes.
- Probes cover `/`, `/health`, `/sitemap-index.xml`.
- Failure path now records diagnostics (headers/body snippets + summary artifact).
- Alert path now opens/updates GitHub issue and can send optional webhook (`UPTIME_ALERT_WEBHOOK`).
- Recovery path auto-closes active uptime alert issue.

### ✅ SSR Deploy Contract + CI/CD Chain (Mar 1, 2026)
- Astro runtime contract switched to SSR (`output: 'server'`, `@astrojs/node`)
- Added health endpoint: `GET /health`
- Docker runtime aligned to Node SSR on `:4321`
- CI/CD chain fixed to `CI -> Docker Publish -> Deploy to VPS` (workflow_run)
- Immutable deploy source enforced (`sha-*`; `latest` rejected for deploy)
- Production deploy recovered and verified on VPS
- Known-good image SHA pinned: `15e95e1d8c6f7630125babc0f5ad4521e63249c2`

### ✅ Site Build (Completed)
- 25+ pages generated
- Build time: ~7 seconds
- Static output to `dist/`

### ✅ Internationalization (Completed)
- 4 languages: English, French, Russian, German
- Folder-based routing
- Language switcher functional

### ✅ SEO Audit (Jan 9, 2026)
- Added `@astrojs/sitemap` integration
- Implemented `SEO.astro` component
- Added canonical URLs, hreflang tags
- Open Graph + Twitter Card meta tags
- JSON-LD structured data (basic)

### ✅ Docker Production Config (Completed)
- Multi-stage Dockerfile aligned with Astro SSR runtime (`:4321`)
- `docker-compose.vps.yml` + `nginx.proxy.conf` aligned with reverse-proxy contract
- Immutable deploy source via GHCR `sha-*` tags

### ✅ Affiliate Compliance (Completed)
- Environment variables for Amazon tags
- `rel="nofollow sponsored noopener noreferrer"` on links
- Disclosure in footer
- Compliance check script: `npm run check:affiliate`

### ✅ Category Expansion (Jan 8, 2026)
- Added 7 new categories: Gaming, Monitors, AI Workstations, etc.
- Build type reviews (`/builds/[slug]`)
- Updated navigation

### ✅ Memory Bank System (Jan 9, 2026)
- Created 7 core files + ui_extension + content-specs
- 37+ documentation files
- Rule Zero established

### ✅ CI/CD Historical Baseline (Jan 9, 2026)
- Legacy state before migration: no CI configured, manual deployment only.
- Superseded by Mar 1, 2026 milestones (`SSR Deploy Contract + CI/CD Chain`, `Observability Baseline`).

### ✅ Multi-Agent Documentation Audit (Jan 13, 2026)
- Created Art Director role (`.agent/roles/art-director.md`)
- OG image now includes HardwareLab branding
- Automated asset copying (`scripts/copy-assets-to-translations.mjs`)
- Automated reviews list updates (`scripts/update-existing-reviews.mjs`)
- Updated `master_prompt_v_1_3_0.md` for multi-agent workflow
- Rewrote `review-creation-full.md` as orchestration document
- Planned regional ASIN support (Tech Lead plan ready)
- Updated 10-role pipeline: Bootstrap → ... → Art Director → QA → Translator

## In Progress

- [ ] Phase A hardening: backup/restore drill + documented rollback rehearsal
- [ ] Backup/restore runbook + recovery test
- [ ] Monitoring hardening: add `UPTIME_ALERT_WEBHOOK` secret and validate notification delivery (`alert_test_mode=true`)
- [ ] OG image generation for existing reviews
- [ ] Finish LG 39GX90SA-W review

## Backlog

- [ ] Image optimization (migrate to `astro:assets Image`)
- [ ] Full JSON-LD Schema.org (Product, Review types)
- [ ] Breadcrumb schema
- [ ] Lighthouse score optimization (target >90)

## Roadmap Alignment

- Canonical roadmap: `.memory_bank/roadmap.md`
- Current execution window: **Phase A (Technical Foundation + VPS Migration)**

## Candidates for Cleanup

| File | Issue | Action |
|------|-------|--------|
| `debug-collections.js` (root) | Debug file in production | Move to scripts/ or delete |
| `scripts/debug-reviews.js` | Small debug utility | Review if needed |

---

## Changelog

### 2026-03-01: Observability Baseline Added

**Changed:**
- Added `.github/workflows/uptime-monitor.yml` with 5-minute probes for production endpoints.
- Added failure diagnostics artifact for probe failures.
- Added auto issue alert lifecycle (open/update on failure, close on recovery).
- Added optional webhook alert support via `UPTIME_ALERT_WEBHOOK`.
- Added monitoring runbook: `docs/operations/monitoring-baseline.md`.

### 2026-03-01: Uptime Webhook Validation Mode Added

**Changed:**
- Added `alert_test_mode` input in `.github/workflows/uptime-monitor.yml`.
- Added synthetic failure path for safe external alert testing without real outage.
- Suppressed issue create/close lifecycle in test mode.
- Updated `docs/operations/monitoring-baseline.md` with test command and expected behavior.

### 2026-03-01: Lighthouse CI Baseline Gate Added

**Changed:**
- Added `lighthouserc.json` with baseline performance assertions and CI-focused Chrome flags.
- Added `check:lighthouse` script in `package.json`.
- Added `lighthouse` job to `.github/workflows/ci.yml` and Lighthouse artifact upload.

### 2026-03-01: SSR Deploy Stabilization + Immutable Rollout

**Changed:**
- Canonicalized runtime to Astro SSR in production (`@astrojs/node`, `:4321`, `/health`).
- Aligned Docker/runtime/compose contracts to SSR.
- Switched deploy flow to immutable image tags (`sha-*`) and chained workflows (`CI -> Docker Publish -> Deploy`).
- Fixed deployment blockers caused by missing GitHub repository secrets and invalid SSH host/key setup.
- Verified successful deploy on VPS and recorded known-good SHA for rollback.

### 2026-02-08: Agent Efficiency Pass (Routing + Templates + CI Guards)

**Added:**
- `scripts/lint-agent-skills.mjs` + `npm run lint:agent-skills`
- `scripts/check-review-package.mjs` + `npm run check:review-package -- <slug>`
- `.agent/workflows/task-routing.md`
- `.agent/templates/{tech-lead-task,coder-task,researcher-task,qa-task}.md`
- `.github/workflows/agent-guards.yml`

**Changed:**
- Updated QA/prepublish/deployment/runbook docs to include smoke-check and skills lint gates.
- Updated README and contract-level references for new agent operations flow.

### 2026-02-08: Skills Audit + Operational Pack

**Changed:**
- Confirmed `.roo/skills/*` are RooCode-managed and kept unchanged.
- Fixed `.agent/skills/webapp-testing/SKILL.md` to match current repo tooling.
- Added new operational skills:
  - `.agent/skills/affiliate-compliance-delta-watch.md`
  - `.agent/skills/vps-release-ops.md`
  - `.agent/skills/kpi-instrumentation-ga4.md`
  - `.agent/skills/translation-integrity-check.md`
- Updated active role/workflow references to use new skills.

### 2026-02-08: Lean Docs Cleanup + Governance Add-ons

**Changed:**
- Marked legacy role docs as `DEPRECATED` to prevent accidental default routing.
- Moved full legacy role specs to `.agent/roles/archive/` and replaced old paths with alias stubs.
- Added canonical KPI document: `.memory_bank/kpi-framework.md`.
- Added final compliance workflow: `.agent/workflows/prepublish-affiliate-gate.md`.
- Updated compliance report template: `.agent/reports/compliance/_template.md`.
- Added role-policy lint: `npm run lint:agent-roles` (`scripts/lint-agent-roles.mjs`).
- Synced references in README, AGENT_CONTRACT, AGENT_GUIDELINES, and core workflows.

### 2026-02-08: Lean Team Adoption

**Changed:**
- Active agent team reduced to 6 roles.
- Content workflow simplified to `single-researcher -> researcher -> translator -> qa`.
- Visual generation responsibility moved into `researcher` role via skills.

### 2026-02-08: Documentation Consistency Audit (Agents)

**Changed:**
- Synced role/workflow references (`tech-auditor.md`, `image.webp`, QA-Code report path).
- Added canonical roadmap linkage and updated current phase to Phase A (VPS migration).
- Removed duplicated/obsolete "In Progress" items and aligned with roadmap priorities.

### 2026-01-13: Multi-Agent Documentation Overhaul

**Added:**
- `.agent/roles/art-director.md` — autonomous image generation role with branding
- `scripts/copy-assets-to-translations.mjs` — automated asset copying for translations
- `scripts/update-existing-reviews.mjs` — auto-update existing reviews list
- `.agent/reports/tech-lead/2026-01-13-regional-asin-plan.md` — regional ASIN implementation plan
- OG image branding requirement (HardwareLab text on social media previews)

**Changed:**
- `prompts/master_prompt_v_1_3_0.md` — added multi-agent pipeline section, separated Researcher (web search) from Copywriter (no web search)
- `.agent/workflows/review-creation-full.md` — rewrote as orchestration document for 10-role pipeline
- `.agent/roles/editor.md` — handoff now goes to Art Director instead of QA
- `.agent/roles/translator.md` — now uses script for asset copying, allowed regional ASIN substitution
- `.agent/roles/qa.md` — added step 5 (update existing reviews list), added ogImage check
- `.agent/roles/README.md` — added Art Director to content pipeline
- All EN review frontmatter — added `ogImage: "./og.png"` field

**Verified:**
- Successfully modernized `beelink-ser5-5500u` using new `review-update.md` workflow
- Validated build passing with 4 languages and full asset sync

**Resolved Issues:**
1. ✅ Art Director role (images generated before QA)
2. ✅ Asset copying automation (script replaces manual work)
3. ✅ Master prompt contradictions (multi-agent clarification)
4. ✅ Workflow documentation outdated (full rewrite)
5. ✅ Existing reviews list manual updates (automated via QA)
6. ✅ Regional ASIN planning (ready for implementation)
7. ✅ OG image not checked or branded (now mandatory with branding)
8. ✅ Hero image missing in translations (fixed imports and ReviewHero logic)
9. ✅ French Amazon link redirection (fixed locale passing)

### 2026-01-09: Memory Bank Implementation

**Added:**
- 7 core Memory Bank files (projectbrief, productContext, techContext, systemPatterns, activeContext, progress, agents)
- `ui_extension/` — 14 files (page templates, component docs)
- `content-specs/` — 8 files (7 category specs)
- `other/customization.md` — config analysis

**Changed:**
- `README.md` — complete rewrite with architecture overview
- Archived 7 legacy reports to `archive/`

**Verified:**
- CI/CD status (manual Docker deployment)
- No GitLab/GitHub Actions configured

---

## Контроль изменений

| Поле | Значение |
|------|----------|
| Последний проверенный коммит | `15e95e1d8c6f7630125babc0f5ad4521e63249c2` |
| Дата проверки | 2026-03-01 |

> После появления новых коммитов сравни с `git log <last_checked_commit>..` и обнови этот раздел.
