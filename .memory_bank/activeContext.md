# Active Context

Текущее рабочее состояние для AI-агентов.

## Current Phase

**Roadmap Phase A: Technical Foundation + VPS Migration**

## What Just Happened

- ✅ **single-researcher role contract aligned with real PASS A outputs** (2026-03-20)
  - Updated `.agent/roles/single-researcher.md` to require `hardware-accuracy-check` and normalize legacy `consoles` input to canonical `gaming` for new work.
  - Clarified PASS A exception path for products without an exact amazon.com listing (`ASIN_US: absent` with verified non-US primary marketplace).
  - Synced the role template with actual research-pack fields used in production (`ASIN_PRIMARY`, primary region, affiliate routing inputs, nullable rating fallback).
  - Normalized quote-count policy across PASS A/PASS B docs to `4-6`, with `minimum 4` and `preferred 6`.
  - Synced PASS B validation docs with the same non-US-primary ASIN exception to avoid rejecting valid packs during researcher intake.
  - Synced remaining prompt/workflow docs (`master_prompt`, `review-workflow-two-pass`, `content-creation`) to the same primary-marketplace ASIN contract and quote-count policy.
  - Updated `asin-hunter-protocol.md` to the same primary-marketplace rule so PASS A discovery no longer assumes `EN => amazon.com` as a hard requirement.
  - Normalized quote-source policy across active prompts: verbatim quotes may come from Reddit, forums, or Amazon customer reviews, with direct permalinks and attributable users.
  - Normalized category input contract: external PASS A now consistently requires explicit `CATEGORY`; auto-detection is documented only as internal/single-agent fallback.
  - Split EN article readiness from EU translation/monetization readiness so missing EU ASINs no longer block an otherwise valid EN research pack.
  - Rewrote `src/content/reviews/en/asus-rog-xbox-ally-7-1080p-512gb-white-2025/_research-pack.md` into the canonical strict PASS A template to avoid format drift from legacy example structure.
  - Added a concise normalized PASS A contract summary to `.agent/roles/single-researcher.md` so the production shape is explicit in one place.
  - Mirrored the same normalized PASS A contract summary into `prompts/review-workflow-two-pass.md` so the external prompt matches the role doc.
  - Hardened the quote subsystem contract: partial review-UI failures are now treated as documentable limitations, while blocking occurs only when fewer than 4 quotes can actually be verified from accessible source pages.
  - Added canonical workflow `.agent/workflows/quotes-evidence.md` and linked active role/prompt docs to it so quote rules now have a single source of truth.
  - Added `.agent/templates/research-pack-pass-a-example.md` as the only canonical PASS A format example and marked historical `_research-pack.md` files as non-canonical format references.
  - Strengthened the canonical PASS A example so `Claims & Sources` now visibly demonstrates 5-8 concrete claim/source pairs; this makes the source-backed claims discipline explicit instead of letting agents hide numeric facts only inside `Specs`.
  - Tightened `Related Reviews` formatting rules across PASS A docs: parser-safe output is now explicitly defined as one bullet per line with exactly one Markdown link and no `Title -> /slug` legacy shorthand.
  - Cleaned remaining quote-validator platform bias in `bootstrap_v_1_3_0.md`: correction language is now source-agnostic across Reddit, forums, and Amazon customer reviews, and the checklist count in that block was fixed from 3 to 4.
  - Unified category contract wording across role/prompt docs: canonical enum is now explicitly the same 7 slugs everywhere, while `consoles` is documented only as a legacy input alias that normalizes to `gaming`.
  - Removed stale `master_prompt_v_1_3_0.md` mandatory-language from bootstrap readiness/checklist blocks; bootstrap now consistently treats `master_prompt` as optional Pass B/reference input rather than a required startup file.
  - Demoted `asin-hunter-protocol.md` to a clearly optional helper across bootstrap/quickstart/two-pass docs; it is no longer framed as part of the default startup contract.
  - Normalized ASIN terminology across active docs: `ASIN_PRIMARY` for the verified primary marketplace card, `ASIN_US` for amazon.com status, and `EU ASINs` for regional mapping. Ambiguous phrases like `primary ASIN` were removed from active prompts where they could blur field names.
  - Extended the same canonical ASIN field vocabulary into role/template helper docs (`single-researcher`, `researcher`, `researcher-task`, `asin-hunter-protocol`): use `ASIN_PRIMARY`, `ASIN_US`, and `ASINs by Region` instead of mixed phrases like `primary ASIN` or `regional ASINs`.
  - Removed the remaining identity-vocabulary drift in active roles: `single-researcher` now describes non-US exceptions via `ASIN_PRIMARY`, and `translator` no longer uses legacy `US ASIN` wording.
  - Clarified the frontmatter exception for `ai-workstation` build guides in `master_prompt_v_1_3_0.md`: the `no extra frontmatter fields` rule applies only to standard reviews, while build guides may explicitly require `reviewType: "build"` and build-specific data.
  - Made that exception more explicit at writer-layer by adding a short two-profile rule in `master_prompt_v_1_3_0.md`: standard reviews use the base schema, while `ai-workstation` build guides use the allowed exception profile.
  - Reduced quote-policy duplication across `single-researcher`, `bootstrap`, and `master_prompt`: local docs now keep only role-specific operational checks, while permalink/accessibility/blocked-UI/source policy is centralized in `.agent/workflows/quotes-evidence.md`.
  - Reduced that duplication one step further: removed local quote examples and detailed source-policy restatements from `bootstrap`/`master_prompt`, leaving `quotes-evidence.md` as the only detailed quote-policy document.
  - Extended the same duplication cleanup to `review-workflow-two-pass.md` and `user-quotes-guide.md`, so quote permalink/accessibility/source-handling rules now live only in `quotes-evidence.md`; other docs keep only short operational summaries.
  - Added a canonical `Content Ownership Map` to `.agent/AGENT_CONTRACT.md` and linked it from `review-workflow-two-pass.md` so PASS A vs PASS B responsibilities are explicit for ASINs, specs, claims, quotes, SEO planning, related reviews, character counts, and affiliate routing.
  - Linked that ownership map from the main entry prompts (`bootstrap_v_1_3_0.md`, `master_prompt_v_1_3_0.md`) so the one-page contract is reachable from both startup and writer layers.
  - Added `.agent/workflows/external-review-agent-runbook.md` as a canonical step-by-step runbook for the external-agent review flow (`PASS A -> PASS B -> translation -> QA`) and linked it from `AGENT_CONTRACT`, `roles/README`, and `review-creation-full`.
  - Cleaned EN-first scope in `master_prompt_v_1_3_0.md`: removed translation-specific quote instructions from the default writer flow and pointed localized quote behavior to `.agent/roles/translator.md` and `prompts/translation-guide-v1.md`.
  - Closed the last observed freeze-blocker on the `asus-rog-xbox-ally-7-1080p-512gb-white-2025` dry-run: aligned PASS B `UserFeedback` quotes in `index.mdx` to exact PASS A verbatim text from `_research-pack.md`, after which `check:researcher-output`, `check:review-package`, and full `npm run build` all passed on the same case.
  - Updated upload/required-file guidance in bootstrap and quickstart docs to reflect the real PASS A architecture: bootstrap prompt, `single-researcher` contract, published reviews list, and optional canonical PASS A example.
  - Normalized SEO ownership: PASS A no longer implies a mandatory standalone SEO keywords block; writer-side SEO planning is derived from ASIN-locked identity and verified claims in bootstrap/master prompt flow.
