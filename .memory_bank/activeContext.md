# Active Context

Текущее рабочее состояние для AI-агентов.

## Current Phase

**Roadmap Phase A: Technical Foundation + VPS Migration**

## What Just Happened

- ✅ **Lighthouse CI performance baseline gate added** (2026-03-01)
  - Added `lighthouserc.json` with assertion `categories:performance >= 0.5` for key pages (`/`, `/reviews/playstation-5-disc-slim`) as regression baseline.
  - Added `check:lighthouse` npm script and `lighthouse` job in `.github/workflows/ci.yml` after `quality`.
  - Enabled artifact upload of `.lighthouseci` reports in CI for regression debugging.
  - Added CI-hardening flags for Chrome headless execution (`--no-sandbox`, `--disable-dev-shm-usage`).
- ✅ **Hotfix for uptime workflow parse failure applied** (2026-03-01)
  - Root cause: `secrets.UPTIME_ALERT_WEBHOOK` was used directly in step `if:` in `.github/workflows/uptime-monitor.yml`.
  - Fix: removed secret from `if:` expression and moved optional webhook skip logic into shell runtime check.
  - Outcome: workflow is parse-safe; no `0 jobs` failure from invalid workflow syntax.
- ✅ **Monitoring baseline implemented for Phase A observability** (2026-03-01)
  - Added GitHub Actions workflow `.github/workflows/uptime-monitor.yml` (cron every 5 minutes + manual run).
  - Uptime probes added for `/`, `/health`, `/sitemap-index.xml`.
  - Failure path now:
    - creates/updates GitHub issue `Uptime alert: hardwarelab.org`
    - uploads probe diagnostics artifacts
    - can send optional webhook alert via `UPTIME_ALERT_WEBHOOK`.
  - Recovery path now auto-closes open uptime alert issue.
  - Added runbook: `docs/operations/monitoring-baseline.md`.
- ✅ **Go-live and rollback checklists added to deploy docs** (2026-03-01)
  - Added copy/paste `Go-Live` and `Rollback` procedures to `docs/deployment/github-vps.md`.
  - Checklists use immutable image tags (`sha-*`) and include VPS + public smoke checks.
- ✅ **Memory Bank synced after successful VPS rollout** (2026-03-01)
  - Updated infra docs to match factual runtime/deploy contract: SSR app on `:4321`, immutable GHCR tags `sha-*`, chained GitHub Actions.
  - Synced pipeline/status notes across `techContext.md`, `systemPatterns.md`, and `agents.md`.
  - Completion report prepared at `.agent/reports/coder/2026-03-01-docs-sync-post-deploy-completion.md`.
- ✅ **VPS deploy chain recovered and verified on immutable image** (2026-03-01)
  - Fixed repository secrets required for `Deploy to VPS`: `VPS_SSH_KEY`, `VPS_APP_DIR`, `VPS_HOST`, `VPS_PORT`, `GHCR_TOKEN`.
  - Verified successful GitHub Actions deploy run: `Deploy to VPS #22549588059` (status: success).
  - Confirmed runtime on VPS:
    - `hardwarelab-app` image: `ghcr.io/oleyna80/hardwarelab:sha-15e95e1d8c6f7630125babc0f5ad4521e63249c2`
    - `hardwarelab-app` status: `healthy`
    - `hardwarelab-web` status: `healthy`
  - Rollback-ready baseline pinned to known-good immutable SHA:
    - `15e95e1d8c6f7630125babc0f5ad4521e63249c2`
- ✅ **SSR deploy contract and CI/CD chain hardened** (2026-03-01)
  - Fixed build/runtime mismatch that caused `NoAdapterInstalled` in CI.
  - Set canonical runtime to Astro SSR (`output: 'server'`, `@astrojs/node`) with `GET /health` endpoint.
  - Reworked `Dockerfile` for Node SSR runtime on `:4321`.
  - Split Nginx contracts: added `nginx.proxy.conf` (reverse proxy) and converted `nginx.conf` to static-only legacy config.
  - Enforced immutable deployment source (`sha-*`) and workflow chain:
    - `CI` -> `Docker Publish` (`workflow_run`)
    - `Docker Publish` -> `Deploy to VPS` (`workflow_run`)
  - Updated deploy contract files: `.env.vps.example`, `docker-compose.vps.yml`, `deploy.sh`, `docs/deployment/github-vps.md`.
  - Validation: `npx astro check` ✅, `npm run build` ✅.
