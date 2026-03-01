# Active Context

Текущее рабочее состояние для AI-агентов.

## Current Phase

**Roadmap Phase A: Technical Foundation + VPS Migration**

## What Just Happened

- ✅ **Deploy contract defaults fixed (manual VPS deploy path)** (2026-03-01)
  - Updated `deploy.sh` with deterministic default `IMAGE_REPO=ghcr.io/oleyna80/hardwarelab-site` and exported `IMAGE_REPO` for compose pull/up.
  - Updated `.env.vps.example` with explicit `IMAGE_REPO` and `IMAGE_TAG`.
  - Updated `docs/deployment/backup-restore-runbook.md` smoke checks to current production topology (no `localhost:8081` dependency; use `docker compose ps` + external HTTPS check) and added explicit `docker login ghcr.io` restore step.
  - Synced `.memory_bank/techContext.md` to current compose topology: `hardwarelab-web` is internal-only and `8081` is not published in active VPS compose.
  - Posted status response to `@tech-lead` in `.memory_bank/agent-log.md`.
  - Validation blocker discovered:
    - `docker pull ghcr.io/oleyna80/hardwarelab-site:latest` returns `denied` on VPS (no GHCR auth configured), so `./deploy.sh` cannot be fully validated end-to-end yet.
  - Completion report:
    - `.agent/reports/coder/2026-03-01-deploy-contract-fix-completion.md`

- ✅ **Backup/restore runbook and drill completed** (2026-03-01)
  - Added backup script: `scripts/backup-env.sh` (executable) for timestamped `.env` archives.
  - Added runbook: `docs/deployment/backup-restore-runbook.md`.
  - Updated `.gitignore` with `backups/` to avoid committing drill artifacts.
  - Executed real drill cycle: backup -> `.env` loss simulation -> restore -> redeploy -> smoke verification.
  - Measured RTO: **226 seconds** (~3m 46s), within target `< 15 minutes`.
  - Completion report:
    - `.agent/reports/coder/2026-03-01-backup-restore-drill-completion.md`

- ✅ **Removed `asin` from public latest-reviews feed** (2026-03-01)
  - Updated `src/pages/api/latest-reviews.json.ts` to remove `asin` from `/api/latest-reviews.json` response items.
  - Verified with:
    - `npx astro check` ✅ (`0 errors`)
    - local dev + `curl http://127.0.0.1:4321/api/latest-reviews.json` ✅ (no `asin` key present)
  - Report:
    - `.agent/reports/coder/2026-03-01-feed-asin-removal-completion.md`

- ✅ **Security audit completed with hardening fixes** (2026-03-01)
  - Completed code-level audit across API, nginx, env/secrets, dependencies, attack surface, and container security.
  - Implemented hardening fixes:
    - `src/pages/api/contact.ts`: stream-level body-size enforcement, webhook host allowlist, no `unknown` IP rate-limit bypass, stricter `sec-fetch-site`, bidi sanitization.
    - `nginx.conf`: narrowed trusted proxy network, reduced `client_max_body_size`, added missing security header and explicit CSP directives.
    - `docker-compose.vps.yml` + `.env.vps.example`: secure default `TURNSTILE_ENFORCE=true`; added `N8N_WEBHOOK_ALLOWED_HOSTS`.
  - Dependency remediation:
    - ran `npm audit fix` and reduced vulnerabilities from `1 critical + 3 high` to `0 critical + 0 high`;
    - `npm audit --omit=dev --audit-level=moderate` now returns `0 vulnerabilities`.
  - Reports:
    - Task: `.agent/reports/tech-lead/2026-03-01-security-audit-codex-task.md`
    - Completion: `.agent/reports/coder/2026-03-01-security-audit-completion.md`

- ✅ **Drafted locale-aware translation routing SEO plan** (2026-02-26)
  - Added Tech Lead handoff plan for sparse locale review support:
    - dynamic review-locale availability for `hreflang`,
    - switcher fallback to locale root for missing localized review files,
    - selective locale mode for `check-review-package`.
  - Plan file:
    - `.agent/reports/tech-lead/2026-02-26-translation-routing-seo-plan.md`

- ✅ **Agent/docs sync with live stack completed** (2026-02-26)
  - Normalized locale references to live matrix `en/fr/de/ru/es/it` across canonical docs (`AGENT.md`, `README.md`, `AGENT_GUIDELINES`, `systemPatterns`, `projectbrief`, `roadmap`, `tech-lead` role).
  - Replaced stale infrastructure constraints (`512MB`) with current VPS/container envelope from `techContext.md`.
  - Updated deployment flow wording in `systemPatterns.md` to current production path (`deploy.sh` + `docker-compose.vps.yml`), removing stale `--build on VPS` phrasing.

- ✅ **n8n Topic Scout got automatic ASIN exclusion source** (2026-02-24)
  - Updated `daily_review_topic_scout_workflow_with_tavily.json`:
    - `ASIN Exclusions File` now auto-loads blacklist from GitHub via API using env:
      - `GITHUB_REPO`
      - `GITHUB_BRANCH`
      - `GITHUB_ASIN_EXCLUSIONS_PATH`
    - `PASS A Gate` already consumes `asin_exclusions` and blocks excluded ASINs.
  - Added canonical exclusions file:
    - `agent-inbox/exclusions/asin-exclusions.txt`
  - Added env pointer in n8n runtime:
    - `GITHUB_ASIN_EXCLUSIONS_PATH=agent-inbox/exclusions/asin-exclusions.txt`

