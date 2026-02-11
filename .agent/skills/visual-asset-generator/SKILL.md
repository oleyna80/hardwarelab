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
**Prompt Template**:
> "Professional product photography of [Product Name]. High-end commercial style, dark matte background, subtle blue/cyan tech lighting to match HardwareLab brand. Shallow depth of field, 4K quality, minimalist composition. **STRICTLY** follow the provided reference image for shape, ports, and details."

### 3. Generate OG Image (Social Card)
**Tool**: `generate_image`
**Dimensions**: 1200x630 (aspect ratio is key)
**Prompt Template**:
> "Open Graph social media card (1200x630). Composition: [Product Name] on the right side. Left side features large, bold, clean white typography: '[Short Review Title]'. Subtitle in accent color: '[Key Feature/Category]'. Background: Abstract dark technological pattern with neon blue/cyan web lines or circuit traces. Professional, click-optimized design. HardwareLab brand style."

### 4. Process and Save
- **File Names**:
    - Hero: `image.webp` (Convert generated PNG to WebP, quality ~90)
    - OG: `og.png`
- **Location**: Save directly to the specific review directory (e.g., `src/content/reviews/en/[slug]/`).
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

## Style Guide
- **Lighting**: Dark mode, cool tones (Cyan #00B4D8 / Indigo #480CA8), "Tech Noir" aesthetic.
- **Consistency**: **MANDATORY**: Use the provided reference image ("image-to-image") to ground the generation. Do not allow the model to "hallucinate" incorrect ports or form factors. If no reference is provided, search for the official product design first to ensure accuracy.
