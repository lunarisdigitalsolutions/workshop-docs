# Pizza Luna – Documentation as Code Demo

<!-- cspell:ignore gehört wohin finde wieder Margerita recieve -->

Demo repository for the talk **"Documentation as Code – Was gehört wohin und wie finde ich es wieder?"**
(45 minutes, three live demos).

It documents *Pizza Luna*, a fictional pizza chain with three branches. The platform – an Angular
frontend, a .NET ordering API on Azure App Service and an order-processing Azure Function behind a
Service Bus queue – exists only on paper: **this repository contains documentation, not code.** The
only artefacts outside `docs/` are the API contract and the documentation portal.

This README is the single guide for the repository: structure, setup, the demos and contributing.

## Repository structure

```text
docs/                     Markdown documentation, one folder per audience
  user/                   How do I use it?             customers and branch staff
  domain/                 Why does it exist?           glossary, business rules, models
  development/            How does it work?            guidelines, how-tos, process, generated reference
  architecture/           Why was it built this way?   views, decisions (MADR), quality
  operations/             What do I do when it breaks? deployment, monitoring, runbooks, post-mortems
src/
  WebApi/openapi.json     API contract, source of the generated API reference
  DeveloperPortal/        Docusaurus portal that renders docs/ (config, sidebars, theme)
scripts/                  Structure check, lint runner, API reference generator
.github/                  CI workflows, PR template, CODEOWNERS, agent instructions and prompts
.vale/                    Vale style rules for the project terms
AGENTS.md, CLAUDE.md      Entry points for coding agents
package.json              npm scripts and all tooling, including the portal (locked in package-lock.json)
```

## Run it

Requires Node.js 22.

