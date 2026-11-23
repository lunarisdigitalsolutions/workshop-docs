---
title: Introduction and goals
sidebar_position: 2
tags: [architecture, arc42]
---

Pizza Luna replaces phone orders with online ordering for all branches. Customers order without an
account; branch staff see incoming orders on a kitchen board.

## Quality goals

| Priority | Goal | Why it matters |
| --- | --- | --- |
| 1 | Orders are never lost | A lost order is a lost customer and a wasted pizza. |
| 2 | The shop stays responsive at Friday rush | Most orders arrive between 18:00 and 20:00. |
| 3 | A small team can run it | Two developers maintain the platform next to other work. |

## Constraints

- Backend in .NET, frontend in Angular – the skills the team already has.
- Hosted in Microsoft Azure in the EU (West Europe region).
- Payment is handled by an external payment provider; Pizza Luna never stores card data.
- Infrastructure is described as code (Bicep) and deployed through pipelines only.
