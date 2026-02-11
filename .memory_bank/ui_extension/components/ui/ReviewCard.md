# ReviewCard

Review preview card for listings.

## Location
`src/components/ui/ReviewCard.astro`

## Purpose
Карточка обзора для списков и сеток.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `review` | `CollectionEntry<"reviews">` | required | Review entry from `getCollection("reviews")` |
| `lang` | `Language` | "en" | Language for URL prefix and date locale |

**Uses:** `review.data.title`, `review.data.description`, `review.data.heroImage`, `review.data.rating`, `review.data.priceCategory`, `review.data.pubDate`.

## Features

- Hero image с lazy loading
- Рейтинг звёздами
- Категория badge
- Hover эффекты
- Dark mode support

## Dependencies

- None (standalone)

## Usage

```astro
---
import ReviewCard from '@/components/ui/ReviewCard.astro';
import { getCollection } from 'astro:content';

const reviews = await getCollection('reviews', ({ id }) => id.startsWith('en/'));
---

{reviews.map((review) => (
  <ReviewCard review={review} lang="en" />
))}
```

## Used In

- `src/pages/reviews/index.astro`
- `src/pages/categories/[category].astro`
- Homepage featured section
