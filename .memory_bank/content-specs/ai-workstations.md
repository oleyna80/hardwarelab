# AI Workstations — Content Specs

## Category Info
- **Slug**: `ai-workstations`
- **Target**: Рабочие станции для ML/AI, deep learning

## Required Specs

| Field | Type | Example |
|-------|------|---------|
| `cpu` | string | "AMD Threadripper PRO 7995WX" |
| `gpu` | string | "2x NVIDIA RTX 4090" |
| `gpuVram` | string | "48GB total (2x 24GB)" |
| `ram` | string | "256GB DDR5 ECC" |
| `storage` | string | "4TB NVMe + 8TB HDD" |
| `psu` | string | "1600W 80+ Titanium" |

## Optional Specs

| Field | Type | Example |
|-------|------|---------|
| `tensorCores` | string | "16384 (per GPU)" |
| `nvlink` | boolean | true |
| `cudaCores` | string | "32768 total" |
| `thunderbolt` | boolean | true |
| `networkCard` | string | "10GbE" |
| `cooling` | string | "Custom loop / Air" |
| `noiseLevel` | string | "35 dB(A) under load" |
| `powerConsumption` | string | "1200W peak" |

## Use Cases

| Use Case | Key Requirements |
|----------|------------------|
| LLM Training | High VRAM, multi-GPU |
| Image Generation | CUDA cores, VRAM |
| Data Science | RAM, storage, CPU |
| Video AI | Tensor cores, NVENC |

## SEO Keywords
- best AI workstation
- deep learning PC build
- RTX 4090 ML setup
- Threadripper AI workstation

## Frontmatter Example

```yaml
title: "Ultimate AI Workstation Build 2026"
category: "ai-workstations"
buildType: "build"  # not a product review
specs:
  cpu: "AMD Threadripper PRO 7975WX"
  gpu: "2x NVIDIA RTX 4090"
  gpuVram: "48GB"
  ram: "256GB DDR5 ECC"
  storage: "4TB NVMe Gen5"
  psu: "1600W Titanium"
  nvlink: true
  tensorCores: "32768"
```

## Checklist
- [ ] GPU VRAM total указан
- [ ] Multi-GPU setup описан
- [ ] Power requirements
- [ ] Cooling solution
- [ ] Use cases для ML/AI
- [ ] Affiliate links на компоненты
