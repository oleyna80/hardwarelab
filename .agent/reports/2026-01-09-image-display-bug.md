# QA Bug Report: Images Not Displaying in Reviews

**Reporter:** QA Engineer (Antigravity)  
**Date:** 2026-01-09  
**Severity:** 🔴 High  
**Status:** ✅ RESOLVED (2026-01-09 22:30)

---

## 🐛 Reported Issues

### Issue #1: Images Not Displaying in Review Pages

**URL:** `http://127.0.0.1:4323/reviews/mac-mini-m4`  
**HTTP Status:** ✅ 200 OK  
**Expected:** Hero image should be visible in the `ReviewHero` component.  
**Actual:** Image is not rendering (reported by user).

### Issue #2: 404 Error on `/reviews/mac-mini-m4/index`

**URL:** `http://127.0.0.1:4323/reviews/mac-mini-m4/index`  
**HTTP Status:** ❌ 404 Not Found  
**Expected (by user):** Page should load.  
**Actual:** 404 error.

---

## 🔍 Investigation Results

### Issue #1 Analysis: Image Not Displaying

| Check | Result |
|-------|--------|
| Image file exists? | ✅ `mac-mini-m4.webp` (244KB) in `src/content/reviews/en/mac-mini-m4/` |
| Frontmatter correct? | ✅ `heroImage: "./mac-mini-m4.webp"` |
| Schema supports image()? | ✅ `z.union([image(), z.string()])` |
| Component imports Image? | ✅ `import { Image } from "astro:assets"` |
| Component handles type? | ✅ Conditional `typeof image === "string"` |

**Root Cause Hypothesis:**

The `frontmatter.heroImage` value passed to `ReviewHero` is an **ImageMetadata object** (due to `image()` schema), but the component receives it and uses `typeof image === "string"`. Since `ImageMetadata` is NOT a string, the component attempts to render `<Image src={image} />`.

However, **the `image` prop needs to be the resolved ImageMetadata from the schema**, not the raw string path. In MDX, `frontmatter.heroImage` should resolve to the imported image.

**Possible Causes:**
1. **Content Collections not resolving image paths** - The schema `image()` should auto-resolve relative paths, but may not be working correctly.
2. **MDX frontmatter access issue** - The `frontmatter` object in MDX might contain the raw string instead of resolved metadata.
3. **Build vs Dev discrepancy** - Images may render correctly in production build but not in dev mode.

### Issue #2 Analysis: 404 on `/index`

| Check | Result |
|-------|--------|
| Route definition | `src/pages/reviews/[...slug].astro` |
| Generated paths | `{ params: { slug: 'mac-mini-m4' } }` |
| URL pattern | `/reviews/mac-mini-m4` ✅ |
| URL pattern | `/reviews/mac-mini-m4/index` ❌ (not generated) |

**Root Cause:** This is **expected Astro behavior** — the route generates `/reviews/mac-mini-m4/`, not `/reviews/mac-mini-m4/index`. The `/index` suffix is not part of the generated static paths.

**Status:** ⚠️ Not a bug — user expectation mismatch.

---

## 📋 Tasks for Coder

### Task #1: Debug Image Resolution in Content Collections

**Priority:** 🔴 Critical  
**Estimated Time:** 1-2 hours

1. **Verify `frontmatter.heroImage` type at runtime:**
   - Add debug logging in `ReviewHero.astro`:
     ```typescript
     console.log('Image prop type:', typeof image, image);
     ```
   - Check browser console and terminal output.

2. **Test direct image import in MDX:**
   - Try importing image explicitly in MDX and passing to component:
     ```mdx
     import heroImg from './mac-mini-m4.webp';
     <ReviewHero image={heroImg} ... />
     ```

3. **Check Content Collection Entry Data:**
   - In `[...slug].astro`, log `frontmatter.heroImage`:
     ```typescript
     console.log('heroImage:', frontmatter.heroImage);
     ```

4. **Review Astro Image Docs:**
   - Reference: https://docs.astro.build/en/guides/images/#images-in-content-collections

### Task #2: Document Correct URL Pattern

**Priority:** 🟡 Low  
**Estimated Time:** 15 minutes

- Update project documentation to clarify that review URLs are:
  - ✅ `/reviews/mac-mini-m4`
  - ❌ `/reviews/mac-mini-m4/index` (will 404)

---

## 📁 Files to Investigate

| File | Purpose |
|------|---------|
| [src/content/config.ts](file:///home/dmitrii/projects/Amazon_aff/hardwarelab/src/content/config.ts) | Schema definition with `image()` |
| [src/components/ui/ReviewHero.astro](file:///home/dmitrii/projects/Amazon_aff/hardwarelab/src/components/ui/ReviewHero.astro) | Image rendering logic |
| [src/pages/reviews/[...slug].astro](file:///home/dmitrii/projects/Amazon_aff/hardwarelab/src/pages/reviews/%5B...slug%5D.astro) | Route definition |
| [src/content/reviews/en/mac-mini-m4/index.mdx](file:///home/dmitrii/projects/Amazon_aff/hardwarelab/src/content/reviews/en/mac-mini-m4/index.mdx) | Test review file |

---

## 🧪 Test Cases After Fix

1. [ ] Navigate to `/reviews/mac-mini-m4` → Image visible
2. [ ] Navigate to `/reviews/beelink-ser5-max` → Image visible (legacy review)
3. [ ] Run `npm run build` → No errors
4. [ ] Check production build images load correctly
