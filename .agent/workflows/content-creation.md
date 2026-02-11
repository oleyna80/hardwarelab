---
description: Workflow for creating new content (reviews, blog posts)
---

# Content Creation Workflow

`Status: Detailed reference. Canonical orchestration is in .agent/workflows/review-creation-full.md`

## Quick Reference: Review Creation

```bash
# Lean pipeline (default)
1. single-researcher (external) → _research-pack.md
2. researcher (internal) → EN index.mdx + image.webp + og.png
3. translator → RU/DE/FR index.mdx + asset sync
4. qa (final gate) → build/compliance/i18n pass
5. prepublish gate → npm run check:affiliate + release decision
```

---

## Creating a New Review

### Step 1: Research (15 min)

**Using Browser Tool:**
1. **Official Specs:** Search manufacturer website
2. **Amazon Page:** Get ASIN and current price for target region
3. **User Feedback:** Search Reddit (r/homelab, r/sysadmin) for real opinions
4. **Benchmarks:** Find performance data if applicable

**Data to Collect:**
```yaml
Product: [Full Name]
ASIN: 
  US: B0XXXXXXX
  DE: B0XXXXXXX
  FR: B0XXXXXXX
Price: $XXX (as of YYYY-MM-DD)
Category: budget | mid | high | enterprise
Specs:
  CPU: ...
  RAM: ...
  Storage: ...
User Quotes:
  - Positive: "..."
  - Negative: "..."
  - Neutral: "..."
```

### Step 2: Create MDX File

**Location:** `src/content/reviews/[lang]/[slug]/index.mdx`

```bash
# Create file
mkdir -p src/content/reviews/en/product-name
touch src/content/reviews/en/product-name/index.mdx
```

**Frontmatter Template:**
```yaml
---
title: "Product Review: Key Benefit (50-60 chars)"
description: "150-160 character description with 2-3 keywords."
pubDate: 2026-01-07
lastUpdated: 2026-01-07
heroImage: "./image.webp"
heroImageAlt: "Product name with context"
ogImage: "./og.png"
category: "mini-pc"
tags: ["mini-pc", "brand-model", "key-feature"]
socialPublish: true
socialText: "Optional social hook (1-2 lines)."
socialHighlights:
  - "Optional highlight #1."
  - "Optional highlight #2."
asin: "B0XXXXXXX"
rating: 4.5
priceCategory: "mid"
---
```

### Step 3: Write Content

**Structure with Components:**

```mdx
import SpecGrid from '@/components/ui/SpecGrid.astro';
import ProsCons from '@/components/ui/ProsCons.astro';
import UserFeedback from '@/components/ui/UserFeedback.astro';
import AffiliateButton from '@/components/ui/AffiliateButton.astro';
import ReviewHero from '@/components/ui/ReviewHero.astro';

<ReviewHero 
  image={frontmatter.heroImage}
  imageAlt={frontmatter.heroImageAlt}
  rating={frontmatter.rating}
  priceCategory={frontmatter.priceCategory}
  keySpecs={[
    "CPU: Intel N100",
    "RAM: 16GB DDR4",
    "Storage: 512GB NVMe SSD"
  ]}
  asin={frontmatter.asin}
/>

> **Disclosure:** As an Amazon Associate, we earn from qualifying purchases.

## Introduction

[2-3 paragraphs: What is this product? Who is it for? Quick verdict preview]

## Specifications

<SpecGrid specs={{
  "CPU": "Intel N100",
  "RAM": "16GB DDR4",
  "Storage": "512GB NVMe SSD",
  "Networking": "2.5GbE x2"
}} />

## Performance

[Real-world benchmarks and use case analysis]

## User Experience

<UserFeedback feedback={[
  // 6 quotes total recommended (balanced sentiment; keep quote length similar)
  { user: "Reddit User (r/subreddit)", comment: "…", sentiment: "positive" },
  { user: "Reddit User (r/subreddit)", comment: "…", sentiment: "negative" },
  { user: "Reddit User (r/subreddit)", comment: "…", sentiment: "neutral" },
  { user: "Reddit User (r/subreddit)", comment: "…", sentiment: "positive" },
  { user: "Reddit User (r/subreddit)", comment: "…", sentiment: "negative" },
  { user: "Reddit User (r/subreddit)", comment: "…", sentiment: "neutral" }
]} />

## Pros & Cons

<ProsCons 
  pros={["Fast", "Quiet", "Upgradeable"]}
  cons={["Expensive", "Limited ports", "No included storage upgrade"]}
/>

## Verdict

[Final recommendation: who should buy, who should skip]

<AffiliateButton asin={frontmatter.asin} label="View on Amazon" />
```

### Step 4: Add Images

**Skill:** `Visual Asset Generator`

Use the **Visual Asset Generator** skill to create brand-consistent images.

