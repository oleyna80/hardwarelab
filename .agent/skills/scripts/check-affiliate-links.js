#!/usr/bin/env node
/**
 * Checks all HTML files for Amazon affiliate link compliance
 * Run: node scripts/check-affiliate-links.js
 */
import fs from 'fs';
import { glob } from 'glob';

const AMAZON_LINK_PATTERN = /<a[^>]*href="[^"]*amazon\.[^"]*"[^>]*>/gi;
const TAG_PATTERN = /[?&]tag=([^&"]+)/;
const PRODUCT_PATH_PATTERN = /amazon\.[^/]+\/(?:[^"]*\/)?(?:dp|gp\/product|gp\/aw\/d|exec\/obidos\/ASIN)\//i;
const PLACEHOLDER_TAGS = ['YOUR_AMAZON_TAG-20', 'yourtag-20', 'your-tag-20'];

async function checkCompliance() {
  const files = await glob('dist/**/*.html');

  if (files.length === 0) {
    console.log('⚠️ No HTML files found in dist/. Run "npm run build" first.');
    process.exit(1);
  }

  let errors = [];
  let warnings = [];
  let totalAmazonLinks = 0;
  let totalAffiliateLinks = 0;

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const amazonLinks = content.match(AMAZON_LINK_PATTERN) || [];
    let pageAffiliateLinks = 0;

    totalAmazonLinks += amazonLinks.length;

    for (const link of amazonLinks) {
      const href = link.match(/href="([^"]+)"/)?.[1];
      const rel = link.match(/rel="([^"]+)"/)?.[1] || '';
      if (!href) continue;

      // Skip non-product links (help pages, etc)
      if (href.includes('/help/') || href.includes('/gp/help/')) {
        continue;
      }

      const tagMatch = href.match(TAG_PATTERN);
      const isProductLink = PRODUCT_PATH_PATTERN.test(href);
      const isAffiliateLink = Boolean(tagMatch);

      if (isAffiliateLink) {
        totalAffiliateLinks += 1;
        pageAffiliateLinks += 1;
      }

      // Check rel attributes on monetized/product links
      const hasNofollow = rel.includes('nofollow');
      const hasSponsored = rel.includes('sponsored');
      if ((isAffiliateLink || isProductLink) && (!hasNofollow || !hasSponsored)) {
        errors.push(`${file}: Missing rel="nofollow sponsored"`);
      }

      // Product links must include affiliate tag.
      if (isProductLink && !tagMatch) {
        errors.push(`${file}: Missing affiliate tag on link`);
      } else if (tagMatch && PLACEHOLDER_TAGS.includes(tagMatch[1])) {
        warnings.push(`${file}: Using placeholder tag "${tagMatch[1]}" - update .env with real tag`);
      }
    }

    // Check for disclosure
    const hasDisclosure = content.includes('Amazon Associate') ||
      content.includes('Partenaire Amazon') ||
      content.includes('Amazon-Partner') ||
      content.includes('партнер Amazon');

    if (pageAffiliateLinks > 0 && !hasDisclosure) {
      warnings.push(`${file}: No affiliate disclosure found`);
    }
  }

  console.log('\n=== Affiliate Compliance Report ===\n');
  console.log(`Scanned ${files.length} pages, found ${totalAffiliateLinks} affiliate links (${totalAmazonLinks} Amazon links total)\n`);

  if (errors.length) {
    console.log('❌ ERRORS (must fix):');
    [...new Set(errors)].forEach(e => console.log(`  - ${e}`));
  }

  if (warnings.length) {
    console.log('\n⚠️ WARNINGS (review needed):');
    [...new Set(warnings)].slice(0, 5).forEach(w => console.log(`  - ${w}`));
    if (warnings.length > 5) {
      console.log(`  ... and ${warnings.length - 5} more`);
    }
  }

  if (!errors.length && !warnings.length) {
    console.log('✅ All affiliate links are compliant!');
  } else if (!errors.length) {
    console.log('\n✅ No critical errors. Fix warnings when ready.');
  }

  console.log('');
  process.exit(errors.length ? 1 : 0);
}

checkCompliance();
