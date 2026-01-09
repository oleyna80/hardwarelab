# UI Extension

Документация шаблонов страниц HardwareLab.

## Page Templates

| Template | File | Purpose |
|----------|------|---------|
| [Review](pages/review-template.md) | `src/pages/reviews/[...slug].astro` | Обзоры продуктов |
| [Comparison](pages/comparison.md) | `src/pages/comparisons/[...slug].astro` | Сравнения продуктов |
| [Category](pages/category.md) | `src/pages/categories/[category].astro` | Страницы категорий |
| [Homepage](pages/homepage.md) | `src/pages/index.astro` | Главная страница |

## Data Flow

```
MDX Content → getCollection() → Page Template → Layout → HTML
     ↓
Frontmatter validated by src/content/config.ts
```

## Component Usage

| Page Type | Key Components |
|-----------|----------------|
| Review | ReviewHero, SpecsTable, AffiliateButton, ProsCons |
| Comparison | ComparisonTable, AffiliateButton |
| Category | ReviewCard grid, CategoryHero |
| Homepage | Hero, ReviewBannerCarousel, FeaturedReviews |

---

→ Category-specific specs: [../content-specs/](../content-specs/)
