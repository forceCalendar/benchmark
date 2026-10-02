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

## October 2026 methodology update

The recurrence suite uses the default `RecurrenceEngineV2` with explicit UTC fixtures. Every output timestamp and expected occurrence count must match `rrule` before timing; failures exit nonzero. Each pattern has separate cold-instance (new engine/rule per operation) and warm-cache (reused instance) results. Shared timezone caches remain warm; cold does not mean a fresh process. ForceCalendar returns full event objects while rrule returns Dates, so allocation costs differ. These measurements do not establish browser rendering speed, DST performance, or general RFC conformance.

Reproduce the pinned release comparison with `npm ci`, `TZ=UTC npm run benchmark`, and `npm run update-dashboard`. Node/CPU/timezone metadata and exact installed versions are stored in `results/latest.json`. Run the fast parity gate with `TZ=UTC node src/benchmarks/recurrence.js --validate-only`. Timing runs require a UTC host for a controlled comparison; the parity-only gate can run in other host timezones. Core 2.5.7 fixes the host-DST recurrence drift found in 2.5.6. This does not redefine legacy UTC metadata conversions or instance-override bounds; see the core recurrence timezone contract.

Earlier results used the legacy engine, mixed cached and uncached workloads, and timezone-dependent fixtures. They are historical evidence and are superseded by this methodology; do not compare their ratios directly. Installed footprint is not minified or gzip browser transfer size.

Results record sample counts and the runner's reported margin of error. The dashboard calls a comparison inconclusive when mean-latency uncertainty intervals overlap. Shared-host timing can vary; ratios are workload-specific observations, not general speed guarantees.