- ✅ **Sprint 1 Distribution Foundation artifacts reviewed and hardened** (2026-02-24)
  - Reviewed `latest-reviews` feed, UTM conventions, and n8n workflow v1.
  - Fixed localized URL generation in `src/pages/api/latest-reviews.json.ts` and added feed fields (`lang`, `slug`, `path`) for deterministic campaign building.
  - Fixed UTM convention inconsistencies (kebab-case mediums + corrected EN route examples).
  - Hardened n8n draft workflow:
    - deterministic dedup via workflow static state (`lastPostedAt`),
    - corrected UTM campaign generation to use review slug,
    - replaced invalid DeepSeek node payload with explicit HTTP POST contract.
  - Validation:
    - `npm run check:types` ✅
    - `npm run lint:agent-docs` ✅

- ✅ **Growth strategy documented and synced with roadmap** (2026-02-24)
  - Formalized `WHAT/HOW` execution plan in `docs/promotion_ideas.md` with priority ladder `P0/P1/P2`.
  - Updated `.memory_bank/roadmap.md` with concrete growth initiatives:
    - `P0`: Distribution OS v1 (Astro feed -> n8n -> Telegram/X)
    - `P0/P1`: Product & Intent Hubs
    - `P1`: Content Refresh Engine + schema validation fail-gate
    - `P2`: Micro-tools as linkable assets
  - Synced roadmap changelog and last-updated date to `2026-02-24`.

- ✅ **VPS infrastructure documented + 502 incident fixed** (2026-02-24)
  - **Root cause:** `hardwarelab-site-web-1` was not in `npm_default` network → NPM could not resolve `hardwarelab-web` hostname → 502.
  - **Hotfix applied:** `docker network connect npm_default hardwarelab-site-web-1 --alias hardwarelab-web`
  - **Created `deploy.sh`** — always uses `docker-compose.vps.yml`; prevents accidental use of dev compose file on VPS.
  - **Created `.nvmrc`** — locks Node.js to v20 (LTS Iron).
  - **Updated `techContext.md`** — added Docker network topology diagram, port map, agent safety rules (CAUTION: no `npm run build` on VPS, no `docker-compose.yml` on production).
- ✅ **`single-researcher` role fully synced with current production stack** (2026-02-19)
  - Rewrote `.agent/roles/single-researcher.md` to v3 with strict alignment to current schema and affiliate routing:
    - `asin` required + `amazonUrl` optional (OneLink/`amzn.to` priority),
    - active locale matrix (`en/fr/de/ru/es/it`),
    - mandatory DE/FR ASIN mapping for translation compatibility + optional IT/ES/UK.
  - Hardened PASS A output contract/template to prevent non-pipeline artifacts and unresolved short-link ambiguity.
  - Validation passed:
    - `npm run lint:agent-roles` ✅
    - `npm run lint:agent-docs` ✅
- ✅ **Documentation synced with current CI/CD and deployment reality** (2026-02-18)
  - Updated Memory Bank docs to reflect configured GitHub Actions workflows.
  - Fixed stale "CI not configured" status blocks in technical docs.
  - Confirmed current operational mode: direct deployment on VPS.
- ✅ **Configured Google Analytics 4 (GA4)** (2026-02-17)
  - Integration: Partytown (Zero JS impact on main thread).
  - Component: `src/components/head/Analytics.astro`.
  - Config: `G-9HCX6B2JWV` (default) or `PUBLIC_GA_ID`.
  - Verification: Build Passed.
- ✅ **Implemented Google Consent Mode v2** (2026-02-17)
  - Components: `CookieBanner.astro` + Inline Scripts.
  - Features: Default denied, LocalStorage persistence, Dynamic updates.
  - Status: Deployed to local VPS.
- ✅ **Fixed missing categories on /categories page** (2026-02-12)
  - Added missing categories: `monitors`, `gaming-pcs`, `ai-workstation`
  - Changed `consoles` slug to `gaming` to match schema
  - Updated stats counter from 4 to 7 categories
  - File modified: `src/pages/categories/index.astro`
  - Verification: Requires manual `npm run build` and browser testing
- ✅ **VPS Migration Completed** (2026-02-12)
  - Phase A milestone: WSL → VPS migration complete
  - Production site running on VPS infrastructure
  - Next: Deployment hardening and monitoring setup
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

1. **Phase A hardening completion** — backup/restore drill, monitoring, rollback readiness by 2026-03-31.
2. **Operational stability on direct VPS deploy** — maintain repeatable release procedure on current infrastructure.
3. **CI baseline parity** — keep checks aligned between GitHub Actions and direct VPS deployment flow.

## Next Priority

- Run backup/restore drill and capture recovery evidence
- Validate monitoring alerts and rollback rehearsal on VPS

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
