---
title: Dashboards and alerts
sidebar_position: 1
tags: [operations, monitoring]
---

What we watch in production and what happens when an alert fires. Alerts page the on-call person
through the Operations action group.

| Alert | Condition | Severity | Runbook |
| --- | --- | --- | --- |
| Order queue backlog | Active messages in `orders` > 50 for 5 minutes | 2 | [Order queue backlog](../runbooks/order-queue-backlog.md) |
| Dead-lettered orders | Dead-letter messages in `orders` > 0 | 2 | [Dead-lettered orders](../runbooks/dead-lettered-orders.md) |
| API errors | HTTP 5xx rate > 2 % for 10 minutes | 1 | [Deploy and roll back](../deployment/deploy-and-roll-back.md) |
| Slow ordering | `POST /api/orders` p95 > 500 ms for 15 minutes | 3 | [Order queue backlog](../runbooks/order-queue-backlog.md) |

## Dashboards

The **Pizza Luna – Operations** workbook in Application Insights shows orders per branch, queue length,
processing duration and failed payments for the last 24 hours.
