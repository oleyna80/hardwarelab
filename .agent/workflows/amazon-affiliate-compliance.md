---
description: Amazon Affiliate Program compliance requirements
---

# Amazon Affiliate Compliance Guide

## ⚠️ Critical Requirements

Amazon Associates Program has strict rules. **Violation can result in account termination.**

## 1. Disclosure Requirements

### Required Disclosure Text
Every page with affiliate links MUST include:

**English:**
> "As an Amazon Associate, I earn from qualifying purchases."

**French:**
> "En tant que Partenaire Amazon, je réalise un bénéfice sur les achats remplissant les conditions requises."

**German:**
> "Als Amazon-Partner verdiene ich an qualifizierten Verkäufen."

**Russian:**
> "Как партнер Amazon, я зарабатываю на соответствующих покупках."

### Placement Rules
1. **Above the fold** - Visible without scrolling
2. **Before first affiliate link** - User must see it first
3. **Clear and conspicuous** - Not hidden in fine print
4. **On every page** - Include in footer at minimum

### Implementation
```astro
<!-- In Footer.astro or review pages -->
<div class="affiliate-disclosure bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6">
  <p class="text-sm text-amber-900 dark:text-amber-100">
    {lang === 'en' && "As an Amazon Associate, I earn from qualifying purchases."}
    {lang === 'fr' && "En tant que Partenaire Amazon, je réalise un bénéfice sur les achats remplissant les conditions requises."}
    {lang === 'de' && "Als Amazon-Partner verdiene ich an qualifizierten Verkäufen."}
    {lang === 'ru' && "Как партнер Amazon, я зарабатываю на соответствующих покупках."}
  </p>
</div>
```

## 2. Link Requirements

### Proper Link Format
```html
<!-- ✅ Correct -->
<a href="https://www.amazon.com/dp/B0XXXXXX?tag=yourtag-20" 
   rel="nofollow sponsored"
   target="_blank">
  Product Name
</a>

<!-- ❌ Wrong - Missing tag -->
<a href="https://www.amazon.com/dp/B0XXXXXX">Product</a>

<!-- ❌ Wrong - Missing rel attributes -->
<a href="https://www.amazon.com/dp/B0XXXXXX?tag=yourtag-20">Product</a>
```

### Regional Tags
Use correct tag for each region:
- **US**: `yourtag-20`
- **UK**: `yourtag-21`
- **DE**: `yourtag-03`
- **FR**: `yourtag-21`
- **CA**: `yourtag-20`

### Link Attributes
Always include:
- `rel="nofollow sponsored"` - Required by Google and Amazon
- `target="_blank"` - Opens in new tab (optional but recommended)

## 3. Prohibited Practices

### ❌ Never Do This:
1. **No price claims without date:**
   - ❌ "Only $99!"
   - ✅ "As of January 2026, priced at $99 (subject to change)"

2. **No fake urgency:**
   - ❌ "Only 2 left in stock!"
   - ❌ "Sale ends tonight!"

3. **No misleading claims:**
   - ❌ "Best product ever"
   - ✅ "Highly rated by users"

4. **No email/social media links:**
   - Don't use affiliate links in emails
   - Don't use affiliate links in social media posts
   - Use Amazon's SiteStripe for social sharing

5. **No incentivized clicks:**
   - ❌ "Click here to support us"
   - ✅ "Check current price on Amazon"

6. **No shortened URLs:**
   - ❌ bit.ly/amazon-link
   - ✅ Full Amazon URL with tag

## 4. Content Requirements

### Product Reviews Must:
1. **Be honest** - Disclose both pros and cons
2. **Be original** - Don't copy manufacturer descriptions
3. **Add value** - Provide real insights, not just specs
4. **Stay current** - Update reviews when products change

### Prohibited Content:
- Adult/mature content
- Violence or illegal activities
- Discrimination or hate speech
- Misleading medical claims
- Children's content (special rules apply)

## 5. Image Usage

### Amazon Product Images
**Rules:**
1. Can use images from Amazon Product Advertising API
2. Must link to Amazon when using their images
3. Cannot modify Amazon images
4. Cannot use images to imply endorsement

**Recommended Approach:**
```astro
<!-- Use your own product photos or -->
<!-- Use images from manufacturer's press kit -->
<img src="/images/product-own-photo.jpg" alt="Product Name" />

<!-- If using Amazon API images: -->
<a href="amazon-affiliate-link">
  <img src="amazon-api-image-url" alt="Product" />
</a>
```

## 6. Pricing Information

### Rules:
1. **Never cache prices** - Must be real-time or clearly dated
2. **Include disclaimer:**
   > "Prices and availability are subject to change."

