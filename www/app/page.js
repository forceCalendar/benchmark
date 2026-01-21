'use client';

import { benchmarkResults } from '../data/benchmarkResults';
import { RecurrenceChart } from '../components/Charts';

export default function Home() {
  const { bundleSize, recurrence, versions, timestamp, environment } = benchmarkResults;

  const formatDate = (ts) => {
    if (!ts) return '—';
    const d = new Date(ts);
    return d.toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
  };

  const formatBytes = (bytes) => {
    if (!bytes) return '—';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const formatNum = (n) => {
    if (n === undefined || n === null) return '—';
    return n.toLocaleString();
  };

  const calcRatio = (a, b) => {
    if (!a || !b) return '—';
    return (a / b).toFixed(2) + 'x';
  };

  // Calculate totals from package arrays
  const fcTotal = bundleSize?.forceCalendar?.reduce((sum, p) => sum + (p.size || 0), 0) || bundleSize?.totals?.forceCalendar || 0;
  const fullTotal = bundleSize?.fullCalendar?.reduce((sum, p) => sum + (p.size || 0), 0) || bundleSize?.totals?.fullCalendar || 0;

  return (
    <main className="min-h-screen p-6 max-w-5xl mx-auto">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-xl text-zinc-100 mb-1">forceCalendar/benchmark</h1>
        <p className="text-zinc-500 text-sm">
          Honest performance comparison
        </p>
      </header>

      {/* Run Info */}
      <section className="mb-8">
        <div className="section-header">Run Info</div>
        <div className="panel">
          <table className="text-sm">
            <tbody>
              <tr>
                <td className="text-zinc-500 w-32">timestamp</td>
                <td className="code">{formatDate(timestamp)}</td>
              </tr>
              <tr>
                <td className="text-zinc-500">node</td>
                <td className="code">{environment?.node || '—'}</td>
              </tr>
              <tr>
                <td className="text-zinc-500">platform</td>
                <td className="code">{environment?.platform} / {environment?.arch}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Package Versions */}
      <section className="mb-8">
        <div className="section-header">Installed Packages</div>
        <div className="panel">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="text-zinc-400 text-xs uppercase mb-2">ForceCalendar</div>
              <table className="text-sm">
                <tbody>
                  {(bundleSize?.forceCalendar || []).map((p, i) => (
                    <tr key={i}>
                      <td className="text-emerald-400">{p.package}</td>
                      <td className="code text-zinc-500">@{p.version}</td>
                    </tr>
                  ))}
                  {versions?.['@forcecalendar/core'] && !bundleSize?.forceCalendar?.length && (
                    <>
                      <tr>
                        <td className="text-emerald-400">@forcecalendar/core</td>
                        <td className="code text-zinc-500">@{versions['@forcecalendar/core']}</td>
                      </tr>
                      <tr>
                        <td className="text-emerald-400">@forcecalendar/interface</td>
                        <td className="code text-zinc-500">@{versions['@forcecalendar/interface'] || '—'}</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
            <div>
              <div className="text-zinc-400 text-xs uppercase mb-2">FullCalendar</div>
              <table className="text-sm">
                <tbody>
                  {(bundleSize?.fullCalendar || []).map((p, i) => (
                    <tr key={i}>
                      <td className="text-zinc-400">{p.package}</td>
                      <td className="code text-zinc-500">@{p.version}</td>
                    </tr>
                  ))}
                  {versions?.['@fullcalendar/core'] && !bundleSize?.fullCalendar?.length && (
                    <>
                      <tr>
                        <td className="text-zinc-400">@fullcalendar/core</td>
                        <td className="code text-zinc-500">@{versions['@fullcalendar/core']}</td>
                      </tr>
                      <tr>
                        <td className="text-zinc-400">rrule</td>
                        <td className="code text-zinc-500">@{versions['rrule']}</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Bundle Size */}
      <section className="mb-8">
        <div className="section-header">Bundle Size (node_modules)</div>
        <div className="panel">
          <p className="text-zinc-500 text-sm mb-4">
            Installed size comparison for equivalent functionality.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="text-zinc-400 text-xs uppercase mb-2">ForceCalendar Stack</div>
              <table className="text-sm">
                <tbody>
                  {(bundleSize?.forceCalendar || []).map((p, i) => (
                    <tr key={i}>
                      <td className="text-emerald-400">{p.package}</td>
                      <td className="num code">{formatBytes(p.size)}</td>
                    </tr>
                  ))}
                  <tr className="border-t border-zinc-700">
                    <td className="text-zinc-300 font-medium">Total</td>
                    <td className="num code text-emerald-400">{formatBytes(fcTotal)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <div className="text-zinc-400 text-xs uppercase mb-2">FullCalendar Stack</div>
              <table className="text-sm">
                <tbody>
                  {(bundleSize?.fullCalendar || []).map((p, i) => (
                    <tr key={i}>
                      <td className="text-zinc-400">{p.package}</td>
                      <td className="num code">{formatBytes(p.size)}</td>
                    </tr>
                  ))}
                  <tr className="border-t border-zinc-700">
                    <td className="text-zinc-300 font-medium">Total</td>
                    <td className="num code">{formatBytes(fullTotal)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {fcTotal && fullTotal && (
            <div className="mt-4 pt-4 border-t border-zinc-800 text-sm">
              <span className="text-zinc-500">Ratio: </span>
              <span className="code">
                {fullTotal > fcTotal
                  ? `FullCalendar is ${(fullTotal / fcTotal).toFixed(1)}x larger`
                  : `ForceCalendar is ${(fcTotal / fullTotal).toFixed(1)}x larger`
                }
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Recurrence */}
      <section className="mb-8">
        <div className="section-header">Recurrence Expansion (RRULE)</div>
        <div className="panel">
          <p className="text-zinc-500 text-sm mb-4">
            ForceCalendar RecurrenceEngine vs rrule library. Both are pure JavaScript. Higher ops/sec = better.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="overflow-x-auto">
              <table className="text-sm">
                <thead>
                  <tr>
                    <th>pattern</th>
                    <th className="num">forcecalendar</th>
                    <th className="num">rrule</th>
                    <th className="num">ratio</th>
                  </tr>
                </thead>
                <tbody>
                  {(recurrence || []).map((row, i) => {
                    const fc = row.forceCalendar;
                    const rr = row.rrule;
                    const fcWins = fc > rr;
                    return (
                      <tr key={i}>
                        <td className="code text-zinc-400">{row.scenario}</td>
                        <td className={`num code ${fcWins ? 'text-emerald-400' : ''}`}>{formatNum(fc)}</td>
                        <td className={`num code ${!fcWins ? 'text-emerald-400' : ''}`}>{formatNum(rr)}</td>
                        <td className="num code text-zinc-500">
                          {fcWins ? calcRatio(fc, rr) : calcRatio(rr, fc)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="chart-container">
              <RecurrenceChart data={recurrence} />
            </div>
          </div>
        </div>
      </section>

      {/* Notes */}
      <section className="mb-8">
        <div className="section-header">Notes</div>
        <div className="panel text-sm text-zinc-500 space-y-2">
          <p>• All packages installed from npm (not local builds)</p>
          <p>• Bundle size = <code className="text-zinc-300">du -sb node_modules/package</code></p>
          <p>• Recurrence benchmarked with <code className="text-zinc-300">tinybench</code> (warmup + iterations)</p>
          <p>• We only compare what's fairly comparable</p>
          <p className="pt-2 border-t border-zinc-800 text-zinc-600">
            <strong>Why no rendering/memory benchmarks?</strong> ForceCalendar core is DOM-free,
            FullCalendar requires DOM. Comparing them would be misleading.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-sm text-zinc-600 border-t border-zinc-800 pt-4">
        <a href="https://github.com/forceCalendar/benchmark">github.com/forceCalendar/benchmark</a>
        <span className="mx-2">•</span>
        <a href="https://github.com/forceCalendar/core">@forcecalendar/core</a>
        <span className="mx-2">•</span>
        <a href="https://www.npmjs.com/package/@forcecalendar/core">npm</a>
      </footer>
    </main>
  );
}
