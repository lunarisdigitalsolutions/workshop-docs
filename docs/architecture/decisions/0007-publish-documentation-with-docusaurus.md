---
title: "ADR-0007: Publish documentation with Docusaurus"
status: accepted
date: 2026-10-01
decision-makers: Pizza Luna platform team
tags: [adr, documentation]
---

## Context and Problem Statement

Documentation lives as Markdown in the repository. Readers outside the development team need a
website with navigation and search instead of browsing folders.

## Decision Drivers

- One source: the Markdown files in `docs/`.
- Full-text search without an external service.
- Diagrams written as Mermaid should render on the website.

## Considered Options

- Docusaurus
- MkDocs with Material theme
- Azure DevOps or GitHub wiki

## Decision Outcome

Chosen option: "Docusaurus", because it renders our Markdown with Mermaid, supports local search and
fails the build on broken links.

### Consequences

- Good, because the sidebar is generated from the folder structure.
- Good, because each page shows when and by whom it was last changed, taken from Git.
- Bad, because the website needs Node.js tooling next to the .NET tooling.

### Confirmation

The `docs` pull request workflow builds the website; broken links fail the build.
