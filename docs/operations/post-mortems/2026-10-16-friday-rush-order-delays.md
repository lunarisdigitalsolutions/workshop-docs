---
title: "2026-10-16: Friday rush order delays"
sidebar_position: 1
tags: [operations, post-mortem, service-bus]
---

## Summary

- **Date and time:** 2026-10-16 18:40–19:20
- **Impact:** Orders in Old Town and Harbour stayed in `Placed` for up to 25 minutes; 14 customers
  called the branches.
- **Root cause:** The order processor was limited to one instance after a configuration change, so
  it could not keep up with the rush-hour load.
- **Resolution:** The maximum instance count was raised to 10; the backlog cleared within 12 minutes.

## Timeline

| Time | Event |
| --- | --- |
| 18:40 | Queue length starts to rise above normal rush level |
| 18:47 | **Order queue backlog** alert fires, on-call acknowledges |
| 18:55 | On-call follows the runbook, finds the Function App healthy but slow |
| 19:08 | Maximum instance count found at 1, raised to 10 |
| 19:20 | Queue below 10 messages, incident closed |

## Root cause analysis

A Bicep change for the `dev` environment set the processor's maximum instance count to 1 and was
applied to both environments because the parameter had no environment-specific value. The pull request
review did not catch it because the parameter name did not make the scope obvious.

## Action items

| Action | Owner | Due |
| --- | --- | --- |
| Make the maximum instance count an explicit per-environment parameter | Platform team | 2026-10-30 |
| Add "check Function App scale settings" to the backlog runbook | Operations | 2026-10-23 |
| Add a load test for QS-2 to the release checklist | Platform team | 2026-11-13 |
