---
description: Content strategy, keyword research, and content calendar
---

# Content Strategy

`Status: Active. Align with .memory_bank/roadmap.md and .memory_bank/kpi-framework.md`

## Overview
Strategic approach to creating, optimizing, and maintaining content for maximum SEO impact and affiliate revenue.

---

## 1. Content Pillars

### Primary Categories
1. **Mini PC** - Intel NUC, Beelink, Mac mini
2. **SBC** - Raspberry Pi, Orange Pi
3. **NAS** - Synology, QNAP
4. **Gaming Consoles** - PlayStation, Xbox
5. **Gaming PCs** - handhelds and compact gaming systems
6. **Monitors** - gaming/workstation displays
7. **AI Workstations** - local AI-focused hardware builds

Non-goals:
- Do not expand languages beyond EN/FR/RU/DE.
- Do not expand categories beyond current hardware scope.

### Content Types
| Type | Purpose | Frequency |
|------|---------|-----------|
| Product Reviews | Affiliate conversions | 2-3/week |
| Comparison Articles | SEO keywords | 1/week |
| How-to Guides | Traffic building | 2/month |
| Best-of Lists | High conversion | 1/month |

---

## 2. Keyword Research Workflow

### Step 1: Seed Keywords
```
[product name] review
[product name] vs [competitor]
best [category] 2026
[product name] specs
[product name] worth it
```

### Step 2: Research Tools
1. **Google Keyword Planner** (free with Ads account)
2. **Ubersuggest** (free tier available)
3. **Google Search Console** (existing rankings)
4. **AnswerThePublic** (question ideas)

### Step 3: Keyword Selection Criteria
- Search volume: > 100/month
- Competition: Low to Medium
- Intent: Transactional (buyer intent)
- Relevance: Matches our products

### Step 4: Document Keywords
Save to `content/keywords.csv`:
```csv
keyword,volume,difficulty,intent,priority
"raspberry pi 5 review",2400,30,transactional,high
"synology vs qnap 2026",880,25,comparative,high
"best mini pc homelab",1200,45,transactional,medium
```

---

## 3. Content Calendar Template

### Monthly Planning
| Week | EN | FR | DE | RU |
|------|----|----|----|----|
| 1 | [Product] Review | Translation | Translation | Translation |
| 2 | Comparison Article | [Product] Review | Translation | Translation |
| 3 | [Product] Review | Translation | [Product] Review | Translation |
| 4 | Best-of List | Translation | Translation | [Product] Review |

### Review Schedule
Track in `content/schedule.md`:
```markdown
## January 2026

### Week 1 (Jan 6-12)
- [x] Synology DS423+ Review (EN)
- [ ] Synology DS423+ (FR, DE, RU)

### Week 2 (Jan 13-19)
- [ ] Raspberry Pi 5 vs Orange Pi 5 (EN)
- [ ] QNAP TS-464 Review (EN)
```

---

## 4. Review Template Structure

### Required Sections (in order)
1. **Intro Hook** (50-100 words)
   - What is it?
   - Who is it for?
   - Quick verdict preview

2. **Specs Section** (`<SpecGrid />`)
   - Key specifications
   - Comparison to competition

3. **Performance Analysis** (200-300 words)
   - Real benchmarks
   - Use case scenarios
   - Temperature/noise (if applicable)

4. **User Feedback** (`<UserFeedback />`)
   - 3+ real opinions from Reddit/forums
   - Mix of positive/negative

5. **Pros & Cons** (`<ProsCons />`)
   - 3-5 pros
   - 2-4 cons (be honest!)

6. **Verdict** (50-100 words)
   - Who should buy
   - Who should skip
   - Final rating justification

7. **CTA** (`<AffiliateButton />`)
   - Clear call-to-action
   - Multiple placements (top, middle, bottom)

---

## 5. Internal Linking Strategy

### Rules
1. Each review links to **3-5 related reviews**
2. Use **descriptive anchor text** (not "click here")
3. Link to **comparison articles** when available
4. Create **category hub pages** linking to all reviews

### Example Structure
```
/reviews/
├── /raspberry-pi-5/
│   └── Links to: Orange Pi 5, Raspberry Pi 4, NAS articles
├── /synology-ds423/
│   └── Links to: QNAP comparison, other NAS reviews
└── /comparisons/
    └── /raspberry-pi-5-vs-orange-pi-5/
```

---

## 6. Content Quality Checklist

### Before Publishing
- [ ] Title < 60 characters with primary keyword
- [ ] Meta description 150-160 characters
- [ ] Hero image optimized (< 200KB)
- [ ] All specs verified from official sources
- [ ] User quotes are real (with source)
- [ ] Affiliate links tested (don't click!)
- [ ] Internal links added (3-5)
- [ ] Translated to all active languages
- [ ] Pre-publish gate passed (`.agent/workflows/prepublish-affiliate-gate.md`)

### SEO Validation
- [ ] Primary keyword in H1
- [ ] Keywords in first paragraph
- [ ] Alt text on all images
- [ ] Schema markup present
- [ ] Canonical URL set

---

## 7. Content Refresh Strategy

### Monthly Tasks
1. Check top 10 pages for outdated info
2. Update prices (add "as of [date]")
3. Add new user feedback if available
4. Refresh "published date" if significant updates

### Quarterly Tasks
1. Full audit of all reviews
2. Update discontinued products
3. Add new comparison articles
4. Refresh best-of lists

### Triggers for Update
- Price drop > 20%
- New model released
- Major firmware update
- User reports issues

---

## 8. Competitor Analysis

### Monthly Checks
1. Search target keywords
2. Analyze top 3 competitors
3. Note:
   - Content length
   - Unique angles
   - Missing information
   - Better visuals

### Differentiation
Our advantages:
- Multi-language support
- Real user feedback integration
- Focus on homelab use cases
- Honest pros/cons

---

## 9. Content Performance Metrics

Canonical KPI definitions:
- `.memory_bank/kpi-framework.md`

### Track in GA4
| Metric | Target | Action if Below |
|--------|--------|-----------------|
| Time on Page | > 3 min | Add more content |
| Scroll Depth | > 75% | Improve structure |
| Affiliate CTR | > 3% | Better CTA placement |
| Bounce Rate | < 50% | Improve intro hook |

### Weekly Review
1. Check top 5 performing pages
2. Identify patterns
3. Replicate success

---

## Quick Reference: Creating New Review

```bash
# 1. Research (use browser tool)
# - Product specs
# - Amazon ASIN
# - Reddit feedback
# - Current pricing

# 2. Create file
mkdir -p src/content/reviews/en/product-name
touch src/content/reviews/en/product-name/index.mdx

# 3. Fill frontmatter
# - title, description, pubDate
# - asin, priceCategory, rating
# - heroImage, tags

# 4. Write content using template
# - Use components: SpecGrid, UserFeedback, ProsCons

# 5. Add image (save next to the review MDX)
cp product.jpg src/content/reviews/en/product-name.jpg

# 6. Verify
npm run dev
# Preview at localhost:4321/reviews/product-name

# 7. Translate
cp -r src/content/reviews/en/product-name src/content/reviews/fr/product-name
# Update content for French
```
