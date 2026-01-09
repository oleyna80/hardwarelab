# Content Specs

Спецификации контента по категориям продуктов.

## Categories

| Category | File | Products |
|----------|------|----------|
| [Monitors](monitors.md) | monitors.md | Gaming/productivity monitors |
| [Consoles](consoles.md) | consoles.md | Gaming consoles |
| [Mini PCs](mini-pcs.md) | mini-pcs.md | Compact computers |
| [NAS](nas.md) | nas.md | Network storage |
| [SBCs](sbcs.md) | sbcs.md | Single-board computers |
| [Gaming](gaming.md) | gaming.md | Gaming PCs, peripherals |
| [AI Workstations](ai-workstations.md) | ai-workstations.md | AI/ML builds |

## Common Structure

Каждый файл категории содержит:
1. **Required Specs** — обязательные характеристики
2. **Optional Specs** — дополнительные поля
3. **SEO Keywords** — ключевые слова категории
4. **Checklist** — перед публикацией

## Frontmatter Base

Все обзоры имеют общие поля:

```yaml
# Required for all
title: string
description: string
pubDate: date
heroImage: string
heroImageAlt: string
ogImage: string
rating: number (1-5)
category: string
tags: string[]
asin: string
price: string  # "From $XXX"

# Category-specific specs below...
```

---

→ Page templates: [../ui_extension/](../ui_extension/)
