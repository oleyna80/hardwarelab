# 🐛 ЗАДАНИЕ ДЛЯ ДЕБАГЕРА

**Приоритет:** 🟡 ВЫСОКИЙ  
**Assigned to:** Debugger Agent  
**Prerequisite:** Выполнение задач кодера

---

## 🎯 Цель

Провести комплексную проверку исправлений и убедиться, что проект готов к продакшн-деплою.

---

## 📋 ЧЕКЛИСТ ПРОВЕРОК

### 🔴 КРИТИЧНО: Amazon Affiliate Compliance

#### ✅ Проверка 1.1: Amazon Tags
**Что проверить:**
- [ ] Файл `.env` создан и содержит реальные Amazon Tags
- [ ] `.env` добавлен в `.gitignore` (не коммитится в репозиторий)
- [ ] `AffiliateButton.astro` использует env variables
- [ ] Все affiliate ссылки содержат корректный tag параметр

**Как проверить:**
```bash
# 1. Проверить наличие .env
cat .env | grep AMAZON_TAG

# 2. Проверить .gitignore
grep ".env" .gitignore

# 3. Build и проверка ссылок
npm run build
grep -r "amazon.com/dp/" dist/ | head -5
```

**Ожидаемый результат:**
```html
<a href="https://www.amazon.com/dp/B0XXXXXX?tag=REAL_TAG-20" ...>
```

**Статус:** [ ] PASS / [ ] FAIL

---

#### ✅ Проверка 1.2: Disclosure видимость
**Что проверить:**
- [ ] `AffiliateDisclosure.astro` компонент создан
- [ ] Disclosure добавлен в начало всех review MDX файлов
- [ ] Disclosure виден БЕЗ прокрутки (above the fold)
- [ ] Disclosure появляется ПЕРЕД первой affiliate ссылкой

**Как проверить:**
```bash
# 1. Запустить preview
npm run preview

# 2. Открыть в браузере:
# http://localhost:4321/reviews/mac-mini-m4
# http://localhost:4321/reviews/orange-pi-5-plus

# 3. Проверить визуально:
# - Disclosure виден сразу при загрузке?
# - Disclosure выше первой кнопки "Check Price"?
# - Disclosure выделен цветом (amber background)?
```

**Ожидаемый результат:**
- Желтый/оранжевый блок с иконкой информации
- Текст: "As an Amazon Associate, I earn from qualifying purchases."
- Расположен в верхней части страницы

**Статус:** [ ] PASS / [ ] FAIL

---

#### ✅ Проверка 1.3: rel атрибуты
**Что проверить:**
- [ ] Все affiliate ссылки имеют `rel="nofollow sponsored"`
- [ ] Порядок атрибутов корректный

**Как проверить:**
```bash
# Build и grep
npm run build
grep -r 'rel="' dist/ | grep amazon | head -10
```

**Ожидаемый результат:**
```html
<a href="..." rel="nofollow sponsored noopener noreferrer" ...>
```

**Статус:** [ ] PASS / [ ] FAIL

---

### 🔍 SEO Validation

#### ✅ Проверка 2.1: sitemap.xml
**Что проверить:**
- [ ] `@astrojs/sitemap` установлен
- [ ] `astro.config.mjs` содержит sitemap integration
- [ ] `sitemap-index.xml` генерируется в `dist/`
- [ ] Все языковые версии включены

**Как проверить:**
```bash
# 1. Проверить package.json
grep "@astrojs/sitemap" package.json

# 2. Build
npm run build

# 3. Проверить sitemap
cat dist/sitemap-index.xml
cat dist/sitemap-0.xml
```

**Ожидаемый результат:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://hardwarelab.example.com/</loc>
  </url>
  <url>
    <loc>https://hardwarelab.example.com/fr/</loc>
  </url>
  ...
</urlset>
```

**Статус:** [ ] PASS / [ ] FAIL

---

#### ✅ Проверка 2.2: robots.txt
**Что проверить:**
- [ ] `public/robots.txt` не пустой
- [ ] Разрешает индексацию всем ботам
- [ ] Содержит ссылку на sitemap

**Как проверить:**
```bash
cat public/robots.txt
```

**Ожидаемый результат:**
```txt
User-agent: *
Allow: /
Sitemap: https://hardwarelab.example.com/sitemap-index.xml
```

**Статус:** [ ] PASS / [ ] FAIL

---

#### ✅ Проверка 2.3: hreflang теги
**Что проверить:**
- [ ] hreflang теги присутствуют в `<head>`
- [ ] Все 4 языка указаны (en, fr, ru, de)
- [ ] x-default указан

**Как проверить:**
```bash
# Build и проверка
npm run build
grep -r "hreflang" dist/reviews/ | head -5
```

**Или в браузере:**
```
View Page Source → Search for "hreflang"
```

**Ожидаемый результат:**
```html
<link rel="alternate" hreflang="en" href="..." />
<link rel="alternate" hreflang="fr" href="..." />
<link rel="alternate" hreflang="ru" href="..." />
<link rel="alternate" hreflang="de" href="..." />
<link rel="alternate" hreflang="x-default" href="..." />
```

**Статус:** [ ] PASS / [ ] FAIL

---

#### ✅ Проверка 2.4: Canonical URL
**Что проверить:**
- [ ] Canonical тег присутствует на всех страницах
- [ ] URL корректный

**Как проверить:**
```bash
npm run build
grep -r "canonical" dist/ | head -5
```

**Ожидаемый результат:**
```html
<link rel="canonical" href="https://hardwarelab.example.com/reviews/mac-mini-m4" />
```

**Статус:** [ ] PASS / [ ] FAIL

---

#### ✅ Проверка 2.5: JSON-LD Schema
**Что проверить:**
- [ ] `ProductSchema.astro` создан
- [ ] Schema добавлен на review страницы
- [ ] Schema валидируется в Google Rich Results Test

**Как проверить:**
```bash
# 1. Build
npm run build

