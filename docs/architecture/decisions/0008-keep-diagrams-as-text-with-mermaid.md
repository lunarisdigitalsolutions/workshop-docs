---
title: "ADR-0008: Keep diagrams as text with Mermaid"
status: accepted
date: 2026-10-01
decision-makers: Pizza Luna platform team
tags: [adr, documentation, diagrams]
---

## Context and Problem Statement

Architecture diagrams were drawn in a graphical editor and exported as images. Nobody could review a
change to a diagram, and the images went out of date quickly.

## Decision Drivers

- Diagram changes must be reviewable in a pull request diff.
- Diagrams should render in the IDE, on GitHub and on the documentation website.
- No extra tool installation for contributors.

## Considered Options

- Mermaid
- PlantUML
- draw.io files committed to the repository

## Decision Outcome

Chosen option: "Mermaid", because GitHub, VS Code and Docusaurus render it natively, so a diagram is
just a code block in the Markdown page it belongs to.

### Consequences

- Good, because a diagram change shows up as a readable text diff.
- Bad, because Mermaid offers less layout control than PlantUML or a graphical editor.

### Confirmation

Reviewers reject new diagrams committed as images unless they are screenshots of a user interface.
