---
title: System context
sidebar_position: 1
tags: [architecture, c4]
---

Pizza Luna as a black box: who uses it and which external systems it depends on (C4 level 1).

```mermaid
flowchart LR
    customer([Customer]):::person
    staff([Branch staff]):::person
    manager([Branch manager]):::person

    pizzaluna[Pizza Luna<br/>ordering platform]:::system

    payment[Payment provider]:::external
    email[Email service<br/>Azure Communication Services]:::external
    entra[Microsoft Entra ID]:::external

    customer -- "browses menu, orders, tracks" --> pizzaluna
    staff -- "prepares and hands over orders" --> pizzaluna
    manager -- "maintains availability and hours" --> pizzaluna
    pizzaluna -- "authorises payments" --> payment
    pizzaluna -- "sends order notifications" --> email
    staff -. "signs in" .-> entra
    manager -. "signs in" .-> entra

    classDef person fill:#08427b,color:#fff,stroke:#052e56
    classDef system fill:#1168bd,color:#fff,stroke:#0b4884
    classDef external fill:#999,color:#fff,stroke:#6b6b6b
```

| Neighbour | Interaction |
| --- | --- |
| Customer | Orders as a guest; receives a tracking link by email. |
| Branch staff and managers | Sign in with Microsoft Entra ID; use the kitchen board and branch settings. |
| Payment provider | Authorises card payments; calls back with the payment result. |
| Email service | Sends order confirmations and status updates. |
