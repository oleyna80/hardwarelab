# Consoles — Content Specs

## Category Info
- **Slug**: `consoles`
- **Target**: Gaming консоли (PlayStation, Xbox, Nintendo)

## Required Specs

| Field | Type | Example |
|-------|------|---------|
| `brand` | string | "Sony / Microsoft / Nintendo" |
| `model` | string | "PlayStation 5 Pro" |
| `storage` | string | "1TB SSD" |
| `gpu` | string | "Custom RDNA 3" |
| `cpu` | string | "8-core Zen 2" |
| `maxResolution` | string | "4K @ 120Hz / 8K" |
| `rayTracing` | boolean | true |

## Optional Specs

| Field | Type | Example |
|-------|------|---------|
| `discDrive` | boolean | true |
| `backwardsCompatible` | string[] | ["PS4", "PS3"] |
| `exclusiveGames` | string[] | ["Spider-Man 2", "God of War"] |
| `vrSupport` | string | "PlayStation VR2" |
| `dimensions` | string | "390 x 104 x 260 mm" |
| `weight` | string | "3.2 kg" |
| `wifiVersion` | string | "Wi-Fi 6E" |
| `powerConsumption` | string | "200W" |

## SEO Keywords
- [console name] review
- PS5 vs Xbox Series X
- best gaming console 2026
- [console] exclusive games

## Frontmatter Example

```yaml
title: "PlayStation 5 Pro Review"
category: "consoles"
specs:
  brand: "Sony"
  model: "PlayStation 5 Pro"
  storage: "2TB SSD"
  gpu: "Custom RDNA 3.5"
  cpu: "8-core Zen 2 @ 3.85GHz"
  maxResolution: "4K @ 120Hz, 8K support"
  rayTracing: true
  discDrive: true
  backwardsCompatible: ["PS4", "PS VR"]
  exclusiveGames: ["Spider-Man 2", "Horizon"]
```

## Checklist
- [ ] GPU/CPU specs указаны
- [ ] Упомянуты эксклюзивы
- [ ] Сравнение с конкурентами
- [ ] Backwards compatibility описана
- [ ] Affiliate link работает
