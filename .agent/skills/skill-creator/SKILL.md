---
name: Skill Creator
description: A meta-skill for creating and maintaining other skills following Anthropic's skill specification.
---

# Skill Creator

This skill helps you create new skills that follow the standard structure defined by Anthropic.

## Anatomy of a Skill

A skill is a directory containing:

1. **`SKILL.md` (Required)**: Main instruction file with:
   - **YAML Frontmatter**: `name` and `description` fields
   - **Markdown Body**: Detailed instructions

2. **`scripts/` (Optional)**: Executable scripts for automation

3. **`references/` (Optional)**: Supporting documentation, examples, schemas

## Creating a New Skill

1. Create a directory: `.agent/skills/<skill-name>/`
2. Create `SKILL.md` with frontmatter:
   ```yaml
   ---
   name: Your Skill Name
   description: Brief description that helps the agent decide when to use this skill.
   ---
   ```
3. Add detailed instructions in the markdown body
4. Optionally add `scripts/` and `references/` folders

## Best Practices

- Keep `description` concise but specific (used for auto-triggering)
- Use clear section headers
- Include examples where helpful
- Reference external docs in `references/` folder
