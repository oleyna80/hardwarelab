---
description: Guidelines for creating and modifying UI components
---

# Component Development Guidelines

## Component Architecture

### Directory Structure
```
src/components/
├── layout/          # Structural components (Header, Footer, Hero)
└── ui/              # Reusable UI components (Buttons, Cards, etc.)
```

### Naming Conventions
- **PascalCase** for component files: `AffiliateButton.astro`
- **Descriptive names**: `ProductCard.astro` not `Card.astro`
- **Suffix with framework**: `.astro` or `.tsx`

## Creating a New Component

### Step 1: Determine Component Type

**Use Astro (.astro) when:**
- Component is static or server-rendered
- No client-side interactivity needed
- Content-focused (cards, grids, layouts)

**Use React (.tsx) when:**
- Requires client-side state
- Has interactive elements (toggles, sliders)
- Needs lifecycle hooks

### Step 2: Define Props Interface

**Astro Component:**
```astro
---
interface Props {
  title: string;
  description?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const { 
  title, 
  description, 
  variant = 'primary',
  className = '' 
} = Astro.props;
---
```

**React Component:**
```tsx
interface Props {
  title: string;
  onClick: () => void;
  disabled?: boolean;
}

export default function Button({ title, onClick, disabled = false }: Props) {
  // Component logic
}
```

### Step 3: Implement Styling

**Use Tailwind Utilities:**
```astro
<button 
  class:list={[
    'px-4 py-2 rounded-lg font-medium transition-colors',
    variant === 'primary' && 'bg-indigo-600 hover:bg-indigo-700 text-white',
    variant === 'secondary' && 'bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700',
    className
  ]}
>
  {title}
</button>
```

**Dark Mode Support:**
Always include dark mode variants:
```
bg-white dark:bg-zinc-900
text-zinc-900 dark:text-zinc-100
border-zinc-200 dark:border-zinc-700
```

### Step 4: Add TypeScript Types

For complex props, create shared types:
```typescript
// src/types/components.ts
export interface ReviewData {
  title: string;
  rating: number;
  asin: string;
  priceCategory: 'budget' | 'mid' | 'high' | 'enterprise';
}
```

## Component Patterns

### 1. Card Component Pattern
```astro
---
interface Props {
  title: string;
  image?: string;
  href?: string;
  className?: string;
}

const { title, image, href, className = '' } = Astro.props;
const Component = href ? 'a' : 'div';
---

<Component 
  href={href}
  class:list={[
    'block rounded-lg border border-zinc-200 dark:border-zinc-800',
    'bg-white dark:bg-zinc-900 overflow-hidden',
    'transition-shadow hover:shadow-lg',
    className
  ]}
>
  {image && (
    <img src={image} alt={title} class="w-full h-48 object-cover" />
  )}
  <div class="p-4">
    <h3 class="text-lg font-semibold">{title}</h3>
    <slot />
  </div>
</Component>
```

### 2. Interactive Island Pattern
```astro
---
// Component.astro
import InteractiveComponent from './InteractiveComponent.tsx';
---

<div class="static-wrapper">
  <InteractiveComponent client:load />
</div>
```

```tsx
// InteractiveComponent.tsx
import { useState } from 'react';

export default function InteractiveComponent() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
```

### 3. Slot Pattern for Composition
```astro
---
// Container.astro
interface Props {
  title: string;
}
const { title } = Astro.props;
---

<section class="container mx-auto px-4 py-8">
  <h2 class="text-2xl font-bold mb-4">{title}</h2>
  
  <!-- Default slot -->
  <div class="content">
    <slot />
  </div>
  
  <!-- Named slot -->
  <aside class="sidebar">
    <slot name="sidebar" />
  </aside>
</section>
```

## Existing UI Components

### AffiliateButton.astro
**Purpose:** Amazon affiliate link button  
**Props:** `asin`, `label`, `variant`  
**Usage:**
```astro
<AffiliateButton asin="B0XXXXXX" label="Check Price" />
```

### SpecGrid.astro
**Purpose:** Display product specifications  
**Props:** `specs` (Record<string, string>)  
**Usage:**
```astro
<SpecGrid specs={{
  "CPU": "Intel i7-12700K",
  "RAM": "32GB DDR5"
}} />
```

### ProsCons.astro
**Purpose:** Pros and cons list  
**Props:** `pros`, `cons` (string arrays)  
**Usage:**
```astro
<ProsCons 
  pros={["Fast", "Quiet"]}
  cons={["Expensive"]}
/>
```

### UserFeedback.astro
**Purpose:** Display user reviews  
**Props:** `feedback` (array of {user, comment, sentiment})  
**Usage:**
```astro
<UserFeedback feedback={[
  { user: "John", comment: "Great!", sentiment: "positive" }
]} />
```

