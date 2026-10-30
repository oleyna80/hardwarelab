# HardwareLab — Project Map (navigation, not authority)

| Need | Canonical location |
| --- | --- |
| Root engineering contract | `AGENTS.md` |
| Project purpose and identity | `PROJECT_BRIEF.md` |
| Source, pages and content | `src/` |
| Static assets | `public/` |
| Browser/unit tests | `tests/`, `src/**/*.test.ts` |
| Dependencies and Astro/Docker config | `package.json`, `package-lock.json`, `astro.config.mjs`, `Dockerfile` |
| Content creation | `COPYWRITER_GUIDE.md`, `prompts/`, `scripts/review-*.mjs` |
| Application validators | `scripts/app-checks/` |
| Application CI | `.github/workflows/ci.yml` |
| Lite structural CI | `.github/workflows/lite-checks.yml` |
| Production-only publishing/deployment | `.github/workflows/docker-publish.yml`, `.github/workflows/deploy-vps.yml` |
| Monitoring | `.github/workflows/uptime-monitor.yml` |
| Deployment and ops runbooks | `docs/deployment/`, `docs/operations/` |
| Canonical Lite development lifecycle | `docs/workflow/development.md` |
| First-use initialization | `docs/workflow/initialization.md` |
| Memory and recovery | `docs/workflow/memory.md`, `memory_bank/` |
| Security and boundaries | `docs/security/boundaries.md` |
| Roles and templates | `.agents/roles/`, `docs/templates/` |
| Project Spec/P for new significant work | `docs/projects/<project-id>/spec.md`, `plan.md` |
| Stage W, task handoffs and independent reports | `docs/changes/<task-id>/` |
| Initialization handoff | `docs/changes/sdlc-lite-adoption/handoff.md` |
| Read-only historical agent memory | `git show 72ada873d66d19de2609515b443766065fe132c9:.memory_bank/activeContext.md` |

Old source-template and historical HardwareLab task reports do not grant runtime or Owner authorization. No fallback to latest P or old governance.
