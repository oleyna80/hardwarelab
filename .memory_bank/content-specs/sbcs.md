# SBCs — Content Specs

## Category Info
- **Slug**: `sbc`
- **Target**: Single-Board Computers (Raspberry Pi, Orange Pi, Odroid)

## Required Specs

| Field | Type | Example |
|-------|------|---------|
| `cpu` | string | "Rockchip RK3588 (8-core)" |
| `ram` | string | "8GB LPDDR4X" |
| `storage` | string | "eMMC slot + microSD" |
| `gpio` | string | "40-pin GPIO" |
| `connectivity` | string[] | ["Wi-Fi 6", "Bluetooth 5.0", "Gigabit Ethernet"] |
| `videoOutput` | string[] | ["HDMI 2.1", "USB-C DP"] |

## Optional Specs

| Field | Type | Example |
|-------|------|---------|
| `npu` | string | "6 TOPS AI accelerator" |
| `pcie` | string | "PCIe 3.0 x4" |
| `m2Slot` | boolean | true |
| `usb` | string | "2x USB 3.0, 2x USB 2.0" |
| `camera` | string | "MIPI CSI" |
| `display` | string | "MIPI DSI" |
| `powerInput` | string | "5V/4A USB-C" |
| `dimensions` | string | "100 x 75 mm" |

## SEO Keywords
- Raspberry Pi alternative
- best SBC for [NAS/media center/home automation]
- [brand] vs Raspberry Pi
- ARM single board computer

## Frontmatter Example

```yaml
title: "Orange Pi 5 Plus Review"
category: "sbc"
specs:
  cpu: "Rockchip RK3588 (8-core)"
  ram: "16GB LPDDR4X"
  storage: "eMMC + M.2 NVMe + microSD"
  gpio: "40-pin compatible"
  connectivity: ["Wi-Fi 6", "Bluetooth 5.0", "2.5GbE"]
  videoOutput: ["2x HDMI 2.1", "USB-C DP"]
  npu: "6 TOPS"
  pcie: "PCIe 3.0 x4"
  m2Slot: true
tags:
  - "sbc"
  - "orange-pi-5-plus"
```

## Checklist
- [ ] GPIO compatibility указана
- [ ] NPU/AI capabilities если есть
- [ ] Сравнение с Raspberry Pi
- [ ] Use cases (NAS, media, automation)
- [ ] Affiliate link работает
