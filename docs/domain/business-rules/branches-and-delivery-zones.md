---
title: Branches and delivery zones
sidebar_position: 3
tags: [domain, branches]
---

Pizza Luna currently runs three branches. Branch managers maintain opening hours and item
availability for their branch; adding a branch is a product decision.

| Code | Branch | Opening hours | Delivery |
| --- | --- | --- | --- |
| `OT` | Old Town | Mon–Sun 11:00–22:00 | Yes |
| `HB` | Harbour | Tue–Sun 17:00–23:00 | Yes |
| `CA` | Campus | Mon–Fri 11:00–15:00 | Pickup only |

## Rules

- Each postal code belongs to at most one branch's delivery zone, so a delivery address always
  maps to a single branch.
- A branch can pause online orders for up to 60 minutes during rush hours. Paused branches reject
  new orders with a clear message instead of accepting orders they cannot prepare in time.
- Order numbers start with the branch code, for example `HB-0427`.
