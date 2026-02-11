# 🛡️ Error Prevention Guide v1.3.0

**Purpose:** Quick reference for preventing common errors  
**Use:** Check before generating each review

---

## 🔴 TOP 6 ERRORS (and how to prevent them)

### Error #1: Quoted Dates ❌ → ✅

**Symptom:** Build fails with "Expected date, received string"

**Wrong:**
```yaml
pubDate: "2026-01-09"
lastUpdated: "2026-01-09"
```

**Right:**
```yaml
pubDate: 2026-01-09
lastUpdated: 2026-01-09
```

**Prevention:**
- NEVER add quotes around dates
- Use ISO format: YYYY-MM-DD
- No other formats accepted

---

### Error #2: Absolute Image Paths ❌ → ✅

**Symptom:** Images don't load, 404 errors

**Wrong:**
```yaml
heroImage: "/images/reviews/product/image.webp"
heroImage: "/public/images/product.webp"
```

**Right:**
```yaml
heroImage: "./image.webp"
```

**Prevention:**
- Images live in SAME folder as index.mdx
- ALWAYS use relative path: `./image.webp`
- NEVER use `/images/` or `/public/`

---

### Error #3: Incomplete ReviewHero ❌ → ✅

**Symptom:** Component fails to render, blank section

**Wrong:**
```jsx
<ReviewHero asin={frontmatter.asin} />
```

**Right:**
```jsx
<ReviewHero
  image={frontmatter.heroImage}
  imageAlt={frontmatter.heroImageAlt}
  rating={frontmatter.rating}
  priceCategory={frontmatter.priceCategory}
  keySpecs={[
    "CPU: Spec",
    "Memory: Spec",
    "Storage: Spec",
    "Ports: Spec",
    "Size: Spec"
  ]}
  asin={frontmatter.asin}
/>
```

**Prevention:**
- ALWAYS include ALL 6 props
- Copy complete example from template
- keySpecs must have 3-5 items
- Do NOT add `productName` (it is not a prop in the current `ReviewHero` component)

---

### Error #4: Description Too Long ❌ → ✅

**Symptom:** SEO degraded, search engines truncate

**Wrong (185 chars):**
```yaml
description: "This is a very long description that exceeds the 160 character limit and will cause SEO issues because search engines truncate descriptions that are too long and users won't see full text."
```

**Right (157 chars):**
```yaml
description: "Apple's 5×5\" Mac mini with M4 and 16GB RAM is a quiet powerhouse for office and dev work—if you can live with 256GB SSD."
```

**Prevention:**
- COUNT chars BEFORE outputting
- Range: 150-160 chars (strict)
- If over: remove filler words, shorten

---

### Error #5: Wrong Field Names ❌ → ✅

**Symptom:** Fields not recognized, validation errors

**Wrong:**
```yaml
imageAlt: "Product description"
```

**Right:**
```yaml
heroImageAlt: "Product description"
```

**Prevention:**
- Field name is `heroImageAlt` (not `imageAlt`)
- Check spelling exactly
- Copy from template if unsure

---

### Error #6: Paraphrased Quotes ❌ → ✅

**Symptom:** User feedback sounds fake, not authentic

**Wrong:**
```jsx
{
  user: "techuser",
  sentiment: "positive",
  comment: "Says the product is fast and works well for development tasks."
}
```

**Right:**
```jsx
{
  user: "techuser",
  sentiment: "positive",
  comment: "This thing is ridiculously fast. Compile times cut in half vs my old Intel setup."
}
```

**Prevention:**
- Use user's EXACT words from Reddit/forum
- NO "Says...", "Reports...", "Mentions..."
- Keep user's tone and language style
- Quote length: 2-4 sentences (no one-liners; do not truncate mid-thought)

---

## ✅ PRE-OUTPUT CHECKLIST

**Check ALL before generating:**

### Frontmatter (7 checks):
- [ ] Dates unquoted? (`2026-01-09` not `"2026-01-09"`)
- [ ] Title 50-60 chars? (count now: _____ chars)
- [ ] Description 150-160 chars? (count now: _____ chars)
- [ ] heroImage relative? (`./image.webp`)
- [ ] heroImageAlt field name? (not `imageAlt`)
- [ ] rating is number? (4.7 not "4.7")
- [ ] priceCategory valid? ("budget"|"mid"|"high"|"enterprise")

### Components (5 checks):
- [ ] All imports: `@/components/ui/`?
- [ ] ReviewHero: ALL 6 props?
- [ ] keySpecs: array with 3-5 items?
- [ ] UserFeedback BEFORE ProsCons?
- [ ] UserFeedback has 4-6 quotes (balanced sentiment; for symmetry prefer 4 or 6) and each quote is DIRECT + 2-4 sentences (no one-liners / no truncation)?

**SpecGrid note:** `SpecGrid` expects `specs: Record<string, string>` (object format), not an array.

### Content (3 checks):
- [ ] 3-5 internal links (from list)?
- [ ] Category sections complete?
- [ ] Amazon disclosure present?

**Total: 15 checks. All must be ✅**

---

## 📋 TEMPLATE QUICK COPY

**Frontmatter (copy this):**
```yaml
---
title: "Product Review: Benefit (50-60 chars)"
description: "Description here (150-160 chars)."
pubDate: 2026-01-09
lastUpdated: 2026-01-09
heroImage: "./image.webp"
heroImageAlt: "Product with context"
category: "gaming"
tags: ["gaming", "brand", "feature"]
asin: "B0XXXXXXXXX"
rating: 4.7
priceCategory: "mid"
---
```

**ReviewHero (copy this):**
```jsx
<ReviewHero
  image={frontmatter.heroImage}
  imageAlt={frontmatter.heroImageAlt}
  rating={frontmatter.rating}
  priceCategory={frontmatter.priceCategory}
  keySpecs={[
    "CPU: Specification",
    "Memory: Specification",
    "Storage: Specification",
    "Ports: Specification",
    "Size: Specification"
  ]}
  asin={frontmatter.asin}
/>
```

---
**END OF ERROR PREVENTION GUIDE v1.3.0**
