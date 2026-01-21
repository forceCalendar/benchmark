'use client';

import { benchmarkResults } from '../data/benchmarkResults';
import { RenderingChart, MemoryChart, RecurrenceChart, BundleSizeChart } from '../components/Charts';

export default function Home() {
  const { rendering, memory, recurrence, bundleSize, versions, timestamp, environment } = benchmarkResults;

  const formatDate = (ts) => {
    if (!ts) return '—';
    const d = new Date(ts);
    return d.toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
  };

  const formatNum = (n) => {
    if (n === undefined || n === null) return '—';
    return n.toLocaleString();
  };

  const calcRatio = (a, b) => {
    if (!a || !b) return '—';
    return (a / b).toFixed(2) + 'x';
  };

  return (
    <main className="min-h-screen p-6 max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-xl text-zinc-100 mb-1">forceCalendar/benchmark</h1>
        <p className="text-zinc-500 text-sm">
          Performance comparison: @forcecalendar/core vs @fullcalendar/core
        </p>
      </header>

      {/* Metadata */}
      <section className="mb-8">
        <div className="section-header">Run Info</div>
        <div className="panel">
          <table className="text-sm">
            <tbody>
              <tr>
                <td className="text-zinc-500 w-40">timestamp</td>
                <td className="code">{formatDate(timestamp)}</td>
              </tr>
              <tr>
                <td className="text-zinc-500">node</td>
                <td className="code">{environment?.node || '—'}</td>
              </tr>
              <tr>
                <td className="text-zinc-500">platform</td>
                <td className="code">{environment?.platform || '—'} / {environment?.arch || '—'}</td>
              </tr>
              <tr>
                <td className="text-zinc-500">@forcecalendar/core</td>
                <td className="code text-emerald-400">{versions?.['@forcecalendar/core'] || '—'}</td>
              </tr>
              <tr>
                <td className="text-zinc-500">@fullcalendar/core</td>
                <td className="code">{versions?.['@fullcalendar/core'] || '—'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Bundle Size */}
      <section className="mb-8">
        <div className="section-header">Bundle Size (node_modules)</div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="panel">
            <table className="text-sm">
              <thead>
                <tr>
                  <th>package</th>
                  <th className="num">size (KB)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-emerald-400">@forcecalendar/core</td>
                  <td className="num code">{formatNum(bundleSize?.forceCalendar?.core)}</td>
                </tr>
                <tr className="border-t border-zinc-700">
                  <td className="text-zinc-400">@fullcalendar/core</td>
                  <td className="num code">{formatNum(bundleSize?.fullCalendar?.core)}</td>
                </tr>
                <tr>
                  <td className="text-zinc-400">@fullcalendar/daygrid</td>
                  <td className="num code">{formatNum(bundleSize?.fullCalendar?.daygrid)}</td>
                </tr>
                <tr>
                  <td className="text-zinc-400">@fullcalendar/timegrid</td>
                  <td className="num code">{formatNum(bundleSize?.fullCalendar?.timegrid)}</td>
                </tr>
                <tr>
                  <td className="text-zinc-400">@fullcalendar/list</td>
                  <td className="num code">{formatNum(bundleSize?.fullCalendar?.list)}</td>
                </tr>
                <tr>
                  <td className="text-zinc-400">@fullcalendar/rrule</td>
                  <td className="num code">{formatNum(bundleSize?.fullCalendar?.rrule)}</td>
                </tr>
                <tr>
                  <td className="text-zinc-400">rrule</td>
                  <td className="num code">{formatNum(bundleSize?.fullCalendar?.rruleLib)}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="border-t border-zinc-700">
                  <td className="text-zinc-300 font-medium">forcecalendar total</td>
                  <td className="num code text-emerald-400">{formatNum(bundleSize?.forceCalendar?.total)}</td>
                </tr>
                <tr>
                  <td className="text-zinc-300 font-medium">fullcalendar total</td>
                  <td className="num code">{formatNum(bundleSize?.fullCalendar?.total)}</td>
                </tr>
                <tr className="border-t border-zinc-700">
                  <td className="text-zinc-500">ratio</td>
                  <td className="num code text-emerald-400">
                    {calcRatio(bundleSize?.fullCalendar?.total, bundleSize?.forceCalendar?.total)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="panel">
            <div className="chart-container">
              <BundleSizeChart data={bundleSize} />
            </div>
          </div>
        </div>
      </section>

      {/* Rendering Performance */}
      <section className="mb-8">
        <div className="section-header">Rendering Performance (ops/sec, higher = better)</div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="panel overflow-x-auto">
            <table className="text-sm">
              <thead>
                <tr>
                  <th>events</th>
                  <th className="num">forcecalendar</th>
                  <th className="num">fullcalendar</th>
                  <th className="num">ratio</th>
                </tr>
              </thead>
              <tbody>
                {(rendering || []).map((row, i) => {
                  const fc = row.forceCalendar;
                  const full = row.fullCalendar;
                  const fcWins = fc > full;
                  return (
                    <tr key={i}>
                      <td className="code">{formatNum(row.events || row.eventCount)}</td>
                      <td className={`num code ${fcWins ? 'text-emerald-400' : ''}`}>{formatNum(fc)}</td>
                      <td className={`num code ${!fcWins ? 'text-emerald-400' : ''}`}>{formatNum(full)}</td>
                      <td className="num code text-zinc-400">{calcRatio(fc, full)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="panel">
            <div className="chart-container">
              <RenderingChart data={rendering} />
            </div>
          </div>
        </div>
      </section>

      {/* Memory Usage */}
      <section className="mb-8">
        <div className="section-header">Memory Usage (KB heap, lower = better)</div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="panel overflow-x-auto">
            <table className="text-sm">
              <thead>
                <tr>
                  <th>events</th>
                  <th className="num">forcecalendar</th>
                  <th className="num">fullcalendar</th>
                  <th className="num">ratio</th>
                </tr>
              </thead>
              <tbody>
                {(memory || []).map((row, i) => {
                  const fc = row.forceCalendar;
                  const full = row.fullCalendar;
                  const fcWins = fc < full;
                  return (
                    <tr key={i}>
                      <td className="code">{formatNum(row.events || row.eventCount)}</td>
                      <td className={`num code ${fcWins ? 'text-emerald-400' : ''}`}>{formatNum(fc)}</td>
                      <td className={`num code ${!fcWins ? 'text-emerald-400' : ''}`}>{formatNum(full)}</td>
                      <td className="num code text-zinc-400">{calcRatio(full, fc)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="panel">
            <div className="chart-container">
              <MemoryChart data={memory} />
            </div>
          </div>
        </div>
      </section>

      {/* Recurrence */}
      <section className="mb-8">
        <div className="section-header">Recurrence Expansion (ops/sec, higher = better)</div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="panel overflow-x-auto">
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
                  const full = row.fullCalendar;
                  const fcWins = fc > full;
                  return (
                    <tr key={i}>
                      <td className="code text-zinc-400">{row.scenario || row.name}</td>
                      <td className={`num code ${fcWins ? 'text-emerald-400' : ''}`}>{formatNum(fc)}</td>
                      <td className={`num code ${!fcWins ? 'text-emerald-400' : ''}`}>{formatNum(full)}</td>
                      <td className="num code text-zinc-400">{calcRatio(fc, full)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="panel">
            <div className="chart-container">
              <RecurrenceChart data={recurrence} />
            </div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="mb-8">
        <div className="section-header">Methodology</div>
        <div className="panel text-sm text-zinc-400 space-y-2">
          <p>• Packages installed from npm registry (not local builds)</p>
          <p>• Benchmarks run with <code className="text-zinc-300">tinybench</code> (warmup + multiple iterations)</p>
          <p>• FullCalendar requires DOM; benchmarks use <code className="text-zinc-300">jsdom</code> in Node.js</p>
          <p>• Memory measured via <code className="text-zinc-300">process.memoryUsage().heapUsed</code></p>
          <p>• Bundle size = total <code className="text-zinc-300">node_modules</code> directory size after install</p>
          <p>• Recurrence comparison: ForceCalendar RecurrenceEngine vs <code className="text-zinc-300">rrule</code> library</p>
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
