---
description: Lean workflow for creating product reviews
---

# Review Creation: Lean Pipeline

`Last validated: 2026-02-08`

This is the default content pipeline for HardwareLab.

## Roles In Order

| # | Role | What it does | Output |
|---|---|---|---|
| 1 | `single-researcher` (external) | Web research, ASIN verification, quotes | `_research-pack.md` |
| 2 | `researcher` (internal) | Writes EN review + self-check + visuals | `index.mdx`, `image.webp`, `og.png` |
| 3 | `translator` | Creates RU/DE/FR versions | `{ru,de,fr}/<slug>/index.mdx` + copied assets |
| 4 | `qa` | Final build/compliance/i18n gate | `_qa-report.md` + PASS/FAIL |

## Operating Rule

- Do not add extra roles unless explicitly requested by the user.
- Deprecated roles are reference-only and not in default handoff.

## Handoff Pattern

Each role prints the next handoff prompt and stops.

Example (to `researcher`):

```text
NEXT: Researcher (Write + Self-Check + Visuals)

Open `.agent/roles/researcher.md` and follow it strictly.

INPUTS:
- src/content/reviews/en/<slug>/_research-pack.md
- prompts/master_prompt_v_1_3_0.md
- prompts/existing-reviews-hardwarelab.md

WRITE TO:
- src/content/reviews/en/<slug>/index.mdx
- src/content/reviews/en/<slug>/image.webp
- src/content/reviews/en/<slug>/og.png

STOP after writing EN review and assets.
```

## Quick Start

```text
1) Run external single-researcher and produce:
   src/content/reviews/en/<slug>/_research-pack.md
2) Start internal researcher role.
3) Start translator role.
4) Run QA final gate.
5) Before release, run pre-publish affiliate gate.
```

## Related

- `.agent/roles/README.md`
- `.agent/AGENT_CONTRACT.md`
- `.agent/workflows/amazon-affiliate-compliance.md`
- `.agent/workflows/prepublish-affiliate-gate.md`
- `.agent/workflows/review-update.md`
