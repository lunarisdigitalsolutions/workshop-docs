---
title: Deploy and roll back
sidebar_position: 2
tags: [operations, deployment]
---

Every merge to `main` deploys to `dev` automatically. Production deployments are started manually and
need one approval.

## Deploy to production

1. Open the **Deploy** workflow in GitHub Actions and run it for `prod` with the commit to release.
2. The workflow applies Bicep, runs database migrations, and deploys the API to the `staging` slot.
3. Check the smoke test results in the workflow summary.
4. Approve the **Swap** step. The `staging` slot becomes production without downtime.

Avoid deployments on Friday and Saturday evenings between 17:00 and 21:00 – that is rush hour.

## Roll back

1. Swap the slots back in the Azure portal: **App Service → Deployment slots → Swap**.
2. If a migration caused the problem, restore the database to the time before the deployment
   (point-in-time restore) and tell the team in the incident channel.
3. Write a [post-mortem](../post-mortems/index.md).
