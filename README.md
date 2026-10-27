# HardwareLab

Multilingual hardware review and affiliate website. This experimental branch keeps the application `src/`, `public/`, `tests/` Git trees and dependency lockfile unchanged from `main` at `72ada873d66d19de2609515b443766065fe132c9`, but replaces the old agent infrastructure with a clean Agentic SDLC Lite installation from `oleyna80/agentic-sdlc-lite` `55ebee6cf26db99d708f089f297344ef0341f698`.

## Local setup

```bash
git clone https://github.com/oleyna80/hardwarelab.git
cd hardwarelab
git fetch origin
git switch --track origin/chore/sdlc-lite-adoption
git status --short --branch
npm ci
npm run lint
npm run check:types
npm run build
npm run check:affiliate
npm run lint:images
npm run test:e2e
```

Use an existing clean clone or an isolated `git worktree` if preferable. Playwright requires browser installation (`npx playwright install --with-deps chromium` as appropriate). None of these commands is claimed PASS until executed.

## Codex engineering environment

Before new work, inspect `AGENTS.md`, `PROJECT_BRIEF.md`, `PROJECT_MAP.md`, `docs/workflow/initialization.md`, `docs/security/boundaries.md`, and current Git state. Run Codex at the verified repository root.

Lite cooperative Git hooks are in `.githooks/`. Inspect them and their limitations, then enable locally if approved:

```bash
git config --local core.hooksPath .githooks
```

These hooks are not security isolation or a replacement for GitHub permissions. The migrated `scripts/app-checks/` files are **application QA tools**, not agent Skills; associated `package.json` and CI paths have been updated. Historical agent contracts, memory, hooks and process-related Skills are intentionally absent from the experimental tree.

**No feature changes in the setup branch.** The next real Codex task (Astro/Tailwind upgrade) requires separate scoping/authorization and Lite lifecycle evidence. Do not merge, manually dispatch workflows, publish images or deploy without Owner GO.

## Product and deployment

- Source: `src/`. Static assets: `public/`. Tests: `tests/`.
- Stack: Astro SSR, MDX, TypeScript, Tailwind CSS, Node.js 22; actual dependency versions in `package.json`.
- EN at `/`, FR/RU/DE at locale prefixes.
- Content workflow: `COPYWRITER_GUIDE.md`; `npm run review:new`, `review:write`, `review:publish`.
- CI: `.github/workflows/ci.yml` and `.github/workflows/lite-checks.yml`.
- GHCR and VPS: `.github/workflows/docker-publish.yml`, `.github/workflows/deploy-vps.yml`, runbook `docs/deployment/github-vps.md`. Their automatic paths remain main-only.

## Read-only historical context

Old files remain in the Git ancestry at `72ada873d66d19de2609515b443766065fe132c9`. They can be inspected without restoring them:

```bash
git show 72ada873d66d19de2609515b443766065fe132c9:.memory_bank/activeContext.md
git show 72ada873d66d19de2609515b443766065fe132c9:PROJECT_MAP.md
```

Their instructions **are not active** in this branch. Before a future merge into `main`, consider creating an archive tag because `origin/main` will eventually point to the new tree.
