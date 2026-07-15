---
description: Canonical evidence contract for collecting, validating, and carrying user quotes through PASS A and PASS B.
---

# Quotes Evidence Contract

`Last validated: 2026-03-20`

Use this file as the canonical source of truth for the quotes subsystem across PASS A, PASS B, translation, and QA.

## Purpose

User quotes are the highest-risk evidence block in the content pipeline.

Common failures:
- paraphrased quotes presented as verbatim
- source rules drifting between Reddit-only and broader marketplace/forum rules
- quote count drifting between 4, 6, and 4-6
- false blockers caused by partially inaccessible review UIs

If any role or prompt conflicts with this file, update that file to match this contract.

## Canonical Rules

### 1. Allowed sources

Quotes may come from:
- Reddit
- specialist forums
- Amazon customer reviews

Do not use:
- search-result snippets
- editorial/pro review excerpts as user quotes
- unattributed summaries or aggregator blurbs

### 2. Minimum quote set

- Minimum: 4 verified quotes
- Preferred: 6 verified quotes when source quality supports it
- Target sentiment mix:
  - for 4 quotes: 2 positive, 1 neutral, 1 negative when possible
  - for 6 quotes: 2 positive, 2 neutral, 2 negative when possible
- Sentiment mix is editorially desirable, not a hard requirement.
- Do not force a negative quote just to satisfy symmetry if the accessible evidence is mostly positive or neutral.
- A quote set with only positive + neutral sentiment is valid when it is real, attributable, and meets the minimum verified count.
- Allowed sentiment labels are `positive | neutral | negative | mixed`.
- Use `mixed` when the quote clearly contains both meaningful positive and meaningful negative signal and collapsing it to `neutral` would lose information.

### 3. Verbatim standard

Each quote must:
- preserve the user's exact wording
- remain 2-4 sentences when possible
- avoid third-person paraphrase such as `Says`, `Mentions`, `Reports`
- preserve user tone and grammar unless a tiny cleanup is necessary to avoid truncation artifacts

If a quote is too long:
- prefer a shorter quote from the same source, or
- extract a contiguous 2-3 sentence segment without rewriting the wording

### 4. Attribution and source URLs

Each quote must include:
- an attributable user name or handle
- a source URL that verifies the exact quote

Preferred:
- direct review/comment permalink

Acceptable fallback:
- the most direct stable source URL available, if the quote is still verifiable on that page

Not acceptable:
- anonymous snippets
- URLs that do not let the reviewer verify the quoted text

### 5. Blocker vs limitation

Hard blocker:
- fewer than 4 quotes can be verified from accessible source pages
- quoted text cannot be verified at all from the provided source URLs

Soft limitation:
- marketplace review index is blocked by sign-in, captcha, or UI issues
- some regional review pages are inaccessible
- exact permalink is unavailable, but the quote is still verifiable from a direct accessible source URL

Soft limitations must be documented in `### NOT FOUND / Ambiguities`, not escalated to `BLOCKED`.

## PASS A Output Requirements

In `_research-pack.md`, the quote block must be:

```markdown
### User Quotes (source-verbatim)
* user: <username or customer name>
  * sentiment: positive | neutral | negative | mixed
  * sentences: <2-4>
  * sourceURL: <direct source URL>
  * quote: "<verbatim quote>"
```

PASS A should also document quote access limitations in:
- `### NOT FOUND / Ambiguities`

## PASS B Requirements

The internal researcher must:
- preserve only validated quote text
- avoid inventing or smoothing user voice
- keep the same attribution and sentiment unless verification proves the pack wrong

The final `UserFeedback` block in MDX may translate quotes for RU/DE/FR, but the translation must remain faithful to the original validated source quote.

## QA Expectations

QA should confirm:
- 4-6 quotes are present
- every quote is attributable
- every quote has a verifiable source URL
- quote text is direct, not paraphrased
- unresolved quote-source limitations are documented explicitly

## Related Documents

- `.agent/roles/single-researcher.md`
- `.agent/roles/researcher.md`
- `prompts/archive/review-workflow-two-pass.md`
- `prompts/archive/user-quotes-guide.md`
- `prompts/archive/bootstrap_v_1_3_0.md`
- `prompts/archive/master_prompt_v_1_3_0.md`
