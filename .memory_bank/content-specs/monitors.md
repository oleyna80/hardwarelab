# Monitors — Content Specs

## Category Info
- **Slug**: `monitors`
- **Target**: Gaming и productivity мониторы

## Required Specs

| Field | Type | Example |
|-------|------|---------|
| `screenSize` | string | "27 inch" |
| `resolution` | string | "2560x1440 (QHD)" |
| `panelType` | string | "IPS / VA / OLED" |
| `refreshRate` | string | "144Hz / 240Hz" |
| `responseTime` | string | "1ms GTG" |
| `hdr` | string | "HDR400 / HDR600 / HDR1000" |
| `ports` | string[] | ["HDMI 2.1", "DisplayPort 1.4", "USB-C"] |

## Optional Specs

| Field | Type | Example |
|-------|------|---------|
| `curvature` | string | "1000R" |
| `aspectRatio` | string | "16:9 / 21:9" |
| `brightness` | string | "400 nits" |
| `colorGamut` | string | "98% DCI-P3" |
| `speakers` | string | "2x 2W" |
| `vesa` | string | "100x100mm" |
| `gsync` | boolean | true |
| `freesync` | boolean | true |

## SEO Keywords
- gaming monitor review
- best monitor for [gaming/productivity/photo editing]
- [resolution] monitor comparison
- [brand] monitor review

## Frontmatter Example

```yaml
title: "LG 27GP850-B Review"
category: "monitors"
specs:
  screenSize: "27 inch"
  resolution: "2560x1440"
  panelType: "Nano IPS"
  refreshRate: "180Hz"
  responseTime: "1ms"
  hdr: "HDR400"
  ports: ["HDMI 2.0", "DisplayPort 1.4", "USB 3.0"]
  gsync: true
  freesync: true
```

## Checklist
- [ ] Все required specs заполнены
- [ ] Указан refresh rate и response time
- [ ] Упомянуты G-Sync/FreeSync
- [ ] Есть сравнение с конкурентами
- [ ] Affiliate link работает
