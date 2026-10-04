# forceCalendar Benchmarks

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Honest, reproducible performance benchmarks: **forceCalendar vs FullCalendar** (and the `rrule` library). We publish every number — including the ones we lose — because trust matters more than marketing.

## What we measure

- **Bundle size** — installed size of the full forceCalendar stack (`@forcecalendar/core` + `@forcecalendar/interface`) vs the selected FullCalendar stack (core + daygrid + timegrid + list + rrule plugin + rrule)
- **Recurrence expansion** — RFC 5545 RRULE scenarios (daily, weekly, monthly, yearly, multi-year) measured with [tinybench](https://github.com/tinylibs/tinybench), ops/sec and average latency

We deliberately **do not** benchmark rendering or memory: `@forcecalendar/core` is DOM-free, so a rendering comparison against a full-UI library would not be apples-to-apples.

## Run it yourself

```bash
npm ci --ignore-scripts
npm run benchmark          # runs all suites, writes results/latest.json
npm run update-dashboard   # regenerates www/data/benchmarkResults.js
npm run benchmark:full     # both
```

Results include exact package versions and environment info (Node version, platform, arch) for reproducibility.

## Dashboard

`www/` contains a static Next.js + Chart.js dashboard that visualizes `results/latest.json`. An existing workflow listens for release events and schedules weekly runs. It currently updates core/comparison selectors but does not advance the Interface pin; a release event alone does not prove that release is reflected in the dashboard. Always inspect recorded versions and dates. This refresh does not change that workflow.

## Contributing

Found a benchmark that's unfair to either side? That's a bug — please open an issue. See the [contributing guide](https://github.com/forceCalendar/.github/blob/main/CONTRIBUTING.md).

## License

[MIT](LICENSE)

## October 2026 methodology update

The recurrence suite uses the default `RecurrenceEngineV2` with explicit UTC fixtures. Every output timestamp and expected occurrence count must match `rrule` before timing; failures exit nonzero. Each pattern has separate cold-instance (new engine/rule per operation) and warm-cache (reused instance) results. Shared timezone caches remain warm; cold does not mean a fresh process. ForceCalendar returns full event objects while rrule returns Dates, so allocation costs differ. These measurements do not establish browser rendering speed, DST performance, or general RFC conformance.

Reproduce the pinned release comparison with `npm ci`, `TZ=UTC npm run benchmark`, and `npm run update-dashboard`. Node/CPU/timezone metadata and exact installed versions are stored in `results/latest.json`. Run the fast parity gate with `TZ=UTC node src/benchmarks/recurrence.js --validate-only`. Timing runs require a UTC host for a controlled comparison; the parity-only gate can run in other host timezones. Core 2.5.7 fixes the host-DST recurrence drift found in 2.5.6. This does not redefine legacy UTC metadata conversions or instance-override bounds; see the core recurrence timezone contract.

Earlier results used the legacy engine, mixed cached and uncached workloads, and timezone-dependent fixtures. They are historical evidence and are superseded by this methodology; do not compare their ratios directly. Installed footprint is not minified or gzip browser transfer size.

Results record sample counts and the runner's reported margin of error. The dashboard calls a comparison inconclusive when mean-latency uncertainty intervals overlap. Shared-host timing can vary; ratios are workload-specific observations, not general speed guarantees.

## 4 October 2026 evidence refresh

The current comparison pins Core **2.5.7**, Interface **1.9.1**, the FullCalendar packages **6.1.21**, `rrule` **2.8.1**, and `tinybench` **2.9.0**. See [dated verification and limitations](results/2026-10-04-methodology.md). The previous Core 2.5.7 / Interface 1.9.0 run is preserved in [its dated archive](results/2026-10-02-core-2.5.7-interface-1.9.0.json).

After regenerating data, run `npm test` to check exact version consistency, complete measurements, uncertainty-based winners, and raw/dashboard agreement. The recurrence fixture gate remains separate from these artifact checks.

The 4 October dashboard dependency audit has **6 high-severity affected development/build package entries from one distinct braces advisory** through Tailwind and the Next lint plugin; its production-only audit and the benchmark dependency audit report zero. Earlier zero-advisory results are dated historical checks, not a statement about current dependency security. No dependency remediation or security/workflow changes are included in this refresh.

### Supported dashboard linting

`npm --prefix www run lint` now runs ESLint **10.12.0** with core JavaScript recommended rules, the official Next **16.3.8** Core Web Vitals plugin, and React Hooks **7.1.1** recommended rules. These selected supported presets do not include the full `eslint-config-next` React, accessibility or import-rule suite. ESLint 10 natively tracks JSX references; the full Next config currently depends on `eslint-plugin-react` whose ESLint peer range stops at 9.

Lint completes with zero errors and one existing root-layout custom-font warning. The theme toggle now subscribes to the document theme with `useSyncExternalStore`; three focused snapshot/subscription tests bring `npm test` to seven passing tests. The original five-entry dashboard advisory result is retained in the verification JSON; adding the Next lint plugin adds one affected path to the same braces advisory, not a second advisory.