- ✅ **Monitoring hardening closed with confirmed external delivery** (2026-03-08)
  - Added and validated `UPTIME_ALERT_WEBHOOK` repository secret for `oleyna80/hardwarelab`.
  - Synthetic run `22819993255` reached expected failure path and completed webhook step successfully (`Send optional webhook alert`).
  - External Telegram receipt confirmed for `[hardwarelab][TEST]` notification format.
- ✅ **WSL/GitHub/VPS contract drift cleanup completed** (2026-03-08)
  - Synced docs with factual workflow: `WSL -> GitHub Actions -> VPS deploy`.
  - Removed stale VPS build instructions from migration runbook.
  - Unified canonical VPS app path references and aligned local Docker compose with SSR port contract.
- ✅ **Phase A closure evidence consolidated** (2026-03-02)
  - Final closure report created: `.agent/reports/coder/2026-03-01-phase-a-closure-completion.md`.
  - Track C evidence locked by commit `b06e5ee26fb0d33562b4fee67a0eb9a8182ef2d3` (homepage Lighthouse optimizations).
  - Track A evidence locked by GitHub Actions run `22595995662` (`Uptime Monitor`, `completed/failure`, test mode).
  - Track B evidence locked by commit `9a6351e7f9ab9e0adc96d49cc4a7ff58dfdbf7ce` with measured RTO `379 sec` (`6.32 min`, PASS vs `< 15 min` target).
- ✅ **Roadmap Phase A checklist synchronized with factual status** (2026-03-01)
  - Updated `.memory_bank/roadmap.md` to reflect completed technical milestones (VPS infra, CI baseline, docs gate, observability baseline).
  - Split remaining observability work into explicit open item: external webhook delivery validation via `UPTIME_ALERT_WEBHOOK`.
