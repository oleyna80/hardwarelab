# AffiliateButton

Amazon affiliate link button with compliance.

## Location
`src/components/ui/AffiliateButton.astro`

## Purpose
Генерирует affiliate-ссылку на Amazon с правильными атрибутами для compliance.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asin` | `string \| object` | required | ASIN или объект с ASIN по регионам |
| `label` | `string` | "Check Price on Amazon" | Текст кнопки |
| `lang` | `Language` | "en" | Язык (определяет регион) |
| `retailer` | `string` | "Amazon" | Название ритейлера |
| `price` | `number` | — | Цена для отображения |
| `currency` | `string` | "USD" | Валюта |
| `variant` | `"primary" \| "secondary" \| "outline"` | "primary" | Стиль |
| `size` | `"sm" \| "md" \| "lg"` | "md" | Размер |
| `icon` | `boolean` | true | Показывать иконку |

## Compliance Features

- `rel="nofollow sponsored noopener noreferrer"`
- `target="_blank"`
- Uses centralized `AMAZON_CONFIG` for affiliate tag
- Region-aware ASIN resolution

## Dependencies

- `src/utils/i18n.ts` — Language type
- `src/config.ts` — AMAZON_CONFIG

## Usage

```astro
import AffiliateButton from '@/components/ui/AffiliateButton.astro';

<AffiliateButton 
  asin="B0XXXXXXXX" 
  label="Buy on Amazon"
  price={599}
  variant="primary"
/>
```

## Used In

- `src/pages/reviews/[...slug].astro`
- `src/content/reviews/**/*.mdx`
- Review pages via MDX import
