# 🚨 HardwareLab Bootstrap v1.3.0 (Zero-Error System)

**Version:** v1.3.0 (2026-01-10)  
**Purpose:** Generate error-free, production-ready reviews with MANDATORY validation  
**Categories:** Gaming, Gaming PCs, Monitors, AI Workstation, Mini PC, NAS, SBC  
**Target Error Rate:** 0% (zero errors on first draft)

---

## ⚡ FILES REQUIRED

You need **3 files** uploaded to ChatGPT:
1. **master_prompt_v_1_3_0.md** (main instructions - UPDATED)
2. **asin-hunter-protocol.md** (ASIN discovery)
3. **existing-reviews-hardwarelab.md** (your published reviews)

---

## 🎯 QUICK START

**Command:**
```
REVIEW: [Product Name]
```

**Example:**
```
REVIEW: ASUS NUC 13 Pro NUC13ANHi5
```

---

## 🆕 v1.3.0 ZERO-ERROR SYSTEM

### What's New: Mandatory Pre-Output Validation

v1.3.0 introduces **blocking validation protocol** that prevents ChatGPT from outputting reviews with errors.

**NEW in v1.3.0:**
1. 🛑 **MANDATORY STOP** before Phase 6 (cannot be skipped)
2. ✅ **15-point validation checklist** (must output publicly)
3. 📏 **Explicit character counting** (show the count)
4. 🔍 **User quotes verification** (verbatim check for each quote)
5. 🔧 **Error correction protocol** (detect → fix → re-validate)

---

## 🛑 MANDATORY PRE-OUTPUT PROTOCOL

**The most critical change in v1.3.0:**

### Before Phase 6, ChatGPT MUST:
```
🛑 STOPPING BEFORE OUTPUT - RUNNING VALIDATION

[ChatGPT counts characters, checks values, verifies quotes]

✅ PRE-OUTPUT VALIDATION COMPLETED:

FRONTMATTER:
✅ 1. Dates unquoted (pubDate: 2026-01-10)
✅ 2. Title: 54 chars (50-60 range ✅)
✅ 3. Description: 156 chars (150-160 range ✅)
✅ 4. heroImage: "./image.webp" (relative ✅)
✅ 5. heroImageAlt field name correct
✅ 6. rating: 4.5 (number ✅)
✅ 7. priceCategory: "mid" (valid ✅)

COMPONENTS:
✅ 8. All imports use @/components/ui/
✅ 9. ReviewHero has 6/6 props
✅ 10. keySpecs has 5 items
✅ 11. UserFeedback before ProsCons
✅ 12. All 4–6 user quotes verified verbatim

CONTENT:
✅ 13. 4 internal links validated
✅ 14. Mini PC sections present
✅ 15. Amazon disclosure present

🎯 ALL 15 CHECKS PASSED → Proceeding to output review...
```

**ONLY AFTER this output → Review is generated**

---

## 📏 CHARACTER COUNTING (NEW v1.3.0)

### Title: 50-60 chars (STRICT)

**Procedure:**
1. Write title
2. Count EXACT characters: `A-S-U-S- -N-U-C...`
3. If < 50 or > 60: REWRITE immediately
4. Output count in validation

**Example:**
```
Title: "ASUS NUC 13 Pro NUC13ANHi5 Review: i5-1340P Mini PC"
Count: 54 chars ✅ (50-60 range)
```

---

### Description: 150-160 chars (STRICT)

**Procedure:**
1. Write description
2. Count EXACT characters including spaces
3. If < 150 or > 160: REWRITE immediately
4. Output count in validation

**Example:**
```
Description: "ASUS NUC 13 Pro NUC13ANHi5 pairs Core i5-1340P with Thunderbolt 4..."
Count: 156 chars ✅ (150-160 range)
```

---

## 🔍 USER QUOTES VERIFICATION (NEW v1.3.0)

### For EACH quote, verify 3 things:

1. **Verbatim from source?**
   - ✅ YES: User's exact words
   - ❌ NO: Contains "Says...", "Mentions..." → REWRITE

2. **Adequate length?**
   - ✅ YES: 2-4 sentences (30-100 words)
   - ❌ NO: Single sentence → EXPAND

3. **User voice preserved?**
   - ✅ YES: Informal language ("honestly", "tbh")
   - ❌ NO: Sounds formal → USE ORIGINAL

**Example check:**
```jsx
{
  user: "techuser",
  comment: "This thing is fast"
}
```

**Validation:**
- Verbatim? ⚠️ Too short, might be paraphrased
- Length? ❌ Single sentence (need 2-4)
- User voice? ⚠️ No informal markers

**Action:** GO BACK to Reddit, find FULL comment

---

## 🔧 ERROR CORRECTION PROTOCOL (NEW v1.3.0)

