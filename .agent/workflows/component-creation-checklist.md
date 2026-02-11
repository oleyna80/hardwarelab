---
description: Step-by-step checklist for creating UI components
---

# Component Creation Workflow
## Step 1: Research (5 min)
1. Search for similar components: `rg "ComponentName" src/components/`
2. Check `.memory_bank/ui_extension/components/README.md` for existing alternatives
3. Review component-development.md guidelines
## Step 2: Create Component (15 min)
1. Determine type (Astro vs React)
2. Create file in src/components/ui/[Name].astro
3. Define Props interface
4. Implement with dark mode support
5. Add responsive classes
## Step 3: Test (10 min)
1. Import in test page
2. Test in light/dark mode
3. Test on mobile (DevTools)
4. Check accessibility (axe DevTools)
## Step 4: Document (5 min)
1. Add to `.memory_bank/ui_extension/components/README.md`
2. Add usage example
3. Capture screenshot
Total time: ~35 min
