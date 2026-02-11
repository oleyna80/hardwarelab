# KPI Framework (Canonical)

Статус: Active  
Владелец: Tech Lead / Founder  
Последнее обновление: 2026-02-08

---

## 1) North-Star KPI

1. `organic_sessions_month`
2. `affiliate_ctr`
3. `affiliate_conversion_rate`

Эти 3 метрики обязательны для ежемесячного отчета.

---

## 2) Metric Definitions

### `organic_sessions_month`
- Определение: число сессий из organic search за календарный месяц.
- Формула: `sum(organic sessions, month)`.
- Источник: GA4 / Search Console (внутренняя каноника GA4).
- Частота: weekly pulse + monthly final.

### `affiliate_ctr`
- Определение: доля сессий на money pages, где был клик по affiliate CTA.
- Формула: `affiliate_click_sessions / money_page_sessions`.
- Scope: review/comparison/buyer-guide страницы с affiliate-блоками.
- Источник: GA4 events (`affiliate_click`) + page grouping.

### `affiliate_conversion_rate`
- Определение: доля affiliate-кликов, приведших к заказам.
- Формула: `affiliate_orders / affiliate_clicks`.
- Источник: Amazon Associates reports.
- Примечание: атрибуция по данным Amazon, не GA4.

---

## 3) Supporting KPIs (Recommended)

1. `rpm_affiliate` = `affiliate_revenue / sessions * 1000`
2. `money_pages_share` = `money_page_sessions / all_sessions`
3. `content_freshness_90d` = `% материалов, обновленных <= 90 дней назад`
4. `serp_ctr` = `clicks / impressions` (по Search Console)
5. `top3_query_share` = `% приоритетных запросов в позициях 1-3`

---

## 4) Targets By Phase

### Phase A (до 2026-03-31)
- KPI-цели роста не primary; primary = качественный baseline tracking.
- Must-have:
  - event tracking для `affiliate_click` по позициям CTA;
  - единая monthly KPI выгрузка без пропусков;
  - сегментация money pages.

### Phase B+ (с 2026-04-01)
- Основной фокус: рост `affiliate_ctr`, затем `affiliate_conversion_rate`.
- SEO масштабируется без ухудшения конверсии.

---

## 5) Data Governance

1. Любая новая CTA-позиция должна иметь стабильный event label.
2. Любое изменение структуры страниц должно сохранять сопоставимость KPI по периодам.
3. Если формула KPI меняется — обнови этот файл и зафиксируй changelog внизу.

---

## 6) Reporting Cadence

1. Weekly pulse (коротко): traffic + CTR сигналы + аномалии.
2. Monthly review (обязательно): 3 north-star KPI + supporting metrics + actions.
3. Quarterly review: связь KPI с roadmap-фазами и перераспределение приоритетов.

---

## Changelog

### 2026-02-08
- Создан каноничный KPI framework.
- Зафиксированы формулы, источники и cadence.
