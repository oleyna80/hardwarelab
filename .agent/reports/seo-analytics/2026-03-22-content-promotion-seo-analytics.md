# SEO Analytics Report: Content Promotion Strategy

**Date:** 2026-03-22
**Task Slug:** content-promotion-strategy

## Summary
The current HardwareLab content ecosystem has a solid foundation based on granular, technically verified reviews across 7 core categories (Mini PCs, NAS, SBCs, Monitors, etc.) and comprehensive multi-language support (EN, FR, DE, RU). The on-page technical SEO (H1, meta lengths, JSON-LD, hreflang) is well-standardized via agent workflows. However, to scale traffic and affiliate conversions, the project needs to evolve from single-product reviews to structured topical hubs and aggressive comparative content.

## SEO Findings
1. **Strengths:** 
   - Strict adherence to character limits for Titles and Meta Descriptions ensures robust SERP snippets.
   - Internal linking density (3-5 links per article) is mandated, which helps crawler traversal.
   - Multilingual hreflang deployment is correctly mapped.
2. **Gaps & Opportunities:**
   - **Pillar/Hub Pages:** We have 25+ reviews but lack strong "Best [Category] of 2026" hub pages. Individual reviews capture long-tail queries, but hub pages capture high-volume transactional head terms.
   - **Comparative Intent:** Missing active execution of `[Product A] vs [Product B]` vs articles. These have lower search volume but exceptionally high conversion rates.
   - **Schema Breadth:** Current schema focuses on `Product` and `Review`. Hub pages will require `ItemList` structured data to dominate rich results.

## Analytics Findings
1. **Strengths:** 
   - Clear KPI framework defined for GA4 (Time on Page > 3m, Scroll Depth > 75%, Affiliate CTR > 3%).
2. **Gaps & Opportunities:**
   - **Engagement Hurdles:** To hit the >3 min time on page target consistently, reviews need better interactive UX (e.g., floating table of contents, sticky affiliate CTA buttons on mobile).
   - **Translation ROI Tracking:** GA4 must be segmented to track Affiliate CTR by locale (`/fr/`, `/de/`, `/ru/`) to determine if translation effort is yielding conversions or just empty traffic.

## Recommendations
### P0 (Critical for Growth)
1. **Build Category Hub Pages:** Immediately construct `Best Mini PCs for Homelabs [Year]`, `Best Budget NAS [Year]`, etc. Link all existing granular reviews into these hubs.
2. **Launch "VS" Series:** Pair up previously reviewed products (e.g., `Raspberry Pi 5 vs Orange Pi 5 Plus`) and publish comparative MDX articles.
3. **Locale-Specific Backlinking:** Initiate off-page link building for the `/fr/` and `/de/` paths. Excellent on-page translations won't rank in localized Googles without regional domain authority.

### P1 (UX & Technical)
1. **Rich Results Expansion:** Implement `ItemList` schema for the new Hub pages.
2. **Sticky CTAs:** Add a persistent (sticky) "View on Amazon" mobile button to boost the >3% CTR target, as users often lose the bottom CTA in long technical reviews.

## Revision Prompt for Tech Lead/Coder
```text
Please implement the following based on the SEO Analytics audit:
1. Create a dynamic `/best-of/` or `/guides/` template that aggregates existing review MDX files based on their frontmatter tags.
2. Implement `ItemList` JSON-LD schema generation for these new hub pages.
3. Update the `AffiliateButton.astro` component to support an optional `sticky={true}` prop for mobile viewports.
```

---
NEXT: Tech Lead (Planning)

Open `.agent/roles/tech-lead.md` and follow it strictly.

INPUTS:
- TASK: Apply P0/P1 SEO/Analytics fixes from audit
- SEO/Analytics report: .agent/reports/seo-analytics/2026-03-22-content-promotion-strategy-seo-analytics.md
