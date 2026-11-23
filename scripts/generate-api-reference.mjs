#!/usr/bin/env node
// Generates docs/development/reference/api.md from src/WebApi/openapi.json.
// The generated page is not committed: the contract is the single source (ADR-0009, "generate what can be generated").
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const root = process.cwd();
const spec = JSON.parse(readFileSync(join(root, 'src', 'WebApi', 'openapi.json'), 'utf8'));
const target = join(root, 'docs', 'development', 'reference', 'api.md');

const ref = (schema) => (schema?.$ref ? schema.$ref.split('/').pop() : null);
const typeOf = (schema = {}) => {
  if (schema.$ref) return `[${ref(schema)}](#${ref(schema).toLowerCase()})`;
  if (schema.type === 'array') return `${typeOf(schema.items)}[]`;
  if (schema.enum) return `${schema.type}: ${schema.enum.map((v) => `\`${v}\``).join(', ')}`;
  return schema.format ? `${schema.type} (${schema.format})` : schema.type ?? 'object';
};
const cell = (text = '') => String(text).replace(/\|/g, '\\|').replace(/\n/g, ' ');

const out = [];
out.push('---', 'title: API reference', 'sidebar_position: 1', 'tags: [development, api, reference]', '---', '');
out.push(`<!-- Generated from src/WebApi/openapi.json by scripts/generate-api-reference.mjs. Do not edit. -->`, '');
out.push(`${spec.info.description}`, '');
out.push(`**Version:** ${spec.info.version} · **Base URL:** \`${spec.servers?.[0]?.url ?? ''}\``, '');

for (const tag of spec.tags ?? []) {
  out.push(`## ${tag.name}`, '', tag.description ?? '', '');
  for (const [path, methods] of Object.entries(spec.paths)) {
    for (const [method, op] of Object.entries(methods)) {
      if (!op.tags?.includes(tag.name)) continue;
      out.push(`### ${op.summary}`, '', `\`${method.toUpperCase()} ${path}\``, '');
      if (op.description) out.push(op.description, '');
      if (op.parameters?.length) {
        out.push('| Parameter | In | Required | Type | Description |', '| --- | --- | --- | --- | --- |');
        for (const p of op.parameters) {
          out.push(`| \`${p.name}\` | ${p.in} | ${p.required ? 'yes' : 'no'} | ${typeOf(p.schema)} | ${cell(p.description)} |`);
        }
        out.push('');
      }
      const body = op.requestBody?.content?.['application/json']?.schema;
      if (body) out.push(`**Request body:** ${typeOf(body)}`, '');
      out.push('| Status | Description | Body |', '| --- | --- | --- |');
      for (const [status, res] of Object.entries(op.responses)) {
        const schema = res.content?.['application/json']?.schema;
        out.push(`| ${status} | ${cell(res.description)} | ${schema ? typeOf(schema) : '–'} |`);
      }
      out.push('');
    }
  }
}

out.push('## Schemas', '');
for (const [name, schema] of Object.entries(spec.components?.schemas ?? {})) {
  out.push(`### ${name}`, '', '| Property | Type | Required | Description |', '| --- | --- | --- | --- |');
  for (const [prop, def] of Object.entries(schema.properties ?? {})) {
    const required = schema.required?.includes(prop) ? 'yes' : 'no';
    out.push(`| \`${prop}\` | ${typeOf(def)} | ${required} | ${cell(def.description)} |`);
  }
  out.push('');
}

mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, out.join('\n'));
console.log(`Generated ${target.replace(root + '/', '')} from src/WebApi/openapi.json`);