### ReviewHero.astro
**Purpose:** Hero section for review pages with rating badge  
**Props:** `image`, `imageAlt`, `rating`, `priceCategory`, `keySpecs`, `asin`  
**Usage:**
```astro
<ReviewHero 
  image={frontmatter.heroImage}
  imageAlt={frontmatter.heroImageAlt}
  rating={frontmatter.rating}
  priceCategory={frontmatter.priceCategory}
  keySpecs={[
    "CPU: ...",
    "Memory: ...",
    "Storage: ...",
    "Ports: ...",
    "Size: ..."
  ]}
  asin={frontmatter.asin}
/>
```

---

## Component Creation Checklist

Before creating a new component, complete this checklist:

### Pre-Creation
- [ ] Search for similar components in `src/components/`
- [ ] Check `.memory_bank/ui_extension/components/README.md` for existing solutions
- [ ] Determine type: Astro (static) or React (interactive)
- [ ] Plan Props interface

### During Creation
- [ ] File created in correct directory (`ui/` or `layout/`)
- [ ] Props interface defined with TypeScript
- [ ] All props have sensible defaults where appropriate
- [ ] Dark mode classes included
- [ ] Responsive design (mobile-first)
- [ ] `className` prop for customization
- [ ] Semantic HTML used
- [ ] ARIA labels for icons/interactive elements

### After Creation
- [ ] Test in light and dark mode
- [ ] Test on mobile viewport (DevTools)
- [ ] Test with edge cases (empty data, long text)
- [ ] Keyboard navigation works
- [ ] Added to `.memory_bank/ui_extension/components/README.md` docs
- [ ] Usage example provided

---

## Best Practices

### Performance
1. **Lazy Load Images:**
```astro
<img loading="lazy" src="..." alt="..." />
```

2. **Use Astro Islands Wisely:**
```astro
<!-- Only load when visible -->
<Component client:visible />

<!-- Load on idle -->
<Component client:idle />

<!-- Load immediately -->
<Component client:load />
```

3. **Optimize Imports:**
```astro
// ❌ Don't import entire library
import _ from 'lodash';

// ✅ Import only what you need
import { debounce } from 'lodash-es';
```

### Accessibility
1. **Semantic HTML:**
```astro
<!-- ✅ Good -->
<button>Click me</button>
<nav><ul><li><a href="...">Link</a></li></ul></nav>

<!-- ❌ Bad -->
<div onclick="...">Click me</div>
<div class="nav">...</div>
```

2. **ARIA Labels:**
```astro
<button aria-label="Close menu">
  <svg>...</svg>
</button>
```

3. **Keyboard Navigation:**
Ensure all interactive elements are keyboard accessible.

### Reusability
1. **Make components flexible with slots:**
```astro
<Card>
  <slot name="header" />
  <slot /> <!-- default content -->
  <slot name="footer" />
</Card>
```

2. **Use sensible defaults:**
```astro
const { variant = 'primary', size = 'md' } = Astro.props;
```

3. **Accept className for customization:**
```astro
interface Props {
  className?: string;
}

<div class:list={['base-classes', className]}>
```

## Testing Components

### Visual Testing
1. Test in light and dark mode
2. Test on mobile, tablet, desktop
3. Test with long content
4. Test with missing optional props

### Browser Testing
1. Chrome/Edge
2. Firefox
3. Safari (if possible)
4. Mobile browsers

## Documentation

When creating a component, add it to `.memory_bank/ui_extension/components/README.md`:

```markdown
## ComponentName.astro

**Purpose:** Brief description

**Props:**
- `propName: type` - Description
- `optional?: type` - Description (default: value)

**Usage:**
\`\`\`astro
<ComponentName prop="value" />
\`\`\`

**Example:**
[Screenshot or code example]
```

## Common Pitfalls

### ❌ Don't use `key` in Astro
```astro
<!-- ❌ Wrong - Astro doesn't use Virtual DOM -->
{items.map((item, i) => <div key={i}>{item}</div>)}

<!-- ✅ Correct -->
{items.map((item) => <div>{item}</div>)}
```

### ❌ Don't use React hooks in Astro
```astro
<!-- ❌ Wrong -->
---
import { useState } from 'react';
const [count, setCount] = useState(0);
---

<!-- ✅ Correct - Use React component -->
---
import Counter from './Counter.tsx';
---
<Counter client:load />
```

### ❌ Don't forget dark mode
```astro
<!-- ❌ Incomplete -->
<div class="bg-white text-black">

<!-- ✅ Complete -->
<div class="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
```

---

## Visual Examples

### AffiliateButton Variants
```
┌─────────────────────────────────────────────────────┐
│  🛒 Check Price on Amazon  →                        │  ← Primary (indigo/cyan bg)
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  🛒 Check Price on Amazon  →                        │  ← Secondary (dark bg)
└─────────────────────────────────────────────────────┘

┌─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┐
│  🛒 Check Price on Amazon  →                        │  ← Outline (border only)
└─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┘
```

### ProsCons Layout
```
┌─────────────────────────────────────────────────────┐
│  ✅ Pros                    │  ❌ Cons              │
│  ─────────────────────────  │  ───────────────────  │
│  • Fast performance         │  • Expensive          │
│  • Silent operation         │  • Limited ports      │
│  • Compact design           │                       │
└─────────────────────────────────────────────────────┘
```

