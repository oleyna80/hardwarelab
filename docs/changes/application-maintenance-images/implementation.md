# Image maintenance — Coder implementation

Observed HEAD: `9fcada3904af810a4d9e9123a791299263006748`; W: `48bd7bc7df43d08d490550dd796d2d9ceb386ad2`. This report describes an **uncommitted working-tree candidate**, not a frozen S2 or independent verdict. Stage Critic READY is recorded at HEAD. No commit, publication, merge or deployment was performed.

## Changes and evidence

- The review image schema accepts Astro image metadata and safe root-public or HTTP(S) references, rejecting unsafe or unresolved string forms. The helper and unit tests are `src/utils/review-image.ts` and `src/utils/review-image.test.ts`.
- The image audit decodes local images with Sharp; unreadable or undecodable images fail, while size/format findings remain warnings. Its CLI fixtures cover missing and corrupt files and an oversized valid image.
- The inventory script enumerates published non-draft collections, records references by use and resolves and decodes local assets. Its fixtures cover missing, unsafe, corrupt and unresolved Hero imports, valid public and remote forms, and draft exclusion. It uses `parseFrontmatter` from the directly declared Astro dependency. The inventory covers the source patterns inspected in this candidate; it is not evidence that every possible future MDX expression is understood.
- A production baseline rendered Samsung EN without the actual ReviewHero element. Its missing opening tag was added. Six localized PlayStation Slim and Raspberry Pi entries produced social fallback `/og-default.jpg`, which returned 404 locally. Their hero and OG frontmatter now points to the existing local assets; each affected image and OG file had the same SHA-256 as its corresponding EN asset. No asset was replaced. Steam Deck source imagery was visually inspected and identifies the product.
- The Playwright spec checks Steam Deck in four languages at desktop and mobile sizes, loads and decodes lazy images, checks product identity against source pixels, and fetches and decodes social images; it also covers listing, related content, Samsung and the six localized fixes. The quality job has explicit unit, negative-fixture and inventory steps, preserving existing jobs.

Inventory output `logs/images-s2-inventory-final.json`: EN 29, FR 21, DE 21, RU 22 entries; 331 recorded uses, 330 decoded content-relative uses, one optional-not-present, zero errors. `en/orange-pi-5-plus` has valid decoded hero and OG frontmatter and its rendered page has an OG image, but it does not include or invoke a body `ReviewHero`. The absent optional body component is not an unresolved required image reference. Remote availability is not established by syntactic acceptance; this production inventory contained no remote references.

## Executed checks and limits

Logs and checkpoints below are under `/home/azur/Projects/.agent-runs/hardwarelab/`. The isolated copy was created from HEAD and used verified official Node `22.23.4`; the system Node `22.22.3` is below the project minimum. The first `npm ci` succeeded (`logs/images-s2-npm-ci.log`); npm reported 26 vulnerabilities (2 low, 10 moderate, 14 high), not yet dispositioned. Baseline production build succeeded (`logs/images-s2-baseline-build.log`).

- `npx vitest run src/utils/review-image.test.ts`: 12 passed (`logs/images-s2-url-tests.log`).
- `node --test scripts/app-checks/audit-images.test.mjs scripts/app-checks/review-image-inventory.test.mjs`: 2 passed after the final script changes (`logs/images-s2-node-tests-final.log`). Tests use owned temporary fixtures and assert CLI outcomes.
- `node scripts/app-checks/review-image-inventory.mjs`: zero errors on candidate content (`logs/images-s2-inventory-final.json`).
- `npm run lint`, `npm run check:types` and `npm run build` succeeded in the isolated copy (`logs/images-s2-lint.log`, `logs/images-s2-check-types-rerun.log`, `logs/images-s2-build-rerun.log`). The first type check failed with two errors and was corrected (`logs/images-s2-check-types.log`). Inventory/audit scripts and their fixtures changed after these successful runs, so these checks do not establish a final-candidate matrix result.
- `npx playwright test tests/review-images.spec.ts --workers=1`: 19 passed against the then-built candidate (`logs/images-s2-playwright-focused.log`), Chromium 143.0.7499.4 with `PLAYWRIGHT_HOST_PLATFORM_OVERRIDE=ubuntu24.04-x64`. Later changes were limited to the Node inventory/audit scripts and fixtures. Browser results are not a run on frozen S2.
- `git diff --check` succeeded for tracked changes; untracked files require inclusion in the eventual complete candidate review. Short execution checkpoints are in `checkpoints/2026-11-01-images-*.txt`.

A subsequent clean-install attempt for the full matrix was interrupted at the Orchestrator's direction (`logs/images-s2-matrix-npm-ci.log`, SIGINT); it is not a successful matrix run. The earlier successful install remains baseline evidence only.

## Pending on exact S2

The required sequential candidate matrix remains open: fresh install, all W checks including full E2E, researcher selector with verified base/head, Lighthouse, full and production npm audits with security disposition, and committed-context Docker health/page/image/Sharp checks. Independent Reviewer and Verifier, evidence-only S2..H2 comparison and hosted CI also remain pending. No PASS or READY is claimed here. Project inventory and security evidence are owned by the Orchestrator.
