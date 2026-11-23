---
title: "ADR-0002: Organize documentation by audience"
status: accepted
date: 2026-09-01
decision-makers: Pizza Luna platform team
tags: [adr, documentation]
---

## Context and Problem Statement

Readers of our documentation have very different questions: customers want to order, developers want
to run the API, on-call wants to fix an incident. A structure by technology or by project forces each
of them to search everywhere.

## Decision Drivers

- Each reader should find their entry point in one click.
- Every piece of information should have exactly one obvious place.
- The top level should stay small enough to remember.

## Considered Options

- One top-level folder per audience: user, domain, development, architecture, operations
- One folder per component: frontend, api, functions, infrastructure
- A flat folder with tags

## Decision Outcome

Chosen option: "One top-level folder per audience", because the question a reader asks decides where
they look. Inside each audience folder we follow [Diátaxis](https://diataxis.fr) where it fits:
tutorials, how-to guides, reference and explanation.

### Consequences

- Good, because the portal navigation mirrors the folders and the reader's role.
- Good, because ownership can be assigned per folder in `CODEOWNERS`.
- Bad, because some topics need cross-links, for example a runbook linking to a business rule.

### Confirmation

`npm run lint:structure` only accepts pages inside the five audience folders, and every page needs a
title and tags in its front matter.

## Pros and Cons of the Options

### One folder per component

- Good, because it matches the source code layout.
- Bad, because a user guide and a runbook for the same component end up side by side.

### A flat folder with tags

- Good, because nothing has to be moved.
- Bad, because navigation depends entirely on search and on consistent tagging.
