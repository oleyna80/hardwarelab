# Homepage Template

## Purpose
English homepage showing the latest reviews and category navigation.

## File Location
`src/pages/index.astro`

## Data Source
- **Collection**: `reviews`
- **Filtering**: `review.id.startsWith('en/')`
- **Sorting**: newest first by `pubDate`

## Components Used

| Component | Purpose |
|-----------|---------|
| `Layout` | Page wrapper + SEO |
| `ReviewBannerCarousel` | Top carousel of review banners |
| `ReviewCard` | Latest reviews grid |

## Notes
- The homepage currently renders the latest 6 EN reviews.
- Category links point to `/categories/...` routes.
