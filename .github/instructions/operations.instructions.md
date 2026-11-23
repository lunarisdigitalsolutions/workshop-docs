---
applyTo: 'docs/operations/**/*.md'
---

# Operations documentation

- Runbooks start with the alert or symptom that leads the reader there, then numbered steps:
  check impact, diagnose, mitigate, close.
- Name the exact Azure resource and portal path; avoid "check the logs" without saying where.
- Post-mortems are blameless and use `post-mortems/template.md`; describe systems, not people.
- Link every alert in `monitoring/dashboards-and-alerts.md` to a runbook.
