---
title: "Runbook: Dead-lettered orders"
sidebar_position: 2
tags: [operations, runbook, service-bus]
---

Use this runbook when the **Dead-lettered orders** alert fires. An order message failed processing
ten times and moved to the dead-letter queue. The customer's order is stuck in `Placed`; the order is
not lost ([ADR-0004](../../architecture/decisions/0004-decouple-order-processing-with-service-bus.md)).

## 1. Inspect the message

1. Open the Service Bus namespace `sb-pizzaluna-prod` → queue `orders` → **Service Bus Explorer**.
2. Switch to **Dead-letter** and peek the messages.
3. Note `OrderNumber`, `DeadLetterReason` and `DeadLetterErrorDescription`.

## 2. Decide

| Reason | Action |
| --- | --- |
| Transient error (timeout, payment provider unavailable) | Resubmit the message from Service Bus Explorer. |
| Invalid data (unknown menu item, closed branch) | Do not resubmit. Ask the branch to call the customer, then cancel the order in the kitchen board. |
| Unknown | Keep the message, open a bug with the details and inform the development team. |

## 3. Follow up

Check that the order moved to `Accepted` or `Cancelled`. Recurring dead letters with the same reason
are a bug, not an operations task.