```text
Use the visual-asset-generator skill to create Hero and OG images for [Product Name].
[Optional: Attach reference image if available]
```

**What this skill does:**
- Generates Hero `image.webp` (High-end product shot)
- Generates Social `og.png` (With branding text)
- Saves them to the correct directory
- Updates your MDX imports automatically

**Manual Requirements (if not using skill):**
- Hero format: `image.webp`
- OG format: `og.png`
- Max width: 1200px
- Max file size: 200KB
- Alt text: Descriptive, include product name

### Step 5: Preview & Verify

```bash
npm run dev
# Open http://localhost:4321/reviews/product-name
```

**Verification Checklist:**
- [ ] Page renders without errors
- [ ] Hero image displays correctly
- [ ] All components render (SpecGrid, ProsCons, etc.)
- [ ] Affiliate button links to correct Amazon page
- [ ] Disclosure visible above the fold
- [ ] Responsive design (test mobile view)
- [ ] Dark mode works

---

## Translation Workflow

### Step 1: Create translation files (RU/DE/FR)
```bash
# Create the target directories (or let your editor do it)
mkdir -p src/content/reviews/fr/product-name
mkdir -p src/content/reviews/de/product-name
mkdir -p src/content/reviews/ru/product-name

# Translate EN `index.mdx` into each language (keep MDX structure and component props unchanged)
```

### Step 2: Copy required assets to translations (critical)
```bash
node .agent/skills/scripts/copy-assets-to-translations.mjs product-name
```

This copies `image.webp` + `og.png` from EN into `ru/de/fr` folders so `astro build` doesn't fail.

### Step 2.5: Pre-publish affiliate gate
Before release, run the canonical gate:
- `.agent/workflows/prepublish-affiliate-gate.md`

### Step 3: Verify Each Language
```bash
npm run dev
# Check /fr/reviews/product-name
# Check /de/reviews/product-name
# Check /ru/reviews/product-name
```

---

## Content Types

### Product Review (Primary)
- **Length:** 800-1500 words
- **Components:** All (SpecGrid, ProsCons, UserFeedback, AffiliateButton)
- **Goal:** Affiliate conversion

### Comparison Article
- **Length:** 1000-2000 words
- **Structure:** Intro → Product 1 → Product 2 → Comparison Table → Verdict
- **Goal:** SEO rankings, internal linking

### How-To Guide
- **Length:** 500-1000 words
- **Structure:** Problem → Solution → Steps → Related Products
- **Goal:** Traffic building, product mentions

### Best-Of List
- **Length:** 1500-3000 words
- **Structure:** Intro → Product 1 (with mini-review) → Product 2... → Summary
- **Goal:** High conversion rate

---

## Quality Checklist

### Content Quality
- [ ] All specs verified from official sources
- [ ] Real user quotes included (with source context)
- [ ] Honest pros AND cons listed
- [ ] No price claims without "as of [date]"
- [ ] Original content (not copied from manufacturer)

### SEO Requirements
- [ ] Title < 60 characters
- [ ] Description 150-160 characters
- [ ] Primary keyword in H1
- [ ] Keyword in first paragraph
- [ ] 3-5 internal links to related content

### Technical Requirements
- [ ] All imports correct (`@/components/ui/...`)
- [ ] Frontmatter validates against schema
- [ ] Images < 200KB and have alt text
- [ ] Affiliate links have `rel="nofollow sponsored"`
- [ ] Disclosure text present above first CTA

### Accessibility
- [ ] Proper heading hierarchy (H1 → H2 → H3)
- [ ] All images have descriptive alt text
- [ ] Links have descriptive text (not "click here")
- [ ] Color contrast meets WCAG 2.1

---

## Common Mistakes to Avoid

❌ **Don't:** Use "Best Ever!" or exaggerated claims  
✅ **Do:** "Rated highly by homelab users"

❌ **Don't:** Copy manufacturer descriptions  
✅ **Do:** Write original analysis with real insights

❌ **Don't:** Show prices without date  
✅ **Do:** "As of January 2026, priced at $299"

❌ **Don't:** Forget affiliate disclosure  
✅ **Do:** Include disclosure above first affiliate link

❌ **Don't:** Use placeholder images  
✅ **Do:** Use real product photos or AI-generated images

---

## AI-Assisted Review Generation

### Source of truth (current prompts)
Use the prompts in `prompts/` (v1.3.0) for AI-assisted review creation:
- `prompts/master_prompt_v_1_3_0.md` (format + strict validation)
- `prompts/review-workflow-two-pass.md` (recommended two-pass process)
- `prompts/asin-hunter-protocol.md` (ASIN discovery)
- `prompts/existing-reviews-hardwarelab.md` (internal link source of truth)
- `prompts/error-prevention-guide.md` (reference / common mistakes)

