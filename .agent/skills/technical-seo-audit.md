---
name: Technical SEO Audit
description: Ensure platform infrastructure is optimized for search engines - metadata, structured data, Core Web Vitals, and link architecture.
---

# Technical SEO Audit

**Objective:** Ensure the platform infrastructure is perfectly optimized for search engines (Google/Bing).

## Audit Checklist (Architecture Level)

### 1. Metadata Strategy
- Every page MUST have `<head>` meta tags: Title, Description, Canonical URL, Open Graph (OG) images.
- Implemented via a central `BaseHead.astro` or `SEO.astro` component.

### 2. Structured Data (JSON-LD)
- **Review Schema:** Product reviews must output valid `Product` and `Review` schema.
- **Breadcrumbs:** Must be structurally valid.

### 3. Core Web Vitals (Technical)
- **LCP (Largest Contentful Paint):** Ensure Hero images are prioritized (`loading="eager"`).
- **CLS (Layout Shift):** All media must have aspect ratios defined.
- **INP (Interaction to Next Paint):** Minimize main-thread blocking JS.

### 4. Link Architecture
- Internal links must be `<a>` tags (crawlable), not `div` with `onClick`.
- Affiliate links must have `rel="nofollow sponsored"`.

## Action
When reviewing code, reject PRs that break Semantic HTML or miss SEO tags.
