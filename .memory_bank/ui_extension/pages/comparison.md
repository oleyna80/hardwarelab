# Comparison Page Template

## Purpose
Сравнение двух или более продуктов одной категории.

## File Location
`src/pages/comparisons/[...slug].astro` (TODO: создать если нет)

## Data Source
- **Collection**: `comparisons` (TODO: добавить в config.ts)
- **Path**: `src/content/comparisons/[lang]/[slug].mdx`

## Components Used

| Component | Purpose |
|-----------|---------|
| `ComparisonTable` | Таблица сравнения specs (TODO) |
| `ProductCard` × N | Карточки сравниваемых продуктов |
| `AffiliateButton` × N | Кнопки для каждого продукта |
| `AffiliateDisclosure` | Disclosure above the fold |
| `VerdictSection` | Рекомендация по выбору |

## Required Frontmatter

```yaml
title: "Product A vs Product B"
description: "Comparison description"
pubDate: 2026-01-09
products:
  - slug: "product-a"
    asin: "B0XXXXXXXX"
  - slug: "product-b"
    asin: "B0YYYYYYYY"
category: "mini-pcs"
winner: "product-a"  # optional
```

## TODO
- [ ] Create comparison collection schema
- [ ] Build ComparisonTable component
- [ ] Create comparison page template
