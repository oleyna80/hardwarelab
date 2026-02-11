# Tech Audit — Gigabyte AORUS FO32U2P (Research Pack)

Scope: hardware/spec accuracy only. No new facts added; items below require verification against official sources.

## CRITICAL

### TA-01
- ID: TA-01
- Blocker: yes
- Current: `Ports: 1x DP 2.1 (UHBR20) In; 1x Mini DP 2.1 (UHBR20) In; 2x HDMI 2.1 (Full 48Gbps FRL); 1x USB-C (65W PD + DP Alt + KVM); 1x DP 1.4 Out (Daisy Chain)`
- Proposed: Confirm the exact physical video I/O list. Until verified, do not claim **Mini DisplayPort input** and do not claim **DP 1.4 Out / daisy chaining**.
- Why: Port map is a purchase-critical claim; Mini-DP inputs and DP-out/MST are uncommon and easy to misstate.
- Confidence: medium
- Needs source: Official Gigabyte/AORUS FO32U2P spec page + user manual I/O diagram (or clear rear-panel photo from the ASIN listing).

### TA-02
- ID: TA-02
- Blocker: yes
- Current: `2x HDMI 2.1 (Full 48Gbps FRL)`
- Proposed: Phrase as “HDMI 2.1 (bandwidth TBD)” unless an official source explicitly states 48Gbps (FRL rate).
- Why: Many “HDMI 2.1” monitors are not full 48Gbps; wrong bandwidth claim can mislead console/PC expectations.
- Confidence: medium
- Needs source: Manufacturer spec sheet/manual stating HDMI FRL bandwidth (48Gbps vs 40Gbps etc).

### TA-03
- ID: TA-03
- Blocker: yes
- Current: `Audio: Headphone Out, Mic In`
- Proposed: Confirm whether a dedicated **Mic In** exists. If not explicitly present, keep only “Headphone out” (or “audio out”) as applicable.
- Why: “Mic In” is often absent on monitors; incorrect I/O claim can break user setups.
- Confidence: medium
- Needs source: Rear I/O diagram in manual or official spec table listing audio jacks.

## SUSPICIOUS / NEEDS VERIFICATION

### TA-04
- ID: TA-04
- Blocker: yes
- Current: `Panel: 31.5" QD-OLED (Samsung Gen 3); Anti-Reflection`
- Proposed: Split into verifiable parts (size, panel type, coating) and mark unknowns as `NOT FOUND` until sourced.
- Why: “Gen 3” and coating/finish (anti-reflection vs glossy/semi-gloss) are commonly misstated across listings.
- Confidence: medium
- Needs source: Manufacturer panel/coating description (official product page or manual).

### TA-05
- ID: TA-05
- Blocker: no
- Current: `Brightness: 250 nits (SDR Typ), 1000 nits (HDR Peak @ 3% APL)`
- Proposed: Keep brightness numbers only if sourced; otherwise mark HDR peak window/conditions as `NEEDS VERIFICATION`.
- Why: HDR peak claims vary by window size and mode; “3% APL” is a very specific condition that must be documented.
- Confidence: medium
- Needs source: Official brightness spec (including measurement window), or a trusted measurement source (RTINGS/Monitors Unboxed) with link.

### TA-06
- ID: TA-06
- Blocker: no
- Current: `Warranty: 3-Year (Terms vary by region regarding burn-in coverage)`
- Proposed: Confirm whether burn-in is covered and for which regions; otherwise state “3-year warranty; burn-in coverage NOT FOUND”.
- Why: OLED burn-in coverage is a major buyer concern and differs by region/retailer.
- Confidence: medium
- Needs source: Official warranty terms page for AORUS OLED monitors (region-specific if possible).

### TA-07
- ID: TA-07
- Blocker: no
- Current: `DP 2.1 UHBR20 - Future-proof uncompressed 4K/240Hz (requires supported GPU).`
- Proposed: Avoid “uncompressed” unless backed by a bandwidth calc + official timing support; phrase as “DP 2.1 UHBR20 is higher bandwidth and can reduce reliance on DSC; real 4K/240 support depends on GPU and display timings.”
- Why: “Uncompressed 4K/240” is a strong technical promise and can be wrong depending on bit depth/blanking/chroma.
- Confidence: medium
- Needs source: Official supported timings (4K@240 over DP 2.1) + clarification whether DSC is required for full spec.

### TA-08
- ID: TA-08
- Blocker: no
- Current: `Cable Certification: The box typically includes a Mini-DP to DP cable (certified for UHBR20)... VESA DP80 certified.`
- Proposed: Treat included cable type/certification as unverified unless confirmed by the manual “in the box” list or an official statement.
- Why: Included accessories vary by region/batch; cable certification is often assumed from user reports.
- Confidence: low
- Needs source: Official “box contents” list for FO32U2P (manual or product page).

## OK

### TA-09
- ID: TA-09
- Blocker: no
- Current: `CRITICAL WARNING (P vs Non-P): ... Verify the product name in-cart includes the suffix “FO32U2P” ...`
- Proposed: Keep this warning as-is and make it prominent.
- Why: Model suffix confusion (FO32U2 vs FO32U2P) is a real risk on Amazon EU grouped listings.
- Confidence: high
- Needs source: N/A (process note; still worth keeping).

## Questions for Researcher

1) Provide official sources for the FO32U2P spec sheet + manual (PDF preferred), and add them to the Research Pack so Copywriter can cite safely.
2) Confirm the full port list (video + USB + audio), specifically:
   - Is there a **Mini DisplayPort** input?
   - Is there a **DP-out / MST daisy chain** feature (and via which port)?
   - HDMI 2.1 bandwidth: is it explicitly **48Gbps** or not stated?
   - Audio jacks: is **Mic In** real, or headphone-only?
3) Confirm panel coating/finish (glossy vs anti-reflection wording) and whether “Samsung Gen 3” is explicitly stated anywhere official.
4) Confirm USB-C details: DP Alt Mode yes/no, PD wattage, and whether KVM is hardware-based and which ports participate.
5) Confirm brightness/HDR claims with conditions (SDR typical, HDR peak window size) and whether any HDR formats beyond “DisplayHDR True Black 400” are supported.

