# WB-009 Repair Verification — Clean Lockfile Reproduction

## Metadata

- **Work Block:** `WB-2026-07-28-localized-category-routes-lockfile-repair`
- **Role / isolation:** independent Verifier, fresh detached worktree
- **Baseline:** `e61ab9342e08`
- **Worktree:** `/tmp/wb-20260728-verify.jLHTI8/worktree`
- **Runtime:** Node `v22.22.3`, npm `10.9.8`
- **Verdict:** `READY`

## Candidate materialization

The Verifier created a detached worktree from the baseline and copied exactly
seven current candidate files before running any check:

1. `package-lock.json`
2. `src/data/categoryCatalog.ts`
3. `src/components/categories/CategoryDetailPage.astro`
4. `src/pages/categories/[category].astro`
5. `src/pages/[lang]/categories/[category].astro`
6. `src/utils/routing.ts`
7. `src/utils/routing.test.ts`

`/tmp/wb-20260728-verify.jLHTI8/evidence/seven-path-manifest.sha256` recorded
SHA-256 for every path. All entries matched again after verification.

## Acceptance matrix

| Check | Result |
| --- | --- |
| Ordinary clean install | PASS — `npm ci --no-audit --no-fund`, 902 packages added |
| Dependency tree | PASS — `npm ls` exit 0 |
| Route unit contract | PASS — 4/4 Vitest tests |
| Typecheck | PASS — 0 errors and 0 warnings |
| Production build | PASS — exit 0; disclosure lint checked 93 files |
| Static route inventory | PASS — exact 28 expected/actual, no missing, extra, or invalid pages |
| Production runtime smoke | PASS — 28 expected routes `200 text/html`; two invalid routes `404` |
| Candidate scope and hygiene | PASS — exactly seven paths; whitespace and credential-value scans clean |

## Notes

Astro emitted pre-existing content-directory and dynamic-review prerender
notices. `npm ls` displayed optional transitive packages as extraneous while
exiting 0. Neither affected locked installation, build, or route behavior.