### SpecGrid Layout
```
┌─────────────────────────────────────────────────────┐
│  CPU          │  Intel N100                         │
│  ────────────────────────────────────────────────   │
│  RAM          │  16GB DDR4                          │
│  ────────────────────────────────────────────────   │
│  Storage      │  512GB NVMe SSD                     │
│  ────────────────────────────────────────────────   │
│  Networking   │  2.5GbE x2                          │
└─────────────────────────────────────────────────────┘
```

---

## Component Testing Guidelines

### Unit Testing with Vitest
```typescript
// src/components/ui/__tests__/helpers.test.ts
import { describe, it, expect } from 'vitest';

describe('Affiliate URL Builder', () => {
  it('should include tag parameter', () => {
    const asin = 'B0XXXXXX';
    const tag = 'yourtag-20';
    const url = `https://www.amazon.com/dp/${asin}?tag=${tag}`;
    
    expect(url).toContain('?tag=');
    expect(url).toContain(asin);
  });

  it('should handle empty ASIN gracefully', () => {
    const asin = '';
    const result = asin || 'DEFAULT_ASIN';
    expect(result).toBe('DEFAULT_ASIN');
  });
});
```

### Visual Testing Checklist
For each component, verify:

| Test | Light Mode | Dark Mode | Mobile |
|------|------------|-----------|--------|
| Renders correctly | ☐ | ☐ | ☐ |
| Text readable | ☐ | ☐ | ☐ |
| Interactive states work | ☐ | ☐ | ☐ |
| No overflow/clipping | ☐ | ☐ | ☐ |

### Accessibility Testing
```bash
# Install axe-core for browser testing
npm install -D @axe-core/playwright

# Run in test
const results = await new AxeBuilder({ page }).analyze();
expect(results.violations).toHaveLength(0);
```

**Manual Checks:**
- Tab through all interactive elements
- Verify focus indicators visible
- Test with screen reader (VoiceOver/NVDA)
- Check color contrast (4.5:1 minimum)

---

## Performance Benchmarks

### Target Metrics
| Metric | Target | Tool |
|--------|--------|------|
| Component render time | < 50ms | Chrome DevTools |
| Bundle size contribution | < 5KB | Bundlewatch |
| First paint with component | < 100ms | Lighthouse |

### Measuring Performance
```typescript
// In browser console
performance.mark('component-start');
// ... component renders
performance.mark('component-end');
performance.measure('Component Render', 'component-start', 'component-end');
console.log(performance.getEntriesByName('Component Render'));
```

### Bundle Size Check
```bash
# Check individual component size
npx esbuild src/components/ui/AffiliateButton.astro --bundle --minify | wc -c
```

### Optimization Tips
1. **Avoid large dependencies** - Import only what you need
2. **Use `client:visible`** - Defer loading until visible
3. **Lazy load images** - Always use `loading="lazy"`
4. **Minimize re-renders** - Use memoization in React components

---

## Error Handling Patterns

### Props Validation
```astro
---
interface Props {
  asin: string;
  rating?: number;
}

const { asin, rating = 0 } = Astro.props;

// Validate required props
if (!asin) {
  console.error('AffiliateButton: asin prop is required');
}

// Validate prop ranges
const safeRating = Math.min(5, Math.max(0, rating));
---

{asin ? (
  <a href={`https://amazon.com/dp/${asin}`}>Buy Now</a>
) : (
  <span class="text-red-500">Missing ASIN</span>
)}
```

### Graceful Fallbacks
```astro
---
interface Props {
  image?: string;
  title: string;
}

const { image, title } = Astro.props;
const fallbackImage = '/images/placeholder.jpg';
---

<img 
  src={image || fallbackImage}
  alt={title}
  onerror={`this.src='${fallbackImage}'`}
  loading="lazy"
/>
```

### Empty State Handling
```astro
---
const reviews = await getCollection('reviews');
---

{reviews.length > 0 ? (
  <div class="grid gap-4">
    {reviews.map(review => <ReviewCard review={review} />)}
  </div>
) : (
  <div class="text-center py-12 text-zinc-500">
    <p>No reviews found.</p>
    <a href="/submit-review" class="text-indigo-600">Submit the first review</a>
  </div>
)}
```

### Error Boundaries (React Components)
```tsx
// src/components/ErrorBoundary.tsx
import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('Component error:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong.</div>;
    }
    return this.props.children;
  }
}
```

### Async Data Error Handling
```astro
---
let reviews = [];
let error = null;

try {
  reviews = await getCollection('reviews');
} catch (e) {
  error = e instanceof Error ? e.message : 'Failed to load reviews';
  console.error('Error loading reviews:', e);
}
---

{error ? (
  <div class="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
    <p class="text-red-700 dark:text-red-300">Error: {error}</p>
  </div>
) : (
  <ReviewGrid reviews={reviews} />
)}
```
