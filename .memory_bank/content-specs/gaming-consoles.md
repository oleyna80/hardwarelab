# Gaming Consoles — Content Specs

## Category Info
- **Slug**: `gaming`
- **Tag**: `gaming`
- **ASIN**: Single
- **Target**: Игровые консоли и портативные игровые устройства

## Products Covered

| Type | Examples |
|------|----------|
| **Home Consoles** | Xbox Series X/S, PlayStation 5/Pro, Nintendo Switch |
| **Portable** | Steam Deck, ROG Ally, Legion Go, Nintendo Switch OLED |

## Required Specs

| Field | Type | Example |
|-------|------|---------|
| `cpu` | string | "AMD Zen 2, 8-core" |
| `gpu` | string | "AMD RDNA 2, 12 TFLOPS" |
| `ram` | string | "16GB GDDR6" |
| `storage` | string | "1TB NVMe SSD" |
| `display` | string | "4K@120Hz, VRR" (home) / "7.4" OLED 90Hz" (portable) |
| `controllers` | string | "2x Wireless included" |

## Optional Specs

| Field | Type | Example |
|-------|------|---------|
| `batteryLife` | string | "2-8 hours" (portable only) |
| `discDrive` | boolean | true/false |
| `subscriptionService` | string | "Game Pass Ultimate" |
| `backwardsCompat` | string | "Xbox 360, Xbox One" |
| `weight` | string | "669g" (portable) |
| `audioJack` | boolean | true |

## SEO Keywords
- best gaming console 2026
- Xbox Series X vs PS5 Pro
- Steam Deck OLED review
- portable gaming console
- Game Pass vs PS Plus

## Mandatory Sections

- [ ] **Exclusive titles** (3-5 game names)
- [ ] **Ecosystem comparison** (subscription services)
- [ ] **Storage analysis** (internal + expansion)
- [ ] **Performance metrics** (resolution, FPS, ray tracing)

## Frontmatter Example

```yaml
title: "Xbox Series X 2TB Review: Storage Wins"
asin: "B0XXXXXXXXX"
rating: 4.5
priceCategory: "high"
heroImage: "./image.webp"
tags:
  - "gaming"
  - "xbox-series-x"
  - "4k-gaming"
```

## Checklist
- [ ] Console type (home/portable)
- [ ] Storage options
- [ ] Exclusive titles section
- [ ] Ecosystem comparison
- [ ] Affiliate link verified
