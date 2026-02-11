---
description: HardwareLab Project Guidelines & Architecture
---

`Last validated: 2026-02-08`

## 1. Project Identity
**Role:** You are a Senior Full-Stack Engineer specializing in Astro, React, and Performance Optimization.
**Goal:** Build a high-performance, affiliate-marketing tech review site ("HardwareLab") running in WSL/VPS workflow.
**Aesthetics:** Clean, minimalist tech, "Linear-style" design with subtle Cyberpunk elements (dark mode, glow effects).

### Active Agent Model (Canonical)
- Content: `single-researcher -> researcher -> translator -> qa`
- Engineering: `tech-lead -> coder -> tech-lead/human review`
- Deprecated roles are history-only unless explicitly requested.
- Source of truth: `.agent/AGENT_CONTRACT.md`

## 2. Tech Stack
- **Core:** Astro v5 (Server-first architecture).
- **Interactivity:** React (use only for interactive islands like toggles, sliders).
- **Styling:** Tailwind CSS (Mobile-first, Dark-mode first).
- **Language:** TypeScript (Strict mode).
- **Content:** MDX (Astro Content Collections).
- **Package Manager:** npm.
- **Languages:** EN (default), FR, DE, RU.

## 3. Directory Structure & Rules
```
src/
├── pages/           # Routing (Astro pages)
│   ├── index.astro  # EN homepage
│   ├── fr/          # French pages
│   ├── de/          # German pages
│   └── ru/          # Russian pages
├── layouts/         # Global wrappers (Layout.astro)
├── components/
│   ├── layout/      # Header, Footer, Hero
│   └── ui/          # Buttons, Cards, Badges
├── content/
│   └── reviews/     # MDX reviews by language
├── utils/           # i18n, formatters, helpers
└── types/           # Shared TypeScript types
```

## 4. Coding Standards

### TypeScript & Astro
- **Strict Typing:** Always define `interface Props` for Astro components. Avoid `any`.
- **Imports:** Use alias `@/` when available, otherwise use relative paths.
- **i18n:** Located at `src/utils/i18n.ts`. Import correctly based on depth.
- **Keys:** Do NOT use `key={index}` in `.astro` files. Use `key` only in React.

### Tailwind CSS
- Use utility classes over custom CSS.
- Colors: `zinc` for grays, `indigo`/`cyan` for accents.
- Always support Dark Mode: `bg-white dark:bg-zinc-900`.
- Use `class:list` for conditional classes.

### Data Fetching
- Use `getCollection` from `astro:content`.
- Filter by language: `id.startsWith('en/')`.
- Handle empty states gracefully.

## 5. Agent Workflow

### Before Making Changes
1. **Search First:** Use `rg` to find similar implementations.
2. **Read Context:** View relevant files to understand imports.
3. **Check Components:** Look for existing components in `src/components/ui/`.
4. **Source of Truth (when docs conflict):**
   - `src/content/config.ts` — frontmatter schema
   - `src/components/ui/` — real component APIs
   - `src/config.ts` + `.env.example` — affiliate/env vars
   - `src/pages/` — routing/templates

> If any workflow/doc contradicts the codebase, treat code as source of truth and update the docs.

### Making Changes
1. **Plan Complex Tasks:** Outline plan before large changes.
2. **Atomic Changes:** Make small, testable changes.
3. **No Placeholders:** Write complete, working code.
4. **Verify:** Run `npm run dev` and check the result.

### After Changes
1. **Type Check:** Run `npx astro check` for TypeScript errors.
2. **Visual Check:** Preview in browser (light/dark mode, mobile).
3. **Accessibility:** Ensure keyboard navigation, ARIA labels.
4. **Docs Check:** Run `npm run lint:agent-docs`, `npm run lint:agent-roles`, and `npm run lint:agent-skills` when changing `.agent/**` or `.memory_bank/**`.

## 6. Common Workflows

