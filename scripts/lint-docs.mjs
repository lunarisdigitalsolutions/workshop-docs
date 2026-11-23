#!/usr/bin/env node
// Runs all local documentation checks and reports every failure at once, instead of stopping at the first.
import { spawnSync } from 'node:child_process';

const checks = [
  ['Markdown (markdownlint)', 'npm run --silent lint:md'],
  ['Spelling (cspell)', 'npm run --silent lint:spelling'],
  ['Structure and ADRs', 'npm run --silent lint:structure'],
];

const results = checks.map(([name, command]) => {
  console.log(`\n▶ ${name}`);
  const { status } = spawnSync(command, { stdio: 'inherit', shell: true });
  return { name, ok: status === 0 };
});

console.log('\nSummary');
for (const { name, ok } of results) console.log(`  ${ok ? '✔' : '✖'} ${name}`);
process.exit(results.every((r) => r.ok) ? 0 : 1);
