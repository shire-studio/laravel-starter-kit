---
paths:
  - 'app/Policies/**'
---

# Policies

## Model authorization
Place application-owned model authorization and reusable resource abilities in policy classes under `app/Policies`. Keep authentication, signed request integrity, password confirmation, and package-owned authorization at their framework boundaries. Do not duplicate application policy decisions in controllers, requests, actions, or Vue components.

Use policies instead of `Gate::define()` for model abilities. Global authorization configuration, such as a default denial response, may remain in a service provider.