### Creating a New Component
```bash
# 1. Check if similar exists
grep -r "ComponentName" src/components/

# 2. Create in correct folder
#    - UI atoms → src/components/ui/
#    - Layout → src/components/layout/

# 3. Define Props interface
# 4. Implement with dark mode support
# 5. Document in .memory_bank/ui_extension/components/README.md
```

### Creating a New Review
```bash
# Use canonical orchestration:
# .agent/workflows/review-creation-full.md
#
# Final release check:
# .agent/workflows/prepublish-affiliate-gate.md
```

### Adding a New Language Page
```bash
# 1. Add locale to Astro config
#    (see `astro.config.mjs` → i18n.locales)

# 2. Copy from an existing localized version (example: DE)
mkdir -p src/pages/<lang>/reviews
cp src/pages/de/index.astro src/pages/<lang>/index.astro
cp src/pages/de/reviews/[...slug].astro src/pages/<lang>/reviews/[...slug].astro

# 3. Update `lang` constant inside the copied files
const lang = '<lang>';

# 4. Translate UI text via `src/utils/i18n.ts`
# 5. Create translated content in src/content/reviews/<lang>/
```

## 7. Project Nuances
- **i18n:** Custom helper at `src/utils/i18n.ts`.
- **Affiliate:** Amazon tags required. Include disclosure on review pages.
- **Environment:** WSL (Ubuntu). Use Linux paths.
- **Images:** Use `astro:assets` for optimization. Always include `alt` text.

## 8. Quality Checklist
- [ ] TypeScript: No `any`, Props interface defined
- [ ] Styling: Dark mode works, responsive design
- [ ] Affiliate: Disclosure visible, links have `rel="nofollow sponsored"`
- [ ] SEO: Title < 60 chars, meta description, alt text
- [ ] Accessibility: Keyboard navigation, semantic HTML
- [ ] Performance: Images optimized, lazy loading

## 9. Interaction Style
- Be concise and solution-oriented.
- Check for existing components before creating new ones.
- Analyze stack traces for path/import errors.
- Refer to specific workflows: `/testing-strategy`, `/deployment`, `/seo-optimization`.

## 10. Troubleshooting Quick Reference

| Error | Cause | Fix |
|-------|-------|-----|
| `Cannot find module '@/...'` | Path alias issue | Check `tsconfig.json` paths, restart dev server |
| `getCollection is not defined` | Wrong import | Use `import { getCollection } from 'astro:content'` |
| `Collection does not exist` | Missing config | Check `src/content/config.ts`, verify folder exists |
| `Frontmatter validation failed` | Schema mismatch | Check required fields in `config.ts` |
| Dark mode not working | Missing class | Add `class="dark"` to `<html>` element |
| Tailwind classes not applying | Dynamic classes | Use full class names, not `text-${var}` |
| Images not loading | Wrong path | For reviews, use `./...` (same folder as MDX); for public assets use `/images/...` or import with `astro:assets` |

**Quick Fixes:**
```bash
# Clear cache and restart
rm -rf .astro/ && npm run dev

# Check TypeScript errors
npx astro check

# Full reset
rm -rf node_modules/ .astro/ && npm install
```

See `/troubleshooting` for complete guide.

## 11. External Resources

### Official Documentation
- [Astro Best Practices](https://docs.astro.build/en/concepts/why-astro/) - Core concepts and patterns
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/) - MDX handling
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Utility classes reference
- [Tailwind UI Patterns](https://tailwindui.com/components) - Component examples

### Amazon Affiliate
- [Amazon Associates Operating Agreement](https://affiliate-program.amazon.com/help/operating/agreement) - Legal requirements
- [Associates Program Policies](https://affiliate-program.amazon.com/help/operating/policies) - Best practices
- [Amazon Associates Help](https://affiliate-program.amazon.com/help) - Getting started

### SEO & Performance
- [Google Search Central](https://developers.google.com/search/docs) - SEO guidelines
- [Core Web Vitals](https://web.dev/vitals/) - Performance metrics
- [Schema.org Product](https://schema.org/Product) - Structured data

### Accessibility
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) - Accessibility checklist
- [MDN ARIA Guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) - ARIA labels
