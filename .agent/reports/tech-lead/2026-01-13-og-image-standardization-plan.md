# Tech Lead Plan: OG Image Standardization

## Summary
To improve social sharing and SEO, we must enforce the presence of `ogImage` in all review frontmatter and ensure the corresponding `og.png` files exist and are optimized. Currently, legacy reviews lack the frontmatter key, and some existing `og.png` files are unoptimized (>5MB).

## Scope
- **IN**:
    - Scanning all 17 existing review folders in `src/content/reviews/en/`.
    - Adding `ogImage: "./og.png"` to frontmatter where missing.
    - Identifying missing or unoptimized (>1MB) `og.png` files.
    - Updating `src/content/config.ts` to make `ogImage` mandatory (after fixes).
- **OUT**:
    - Generating new images (this is Art Director's job).
    - Writing new content.

## Decision
**Script-based Audit & Fix**: We will create a script to automate the frontmatter update, as manual editing of 17 files is error-prone. The script will also generate a report of missing/large images for the Art Director.

## Implementation Notes
- **Script**: `scripts/audit-og-images.mjs`
    - Scans `src/content/reviews/en/*`.
    - Checks frontmatter for `ogImage`.
    - Checks filesystem for `og.png` existence and size.
    - **Safe Fix**: Can automatically append `ogImage` line if `heroImage` exists (insert after `heroImageAlt`).
- **Schema**: `src/content/config.ts` -> change `ogImage` from `optional()` to `required()` once the audit passes.

## Acceptance Criteria
- [ ] ALL `src/content/reviews/en/*/index.mdx` files have `ogImage` property.
- [ ] ALL referenced `og.png` files exist on disk.
- [ ] `npm run build` passes with strict content schema.
- [ ] List of "Heavy Images" (>1MB) provided to Art Director for optimization.

## Tasks for Coder
1. **Create Audit Script** (`P0`): Write `scripts/audit-og-images.mjs` to scan reviews, check for `ogImage` key, check file existence/size. Implement `--fix` flag to add the key to frontmatter.
2. **Run Fix** (`P0`): Run the script with `--fix` to update `index.mdx` files.
3. **Report** (`P0`): Output a list of missing images or images > 500KB.
4. **Schema Update** (`P1`): Update `src/content/config.ts` to make `ogImage` required (image().refine()).

## QA-Code Plan
```bash
# 1. Run audit
node scripts/audit-og-images.mjs

# 2. Fix frontmatter
node scripts/audit-og-images.mjs --fix

# 3. Build verification
npm run build
```

## Risks
- **Broken Build**: Making schema required before all files exist will break the build. Ensure audit shows 100% coverage before changing `config.ts`.
- **Large Repo**: 5MB PNGs bloat the repo. We should compress them later (Art Director task).
