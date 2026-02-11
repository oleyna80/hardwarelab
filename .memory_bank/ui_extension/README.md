# UI Extension

Документация шаблонов страниц HardwareLab.

## Page Templates

| Template | File | Purpose |
|----------|------|---------|
| [Review](pages/review-template.md) | `src/pages/reviews/[...slug].astro` | Обзоры продуктов |
| [Build](pages/build-template.md) | `src/pages/builds/[...slug].astro` | Build-обзоры (Multi-ASIN) |
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
| Review | ProductHeader, ShareButtons, AffiliateButton (sticky) + MDX (ReviewHero, SpecGrid, UserFeedback, ProsCons, AffiliateButton) |
| Build | BuildHero, ComponentsGrid, ShareButtons + MDX content |
| Category | ReviewCard grid |
| Homepage | ReviewBannerCarousel + ReviewCard grid |

---

→ Category-specific specs: [../content-specs/](../content-specs/)
