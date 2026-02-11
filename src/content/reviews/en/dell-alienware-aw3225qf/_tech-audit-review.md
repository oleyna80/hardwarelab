# Tech Audit: Dell Alienware AW3225QF (monitors)

## CRITICAL

### TA-01
- ID: TA-01
- Blocker: yes
- Current: "2x HDMI 2.1 (up to 4K 240Hz FRL; one HDMI supports eARC for Dolby Atmos pass-through)"
- Proposed: List HDMI as "2x HDMI 2.1" and only claim 4K/240 if the official spec explicitly states the required conditions (likely DSC). Do not claim eARC/Atmos unless confirmed.
- Why: 4K/240 over HDMI 2.1 typically requires DSC; eARC/Atmos pass-through on a monitor is non-standard and easy to misstate.
- Confidence: medium
- Needs source: Dell AW3225QF official tech specs page + Dell user guide/ports diagram confirming (a) 4K/240 over HDMI and whether DSC is required, (b) eARC support and which HDMI port.

### TA-02
- ID: TA-02
- Blocker: yes
- Current: "HDMI 2.1 FRL (48Gbps per RTINGS)"
- Proposed: Remove the explicit "48Gbps" claim unless a primary/official source confirms the FRL rate; keep "HDMI 2.1".
- Why: FRL lane rate/bandwidth details are often not in official specs; wrong Gbps is a common misinformation trap.
- Confidence: high
- Needs source: RTINGS AW3225QF review URL (if kept) and/or Dell documentation explicitly stating HDMI FRL bandwidth.

### TA-03
- ID: TA-03
- Blocker: yes
- Current: "Dolby Vision: Yes (Source: RTINGS; also referenced on Amazon FR)" + "HDR10: Yes (Source: RTINGS)" + "DisplayHDR True Black 400 (Source: Amazon FR listing)"
- Proposed: Keep HDR claims only if confirmed by Dell official specs/marketing; otherwise mark as UNVERIFIED and avoid in PASS B.
- Why: HDR format/certification support must be exact (Dolby Vision and DisplayHDR tier are high-impact claims).
- Confidence: medium
- Needs source: Dell product page/spec sheet for AW3225QF explicitly listing supported HDR formats/certs; optional: VESA DisplayHDR certification listing for the exact model.

### TA-04
- ID: TA-04
- Blocker: yes
- Current: "USB-C downstream @ 5Gbps (USB 3.2 Gen 1), 15W PD; no DisplayPort Alt Mode / Thunderbolt"
- Proposed: Verify and then state precisely whether the USB-C port supports video input (DP Alt Mode) or is data/charging only; until verified, avoid "no DP Alt Mode".
- Why: USB-C video support is a major purchase decision; a wrong claim can break the whole positioning (laptop docking vs console/PC).
- Confidence: medium
- Needs source: Dell AW3225QF ports/specs table or user guide confirming USB-C role (downstream vs upstream), data rate, charging wattage, and DP Alt Mode presence/absence.

### TA-05
- ID: TA-05
- Blocker: yes
- Current: "3.5mm audio out: No (Source: Dell + RTINGS)"
- Proposed: Confirm the presence/absence of a 3.5mm audio-out (or any analog audio) in official specs/IO diagram; if absent, keep, but add Dell source link.
- Why: Audio-out is a key compatibility point (speakers/console setups), and the Research Pack also relies on a user quote about missing AUX.
- Confidence: medium
- Needs source: Dell AW3225QF official IO/ports diagram (user guide PDF is best).

## SUSPICIOUS / NEEDS VERIFICATION

### TA-06
- ID: TA-06
- Blocker: yes
- Current: Multiple entries cite "Source: Dell tech specs / Dell page / RTINGS" but no URLs are provided.
- Proposed: Add the exact source URLs (Dell official product page / spec sheet / user guide, RTINGS review) next to each claim, or move unlinked claims into a VERIFIED ADDENDUM only after verification.
- Why: Per workflow rules, claims without sources are automatically SUSPICIOUS; PASS B should not rely on untraceable facts.
- Confidence: high
- Needs source: Direct links to the Dell and RTINGS pages used.

### TA-07
- ID: TA-07
- Blocker: no
- Current: "VRR / Sync: NVIDIA G-SYNC Compatible (certified); VESA AdaptiveSync"
- Proposed: Verify if AMD FreeSync (and which tier) is also officially supported; otherwise keep wording conservative.
- Why: VRR branding tiers (G-SYNC Compatible vs native module; FreeSync Premium/Pro) are frequently misquoted.
- Confidence: medium
- Needs source: Dell AW3225QF official VRR/support list; optional: NVIDIA G-SYNC Compatible listing page.

### TA-08
- ID: TA-08
- Blocker: no
- Current: Brightness listed as "250 nits typical" and "1000 nits HDR peak (typical)".
- Proposed: Rephrase HDR as "up to 1000 nits peak" and specify the measurement/window/mode if the official source provides it.
- Why: "typical" vs "peak" and window size are crucial for HDR accuracy.
- Confidence: medium
- Needs source: Dell tech specs table for luminance/HDR modes (or the official spec sheet PDF).

### TA-09
- ID: TA-09
- Blocker: no
- Current: Dimensions/weight numbers are asserted with "Source: Dell" but no link.
- Proposed: Keep only if backed by a Dell URL; otherwise mark UNVERIFIED.
- Why: Low-risk but still factual.
- Confidence: medium
- Needs source: Dell official dimensions/weight table URL or user guide.

### TA-10
- ID: TA-10
- Blocker: no
- Current: "Warranty note (OLED burn-in): 3-year limited hardware warranty including OLED burn-in (Source: Dell page)"
- Proposed: Confirm that this exact model/region includes burn-in coverage (and whether Renewed listings differ) and cite the Dell warranty statement.
- Why: Warranty coverage differs by product/region and is high-impact.
- Confidence: medium
- Needs source: Dell official warranty statement for AW3225QF (URL) + note about Renewed listing warranty if used.

## OK

### TA-11
- ID: TA-11
- Blocker: no
- Current: PPI calculation: 3840×2160 @ 31.6" → ~139.4 PPI.
- Proposed: OK.
- Why: Math checks out.
- Confidence: high
- Needs source: None (calculation), but keep Dell PPI claim only with Dell source link.

## Questions for Researcher

1) Provide the Dell official product/spec URL(s) used for AW3225QF (ports, HDR formats, brightness, VRR, warranty).
2) Confirm HDMI details: 4K/240 support conditions (DSC?) and whether any HDMI port supports eARC.
3) Confirm USB-C capabilities: data rate, charging wattage, and whether it supports DP Alt Mode (video input) or not.
4) Confirm audio outputs: presence/absence of 3.5mm audio-out and any other audio routing expectations.
5) If keeping "48Gbps" FRL: provide a verifiable source; otherwise remove and keep "HDMI 2.1" only.