3. **Use proper format:**
```astro
<div class="price-info">
  <p class="text-sm text-zinc-600 dark:text-zinc-400">
    Price as of {new Date().toLocaleDateString()}: $XX.XX
  </p>
  <p class="text-xs text-zinc-500">
    Prices and availability are subject to change. 
    Check Amazon for current pricing.
  </p>
</div>
```

## 7. Cookie Duration & Attribution

### Important Facts:
- **24-hour cookie** - Commission earned if purchase within 24 hours
- **Shopping cart** - Commission on entire cart, not just linked item
- **Last click wins** - If user clicks another affiliate link, you lose commission

### Best Practices:
1. Place links strategically (top and bottom of review)
2. Use clear CTAs: "Check Current Price on Amazon"
3. Multiple link placements increase click probability

## 8. Compliance Checklist

Before publishing any review:

- [ ] Affiliate disclosure visible above fold
- [ ] All Amazon links include correct tag parameter
- [ ] All links have `rel="nofollow sponsored"`
- [ ] No price claims without date and disclaimer
- [ ] No misleading or exaggerated claims
- [ ] Content is original and adds value
- [ ] Images are properly licensed
- [ ] Disclosure in footer on every page
- [ ] Links tested and working
- [ ] Correct regional tag for language version

## 9. Monitoring & Maintenance

### Monthly Tasks:
1. **Check for broken links:**
```bash
# Use link checker tool
npm install -g broken-link-checker
blc https://your-site.com -ro
```

2. **Verify affiliate tags:**
   - Check Amazon Associates dashboard
   - Ensure clicks are being tracked

3. **Update discontinued products:**
   - Mark as discontinued
   - Suggest alternatives
   - Update affiliate links

### Quarterly Tasks:
1. Review Amazon Associates Operating Agreement
2. Update disclosure language if required
3. Audit top-performing content
4. Check for policy changes

## 10. Regional Differences

### Amazon.com (US)
- Most lenient policies
- Standard disclosure required

### Amazon.de (Germany)
- Stricter consumer protection laws
- Must clearly mark advertising: "Werbung" or "Anzeige"
- Additional disclosure may be required

### Amazon.fr (France)
- Must comply with French consumer law
- Clear advertising disclosure required

### Amazon.co.uk (UK)
- Must comply with ASA (Advertising Standards Authority)
- Clear disclosure required

## 11. Legal Considerations

### GDPR Compliance (EU)
If targeting EU users:
1. Cookie consent for Amazon cookies
2. Privacy policy mentioning affiliate program
3. Right to data access/deletion

### FTC Guidelines (US)
1. Clear and conspicuous disclosure
2. Disclosure must be unavoidable
3. Can't hide in "Terms" page

## 12. Account Protection

### Avoid Suspension:
1. **Never click your own links**
2. **Don't ask friends/family to buy**
3. **Don't use links in prohibited places**
4. **Keep disclosure visible**
5. **Update content regularly**
6. **Respond to Amazon emails promptly**

### If Suspended:
1. Review violation notice carefully
2. Fix all issues immediately
3. Submit appeal with detailed explanation
4. Be patient (can take weeks)

## 13. Automated Compliance Checking

### Script: Check Affiliate Links
Create `scripts/check-affiliate-links.js`:
```javascript
#!/usr/bin/env node
/**
 * Checks all HTML files for Amazon affiliate link compliance
 * Run: node scripts/check-affiliate-links.js
 */
const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

const REQUIRED_REL = ['nofollow', 'sponsored'];
const TAG_PATTERN = /[?&]tag=([^&]+)/;

async function checkCompliance() {
  const files = await glob('dist/**/*.html');
  let errors = [];
  let warnings = [];
  
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const amazonLinks = content.match(/<a[^>]*href="[^"]*amazon\.[^"]*"[^>]*>/gi) || [];
    
    for (const link of amazonLinks) {
      const href = link.match(/href="([^"]+)"/)?.[1];
      const rel = link.match(/rel="([^"]+)"/)?.[1] || '';
      
      // Check rel attributes
      const hasNofollow = rel.includes('nofollow');
      const hasSponsored = rel.includes('sponsored');
      
      if (!hasNofollow || !hasSponsored) {
        errors.push(`${file}: Missing rel="nofollow sponsored" on ${href}`);
      }
      
      // Check tag parameter
      const tagMatch = href?.match(TAG_PATTERN);
      if (!tagMatch) {
        errors.push(`${file}: Missing affiliate tag on ${href}`);
      }
    }
    
    // Check for disclosure
    const hasDisclosure = content.includes('Amazon Associate') || 
                          content.includes('Partenaire Amazon') ||
                          content.includes('Amazon-Partner') ||
                          content.includes('партнер Amazon');
    
    if (amazonLinks.length > 0 && !hasDisclosure) {
      warnings.push(`${file}: Page has affiliate links but no disclosure found`);
    }
  }
  
  console.log('\n=== Affiliate Compliance Report ===\n');
  
  if (errors.length) {
    console.log('❌ ERRORS:');
    errors.forEach(e => console.log(`  - ${e}`));
  }
  
  if (warnings.length) {
    console.log('\n⚠️ WARNINGS:');
    warnings.forEach(w => console.log(`  - ${w}`));
  }
  
  if (!errors.length && !warnings.length) {
    console.log('✅ All affiliate links are compliant!');
  }
  
  process.exit(errors.length ? 1 : 0);
}

checkCompliance();
```