```bash
# Open the master prompt as reference
cat prompts/master_prompt_v_1_3_0.md
```

### AI Workflow
1. **Research First** - Use browser to gather real specs and user feedback
2. **Generate Draft** - Follow the master prompt format exactly
3. **Verify Facts** - Cross-check all specs against official sources
4. **Add Real Quotes** - Replace AI quotes with actual Reddit/forum feedback
5. **Localize** - Adapt for target market (different ASINs, currencies)

### AI Prompt Template
```
Product: [Name]
ASIN: [B0XXXXXXX]
Target: [EN/FR/DE/RU]
Category: [gaming|gaming-pcs|monitors|ai-workstation|mini-pc|nas|sbc]
priceCategory: [budget|mid|high|enterprise]

Research findings:
- Specs: [CPU, RAM, Storage]
- User feedback: [6 verbatim quotes]
- Price: $XXX

Generate review following prompts/master_prompt_v_1_3_0.md format and run its pre-output validation checklist.
```

---

## Example Reviews (Templates)

### High-Performing Review: Raspberry Pi 5
**File:** `src/content/reviews/en/raspberry-pi-5/index.mdx`

**What works:**
- Clear title with product name
- Specs verified from official Raspberry Pi website
- Real Reddit quotes from r/raspberry_pi
- Balanced pros/cons (not just praise)
- Required components present (ReviewHero, SpecGrid, UserFeedback, ProsCons, AffiliateButton)

### Mini PC Review Template
**File:** `src/content/reviews/en/beelink-ser5-5500u/index.mdx`

**Structure:**
1. Hook: "Looking for a compact but powerful homelab server?"
2. Specs table with CPU benchmarks
3. Real power consumption measurements
4. Noise level analysis
5. Comparison to alternatives
6. Clear verdict with use case recommendations

### Reference: All Existing Reviews
```bash
# List all reviews for reference
ls -la src/content/reviews/en/

# For internal links, use `prompts/existing-reviews-hardwarelab.md` as the source of truth.
```

---

## Keyword Research Guidelines

### Research Process
1. **Seed Keywords:**
   ```
   [product] review
   [product] vs [competitor]
   best [category] 2026
   [product] specs
   is [product] worth it
   ```

2. **Free Tools:**
   - Google Keyword Planner (with Ads account)
   - Google Search Console (existing rankings)
   - Ubersuggest (3 free searches/day)
   - AnswerThePublic (question ideas)

3. **Selection Criteria:**
   | Factor | Target |
   |--------|--------|
   | Search Volume | > 100/month |
   | Competition | Low-Medium |
   | Intent | Transactional (buyer) |
   | Relevance | Matches our products |

### Keyword Mapping
```yaml
# Example for Raspberry Pi 5
primary: "raspberry pi 5 review"
secondary:
  - "raspberry pi 5 specs"
  - "raspberry pi 5 vs 4"
  - "best sbc 2026"
  - "raspberry pi 5 homelab"
longtail:
  - "is raspberry pi 5 good for home server"
  - "raspberry pi 5 power consumption"
```

### Title Formula
```
[Primary Keyword]: [Benefit/Hook] | HardwareLab
```
Examples:
- "Raspberry Pi 5 Review: Finally Ready for Serious Workloads"
- "Synology DS423+ Review: The Perfect 4-Bay NAS for Power Users"

---

## A/B Testing for Titles

### Testing Strategy
1. **Create 2-3 title variants** for high-priority reviews
2. **Track in Google Search Console** (CTR by query)
3. **Update after 2-4 weeks** based on data

### Title Variants to Test

| Type | Example |
|------|---------|
| Question | "Is the Raspberry Pi 5 Worth It in 2026?" |
| Benefit | "Raspberry Pi 5: 3x Faster Than Its Predecessor" |
| VS/Comparison | "Raspberry Pi 5 vs Orange Pi 5: Which Should You Buy?" |
| Best-For | "Raspberry Pi 5 Review: Best SBC for Home Servers" |
| Year | "Raspberry Pi 5 Review 2026: Still the Best Choice?" |

### Tracking Setup
```yaml
# Track in content/tracking.yaml
raspberry-pi-5:
  original_title: "Raspberry Pi 5 Review"
  test_title: "Raspberry Pi 5: Is It Worth the Upgrade?"
  start_date: 2026-01-15
  original_ctr: 3.2%
  test_ctr: null
  winner: pending
```

### Decision Criteria
- **Keep new title** if CTR improves by >0.5%
- **Revert** if CTR drops or no change after 4 weeks
- **Test one element** at a time (title vs description)

---

## Content Calendar

