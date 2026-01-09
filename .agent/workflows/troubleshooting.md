---
description: Common issues and solutions for HardwareLab project
---

# Troubleshooting Guide

## Build Errors

### Error: "Cannot find module '@/...'"

**Cause:** Path alias not configured or incorrect  
**Solution:**
1. Check `tsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

2. Restart dev server:
```bash
npm run dev
```

### Error: "Expected a default export"

**Cause:** Component file doesn't export properly  
**Solution:**
```astro
<!-- ❌ Wrong -->
---
export const MyComponent = () => { ... }
---

<!-- ✅ Correct - Astro components don't need exports -->
---
// Just write your component
---
<div>Content</div>
```

### Error: "getCollection is not defined"

**Cause:** Wrong import or collection doesn't exist  
**Solution:**
```astro
---
// ✅ Correct import
import { getCollection } from 'astro:content';

// Check collection name matches config.ts
const reviews = await getCollection('reviews'); // not 'review'
---
```

## Content Collection Errors

### Error: "Collection 'reviews' does not exist"

**Cause:** Collection not defined in `src/content/config.ts`  
**Solution:**
1. Check `src/content/config.ts` has the collection
2. Ensure folder exists: `src/content/reviews/`
3. Restart dev server

### Error: "Frontmatter validation failed"

**Cause:** MDX frontmatter doesn't match schema  
**Solution:**
1. Check `src/content/config.ts` for required fields
2. Ensure all required fields are present:
```yaml
---
title: "Required"
description: "Required"
pubDate: 2026-01-04  # Must be valid date
rating: 4.5          # Must be number 0-5
amazonAsin: "B0XXX"  # Required string
priceCategory: "mid" # Must be enum value
---
```

### Error: "Cannot read properties of undefined"

**Cause:** Trying to access collection data that doesn't exist  
**Solution:**
```astro
---
const reviews = await getCollection('reviews');

// ❌ Wrong - might be empty
const firstReview = reviews[0];

// ✅ Correct - check first
const firstReview = reviews.length > 0 ? reviews[0] : null;
---

{firstReview && (
  <div>{firstReview.data.title}</div>
)}
```

## Styling Issues

### Dark mode not working

**Cause:** Missing dark mode class on html element  
**Solution:**
Check `src/layouts/Layout.astro`:
```astro
<html lang={lang} class="dark">
  <!-- or use script to toggle -->
