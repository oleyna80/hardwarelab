# Debug Report: Homepage Image Loading Issues

**Date:** 2026-01-09
**Status:** ✅ Fixed

## 1. Investigation Findings

### Symptoms
- Homepage Carousel images missing.
- "Latest Reviews" card images missing.
- Affected: Both new Mac Mini M4 review and legacy reviews.

### Root Cause Analysis
- **Mac Mini M4:** `heroImage` is an `ImageMetadata` object, but components used `<img src={object}>`.
- **Legacy Reviews:** Images were remote strings `../../../../assets/...` which `<img>` cannot resolve in browser.

## 2. Implemented Fixes

### A. Component Updates
Updated `src/components/ui/ReviewCard.astro` and `ReviewBannerCarousel.astro` to use Astro's `Image` component. This properly renders `ImageMetadata`.

### B. Legacy Image Migration
Moved legacy images from `src/assets/legacy-images/` to their respective review folders (`src/content/reviews/en/...`) and updated MDX paths to `./image.png`.
This ensures `image()` schema resolves them to `ImageMetadata`, enabling optimization and consistent rendering.

## 3. Verification
- `npm run build` passed.
- Optimization logs confirm WebP generation for all images.