### Weekly Schedule
| Day | Task | Output |
|-----|------|--------|
| Mon | Research new product | Research notes |
| Tue | Write EN review | Draft MDX |
| Wed | Add images, optimize | Published EN |
| Thu | Translate FR/DE | Drafts |
| Fri | Translate RU, publish all | 4 language versions |

### Monthly Goals
```markdown
## January 2026

### Week 1 (Jan 6-12)
- [x] Synology DS423+ Review (EN)
- [x] Translations (FR, DE, RU)

### Week 2 (Jan 13-19)
- [ ] Intel NUC 14 Pro Review
- [ ] Raspberry Pi 5 vs Orange Pi 5 (Comparison)

### Week 3 (Jan 20-26)
- [ ] Best Mini PCs 2026 (Best-of List)
- [ ] PlayStation 5 Pro (3-month update)

### Week 4 (Jan 27-Feb 2)
- [ ] QNAP TS-464 Review
- [ ] Month-end: Update all prices
```

### Publishing Frequency
- **Reviews:** 2-3 per week (EN), translations follow
- **Comparisons:** 1 per week
- **Best-of Lists:** 1 per month
- **Updates:** Refresh top 5 pages monthly

---

## Image Optimization Workflow

### Step-by-Step Commands
```bash
# 1. Download/create product image
# Save as: product-name-original.jpg

# 2. Resize to max 1200px width
npx sharp-cli -i product-name-original.jpg -o product-name.jpg resize 1200

# 3. Convert to WebP (recommended)
npx sharp-cli -i product-name.jpg -o product-name.webp --format webp --quality 80

# 4. Check file size (target: <200KB)
ls -lh product-name.webp

# 5. Move next to the review MDX (same folder)
REVIEW_DIR="src/content/reviews/en"
mv product-name.webp "$REVIEW_DIR/"

# 6. Update frontmatter
heroImage: "./product-name.webp"
```

### Batch Optimization
```bash
# Install sharp-cli globally
npm install -g sharp-cli

# Optimize all images in folder
for file in *.jpg; do
  npx sharp-cli -i "$file" -o "${file%.jpg}.webp" --format webp --quality 80
done

# Check all sizes
ls -lh *.webp
```

### Image Checklist
- [ ] Max 1200px width
- [ ] WebP format preferred
- [ ] File size < 200KB
- [ ] Descriptive filename (product-name.webp)
- [ ] Alt text in frontmatter/component
- [ ] loading="lazy" for below-fold images

### AI Image Generation (when no product photo)
```
Prompt for product image:
"Professional product photography of [product name], 
white background, soft lighting, 3/4 angle view, 
high resolution, clean and minimal style"
```

---

## Cross-Linking Strategy

### Rules
1. **Each review links to 3-5 related reviews**
2. **Use descriptive anchor text** (not "click here")
3. **Link in context** (within relevant paragraphs)
4. **Create hub pages** linking to category reviews

### Link Types
| Type | Example |
|------|---------|
| Same Category | Synology → QNAP NAS review |
| Competitor | Raspberry Pi 5 → Orange Pi 5 |
| Accessory | NAS → Recommended HDDs |
| Comparison | Link to "[A] vs [B]" article |

### Link Placement
```mdx
## Performance

The Raspberry Pi 5 delivers impressive performance for its size. 
If you need even more power, check out our 
[Orange Pi 5 Plus review](/reviews/orange-pi-5-plus) which offers 
a faster CPU at a similar price point.

For NAS usage, we've tested it alongside the 
[Synology DS423+](/reviews/synology-ds423-plus) in our homelab 
comparison.
```

### Cross-Link Matrix
Maintain a simple matrix to track links:

```
                    | Pi5 | OPi5 | NUC | Synology |
--------------------|-----|------|-----|----------|
Raspberry Pi 5      |  -  |  ✓   |  ✓  |    ✓     |
Orange Pi 5 Plus    |  ✓  |  -   |  ✓  |          |
Intel NUC 13        |  ✓  |  ✓   |  -  |    ✓     |
Synology DS423+     |  ✓  |      |  ✓  |    -     |
```

### Automated Link Check
```bash
# Find reviews without internal links
grep -L "](/reviews/" src/content/reviews/en/*/index.mdx

# Count internal links per review
for file in src/content/reviews/en/*/index.mdx; do
  count=$(grep -c "](/reviews/" "$file" 2>/dev/null || echo 0)
  echo "$file: $count internal links"
done
```

---

## Related Workflows

- `/content-strategy` - Keyword research and content planning
- `/seo-optimization` - SEO checklist and best practices
- `/amazon-affiliate-compliance` - Legal requirements
- `/component-development` - Creating custom components
- `prompts/master_prompt_v_1_3_0.md` - Review generation (source of truth)
- `prompts/review-workflow-two-pass.md` - Two-pass writing process
- `prompts/error-prevention-guide.md` - Reference checklist