```bash
npm ci              # lint tooling and portal from the lockfile
npm run lint:docs   # markdownlint, cspell, structure and ADR checks
npm run docs:start  # portal on http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run lint:docs` | Runs markdownlint, cspell and the structure check and reports all findings at once |
| `npm run lint:md` | Markdown rules ([markdownlint](https://github.com/DavidAnson/markdownlint)) |
| `npm run lint:spelling` | Spelling ([cspell](https://cspell.org)) |
| `npm run lint:structure` | Front matter, tags and ADR metadata (`scripts/check-docs.mjs`) |
| `npm run lint:style` | Style and project terms ([Vale](https://vale.sh), run `vale sync` first) |
| `npm run lint:links` | Links ([lychee](https://lychee.cli.rs), installed separately) |
| `npm run docs:generate` | Generates `docs/development/reference/api.md` from `src/WebApi/openapi.json` |
| `npm run docs:start` | Generates the API reference and starts the portal |
| `npm run docs:build` | Generates the API reference and builds the portal; fails on broken links |
| `npm run docs:clear` | Removes the portal's build output and generated files |

`lint:style` and `lint:links` need tools outside npm; CI runs them in the
[pull request workflow](.github/workflows/docs-pr.yml).

## Where to see what

<!-- cspell:disable -->

| Slide | Show in the repository |
| --- | --- |
| 5 – Documentation as Code | [PR template](.github/PULL_REQUEST_TEMPLATE.md): documentation is part of the change and its review |
| 6 – Was gehört ins Repository? | [docs/index.md](docs/index.md) – "What belongs here" |
| 7 – Zielgruppen und ihr Ort im Repository | `docs/user`, `docs/domain`, `docs/development`, `docs/architecture`, `docs/operations`; [ADR-0002](docs/architecture/decisions/0002-organize-documentation-by-audience.md) |
| 8 – ADR-Beispiel (MADR) | [ADR template](docs/architecture/decisions/template.md), [ADR-0004](docs/architecture/decisions/0004-decouple-order-processing-with-service-bus.md), [documentation guideline](docs/development/guidelines/documentation.md) |
| 9 – Demo 1 | [Demo 1](#demo-1--a-tour-of-the-repository--7-min) |
| 10 – Wer hält Dokumentation aktuell? | [CODEOWNERS](.github/CODEOWNERS), [PR template](.github/PULL_REQUEST_TEMPLATE.md), [pull requests](docs/development/process/pull-requests.md) |
| 11 – Dokumentation automatisieren | [docs-pr.yml](.github/workflows/docs-pr.yml), [generate-api-reference.mjs](scripts/generate-api-reference.mjs), [check-docs.mjs](scripts/check-docs.mjs) |
| 12 – Wie finde ich Informationen wieder? | Portal in [src/DeveloperPortal](src/DeveloperPortal/docusaurus.config.js), [docs-publish.yml](.github/workflows/docs-publish.yml), [glossary](docs/domain/glossary.md) |
| 13 – Demo 2 | [Demo 2](#demo-2--from-pull-request-to-portal--8-min) |
| 14 – Agents und Dokumentation | [AGENTS.md](AGENTS.md), [copilot-instructions.md](.github/copilot-instructions.md), [.github/instructions/](.github/instructions/), [.github/prompts/](.github/prompts/) |
| 15 – Demo 3 | [Demo 3](#demo-3--agent-with-and-without-documentation--5-min) |

<!-- cspell:enable -->

## Demo branches

Each demo branch starts from `main` and adds exactly one commit.

| Branch | Commit | Used in |
| --- | --- | --- |
| `demo/broken-docs` | `docs(user): describe pickup code in the tutorial` – one mistake per check | Demo 2, part A |
| `demo/driver-tip` | `feat(api): add optional driver tip to orders` – contract change without documentation | Demo 3 |
| `demo/no-docs` | `chore(demo): remove documentation and agent instructions` | Demo 3 |

## Before the talk

- [ ] Push `main` and all demo branches:
  `git push -u origin main demo/broken-docs demo/driver-tip demo/no-docs`
- [ ] Enable GitHub Pages with the source *GitHub Actions*.
- [ ] Make the checks of the [pull request workflow](.github/workflows/docs-pr.yml) required for
  `main`.
- [ ] Open a non-draft pull request from `demo/broken-docs` to `main`, so CI is already red when you
  show it.
- [ ] Install and build the portal once – the first start is slow:
  `npm ci`, `npm run docs:build`.
- [ ] VS Code extensions: *markdownlint*, *Code Spell Checker*, *Markdown Preview Mermaid Support*,
  optionally *Vale VSCode*. Editor font size ≥ 20.
- [ ] Record demo 3 as a fallback video.

## Demo 1 – A tour of the repository (≈ 7 min)

On `main`.

| Step | Show | Say |
| --- | --- | --- |
| 1 | Explorer: expand `docs/` | Five folders, one per audience question – the slide, for real. |
| 2 | `docs/operations/` → `runbooks/`, `post-mortems/` | Operations knowledge lives next to the system it operates. |
| 3 | [ADR-0004](docs/architecture/decisions/0004-decouple-order-processing-with-service-bus.md) | Check the four questions live: for whom (`decision-makers`), what for (context), main point first (decision outcome), what next (consequences, confirmation). |
| 4 | [order-flow.md](docs/architecture/views/order-flow.md) with the Markdown preview side by side | Add the line below after `F->>API: Set status Accepted`; the diagram updates instantly. |
| 5 | [ADR-0008](docs/architecture/decisions/0008-keep-diagrams-as-text-with-mermaid.md) | Diagrams as text are reviewable. |

Line to add in step 4:

```text
    F-)C: Email "Your order is accepted"
```

Reset:

```bash
git restore docs/architecture/views/order-flow.md
```

## Demo 2 – From pull request to portal (≈ 8 min)

### Part A – validate (≈ 5 min)

1. Show the open pull request from `demo/broken-docs`: the template's documentation checklist and the
   code owners requested by `CODEOWNERS`.
2. Show the red checks. The commit contains one mistake per tool:

   | Mistake | File | Caught by |
   | --- | --- | --- |
   | Typos `Margerita`, `recieve` | `docs/user/tutorials/place-your-first-order.md` | cspell |
   | Code block without language and without blank lines | `docs/user/tutorials/place-your-first-order.md` | markdownlint |
   | Link to `../troubleshooting-guide.md`, which does not exist | `docs/user/how-to/track-an-order.md` | lychee and the portal build |
   | "Click on" instead of "Select" | `docs/user/how-to/work-the-kitchen-board.md` | Vale (rule `PizzaLuna.Terms`) |
   | `decision-makers` removed | `docs/architecture/decisions/0004-decouple-order-processing-with-service-bus.md` | structure check (`scripts/check-docs.mjs`) |

3. Open [docs-pr.yml](.github/workflows/docs-pr.yml) briefly – the YAML from the slide.
4. Locally: `git switch demo/broken-docs`, then `npm run lint:docs` shows all findings at once. Fix a
   typo live and run `npm run lint:spelling` again.

Reset:

```bash
git restore .
git switch main
```

### Part B – find (≈ 3 min)

On `main`.

1. `npm run docs:start` and open `http://localhost:3000`.
2. The navigation bar shows the five audiences – the folder structure is the navigation.
3. Search for `dead letter` and open the runbook. At the bottom: *last updated* (from Git) and
   *Edit this page*.
4. Development → Reference → **API reference**: generated from `src/WebApi/openapi.json` by
   `scripts/generate-api-reference.mjs`, never edited by hand.

If time is short, keep part B to steps 1–2. Reset: stop the server with `Ctrl+C`.

## Demo 3 – Agent with and without documentation (≈ 5 min)

1. Switch to the branch without documentation and remove the generated API reference that Git leaves
   behind:

   ```bash
   git switch demo/no-docs
   git clean -fdX docs
   ```

2. Ask the agent:

   > Why do orders go through a queue instead of being processed by the API directly, and what should
   > on-call do when an order ends up in the dead-letter queue?

   Without documentation the agent guesses.
3. `git switch demo/driver-tip` and ask the same question in a new chat. With documentation it cites
   ADR-0004 and the runbook.
4. The branch also adds a driver tip to the API contract, without documentation. Run the prompt
   `/update-docs-for-change`; with no uncommitted changes it documents `git diff main...HEAD`.
   Expected: the tip rule in `pricing.md`, `tip` on `Order` in the domain model, a sentence in the
   tutorial's checkout step, perhaps a glossary entry.
5. Review the diff together (`git diff`) and point out where the agent wrote too much – new pages,
   repeated tables. The team decides what stays.

Reset:

```bash
git restore .
git clean -fd docs
git switch main
```

## Update the demo branches after main changes

Rebase each branch onto the new `main`, check it and push it:

```bash
git switch main
git rebase main demo/broken-docs
git rebase main demo/driver-tip
git rebase main demo/no-docs
git switch main
git push --force-with-lease origin demo/broken-docs demo/driver-tip demo/no-docs
```

- A conflict on `demo/no-docs` means `main` changed a file the branch deletes: run
  `git rm -r docs README.md AGENTS.md CLAUDE.md .github/copilot-instructions.md .github/instructions .github/prompts`
  and `git rebase --continue`.
- After the rebase, `demo/broken-docs` must still fail `npm run lint:docs` and `demo/driver-tip` must
  still have no documentation changes.

## Contributing

1. Read the [documentation guideline](docs/development/guidelines/documentation.md): where a page goes,
   the four questions every page answers and the format rules. Agents follow the same rules in
   [.github/copilot-instructions.md](.github/copilot-instructions.md).
2. Create a branch and use [conventional commits](docs/development/process/conventional-commits.md),
   for example `docs(operations): add runbook for payment outages`.
3. Run `npm run lint:docs` before you push, and `npm run docs:build` when you change links or the
   portal.
4. Open a pull request and complete the documentation checklist in the template.
