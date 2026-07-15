# HardwareLab Two-Pass Review Workflow (v1.3.0)

Goal: reduce context loss and prevent schema/API mistakes by splitting work into two separate outputs.

Use this when generating new reviews with ChatGPT (especially “thinking mode”).

---

## Pass A — Research Pack (NO MDX OUTPUT)

**Input:** Product name + region + category slug.

**Output:** A compact “Research Pack” that will be pasted back into the chat for Pass B.

Canonical quote subsystem rules: `.agent/workflows/quotes-evidence.md`
Canonical PASS A format example: `.agent/templates/research-pack-pass-a-example.md`
Canonical ownership map: `.agent/AGENT_CONTRACT.md` (`Content Ownership Map`)

**Normalized PASS A production contract:**
- `### Product Identity (ASIN-locked)`
- `### ASINs by Region (for translation planning)` as a non-blocking translation/monetization block for EN readiness
- `### Editorial Fields (for frontmatter)`
- `### Specs (confirmed)`
- `### Claims & Sources (required for numeric/critical claims)`
- category-specific notes only when the selected category requires them
- `### ReviewHero keySpecs (3-5 items)`
- `### User Quotes (source-verbatim)` with minimum 4, preferred 6
- `### Related Reviews (copy-paste only)`
- `### NOT FOUND / Ambiguities`

**Recommended uploads (Pass A):**
- `.agent/roles/single-researcher.md`
- `.agent/templates/research-pack-pass-a-example.md`
- `prompts/existing-reviews-hardwarelab.md`
- `prompts/user-quotes-guide.md`
- `prompts/review-workflow-two-pass.md`
- Optional helper: `prompts/asin-hunter-protocol.md` for difficult ASIN discovery cases

**Rules:**
- `CATEGORY` is mandatory in Pass A. Do not auto-detect it in external research mode.
- Canonical category enum for Pass A is `consoles|gaming|gaming-pcs|monitors|ai-workstation|mini-pc|nas|sbc`.
- Use `consoles` for gaming consoles and handheld gaming devices.
- Use `gaming` for gaming laptops and gaming-focused computers when the product should not be treated as a `gaming-pcs` desktop prebuilt.
- Interpret `ai-workstation` as the category for AI-first workstation systems; explicit build guides remain a subtype under the same category and are marked later in Pass B with `reviewType: "build"` when needed.
- Use field names consistently: `ASIN_PRIMARY`, `ASIN_US`, and `EU ASINs` (`DE|FR|IT|ES|UK`).
- Confirm the exact `ASIN_PRIMARY` for the exact configuration (RAM/storage/Ethernet/region).
- Prefer amazon.com when an exact US listing exists.
- If no exact amazon.com listing exists, use a verified non-US marketplace as `Primary region`, keep `ASIN_US: absent`, and document the `ASIN_PRIMARY` exception basis.
- Do not require a standalone SEO keywords section in Pass A; writer-owned SEO planning happens in Pass B from ASIN-locked identity and verified claims.
- For quote evidence, use `.agent/workflows/quotes-evidence.md` as the only detailed source of truth; locally, just ensure PASS A carries `4-6` validated source-verbatim quotes (`minimum 4`, `preferred 6`).
- Prepare internal links using **only** `prompts/existing-reviews-hardwarelab.md` (URL + exact review title).
- Render `Related Reviews` as a strict parser-safe block: one bullet per line, each bullet containing exactly one Markdown link in the form `- [Exact Review Title](/reviews/slug)`.
- Do not generate MDX in this pass.
- If the ASIN is ambiguous (multiple candidates / bundle vs standalone / renewed): list the candidates + evidence and ask the user for the exact Amazon URL.

### Approved Addendum (after Pass A)

Sometimes the user will provide corrections after the Research Pack (e.g., “Gemini audit” or additional spec clarifications).

**Rule:** Treat new facts as usable input in Pass B **only if** the user marks them explicitly as:

`APPROVED PASS B ADDENDUM:`

If the user does not explicitly approve an addendum, STOP and ask whether to apply it.

