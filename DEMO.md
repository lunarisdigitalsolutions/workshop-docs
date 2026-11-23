# Demo guide

How to use this repository in the talk **"Documentation as Code – Was gehört wohin und wie finde ich
es wieder?"** (45 minutes, three demos). Each demo lists what to show, where it lives and how to reset.

## Slides and where they live in the repository

| Slide | Show in the repository |
| --- | --- |
| Was gehört ins Repository? | [docs/index.md](docs/index.md) – "What belongs here" |
| Zielgruppen und ihr Ort im Repository | `docs/user`, `docs/domain`, `docs/development`, `docs/architecture`, `docs/operations` |
| Wie strukturieren wir ein Dokument? | [ADR-0004](docs/architecture/decisions/0004-decouple-order-processing-with-service-bus.md), [documentation guideline](docs/development/guidelines/documentation.md) |
| Wer hält Dokumentation aktuell? | [.github/CODEOWNERS](.github/CODEOWNERS), [PR template](.github/PULL_REQUEST_TEMPLATE.md), [pull requests](docs/development/process/pull-requests.md) |
| Dokumentation automatisieren | [docs-pr.yml](.github/workflows/docs-pr.yml), [generate-api-reference.mjs](scripts/generate-api-reference.mjs) |
| Wie finde ich Informationen wieder? | Portal: `npm run docs:start`, [docs-publish.yml](.github/workflows/docs-publish.yml) |
| Agents und Dokumentation | [.github/copilot-instructions.md](.github/copilot-instructions.md), [.github/instructions/](.github/instructions/), [.github/prompts/](.github/prompts/) |

## Preparation (day before)

1. Push the repository to GitHub, enable GitHub Pages (source: GitHub Actions) and make `docs-pr`
   checks required for `main`.
2. Install dependencies and build once (the first portal start is slow):

   ```bash
   npm install
   npm install --prefix website
   npm run docs:build
   ```

3. Create the broken pull request for demo 2 so CI is already red when you show it:

   ```bash
   git switch -c demo/pickup-docs
   git apply demo/02-broken-docs.patch
   git commit -am "docs(user): describe pickup code in the tutorial"
   git push -u origin demo/pickup-docs   # open a non-draft PR to main
   git switch main
   ```

4. VS Code extensions: *markdownlint*, *Code Spell Checker*, *Markdown Preview Mermaid Support*,
   optionally *Vale VSCode*. Editor font size ≥ 20.
5. Record demo 3 as a fallback video.

## Demo 1 – A tour of the repository (≈ 7 min)

| Step | Show | Say |
| --- | --- | --- |
| 1 | Explorer: expand `docs/` | Five folders, one per audience question – the slide, for real. |
| 2 | `docs/operations/` → `runbooks/`, `post-mortems/` | Operations knowledge lives next to the code it operates. |
| 3 | [ADR-0004](docs/architecture/decisions/0004-decouple-order-processing-with-service-bus.md) | Check the four questions live: title, for whom (`decision-makers`), what for (context), main point (decision outcome), next step (consequences, confirmation). |
| 4 | [order-flow.md](docs/architecture/views/order-flow.md) with Markdown preview side by side | Add the line below after `F->>API: Set status Accepted`; the diagram updates instantly. |
| 5 | [ADR-0008](docs/architecture/decisions/0008-keep-diagrams-as-text-with-mermaid.md) | Diagrams as text are reviewable. "Markdown unless there is a reason not to." |

Line to add in step 4:

```text
    F-)C: Email "Your order is accepted"
```

Reset: `git restore docs/architecture/views/order-flow.md`

## Demo 2 – From pull request to portal (≈ 8 min)

**Part A – validate (≈ 5 min)**

1. Show the open PR `demo/pickup-docs`: the template's documentation checklist and the code owners
   requested by `CODEOWNERS`.
2. Show the red checks. The patch contains one finding per tool:

   | Finding | Caught by |
   | --- | --- |
   | Typos `Margerita`, `recieve` | cspell |
   | Code block without language, missing blank lines | markdownlint |
   | Link to `../troubleshooting-guide.md` (does not exist) | lychee and the website build |
   | "Click on" instead of "Select" | Vale (custom rule `PizzaLuna.Terms`) |
   | ADR-0004 without `decision-makers` | structure check (`scripts/check-docs.mjs`) |

3. Open [docs-pr.yml](.github/workflows/docs-pr.yml) briefly – the YAML from the slide.
4. Locally on the branch: `npm run lint:docs` shows all findings at once. Fix the typo live, run
   `npm run lint:spelling` again – green.
5. Clean up: `git switch main`

**Part B – find (≈ 3 min)**

1. `npm run docs:start` and open `http://localhost:3000`.
2. The navigation bar shows the five audiences – the folder structure is the navigation.
3. Search for `dead letter` and open the runbook. At the bottom: *last updated* (from Git) and
   *Edit this page*.
4. Development → Reference → **API reference**: generated from `api/openapi.json` by
   `scripts/generate-api-reference.mjs`, never edited by hand.

If time is short, keep part B to steps 1–2.

## Demo 3 – Agent with and without documentation (≈ 5 min)

1. Before the talk: `pwsh demo/new-nodocs-copy.ps1` creates `../lunaris.docs-nodocs` without `docs/`
   and without agent instructions. Open both folders in separate windows.
2. Ask the agent the same question in both windows:

   > Why do orders go through a queue instead of being processed by the API directly, and what should
   > on-call do when an order ends up in the dead-letter queue?

   Without documentation the agent guesses; with documentation it cites ADR-0004 and the runbook.
3. In the full repository apply a small contract change and let the agent update the documentation:

   ```bash
   git apply demo/03-add-driver-tip.patch
   ```

   Then run the prompt `/update-docs-for-change` (Copilot) or ask: *"Update the documentation for my
   change."* Expected: tip rule in `pricing.md`, `tip` on `Order` in the domain model, a sentence in
   the tutorial's checkout step, maybe a glossary entry.
4. Review the diff together and point out where the agent wrote too much (new pages, repeated tables).
   "Was drin steht, entscheidet das Team."
5. Reset: `git restore .` and `git worktree remove ../lunaris.docs-nodocs --force`
