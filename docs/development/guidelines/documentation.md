---
title: Documentation guideline
sidebar_position: 1
tags: [development, documentation]
---

How we write and place documentation. Apply it to every change, whether a person or an agent writes
the page.

## Where a page goes

Ask one question: does the information change together with the system? If yes, it belongs in this
repository; if no (meeting notes, planning, customer material), it does not.

Then pick the audience folder by the reader's question:

| Reader asks | Folder |
| --- | --- |
| How do I use it? | `docs/user/` |
| Why does it exist? | `docs/domain/` |
| How does it work? | `docs/development/` |
| Why was it built this way? | `docs/architecture/` |
| What do I do when it breaks? | `docs/operations/` |

One information, one place. Link to it instead of copying it.

## How a page is written

Every page answers four questions, in this order:

1. **For whom?** Name the reader in the first sentence or the folder makes it obvious.
2. **What for?** State the purpose and the outcome for the reader.
3. **What is the main point?** Put the most important information first.
4. **What next?** End with the next step or links to related pages.

The title must tell the reader what the page contains. Prefer short paragraphs, tables for facts and
numbered steps for procedures.

## Format rules

- Markdown only. Front matter with `title` and up to five `tags` is required; do not add a level-one
  heading, the title is rendered from front matter.
- Diagrams are Mermaid code blocks, never exported images ([ADR-0008](../../architecture/decisions/0008-keep-diagrams-as-text-with-mermaid.md)).
- Use relative links to other pages so the link checker and the website build can verify them.
- Code blocks always declare their language.

## When to update documentation

A change is done when its documentation is updated in the same pull request. Walk the change chain:

1. Code changed → does it affect the architecture?
2. Architecture affected → does it need an ADR?
3. Users affected → update the user guide.
4. Operations affected → update deployment docs or runbooks.

Run `npm run lint:docs` before pushing. The pipeline runs the same checks.
