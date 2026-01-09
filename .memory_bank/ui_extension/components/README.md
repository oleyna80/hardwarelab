# Components Documentation

Документация UI компонентов HardwareLab.

## Component Index

### Layout (`src/components/layout/`)

| Component | Purpose | Doc |
|-----------|---------|-----|
| [Header](layout/Header.md) | Навигация, язык, тема | ✅ |
| [Footer](layout/Footer.md) | Footer, disclosure | ✅ |
| [Hero](layout/Hero.md) | Hero-секция главной | ✅ |

### Head (`src/components/head/`)

| Component | Purpose | Doc |
|-----------|---------|-----|
| [SEO](head/SEO.md) | Meta, OG, hreflang | ✅ |

### UI (`src/components/ui/`)

| Component | Purpose | Doc |
|-----------|---------|-----|
| [AffiliateButton](ui/AffiliateButton.md) | Amazon link | ✅ |
| [ReviewCard](ui/ReviewCard.md) | Review preview | ✅ |
| [ReviewHero](ui/ReviewHero.md) | Review page hero | ✅ |
| [ProsCons](ui/ProsCons.md) | Pros/cons list | ✅ |
| [SpecGrid](ui/SpecGrid.md) | Specs table | ✅ |
| [VerdictBox](ui/VerdictBox.md) | Final verdict | ✅ |
| ProductHeader | H1 product title | — |
| ReviewBannerCarousel | Homepage carousel | — |
| ShareButtons | Social share | — |
| BuildHero | Build review hero | — |
| ComponentsGrid | Build components | — |
| MonitorSpecs | Monitor-specific | — |
| GamingPerformance | Gaming benchmarks | — |
| AIPerformance | AI benchmarks | — |
| TerminalBlock | Code blocks | — |
| UserFeedback | User reviews | — |
| PriceCheckButton | Price CTA | — |
| AlternativeParts | Build alternatives | — |

## Usage Pattern

```astro
---
import AffiliateButton from '@/components/ui/AffiliateButton.astro';
import ProsCons from '@/components/ui/ProsCons.astro';
---

<AffiliateButton asin="B0XXXXXXXX" />
<ProsCons pros={["Fast", "Quiet"]} cons={["Expensive"]} />
```
