# Review Page Template

## Purpose
Страница обзора продукта — основной тип контента сайта.

## File Location
`src/pages/reviews/[...slug].astro`

## Data Source
- **Collection**: `reviews`
- **Path**: `src/content/reviews/[lang]/[slug]/index.mdx`
- **Schema**: `src/content/config.ts`

## Components Used

| Component | Purpose |
|-----------|---------|
| `ProductHeader` | H1 с названием продукта |
| `ShareButtons` | Кнопки шеринга |
| `AffiliateButton` | Sticky CTA внизу страницы |
| `ReviewContent` | Рендер MDX контента обзора |

**MDX components (inside `src/content/reviews/.../index.mdx`):**
- `ReviewHero`, `SpecGrid`, `UserFeedback`, `ProsCons`, `AffiliateButton` (в конце)
- Disclosure: Markdown blockquote (не компонент)

## Required Frontmatter

```yaml
title: "Product Name Review"
description: "SEO description"
pubDate: 2026-01-09
heroImage: "./image.webp"
heroImageAlt: "Product image description"
ogImage: "./og.png"
rating: 4.5
category: "mini-pc"
tags: ["tag1", "tag2"]
asin: "B0XXXXXXXX"
priceCategory: "mid"
```

## SEO Requirements
- Title < 60 characters
- Description 150-160 characters
- H1 = product name
- Canonical URL
- hreflang for all locales
- JSON-LD Article schema

---

→ Category-specific specs: [../../content-specs/](../../content-specs/)
