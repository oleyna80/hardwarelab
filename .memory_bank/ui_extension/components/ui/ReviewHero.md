# ReviewHero

Review page hero section.

## Location
`src/components/ui/ReviewHero.astro`

## Purpose
Hero-секция для страницы обзора с изображением продукта.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `image` | `string or ImageMetadata` | required | Hero image (frontmatter `heroImage`) |
| `imageAlt` | `string` | required | Alt text (frontmatter `heroImageAlt`) |
| `rating` | `number` | — | Rating (0-5) |
| `priceCategory` | `budget / mid / high / enterprise` | — | Price tier label |
| `keySpecs` | `string[]` | required | Key specs list |
| `asin` | `string` | required | Amazon ASIN for CTA |

## Features

- Large hero image
- Gradient overlay
- Rating stars display
- Price category badge
- Key specs list
- Amazon CTA button

## Dependencies

- None (standalone)

## Usage

```astro
import ReviewHero from '@/components/ui/ReviewHero.astro';

<ReviewHero 
  image={frontmatter.heroImage}
  imageAlt={frontmatter.heroImageAlt}
  rating={frontmatter.rating}
  priceCategory={frontmatter.priceCategory}
  keySpecs={[
    "Apple M4 (10-core CPU / 10-core GPU)",
    "16GB unified memory",
    "256GB SSD",
    "3× Thunderbolt 4"
  ]}
  asin={frontmatter.asin}
/>
```

## Used In

- `src/pages/reviews/[...slug].astro`
