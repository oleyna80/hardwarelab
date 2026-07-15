# 🎯 ASIN Hunter Protocol v4.3 (Strict Execution)

## OBJECTIVE
Find the correct Amazon ASIN (10 characters) for the target product in the target or primary marketplace.

---

## PROTOCOL (5 Steps - Execute in Order)

### Step 1: Execute Primary Search

You MUST perform a web search using your browser/search tool.

**Query Template:**
```text
"[Product Name]" site:amazon.[region] ASIN
```

**Region Mapping:**
- Target Language **EN** → prefer `site:amazon.com` (United States); if no exact amazon.com listing exists, continue with supported Amazon marketplaces and establish a non-US primary marketplace
- Target Language **DE** → `site:amazon.de` (Germany)
- Target Language **FR** → `site:amazon.fr` (France)
- Target Language **RU** → `site:amazon.com` (US store, Russian text)

If the search tool returns 0 results consistently, STOP and report that search may be broken/rate-limited.

---

### Step 2: Identify Official Listing

Scan search results for the **main product page**.

**Look for:**
- Sold by: Manufacturer (Sony, Orange Pi, Synology) OR Amazon.com
- Title matches exact product model (including RAM/storage variant)
- High review count (indicates official listing)

**Ignore:**
- eBay, AliExpress, or random blogs
- Third-party resellers on Amazon
- Wrong model variants (e.g., 8GB when looking for 16GB)

Focus on exact model + exact variant (RAM/storage/color). Do not guess.

---

### Step 3: Extract ASIN from URL

Open the official listing and find the 10-character ASIN code in the URL.

**URL Format:**
```text
https://www.amazon.com/dp/B0XXXXXXXXX
                        ^^^^^^^^^^^^
                        This is the ASIN
```

**Alternative URL patterns:**
```text
amazon.com/Product-Name/dp/B0XXXXXXXXX/
amazon.com/gp/product/B0XXXXXXXXX
```

**ASIN Format Validation:**
- Exactly **10 alphanumeric characters**
- Usually starts with **B0** (but not always)
- Contains mix of letters and numbers

Reject placeholders and invalid lengths immediately.

---

### Step 4: Verification

Before proceeding, verify the ASIN matches the exact product variant requested.

**Check:**
1. **Model variant:** RAM size, storage capacity match request
2. **Region / marketplace:** Prefer target marketplace, but allow a verified non-US primary marketplace for EN if no exact amazon.com listing exists
3. **Product type:** Correct category (console vs. accessory, 16GB vs. 8GB)

If there’s any mismatch (variant/region/product type), STOP and continue searching.

**Routing baseline rule:**
- Use field names consistently: `ASIN_PRIMARY` for the verified primary marketplace card, `ASIN_US` for amazon.com status, and `ASINs by Region` / EU ASINs for `DE|FR|IT|ES|UK`.
- EN article readiness: confirm `ASIN_US`, or if no exact amazon.com listing exists, confirm `ASIN_PRIMARY` on one non-US marketplace and document `ASIN_US: absent`.
- Translation/monetization readiness: confirm at least one EU ASIN (`DE|FR|IT|ES|UK`) when available.
- Missing EU mapping should limit translation/monetization planning, not block a valid EN article by itself.

---

### Step 5: Output Result

**Before writing the review, you MUST output:**

```text
✅ ASIN FOUND: B0C5BZLPZN
🌍 Primary marketplace: amazon.com (United States)
🔗 Verified URL: https://www.amazon.com/dp/B0C5BZLPZN
✅ Product: Orange Pi 5 Plus 16GB
✅ Exact match: YES

Now proceeding to write the review...
```

**This confirmation is MANDATORY.**

Do not proceed to Step 2 (SEO Research) or Step 3 (Writing) until you output this confirmation.

---

## FAILURE HANDLING

### If Step 1 yields NO results:

**Try Alternative Search Strategy #1: Manufacturer Store**
```text
"[Brand] Official Store" site:amazon.[region]
```
Then search within the store for the product.

---

**Try Alternative Search Strategy #2: Model Number Search**
```text
"[Model Number]" site:amazon.[region]
```
Then filter results for the exact product/variant.

---

**Try Alternative Search Strategy #3: EAN/UPC Code**
If you can find the EAN or UPC code from manufacturer website:
```text
"[EAN/UPC]" site:amazon.[region]
```

---

### If ALL strategies fail:

**ONLY THEN** output:
```yaml
asin: "ASIN_NOT_FOUND"
```

And add this note after frontmatter:
```markdown
> **Note:** Amazon ASIN could not be verified for [region]. Please add manually before publishing.
```

**This should be RARE.** Most products on Amazon are findable with proper search.

---

## CRITICAL REMINDERS

1. **ASIN search is MANDATORY** - Do not skip
2. **Always verify marketplace fit** - EN prefers `.com`, but may use a verified non-US primary marketplace if no exact amazon.com listing exists
3. **Check exact model variant** - 16GB ≠ 8GB, Pro ≠ Standard
4. **Output confirmation BEFORE writing** - Show ASIN + verification
5. **Use alternative strategies** - Don't give up after first search
6. **ASIN_NOT_FOUND is last resort** - Only after all strategies exhausted

---

## 🔖 VERSION NAMES

v4.3

---

**END OF ASIN HUNTER PROTOCOL v4.3**
