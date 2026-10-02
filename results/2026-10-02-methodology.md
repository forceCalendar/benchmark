# 2 October 2026 verification

## Tested releases

- Core 2.5.6: release commit `0d8d71c419d6702d60cfd1ff1827f0d27e4856cb`.
- Interface 1.9.0: release commit `6e3f6dec66fa13c89fe43f0317fc05b5816b6e92`.
- Benchmark baseline: `e2977db34a65974478114cc54248980457b343f0`.
- Node 24.19.0, npm 11.9.0, Linux x64, Intel Xeon Platinum 8573C, 9 logical CPUs exposed. Shared virtualized execution; no CPU isolation guarantee.

## Reproduction

In the benchmark repository: `npm ci`, `TZ=UTC npm run benchmark`, `npm run update-dashboard`. Fast semantic gate: `TZ=UTC node src/benchmarks/recurrence.js --validate-only`. Non-UTC hosts are intentionally rejected, rather than allowing incorrect output into performance charts. Exact dependency versions are pinned in the lockfile; result JSON records installed versions and environment.

In each release checkout: `npm ci --ignore-scripts`, `npm audit --json`, `npm audit signatures`, `npm test`. Interface additionally uses `npm test -- --runInBand --coverage`, `npm run build`, `node test-build.js`, `npx eslint src`. Core uses `npm run quality`. Interface's release lockfile resolves core 2.5.4, so its full suite was also repeated after `npm install --no-save --package-lock=false --ignore-scripts @forcecalendar/core@2.5.6`.

## Results and limits

Core: 25 integration test files passed, declaration consumer checks passed, lint 0 errors / 4 existing warnings, formatting passed. Interface: 291 tests in 20 suites passed on both locked core and core 2.5.6, declarations/build/export checks passed, lint 0 errors / 12 existing warnings. Coverage: 84.08% lines, 82.46% statements, 73.28% branches, 83.12% functions.

Both release lockfiles: zero known npm dependency vulnerabilities, including development dependencies. Registry signature verification: core 83 packages / 17 attestations; interface 503 packages / 128 attestations. This is a dependency advisory/signature check, not a penetration test or independent security certification. No new Snyk or browser CSP assessment was performed in this pass.

The benchmark runner has zero known npm dependency vulnerabilities. Its dashboard initially had 7 vulnerable dependencies (1 critical, 4 high, 1 moderate, 1 low); a compatible `npm audit fix --ignore-scripts` reduced this to zero, and the static Next build passed.

Installed package footprint: forceCalendar core + interface 1,885,752 bytes; selected FullCalendar + plugins + rrule 3,098,735 bytes (1.64x). These are on-disk package directories including declarations/source/maps and directory metadata, not browser transfer size or feature equivalence.

The corrected recurrence comparison uses default V2 and validates every UTC timestamp, not just counts. All ten scenario/cache-mode gates pass under UTC. ForceCalendar is faster in 2 of 5 cold-instance scenarios and 0 of 5 warm-cache scenarios in this run. See latest.json for every latency and throughput, including losses. V2 returns full occurrence objects while rrule returns Dates. Both library instances are recreated in cold mode; shared timezone/process caches remain warm. This does not measure rendering, startup, memory, all RFC patterns, or DST performance.

## Correctness issue discovered

Separate multi-zone validation exposed a core 2.5.6 V2 recurrence defect: a UTC daily series starting 2024-01-01T09:00Z drifts to 10:00Z after the host's November DST transition when executed in America/Los_Angeles. An isolated correction is in progress. Passing UTC performance scenarios must not be presented as cross-timezone correctness or production readiness for this affected use case.

The preserved legacy run uses the former benchmark methodology. It has a weekly count mismatch (155 vs 156), legacy-engine selection, and unequal cache behavior. It is retained for transparency and must not support new performance claims. Earlier July results remain accessible in repository history.