- ⚠️ **Coder run blocked by missing task context** (2026-03-01)
  - Incoming path `/home/dmitrii/projects/hardwarelab-site` not found in WSL.
  - Incoming request left placeholders unresolved: `<вставь TASK>`, `<вставь путь к plan.md>`.
  - Safe fallback executed: no product/code changes, blocker logged in `.memory_bank/agent-log.md`, completion report created at `.agent/reports/coder/2026-03-01-missing-task-context-completion.md`.
- ✅ **Researcher PASS B completed for TERRAMASTER NAS review** (2026-02-10)
  - Slug: `terramaster-f4-424-pro`
  - Created production EN review: `src/content/reviews/en/terramaster-f4-424-pro/index.mdx`
  - Generated assets:
    - `src/content/reviews/en/terramaster-f4-424-pro/image.webp`
    - `src/content/reviews/en/terramaster-f4-424-pro/og.png`
  - Validation:
    - `npm run check:researcher-output -- terramaster-f4-424-pro` ✅
    - `npm run build` ✅
- ✅ **Bootstrap scaffold created for TERRAMASTER NAS review** (2026-02-10)
  - Product: `TERRAMASTER F4-424 Pro NAS Storage`
  - Category: `nas`
  - Created folder: `src/content/reviews/en/terramaster-f4-424-pro/`
  - Created files:
    - `src/content/reviews/en/terramaster-f4-424-pro/_research-pack.md`
    - `src/content/reviews/en/terramaster-f4-424-pro/_draft.mdx`
- ✅ **Bootstrap scaffold created for new NAS review** (2026-02-09)
  - Product: `UGREEN NASync DXP4800 Plus 4-Bay NAS (Intel N100)`
  - Category: `nas`
  - Created folder: `src/content/reviews/en/ugreen-nasync-dxp4800-plus-4-bay/`
  - Created files:
    - `src/content/reviews/en/ugreen-nasync-dxp4800-plus-4-bay/_research-pack.md`
    - `src/content/reviews/en/ugreen-nasync-dxp4800-plus-4-bay/_draft.mdx`
- ✅ **Skills audit + operational skills pack updated** (2026-02-08)
  - Kept `.roo/skills/*` untouched (RooCode-owned scope).
  - Fixed `.agent/skills/webapp-testing/SKILL.md` (removed broken `scripts/with_server.py` dependency).
  - Added new skills:
    - `.agent/skills/affiliate-compliance-delta-watch.md`
    - `.agent/skills/vps-release-ops.md`
    - `.agent/skills/kpi-instrumentation-ga4.md`
    - `.agent/skills/translation-integrity-check.md`
  - Wired new skills into active roles/workflows (tech-lead, coder, translator, qa, prepublish gate, vps runbook).
- ✅ **Agent efficiency tooling added** (2026-02-08)
  - Added skills lint: `npm run lint:agent-skills` (`scripts/lint-agent-skills.mjs`).
  - Added task routing matrix: `.agent/workflows/task-routing.md`.
  - Added role task templates: `.agent/templates/*`.
  - Added review package smoke-check: `npm run check:review-package -- <slug>` (`scripts/check-review-package.mjs`).
  - Added CI guard workflow: `.github/workflows/agent-guards.yml`.
- ✅ **Lean docs cleanup + governance add-ons completed** (2026-02-08)
  - Marked all legacy role files as `DEPRECATED` to avoid accidental default usage.
  - Moved full legacy role specs to `.agent/roles/archive/` and kept compatibility aliases in `.agent/roles/`.
  - Added canonical KPI file: `.memory_bank/kpi-framework.md`.
  - Added pre-publish compliance gate: `.agent/workflows/prepublish-affiliate-gate.md`.
  - Updated compliance report template for final gate usage.
- ✅ **Lean agent team adopted** (2026-02-08)
  - Active team fixed to 6 roles: `tech-lead`, `coder`, `single-researcher` (external), `researcher`, `translator`, `qa`.
  - Content pipeline simplified to: `single-researcher -> researcher -> translator -> qa`.
  - Illustration ownership moved to `researcher` via `visual-asset-generator` skill.
- ✅ **Agent documentation consistency pass** (2026-02-08)
  - Synced role/workflow conventions (`tech-auditor.md`, `image.webp`, QA-Code report path).
  - Added canonical docs: `.agent/AGENT_CONTRACT.md`, `.agent/workflows/vps-migration-runbook.md`.
  - Added docs lint automation: `npm run lint:agent-docs`.
- ✅ **Audit P0 fixes implemented** (2026-01-30)
  - Localized review pages now pass lang/meta/review schema and removed debug logs
  - Added Product/Review JSON-LD and region-aware Amazon links in ProductHeader
  - Coder report: `.agent/reports/coder/2026-01-30-audit-p0-fixes-completion.md`
