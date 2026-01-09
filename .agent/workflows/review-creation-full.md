---
description: Complete workflow for creating product reviews
---

# Review Creation: Full Workflow
## Phase 1: Research (20 min)
// turbo
1. Use browser to research product specs on manufacturer site
2. Check Amazon page for target region (get ASIN)
3. Search Reddit for user feedback (r/homelab, r/buildapc)
4. Find 3 distinct user opinions (1 positive, 1 negative, 1 neutral)
5. Verify current pricing
## Phase 2: Content Generation (15 min)
1. Use prompts/review-generator.md as base
2. Fill frontmatter with researched data
3. Write intro (2-3 paragraphs)
4. Add SpecGrid component
5. Write performance section with real data
6. Add UserFeedback component with quotes
7. Write verdict
8. Add ProsCons component
9. Add AffiliateButton
## Phase 3: Assets (10 min)
1. Download product image or generate with AI
2. Optimize image: `npx @squoosh/cli --webp -q 85 image.jpg`
3. Save to public/images/[product-slug].jpg
4. Add heroImage to frontmatter
## Phase 4: SEO Optimization (10 min)
1. Verify title < 60 chars, includes keyword
2. Verify description 150-160 chars
3. Add 3-5 relevant tags
4. Check internal links to related reviews
5. Verify affiliate disclosure present
## Phase 5: Quality Check (10 min)
// turbo
1. Run dev server: `npm run dev`
2. Preview page in browser
3. Test affiliate links (hover, don't click own links!)
4. Check mobile responsiveness
5. Verify dark mode
6. Run Lighthouse audit
Total time: ~65 min per review