**If validation fails, ChatGPT will:**
```markdown
❌ PRE-OUTPUT VALIDATION FAILED

FAILED CHECKS:
❌ 3. Description: 173 chars (exceeds 150-160)
❌ 7. priceCategory: "mid-range" (invalid value)

CORRECTING ERRORS:

Fix #1 - Description (173 → 156 chars):
OLD: "Long description that exceeds limit..."
NEW: "Shorter description within limit..."
✅ FIXED: 156 chars

Fix #2 - priceCategory:
OLD: "mid-range"
NEW: "mid"
✅ FIXED: Valid value

RE-RUNNING VALIDATION...
✅ ALL CHECKS NOW PASSED

Proceeding to output review...
```

---

## 📋 PRODUCTION CHECKLIST (17 items + validation)

### Phase 0: ASIN Discovery
- [ ] 1. ASIN found and verified (10 chars, B0XXXXXXXXX)
- [ ] 2. Exact variant confirmed (RAM/storage matches request)
- [ ] 3. Correct region (.com for EN, .de for DE, .fr for FR)

### Phase 1-3: Research
- [ ] 4. SEO keywords identified (5-7 primary)
- [ ] 5. Specs verified via web search (not just training data)
- [ ] 6. User quotes collected (6, verbatim from Reddit/forums; similar length preferred)

### Phase 4: Components
- [ ] 7. All 5 base components present (ReviewHero, SpecGrid, UserFeedback, ProsCons, AffiliateButton)
- [ ] 8. Category-specific components added (per preset)

### Phase 5: 🛑 PRE-OUTPUT VALIDATION (NEW v1.3.0)
- [ ] 9. Frontmatter validated (7 checks)
- [ ] 10. Components validated (5 checks)
- [ ] 11. Content validated (3 checks)
- [ ] 12. Title 50-60 chars (counted and confirmed)
- [ ] 13. Description 150-160 chars (counted and confirmed)
- [ ] 14. User quotes verbatim (verified each quote)
- [ ] 15. Validation checklist OUTPUT publicly (all ✅)

### Phase 6: Output
- [ ] 16. Review generated ONLY after validation passes
- [ ] 17. All corrections applied if validation failed

**Total:** 17 items

---

## 🤖 EXECUTION PROTOCOL (v1.3.0)

**When you receive `REVIEW: [Product Name]`:**
```
✅ QUICK START ACTIVATED (HardwareLab v1.3.0)

Product: [Product Name]
Category: [auto-detected]
Language: EN
Region: amazon.com

EXECUTING WORKFLOW:
├─ Phase 0: ASIN Discovery (FIRST - blocking)
├─ Phase 1: SEO Research (exact ASIN name)
├─ Phase 2: Spec Verification (web search)
├─ Phase 3: User Feedback (VERBATIM - 2-4 sentences each)
├─ Phase 4: Components (base + category)
├─ Phase 5: 🛑 PRE-OUTPUT VALIDATION (MANDATORY STOP)
│  ├─ Run 15-point checklist
│  ├─ Count title chars (show count)
│  ├─ Count description chars (show count)
│  ├─ Verify each user quote (verbatim check)
│  ├─ Output completed checklist ✅
│  └─ If ANY fail → correct → re-validate
└─ Phase 6: Generate .mdx (ONLY after Phase 5 ✅)

⚠️ REQUIREMENT: Existing Reviews list needed

Starting Phase 0: ASIN Discovery...
```

---

## ⚠️ CRITICAL REMINDERS (12 rules)

**12 non-negotiable rules for v1.3.0:**

1. ASIN must be Phase 0 (execute first, blocking)
2. **Dates: UNQUOTED** (pubDate: 2026-01-10 not "2026-01-10")
3. **Image path: RELATIVE** (./image.webp not /images/...)
4. **ReviewHero: ALL 6 props** (no shortcuts allowed; do NOT add `productName`)
5. **User quotes: VERBATIM 2-4 sentences** (not one-liners or paraphrasing)
6. **Import pattern:** @/components/ui/ (exact path)
7. **Component order:** UserFeedback → ProsCons (logical flow)
8. **Title: 50-60 chars** (count manually, show in validation)
9. **Description: 150-160 chars** (count manually, show in validation)
10. **priceCategory: VALID VALUE** ("budget"|"mid"|"high"|"enterprise")
11. **Category sections:** all mandatory (per preset)
12. **🛑 PRE-OUTPUT VALIDATION: MANDATORY** (cannot skip, must output checklist)

**Rule #12 is NEW and NON-NEGOTIABLE in v1.3.0**

---

## 🎓 EXAMPLE: v1.3.0 in Action

