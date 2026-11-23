#!/usr/bin/env node
// Structure check for the documentation (ADR-0002, ADR-0009).
// - Every page lives in one of the audience folders and has front matter with title and 1-5 tags.
// - Pages do not use a level-one heading; the title comes from front matter.
// - ADRs have the MADR metadata and sections and are listed in the decision index.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, basename, sep } from 'node:path';

const root = process.cwd();
const docsDir = join(root, 'docs');
const audiences = ['user', 'domain', 'development', 'architecture', 'operations'];
const generated = new Set([join('docs', 'development', 'reference', 'api.md')]);
const adrDir = join('docs', 'architecture', 'decisions');
const adrSections = ['## Context and Problem Statement', '## Decision Outcome', '### Consequences', '### Confirmation'];
const adrStatus = /^(proposed|accepted|rejected|deprecated|superseded by ADR-\d{4})$/;

const errors = [];
const fail = (file, message) => errors.push(`${file.split(sep).join('/')}: ${message}`);

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : path.endsWith('.md') ? [path] : [];
  });
}

function frontMatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^([\w-]+):\s*(.*)$/);
    if (!kv) continue;
    let value = kv[2].trim();
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map((v) => v.trim()).filter(Boolean);
    } else {
      value = value.replace(/^["']|["']$/g, '');
    }
    data[kv[1]] = value;
  }
  return data;
}

function hasLevelOneHeading(text) {
  let inFence = false;
  for (const line of text.split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    if (!inFence && /^# /.test(line)) return true;
  }
  return false;
}

const files = walk(docsDir).map((f) => relative(root, f)).filter((f) => !generated.has(f));
const adrIndex = readFileSync(join(root, adrDir, 'index.md'), 'utf8');

for (const file of files) {
  const text = readFileSync(join(root, file), 'utf8');
  const parts = file.split(sep);
  if (parts.length > 2 && !audiences.includes(parts[1])) {
    fail(file, `page is outside the audience folders (${audiences.join(', ')})`);
  }

  const fm = frontMatter(text);
  if (!fm) {
    fail(file, 'missing front matter');
    continue;
  }
  if (!fm.title) fail(file, 'front matter needs a title');
  if (!Array.isArray(fm.tags) || fm.tags.length < 1 || fm.tags.length > 5) {
    fail(file, 'front matter needs 1 to 5 tags, for example tags: [operations, runbook]');
  }
  if (hasLevelOneHeading(text)) fail(file, 'remove the level-one heading; the title comes from front matter');

  const name = basename(file);
  const adr = name.match(/^(\d{4})-.+\.md$/);
  if (file.startsWith(adrDir) && adr) {
    if (!adrStatus.test(fm.status ?? '')) fail(file, `ADR status "${fm.status ?? ''}" is invalid`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fm.date ?? '')) fail(file, 'ADR needs a date in the form YYYY-MM-DD');
    if (!fm['decision-makers']) fail(file, 'ADR needs decision-makers');
    if (!(fm.title ?? '').startsWith(`ADR-${adr[1]}:`)) fail(file, `ADR title must start with "ADR-${adr[1]}:"`);
    for (const section of adrSections) {
      if (!text.includes(`\n${section}\n`)) fail(file, `ADR is missing the section "${section}"`);
    }
    if (!adrIndex.includes(`(${name})`)) fail(file, 'ADR is not listed in decisions/index.md');
  }
}

if (errors.length) {
  console.error(`Documentation structure check failed with ${errors.length} problem(s):\n`);
  for (const e of errors) console.error(`  ✖ ${e}`);
  process.exit(1);
}
console.log(`Documentation structure check passed for ${files.length} pages.`);
