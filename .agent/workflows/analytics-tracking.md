---
description: Analytics and conversion tracking implementation
---

# Analytics & Conversion Tracking

## Overview
Track user behavior, affiliate clicks, and conversions for optimization.

---

## 1. Google Analytics 4 Setup

### Installation
Add to `src/layouts/Layout.astro`:
```astro
---
const GA_ID = import.meta.env.PUBLIC_GA_ID;
---

<head>
  {GA_ID && (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}></script>
      <script is:inline define:vars={{ GA_ID }}>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', GA_ID);
      </script>
    </>
  )}
</head>
```

### Environment Variables
```env
PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 2. Affiliate Click Tracking

### Custom Events
Add to `src/components/ui/AffiliateButton.astro`:
```astro
<a
  href={amazonUrl}
  rel="nofollow sponsored"
  target="_blank"
  data-asin={asin}
  data-product={productName}
  onclick="trackAffiliateClick(this)"
>
  {label}
</a>

<script is:inline>
function trackAffiliateClick(element) {
  const asin = element.dataset.asin;
  const product = element.dataset.product;
  
  if (typeof gtag !== 'undefined') {
    gtag('event', 'affiliate_click', {
      'event_category': 'affiliate',
      'event_label': product,
      'asin': asin
    });
  }
}
</script>
```

---

## 3. Key Events to Track

### Page Events
```javascript
// Track scroll depth
gtag('event', 'scroll', {
  'percent_scrolled': 90
});

// Track review reading time
gtag('event', 'engagement', {
  'engagement_time_msec': timeOnPage
});
```

### Conversion Goals (GA4)
1. **Affiliate Click** - User clicks Amazon button
2. **Review Complete** - Scrolled >80% of review
3. **Multi-Language** - Used language switcher
4. **Return Visitor** - Session count > 1

---

## 4. Amazon Attribution (Optional)

### Setup
1. Apply at [Amazon Attribution](https://advertising.amazon.com/attribution)
2. Create attribution tags for campaigns
3. Add to affiliate URLs:

```typescript
const url = `https://www.amazon.com/dp/${asin}?tag=${tag}&linkCode=ll1&tag_id=xxx`;
```

---

## 5. Privacy & GDPR Compliance

### Cookie Consent Banner
Create `src/components/ui/CookieConsent.astro`:
```astro
---
const { lang = 'en' } = Astro.props;

const text = {
  en: {
    message: 'We use cookies to analyze traffic and improve your experience.',
    accept: 'Accept',
    decline: 'Decline'
  },
  fr: {
    message: 'Nous utilisons des cookies pour analyser le trafic.',
    accept: 'Accepter',
    decline: 'Refuser'
  },
  de: {
    message: 'Wir verwenden Cookies zur Analyse des Datenverkehrs.',
    accept: 'Akzeptieren',
    decline: 'Ablehnen'
  },
  ru: {
    message: 'Мы используем cookies для анализа трафика.',
    accept: 'Принять',
    decline: 'Отклонить'
  }
};

const t = text[lang] || text.en;
---

<div id="cookie-consent" class="hidden fixed bottom-0 left-0 right-0 bg-zinc-900 p-4 z-50">
  <div class="container mx-auto flex items-center justify-between gap-4">
    <p class="text-sm text-zinc-300">{t.message}</p>
    <div class="flex gap-2">
      <button id="accept-cookies" class="px-4 py-2 bg-indigo-600 text-white rounded">
        {t.accept}
      </button>
      <button id="decline-cookies" class="px-4 py-2 bg-zinc-700 text-white rounded">
        {t.decline}
      </button>
    </div>
  </div>
</div>

<script is:inline>
  if (!localStorage.getItem('cookieConsent')) {
    document.getElementById('cookie-consent').classList.remove('hidden');
  }
  
  document.getElementById('accept-cookies')?.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'accepted');
    document.getElementById('cookie-consent').classList.add('hidden');
  });
  
  document.getElementById('decline-cookies')?.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'declined');
    document.getElementById('cookie-consent').classList.add('hidden');
    // Disable analytics
    window['ga-disable-' + GA_ID] = true;
  });
</script>
```

---

## 6. Dashboard & Reporting

### Key Metrics to Monitor

| Metric | Source | Goal |
|--------|--------|------|
| Affiliate CTR | GA4 Events | >3% |
| Avg. Time on Review | GA4 | >3 min |
| Bounce Rate | GA4 | <50% |
| Pages/Session | GA4 | >2 |

### Custom GA4 Report Setup
1. **Explorations** → New blank exploration
2. Dimensions: Page path, Language, Device
3. Metrics: Affiliate clicks, Sessions, Bounce rate
4. Filter: Page path contains "/reviews/"

---

## 7. Testing Analytics

### Debug Mode
Add to URL: `?debug_mode=true`

```javascript
gtag('config', GA_ID, { 'debug_mode': true });
```

### Verify Events
1. Open GA4 → DebugView
2. Click affiliate button on site
3. Confirm `affiliate_click` event appears

---

## Quick Checklist

- [ ] GA4 tracking code installed
- [ ] Environment variable configured
- [ ] Affiliate click events firing
- [ ] Cookie consent implemented
- [ ] Privacy policy updated
- [ ] Events visible in GA4 DebugView
