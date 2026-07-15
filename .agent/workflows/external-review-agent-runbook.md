---
description: Canonical end-to-end runbook for creating a review with an external PASS A agent and internal PASS B pipeline.
---

# External Review Agent Runbook

`Last validated: 2026-03-20`

Use this document when you want a single clear sequence for creating a new review with:
- external PASS A research
- internal PASS B writing
- optional localization
- final QA gate

This is the canonical operational order for the EN-first pipeline.

## 1) Ownership Snapshot

| Stage | Primary owner | Main output |
|---|---|---|
| PASS A research | `single-researcher` | `_research-pack.md` |
| PASS B writing | `researcher` | `index.mdx`, `image.webp`, `og.png` |
| Localization | `translator` | localized `index.mdx` files + copied assets |
| Final gate | `qa` | `_qa-report.md` + PASS/FAIL |

Detailed ownership rules:
- `.agent/AGENT_CONTRACT.md` (`Content Ownership Map`)

## 2) PASS A Setup

Upload or provide these files to the external agent:
- `prompts/archive/bootstrap_v_1_3_0.md`
- `.agent/roles/single-researcher.md`
- `prompts/existing-reviews-hardwarelab.md`

Optional but recommended:
- `.agent/templates/research-pack-pass-a-example.md`
- `prompts/archive/asin-hunter-protocol.md` for difficult ASIN discovery cases

Then send:

```text
REVIEW: Product Name
CATEGORY: gaming|gaming-pcs|monitors|ai-workstation|mini-pc|nas|sbc
CATEGORY: consoles|gaming|gaming-pcs|monitors|ai-workstation|mini-pc|nas|sbc
```

PASS A must produce only:
- `src/content/reviews/en/<slug>/_research-pack.md`

PASS A must not produce:
- final MDX
- writer-side SEO block
- translation output

## 3) PASS A Output Contract

The external agent must deliver a strict research pack containing:
- `Product Identity (ASIN-locked)`
- `ASINs by Region (for translation planning)`
- `Affiliate Routing Inputs`
- `Editorial Fields`
- `Specs`
- `Claims & Sources`
- category-specific notes only when required
- `ReviewHero keySpecs`
- `User Quotes`
- `Related Reviews`
- `NOT FOUND / Ambiguities`

Canonical references:
- contract: `.agent/roles/single-researcher.md`
- example: `.agent/templates/research-pack-pass-a-example.md`
- quote evidence: `.agent/workflows/quotes-evidence.md`

## 4) PASS B Setup

After PASS A is accepted, hand off to the internal writer with:
- `src/content/reviews/en/<slug>/_research-pack.md`
- `prompts/archive/master_prompt_v_1_3_0.md`
- `prompts/existing-reviews-hardwarelab.md`

Optional:
- `prompts/archive/bootstrap_v_1_3_0.md`
- `prompts/archive/error-prevention-guide.md`

PASS B owns:
- SEO planning
- MDX assembly
- component composition
- final title/description character counts
- final quote validation before output

PASS B must produce:
- `src/content/reviews/en/<slug>/index.mdx`
- `src/content/reviews/en/<slug>/image.webp`
- `src/content/reviews/en/<slug>/og.png`

## 5) PASS B Output Rules

PASS B must:
- use only validated PASS A evidence plus explicitly approved addenda
- keep EN quotes verbatim
- use exact internal links from `prompts/existing-reviews-hardwarelab.md`
- run Phase 5 validation before final output

PASS B must not:
- invent new unsupported claims
- replace PASS A quote evidence with paraphrases
- guess internal review links

Canonical references:
- writer prompt: `prompts/archive/master_prompt_v_1_3_0.md`
- ownership map: `.agent/AGENT_CONTRACT.md`

## 6) Localization

Localization is a separate stage after EN review completion.

Use:
- `.agent/roles/translator.md`
- `prompts/archive/translation-guide-v1.md`

Translation-specific quote behavior belongs there, not in the default EN PASS B flow.

## 7) Final QA Gate

After EN review is written, and after localization if needed, run:

```bash
npm run check:researcher-output -- <slug>
npm run check:review-package -- <slug>
npm run build
```

The QA stage is responsible for the final PASS/FAIL gate.

## 8) Practical One-Line Summary

```text
PASS A (external) -> _research-pack.md
PASS B (internal) -> index.mdx + image.webp + og.png
Translator (optional) -> localized index.mdx + copied assets
QA -> package checks + build + final gate
```
