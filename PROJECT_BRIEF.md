# HardwareLab — Project Brief

- **Repository identity:** `oleyna80/hardwarelab`
- **Initialization:** INITIALIZED
- **Product:** Multilingual hardware review and Amazon affiliate website, hardwarelab.org.
- **Users:** Readers researching computer hardware in English, French, Russian and German.
- **Purpose:** Publish accessible, accurate hardware reviews, localized category pages and compliant affiliate links.
- **Application baseline:** Derived from HardwareLab `main` commit `72ada873d66d19de2609515b443766065fe132c9` without changing product source, tests or dependencies.
- **Stack:** Astro, TypeScript, MDX, Tailwind CSS, Node.js 22 (CI/Docker), GitHub Actions, Docker SSR; exact versions are in `package.json`.
- **Source:** `src/` pages, components, content, layouts and utils; `public/` assets; `tests/` suites.
- **Content tools:** `scripts/`, `scripts/app-checks/` (previously part of legacy `.agent/skills/scripts/`), active `prompts/`.
- **Quality:** `npm ci`, `npm run lint`, `npm run check:types`, `npm run build`, `npm run check:affiliate`, `npm run lint:images`, `npm run test:e2e`. CI results are evidence only after actual execution.
- **Deployment:** Existing GitHub Actions → GHCR → VPS. Automated publish/deploy are scoped to `main`; manual workflows require explicit Owner approval.
- **Data and security:** Do not commit private env files, customer data, VPS credentials, GitHub tokens or privileged material. Repository documents/hooks are not OS isolation.
- **Execution harness:** Codex locally. Single authoritative Agentic SDLC Lite root contract at `AGENTS.md`.
- **Adoption authorization:** Owner explicitly requested a clean experimental branch that replaces the entire old agent architecture while preserving application behavior. This setup does NOT authorize merge, deploy or Astro/Tailwind upgrades.
- **Legacy archive:** Old agents, Skills and memory exist at historical commit `72ada873d66d19de2609515b443766065fe132c9` and are reference-only, not operating instructions; before merging create a durable archive ref if needed.
- **Status:** Initial branch structure prepared for review; native Codex and actual CI/test results must be verified against the final commit.
