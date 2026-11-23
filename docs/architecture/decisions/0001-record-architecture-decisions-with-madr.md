---
title: "ADR-0001: Record architecture decisions with MADR"
status: accepted
date: 2026-09-01
decision-makers: Pizza Luna platform team
tags: [adr, documentation]
---

## Context and Problem Statement

Decisions about the platform were made in calls and chats and could not be found later. New team
members kept reopening settled questions. We need one place and one format for decisions.

## Decision Drivers

- Decisions and their reasons must be findable next to the code they affect.
- Every record should have the same structure so it is quick to scan.
- The format should be established, not invented by us.

## Considered Options

- Markdown Architectural Decision Records (MADR) in the repository
- Free-form wiki pages
- Decisions recorded only in pull request descriptions

## Decision Outcome

Chosen option: "MADR in the repository", because it keeps decisions versioned with the code and gives
every record the same sections: context, drivers, options, outcome and consequences.

### Consequences

- Good, because decisions are reviewed in pull requests like any other change.
- Good, because agents and new team members find the reasons behind the design.
- Bad, because writing a record takes 20–30 minutes per decision.

### Confirmation

`npm run lint:structure` fails when an ADR misses required metadata or sections or is not listed in
the [decision index](index.md).

## More Information

- [MADR project](https://adr.github.io/madr/)
- [ADR template](template.md)
