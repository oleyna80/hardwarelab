---
name: Astro Architecture Expert
description: Ensure technical decisions align with Astro best practices for Islands Architecture, Content Collections, and performance optimization.
---

# Astro Architecture Expert

**Objective:** Ensure all technical decisions align with Astro best practices for performance and maintainability.

## Knowledge Base

### 1. Islands Architecture
- Prefer `.astro` components for static content (Zero JS).
- Use Framework components (React/Preact) ONLY for interactivity.
- Mandatory directives: `client:visible` (for heavy UI) or `client:idle` (for low priority). Avoid `client:load` unless necessary.

### 2. Content Collections (v2+)
- All reviews reside in `src/content/reviews/`.
- Strict Schema Validation via `src/content/config.ts` (Zod schemas).
- Access via `getCollection()` API, never fs/import directly.

### 3. Image Optimization
- Use `<Image />` from `astro:assets` for local images.
- Enforce `width/height` attributes to prevent CLS (Cumulative Layout Shift).
- Strategy: Images must be co-located with MDX files.

### 4. Performance Constraints (512MB RAM)
- Avoid heavy build-time transformations.
- Prefer SSG (Static Site Generation) over SSR where possible.
- Limit external dependencies in `package.json`.

## Usage in Planning
When breaking down tasks for Coder, explicitly state which rendering strategy to use (Static vs Island).