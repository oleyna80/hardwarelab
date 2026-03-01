# Tech Context

Технический стек, окружение и критические ограничения инфраструктуры.

> Last validated: 2026-03-01

---

## Production Environment

### VPS Constraints

| Resource | Limit | Notes |
|----------|-------|-------|
| CPU | 2 vCPU | Production VPS |
| RAM | 2 GB total | Shared with infra containers |
| Storage | SSD | — |
| OS | Ubuntu 24.04 LTS | Kernel 6.8.0 |
| Node.js | v20.20.0 (LTS Iron) via nvm | `.nvmrc` locked to `20` |

### Docker Network Topology

```
Internet → Cloudflare → VPS :443/:80
                              │
                        [npm-app-1]  ← Nginx Proxy Manager (npm_default network)
                         172.18.0.3
                              │
                    proxy → hardwarelab-web (by hostname)
                              │
                   [hardwarelab-site-web-1]  ← nginx:1.27-alpine
                         172.18.0.4          (npm_default + hardwarelab-site_default)
                         host: not published (internal-only)
                              │
                   [hardwarelab-site-app-1]  ← Astro SSR
                         172.19.0.x          (hardwarelab-site_default only)
                         internal: 4321

                   [n8n]  ← n8n.hardwarelab.org
                    172.18.0.2 (npm_default)
                    host: 127.0.0.1:5678 only
```

### Docker Networks

| Network | Containers | External |
|---------|------------|----------|
| `npm_default` | npm-app-1, n8n, **hardwarelab-site-web-1** | yes (external) |
| `hardwarelab-site_default` | hardwarelab-site-app-1, hardwarelab-site-web-1 | no (internal) |
| `n8n_default` | n8n | no (internal) |

> **CRITICAL:** `hardwarelab-site-web-1` MUST be in `npm_default` network.
> If the container is recreated without this network, Nginx Proxy Manager cannot resolve `hardwarelab-web` → **502 Bad Gateway**.
> The fix: `docker network connect npm_default hardwarelab-site-web-1 --alias hardwarelab-web`

### Port Map

| Port | Container | Protocol | Notes |
|------|-----------|----------|-------|
| 80, 443 | npm-app-1 | HTTP/HTTPS | Public — Nginx Proxy Manager |
| 81 | npm-app-1 | HTTP | NPM admin UI (internal) |
| 80 (internal) | hardwarelab-site-web-1 | HTTP | Internal-only in Docker networks; no host port publish in current `docker-compose.vps.yml` |
| 4321 | hardwarelab-site-app-1 | HTTP | Internal only (Astro SSR) |
| 127.0.0.1:5678 | n8n | HTTP | n8n webhooks (localhost only) |

### Reverse Proxy

- **Nginx Proxy Manager** (`npm-app-1`) — точка входа для всего трафика
- SSL через Let's Encrypt (auto-renew каждый час)
- Маршрут: Cloudflare → NPM :443 → `hardwarelab-web`:80 → Astro app :4321

---

## Структура репозитория

```
hardwarelab/
├── src/                    # Исходный код приложения
│   ├── pages/              # Runtime точки входа (маршруты)
│   ├── components/         # UI/Layout компоненты
│   ├── content/            # MDX контент (обзоры)
│   ├── layouts/            # Шаблоны страниц
│   └── utils/              # Хелперы (i18n, форматтеры)
│
├── public/                 # Статика (images, robots.txt)
├── dist/                   # Build output (не коммитить)
│
├── .memory_bank/           # Документация проекта
├── .agent/workflows/       # AI workflows
│
├── Dockerfile              # Multi-stage build
├── docker-compose.yml      # Local development compose
├── astro.config.mjs        # Astro конфигурация
├── tailwind.config.mjs     # Tailwind конфигурация
│
├── tests/                  # E2E тесты (Playwright)
└── scripts/                # Утилиты (affiliate check)
```

### Ключевые runtime-точки входа

| Точка входа | Путь |
|-------------|------|
| Главная EN | `src/pages/index.astro` |
| Локализованные | `src/pages/{fr,ru,de,es,it}/index.astro` |
| Обзоры | `src/pages/reviews/[...slug].astro` |
| Категории | `src/pages/categories/[category].astro` |

### CI/CD и инфраструктура

