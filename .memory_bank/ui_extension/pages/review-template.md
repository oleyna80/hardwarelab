# Review Page Template

## Purpose
Страница обзора продукта — основной тип контента сайта.

## File Location
`src/pages/reviews/[...slug].astro`

## Data Source
- **Collection**: `reviews`
- **Path**: `src/content/reviews/[lang]/[slug].mdx`
- **Schema**: `src/content/config.ts`

## Components Used

| Component | Purpose |
|-----------|---------|
| `ReviewHero` | Hero-изображение и заголовок |
| `ProductHeader` | H1 с названием продукта |
| `SpecsTable` | Таблица характеристик |
| `ProsCons` | Плюсы и минусы |
| `AffiliateButton` | Кнопка "Check Price" |
| `AffiliateDisclosure` | Disclosure above the fold |

## Required Frontmatter

```yaml
title: "Product Name Review"
description: "SEO description"
pubDate: 2026-01-09
heroImage: "/images/product-hero.jpg"
heroImageAlt: "Product image description"
ogImage: "/images/product-og.jpg"
rating: 4.5
category: "mini-pcs"
tags: ["tag1", "tag2"]
asin: "B0XXXXXXXX"
```

## SEO Requirements
- Title < 60 characters
- Description 120-160 characters
- H1 = product name
- Canonical URL
- hreflang for all locales
- JSON-LD Article schema

---

→ Category-specific specs: [../../content-specs/](../../content-specs/)
