# Localized Category Routes — Pilot Specification

## Status

Approved by Owner on 2026-07-28 for the Agentic SDLC pilot. Revision: `3`.

## Problem

French, German, and Russian navigation links target `/<locale>/categories/<slug>`,
but the repository only defines the English category routes under
`/categories/*`. Those localized URLs therefore do not have a route.

## Required behavior

1. `fr`, `de`, and `ru` category URLs must resolve only for every category slug
   supported by the English category implementation.
2. A localized category page must use the requested locale for its title,
   description, breadcrumb, item count, empty state, related-category CTA, and
   review links. Its review list must include locale-matching reviews only;
   English fallback content must not be presented as translated content.
3. Unknown category slugs and unsupported locales must preserve the project's
   existing not-found behavior; no catch-all redirect may mask them.
4. The implementation must reuse the established Astro/category data patterns
   and must not introduce dependencies, configuration changes, or content
   rewrites.

## Acceptance criteria

- AC-01: Generated application routes include working localized category pages
  for `fr`, `de`, and `ru`.
- AC-02: At least one supported localized category per locale renders localized
  UI and locale-matching review links.
- AC-03: An invalid localized category route is not treated as a valid category.
- AC-04: Type check and production build pass; a browser or equivalent runtime
  smoke confirms the positive and negative routes.
- AC-05: The SDLC profile, Work Block state, review, verification, evaluation,
  drift audit, project map, and closeout remain mutually current at completion.

## Non-goals

- Translation or editing of review/content files.
- SEO redesign, redirects, deployment, publication, or affiliate-link changes.
- Codex, OpenCode, MCP, plugin, database, credential, or external-service
  integration.

## Constraints

- The pilot adapts the exact new `multi-runtime` profile from
  `oleyna80/agentic-sdlc-framework` at
  `c604f8d2085ca3469de54a525880e3f11eba0fa7`.
- The local framework checkout at
  `/home/azur/Projects/WSL/agentic-sdlc-framework` is out of scope and remains
  unchanged.
- `test-results/.last-run.json` is pre-existing unrelated dirt and must remain
  untouched.
- There is one Work Block, one main implementation PR scope, and at most two
  correction rounds. No commit or push is authorized by this specification.
- Pilot tracking ID is `WB-009`; the descriptive machine ID remains
  `WB-2026-07-28-localized-category-routes-pilot` for existing gate and report
  references.
- The pilot must perform one repository-only context-recovery handoff between
  sequential Coder sessions and record whether chat context was needed.
- Success is comparative, not binary: the closeout must determine whether the
  framework reduced conflicts, repeated work, manual context recovery, and
  non-substantive review cycles while delivering the working feature.
- Model use is role-routed and recorded as evidence: strongest reasoning for
  planning/decomposition, fast coding for routine implementation, economical
  coding for mechanical fixes, an independent strong Reviewer, a medium-model
  Verifier with deterministic tools, and deterministic-first drift checks.
- The Telegram/listing/publication design decisions named in the pilot addendum
  are not part of this route feature; they need a separate Owner-approved scope
  before implementation.
