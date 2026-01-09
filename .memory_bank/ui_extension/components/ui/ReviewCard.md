# ReviewCard

Review preview card for listings.

## Location
`src/components/ui/ReviewCard.astro`

## Purpose
Карточка обзора для списков и сеток.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | required | Название продукта |
| `description` | `string` | required | Краткое описание |
| `heroImage` | `string` | required | URL изображения |
| `heroImageAlt` | `string` | — | Alt текст |
| `slug` | `string` | required | URL slug |
| `rating` | `number` | — | Рейтинг (1-5) |
| `category` | `string` | — | Категория |
| `pubDate` | `Date` | — | Дата публикации |

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
import ReviewCard from '@/components/ui/ReviewCard.astro';

<ReviewCard 
  title="Mac mini M4"
  description="Compact powerhouse"
  heroImage="/images/mac-mini.jpg"
  slug="mac-mini-m4"
  rating={4.5}
  category="mini-pcs"
/>
```

## Used In

- `src/pages/reviews/index.astro`
- `src/pages/categories/[category].astro`
- Homepage featured section
