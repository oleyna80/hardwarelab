# Mini PCs — Content Specs

## Category Info
- **Slug**: `mini-pcs`
- **Target**: Компактные ПК (Mac mini, Intel NUC, Beelink)

## Required Specs

| Field | Type | Example |
|-------|------|---------|
| `cpu` | string | "Apple M4 / Intel i7-1360P" |
| `ram` | string | "16GB DDR5" |
| `storage` | string | "512GB NVMe SSD" |
| `gpu` | string | "Integrated / Intel Iris Xe" |
| `ports` | string[] | ["USB-C", "USB-A", "HDMI", "Ethernet"] |
| `dimensions` | string | "127 x 127 x 47 mm" |

## Optional Specs

| Field | Type | Example |
|-------|------|---------|
| `maxRam` | string | "64GB" |
| `storageSlots` | string | "1x NVMe + 1x 2.5\" SATA" |
| `wifi` | string | "Wi-Fi 6E" |
| `bluetooth` | string | "5.3" |
| `thunderbolt` | boolean | true |
| `displayOutputs` | number | 3 |
| `os` | string | "macOS / Windows 11 / Linux" |
| `powerConsumption` | string | "15-65W" |

## SEO Keywords
- best mini PC for [home office/media center/gaming]
- Mac mini vs [competitor]
- compact PC review
- Intel NUC alternative

## Frontmatter Example

```yaml
title: "Mac mini M4 Review"
category: "mini-pcs"
specs:
  cpu: "Apple M4 (10-core)"
  ram: "16GB unified"
  storage: "512GB SSD"
  gpu: "10-core GPU"
  ports: ["3x Thunderbolt 4", "2x USB-A", "HDMI", "Ethernet"]
  dimensions: "127 x 127 x 47 mm"
  thunderbolt: true
  displayOutputs: 3
  os: "macOS Sequoia"
```

## Checklist
- [ ] CPU/RAM/Storage указаны
- [ ] Порты перечислены
- [ ] Размеры для понимания компактности
- [ ] Use cases описаны
- [ ] Affiliate link работает
