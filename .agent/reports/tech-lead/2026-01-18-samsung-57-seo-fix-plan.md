# Implementation Plan: Fix SEO Metadata for Samsung 57 Review

**Date:** 2026-01-18
**Author:** Tech Lead
**Target:** `samsung-57-odyssey-neo-g9-g95nc` review files (EN, RU, DE, FR)

## 🎯 Objective
Apply critical SEO fixes identified in the SEO audit to ensure social sharing works correctly (Open Graph) and metadata length compliance is met across all languages.

## 📋 Decomposed Tasks (P0)

1. **Fix English (EN)**
   - File: `src/content/reviews/en/samsung-57-odyssey-neo-g9-g95nc/index.mdx`
   - Action: Add `ogImage: "./og.png"` to frontmatter (after `heroImageAlt`).

2. **Fix Russian (RU)**
   - File: `src/content/reviews/ru/samsung-57-odyssey-neo-g9-g95nc/index.mdx`
   - Action: Add `ogImage: "./og.png"` to frontmatter.

3. **Fix German (DE)**
   - File: `src/content/reviews/de/samsung-57-odyssey-neo-g9-g95nc/index.mdx`
   - Action 1: Add `ogImage: "./og.png"` to frontmatter.
   - Action 2: Extend `description` to meet min 150 chars. Append " für Profis." or similar.

4. **Fix French (FR)**
   - File: `src/content/reviews/fr/samsung-57-odyssey-neo-g9-g95nc/index.mdx`
   - Action 1: Add `ogImage: "./og.png"` to frontmatter.
   - Action 2: Shorten `title` to <60 chars. Suggestion: "Test Samsung Odyssey Neo G9 57 : Dual 4K, 240Hz, Mini-LED"

## ✅ Acceptance Criteria
- `ogImage` key exists in all 4 files.
- FR title < 60 chars.
- DE description > 150 chars.
- `npm run build` passes.

## 🧱 Architecture Alignment
- Follows Frontmatter Schema Standard 1 defined in `master_prompt_v_1_3_0.md`.
- `ogImage` must use relative path `./og.png`.
