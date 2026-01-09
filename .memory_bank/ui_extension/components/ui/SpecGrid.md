# SpecGrid

Specifications table component.

## Location
`src/components/ui/SpecGrid.astro`

## Purpose
Таблица характеристик продукта.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `specs` | `Record<string, string>` | required | Key-value specs |
| `title` | `string` | "Specifications" | Заголовок секции |

## Features

- Two-column grid
- Alternating row colors
- Dark mode support
- Responsive design

## Dependencies

- None (standalone)

## Usage

```astro
import SpecGrid from '@/components/ui/SpecGrid.astro';

<SpecGrid 
  title="Technical Specifications"
  specs={{
    "CPU": "Apple M4 10-core",
    "RAM": "16GB unified",
    "Storage": "512GB SSD",
    "GPU": "10-core GPU"
  }}
/>
```

## Used In

- `src/content/reviews/**/*.mdx`
- Review pages via MDX import