- ✅ **Audit fix plan drafted** (2026-01-30)
  - Plan for P0/P1 remediation created
  - Report: `.agent/reports/tech-lead/2026-01-30-codebase-audit-plan.md`
- ✅ **Codebase audit completed** (2026-01-30)
  - Tech lead audit report created with SEO, affiliate, and i18n findings
  - Report: `.agent/reports/tech-lead/2026-01-30-codebase-audit.md`
- ✅ **Review Update Pipeline Verified** (2026-01-13)
  - Successfully modernized `beelink-ser5-5500u` review
  - Validated legacy flow (pre-lean): Research → Copywriter → Art Director → Translator → QA
  - Confirmed regional ASINs and asset copying scripts work in production
- ✅ **Agent documentation audit completed** (2026-01-13)
  - Created Art Director role with OG image branding
  - Automated asset copying via script
  - Updated master_prompt for multi-agent workflow
  - Rewrote review-creation-full.md as orchestration doc
  - Automated existing reviews list updates
- ✅ **Regional ASIN support implemented** (2026-01-13)
  - Updated `src/config.ts` with regional domains/tags
  - Updated `AffiliateButton.astro` to use language-aware URLs
  - Verified by QA-Code (Build PASS, Compliance PASS)
- ✅ **Image Optimization System Implemented** (2026-01-14)
  - Created `scripts/optimize-images.mjs` (auto-fixes formats and sizes)
  - Created `scripts/audit-images.mjs` (lint check)
  - Updated Art Director role to mandate optimization before handoff
  - Added `npm run lint:images` to CI checks
  - Fixed 14 critical image issues (saved ~20MB)
- ✅ **Bootstrapped new review folder** (2026-01-18)
  - Created `src/content/reviews/en/dell-alienware-aw3225qf/` skeleton for Researcher PASS A
  - Created `src/content/reviews/en/gigabyte-aorus-fo32u2p/` skeleton for Researcher PASS A
  - Created `src/content/reviews/en/samsung-57-odyssey-neo-g9-g95nc/` skeleton for Researcher PASS A
- ✅ **Art Director assets prepared** (2026-01-18)
  - Created `src/content/reviews/en/dell-alienware-aw3225qf/image.webp` (hero, 1200x675)
  - Updated `src/content/reviews/en/dell-alienware-aw3225qf/og.png` (1200x630) with subtle “HardwareLab” branding
  - Ran `node scripts/optimize-images.mjs` and verified `node scripts/audit-images.mjs` passes
- ✅ **Hero Image Fixes & Rebranding** (2026-01-26)
  - Fixed broken hero images for Mac mini M4 Pro, Xbox Series X, PS5 Slim, Raspberry Pi 5.
  - Renamed `intel-nuc-13-pro` to `asus-intel-nuc-13-pro` with full link updates (20+ files).
  - Created `Visual Asset Generator` skill (`.agent/skills/visual-asset-generator/`) for standardized image creation.
  - Updated workflows (`content-creation`, `review-creation-full`, `review-update`) to enforce skill usage.

## Current Focus

1. **Phase A delivery (VPS migration)** — finish technical migration by 2026-03-31.
2. **Deployment hardening** — backup/restore drill, monitoring, rollback readiness.
3. **CI baseline** — build + affiliate + image lint + lighthouse + agent docs/roles/skills lint + review package smoke-check.

## Next Priority

- Execute backup/restore drill from `.agent/workflows/vps-migration-runbook.md` and capture timings.
- Wire and validate external uptime alert delivery (`UPTIME_ALERT_WEBHOOK`).

## Quick Reference

| Need to... | Look at... |
|------------|-----------|
| Понять цели проекта | `projectbrief.md` |
| Дорожная карта | `roadmap.md` |
| KPI-метрики | `kpi-framework.md` |
| Каноничные агент-правила | `.agent/AGENT_CONTRACT.md` |
| Compliance pre-publish gate | `.agent/workflows/prepublish-affiliate-gate.md` |
| Ограничения сервера | `techContext.md` |
| Архитектура кода | `systemPatterns.md` |
| Статус задач | `progress.md` |
| Правила для агентов | `agents.md` |
| Старые отчёты | `archive/` |

---

## Связанные документы

← [projectbrief.md](projectbrief.md) — цели и рамки  
← [productContext.md](productContext.md) — аудитория  
← [techContext.md](techContext.md) — инфраструктура
