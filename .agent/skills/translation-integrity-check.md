---
name: Translation Integrity Check
description: Validate RU/DE/FR review parity against EN: structure, frontmatter invariants, internal links, disclosure, and asset consistency.
---

# Translation Integrity Check

## Objective
Prevent translation-layer regressions that break build, compliance, or internal linking.

## Use When
- Translator updates RU/DE/FR files.
- QA runs final content gate.
- Review update workflow rewrites legacy slugs.

## Required Checks
1. Structural parity:
   - MDX component structure matches EN.
   - Frontmatter keys preserved.
2. Immutable fields parity:
   - keep `category`, `tags`, `rating`, `priceCategory` aligned with EN.
3. Regional ASIN rule:
   - DE/FR may use region ASIN from `_research-pack.md`; otherwise keep EN ASIN.
4. Internal links:
   - `/reviews/...` URLs unchanged and not translated.
5. Disclosure:
   - prefix remains `> **Disclosure:**` (or project exact rule).
6. Assets:
   - `image.webp` + `og.png` present in RU/DE/FR folders.
   - Frontmatter paths point to existing files.

## Commands
```bash
node .agent/skills/scripts/copy-assets-to-translations.mjs <slug>
npm run build
```

## Output
- Content QA report:
  - `src/content/reviews/en/<slug>/_qa-report.md`
- If release-level compliance is needed:
  - `.agent/reports/compliance/<YYYY-MM-DD>-<task-slug>-compliance.md`

## Guardrails
- If structure/links/assets diverge from EN, mark FAIL and return to `translator`.
- Do not fix factual content in translation gate; only structural/mechanical integrity.
