---
description: Performance monitoring and optimization guidelines
---

# Performance Monitoring

## Overview
Maintain excellent Core Web Vitals and page speed for SEO and UX.

---

## 1. Core Web Vitals Targets

| Metric | Target | Tools |
|--------|--------|-------|
| LCP (Largest Contentful Paint) | < 2.5s | Lighthouse, PageSpeed |
| INP (Interaction to Next Paint) | < 200ms | Chrome DevTools |
| CLS (Cumulative Layout Shift) | < 0.1 | Lighthouse |

---

## 2. Real-Time Monitoring

### Web Vitals Library
Add to `src/layouts/Layout.astro`:
```astro
<script type="module">
  import {onLCP, onINP, onCLS} from 'https://unpkg.com/web-vitals@3/dist/web-vitals.attribution.js?module';

  function sendToAnalytics({name, value, rating, attribution}) {
    if (typeof gtag !== 'undefined') {
      gtag('event', name, {
        value: Math.round(name === 'CLS' ? value * 1000 : value),
        metric_rating: rating,
        debug_target: attribution?.element || 'unknown'
      });
    }
  }

  onLCP(sendToAnalytics);
  onINP(sendToAnalytics);
  onCLS(sendToAnalytics);
</script>
```

---

## 3. Image Optimization

### Astro Image Component
```astro
---
import { Image } from 'astro:assets';
import heroImage from '@/assets/images/product.jpg';
---

<Image 
  src={heroImage}
  alt="Product description"
  width={800}
  height={600}
  format="webp"
  quality={80}
  loading="lazy"
/>
```

### Manual Optimization
```bash
# Convert to WebP (using squoosh)
npx @aspect-build/cli --webp -q 80 public/images/*.jpg

# Resize large images
npx sharp-cli resize 1200 --withoutEnlargement public/images/*.jpg
```

### Image Guidelines
- Hero images: max 1200px width
- Thumbnails: max 400px width
- Format: WebP with JPEG fallback
- Use `loading="lazy"` for below-fold images
- Always specify `width` and `height`

---

## 4. Lighthouse CI Integration

### Setup
```bash
npm install -D @lhci/cli
```

### Configuration
Create `lighthouserc.js`:
```javascript
module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:4321/',
        'http://localhost:4321/reviews/',
        'http://localhost:4321/fr/',
      ],
      numberOfRuns: 3,
      startServerCommand: 'npm run preview',
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
```

### Run
```bash
npm run build
npx lhci autorun
```

---

## 5. Performance Budgets

### Bundle Size Limits
Create `.bundlewatch.config.json`:
```json
{
  "files": [
    {
      "path": "dist/_astro/*.js",
      "maxSize": "50kB"
    },
    {
      "path": "dist/_astro/*.css",
      "maxSize": "30kB"
    }
  ]
}
```

### Monitor After Build
```bash
npm install -D bundlewatch
npx bundlewatch
```

---

## 6. Common Performance Issues

### Issue: Slow LCP
**Cause:** Large hero image not optimized
**Fix:**
```astro
<!-- Preload critical image -->
<link rel="preload" as="image" href="/images/hero.webp" />

<!-- Use responsive images -->
<img
  src="/images/hero.webp"
  srcset="/images/hero-400.webp 400w, /images/hero-800.webp 800w"
  sizes="(max-width: 768px) 100vw, 800px"
  alt="..."
/>
```

### Issue: High CLS
**Cause:** Images without dimensions
**Fix:**
```astro
<!-- Always specify dimensions -->
<img src="..." alt="..." width="800" height="600" />

<!-- For dynamic content, reserve space -->
<div class="aspect-video bg-zinc-200">
  <img loading="lazy" ... />
</div>
```

### Issue: Slow INP
**Cause:** Heavy JavaScript
**Fix:**
```astro
<!-- Use client:visible for non-critical components -->
<InteractiveComponent client:visible />

<!-- Defer non-critical scripts -->
<script defer src="..."></script>
```

---

## 7. Optimization Checklist

### Pre-Deployment
- [ ] All images converted to WebP
- [ ] Images have explicit width/height
- [ ] Lazy loading for below-fold images
- [ ] Critical CSS inlined
- [ ] JavaScript bundle < 50KB
- [ ] Lighthouse score > 90

### Monitoring
- [ ] Web Vitals sending to GA4
- [ ] Lighthouse CI in GitHub Actions
- [ ] Weekly performance review

---

## 8. Quick Commands

```bash
# Run Lighthouse locally
npx lighthouse http://localhost:4321 --view

# Check bundle size
npm run build && du -sh dist/

# Optimize all images
find public/images -name "*.jpg" -exec npx sharp-cli resize 1200 {} \;

# Run full audit
npm run build && npx lhci autorun
```

---

## Performance Metrics Dashboard

Track in GA4 Custom Report:
1. LCP p75 (75th percentile)
2. CLS by page
3. INP by device type
4. Page load time trend
