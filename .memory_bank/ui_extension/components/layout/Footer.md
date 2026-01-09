# Footer

Site footer with affiliate disclosure.

## Location
`src/components/layout/Footer.astro`

## Purpose
Footer с копирайтом и обязательным Amazon disclosure.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `lang` | `"en" \| "fr" \| "ru"` | "en" | Текущий язык |



## Features

- Localized copyright с текущим годом
- **Amazon Affiliate Disclosure** — обязательный текст
- Контактная информация
- Ссылки на разделы сайта

## Compliance

Содержит обязательный disclosure:
> "As an Amazon Associate, I earn from qualifying purchases."

## Dependencies

- `src/utils/i18n.ts` — функция `t()` для переводов

## Usage

```astro
import Footer from '@/components/layout/Footer.astro';

<Footer lang="en" />
```

## Used In

- `src/layouts/Layout.astro`
