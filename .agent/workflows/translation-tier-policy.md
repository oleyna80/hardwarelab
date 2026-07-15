---
description: Translation quality tiers for localized review publishing
---

# Translation Tier Policy

`Status: Canonical policy for localization depth.`

This document defines when structural translation is acceptable and when editor-grade localization is required.

## Tier Definitions

### Tier 1: Structural Translation

Use when the immediate goal is pipeline completeness, package validity, and asset/frontmatter consistency.

Allowed:
- Preserve EN structure exactly
- Keep frontmatter/component layout unchanged
- Translate only enough text to avoid obvious language breakage
- Ship locale files that are operationally valid

Not sufficient for:
- Important SEO pushes
- Monetization-critical localized pages
- High-trust technical categories

### Tier 2: Editor-Grade Localization

Use when the localized page is expected to function as a real editorial asset in its target language.

Required:
- Natural, native-feeling copy in the target locale
- Localized title and description rewritten for real search behavior
- Verdict, intro, and section transitions adapted to the locale
- Pros/cons and user-feedback copy reviewed for tone and clarity
- Technical wording checked for category-appropriate terminology
- Final human/editor-quality pass before release

## Category Policy

### `ai-workstation`: Tier 2 required

`ai-workstation` reviews must use editor-grade localization by default.

Why:
- The category depends heavily on precise wording around AI inference, memory, thermals, software stack tradeoffs, and workstation use cases.
- Literal or structural translations can easily distort nuance in areas like ROCm vs CUDA, unified memory limits, sustained load behavior, or local-model workflows.
- These pages are high-trust and high-intent; awkward translation directly harms credibility and conversion.

### What is mandatory for `ai-workstation`

For RU/DE/FR localizations of `ai-workstation` reviews:
- Rewrite `title` and `description` for native readability and search intent
- Localize intro and verdict editorially, not mechanically
- Review all technical terms for natural target-language usage
- Adapt `ProsCons` wording so it reads like native editorial copy
- Translate `UserFeedback` faithfully but naturally
- Keep MDX structure, facts, numbers, ASIN routing, links, and component props unchanged

### What is not allowed for `ai-workstation`

Do not treat these pages as “check-the-box translations”:
- no EN-mirroring locale files as a final state
- no raw calques for AI/software terminology
- no mechanical translation of verdict language
- no literal carryover of awkward benchmark/workload phrasing

## Operational Rule

If a slug is `category: "ai-workstation"`:
- Tier 1 structural translation may exist only as a temporary internal stopgap
- Tier 2 editor-grade localization is required before treating RU/DE/FR as publication-quality deliverables

## Ownership

- PASS B / writer owns the EN editorial baseline
- Translator owns locale quality level
- QA should treat structural-mirror `ai-workstation` translations as incomplete editorially even if schema/build checks pass
