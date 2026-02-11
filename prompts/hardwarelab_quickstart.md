# 🚀 HardwareLab Quick Start Guide v1.3.0

This guide is intentionally short. Full rules and templates live in:
- `master_prompt_v_1_3_0.md`
- `bootstrap_v_1_3_0.md`

If you want a single end-to-end newbie checklist + copy-paste prompts (two-pass + Gemini tech review), use:
- `COPYWRITER_GUIDE.md`

---

## 📦 Files to Upload (New ChatGPT Session)

Required (single-pass):
1. `master_prompt_v_1_3_0.md`
2. `asin-hunter-protocol.md`
3. `existing-reviews-hardwarelab.md`

Recommended (two-pass):
- **Pass A uploads:** `asin-hunter-protocol.md`, `existing-reviews-hardwarelab.md`, `user-quotes-guide.md`, `review-workflow-two-pass.md`
- **Pass B uploads:** `master_prompt_v_1_3_0.md` (+ `error-prevention-guide.md`, `translation-guide-v1.md` if needed)

Optional (reference only):
- `error-prevention-guide.md`
- `user-quotes-guide.md`
- `translation-guide-v1.md`
- `review-workflow-two-pass.md` (recommended for fewer mistakes)

---

## ▶️ Start a Review (Minimal Workflow)

1. Upload the required files.
2. Paste the full contents of `existing-reviews-hardwarelab.md` into the chat (before the first `REVIEW:`).
3. Run:
   ```text
   REVIEW: Product Name
   ```
4. If the category is ambiguous, pin it:
   ```text
   REVIEW: Product Name [gaming-pcs]
   ```

---

## 🧭 Categories (slugs)

Use exactly one of:
- `gaming` — consoles + handhelds
- `gaming-pcs` — ready-made desktop PCs from manufacturers (single ASIN)
- `monitors` — monitors/displays
- `ai-workstation` — custom AI build guides (multi-ASIN; usually `reviewType: "build"`)
- `mini-pc` — mini PCs / compact desktops
- `nas` — NAS devices
- `sbc` — single-board computers

---

## 🔧 Build Reviews (AI Workstation)

For build guides:
- `reviewType` must be `build`
- `category` must be `ai-workstation`
- `buildComponents` must be a list of `{ name, asin, category, ... }`
- keep `asin` in frontmatter as the “main” affiliate component (often GPU)

---

## 🧪 Quick Pre-Flight (Before Output)

Confirm:
- dates are unquoted
- `heroImage` is relative (`./image.webp`)
- `asin` exists
- `priceCategory` is `budget|mid|high|enterprise`
- `ReviewHero` uses 6/6 props (see `master_prompt_v_1_3_0.md`)
- `ReviewHero` uses `image={frontmatter.heroImage}` and `imageAlt={frontmatter.heroImageAlt}` (no hardcoded filenames)
- any `/reviews/...` links are copied from `existing-reviews-hardwarelab.md` (URL + exact title; no guessed slugs)

---

## 🔖 VERSION NAMES

v1.3.0  
v1.0  
v4.3
