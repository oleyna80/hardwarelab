---
name: webapp-testing
description: Toolkit for interacting with and testing local web applications using Playwright. Supports verifying frontend functionality, debugging UI behavior, capturing browser screenshots, and viewing browser logs.
---

# Web Application Testing

Use Playwright with the current repo toolchain (Node + `@playwright/test`).

## When to Use
- UI smoke checks after feature work.
- Debugging visual regressions or broken interactions.
- Reproducing user-reported frontend bugs with deterministic steps.

## Decision Tree: Choosing Your Approach

```
User task → Is it static HTML?
    ├─ Yes → Inspect HTML and identify selectors
    │         ├─ Success → Write Playwright test/spec with stable selectors
    │         └─ Fails/Incomplete → Treat as dynamic (below)
    │
    └─ No (dynamic webapp) → Is the server already running?
        ├─ No → Start app server (`npm run dev` or `npm run preview`)
        │        Then run Playwright checks
        │
        └─ Yes → Reconnaissance-then-action:
            1. Navigate and wait for networkidle
            2. Take screenshot or inspect DOM
            3. Identify selectors from rendered state
            4. Execute actions with discovered selectors
```

## Repo Commands
```bash
# Run existing E2E suite
npm run test:e2e

# Run a single Playwright spec
npx playwright test tests/<file>.spec.ts

# Open Playwright inspector for debugging
npx playwright test --debug tests/<file>.spec.ts

# Generate selectors quickly (manual assist)
npx playwright codegen http://localhost:4321
```

## Reconnaissance-Then-Action Pattern

1. **Inspect rendered DOM**:
   ```ts
   await page.goto("http://localhost:4321");
   await page.waitForLoadState("networkidle");
   await page.screenshot({ path: "tmp/inspect.png", fullPage: true });
   ```

2. **Identify selectors** from inspection results

3. **Execute actions** using discovered selectors

## Common Pitfall

❌ **Don't** inspect the DOM before waiting for `networkidle` on dynamic apps
✅ **Do** wait for `page.waitForLoadState("networkidle")` before inspection

## Best Practices

- Prefer role-based selectors (`getByRole`) and visible text over fragile CSS chains.
- Keep tests deterministic: fixed viewport, explicit waits, no random delays.
- Capture screenshots on failures for quick triage.
- When adding new UI behavior, add or update one Playwright spec in `tests/`.