| Файл | Назначение |
|------|------------|
| `Dockerfile` | Multi-stage: Node build → Node SSR runtime (`:4321`) |
| `docker-compose.yml` | **Только для локальной разработки** (нет npm_default) |
| `docker-compose.vps.yml` | **Production VPS** — содержит npm_default network |
| `deploy.sh` | **Скрипт деплоя на VPS** — всегда использовать этот |
| `.github/workflows/ci.yml` | CI checks (lint/types/build/affiliate/e2e) |
| `.github/workflows/docker-publish.yml` | Triggered after CI success; publishes immutable `sha-*` image to GHCR |
| `.github/workflows/deploy-vps.yml` | Triggered after Docker Publish success (manual fallback available) |
| `.github/workflows/uptime-monitor.yml` | Scheduled uptime monitor + issue/webhook alerts + failure artifacts |
| `playwright.config.ts` | E2E test config |
| `.env` / `.env.example` | Environment variables |

#### CI/CD Status

| CI System | Status |
|-----------|--------|
| GitLab CI | ❌ Не используется |
| GitHub Actions | ✅ Настроен (CI + Docker Publish + Deploy to VPS + Uptime Monitor) |
| **Direct VPS Deploy** | ✅ Текущий рабочий режим |

#### Current Deployment Workflow (Immutable SSR)

```bash
# Primary path: GitHub Actions
CI -> Docker Publish -> Deploy to VPS

# Manual fallback on VPS (only immutable SHA tag):
cd /home/dmitrii/projects/hardwarelab-site
./deploy.sh sha-<commit-sha>
```

Скрипт `deploy.sh` выполняет:
1. `docker compose -f docker-compose.vps.yml pull`
2. `docker compose -f docker-compose.vps.yml up -d --remove-orphans`
3. `docker image prune -f`

Known-good deploy SHA (2026-03-01):
- `15e95e1d8c6f7630125babc0f5ad4521e63249c2`

#### GitHub Actions Baseline (Configured)

- [x] CI workflow для проверок качества
- [x] Docker Publish workflow для GHCR
- [x] Deploy workflow для VPS
- [x] Uptime Monitor workflow (5-min probes + issue/webhook alert path)
- [x] Uptime Monitor supports synthetic webhook validation mode (`workflow_dispatch: alert_test_mode=true`)
- [x] Lighthouse CI workflow job для baseline performance guard (initial threshold >= 50, target >= 90 pending)

---

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Astro | 5.17.3 |
| Styling | Tailwind CSS | 3.3.x |
| Content | MDX | @astrojs/mdx |
| Language | TypeScript | 5.x |
| Images | Sharp | 0.33.x |
| Runtime Mode | SSR (`@astrojs/node`) | Adapter mode: standalone |

---

## Development Environment

- **OS**: WSL2 (Ubuntu) for development; VPS Ubuntu 24.04 for production
- **Node**: v20.20.0 (nvm, `.nvmrc` → `20`)
- **Local dev server**: `npm run dev` (port `4321`)
- **IDE**: VS Code with Astro extension

---

## Migration Status

| Phase | Status |
|-------|--------|
| WSL development | ✅ Complete |
| Docker containerization | ✅ Complete |
| Production deployment (VPS) | ✅ Complete |
| Reverse proxy + SSL | ✅ Complete |

---

## 🚨 Agent Safety Rules (MUST READ)

> [!CAUTION]
> **НЕ запускай `npm run build` или `docker compose up --build` прямо на VPS.**
> Сборка образа на VPS занимает всю RAM и может положить живой сайт.
> Образы собираются только в GitHub Actions (CI) и публикуются в GHCR.
> На VPS деплоится **только готовый образ** через `./deploy.sh`.

> [!CAUTION]
> **НЕ используй `docker-compose.yml` на VPS.**
> Этот файл не содержит `npm_default` сеть → после `up` сайт упадёт с 502.
> Всегда используй `docker-compose.vps.yml` (через `./deploy.sh`).

> [!WARNING]
> **RAM limit: app ≤384M, web ≤128M** — избегай тяжелых операций в рантайме.

> [!IMPORTANT]
> Все изменения CI/CD и сетевой топологии должны отражаться в этом файле.

---

## Связанные документы

→ [projectbrief.md](projectbrief.md) — цели и рамки проекта  
→ [systemPatterns.md](systemPatterns.md) — архитектура компонентов
