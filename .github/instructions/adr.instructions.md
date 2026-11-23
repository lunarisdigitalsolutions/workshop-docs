---
applyTo: 'docs/architecture/decisions/*.md'
---

# Architecture decision records

- Start from `template.md` and use the next free number: `NNNN-short-title-in-imperative.md`.
- Front matter needs `title: "ADR-NNNN: …"`, `status`, `date` (YYYY-MM-DD), `decision-makers`, `tags`.
- Fill context, drivers, considered options, outcome, consequences and a concrete confirmation.
- Add the record to `index.md`.
- Never rewrite an accepted decision. Create a new ADR and set the old status to
  `superseded by ADR-NNNN`.
