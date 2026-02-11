---
name: Hardware Accuracy Check
description: Validation rules for verifying hardware specifications across categories like monitors, mini PCs, consoles, and AI workstations.
---

# Hardware Accuracy Check

**Objective:** Validation rules for specific hardware categories.

## 🟢 General Checks (All Categories)
- **Names:** Verify exact model capitalization (e.g., "Ryzen 7 5800H" not "ryzen 5800h").
- **Ports:** Distinguish "USB 3.0", "USB 3.1 Gen 1", "USB 3.2 Gen 1" (they are often the same 5Gbps, but consistency matters).
- **Storage:** Verify if "1TB" is raw capacity vs. usable (rarely stated, but if stated, must be sourced).
- **Sources:** If a spec has NO source link in the Pack -> Mark as `SUSPICIOUS`.

## 🖥️ Category: Monitors
- **Resolution vs Size:** Calculate PPI. Does it match the claim?
- **Refresh Rate:** Check for "Overclocked" vs "Native" rates.
- **Color:** Verify "10-bit" (is it true 10-bit or 8-bit+FRC?).
- **HDMI:** If "HDMI 2.1" is listed, check bandwidth (48Gbps vs 24Gbps). If unknown -> Mark `NEEDS VERIFICATION`.

## 📦 Category: Mini PC / Systems
- **Memory:** Is it LPDDR (Soldered) or SODIMM (Slotted)? Critical distinction.
- **TDP:** Confusing "Base TDP" vs "Turbo TDP". Ensure the pack clarifies which one.
- **Slots:** M.2 SATA vs M.2 NVMe. Physical compatibility keys (Key-M vs Key-B).

## 🎮 Category: Consoles/Handhelds
- **Storage Expansion:** Proprietary cards (Xbox) vs Standard M.2 (PS5/Steam Deck).
- **Screen:** LCD vs OLED. VRR support ranges (e.g. 48-120Hz).

## 🧠 Category: AI Workstation
- **PCIe Lanes:** CPU lanes vs PCH lanes. Bandwidth bottlenecks.
- **PSU:** Is wattage sufficient for GPU spikes (transient loads)?