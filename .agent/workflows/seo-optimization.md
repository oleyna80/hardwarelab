---
description: SEO optimization guidelines for HardwareLab
---

# SEO Optimization Guidelines

## Meta Tags Requirements

### Every Page Must Have:
1. **Title Tag**: 50-60 characters
   - Format: "Product Name Review | HardwareLab"
   - Include primary keyword
   
2. **Meta Description**: 150-160 characters
   - Include target keyword
   - Call to action
   - Unique for each page

3. **Open Graph Tags**:
   ```html
   <meta property="og:title" content="..." />
   <meta property="og:description" content="..." />
   <meta property="og:image" content="..." />
   <meta property="og:type" content="article" />
   ```

4. **Canonical URL**: Always set to avoid duplicate content

## Content SEO Rules

### Keyword Strategy
1. **Primary Keyword**: Product name + "review"
2. **Secondary Keywords**: 
   - "[Product] specs"
   - "[Product] performance"
   - "[Product] vs [competitor]"
   - "Best [category] 2026"

### Content Structure
1. **H1**: Only one per page, include primary keyword
2. **H2**: Include variations of primary keyword
3. **H3**: Use for subsections
4. **First Paragraph**: Must contain primary keyword
5. **Image Alt Text**: Descriptive, include product name

### Internal Linking
- Link to related reviews (3-5 per article)
- Link to category pages
- Link to comparison articles
- Use descriptive anchor text (not "click here")

## Technical SEO

### Performance
- **Core Web Vitals**:
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1
- Optimize images (WebP format preferred)
- Lazy load images below fold
- Minify CSS/JS

### Structured Data
Add JSON-LD schema for:
1. **Product Schema**:
```json
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Product Name",
  "image": "...",
  "description": "...",
  "brand": "...",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "reviewCount": "1"
  }
}
```

2. **Review Schema**:
```json
{
  "@context": "https://schema.org/",
  "@type": "Review",
  "itemReviewed": { ... },
  "author": {
    "@type": "Organization",
    "name": "HardwareLab"
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "4.5"
  }
}
```

### Sitemap & Robots
- Generate sitemap.xml automatically
- Include all language versions
- Update robots.txt to allow all crawlers
- Submit sitemap to Google Search Console

## Multilingual SEO

### Hreflang Tags
Add for each language version:
```html
<link rel="alternate" hreflang="en" href="https://..." />
<link rel="alternate" hreflang="fr" href="https://..." />
<link rel="alternate" hreflang="ru" href="https://..." />
<link rel="alternate" hreflang="de" href="https://..." />
<link rel="alternate" hreflang="x-default" href="https://..." />
```

### URL Structure
- `/` - English (default)
- `/fr/` - French
- `/ru/` - Russian
- `/de/` - German

## Amazon Affiliate Compliance

### Required Disclosures
1. **Above the fold** on review pages
2. Clear language: "As an Amazon Associate, we earn from qualifying purchases"
3. Must be visible before first affiliate link
4. Include in footer on all pages

### Link Best Practices
- Use clean Amazon links (remove unnecessary parameters)
- Add `tag=your-tag-20` parameter
- Use `rel="nofollow sponsored"` on affiliate links
- Track clicks with UTM parameters

## Content Freshness
- Update reviews every 6 months
- Add "Last Updated" date
- Monitor for price changes
- Update discontinued products

## Monitoring
- Track rankings for target keywords
- Monitor Core Web Vitals
- Check for broken links monthly
- Analyze top-performing content
- A/B test titles and descriptions
