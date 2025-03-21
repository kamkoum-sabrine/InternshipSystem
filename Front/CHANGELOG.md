### [coreui-pro-angular-admin-template](https://coreui.io/angular/) changelog

---

#### `5.2.16`

- chore(dependencies): update
  - `Angular` to `^18.2.1`
  - `typescript` to `~5.5.4`
  - `tslib`: to `^2.7.0`
  - `zone.js` to `~0.14.10`
  - `@coreui/coreui-pro` to `~5.4.0`
  - `@coreui/angular-chartjs` to `~5.2.16`,
  - `@coreui/angular-pro` to `~5.2.16`,
  - `@coreui/icons-angular` to `~5.2.16`,
  - `@fullcalendar/angular` to `^6.1.15`
  - `@googlemaps/js-api-loader` to `^1.16.8`
  - `chart.js` to `^4.4.4`
  - `jasmine-core` to `^5.2.0`
  - `karma` to `^6.4.4`,
  - `tslib` to `^2.7.0`
  - `micromatch` to `4.0.8`
    - see vulnerability [Regular Expression Denial of Service (ReDoS) in micromatch](https://github.com/advisories/GHSA-952p-6rrq-rcjv)
- refactor: move ColorModeService setup from default-header to app component
- chore(karma.conf): add custom chrome launcher with `--disable-search-engine-choice-screen` flag

---

#### `5.2.5`

- chore(dependencies): update to `Angular 18.1`
- refactor(aside): update tabs to the latest api
- refactor(cards): card navigation update to the latest `tabs` api

---

#### `5.2.3`

- refactor(google-maps): refactor for `@googlemaps/js-api-loader`, extract data and resize observer services, major cleanup and rewrite
- refactor(placeholder): add an animation to placeholder image
- test(apps-email): minor cleanups
- fix(widgets): c-progress white with inverse()
- chore(dependencies): update

---

#### `5.2.0`

CoreUI Pro v5.2 for Angular 18

- chore(dependencies): update to `Angular 18`
- refactor(tabs): update to the latest api
- refactor: minor cleanups

---

#### `5.0.4`

- chore(dependencies): update

---

#### `5.0.3`

- chore(dependencies): update
- fix: add missing `aria-label` attributes etc
- refactor(tabs): add `role="tablist"`, minor cleanups

---

#### `5.0.2`

- chore(dependencies): update
- refactor(default-header): color modes dropdown

---

#### `5.0.0`

CoreUI Pro v5 for Angular 17

- chore(dependencies): update to `Angular 17.3`
- refactor: update to CoreUI v5 (styles, structure, api)
- refactor: standalone components app
- refactor: routes config
- refactor: update to chart.js v4
- refactor: project structure (containers->layout)
- refactor: use control flow
- refactor(progress): update to v5 component structure
- refactor(dashboard): main chart data - typings and theme switching fix
- fix(dashboard): missing custom tooltips on first render, refactor main chart scales

---