</html>
```

Add toggle script:
```astro
<script is:inline>
  // Check localStorage or system preference
  if (localStorage.theme === 'dark' || 
      (!('theme' in localStorage) && 
       window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
</script>
```

### Tailwind classes not applying

**Cause:** Tailwind not configured or purge removing classes  
**Solution:**
1. Check `tailwind.config.mjs`:
```js
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  // ...
}
```

2. Avoid dynamic class names:
```astro
<!-- ❌ Wrong - Tailwind can't detect -->
<div class={`text-${color}-500`}>

<!-- ✅ Correct - Use full class names -->
<div class:list={[
  color === 'red' && 'text-red-500',
  color === 'blue' && 'text-blue-500'
]}>
```

## i18n Issues

### Language switcher not working

**Cause:** Incorrect path resolution  
**Solution:**
Check `src/components/layout/Header.astro`:
```astro
---
const currentPath = Astro.url.pathname;
const switchLanguage = (newLang: string) => {
  // Remove current lang prefix
  const pathWithoutLang = currentPath.replace(/^\/(en|fr|ru|de)/, '');
  // Add new lang prefix (unless default 'en')
  return newLang === 'en' ? pathWithoutLang : `/${newLang}${pathWithoutLang}`;
};
---
```

### Translations not showing

**Cause:** Translation key missing or wrong language code  
**Solution:**
1. Check `src/utils/i18n.ts` has the key
2. Verify language code matches:
```typescript
// ❌ Wrong
t('home.title', 'english')

// ✅ Correct
t('home.title', 'en')
```

## Image Issues

### Images not loading

**Cause:** Incorrect path or missing file  
**Solution:**
```astro
<!-- ✅ For public folder images -->
<img src="/images/product.jpg" alt="Product" />

<!-- ✅ For imported images (optimized) -->
---
import { Image } from 'astro:assets';
import productImg from '@/assets/product.jpg';
---
<Image src={productImg} alt="Product" />
```

### Images too large

**Cause:** Not optimized  
**Solution:**
1. Use Astro's Image component for auto-optimization
2. Or optimize manually:
```bash
# Install sharp (already in dependencies)
# Resize images before adding to public/
```

## Performance Issues

### Slow build times

**Cause:** Too many pages or large images  
**Solution:**
1. Optimize images before adding
2. Use incremental builds (Astro 3+)
3. Check for infinite loops in getCollection filters

### Slow page loads

**Cause:** Too much JavaScript or large images  
**Solution:**
1. Use `client:visible` or `client:idle` instead of `client:load`
2. Lazy load images:
```astro
<img loading="lazy" src="..." alt="..." />
```
3. Check bundle size:
```bash
npm run build
# Check dist/ folder size
```

## Development Issues

### Hot reload not working

**Cause:** File watcher issue or cache  
**Solution:**
```bash
# Stop dev server
# Clear cache
rm -rf .astro/
# Restart
npm run dev
```

### Port 4321 already in use

**Cause:** Previous dev server still running  
**Solution:**
```bash
# Find process
lsof -i :4321

# Kill process
kill -9 <PID>

# Or use different port
npm run dev -- --port 3000
```

## Deployment Issues

### 404 on deployed site

**Cause:** Routing issue or missing files  
**Solution:**
1. Check `dist/` folder has all files
2. Verify hosting configuration
3. For SPA-like routing, add redirects:
```toml
# netlify.toml
[[redirects]]
  from = "/*"
  to = "/404"
  status = 404
```

### Affiliate links broken

**Cause:** Missing Amazon tag or incorrect ASIN  
**Solution:**
1. Verify ASIN in frontmatter
2. Check `AffiliateButton.astro` constructs URL correctly:
```astro
---
const amazonUrl = `https://www.amazon.com/dp/${asin}?tag=yourtag-20`;
---
```

### Environment variables not working

**Cause:** Not prefixed with PUBLIC_ or not in .env  
**Solution:**
1. Create `.env` file:
```env
PUBLIC_SITE_URL=https://hardwarelab.com
AMAZON_TAG=yourtag-20
```

2. Access in Astro:
```astro
---
// ✅ PUBLIC_ prefix for client-side
const siteUrl = import.meta.env.PUBLIC_SITE_URL;

// ✅ No prefix for server-side only
const amazonTag = import.meta.env.AMAZON_TAG;
---
```

## Getting Help

### Debug Steps
1. Check browser console for errors
2. Check terminal for build errors
3. Clear cache and restart dev server
4. Check file paths are correct
5. Verify imports are correct

### Useful Commands
```bash
# Check for TypeScript errors
npx astro check

# Clear all caches
rm -rf .astro/ dist/ node_modules/.vite/

# Reinstall dependencies
rm -rf node_modules/
npm install

# Verbose build output
npm run build -- --verbose
```

---

## Error Codes Quick Reference

Quick lookup table for common errors:

| Code | Error | Solution |
|------|-------|----------|
| **E001** | `Cannot find module '@/...'` | Check tsconfig.json paths, restart dev |
| **E002** | `Expected a default export` | Astro components don't need exports |
| **E003** | `getCollection is not defined` | Import from `astro:content` |
| **E004** | `Collection does not exist` | Check src/content/config.ts |
| **E005** | `Frontmatter validation failed` | Check required fields in schema |
| **E006** | `Cannot read properties of undefined` | Handle empty arrays/objects |
| **E007** | `Port 4321 already in use` | Kill process: `lsof -i :4321` |
| **E008** | `404 on deployed site` | Check dist/ folder, routing config |
| **E009** | `Affiliate links broken` | Verify ASIN and tag parameter |
| **E010** | `Environment variables not working` | Use PUBLIC_ prefix for client-side |
| **E011** | `Dark mode not working` | Add `class="dark"` to html element |
| **E012** | `Tailwind classes not applying` | Avoid dynamic class names |
| **E013** | `Images not loading` | Check path: `/images/` for public |
| **E014** | `Hot reload not working` | Clear .astro/ cache, restart |
| **E015** | `Build fails silently` | Run `npm run build -- --verbose` |

### Search by Error Message
```bash
# Find solution by error text
grep -n "Your error message" .agent/workflows/troubleshooting.md
```

---

## Logging & Debugging Best Practices

### Console Logging Levels
```typescript
// Development only - remove before production
console.log('Debug:', data);           // General info
console.warn('Warning:', message);     // Potential issues
console.error('Error:', error);        // Actual errors
console.table(arrayOfObjects);         // Tabular data
console.group('Section');              // Grouped logs
console.groupEnd();
```

### Astro-Specific Debugging
```astro
---
// Server-side logging (visible in terminal)
console.log('Props:', Astro.props);
console.log('URL:', Astro.url.pathname);
console.log('Params:', Astro.params);

// Debug collection data
const reviews = await getCollection('reviews');
console.log('Reviews count:', reviews.length);
console.log('First review:', reviews[0]?.data);
---
```

### Conditional Logging
```typescript
// Only log in development
if (import.meta.env.DEV) {
  console.log('Debug info:', data);
}

// Create a debug utility
// src/utils/debug.ts
export const debug = (...args: unknown[]) => {
  if (import.meta.env.DEV) {
    console.log('[DEBUG]', ...args);
  }
};
```

### Error Tracking Setup
```typescript
// Wrap async operations
try {
  const data = await fetchData();
} catch (error) {
  console.error('Fetch failed:', error);
  // In production, send to error tracking service
  if (import.meta.env.PROD) {
    // sendToSentry(error);
  }
}
```

### Build-Time Debugging
```bash
# Verbose build output
npm run build -- --verbose

# Check for TypeScript errors
npx astro check

# Debug specific file
DEBUG=* npm run build 2>&1 | grep "filename"
```

### Production Debugging
```astro
<!-- Add debug info to page (remove before deploy) -->
<script is:inline>
  console.log('Page loaded at:', new Date().toISOString());
  console.log('User agent:', navigator.userAgent);
</script>
```

---

## Browser DevTools Usage

### Essential Panels

#### Elements Panel
```
Use for:
- Inspect DOM structure
- Check applied CSS classes
- Verify dark mode classes (dark:bg-zinc-900)
- Test hover/focus states

Shortcuts:
- Cmd/Ctrl + Shift + C → Select element
- Right-click element → "Force state" → :hover, :focus
```

#### Console Panel
```
Use for:
- View console.log output
- Test JavaScript expressions
- Check for errors (red text)

Useful commands:
- $0 → Currently selected element
- $('selector') → Query selector
- copy(object) → Copy to clipboard
- clear() → Clear console
```

#### Network Panel
```
Use for:
- Check image loading (size, format)
- Verify API calls
- Debug affiliate link redirects
- Check for 404 errors

Filters:
- Img → Show only images
- XHR → Show only fetch/ajax
- 3rd-party → External requests
```

#### Performance Panel
```
Use for:
- Record page load
- Identify slow components
- Check Core Web Vitals

Steps:
1. Click Record
2. Reload page
3. Stop recording
4. Analyze timeline
```

### Mobile Testing
```
1. Open DevTools (F12)
2. Click device icon (toggle device toolbar)
3. Select device preset:
   - iPhone 14 Pro (390x844)
   - iPad (768x1024)
   - Galaxy S21 (360x800)
4. Refresh page to test responsive design
```

### Lighthouse Audit
```
1. Open DevTools → Lighthouse tab
2. Select categories:
   ☑ Performance
   ☑ Accessibility
   ☑ Best Practices
   ☑ SEO
3. Click "Analyze page load"
4. Review scores and recommendations
```

### Debug Dark Mode
```javascript
// In console, toggle dark mode:
document.documentElement.classList.toggle('dark');

// Check current mode:
document.documentElement.classList.contains('dark');
```

### Debug Affiliate Links
```javascript
// In console, list all Amazon links:
document.querySelectorAll('a[href*="amazon"]').forEach(a => {
  console.log({
    href: a.href,
    rel: a.rel,
    hasTag: a.href.includes('tag=')
  });
});
```

### CSS Debugging
```
1. Select element in Elements panel
2. Check Computed tab for final styles
3. Look for crossed-out styles (overridden)
4. Use "Filter" to search for specific property

Common issues:
- Specificity conflicts (add more specific selector)
- Dark mode not applied (check parent has .dark class)
- Mobile styles not working (check @media queries)
```

### Copy Debug Info
```javascript
// Copy page info for bug reports:
copy({
  url: location.href,
  userAgent: navigator.userAgent,
  viewport: `${innerWidth}x${innerHeight}`,
  darkMode: document.documentElement.classList.contains('dark'),
  timestamp: new Date().toISOString()
});
```

---

### Resources
- [Astro Docs](https://docs.astro.build)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [MDX Docs](https://mdxjs.com/)
- [Chrome DevTools Docs](https://developer.chrome.com/docs/devtools/)
- Project README: `/README.md`
- Component Docs: `/LAYOUT_COMPONENTS.md`

