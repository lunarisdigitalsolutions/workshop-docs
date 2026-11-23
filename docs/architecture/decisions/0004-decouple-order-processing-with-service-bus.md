---
title: "ADR-0004: Decouple order processing with Service Bus"
status: accepted
date: 2026-09-15
decision-makers: Pizza Luna platform team
tags: [adr, architecture, azure]
---

## Context and Problem Statement

On Friday evenings most orders arrive within two hours. When the API authorised payments and sent
emails synchronously, slow responses from the payment provider made the shop time out and orders were
lost. How do we accept every order quickly, even when downstream services are slow?

## Decision Drivers

- No placed order may be lost (quality goal 1).
- The shop must answer quickly during rush hour (quality goal 2).
- Failed orders must be visible and recoverable by on-call.

## Considered Options

- Azure Service Bus queue between the API and an Azure Functions processor
- Synchronous processing inside the API
- Background jobs inside the API process

## Decision Outcome

Chosen option: "Azure Service Bus queue with an Azure Functions processor", because the API only has
to validate and enqueue an order, while payment and notifications are retried independently.
Messages that fail repeatedly move to the dead-letter queue instead of disappearing.

### Consequences

- Good, because the API answers with `202 Accepted` in milliseconds, independent of the payment
  provider.
- Good, because retries and dead-lettering come built in.
- Bad, because the customer briefly sees status `Placed` before `Accepted`.
- Bad, because on-call has to watch queue length and dead-letter messages.

### Confirmation

The alerts in [Dashboards and alerts](../../operations/monitoring/dashboards-and-alerts.md) fire on
queue backlog and dead-letter messages, and load test QS-2 in the
[quality scenarios](../quality/quality-scenarios.md) runs before every major release.

## Pros and Cons of the Options

### Synchronous processing inside the API

- Good, because it is the simplest design.
- Bad, because every slow payment call blocks a request; this caused the lost orders.

### Background jobs inside the API process

- Good, because no extra Azure service is needed.
- Bad, because jobs are lost when the App Service restarts or scales in.

## More Information

- [Order flow](../views/order-flow.md)
- [Runbook: Dead-lettered orders](../../operations/runbooks/dead-lettered-orders.md)
