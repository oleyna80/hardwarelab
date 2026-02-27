---
name: Visual Asset Generator
description: Generates brand-consistent Hero and OG images for hardware reviews using standardized prompts and workflows.
---

# Visual Asset Generator

This skill standardizes the visual identity of HardwareLab reviews by providing a consistent workflow for generating Hero and Open Graph (OG) images.

## When to Use

Use this skill when:
- Creating a new review and need visual assets.
- Updating an existing review that lacks high-quality images.
- A user provides a reference image and asks for "Hero and OG" assets.

## Workflow

### 1. Analyze Requirements
- **Product**: Identify the exact product name and key features.
- **Reference**: **CRITICAL**: Check if the user uploaded a reference image.
    > [!IMPORTANT]
    > If a reference image is provided, you **MUST** use it. Do not generate a generic product image. The generated image must strictly match the chassis, ports, and form factor of the reference. Failure to use the reference results in incorrect hardware models and wasted time.
- **Title/Subtitle**: Determine the text for the OG image (Title = Review Title, Subtitle = Key USP or Category).

### 2. Generate Hero Image
**Tool**: `generate_image`
**Source resolution standard**: square `1024x1024` (Nano Banana default; `2048x2048` and `4096x4096` are also valid)
**Prompt Template**:
> "Professional product photography of [Product Name]. High-end commercial style, dark matte background, subtle blue/cyan tech lighting to match HardwareLab brand. Shallow depth of field, 4K quality, minimalist composition. **STRICTLY** follow the provided reference image for shape, ports, and details."

### 3. Generate OG Image (Social Card)
**Tool**: `generate_image`
**Generation resolution**: square `1024x1024` (compose product on the right side and leave text-safe area on the left)
**Prompt Template**:
> "Open Graph social media card concept for HardwareLab. Composition inside square canvas: [Product Name] on the right side. Left side reserved for large clean title text area ('[Short Review Title]') and subtitle area ('[Key Feature/Category]'). Background: abstract dark technological pattern with neon blue/cyan web lines or circuit traces. Professional, click-optimized design. HardwareLab brand style."

### 4. Process and Save
- **File Names**:
    - Hero output: `image.webp` (`1200x675`)
    - OG output: `og.png` (`1200x630`)
- **Location**: Save directly to the specific review directory (e.g., `src/content/reviews/en/[slug]/`).
- **Mandatory processing command**:
  - `npm run images:review -- --slug <slug> --input <hero-square.png> --og-input <og-square.png>`
  - If only one source image exists, omit `--og-input` and the same file will be used for both outputs.
- **Cleanup**: Delete any source/temp files after copying/moving.
- **MDX Update**: Ensure the `.mdx` file references the new files correctly:
    ```javascript
    import heroImage from './image.webp';
    // ...
    <ReviewHero image={heroImage} ... />
    ```
    ```yaml
    ogImage: "./og.png"
    ```

### 5. Branding Lock (mandatory for OG)
- OG image must include HardwareLab branding:
  - official icon style from site header/favicon (`public/favicon.svg`)
  - wordmark text exactly: `HardwareLab` (do not translate, do not rewrite)
- Match site style:
  - same minimalist tech look as header branding
  - subtle placement (usually top-left), must not overlap product
- Forbidden:
  - invented logos, altered brand name, random fonts inconsistent with site identity

## Style Guide
- **Lighting**: Dark mode, cool tones (Cyan #00B4D8 / Indigo #480CA8), "Tech Noir" aesthetic.
- **Consistency**: **MANDATORY**: Use the provided reference image ("image-to-image") to ground the generation. Do not allow the model to "hallucinate" incorrect ports or form factors. If no reference is provided, search for the official product design first to ensure accuracy.
