# Customization Points

Кастомизация и конфигурация HardwareLab.

---

## Configuration Files

### 1. `src/config.ts` — Main Configuration

Централизованная конфигурация сайта.

| Export | Purpose | Env Variable |
|--------|---------|--------------|
| `SITE_DOMAIN` | Domain for SEO | `PUBLIC_SITE_DOMAIN` |
| `AMAZON_CONFIG` | Affiliate settings | `PUBLIC_AMAZON_*` |
| `ANALYTICS_CONFIG` | GA4 settings | `PUBLIC_GA_ID` |
| `SITE_CONFIG` | Site metadata | — |

#### ⚠️ Danger Points

| Item | Risk | Mitigation |
|------|------|------------|
| `affiliateTag` | Placeholder in code | Use `.env` override |
| `getAffiliateLink()` | Generates all affiliate URLs | Test after changes |

### 2. `.env` / `.env.example` — Environment Variables

| Variable | Production | Dev Fallback |
|----------|------------|--------------|
| `PUBLIC_SITE_DOMAIN` | `https://hardwarelab.org` | `https://hardwarelab.example.com` |
| `PUBLIC_AMAZON_TAG_US` | Real tag | `YOUR_TAG-20` |
| `PUBLIC_AMAZON_TAG_DE` | Real tag | `YOUR_TAG-03` |
| `PUBLIC_AMAZON_TAG_FR` | Real tag | `YOUR_TAG-21` |
| `PUBLIC_GA_ID` | `G-XXXXXXX` | empty |
| `PUBLIC_ANALYTICS_ENABLED` | `true` | — |

---

## Custom Scripts

### `scripts/check-affiliate-links.js`

**Purpose**: Compliance check for affiliate links.

**Run**: `npm run check:affiliate`

**Checks**:
- `rel="nofollow sponsored"` present
- Affiliate tag in URL
- Non-placeholder tag
- Disclosure text on pages with links

**Supported languages for disclosure detection**: EN, FR, DE, RU

### `scripts/debug-reviews.js`

**Purpose**: Debug helper for content collection.

---

## Astro Integrations (`astro.config.mjs`)

| Integration | Purpose |
|-------------|---------|
| `tailwind()` | CSS framework |
| `mdx()` | MDX content format |
| `sitemap()` | Auto-generate sitemap |

---

## Candidates for Cleanup

| Item | Issue | Recommendation |
|------|-------|----------------|
| `debug-collections.js` (root) | Debug file in production | Move to scripts/ or delete |
| `scripts/debug-reviews.js` | Small debug utility | Keep or delete if unused |

---

## Risks & Recommendations

### 🔴 High Risk

| Risk | File | Recommendation |
|------|------|----------------|
| Placeholder affiliate tag | `src/config.ts:14` | **Always use `.env`** |
| Missing GA ID | `.env` | Add before production |

### 🟡 Medium Risk

| Risk | File | Recommendation |
|------|------|----------------|
| Missing regional affiliate tags | `.env` | Set `PUBLIC_AMAZON_TAG_DE` / `PUBLIC_AMAZON_TAG_FR` (fallback is US tag) |
| Hardcoded site name | `config.ts:38` | OK for now |

### 🟢 Low Risk

| Item | Status |
|------|--------|
| Analytics toggle | ✅ Implemented |
| Affiliate link builder | ✅ Centralized |
