# 2 October 2026 release verification

## Current published releases

Core 2.5.7 (release commit and npm gitHead `5ab4dfe83000c81c885205858a427ba690e3e2f8`), Interface 1.9.0 (`6e3f6dec66fa13c89fe43f0317fc05b5816b6e92`). Core tarball SHA256: `59f497897ff0293addaf5f56300a74ee40ea55ba266956efe706a8a8870ef85a`. All 22 published runtime JavaScript files byte-match the release checkout. Registry SHA512 integrity is also verified.

Environment: Node 24.19.0, npm 11.9.0, Linux x64, Intel Xeon Platinum 8573C, 9 logical CPUs exposed. Timing uses a UTC host. This is shared virtualized execution without CPU isolation; timing variation is expected.

## Reproduce

In this repository: `npm ci`, `TZ=UTC npm run benchmark`, `npm run update-dashboard`. Fast parity gate: `TZ=UTC node src/benchmarks/recurrence.js --validate-only`; repeat with `TZ=America/Los_Angeles`, `Asia/Kolkata`, and `Australia/Melbourne`. Timing requires UTC for a controlled comparison, while parity-only checks allow other hosts. Exact dependency versions are pinned in the lockfile and recorded in `results/latest.json`.

In the core release checkout: `npm ci --ignore-scripts`, `TZ=UTC npm test`, `npm run quality`, `npm audit --json`, `npm audit signatures`. In interface: `npm ci --ignore-scripts`, then `npm install --no-save --package-lock=false --ignore-scripts @forcecalendar/core@2.5.7`, then `npm test -- --runInBand`. The interface release lock originally resolves core 2.5.4; the second step deliberately verifies the new published core without changing that release's lockfile.

## Verified results

Core release: 26 integration test files and declaration checks pass on UTC. Its cross-host test includes 174 independent native-Date fixtures on four hosts, or 696 fixture/host combinations across six event zones. Exact runtime-equivalent candidate full suites passed 26/26 on Melbourne and 25/26 on LA/Kolkata; remaining failures also occur in unmodified 2.5.6 and concern legacy conversions and V1 ancient dates. Quality passes with four existing lint warnings.

Interface: 291 tests in 20 suites pass against actual published core 2.5.7. Types and build/export checks passed. Its earlier unchanged 1.9.0 coverage run measured 84.08% lines, 82.46% statements, 73.28% branches, 83.12% functions; lint has zero errors and twelve existing warnings.

Core's release lock and interface's release lock report zero known npm dependency vulnerabilities including development dependencies. Fresh core signature verification covers 83 packages / 17 attestations. The benchmark installation, including published core 2.5.7 and interface 1.9.0, verifies 11 package signatures / 2 attestations and reports zero known dependency vulnerabilities. These are advisory/signature checks, not a penetration test or security certification. No new Snyk or browser CSP assessment was performed.

The dashboard initially had seven vulnerable dependencies (one critical, four high, one moderate, one low). Compatible dependency updates reduced these to zero and the static Next build passes.

Installed package footprint: forceCalendar core + interface 1,893,372 bytes; selected FullCalendar + plugins + rrule 3,098,735 bytes (1.64x). This includes source, declarations, maps and directory metadata. It is not browser transfer size or a claim of feature equivalence.

All ten recurrence scenario/cache-mode timestamp gates pass; the parity-only gate also passes on all four hosts (40 checks). Current timing classifies 4 comparisons as forceCalendar faster, 5 as rrule faster, and 1 as within reported sample uncertainty. Every measurement and loss is retained. Overlapping mean-latency margin-of-error intervals are labelled inconclusive. V2 returns full event objects while rrule returns Dates, so allocation costs differ. Cold mode creates new library instances but shared timezone/process caches remain warm. Rendering, startup, memory, all RFC patterns and broad DST performance are not measured.

## Correctness scope and history

The benchmark exposed core 2.5.6's cross-host recurrence drift: a UTC daily series at 09:00Z shifted to 10:00Z after LA's DST transition. Core 2.5.7 fixes generated recurrence start/end instants, event-zone stepping, seeking and rule-date handling. See [the precise contract](https://github.com/forceCalendar/core/blob/v2.5.7/docs/recurrence-timezones.md): legacy startUTC/endUTC metadata, instance overrides after generated bounds, and ancient-date/parser limitations remain. handleDST true/false now converge because stepping already resolves transitions.

`2026-10-02-legacy-run.json` preserves the flawed former harness run (legacy engine, unequal caches, weekly count mismatch). `2026-10-02-core-2.5.6.json` preserves the corrected earlier release measurement. Both are historical evidence superseded by current `latest.json`; neither supports broad performance claims. Earlier July results remain in git history. These current results were run manually with the commands above; the existing automation workflow was not changed by this update.
