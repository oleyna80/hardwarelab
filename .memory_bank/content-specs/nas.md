# NAS — Content Specs

## Category Info
- **Slug**: `nas`
- **Target**: Сетевые хранилища (Synology, QNAP, Asustor)

## Required Specs

| Field | Type | Example |
|-------|------|---------|
| `bays` | number | 4 |
| `maxCapacity` | string | "72TB (4x 18TB)" |
| `cpu` | string | "Intel Celeron J4125" |
| `ram` | string | "4GB DDR4" |
| `raidSupport` | string[] | ["RAID 0", "RAID 1", "RAID 5", "SHR"] |
| `networkPorts` | string | "2x 1GbE" |

## Optional Specs

| Field | Type | Example |
|-------|------|---------|
| `maxRam` | string | "32GB" |
| `m2Slots` | number | 2 |
| `pcie` | string | "PCIe 3.0 x2" |
| `hotSwap` | boolean | true |
| `transcoding` | string | "4K H.265 hardware" |
| `docker` | boolean | true |
| `virtualMachines` | boolean | true |
| `powerConsumption` | string | "12W idle / 45W active" |
| `noiseLevel` | string | "20 dB(A)" |

## SEO Keywords
- best NAS for [home/small business/Plex]
- Synology vs QNAP
- [brand] NAS review
- RAID NAS setup

## Frontmatter Example

```yaml
title: "Synology DS423+ Review"
category: "nas"
specs:
  bays: 4
  maxCapacity: "72TB"
  cpu: "Intel Celeron J4125"
  ram: "2GB DDR4"
  maxRam: "6GB"
  raidSupport: ["RAID 0", "RAID 1", "RAID 5", "RAID 6", "SHR"]
  networkPorts: "2x 1GbE"
  m2Slots: 2
  hotSwap: true
  transcoding: "4K H.265"
  docker: true
```

## Checklist
- [ ] Количество bays указано
- [ ] RAID опции перечислены
- [ ] Transcoding capabilities
- [ ] Power consumption для 24/7
- [ ] Affiliate link работает
