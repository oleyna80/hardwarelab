---
description: Testing strategy for code quality and reliability
---

# Testing Strategy

## Overview
This guide covers testing approaches for HardwareLab to ensure code quality, accessibility, and performance.

---

## 1. Component Testing

### Setup
```bash
# Install testing dependencies
npm install -D vitest @testing-library/dom jsdom
```

### Configuration
Create `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
  },
});
```

Add to `package.json`:
```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

### Test Patterns
```typescript
// src/components/ui/AffiliateButton.test.ts
import { describe, it, expect } from 'vitest';

describe('AffiliateButton', () => {
  it('should generate correct Amazon URL with tag', () => {
    const asin = 'B0XXXXXX';
    const tag = 'yourtag-20';
    const url = `https://www.amazon.com/dp/${asin}?tag=${tag}`;
    
    expect(url).toContain(asin);
    expect(url).toContain(tag);
  });
});
```

---

## 2. E2E Testing with Playwright

### Setup
```bash
npm install -D @playwright/test
npx playwright install
```

### Configuration
Create `playwright.config.ts`:
```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  webServer: {
    command: 'npm run preview',
    port: 4321,
  },
  use: {
    baseURL: 'http://localhost:4321',
  },
});
```

### Critical Path Tests
```typescript
// tests/affiliate-links.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Affiliate Links', () => {
  test('all affiliate links have rel="nofollow sponsored"', async ({ page }) => {
    await page.goto('/reviews/');
    
    const affiliateLinks = await page.locator('a[href*="amazon.com"]').all();
    
    for (const link of affiliateLinks) {
      const rel = await link.getAttribute('rel');
      expect(rel).toContain('nofollow');
      expect(rel).toContain('sponsored');
    }
  });

  test('affiliate disclosure is visible', async ({ page }) => {
    await page.goto('/reviews/');
    const disclosure = page.locator('[class*="affiliate-disclosure"]');
    await expect(disclosure).toBeVisible();
  });
});

// tests/i18n.spec.ts
test.describe('Internationalization', () => {
  test('language switcher works', async ({ page }) => {
    await page.goto('/');
    await page.click('[data-lang="fr"]');
    await expect(page).toHaveURL(/\/fr\//);
  });
});
```

---

## 3. Accessibility Testing

### Automated (axe-core)
```bash
npm install -D @axe-core/playwright
```

```typescript
// tests/accessibility.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('homepage should pass accessibility audit', async ({ page }) => {
  await page.goto('/');
  
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();
  
  expect(results.violations).toEqual([]);
});
```

### Manual Checklist
- [ ] All images have `alt` text
- [ ] Buttons have accessible names
- [ ] Color contrast ratio ≥ 4.5:1
- [ ] All interactive elements keyboard accessible
- [ ] Focus indicators visible

---

## 4. Visual Regression Testing

### Setup with Playwright
```typescript
// tests/visual.spec.ts
import { test, expect } from '@playwright/test';

test('homepage visual regression', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('homepage.png', {
    fullPage: true,
    threshold: 0.1,
  });
});

test('review page visual regression', async ({ page }) => {
  await page.goto('/reviews/raspberry-pi-5/');
  await expect(page).toHaveScreenshot('review-page.png');
});
```

Update screenshots:
```bash
npx playwright test --update-snapshots
```

---

## 5. Performance Testing

### Lighthouse CI
```bash
npm install -D @lhci/cli
```

Create `lighthouserc.js`:
```javascript
module.exports = {
  ci: {
    collect: {
      url: ['/', '/reviews/', '/fr/'],
      numberOfRuns: 3,
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      },
    },
  },
};
```

Run:
```bash
npm run build
npx lhci autorun
```

---

## 6. Pre-commit Testing Workflow

### Install Husky
```bash
npm install -D husky lint-staged
npx husky init
```

Create `.husky/pre-commit`:
```bash
#!/bin/sh
npx lint-staged
npx astro check
```

Create `.lintstagedrc`:
```json
{
  "*.{ts,tsx,astro}": ["prettier --write"],
  "*.{ts,tsx}": ["vitest related --run"]
}
```

---

## 7. CI/CD Integration

### GitHub Actions
```yaml
# .github/workflows/test.yml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npx astro check
      - run: npm test
      
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run build
      - run: npx playwright test
      
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci && npm run build
      - run: npx lhci autorun
```

---

## Quick Commands Reference

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# E2E tests
npx playwright test

# Update visual snapshots
npx playwright test --update-snapshots

# Lighthouse audit
npm run build && npx lhci autorun

# Accessibility check
npx astro check
```

---

## Test Coverage Goals

| Area | Coverage | Priority |
|------|----------|----------|
| Affiliate Links | 100% | Critical |
| Accessibility | All pages | Critical |
| i18n Routing | All languages | High |
| Components | Core UI | Medium |
| Visual Regression | Key pages | Medium |
