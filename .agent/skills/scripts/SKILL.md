---
name: Agent Scripts
description: Collection of utility scripts for agent automation, linting, and maintenance tasks.
---

# Agent Scripts

This directory contains utility scripts used by agents and CI/CD pipelines to maintain the codebase, enforce rules, and automate tasks.

## Scripts Overview

### Linting & Validation
- `lint-agent-docs.mjs`: Validates agent documentation (links, structure).
- `lint-agent-roles.mjs`: Validates role definitions.
- `lint-agent-skills.mjs`: Validates skill definitions.
- `check-affiliate-links.js`: Enforces Amazon affiliate compliance (tags, rel attributes).
- `check-researcher-output.mjs`: Validates researcher artifacts.
- `check-review-package.mjs`: Validates review content packages.

### Automation
- `bootstrap-review.mjs`: Scaffolds new review directories and files.
- `copy-assets-to-translations.mjs`: Syncs assets from EN to other locales.
- `optimize-images.mjs`: Optimizes images (resize, webp conversion).
- `suggest-slug.mjs`: Generates SEO-friendly slugs.
- `update-existing-reviews.mjs`: Updates the internal linking registry.

## Usage

Most scripts are executed via `npm run <script-name>` defined in `package.json`.
See individual script files for specific usage arguments.
