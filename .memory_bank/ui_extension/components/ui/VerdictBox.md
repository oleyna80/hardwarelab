# VerdictBox

Final verdict/conclusion component.

## Location
`src/components/ui/VerdictBox.astro`

## Purpose
Финальный вердикт/заключение обзора.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `rating` | `number` | required | Финальный рейтинг (1-5) |
| `verdict` | `string` | required | Текст вердикта |
| `recommended` | `boolean` | true | Рекомендуется ли |
| `bestFor` | `string[]` | — | Для кого подходит |
| `notFor` | `string[]` | — | Для кого не подходит |

## Features

- Large rating display
- Recommendation badge
- Best for / Not for lists
- Call-to-action button
- Dark mode support

## Dependencies

- None (standalone)

## Usage

```astro
import VerdictBox from '@/components/ui/VerdictBox.astro';

<VerdictBox 
  rating={4.5}
  verdict="Excellent choice for creative professionals"
  recommended={true}
  bestFor={["Video editors", "Developers", "Musicians"]}
  notFor={["Gamers needing discrete GPU"]}
/>
```

## Used In

- `src/content/reviews/**/*.mdx`
- Review pages via MDX import
