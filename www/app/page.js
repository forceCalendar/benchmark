'use client';

import { benchmarkResults, calculateSpeedup } from '../data/benchmarkResults';
import { RenderingChart, MemoryChart, RecurrenceChart, BundleSizeChart } from '../components/Charts';
import { LiveBenchmark } from '../components/LiveBenchmark';

export default function Home() {
  const { rendering, memory, recurrence, bundleSize, features, versions, timestamp } = benchmarkResults;

  // Format the timestamp for display
  const lastUpdated = timestamp ? new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }) : null;

  // Calculate summary stats
  const render10k = rendering.find(r => r.events === 10000);
  const memory10k = memory.find(m => m.events === 10000);
  const avgRecurrenceSpeedup = recurrence.reduce((sum, r) =>
    sum + (r.forceCalendar / r.fullCalendar), 0) / recurrence.length;

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-blue-500">ForceCalendar</span>
            <span className="text-gray-500 mx-4">vs</span>
            <span className="text-amber-500">FullCalendar</span>
          </h1>
          <p className="text-xl text-gray-400">
            Performance Benchmark Comparison
          </p>
          {versions && (
            <div className="mt-4 text-sm text-gray-500">
              <span className="text-blue-400">@forcecalendar/core@{versions['@forcecalendar/core']}</span>
              <span className="mx-2">vs</span>
              <span className="text-amber-400">@fullcalendar/core@{versions['@fullcalendar/core']}</span>
            </div>
          )}
          {lastUpdated && (
            <p className="mt-2 text-xs text-gray-600">
              Last updated: {lastUpdated}
            </p>
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="stat-card">
            <div className="stat-value winner">
              {calculateSpeedup(render10k.forceCalendar, render10k.fullCalendar)}x
            </div>
            <div className="stat-label">Faster Rendering</div>
            <div className="text-xs text-gray-500 mt-1">10K events</div>
          </div>
          <div className="stat-card">
            <div className="stat-value winner">
              {calculateSpeedup(memory10k.fullCalendar, memory10k.forceCalendar)}x
            </div>
            <div className="stat-label">Less Memory</div>
            <div className="text-xs text-gray-500 mt-1">10K events</div>
          </div>
          <div className="stat-card">
            <div className="stat-value winner">
              {avgRecurrenceSpeedup.toFixed(1)}x
            </div>
            <div className="stat-label">Faster Recurrence</div>
            <div className="text-xs text-gray-500 mt-1">avg across tests</div>
          </div>
          <div className="stat-card">
            <div className="stat-value winner">
              {(bundleSize.fullCalendar.total / bundleSize.forceCalendar.total).toFixed(1)}x
            </div>
            <div className="stat-label">Smaller Bundle</div>
            <div className="text-xs text-gray-500 mt-1">total size</div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">⚡ Rendering Performance</h2>
            <div className="h-64">
              <RenderingChart data={rendering} />
            </div>
          </div>
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">💾 Memory Usage</h2>
            <div className="h-64">
              <MemoryChart data={memory} />
            </div>
          </div>
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">🔄 Recurrence Expansion</h2>
            <div className="h-64">
              <RecurrenceChart data={recurrence} />
            </div>
          </div>
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">📦 Bundle Size</h2>
            <div className="h-64">
              <BundleSizeChart data={bundleSize} />
            </div>
          </div>
        </div>

        {/* Feature Comparison */}
        <div className="card mb-16">
          <h2 className="text-xl font-semibold mb-4">✨ Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4 text-gray-400">Feature</th>
                  <th className="text-center py-3 px-4 text-blue-400">ForceCalendar</th>
                  <th className="text-center py-3 px-4 text-amber-400">FullCalendar</th>
                </tr>
              </thead>
              <tbody>
                {features.map((f, i) => (
                  <tr key={i} className="border-b border-gray-800/50">
                    <td className="py-3 px-4">{f.feature}</td>
                    <td className="text-center py-3 px-4">
                      {f.forceCalendar ? (
                        <span className="text-emerald-400">✓</span>
                      ) : (
                        <span className="text-red-400">✗</span>
                      )}
                    </td>
                    <td className="text-center py-3 px-4">
                      {f.fullCalendar ? (
                        <span className="text-emerald-400">✓</span>
                      ) : (
                        <span className="text-red-400">✗</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Benchmark */}
        <LiveBenchmark />

        {/* Methodology */}
        <div className="card mt-16">
          <h2 className="text-xl font-semibold mb-4">📋 Methodology</h2>
          <div className="text-gray-400 space-y-2">
            <p>• All benchmarks run on identical hardware with Node.js v20.x</p>
            <p>• Same test data generated for both libraries</p>
            <p>• Multiple iterations with warmup to ensure accuracy</p>
            <p>• FullCalendar tested with jsdom since it requires DOM</p>
            <p>• Bundle sizes measured as installed node_modules size</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 mt-16">
          <p>
            <a href="https://github.com/forceCalendar/benchmark" className="text-blue-400 hover:underline">
              View source on GitHub
            </a>
            {' • '}
            <a href="https://github.com/forceCalendar/core" className="text-blue-400 hover:underline">
              ForceCalendar Core
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
