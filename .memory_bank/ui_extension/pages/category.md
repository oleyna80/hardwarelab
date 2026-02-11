# Category Page Template

## Purpose
Category landing page that lists reviews matching a category (new schema) or matching a set of tags (legacy fallback).

## File Location
`src/pages/categories/[category].astro`

## Data Source
- **Collection**: `reviews`
- **Schema**: `src/content/config.ts`
- **Filtering**:
  - Prefer `review.data.category === category`
  - Fallback: `review.data.tags` contains one of `categoryMappings[category]`

## Components Used

| Component | Purpose |
|-----------|---------|
| `Layout` | Page wrapper + SEO |
| `ReviewCard` | Review previews grid |

## Notes
- Category metadata (title/description/icon) is defined in-file (`categoryInfo`).
- Current implementation is EN-first; locale support may be added later.
