---
title: Order flow
sidebar_position: 3
tags: [architecture, orders]
---

What happens between a customer pressing **Place order** and the order appearing on the kitchen
board.

```mermaid
sequenceDiagram
    autonumber
    actor C as Customer
    participant SPA as Web frontend
    participant API as Ordering API
    participant Q as orders queue
    participant F as Order processing
    participant P as Payment provider

    C->>SPA: Place order
    SPA->>API: POST /api/orders
    API->>API: Validate branch, items and prices
    API->>Q: Send OrderPlaced
    API-->>SPA: 202 Accepted + order number
    SPA-->>C: Show tracking page
    Q->>F: Deliver OrderPlaced
    F->>P: Authorise payment
    P-->>F: Authorised
    F->>API: Set status Accepted
    Note over F,API: Order appears on the kitchen board
```

## Notes

- The API answers with `202 Accepted` before payment is authorised. The customer sees status
  `Placed` until processing finishes, usually within a few seconds.
- If processing fails repeatedly, the message moves to the dead-letter queue; see the
  [dead-lettered orders runbook](../../operations/runbooks/dead-lettered-orders.md).
