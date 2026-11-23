# Pizza Luna – Documentation as Code Demo

<!-- cspell:ignore gehört wohin finde wieder -->

Demo repository for the talk **"Documentation as Code – Was gehört wohin und wie finde ich es wieder?"**.

It documents *Pizza Luna*, a fictional pizza chain with three branches. The platform – an Angular
frontend, a .NET ordering API on Azure App Service and an order-processing Azure Function behind a
Service Bus queue – exists only on paper: **this repository contains documentation, not code.**

👉 **Presenting?** Start with the [demo guide](DEMO.md).

## Structure

```text
docs/                 Markdown documentation, one folder per audience
  user/               How do I use it?            customers and branch staff
  domain/             Why does it exist?          glossary, business rules, models
  development/        How does it work?           guidelines, how-tos, process, generated reference
  architecture/       Why was it built this way?  views, decisions (MADR), quality
  operations/         What do I do when it breaks? deployment, monitoring, runbooks, post-mortems
api/openapi.json      API contract, source of the generated API reference
website/              Docusaurus portal that renders docs/
scripts/              Structure check, lint runner, API reference generator
demo/                 Patches and scripts for the live demos
.github/              CI workflows, PR template, CODEOWNERS, agent instructions and prompts
```

## Quick start

Requires Node.js 22.

```bash
npm install                    # lint tooling
npm run lint:docs              # markdownlint, cspell, structure and ADR checks
npm install --prefix website   # portal dependencies
npm run docs:start             # portal on http://localhost:3000
```

Optional, also run in CI: `npm run lint:style` ([Vale](https://vale.sh), run `vale sync` first) and
`npm run lint:links` ([lychee](https://lychee.cli.rs)).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) and the
[documentation guideline](docs/development/guidelines/documentation.md). Agents follow the same rules
in [.github/copilot-instructions.md](.github/copilot-instructions.md).
