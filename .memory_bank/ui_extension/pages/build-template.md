# Build Page Template

## Purpose
Build review page (Multi-ASIN) rendered from the `reviews` collection where `reviewType: "build"`.

## File Location
`src/pages/builds/[...slug].astro`

## Data Source
- **Collection**: `reviews`
- **Path**: `src/content/reviews/[lang]/[slug]/index.mdx`
- **Schema**: `src/content/config.ts`
- **Filter**: `reviewType === "build"`

## Components Used

| Component | Purpose |
|-----------|---------|
| `BuildHero` | Header block for build reviews |
| `ComponentsGrid` | Render `buildComponents` from frontmatter |
| `ShareButtons` | Social sharing |
| `Content` | MDX body |

## Required Frontmatter (Build)

```yaml
title: "AI Workstation Build: Dual RTX 4090 + Threadripper"
description: "One-paragraph summary of the build and target use case."
pubDate: 2026-01-11
reviewType: "build"
category: "ai-workstation"
buildComponents:
  - name: "GPU: NVIDIA RTX 4090"
    asin: "B0XXXXXXXXX"
    category: "gpu"
    price: 1599.99
  - name: "PSU: 1600W Titanium"
    asin: "B0YYYYYYYYY"
    category: "psu"
    price: 499.99

# Optional (supported by schema/template):
heroImage: "./image.webp"
rating: 4.6
pros:
  - "Designed for 70B+ inference with 2× GPUs"
  - "Room for expansion and better cooling"
```

## Notes
- The current build template uses `frontmatter.pros` to populate the "Why this build?" sidebar.
- Affiliate CTAs can be included in the MDX content (e.g., `AffiliateButton` for key parts).