### Add to package.json
```json
{
  "scripts": {
    "check:affiliate": "npm run build && node scripts/check-affiliate-links.js"
  }
}
```

### Run Check
```bash
npm run check:affiliate
```

---

## 14. Compliance Component Template

### AffiliateDisclosure.astro
Create `src/components/ui/AffiliateDisclosure.astro`:
```astro
---
interface Props {
  lang?: 'en' | 'fr' | 'de' | 'ru';
  variant?: 'inline' | 'banner' | 'footer';
  className?: string;
}

const { lang = 'en', variant = 'inline', className = '' } = Astro.props;

const disclosures = {
  en: 'As an Amazon Associate, I earn from qualifying purchases.',
  fr: 'En tant que Partenaire Amazon, je réalise un bénéfice sur les achats remplissant les conditions requises.',
  de: 'Als Amazon-Partner verdiene ich an qualifizierten Verkäufen.',
  ru: 'Как партнер Amazon, я зарабатываю на соответствующих покупках.'
};

const text = disclosures[lang] || disclosures.en;

const variantClasses = {
  inline: 'text-sm text-zinc-600 dark:text-zinc-400 italic',
  banner: 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 text-sm text-amber-900 dark:text-amber-100',
  footer: 'text-xs text-zinc-500 dark:text-zinc-500'
};
---

<div 
  class:list={[variantClasses[variant], className]}
  role="note"
  aria-label="Affiliate disclosure"
>
  {text}
</div>
```

### CompliantAffiliateLink.astro
Create `src/components/ui/CompliantAffiliateLink.astro`:
```astro
---
interface Props {
  asin: string;
  region?: 'us' | 'de' | 'fr' | 'uk';
  label: string;
  className?: string;
}

const { asin, region = 'us', label, className = '' } = Astro.props;

const domains = {
  us: 'amazon.com',
  de: 'amazon.de',
  fr: 'amazon.fr',
  uk: 'amazon.co.uk'
};

const tags = {
  us: import.meta.env.AMAZON_TAG_US || 'yourtag-20',
  de: import.meta.env.AMAZON_TAG_DE || 'yourtag-03',
  fr: import.meta.env.AMAZON_TAG_FR || 'yourtag-21',
  uk: import.meta.env.AMAZON_TAG_UK || 'yourtag-21'
};

const url = `https://www.${domains[region]}/dp/${asin}?tag=${tags[region]}`;
---

<a 
  href={url}
  rel="nofollow sponsored"
  target="_blank"
  class:list={[
    'inline-flex items-center gap-2 px-4 py-2 rounded-lg',
    'bg-amber-500 hover:bg-amber-600 text-white font-medium',
    'transition-colors',
    className
  ]}
  data-asin={asin}
  data-region={region}
>
  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.493.126.112.18.032.36-.193.54-.534.435-1.5.979-2.896 1.634-1.71.803-3.552 1.365-5.525 1.685-1.973.32-3.91.32-5.813 0-1.903-.32-3.69-.826-5.36-1.517-1.67-.69-3.07-1.468-4.2-2.333-.275-.218-.35-.416-.18-.614z"/>
  </svg>
  {label}
</a>
```

### Usage Example
```astro
---
import AffiliateDisclosure from '@/components/ui/AffiliateDisclosure.astro';
import CompliantAffiliateLink from '@/components/ui/CompliantAffiliateLink.astro';
---

<!-- At top of review (above the fold) -->
<AffiliateDisclosure lang="en" variant="banner" />

<!-- Product link -->
<CompliantAffiliateLink 
  asin="B0XXXXXXX" 
  region="us" 
  label="Check Price on Amazon" 
/>

<!-- In footer -->
<AffiliateDisclosure lang="en" variant="footer" />
```

---

## 15. Test Scenarios for Affiliate Links

### Playwright E2E Tests
Create `tests/affiliate-compliance.spec.ts`:
```typescript
import { test, expect } from '@playwright/test';