### Step-by-Step Execution:
```markdown
Phase 0: ASIN Discovery
✅ ASIN: B0DT4WXLLK
✅ Product: ASUS NUC 13 Pro NUC13ANHi5
✅ Region: amazon.com

Phase 1-4: [Research and component selection]

Phase 5: 🛑 PRE-OUTPUT VALIDATION

Checking Title:
"ASUS NUC 13 Pro NUC13ANHi5 Review: i5-1340P Mini PC"
Manual count: A-S-U-S- -N-U-C- -1-3... = 54 chars
✅ PASS (50-60 range)

Checking Description:
"ASUS NUC 13 Pro NUC13ANHi5 pairs Core i5-1340P with Thunderbolt 4 and 2.5GbE; 16GB/512GB suits homelab, 4K, and multi-display productivity out of the box."
Manual count: A-S-U-S- -N... = 154 chars
✅ PASS (150-160 range)

Checking priceCategory:
Current value: "mid"
Valid values: ["budget", "mid", "high", "enterprise"]
✅ PASS (value in list)

Checking User Quote #1:
{
  user: "notheresnolight",
  comment: "Adjust the power settings in BIOS, with PL1 set to 35W the fan would stay silent and you would hardly notice any difference in performance. You can go all the way down to 20W."
}
Verbatim? ✅ YES (direct from Reddit)
Length? ✅ YES (3 sentences)
User voice? ✅ YES (technical, detailed)

[... checking all 15 items ...]

✅ PRE-OUTPUT VALIDATION COMPLETED:

FRONTMATTER:
✅ 1. Dates unquoted
✅ 2. Title: 54 chars (50-60 ✅)
✅ 3. Description: 154 chars (150-160 ✅)
✅ 4. heroImage relative
✅ 5. heroImageAlt correct
✅ 6. rating is number
✅ 7. priceCategory: "mid" (valid ✅)

COMPONENTS:
✅ 8. All imports @/components/ui/
✅ 9. ReviewHero 6/6 props
✅ 10. keySpecs 5 items
✅ 11. UserFeedback before ProsCons
✅ 12. All quotes verbatim

CONTENT:
✅ 13. 4 internal links validated
✅ 14. Mini PC sections present
✅ 15. Amazon disclosure present

🎯 ALL 15 CHECKS PASSED → Proceeding to Phase 6...

Phase 6: Generating review...
[outputs review]
```

---

## 🚫 COMMON MISTAKES

### Mistake #1: Description Too Long

```
Checking Description:
Manual count: B-e-e-l-i-n-k-[...] = 162 chars
❌ FAIL (exceeds 150-160)

CORRECTING → 159 chars
✅ PASS
```

**Prevention:** Mandatory manual counting + output

---

### Mistake #2: Invalid priceCategory

```
Checking priceCategory:
Current: "mid-range"
Valid: ["budget", "mid", "high", "enterprise"]
❌ FAIL (not in list)

CORRECTING → "mid"
✅ PASS
```

**Prevention:** Enum validation against allowed values

---

### Mistake #3: Paraphrased Quotes

```
Checking Quote:
"Says the product is fast"
Verbatim? ❌ NO (uses "Says...")
Length? ❌ NO (single sentence)

CORRECTING → Go back to Reddit, extract full quote
"This thing is ridiculously fast. Compile times cut in half vs my old setup."
✅ PASS
```

**Prevention:** 3-point verification for each quote

---

## ✅ READY TO START

**Confirm you have:**
- [ ] `master_prompt_v_1_3_0.md` uploaded (with MANDATORY validation)
- [ ] ASIN Hunter Protocol uploaded
- [ ] `existing-reviews-hardwarelab.md` pasted
- [ ] Product name ready

**Then use:**
```
REVIEW: [Product Name]
```

**Expected output:**
1. Phase 0-4: Research and components
2. Phase 5: 🛑 VALIDATION (with all 15 checks shown)
3. Phase 6: Error-free review ✅

---

## 🚀 FINAL CHECKLIST BEFORE STARTING

**System Requirements:**
- [ ] ChatGPT Plus or Claude (for web search)
- [ ] `master_prompt_v_1_3_0.md` uploaded
- [ ] ASIN Hunter Protocol uploaded
- [ ] Existing Reviews list ready

**Understanding:**
- [ ] Phase 5 is MANDATORY (cannot skip)
- [ ] Validation checklist must be OUTPUT
- [ ] Character counting must be shown
- [ ] User quotes must be verbatim (2-4 sentences)
- [ ] No output until all 15 checks pass

**Ready?**
```
REVIEW: [Product Name]
```

---

**CHECKBOXES:** 17  
**ERROR RATE TARGET:** 0%  
**CATEGORIES:** 7 (gaming, gaming-pcs, monitors, ai-workstation, mini-pc, nas, sbc)

---

## 📝 USAGE NOTES

### For You (Site Owner):

1. **Upload all 3 files** to ChatGPT at start of session
2. **Use command:** `REVIEW: [Product Name]`
3. **Wait for Phase 5 validation output** (don't skip)
4. **Verify the 15-point checklist** is shown
5. **Copy final review** after validation passes

### For Future You:

If ChatGPT tries to skip Phase 5 or doesn't show validation:
```
STOP. You must complete Phase 5: Pre-Output Validation.

Output the 15-point checklist with:
- Actual character counts for title and description
- Verification status for all user quotes
- All checks marked ✅ or ❌

Do NOT proceed to Phase 6 until this is complete.
```

---

## 🔖 VERSION NAMES

v1.3.0, v1.2.2, v1.2.1, v1.2.0
