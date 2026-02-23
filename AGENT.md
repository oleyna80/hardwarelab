# HardwareLab — Agent Instructions

> Canonical source: `.agent/AGENT_CONTRACT.md`
> Last validated: 2026-02-23

---

## 🎯 Project Identity

**HardwareLab** is an Amazon Affiliate hardware review site built with Astro v5.  
Live: https://hardwarelab.org | Dev: `http://localhost:4321`

**Design aesthetic:** Clean minimalist tech ("Linear-style") with subtle Cyberpunk accents — dark mode, glow effects.

---

## ⚡ Start Here (Every Session)

Read in this order before ANY work:

1. `.memory_bank/activeContext.md` — current phase, recent changes, priorities
2. `.memory_bank/agents.md` — agent hierarchy and file rules
3. `.agent/workflows/task-routing.md` — pick the correct role for your task
4. `.agent/roles/_COMMON_RULES.md` — mandatory rules that apply to all roles

If docs conflict with code → **code wins**. Update the docs.

---

## 🏗️ Tech Stack

| Component | Detail |
|-----------|--------|
| Framework | Astro v5 (server-first, static output) |
| Interactivity | React (islands only — toggles, sliders) |
| Styling | Tailwind CSS 3.x (mobile-first, dark-mode-first) |
| Language | TypeScript (strict mode) |
| Content | MDX via Astro Content Collections |
| Package manager | npm |
| Locales | EN (default), FR, DE, RU |
| Deployment | Docker → VPS (nginx), CI via GitHub Actions |

---

## 📁 Directory Map

```
src/
├── pages/           # File-based routing
│   ├── index.astro  # EN homepage
│   ├── fr/ de/ ru/  # Localized homepages + reviews
│   ├── reviews/     # EN review pages
│   ├── builds/      # Build guides
│   └── categories/  # Category listing
├── layouts/         # Layout.astro (global wrapper)
├── components/
│   ├── layout/      # Header, Footer, Hero
│   ├── ui/          # Buttons, Cards, Badges
│   └── head/        # SEO.astro, Analytics.astro
├── content/
│   └── reviews/     # MDX reviews organized by locale
│       ├── en/
│       ├── fr/
│       ├── de/
│       └── ru/
├── utils/           # i18n.ts, formatters, helpers
└── types/           # Shared TypeScript types

.agent/              # Agent configuration
├── AGENT_CONTRACT.md
├── roles/           # Role definitions
├── workflows/       # Workflow docs
├── skills/          # Specialized skill packs
├── templates/       # Task shell templates
└── reports/         # Agent output reports

.memory_bank/        # Project knowledge base (persistent context)
```

---

## 👥 Active Agent Team

```
Content pipeline:   single-researcher → researcher → translator → qa
Engineering lane:   tech-lead → coder → tech-lead/human review
```

| Role | File | Responsibility |
|------|------|----------------|
| `tech-lead` | `.agent/roles/tech-lead.md` | Architecture, planning, code review |
| `coder` | `.agent/roles/coder.md` | Implementation |
| `single-researcher` | `.agent/roles/single-researcher.md` | External product research (PASS A) |
| `researcher` | `.agent/roles/researcher.md` | EN review writing + visual assets |
| `translator` | `.agent/roles/translator.md` | FR / DE / RU translations |
| `qa` | `.agent/roles/qa.md` | Final content + compliance gate |

**Illustrations owner:** `researcher` — generates `image.webp` and `og.png` using the `visual-asset-generator` skill.

---

## 🗺️ Task Routing

| Task | Lane | Key Role |
|------|------|----------|
| New review | Content | `single-researcher` |
| EN review writing | Content | `researcher` |
| Translation | Content | `translator` |
| Final content QA | Content | `qa` |
| Feature / bug fix | Engineering | `tech-lead` → `coder` |
| VPS deploy / release | Engineering | `tech-lead` |
| Affiliate compliance | Engineering | `qa` or `tech-lead` |
| Agent docs governance | Engineering | `tech-lead` |

Full matrix: `.agent/workflows/task-routing.md`

---

## 📐 Coding Standards

### TypeScript & Astro
- Always define `interface Props` in Astro components — no `any`
- Use `@/` path alias where available
- Do **not** use `key={index}` in `.astro` files
- i18n helper: `src/utils/i18n.ts`

### Tailwind
- Colors: `zinc` for grays, `indigo`/`cyan` for accents
- Always implement dark mode: `bg-white dark:bg-zinc-900`
- Use `class:list` for conditional classes

### Content Collections
- Use `getCollection()` from `astro:content`
- Filter by locale: `id.startsWith('en/')`
- Schema source of truth: `src/content/config.ts`

### Affiliate
- Amazon tags config: `src/config.ts`
- Affiliate button: `src/components/ui/AffiliateButton.astro`
- All links must have `rel="nofollow sponsored"`
- Disclosure must be visible on every review page
- `asin` required; `amazonUrl` optional (OneLink / `amzn.to` preferred)

### Review assets naming
- Hero image: `image.webp` (1200×675, 16:9)
- Social image: `og.png` (1200×630, 1.91:1)
- If the generator outputs square assets, resize via `contain` with off‑white background `#F8F7F5`.

---

## ✅ Required Gates

### After any code change
```bash
npx astro check          # TypeScript errors
npm run lint:agent-docs  # Broken links in .agent/ docs
npm run lint:agent-roles # Role file integrity
npm run lint:agent-skills # Skill frontmatter integrity
```

### Before content release
```bash
npm run check:review-package -- <slug>
npm run build
npm run check:affiliate
# then follow: .agent/workflows/prepublish-affiliate-gate.md
```

### Full CI gate
```bash
npm run check:ci         # lint + types + build + affiliate + e2e
```

---

## 📂 Source of Truth Matrix

| Domain | Canonical File |
|--------|----------------|
| Current priorities | `.memory_bank/activeContext.md` |
| Strategic roadmap | `.memory_bank/roadmap.md` |
| KPI definitions | `.memory_bank/kpi-framework.md` |
| Project milestones | `.memory_bank/progress.md` |
| Engineering standards | `.agent/workflows/AGENT_GUIDELINES.md` |
| Task routing | `.agent/workflows/task-routing.md` |
| Affiliate pre-publish gate | `.agent/workflows/prepublish-affiliate-gate.md` |
| Role protocol | `.agent/roles/_COMMON_RULES.md` |
| Content schema (Zod) | `src/content/config.ts` |
| Affiliate routing/tags | `src/config.ts` |

---

## 📝 Post-Task Requirements

After any **significant** task (new feature, new component, architecture change, audit):

1. **Update** `.memory_bank/activeContext.md` → "What Just Happened" section
2. **Update** `.memory_bank/progress.md` if a milestone was completed
3. **Save report** to `.agent/reports/<role>/<YYYY-MM-DD>-<slug>-<type>.md`

---

## 🗣️ Language Protocol

| Output type | Language |
|-------------|----------|
| Plans, reports, checklists, commit messages | **English** |
| Chat responses to the user | **Russian** |

---

## 🔧 Quick Fixes

```bash
# Clear Astro cache and restart
rm -rf .astro/ && npm run dev

# TypeScript check
npx astro check

# Full reset
rm -rf node_modules/ .astro/ && npm install
```

Common errors → `.agent/workflows/troubleshooting.md`
