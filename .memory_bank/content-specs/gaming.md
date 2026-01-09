# Gaming — Content Specs

## Category Info
- **Slug**: `gaming`
- **Target**: Gaming PCs, периферия, аксессуары

## Required Specs (Gaming PC)

| Field | Type | Example |
|-------|------|---------|
| `cpu` | string | "Intel i9-14900K" |
| `gpu` | string | "NVIDIA RTX 4090" |
| `ram` | string | "64GB DDR5" |
| `storage` | string | "2TB NVMe SSD" |
| `psu` | string | "1000W 80+ Gold" |
| `cooling` | string | "360mm AIO" |

## Required Specs (Peripherals)

| Field | Type | Example |
|-------|------|---------|
| `type` | string | "keyboard/mouse/headset" |
| `connectivity` | string | "Wired / 2.4GHz / Bluetooth" |
| `switches` | string | "Cherry MX Red" (keyboards) |
| `dpi` | string | "25,600 DPI" (mice) |
| `drivers` | string | "50mm" (headsets) |

## Optional Specs

| Field | Type | Example |
|-------|------|---------|
| `formFactor` | string | "ATX / mATX / ITX" |
| `rgb` | boolean | true |
| `software` | string | "iCUE / Synapse" |
| `weight` | string | "63g" (mice) |
| `batteryLife` | string | "70 hours" |
| `microphone` | boolean | true |

## SEO Keywords
- best gaming PC 2026
- RTX 4090 build
- mechanical keyboard for gaming
- wireless gaming mouse

## Frontmatter Example

```yaml
title: "CORSAIR K100 RGB Review"
category: "gaming"
productType: "keyboard"
specs:
  type: "Mechanical Keyboard"
  connectivity: "Wired USB"
  switches: "CORSAIR OPX Optical"
  rgb: true
  software: "iCUE"
  extras: ["iCUE Control Wheel", "Macro Keys"]
```

## Checklist
- [ ] Product type указан
- [ ] Ключевые specs для типа
- [ ] RGB/Software ecosystem
- [ ] Affiliate link работает
