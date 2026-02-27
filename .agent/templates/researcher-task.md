# RESEARCHER TASK TEMPLATE

## Context
- Slug:
- Category:

## Inputs
- `src/content/reviews/en/<slug>/_research-pack.md`
- `prompts/master_prompt_v_1_3_0.md`
- `prompts/existing-reviews-hardwarelab.md`

## ASIN Validation Policy (for PASS A check)
- Verify research pack meets minimum mapping target: `ASIN_US` + at least one EU ASIN (`DE|FR|IT|ES|UK`).
- Do not fail pack for missing ASIN on every EU marketplace.
- Ensure non-verified regional marketplaces are explicitly marked `absent`.
- Keep `ASIN_DE` and `ASIN_FR` fields present even when `absent`.

## Required Skills
- `seo-content-structure`
- `integrator-tone-voice`
- `journalistic-hook-mastery`
- `visual-asset-generator`

## Deliverables
- `src/content/reviews/en/<slug>/index.mdx`
- `src/content/reviews/en/<slug>/image.webp`
- `src/content/reviews/en/<slug>/og.png`

## Illustration Standard (mandatory)
- Source image from Nano Banana: square PNG `1024x1024` by default (`2048x2048`/`4096x4096` allowed).
- Final outputs:
  - `image.webp` = `1200x675`
  - `og.png` = `1200x630`
- Canonical command:
  - `npm run images:review -- --slug <slug> --input <path/to/source.png>`
  - Optional separate OG source: `--og-input <path/to/og-source.png>`
- Default conversion mode: `contain` with background `#F8F7F5`.
- Branding lock for OG:
  - use HardwareLab logo/icon style from `public/favicon.svg`
  - include exact wordmark `HardwareLab` in the same brand style as site header
  - no altered brand name or custom fake logo.

## Verification
- Frontmatter includes `heroImage: "./image.webp"` and `ogImage: "./og.png"`
- `tags[0] === category`
- If available: `npm run build`
- Handoff to Translator
