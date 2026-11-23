---
title: "ADR-0009: Validate documentation in the pull request"
status: accepted
date: 2026-10-08
decision-makers: Pizza Luna platform team
tags: [adr, documentation, ci]
---

## Context and Problem Statement

Reviewers spent their time on typos, broken links and missing metadata instead of content. Small
defects still slipped through and made readers distrust the documentation.

## Decision Drivers

- Mechanical checks belong in the pipeline, not in the reviewer's head.
- The same checks must run locally with one command.
- Checks must be fast enough to run on every pull request.

## Considered Options

- Pipeline checks: markdownlint, cspell, Vale, lychee and a structure check, plus a website build
- Manual review only
- Scheduled weekly check of the whole documentation

## Decision Outcome

Chosen option: "Pipeline checks on every pull request", because defects are found before merge and the
author fixes them while the change is fresh. `npm run lint:docs` runs the same checks locally.

### Consequences

- Good, because reviewers focus on whether the content is right and useful.
- Bad, because spelling dictionaries and lint rules need occasional maintenance.

### Confirmation

The workflow `.github/workflows/docs-pr.yml` is a required status check for the `main` branch.
