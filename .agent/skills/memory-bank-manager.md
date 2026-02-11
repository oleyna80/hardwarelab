---
name: Memory Bank Manager
description: Maintain project documentation integrity in .memory_bank/ including activeContext.md and systemPatterns.md updates.
---

# Memory Bank Management

**Objective:** Maintain the integrity of the project's documentation system (`.memory_bank/`).

## Protocols

### 1. Updating `activeContext.md`
- **When:** At the start and end of every session.
- **What:**
  - **Current Focus:** What exactly are we building NOW?
  - **Recent Changes:** What files were touched in the last step?
  - **Active User Context:** Any specific preferences user mentioned recently.

### 2. Maintaining `systemPatterns.md`
- **Trigger:** Whenever a new architectural decision is made (e.g., "We will use Tailwind for everything").
- **Action:** Record the pattern immediately.
- **Rule:** If code contradicts `systemPatterns.md`, the code is wrong.

### 3. The "No-Rot" Rule
- Old/Finished tasks in `progress.md` should be marked clearly or archived.
- Do not let `activeContext.md` grow indefinitely; prune outdated context.

## Checklist for Review
Before approving any task completion, verify that the Coder has updated the relevant documentation.