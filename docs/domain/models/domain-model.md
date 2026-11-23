---
title: Domain model
sidebar_position: 1
tags: [domain, model]
---

The core entities of the ordering domain. Names match the [glossary](../glossary.md) and the
API schema.

```mermaid
classDiagram
    class Branch {
        code
        name
        openingHours
        deliveryZone
        isPaused
    }
    class MenuItem {
        id
        name
        category
        basePrice
    }
    class Availability {
        isAvailable
    }
    class Order {
        orderNumber
        status
        fulfilmentType
        total
        placedAt
    }
    class OrderLine {
        size
        quantity
        toppings
        lineTotal
    }
    Branch "1" --> "*" Order : prepares
    Branch "1" --> "*" Availability
    MenuItem "1" --> "*" Availability
    Order "1" *-- "1..*" OrderLine
    OrderLine "*" --> "1" MenuItem
```

## Invariants

- An `Order` always has at least one `OrderLine`.
- An `OrderLine` can only reference a `MenuItem` that is available in the order's branch at the
  time the order is placed.
- `Order.total` is the sum of all line totals plus the delivery fee; see [Pricing](../business-rules/pricing.md).
