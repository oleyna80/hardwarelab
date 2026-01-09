# SEO

Meta tags, Open Graph, hreflang component.

## Location
`src/components/head/SEO.astro`

## Purpose
Централизованное управление SEO meta-тегами.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | required | Page title |
| `description` | `string` | required | Meta description |
| `canonicalUrl` | `string` | — | Canonical URL |
| `ogImage` | `string` | — | Open Graph image |
| `ogType` | `string` | "website" | OG type |
| `lang` | `Language` | "en" | Current language |
| `alternateUrls` | `object` | — | hreflang URLs |
| `articleDate` | `string` | — | For articles |
| `noindex` | `boolean` | false | Prevent indexing |

## Generated Tags

- `<title>`
- `<meta name="description">`
- `<link rel="canonical">`
- `<link rel="alternate" hreflang="...">`
- `<meta property="og:*">`
- `<meta name="twitter:*">`
- JSON-LD structured data

## Dependencies

- None (standalone)

## Usage

```astro
import SEO from '@/components/head/SEO.astro';

<SEO 
  title="Mac mini M4 Review"
  description="Full review of Apple Mac mini M4"
  ogImage="/images/mac-mini-og.jpg"
  lang="en"
/>
```

## Used In

- `src/layouts/Layout.astro`
