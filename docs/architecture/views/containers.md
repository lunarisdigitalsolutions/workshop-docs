---
title: Container view
sidebar_position: 2
tags: [architecture, c4, azure]
---

The deployable building blocks of Pizza Luna and the Azure services that host them (C4 level 2).

```mermaid
flowchart TB
    customer([Customer]) --> spa
    staff([Branch staff]) --> spa

    subgraph azure[Azure – West Europe]
        spa[Web frontend<br/>Angular SPA<br/>Static Web Apps]
        api[Ordering API<br/>ASP.NET Core modular monolith<br/>App Service]
        queue[[orders queue<br/>Service Bus]]
        func[Order processing<br/>Azure Functions]
        sql[(Ordering database<br/>Azure SQL)]
        kv[Key Vault]
        ai[Application Insights]
    end

    spa -- "HTTPS / JSON" --> api
    api -- "reads and writes" --> sql
    api -- "OrderPlaced message" --> queue
    queue -- "triggers" --> func
    func -- "updates status" --> sql
    func -- "authorises" --> payment[Payment provider]
    func -- "notifies" --> email[Email service]
    api -.-> kv
    func -.-> kv
    api -.-> ai
    func -.-> ai
```

| Container | Technology | Responsibility |
| --- | --- | --- |
| Web frontend | Angular, Azure Static Web Apps | Customer shop and staff kitchen board in one SPA with role-based routes. |
| Ordering API | ASP.NET Core (.NET 10), Azure App Service | Modules `Menu`, `Branches` and `Ordering`; validates and stores orders, publishes `OrderPlaced`. |
| orders queue | Azure Service Bus (Standard) | Buffers placed orders so rush-hour peaks do not hit payment and email directly. |
| Order processing | Azure Functions (.NET 10 isolated) | Authorises payment, accepts or rejects the order, sends notifications. |
| Ordering database | Azure SQL Database | Menu, branches, orders; one database, one schema per module. |

Why the API is a modular monolith and why processing sits behind a queue is recorded in
[ADR-0003](../decisions/0003-use-a-modular-monolith-for-the-ordering-api.md) and
[ADR-0004](../decisions/0004-decouple-order-processing-with-service-bus.md).