# 2. Проверить наличие schema
grep -r "application/ld+json" dist/reviews/ | head -3

# 3. Валидация в Google Rich Results Test:
# https://search.google.com/test/rich-results
# Вставить URL или HTML код страницы
```

**Ожидаемый результат:**
```json
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Mac mini M4",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8"
  }
}
```

**Статус:** [ ] PASS / [ ] FAIL

---

### 🏗️ Build & Performance

#### ✅ Проверка 3.1: TypeScript Errors
**Что проверить:**
- [ ] Нет TypeScript ошибок

**Как проверить:**
```bash
npx astro check
```

**Ожидаемый результат:**
```
Result (x files):
- 0 errors
- 0 warnings
- 0 hints
```

**Статус:** [ ] PASS / [ ] FAIL

---

#### ✅ Проверка 3.2: Build Success
**Что проверить:**
- [ ] Build завершается без ошибок
- [ ] Все страницы генерируются

**Как проверить:**
```bash
npm run build
```

**Ожидаемый результат:**
```
✓ Completed in XXXms.
```

**Статус:** [ ] PASS / [ ] FAIL

---

#### ✅ Проверка 3.3: Lighthouse Score
**Что проверить:**
- [ ] Performance > 90
- [ ] Accessibility > 90
- [ ] Best Practices > 90
- [ ] SEO > 90

**Как проверить:**
```bash
# 1. Запустить preview
npm run preview

# 2. Открыть Chrome DevTools
# 3. Lighthouse → Generate Report
```

**Или использовать CLI:**
```bash
npm install -g lighthouse
lighthouse http://localhost:4321 --view
```

**Ожидаемый результат:**
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

**Статус:** [ ] PASS / [ ] FAIL

---

### 🌐 Cross-browser Testing

#### ✅ Проверка 4.1: Affiliate Links
**Что проверить:**
- [ ] Ссылки открываются в новой вкладке
- [ ] Ссылки ведут на Amazon с правильным tag
- [ ] Ссылки работают в Chrome/Firefox/Safari

**Как проверить:**
```bash
npm run preview
```

Открыть в браузерах:
1. Chrome: http://localhost:4321/reviews/mac-mini-m4
2. Firefox: http://localhost:4321/reviews/mac-mini-m4
3. Safari (если доступен)

Кликнуть на "Check Price on Amazon" (НЕ завершать покупку!)

**Ожидаемый результат:**
- Открывается новая вкладка
- URL содержит `?tag=YOURTAG-20`
- Страница Amazon загружается

**Статус:** [ ] PASS / [ ] FAIL

---

#### ✅ Проверка 4.2: Mobile Responsiveness
**Что проверить:**
- [ ] Disclosure виден на мобильных
- [ ] Affiliate кнопки кликабельны
- [ ] Текст читаем

**Как проверить:**
```bash
npm run preview
```

Chrome DevTools → Toggle Device Toolbar (Ctrl+Shift+M)

Проверить на:
- iPhone 12 Pro
- iPad
- Samsung Galaxy S20

**Ожидаемый результат:**
- Disclosure виден без прокрутки
- Кнопки не обрезаны
- Текст не перекрывается

**Статус:** [ ] PASS / [ ] FAIL

---

#### ✅ Проверка 4.3: Language Switcher
**Что проверить:**
- [ ] Переключение языков работает
- [ ] Контент переводится
- [ ] URL меняется корректно

**Как проверить:**
```bash
npm run preview
```

1. Открыть http://localhost:4321
2. Кликнуть на переключатель языка (EN → FR → RU → DE)
3. Проверить URL и контент

**Ожидаемый результат:**
- EN: `/`
- FR: `/fr/`
- RU: `/ru/`
- DE: `/de/`

**Статус:** [ ] PASS / [ ] FAIL

---

## 🛠️ Инструменты для проверки

### Online Tools
1. **Google Rich Results Test**
   https://search.google.com/test/rich-results

2. **Google Search Console**
   https://search.google.com/search-console

3. **Lighthouse**
   Chrome DevTools → Lighthouse

4. **W3C Validator**
   https://validator.w3.org/

### CLI Tools
```bash
# Lighthouse
npm install -g lighthouse
lighthouse http://localhost:4321 --view

# Broken Link Checker
npm install -g broken-link-checker
blc http://localhost:4321 -ro

# HTML Validator
npm install -g html-validator-cli
html-validator --file=dist/index.html
```

---

## 📊 Итоговый отчет

После выполнения всех проверок заполнить:

### Критические проблемы (блокируют деплой):
- [ ] Нет критических проблем

### Некритические проблемы (можно исправить позже):
- [ ] Список проблем...

### Рекомендации:
- [ ] Список рекомендаций...

---

## ✅ Критерии готовности к продакшн

Проект готов к деплою, если:

- [x] Все affiliate ссылки имеют правильные rel атрибуты
- [x] Реальный Amazon Tag установлен
- [x] Disclosure виден above the fold
- [x] sitemap.xml генерируется
- [x] robots.txt настроен
- [x] hreflang теги присутствуют
- [x] JSON-LD Schema валидируется
- [x] Нет TypeScript ошибок
- [x] Build проходит успешно
- [x] Lighthouse Score > 90

---

**Статус проекта:** [ ] READY FOR PRODUCTION / [ ] NEEDS FIXES

**Дата проверки:** ___________

**Проверил:** Debugger Agent
