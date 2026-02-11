# AI Workstation Builds — Content Specs

## Category Info
- **Slug**: `ai-workstation`
- **Tag**: `ai-workstation`
- **ASIN**: **Multi-ASIN** (6-10 components)
- **Target**: Сборки рабочих станций для ML/AI, deep learning

> ⚠️ **Только сборки!** Готовые workstations (HP Z, Dell Precision) не входят в эту категорию.

## Key Requirements

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| **GPU** | 2x RTX 4090 | 2-4x RTX 4090 / A100 |
| **GPU VRAM** | 48GB total | 96GB+ |
| **PSU** | 1000W | 1600W+ Titanium |
| **Motherboard** | 2x PCIe x16 | HEDT platform |
| **RAM** | 64GB | 256GB DDR5 ECC |
| **Cooling** | 360mm AIO | Custom loop |

## Component ASINs (6-10 required)

| Component | Required | Example |
|-----------|----------|---------|
| **CPU** | ✅ | AMD Threadripper PRO 7995WX |
| **GPU** (primary) | ✅ | NVIDIA RTX 4090 |
| **GPU** (secondary) | ✅ | NVIDIA RTX 4090 |
| **Motherboard** | ✅ | ASUS WRX90 |
| **RAM** | ✅ | 256GB DDR5 ECC Kit |
| **PSU** | ✅ | Corsair AX1600i |
| **Storage** | ✅ | 4TB NVMe Gen5 |
| **Case** | ✅ | Phanteks Enthoo Pro 2 |
| **Cooling** | ✅ | Noctua NH-D15 chromax |
| **Risers** | ○ | PCIe 4.0 x16 riser |

## Required Specs per Component

| Field | Type | Example |
|-------|------|---------|
| `category` | string | "gpu" |
| `name` | string | "NVIDIA RTX 4090 Founders Edition" |
| `asin` | string | "B0XXXXXXXXX" |
| `price` | number | 1599.99 |

## Optional Specs

| Field | Type | Example |
|-------|------|---------|
| `tensorCores` | string | "16384 per GPU" |
| `nvlink` | boolean | true |
| `cudaCores` | string | "32768 total" |
| `networkCard` | string | "10GbE" |
| `powerConsumption` | string | "1200W peak" |

## Use Cases

| Use Case | Key Requirements |
|----------|------------------|
| LLM Training (70B+) | High VRAM, multi-GPU, NVLink |
| LLM Inference | 24GB+ VRAM per GPU |
| Stable Diffusion XL | CUDA cores, 12GB+ VRAM |
| Data Science | RAM, storage, CPU |
| Video AI (DaVinci) | Tensor cores, NVENC |

## SEO Keywords
- AI workstation build 2026
- dual RTX 4090 build
- deep learning PC build
- Threadripper AI workstation
- local LLM server build
- multi-GPU workstation

## Mandatory Sections

- [ ] **Component list** with all ASINs
- [ ] **Compatibility check** (CPU socket, PSU wattage)
- [ ] **Total price breakdown**
- [ ] **Assembly notes** (GPU clearance, thermals)
- [ ] **ML/AI performance estimates** (tokens/sec, batch size)
- [ ] **Alternative parts** (budget/high options)

## Frontmatter Example

```yaml
title: "AI Workstation Build: Dual RTX 4090 + Threadripper"
reviewType: "build"
category: "ai-workstation"
buildComponents:
  - name: "CPU: AMD Threadripper PRO 7995WX"
    asin: "B0XXXXXXXXX"
    category: "cpu"
    price: 6999.99
  - name: "GPU: NVIDIA RTX 4090"
    asin: "B0YYYYYYYYY"
    category: "gpu"
    price: 1599.99
  - name: "GPU: NVIDIA RTX 4090"
    asin: "B0YYYYYYYYY"
    category: "gpu"
    price: 1599.99
  - name: "PSU: 1600W Titanium"
    asin: "B0BBBBBBB"
    category: "psu"
    price: 499.99
tags:
  - "ai-workstation"
  - "dual-rtx-4090"
  - "threadripper"
```

## Checklist
- [ ] 6-10 component ASINs verified
- [ ] Compatibility confirmed (socket, PSU, case fit)
- [ ] Total price calculated
- [ ] Multi-GPU setup described
- [ ] Power requirements met
- [ ] Cooling solution adequate
- [ ] ML/AI use cases covered
- [ ] All affiliate links working
