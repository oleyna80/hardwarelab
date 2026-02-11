# RESEARCHER TASK TEMPLATE

## Context
- Slug:
- Category:

## Inputs
- `src/content/reviews/en/<slug>/_research-pack.md`
- `prompts/master_prompt_v_1_3_0.md`
- `prompts/existing-reviews-hardwarelab.md`

## Required Skills
- `seo-content-structure`
- `integrator-tone-voice`
- `journalistic-hook-mastery`
- `visual-asset-generator`

## Deliverables
- `src/content/reviews/en/<slug>/index.mdx`
- `src/content/reviews/en/<slug>/image.webp`
- `src/content/reviews/en/<slug>/og.png`

## Verification
- Frontmatter includes `heroImage: "./image.webp"` and `ogImage: "./og.png"`
- `tags[0] === category`
- If available: `npm run build`
- Handoff to Translator