test.describe('Amazon Affiliate Compliance', () => {
  
  test('all affiliate links have required rel attributes', async ({ page }) => {
    await page.goto('/');
    
    // Find all Amazon links
    const amazonLinks = page.locator('a[href*="amazon."]');
    const count = await amazonLinks.count();
    
    for (let i = 0; i < count; i++) {
      const link = amazonLinks.nth(i);
      const rel = await link.getAttribute('rel');
      const href = await link.getAttribute('href');
      
      expect(rel, `Link ${href} missing rel`).toBeTruthy();
      expect(rel).toContain('nofollow');
      expect(rel).toContain('sponsored');
    }
  });

  test('all affiliate links have tag parameter', async ({ page }) => {
    await page.goto('/');
    
    const amazonLinks = page.locator('a[href*="amazon."]');
    const count = await amazonLinks.count();
    
    for (let i = 0; i < count; i++) {
      const href = await amazonLinks.nth(i).getAttribute('href');
      expect(href).toMatch(/[?&]tag=/);
    }
  });

  test('disclosure visible on review pages', async ({ page }) => {
    // Test each language
    const pages = ['/reviews/', '/fr/reviews/', '/de/reviews/', '/ru/reviews/'];
    
    for (const url of pages) {
      await page.goto(url);
      
      // Check for disclosure text in any language
      const disclosure = page.locator('text=/Amazon Associate|Partenaire Amazon|Amazon-Partner|партнер Amazon/i');
      
      // At least one disclosure should be visible
      await expect(disclosure.first()).toBeVisible();
    }
  });

  test('disclosure appears before first affiliate link', async ({ page }) => {
    await page.goto('/reviews/');
    
    const firstAffiliateLink = page.locator('a[href*="amazon."]').first();
    const disclosure = page.locator('[role="note"][aria-label*="disclosure"]').first();
    
    if (await firstAffiliateLink.count() > 0) {
      // Get positions
      const disclosureBox = await disclosure.boundingBox();
      const linkBox = await firstAffiliateLink.boundingBox();
      
      if (disclosureBox && linkBox) {
        expect(disclosureBox.y).toBeLessThan(linkBox.y);
      }
    }
  });

  test('no price claims without dates', async ({ page }) => {
    await page.goto('/reviews/');
    
    const content = await page.textContent('body');
    
    // Check for price patterns without dates
    const pricePatterns = [
      /only \$\d+!/i,
      /just \$\d+!/i,
      /sale price.*\$\d+/i
    ];
    
    for (const pattern of pricePatterns) {
      expect(content).not.toMatch(pattern);
    }
  });

  test('affiliate links open in new tab', async ({ page }) => {
    await page.goto('/reviews/');
    
    const amazonLinks = page.locator('a[href*="amazon."]');
    const count = await amazonLinks.count();
    
    for (let i = 0; i < count; i++) {
      const target = await amazonLinks.nth(i).getAttribute('target');
      expect(target).toBe('_blank');
    }
  });
});

test.describe('Regional Compliance', () => {
  
  test('German pages have proper advertising disclosure', async ({ page }) => {
    await page.goto('/de/reviews/');
    
    // German law requires clear "Werbung" or "Anzeige"
    const content = await page.textContent('body');
    const hasDisclosure = content?.includes('Amazon-Partner') || 
                          content?.includes('Werbung') ||
                          content?.includes('Anzeige');
    
    expect(hasDisclosure).toBeTruthy();
  });

  test('correct regional tags are used', async ({ page }) => {
    const regionTests = [
      { url: '/', expectedTag: '-20' },      // US
      { url: '/de/', expectedTag: '-03' },   // DE
      { url: '/fr/', expectedTag: '-21' },   // FR
    ];
    
    for (const { url, expectedTag } of regionTests) {
      await page.goto(url);
      const links = page.locator('a[href*="amazon."]');
      
      if (await links.count() > 0) {
        const href = await links.first().getAttribute('href');
        expect(href).toContain(expectedTag);
      }
    }
  });
});
```

### Run Tests
```bash
# Install Playwright
npm install -D @playwright/test
npx playwright install

# Run compliance tests
npx playwright test tests/affiliate-compliance.spec.ts

# Run with report
npx playwright test --reporter=html
```

### CI Integration
Add to `.github/workflows/test.yml`:
```yaml
compliance:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
    - run: npm ci
    - run: npm run build
    - run: npx playwright test tests/affiliate-compliance.spec.ts
```

---

## Resources

- [Amazon Associates Operating Agreement](https://affiliate-program.amazon.com/help/operating/agreement)
- [Amazon Associates Help](https://affiliate-program.amazon.com/help)
- [FTC Endorsement Guidelines](https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking)

---

**⚠️ This guide is for reference only. Always check the official Amazon Associates Operating Agreement for the most current requirements.**

