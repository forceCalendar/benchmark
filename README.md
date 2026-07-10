# forceCalendar Benchmarks

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Honest, reproducible performance benchmarks: **forceCalendar vs FullCalendar** (and the `rrule` library). We publish every number — including the ones we lose — because trust matters more than marketing.

## What we measure

- **Bundle size** — installed size of the full forceCalendar stack (`@forcecalendar/core` + `@forcecalendar/interface`) vs the equivalent FullCalendar stack (core + daygrid + timegrid + list + rrule plugin + rrule)
- **Recurrence expansion** — RFC 5545 RRULE scenarios (daily, weekly, monthly, yearly, multi-year) measured with [tinybench](https://github.com/tinylibs/tinybench), ops/sec and average latency

We deliberately **do not** benchmark rendering or memory: `@forcecalendar/core` is DOM-free, so a rendering comparison against a full-UI library would not be apples-to-apples.

## Run it yourself

```bash
npm install
npm run benchmark          # runs all suites, writes results/latest.json
npm run update-dashboard   # regenerates www/data/benchmarkResults.js
npm run benchmark:full     # both
```

Results include exact package versions and environment info (Node version, platform, arch) for reproducibility.

## Dashboard

`www/` contains a static Next.js + Chart.js dashboard that visualizes `results/latest.json`. Benchmarks re-run automatically when `@forcecalendar/core` publishes a release (via `repository_dispatch`).

## Contributing

Found a benchmark that's unfair to either side? That's a bug — please open an issue. See the [contributing guide](https://github.com/forceCalendar/.github/blob/main/CONTRIBUTING.md).

## License

[MIT](LICENSE)
