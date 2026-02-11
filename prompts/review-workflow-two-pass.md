# HardwareLab Two-Pass Review Workflow (v1.3.0)

Goal: reduce context loss and prevent schema/API mistakes by splitting work into two separate outputs.

Use this when generating new reviews with ChatGPT (especially “thinking mode”).

---

## Pass A — Research Pack (NO MDX OUTPUT)

**Input:** Product name + region + category slug (if known).

**Output:** A compact “Research Pack” that will be pasted back into the chat for Pass B.

**Recommended uploads (Pass A):**
- `prompts/asin-hunter-protocol.md`
- `prompts/existing-reviews-hardwarelab.md`
- `prompts/user-quotes-guide.md`
- `prompts/review-workflow-two-pass.md`

**Rules:**
- Confirm the **exact ASIN** for the exact configuration (RAM/storage/Ethernet/region).
- Collect **4–6 real user quotes** from sources (Reddit/forums). Store the **original quote verbatim** for traceability. (For symmetry, prefer 4 or 6.)
- Prepare internal links using **only** `prompts/existing-reviews-hardwarelab.md` (URL + exact review title).
- Do not generate MDX in this pass.
- If you cannot open source pages to copy verbatim quotes, **STOP** and ask the user for links/quotes (do NOT use search-result snippets as “quotes”).
- If the ASIN is ambiguous (multiple candidates / bundle vs standalone / renewed): list the candidates + evidence and ask the user for the exact Amazon URL.

### Approved Addendum (after Pass A)

Sometimes the user will provide corrections after the Research Pack (e.g., “Gemini audit” or additional spec clarifications).

**Rule:** Treat new facts as usable input in Pass B **only if** the user marks them explicitly as:

`APPROVED PASS B ADDENDUM:`

If the user does not explicitly approve an addendum, STOP and ask whether to apply it.

**Verification mode (optional):**
- If the user explicitly adds `VERIFICATION MODE: ON`, you may re-check addendum claims against official sources.
- If a claim cannot be verified, do NOT change the review; instead ask the user for a source or keep the original text.

### Research Pack Template

```markdown
## RESEARCH PACK (HardwareLab v1.3.0)

### Product
- Name: ...
- Category: mini-pc | gaming | gaming-pcs | monitors | ai-workstation | nas | sbc
- Region: amazon.com

### ASIN (confirmed)
- ASIN: B0...
- Verified URL: https://www.amazon.com/dp/B0...
- Amazon listing title (exact): "..."
- Variant notes: (RAM/storage/Ethernet/etc)
- Disc drive: yes | no | unknown

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

### Draft Decisions
- priceCategory: budget | mid | high | enterprise
- rating: 0–5 (if you have a justified value; otherwise leave TBD)
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
- User quotes in MDX:
  - EN: keep quotes as-is (verbatim).
  - RU/DE/FR: translate quotes (translation only, no original), but remain faithful.
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