- ✅ **Uptime monitor got safe alert-test mode for webhook validation** (2026-03-01)
  - Added `workflow_dispatch` input `alert_test_mode` in `.github/workflows/uptime-monitor.yml`.
  - Added synthetic failure step for alert-path checks without forcing real production outage.
  - Issue lifecycle steps are skipped in test mode to avoid false incident noise.
  - Webhook alert prefix now includes `[hardwarelab][TEST]` in test mode.
  - Updated operations runbook: `docs/operations/monitoring-baseline.md`.
- ✅ **External webhook delivery confirmed end-to-end** (2026-03-08)
  - Prior failed run `22595995662` kept for history; root cause was invalid webhook URL in secret.
  - Re-run `22819993255` confirmed external delivery path as working.
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

1. **Post-Phase-A documentation integrity** — keep roadmap/progress/evidence synchronized with immutable deploy and observability facts.
2. **Operational stability** — keep uptime monitor and backup/restore runbook aligned with runtime behavior.
3. **CI baseline continuity** — keep Lighthouse/affiliate/agent-docs gates green on new changes.

## Next Priority

- Move execution planning to Phase B while preserving Phase A operational guardrails.

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
## 2026-03-21 - Category contract update: `ai-workstation` vs `mini-pc`

- Reframed `ai-workstation` as a first-class product category for AI-first workstation systems and local-AI boxes, not just build guides.
- Kept build guides as a subtype inside `ai-workstation`, marked in Pass B via `reviewType: "build"` only when the article is explicitly a build guide.
- Updated `master_prompt_v_1_3_0.md`, `hardwarelab_quickstart.md`, and `review-workflow-two-pass.md` so `mini-pc` remains the general compact-desktop lane while `ai-workstation` covers inference/modeling-oriented systems.
- Updated the GMKtec EVO-X2 PASS A pack to keep `Category: ai-workstation`, fix the `Ryzen AI` product-name typo, and normalize quote sentiment values to the canonical enum.

## 2026-03-21 - Quotes sentiment mix clarified

- Clarified in `.agent/workflows/quotes-evidence.md` that sentiment mix is editorially desirable but not a hard requirement.
- Negative quotes are not mandatory; do not force synthetic balance when verified evidence is mostly positive or neutral.
- The only strict PASS A quote gate remains the minimum verified quote count and source-verifiability contract.

## 2026-03-22 - `mixed` added to canonical quote sentiment enum

- Extended the canonical quote sentiment enum to `positive | neutral | negative | mixed`.
- `mixed` is now explicitly allowed when a quote carries both meaningful positive and negative signal and reducing it to `neutral` would lose information.
- Synced `.agent/workflows/quotes-evidence.md`, `.agent/roles/single-researcher.md`, and the `UserFeedback` type note in `prompts/master_prompt_v_1_3_0.md`.
## 2026-03-22 - Category contract split: `consoles` vs `gaming`

- Promoted `consoles` back into the canonical active category enum instead of treating it as a legacy alias.
- New canonical meaning:
  - `consoles` = gaming consoles and handheld gaming systems (Xbox, PlayStation, Steam Deck, ROG Ally class)
  - `gaming` = gaming laptops and gaming-focused computers outside the `gaming-pcs` desktop-prebuilt lane
  - `gaming-pcs` = ready-made desktop gaming PCs from manufacturers
- Synced active prompts, role docs, bootstrap helpers, and existing-reviews generation to the 8-category contract.
- Reclassified `asus-rog-xbox-ally-7-1080p-512gb-white-2025` from `gaming` to `consoles` across locales so registry output matches the new category meaning.

## 2026-03-22 - Console metadata cleanup after category split

- Normalized console/frontmatter metadata on legacy review files so `tags[0]` matches `category: consoles`.
- Fixed `ROG Ally`, `Steam Deck OLED`, and Xbox EN reviews that still carried `gaming` as the leading tag after the category split.
- Added missing `category: consoles` and parser-safe `tags` blocks to `playstation-5-disc-slim` locale files.
- Regenerated `prompts/existing-reviews-hardwarelab.md` after the cleanup.
- Closed the old console translation debt structurally by creating the missing `ru/de/fr` review files for `steam-deck-oled`, `xbox-series-s-robot-white`, `xbox-series-x-1tb-carbon-black`, `xbox-series-x-1tb-digital-robot-white`, `xbox-series-x-2tb-galaxy-black`, and `playstation-5-pro`, then syncing `image.webp`/`og.png` via the canonical asset-copy script.
- `rog-ally-z1-2024-asus-512gb-white` is now package-green after locale `ogImage` fixes and disclosure-prefix normalization.
