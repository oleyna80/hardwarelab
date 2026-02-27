#!/usr/bin/env node
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const scriptPath = path.resolve('scripts/process-review-images.mjs');
const result = spawnSync(process.execPath, [scriptPath, ...process.argv.slice(2)], {
  stdio: 'inherit',
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
