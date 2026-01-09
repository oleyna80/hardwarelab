---
description: Deployment and production build workflow
---

# Deployment Workflow

## Pre-Deployment Checklist

### Code Quality
- [ ] All TypeScript errors resolved
- [ ] No console.log statements in production code
- [ ] All images optimized
- [ ] No broken internal links
- [ ] All affiliate links tested

### Content Review
- [ ] All reviews have proper frontmatter
- [ ] Amazon ASINs are correct for each region
- [ ] All images have alt text
- [ ] SEO meta tags complete
- [ ] Affiliate disclosures present

### Performance
- [ ] Run Lighthouse audit (score > 90)
- [ ] Check Core Web Vitals
- [ ] Test on mobile devices
- [ ] Verify lazy loading works

## Build Process

### Step 1: Clean Build
```bash
# Remove old build
rm -rf dist/

# Clean cache
rm -rf .astro/
```

### Step 2: Production Build
```bash
npm run build
```

### Step 3: Verify Build
```bash
# Preview production build locally
npm run preview

# Check for build warnings
# Verify all pages render correctly
# Test affiliate links
```

### Step 4: Test Critical Paths
1. Homepage loads correctly
2. Review pages display properly
3. Language switcher works
4. Affiliate buttons link correctly
5. Images load and are optimized
6. Navigation works on all pages

## Deployment Options

### Option 1: Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

**Configuration** (`netlify.toml`):
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/404"
  status = 404
```

### Option 2: Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Option 3: Cloudflare Pages
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy

### Option 4: AWS S3 + CloudFront
```bash
# Build
npm run build

# Sync to S3
aws s3 sync dist/ s3://your-bucket-name/ --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

## Post-Deployment

### Immediate Checks
1. Visit live site and verify homepage
2. Test 3-5 random review pages
3. Verify all language versions work
4. Test affiliate links (don't click through)
5. Check mobile responsiveness
6. Verify sitemap.xml is accessible
7. Check robots.txt

### SEO Tasks
1. Submit sitemap to Google Search Console
2. Submit sitemap to Bing Webmaster Tools
3. Verify hreflang tags in Google Search Console
4. Check for crawl errors

### Monitoring Setup
1. Set up Google Analytics
2. Configure Google Search Console
3. Set up uptime monitoring
4. Configure error tracking (Sentry, etc.)

## Rollback Procedure

If deployment fails:

### Netlify/Vercel
1. Go to deployment dashboard
2. Find previous successful deployment
3. Click "Publish" on old deployment

### Manual Rollback
```bash
# Revert to previous commit
git revert HEAD

# Rebuild and redeploy
npm run build
# Deploy using your method
```

## Environment Variables

Required for production:
```env
# Analytics
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Amazon Affiliate
AMAZON_TAG_US=yourtag-20
AMAZON_TAG_FR=yourtag-21
AMAZON_TAG_DE=yourtag-03
AMAZON_TAG_UK=yourtag-21

# Site URL
PUBLIC_SITE_URL=https://hardwarelab.com
```

## Continuous Deployment

### GitHub Actions (Optional)
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - name: Deploy
        run: |
          # Your deployment command
```

## Maintenance Schedule

### Weekly
- Check for broken links
- Monitor Core Web Vitals
- Review analytics for top pages

### Monthly
- Update dependencies
- Review and update old content
- Check affiliate link validity
- Analyze SEO performance

### Quarterly
- Major content refresh
- Competitor analysis
- Performance optimization review
- Security audit
