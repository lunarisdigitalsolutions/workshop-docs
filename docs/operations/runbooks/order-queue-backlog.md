---
title: "Runbook: Order queue backlog"
sidebar_position: 1
tags: [operations, runbook, service-bus]
---

Use this runbook when the **Order queue backlog** alert fires: more than 50 orders are waiting in the
`orders` queue. Customers see their order stuck in status `Placed`.

## 1. Check the impact

- Open the **Pizza Luna – Operations** workbook and look at *Queue length* and *Processing duration*.
- During rush hour, a short peak that drains within 10 minutes is expected. Watch, do not act.

## 2. Check the order processor

1. In the Azure portal, open the Function App `func-pizzaluna-prod` and check **Overview → Status**.
2. Open **Monitor → Invocations**. Many failures point to a dependency, usually the payment provider.
3. Check the payment provider status page.

## 3. Mitigate

| Finding | Action |
| --- | --- |
| Function App stopped or unhealthy | Restart it. Messages stay in the queue and are processed afterwards. |
| Payment provider down | Nothing to restart. Pause online orders in the affected branches via the kitchen board, post in the incident channel. |
| Processing slow but working | Increase the maximum instance count of the Function App temporarily. |

## 4. Close

Once the queue is below 10 messages, confirm in the incident channel. If customers were affected for
more than 15 minutes, write a [post-mortem](../post-mortems/index.md).
