# Compliance Pre-Publish Report Template

**Date:** YYYY-MM-DD  
**Task slug:** <kebab-case>  
**Owner:** QA / Tech Lead / Compliance (if explicitly assigned)

## Scope
- Pages/slugs checked:
- Locales checked:

## Command Results
- `npm run build`: PASS/FAIL
- `npm run check:affiliate`: PASS/FAIL

## Checklist Result
- Disclosure before first affiliate CTA: PASS/FAIL
- Prohibited language (incentive/fake urgency/guarantees): PASS/FAIL
- Price/date/disclaimer hygiene: PASS/FAIL
- Locale link/tag routing sanity: PASS/FAIL
- Translation parity (ru/de/fr where required): PASS/FAIL

## Findings
- Critical:
- Major:
- Minor:

## Decision
- Final status: PASS/FAIL
- Blocking items (if FAIL):

## Revision Prompt
```text
NEXT: Tech Lead / Coder / Researcher / Translator (choose by issue owner)

Apply fixes from this report, rerun:
- npm run build
- npm run check:affiliate

Then resubmit for final pre-publish gate.
```