**Verification mode (optional):**
- If the user explicitly adds `VERIFICATION MODE: ON`, you may re-check addendum claims against official sources.
- If a claim cannot be verified, do NOT change the review; instead ask the user for a source or keep the original text.

### Research Pack Template (summary only)

For the exact canonical example, use:
- `.agent/templates/research-pack-pass-a-example.md`

```markdown
## RESEARCH PACK (HardwareLab v1.3.0) — PASS A

### Product Identity (ASIN-locked)
- Name (Amazon listing, primary): ...
- Category: mini-pc | consoles | gaming | gaming-pcs | monitors | ai-workstation | nas | sbc
- Primary region: amazon.com | amazon.de | amazon.fr | amazon.it | amazon.es | amazon.co.uk
- ASIN_PRIMARY: B0...
- Verified URL (primary): https://www.amazon.../dp/B0...
- ASIN_US: B0... | absent
- Verified URL (US): https://www.amazon.com/dp/B0... | absent
- Variant notes: (RAM/storage/Ethernet/etc)

### ASINs by Region
- DE: B0... | absent
- FR: B0... | absent
- IT: B0... | absent
- ES: B0... | absent
- UK: B0... | absent
- EN article readiness: `ASIN_US` verified | exception: `ASIN_US: absent` but `ASIN_PRIMARY` is verified on a non-US marketplace
- Translation/monetization readiness: `>=1 EU ASIN confirmed` | otherwise `limited`

### Affiliate Routing Inputs
- amazonUrl_global: https://amzn.to/... | https://www.amazon.* ... | absent
- Link type: amazon shortlink | full amazon URL | absent
- Resolution check: ...

### Specs (confirmed)
- Key specs bullets (5–8)
- Ports summary (1–2 lines)
- Thermals/noise notes (if available)

### User Quotes (source-verbatim)
- 1) user: "... (r/...)" sentiment: positive
     sourceURL: https://...
     original: "..."
- 2) ...

### Related Reviews (copy-paste only)
- [Exact Review Title](/reviews/slug)
- ...

### Editorial Fields
- priceCategory: budget | mid | high | enterprise
- rating: 0–5 (if you have a justified value) | null
- ratingSourceURL: https://... | absent
```

---

## Pass B — MDX Generation (NO WEB SEARCH)

**Input:** The Research Pack + `prompts/master_prompt_v_1_3_0.md`.

**Output:** Final `index.mdx`.

**Recommended uploads (Pass B):**
- `prompts/master_prompt_v_1_3_0.md`
- `prompts/bootstrap_v_1_3_0.md` (optional)
- `prompts/error-prevention-guide.md` (reference)
- `prompts/translation-guide-v1.md` (only if translating)

**Rules:**
- Before generating full MDX, do a short “Patch Plan” preview first (see below) to reduce mistakes.
- Use only the `@/components/ui/*` components and their real props.
- Frontmatter must match schema (dates unquoted, valid enums, `heroImage: "./image.webp"`, `tags[0] = category`).
- Internal links must use the exact titles + URLs from `prompts/existing-reviews-hardwarelab.md`.
- If an `APPROVED PASS B ADDENDUM:` is provided, incorporate it as the latest source of truth.
- User quotes in the default EN-first flow stay verbatim; for localized quote behavior use `.agent/roles/translator.md` and `prompts/translation-guide-v1.md`.
- End with exactly one bottom `<AffiliateButton />` (ReviewHero already includes CTA).
- Do a Phase 5 checklist in the chat before outputting the final MDX (do not paste the checklist into the MDX file).

### Pass B Output Order (recommended)

1) **Patch Plan (NO MDX yet)** — output ONLY these sections for review:
- Frontmatter (just the `--- ... ---` block)
- The import block (`@/components/ui/*`)
- The `<ReviewHero ... />` block
- `## Related Reviews` section

2) If the user confirms, output:
- Phase 5 validation checklist (filled out)
- Full final `index.mdx`

This “Patch Plan first” step is recommended because most breakages happen in:
- `heroImage` paths (absolute vs `./image.webp`)
- internal links (guessed slugs / wrong titles)
- ReviewHero image/imageAlt (hardcoded instead of `frontmatter`)
