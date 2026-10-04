# 4 October 2026 benchmark verification

## Interpretation first

This is a new shared-host measurement, **not a release-to-release performance comparison**. The 2 October run used an Intel Xeon Platinum 8573C; this run used an AMD EPYC 9V74 80-Core Processor with 9 logical CPUs exposed. Both used Node 24.19.0. Differences in timing must not be attributed to Interface 1.9.1. The recurrence benchmark invokes Core's V2 engine, not the Interface renderer.

All ten measured rows are retained: forceCalendar wins the five cold-instance cases and `rrule` wins the five warm-cache cases. This does not establish a general speed guarantee or full timezone correctness.

## Exact release inputs

- `@forcecalendar/core` **2.5.7**, npm gitHead [`5ab4dfe83000c81c885205858a427ba690e3e2f8`](https://github.com/forceCalendar/core/commit/5ab4dfe83000c81c885205858a427ba690e3e2f8)
- `@forcecalendar/interface` **1.9.1**, npm gitHead [`d2f5749d96740e99c970cb5d8a58abdb27542b01`](https://github.com/forceCalendar/interface/commit/d2f5749d96740e99c970cb5d8a58abdb27542b01)
- FullCalendar core/daygrid/timegrid/list/rrule plugin **6.1.21**, standalone `rrule` **2.8.1**, `tinybench` **2.9.0**

The manifest and lockfile pin these exact benchmark versions. Packages were installed from npm with install scripts disabled. Registry integrity/provenance metadata, lockfile SHA256 hashes and full audit responses are recorded in [verification JSON](2026-10-04-verification.json). This refresh does not claim a new source-to-tarball byte comparison or rerun Core/Interface's full release test suites.

Environment: Linux x64, Node 24.19.0, npm 11.9.0, AMD EPYC 9V74, 9 exposed logical CPUs, UTC timing host. Shared virtualized execution has no CPU isolation. The raw measurement began at **2026-10-04T03:19:42.406Z**.

## Results and checks

- [Dated raw results](2026-10-04-core-2.5.7-interface-1.9.1.json) and `latest.json` contain the same run, including sample counts, mean latency, reported margins of error, losses and package versions.
- All 10 scenario/cache-mode gates matched every UTC start timestamp and expected occurrence count before timing. The parity-only gate also passed in UTC, America/Los_Angeles, Asia/Kolkata and Australia/Melbourne: **40 checks**. The fixtures remain UTC events even when the host timezone changes.
- Installed selected-package footprint: **1,894,334 bytes** for Core + Interface, versus **3,098,735 bytes** for the selected FullCalendar + plugins + rrule stack, a **1.636x** ratio. This includes source, declarations, maps and directory metadata. It is not a browser-transfer measurement or a claim of feature parity.
- **4 artifact tests pass**: exact version/lock consistency, complete finite measurements and uncertainty-based winners, complete package totals, and faithful raw-to-dashboard transformation including losses.
- The final static Next.js **16.3.8** build passes. Exported HTML checks pass for the release versions, timestamp, advisory and limitation text, recurrence rows, valid section anchors and two chart canvases.
- `npm run lint` in `www/` **fails**: its existing `next lint` script is unsupported by the installed Next version and is interpreted as a directory. No successful lint result is claimed. Build also emits the existing multiple-lockfile/workspace-root warning; npm emits an environment `http-proxy` configuration warning.
- Local visual/hydration verification is **blocked**: the cloud browser refused the local static server URL with `net::ERR_BLOCKED_BY_CLIENT`. Static output checks are not browser execution tests. No authentication or access setting was changed to bypass this.

## Dependency checks, dated 4 October

- Benchmark dependency audit: **0 known npm vulnerabilities**.
- Benchmark signature verification: **11 verified registry signatures**, **2 verified attestations**, exit code 0.
- Dashboard full dependency audit: **5 high-severity findings** in the development-tool graph (`braces`, `chokidar`, `fast-glob`, `micromatch`, `tailwindcss`). These share the upstream [braces stack-exhaustion advisory GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm).
- Dashboard production-only dependency audit: **0 known npm vulnerabilities**. This does not dismiss the build-tool exposure or constitute a security certification. No dependency remediation, major Tailwind migration, new Snyk run, CSP assessment or penetration test was performed.

Historical zero-advisory results in the 2 October report describe the checks performed then. They are not current assurance.

## Reproduce

```sh
npm ci --ignore-scripts
TZ=UTC npm run benchmark
npm run update-dashboard
npm test
for zone in UTC America/Los_Angeles Asia/Kolkata Australia/Melbourne; do
  TZ="$zone" node src/benchmarks/recurrence.js --validate-only
done
npm audit --json
npm audit signatures
cd www
npm ci --ignore-scripts
npm run build
npm audit --json                 # currently exits 1: five high development findings
npm audit --omit=dev --json      # currently exits 0
npm run lint                    # currently fails: existing unsupported next lint script
```

## Limitations and preserved history

The methodology is unchanged: each pattern has cold-instance and warm-cache modes, full UTC start-timestamp parity is checked, and overlapping mean-latency uncertainty intervals are classified as inconclusive. Cold mode creates new library instances while shared process/timezone caches remain warm. ForceCalendar produces full event objects and rrule produces Dates, so allocation costs differ. The suite does not measure browser rendering, memory, startup, broad DST performance or all RFC 5545 patterns.

Core 2.5.7's precise [recurrence timezone contract](https://github.com/forceCalendar/core/blob/v2.5.7/docs/recurrence-timezones.md) continues to document legacy UTC metadata conversions, instance-override bounds and ancient-date/parser limitations. Passing this benchmark does not remove those limits.

The previous [Core 2.5.7 / Interface 1.9.0 raw run](2026-10-02-core-2.5.7-interface-1.9.0.json) is preserved byte-for-byte. Earlier [methodology notes](2026-10-02-methodology.md), Core 2.5.6 and legacy-harness runs remain unchanged. Legacy-harness ratios are not directly comparable.

These October 4 results were regenerated manually. The existing workflow was not changed: it updates the core/comparison selectors, but does not advance the Interface pin. A release event is not proof that the dashboard contains that release. No merge, production deployment, workflow or security-configuration change is part of this refresh.
