'use client';

import { benchmarkResults } from '../data/benchmarkResults';
import { BundleSizeChart, RecurrenceChart } from '../components/Charts';
import Nav from '../components/Nav';

export default function Home() {
  const { bundleSize, recurrence, versions, timestamp, environment } = benchmarkResults;

  const formatDate = (ts) => {
    if (!ts) return '--';
    const d = new Date(ts);
    return d.toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
  };

  const formatBytes = (bytes) => {
    if (!bytes && bytes !== 0) return '--';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const formatNum = (n) => {
    if (n === undefined || n === null) return '--';
    return n.toLocaleString();
  };

  const fcTotal = bundleSize?.totals?.forceCalendar || bundleSize?.forceCalendar?.reduce((s, p) => s + (p.size || 0), 0) || 0;
  const fullTotal = bundleSize?.totals?.fullCalendar || bundleSize?.fullCalendar?.reduce((s, p) => s + (p.size || 0), 0) || 0;
  const sizeRatio = fullTotal && fcTotal ? (fullTotal / fcTotal).toFixed(1) : '--';

  const recurrenceWins = (recurrence || []).reduce((acc, row) => {
    if (row.forceCalendar > row.rrule) acc.fc++;
    else acc.rrule++;
    return acc;
  }, { fc: 0, rrule: 0 });

  return (
    <div className="min-h-screen">
      <Nav />

      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800/80">
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500">Benchmark</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            forceCalendar Benchmark
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl text-base leading-relaxed">
            An honest, reproducible comparison between ForceCalendar and FullCalendar.
            We measure what can be fairly compared and clearly note what cannot.
          </p>
          <div className="mt-6 p-4 rounded-lg border border-slate-200 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-900/30 max-w-2xl">
            <p className="text-sm text-slate-500 leading-relaxed">
              FullCalendar is an excellent calendar library that powers thousands of applications.
              This benchmark is not a critique of FullCalendar — it exists to help developers in strict
              enterprise environments (Salesforce Locker Service, strict CSP) understand the trade-offs.
              forceCalendar was built for environments where most calendar libraries cannot run due to
              security restrictions, not to replace FullCalendar in general use.
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-12">

        {/* Environment */}
        <section>
          <div className="section-label">Environment</div>
          <div className="panel px-5 py-4">
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
              <div>
                <span className="text-slate-400 dark:text-slate-500">Last run </span>
                <span className="mono text-xs">{formatDate(timestamp)}</span>
              </div>
              <div>
                <span className="text-slate-400 dark:text-slate-500">Node </span>
                <span className="mono text-xs">{environment?.node || '--'}</span>
              </div>
              <div>
                <span className="text-slate-400 dark:text-slate-500">Platform </span>
                <span className="mono text-xs">{environment?.platform}/{environment?.arch}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Package Versions */}
        <section id="packages">
          <div className="section-label">Tested Packages</div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="panel overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-900/40">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400/80">ForceCalendar</span>
              </div>
              <table>
                <tbody>
                  {(bundleSize?.forceCalendar || []).map((p, i) => (
                    <tr key={i}>
                      <td className="text-slate-700 dark:text-slate-300 text-sm">{p.package}</td>
                      <td className="num text-sm">
                        <span className="mono text-xs text-slate-500 dark:text-slate-400">{versions?.[p.package] || p.version || '--'}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="panel overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-900/40">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">FullCalendar</span>
              </div>
              <table>
                <tbody>
                  {(bundleSize?.fullCalendar || []).map((p, i) => (
                    <tr key={i}>
                      <td className="text-slate-500 dark:text-slate-400 text-sm">{p.package}</td>
                      <td className="num text-sm">
                        <span className="mono text-xs text-slate-400 dark:text-slate-500">{p.version || '--'}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Bundle Size Section */}
        <section id="bundle-size">
          <div className="section-label">Bundle Size</div>
          <div className="panel overflow-hidden">
            <div className="grid grid-cols-3 divide-x divide-slate-200 dark:divide-slate-800/80 border-b border-slate-200 dark:border-slate-800/80">
              <div className="px-6 py-5 text-center">
                <div className="metric-value text-emerald-600 dark:text-emerald-400">{formatBytes(fcTotal)}</div>
                <div className="metric-label">ForceCalendar</div>
              </div>
              <div className="px-6 py-5 text-center">
                <div className="metric-value text-slate-500 dark:text-slate-400">{formatBytes(fullTotal)}</div>
                <div className="metric-label">FullCalendar</div>
              </div>
              <div className="px-6 py-5 text-center">
                <div className="metric-value">{sizeRatio}x</div>
                <div className="metric-label">Size Ratio</div>
              </div>
            </div>

            <div className="px-6 py-6 border-b border-slate-200 dark:border-slate-800/80">
              <div className="h-28">
                <BundleSizeChart fcTotal={fcTotal} fullTotal={fullTotal} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800/80">
              <div className="p-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400/80 mb-3">ForceCalendar Stack</div>
                <table>
                  <thead><tr><th>Package</th><th className="num">Size</th></tr></thead>
                  <tbody>
                    {(bundleSize?.forceCalendar || []).map((p, i) => (
                      <tr key={i}>
                        <td className="mono text-xs text-slate-700 dark:text-slate-300">{p.package}</td>
                        <td className="num mono text-xs text-slate-700 dark:text-slate-300">{formatBytes(p.size)}</td>
                      </tr>
                    ))}
                    <tr>
                      <td className="text-slate-900 dark:text-slate-200 font-medium text-sm">Total</td>
                      <td className="num mono text-xs text-emerald-600 dark:text-emerald-400 font-semibold">{formatBytes(fcTotal)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">FullCalendar Stack</div>
                <table>
                  <thead><tr><th>Package</th><th className="num">Size</th></tr></thead>
                  <tbody>
                    {(bundleSize?.fullCalendar || []).map((p, i) => (
                      <tr key={i}>
                        <td className="mono text-xs text-slate-500 dark:text-slate-400">{p.package}</td>
                        <td className="num mono text-xs text-slate-500 dark:text-slate-400">{formatBytes(p.size)}</td>
                      </tr>
                    ))}
                    <tr>
                      <td className="text-slate-900 dark:text-slate-200 font-medium text-sm">Total</td>
                      <td className="num mono text-xs text-slate-700 dark:text-slate-300 font-semibold">{formatBytes(fullTotal)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-100/50 dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-800/80">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Installed size measured via <span className="mono text-xs text-slate-600 dark:text-slate-400">du -sb node_modules/package</span>.
                All packages installed from npm, not local builds.
                ForceCalendar ships core + interface for equivalent functionality to FullCalendar&apos;s multi-package stack.
              </p>
            </div>
          </div>
        </section>

        {/* Recurrence Performance */}
        <section id="recurrence">
          <div className="section-label">Recurrence Expansion</div>
          <div className="panel overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800/80">
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                ForceCalendar&apos;s built-in <span className="mono text-xs text-slate-700 dark:text-slate-300">RecurrenceEngine</span> vs
                the standalone <span className="mono text-xs text-slate-700 dark:text-slate-300">rrule</span> library (v{versions?.rrule}).
                Both are pure JavaScript implementations processing RFC 5545 recurrence rules.
                Higher ops/sec is better.
              </p>
              {recurrenceWins.fc < recurrenceWins.rrule && (
                <p className="text-sm text-slate-400 dark:text-slate-500 mt-3">
                  Note: rrule wins {recurrenceWins.rrule} of {recurrence?.length} test cases.
                  It is a mature, dedicated library and is faster for recurrence expansion.
                  ForceCalendar&apos;s engine trades raw speed for tighter integration with its event model.
                </p>
              )}
            </div>

            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>Pattern</th>
                    <th className="num">Occurrences</th>
                    <th className="num">ForceCalendar ops/s</th>
                    <th className="num">rrule ops/s</th>
                    <th className="num">Winner</th>
                  </tr>
                </thead>
                <tbody>
                  {(recurrence || []).map((row, i) => {
                    const fcWins = row.forceCalendar > row.rrule;
                    const ratio = fcWins
                      ? (row.forceCalendar / row.rrule).toFixed(1)
                      : (row.rrule / row.forceCalendar).toFixed(1);
                    return (
                      <tr key={i}>
                        <td className="mono text-xs text-slate-700 dark:text-slate-300">{row.scenario}</td>
                        <td className="num mono text-xs text-slate-400 dark:text-slate-500">
                          {formatNum(row.occurrences?.forceCalendar || row.occurrences?.rrule)}
                        </td>
                        <td className={`num mono text-xs ${fcWins ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-slate-400 dark:text-slate-500'}`}>
                          {formatNum(row.forceCalendar)}
                        </td>
                        <td className={`num mono text-xs ${!fcWins ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-slate-400 dark:text-slate-500'}`}>
                          {formatNum(row.rrule)}
                        </td>
                        <td className="num text-xs">
                          <span className={fcWins ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'}>
                            {fcWins ? 'FC' : 'rrule'} ({ratio}x)
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-6 border-t border-slate-200 dark:border-slate-800/80">
              <div className="h-72">
                <RecurrenceChart data={recurrence} />
              </div>
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section id="methodology">
          <div className="section-label">Methodology</div>
          <div className="panel overflow-hidden">
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800/80">
              <div className="p-6">
                <h3 className="text-sm font-semibold mb-3">What we compare</h3>
                <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5 shrink-0">+</span>
                    <span><strong className="text-slate-700 dark:text-slate-300">Bundle size</strong> -- installed node_modules footprint for equivalent calendar functionality</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5 shrink-0">+</span>
                    <span><strong className="text-slate-700 dark:text-slate-300">Recurrence expansion</strong> -- pure JS performance generating occurrences from RRULE patterns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5 shrink-0">+</span>
                    <span><strong className="text-slate-700 dark:text-slate-300">Reproducibility</strong> -- all benchmarks use tinybench with warmup, run on the same machine, same Node version</span>
                  </li>
                </ul>
              </div>
              <div className="p-6">
                <h3 className="text-sm font-semibold mb-3">What we do not compare</h3>
                <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-300 dark:text-slate-600 mt-0.5 shrink-0">--</span>
                    <span><strong className="text-slate-700 dark:text-slate-300">DOM rendering</strong> -- ForceCalendar core is DOM-free; FullCalendar renders directly. Apples to oranges.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-300 dark:text-slate-600 mt-0.5 shrink-0">--</span>
                    <span><strong className="text-slate-700 dark:text-slate-300">Memory usage</strong> -- different architectures make heap comparisons misleading</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-300 dark:text-slate-600 mt-0.5 shrink-0">--</span>
                    <span><strong className="text-slate-700 dark:text-slate-300">Feature parity</strong> -- both libraries have capabilities the other does not; this is not a feature comparison</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="p-6 border-t border-slate-200 dark:border-slate-800/80">
              <h3 className="text-sm font-semibold mb-3">How we measure</h3>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-slate-300 dark:text-slate-600 mt-0.5 shrink-0">1.</span>
                  <span><strong className="text-slate-700 dark:text-slate-300">Bundle size</strong> is measured with <code className="mono text-xs text-slate-700 dark:text-slate-300">du -sb</code> on each package&apos;s <code className="mono text-xs text-slate-700 dark:text-slate-300">node_modules/</code> directory. This is the installed size on disk, not minified or gzipped transfer size. All packages are installed fresh from npm.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-300 dark:text-slate-600 mt-0.5 shrink-0">2.</span>
                  <span><strong className="text-slate-700 dark:text-slate-300">Recurrence</strong> is benchmarked with <a href="https://github.com/tinylibs/tinybench" className="text-slate-700 dark:text-slate-300 underline decoration-slate-300 dark:decoration-slate-600 hover:text-slate-900 dark:hover:text-slate-100">tinybench</a>, which runs each function through a warmup phase then measures operations per second over multiple iterations. Test patterns: daily (365 and 1825 occurrences), weekly MWF (156), monthly on the 15th (60), and yearly (10).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-300 dark:text-slate-600 mt-0.5 shrink-0">3.</span>
                  <span><strong className="text-slate-700 dark:text-slate-300">Automation</strong> — benchmarks re-run automatically via GitHub Actions on every release and weekly on Sundays. Results are committed to the repository and this dashboard updates on each push.</span>
                </li>
              </ul>
            </div>
            <div className="px-6 py-4 bg-slate-100/50 dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-800/80">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Results may vary across environments.
                The <a href="https://github.com/forceCalendar/benchmark" className="text-slate-500 dark:text-slate-400 underline decoration-slate-300 dark:decoration-slate-600 hover:text-slate-700 dark:hover:text-slate-300">source code and runner</a> are open source — verify the methodology and reproduce the results yourself.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 mt-8">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-6 text-sm">
              <a href="https://github.com/forceCalendar/benchmark">GitHub</a>
              <a href="https://github.com/forceCalendar/core">@forcecalendar/core</a>
              <a href="https://www.npmjs.com/package/@forcecalendar/core">npm</a>
              <a href="https://forcecalendar.org">forcecalendar.org</a>
            </div>
            <div className="text-xs text-slate-400 dark:text-slate-600">
              MIT License
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
