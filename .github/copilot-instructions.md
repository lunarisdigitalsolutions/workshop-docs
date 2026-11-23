# Instructions for coding agents

This repository documents **Pizza Luna**, a fictional pizza chain with three branches. It contains
documentation only: Markdown in `docs/`, the API contract in `src/WebApi/openapi.json` and the
Docusaurus portal in `src/DeveloperPortal/`. Humans and agents follow the same rules.

## Where information goes

Read [ADR-0002](../docs/architecture/decisions/0002-organize-documentation-by-audience.md). Pick the
folder by the reader's question:

| Reader asks | Folder |
| --- | --- |
| How do I use it? | `docs/user/` |
| Why does it exist? | `docs/domain/` |
| How does it work? | `docs/development/` |
| Why was it built this way? | `docs/architecture/` (decisions in `decisions/`) |
| What do I do when it breaks? | `docs/operations/` |

Before writing, search for an existing page. One information, one place: link instead of copying.

## How to write

Follow the [documentation guideline](../docs/development/guidelines/documentation.md):

- Every page answers: for whom, what for, the main point first, what next.
- Front matter with `title` and 1–5 `tags`; no level-one heading.
- Diagrams as Mermaid code blocks; relative links between pages.
- Use the terms from the [glossary](../docs/domain/glossary.md). Add new terms there first.

## What does not belong in the documentation

- Speculation or behaviour that is not in `src/WebApi/openapi.json` or an accepted ADR.
- Copies of information that already exists elsewhere in `docs/`.
- Long code samples that duplicate the implementation.
- Meeting notes, plans, customer names or personal data.
- Edits to `docs/development/reference/api.md` – it is generated from `src/WebApi/openapi.json`.

Prefer the smallest change that keeps the documentation correct. More documentation is not better
documentation.

## When something changes

Walk the change chain and update every affected area in the same change: architecture views → ADR →
user guide → domain rules → operations. Then run:

```bash
npm run lint:docs
```

Use [conventional commits](../docs/development/process/conventional-commits.md) for commit messages.
