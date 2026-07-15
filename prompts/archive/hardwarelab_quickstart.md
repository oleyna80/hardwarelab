# 🚀 HardwareLab Quick Start Guide v1.3.0

This guide is intentionally short. Full rules and templates live in:
- `master_prompt_v_1_3_0.md`
- `bootstrap_v_1_3_0.md`

If you want a single end-to-end newbie checklist + copy-paste prompts (two-pass + Gemini tech review), use:
- `COPYWRITER_GUIDE.md`

---

## 📦 Files to Upload (New ChatGPT Session)

Required (single-pass):
1. `bootstrap_v_1_3_0.md`
2. `.agent/roles/single-researcher.md`
3. `existing-reviews-hardwarelab.md`

Recommended (two-pass):
- **Pass A uploads:** `.agent/roles/single-researcher.md`, `.agent/templates/research-pack-pass-a-example.md`, `existing-reviews-hardwarelab.md`, `user-quotes-guide.md`, `review-workflow-two-pass.md`
- **Pass B uploads:** `master_prompt_v_1_3_0.md` (+ `error-prevention-guide.md`, `translation-guide-v1.md` if needed)

Optional (reference only):
- `asin-hunter-protocol.md` (optional helper for difficult ASIN discovery cases)
- `error-prevention-guide.md`
- `user-quotes-guide.md`
- `translation-guide-v1.md`
- `review-workflow-two-pass.md` (recommended for fewer mistakes)
- `.agent/templates/research-pack-pass-a-example.md`

---

## ▶️ Start a Review (Minimal Workflow)

1. Upload the required files.
2. Paste the full contents of `existing-reviews-hardwarelab.md` into the chat (before the first `REVIEW:`).
3. Run:
   ```text
   REVIEW: Product Name
   CATEGORY: one-of-the-supported-slugs
   ```
4. For PASS A / external research, `CATEGORY` is mandatory and must be explicit:
   ```text
   REVIEW: Product Name
   CATEGORY: gaming-pcs
   ```
5. Auto-detect category only in internal writing or single-agent fallback flows, not in PASS A.
6. Canonical category enum is `consoles|gaming|gaming-pcs|monitors|ai-workstation|mini-pc|nas|sbc`.

---

## 🧭 Categories (slugs)

Use exactly one of:
- `consoles` — gaming consoles and handheld gaming systems (Xbox, PlayStation, Switch-class, ROG Ally, Steam Deck)
- `gaming` — gaming laptops and gaming-focused computers when the main story is gaming rather than compact-desktop or AI-workstation positioning
- `gaming-pcs` — ready-made gaming desktop PCs from manufacturers (single ASIN)
- `monitors` — monitors/displays
- `ai-workstation` — AI-first workstations and local-AI systems; build guides are a subtype, not the whole category
- `mini-pc` — mini PCs / compact desktops
- `nas` — NAS devices
- `sbc` — single-board computers

---

## 🔧 Build Reviews (AI Workstation Subtype)

For build guides:
- `reviewType` must be `build`
- `category` must be `ai-workstation`
- `buildComponents` must be a list of `{ name, asin, category, ... }`
- keep `asin` in frontmatter as the “main” affiliate component (often GPU)

For standard single-system AI workstation reviews:
- keep `category: ai-workstation`
- do not add `reviewType: "build"`
- use the standard review schema

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
