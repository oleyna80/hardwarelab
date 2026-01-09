# ProsCons

Pros and cons list component.

## Location
`src/components/ui/ProsCons.astro`

## Purpose
Отображение плюсов и минусов продукта.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `pros` | `string[]` | required | Список плюсов |
| `cons` | `string[]` | required | Список минусов |
| `lang` | `Language` | "en" | Язык для заголовков |

## Features

- Two-column layout
- Green checkmarks for pros
- Red crosses for cons
- Localized headers
- Icon bullets

## Dependencies

- `src/utils/i18n.ts` — для локализации заголовков

## Usage

```astro
import ProsCons from '@/components/ui/ProsCons.astro';

<ProsCons 
  pros={["Fast performance", "Compact design", "Silent operation"]}
  cons={["High price", "Limited ports"]}
  lang="en"
/>
```

## Used In

- `src/content/reviews/**/*.mdx`
- Review pages via MDX import
