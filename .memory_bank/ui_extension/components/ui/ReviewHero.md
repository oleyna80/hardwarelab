# ReviewHero

Review page hero section.

## Location
`src/components/ui/ReviewHero.astro`

## Purpose
Hero-секция для страницы обзора с изображением продукта.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | required | Название продукта |
| `heroImage` | `string` | required | URL hero изображения |
| `heroImageAlt` | `string` | — | Alt текст |
| `rating` | `number` | — | Рейтинг (1-5) |
| `pubDate` | `Date` | — | Дата публикации |
| `category` | `string` | — | Категория |

## Features

- Large hero image
- Gradient overlay
- Rating stars display
- Publication date
- Category badge

## Dependencies

- None (standalone)

## Usage

```astro
import ReviewHero from '@/components/ui/ReviewHero.astro';

<ReviewHero 
  title="Mac mini M4 Review"
  heroImage="/images/mac-mini-hero.jpg"
  rating={4.5}
  pubDate={new Date("2026-01-09")}
  category="mini-pcs"
/>
```

## Used In

- `src/pages/reviews/[...slug].astro`
