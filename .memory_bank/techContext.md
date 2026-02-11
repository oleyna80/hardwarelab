# Tech Context

Технический стек, окружение и критические ограничения инфраструктуры.

---

## Production Environment

### VPS Constraints

| Resource | Limit | Notes |
|----------|-------|-------|
| CPU | 1 vCPU | Single-threaded performance critical |
| RAM | 512 MB | Hard limit in docker-compose |
| Storage | SSD | — |
| Network | Shared | — |

### Docker Configuration

```yaml
# docker-compose.yml
services:
  web:
    image: hardwarelab-site:latest
    ports:
      - "8081:80"
    deploy:
      resources:
        limits:
          memory: 512M
```

### Reverse Proxy

- **Nginx Proxy Manager** перед контейнером
- SSL через Let's Encrypt
- Внешний порт: 443 → внутренний: 8081

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
├── docker-compose.yml      # Production config
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
| Локализованные | `src/pages/{fr,ru,de}/index.astro` |
| Обзоры | `src/pages/reviews/[...slug].astro` |
| Категории | `src/pages/categories/[category].astro` |

### CI/CD и инфраструктура

| Файл | Назначение |
|------|------------|
| `Dockerfile` | Multi-stage: Node build → Nginx serve |
| `docker-compose.yml` | Production deployment (port 8081) |
| `playwright.config.ts` | E2E test config |
| `.env` / `.env.example` | Environment variables |

#### CI/CD Status

| CI System | Status |
|-----------|--------|
| GitLab CI | ❌ Не настроен |
| GitHub Actions | ❌ Не настроен |
| **Manual Docker** | ✅ Используется |

#### Current Deployment Workflow

```
1. npm run build          # Build static site
2. docker compose build   # Build Docker image
3. docker compose up -d   # Deploy to production
```

#### Recommended CI/CD (TODO)

- [ ] Добавить GitHub Actions для автоматического деплоя
- [ ] Добавить Lighthouse CI для проверки performance

---

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Astro | 5.16.6 |
| Styling | Tailwind CSS | 3.3.x |
| Content | MDX | @astrojs/mdx |
| Language | TypeScript | 5.x |
| Images | Sharp | 0.33.x |
| Build | Static (SSG) | — |

---

## Development Environment

- **OS**: WSL2 (Ubuntu) → Production: Debian/Ubuntu
- **Node**: ≥18.0.0
- **Dev server**: `localhost:4321`
- **IDE**: VS Code with Astro extension

---

## Migration Status

| Phase | Status |
|-------|--------|
| WSL development | ✅ Complete |
| Docker containerization | ✅ Complete |
| Production deployment (VPS) | 🔄 In progress (target: 2026-03-31) |
| Reverse proxy + SSL | 🔄 In progress (Phase A) |

---

## Critical Notes

> [!WARNING]
> **512MB RAM limit** — избегай тяжелых build-time операций. Используй статическую генерацию, не SSR.

> [!IMPORTANT]
> Все изменения CI/CD должны отражаться в этом файле и в `systemPatterns.md`.

---

## Связанные документы

→ [projectbrief.md](projectbrief.md) — цели и рамки проекта  
→ [systemPatterns.md](systemPatterns.md) — архитектура компонентов
