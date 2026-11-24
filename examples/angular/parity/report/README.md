# Angular 19 -> 21 parity report

Baseline: Angular 19.1 production build of `main`, served on http://localhost:4000.
Upgraded: Angular 21.2 (`ng serve`) on http://localhost:4200.
The same Playwright specs (`parity/specs`) run against both projects.

## Results

26 passed, 0 failed (13 specs x 2 projects), 0 retries, 0 flaky; stable across 4 consecutive runs.

| Spec file              | Flow                                                                | baseline | upgraded |
| ---------------------- | ------------------------------------------------------------------- | -------- | -------- |
| page.spec.ts           | page renders every example section (no new console errors)          | pass     | pass     |
| page.spec.ts           | USA banner expands                                                  | pass     | pass     |
| alert-button.spec.ts   | wrapped alert updates when the wrapped button is clicked            | pass     | pass     |
| accordion.spec.ts      | accordion items toggle and the nested choice list drives the alert  | pass     | pass     |
| autocomplete.spec.ts   | autocomplete filters grouped items and selects one                  | pass     | pass     |
| choices.spec.ts        | checkbox and radio reveal their checked children                    | pass     | pass     |
| choices.spec.ts        | month picker select all / clear all respects disabled months        | pass     | pass     |
| dialogs.spec.ts        | modal dialog opens and closes via Confirm and the close button      | pass     | pass     |
| dialogs.spec.ts        | drawer opens with heading, footer and nested accordion, then closes | pass     | pass     |
| dialogs.spec.ts        | third party external link shows the leaving-site dialog             | pass     | pass     |
| review-tooltip.spec.ts | review list renders one entry per item with edit links              | pass     | pass     |
| review-tooltip.spec.ts | tooltip shows its content when the trigger is clicked               | pass     | pass     |
| review-tooltip.spec.ts | icons render                                                        | pass     | pass     |

## Screenshots (baseline left, upgraded right)

| Screenshot                                              | Size (baseline / upgraded) | Pixel diff |
| ------------------------------------------------------- | -------------------------- | ---------- |
| [full-page](side-by-side/full-page.png)                 | 1280x3358 / 1280x3358      | 0.000%     |
| [alert-after-click](side-by-side/alert-after-click.png) | 1280x3358 / 1280x3358      | 0.000%     |
| [autocomplete-open](side-by-side/autocomplete-open.png) | 1280x3358 / 1280x3358      | 0.000%     |
| [modal-open](side-by-side/modal-open.png)               | 1280x3358 / 1280x3358      | 0.000%     |
| [drawer-open](side-by-side/drawer-open.png)             | 1280x3358 / 1280x3358      | 0.000%     |

Pixel diff = share of pixels where any RGBA channel differs by more than 30 (`compose.mjs`).

## Known baseline behavior kept

- The page logs `Translation key 'alert.warning' does not resolve to a string.` (a `<ds-alert variation="warning">` in the drawer; the
  web component expects `warn`). It is present in both apps and allow-listed by exact text in `page.spec.ts`; any other console error fails.

## Reproduce

```sh
# from the repo root
npm ci && npm run build:tokens && npm run build:core

# baseline (Angular 19) on :4000, from a worktree of main
git worktree add ../baseline origin/main
(cd ../baseline && npm ci && npm run build:tokens && npm run build:core \
  && cd examples/angular && npx ng build && npx http-server dist/demo/browser -p 4000 -s)

# upgraded (Angular 21) on :4200
cd examples/angular && npm start

# suite + side-by-side report
cd examples/angular
npx playwright install chromium
npm run parity          # runs baseline + upgraded projects
npm run parity:report   # writes parity/report/side-by-side/*.png and diff.json
```
