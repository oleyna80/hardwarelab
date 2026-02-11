# Tech Audit: ROG Ally Z1 (White)

## CRITICAL

### TA-01
- **Blocker:** yes
- **Current:** Title candidate includes "2024" ("ASUS ROG Ally Z1 2024..."). Amazon title also says "2024".
- **Proposed:** Remove "2024" from the internal review title/slug if possible, or explicitly clarify this is the **original chassis (RC71L)**, NOT the 2024 "Ally X" refresh.
- **Why:** The "2024" model technically refers to the ROG Ally X (RC72L). The Z1 White is the 2023 model (RC71L), even if sold in 2024. Confusing the two is a major risk.
- **Confidence:** high
- **Needs source:** Verify model number. RC71L = 2023 Original. RC72L = 2024 Ally X.

## SUSPICIOUS / NEEDS VERIFICATION

### TA-02
- **Blocker:** no
- **Current:** "1x UHS-II microSD card reader" listed as standard spec.
- **Proposed:** Add context/check regarding the SD card reader failure issue known in this model (RC71L).
- **Why:** Widespread hardware defect in 2023 units (voltage/heat location). Use caution if praising the SD slot functionality without mentioning the risk.
- **Confidence:** high (that the issue exists), medium (on whether it affects this specific "2024" retail unit).
- **Needs source:** Check if ASUS claimed to fix the SD reader in later *Z1 non-Extreme* batches.

## OK
- SoC specs (Ryzen Z1, 6-core/12-thread, 4 CU GPU) are correct for the non-Extreme version.
- RAM (16GB LPDDR5-6400) and Storage (512GB 2230) are correct.
- Display specs (1080p, 120Hz, VRR) are correct.
- Weight (608g) matches the ReviewHero specs for the original white model.

## Questions for Researcher
1. **Model Revision:** Can you confirm if this specific Amazon ASIN (B0C8H1FHFH) ships with any "revised" mainboard (MCU fix) for the SD card reader, or is it identical to launch day hardware?
2. **"2024" Branding:** Is "2024" just Amazon SEO spam, or did ASUS re-release the Z1 White in 2024 with updates? (Likely key spam, but worth 100% verification to avoid mislabeling).
