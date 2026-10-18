---
paths:
  - 'routes/*.php'
  - 'app/Http/Controllers/**/*.php'
  - 'resources/js/**/*.vue'
  - 'resources/js/**/*.ts'
---

# Routes

## Internal URLs
Name first party routes that callers need to generate. Prefer `route()` or `to_route()` for backend application destinations, and use generated Wayfinder route or action functions for internal Vue links, forms, and requests.

Literal paths are acceptable in route declarations, static `Route::redirect()` declarations, package configuration that accepts a path, tests that intentionally verify a conventional path, isolated request fixtures, and explicit defensive fallbacks. Do not add other hardcoded internal application URLs.

## Route handlers
Use controller classes for stateful request handling and mutations. Route closures are acceptable for static Inertia pages and trivial responses that contain no reusable application logic. Use `Route::redirect()` for static redirects.

Prefer implicit route model binding for first party model parameters. Explicit binding is acceptable when a package or configurable model requires it.

## Middleware
Attach static middleware to route definitions or route groups. Controller middleware is acceptable when it is conditional or specifically coupled to that controller.
