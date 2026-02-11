# Tech Lead Plan: Regional ASIN Support

**Date:** 2026-01-13  
**Task:** Add regional Amazon affiliate links (DE, FR) for translations  
**Status:** Ready for Coder

---

## Summary

- Currently, all affiliate links use `amazon.com` with one tag
- Need to support `amazon.de`, `amazon.fr` with region-specific tags
- Translator should be able to use `ASIN_DE`, `ASIN_FR` from Research Pack

---

## Scope

### In Scope:
- Update `src/config.ts` to support regional domains and tags
- Update `AffiliateButton.astro` to use regional URL based on `lang` prop
- Update `translator.md` to allow ASIN substitution
- Add `.env.example` entries for regional tags

### Out of Scope:
- UK (amazon.co.uk) — not needed now
- RU — Russia uses US ASIN as fallback (no amazon.ru)

---

## Decision

Use the existing `lang` prop in `AffiliateButton` to determine region, then build URL with correct domain and tag.

**Mapping:**
| Language | Domain | Tag Env Var |
|----------|--------|-------------|
| en | amazon.com | PUBLIC_AMAZON_TAG_US |
| de | amazon.de | PUBLIC_AMAZON_TAG_DE |
| fr | amazon.fr | PUBLIC_AMAZON_TAG_FR |
| ru | amazon.com (fallback) | PUBLIC_AMAZON_TAG_US |

---

## Implementation Notes

### File: `src/config.ts`

```typescript
export const AMAZON_CONFIG = {
    // Regional domains
    domains: {
        us: 'amazon.com',
        de: 'amazon.de',
        fr: 'amazon.fr',
    } as Record<string, string>,

    // Regional affiliate tags
    tags: {
        us: import.meta.env.PUBLIC_AMAZON_TAG_US || 'YOUR_TAG-20',
        de: import.meta.env.PUBLIC_AMAZON_TAG_DE || 'YOUR_TAG-03',
        fr: import.meta.env.PUBLIC_AMAZON_TAG_FR || 'YOUR_TAG-21',
    } as Record<string, string>,

    // Build affiliate link for a specific region
    getAffiliateLink: (asin: string, region: string = 'us'): string => {
        const domain = AMAZON_CONFIG.domains[region] || AMAZON_CONFIG.domains.us;
        const tag = AMAZON_CONFIG.tags[region] || AMAZON_CONFIG.tags.us;
        return `https://www.${domain}/dp/${asin}?tag=${tag}`;
    }
};
```

### File: `src/components/ui/AffiliateButton.astro`

Update line 67:
```typescript
// Old:
const amazonUrl = AMAZON_CONFIG.getAffiliateLink(finalAsin);

// New:
const regionMap: Record<Language, string> = {
    en: 'us',
    de: 'de',
    fr: 'fr',
    ru: 'us', // fallback
};
const region = regionMap[lang] || 'us';
const amazonUrl = AMAZON_CONFIG.getAffiliateLink(finalAsin, region);
```

### File: `.env.example`

Add:
```
# Amazon Affiliate Tags by Region
PUBLIC_AMAZON_TAG_US=hardwarelab-20
PUBLIC_AMAZON_TAG_DE=hardwarelab-03
PUBLIC_AMAZON_TAG_FR=hardwarelab-21
```

### File: `.agent/roles/translator.md`

Change line 20 from:
```markdown
- ✅ `ASIN_DE/ASIN_FR` из Research Pack **не подставлять** в frontmatter...
```

To:
```markdown
- ✅ Если в `_research-pack.md` есть `ASIN_DE` / `ASIN_FR` — **подставляй** их в frontmatter соответствующего перевода:
  - DE: `asin: "B0XXXXXX"` (значение ASIN_DE)
  - FR: `asin: "B0YYYYYY"` (значение ASIN_FR)
  - Если ASIN для региона `absent` или не найден — оставляй US ASIN.
```

---

## Acceptance Criteria

- [ ] `AffiliateButton` on `/de/reviews/*` links to `amazon.de` with DE tag
- [ ] `AffiliateButton` on `/fr/reviews/*` links to `amazon.fr` with FR tag
- [ ] Translator can substitute ASIN_DE/ASIN_FR in frontmatter
- [ ] Fallback to US ASIN if regional ASIN absent
- [ ] `npm run build` passes
- [ ] Manual test: hover over button, verify URL domain and tag

---

## Tasks for Coder

| Priority | Task |
|----------|------|
| P0 | Update `src/config.ts` with regional domains/tags |
| P0 | Update `AffiliateButton.astro` to use region-aware URL |
| P1 | Update `.env.example` with new env vars |
| P1 | Update `translator.md` to allow ASIN substitution |
| P2 | Test on existing DE/FR pages |

---

## QA-Code Plan

```bash
npm run build
# Check generated HTML for DE/FR pages:
grep -r "amazon.de" dist/de/reviews/
grep -r "amazon.fr" dist/fr/reviews/
```

---

## Risks

- **Broken links if regional ASIN wrong** — Translator should verify ASIN exists on regional Amazon before using
- **Missing env vars in production** — Fallback to US tag (won't break, just less optimal)
