'use client';

import { useState } from 'react';

export function LiveBenchmark() {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState(null);
  const [eventCount, setEventCount] = useState(1000);

  const runBenchmark = async () => {
    setIsRunning(true);
    setResults(null);

    // Generate test events
    const events = generateEvents(eventCount);

    // Benchmark: Array operations (simulating calendar operations)
    const iterations = 100;

    // Test 1: Event filtering by date range
    const filterStart = performance.now();
    for (let i = 0; i < iterations; i++) {
      const rangeStart = new Date('2024-06-01');
      const rangeEnd = new Date('2024-06-30');
      events.filter(e => e.start >= rangeStart && e.start <= rangeEnd);
    }
    const filterTime = (performance.now() - filterStart) / iterations;

    // Test 2: Event sorting
    const sortStart = performance.now();
    for (let i = 0; i < iterations; i++) {
      [...events].sort((a, b) => a.start - b.start);
    }
    const sortTime = (performance.now() - sortStart) / iterations;

    // Test 3: Event lookup by ID (Map vs Array)
    const eventMap = new Map(events.map(e => [e.id, e]));
    const testIds = events.slice(0, 100).map(e => e.id);

    const arrayLookupStart = performance.now();
    for (let i = 0; i < iterations; i++) {
      testIds.forEach(id => events.find(e => e.id === id));
    }
    const arrayLookupTime = (performance.now() - arrayLookupStart) / iterations;

    const mapLookupStart = performance.now();
    for (let i = 0; i < iterations; i++) {
      testIds.forEach(id => eventMap.get(id));
    }
    const mapLookupTime = (performance.now() - mapLookupStart) / iterations;

    // Test 4: Date calculations
    const dateCalcStart = performance.now();
    for (let i = 0; i < iterations; i++) {
      events.forEach(e => {
        const duration = e.end - e.start;
        const isMultiDay = e.start.toDateString() !== e.end.toDateString();
      });
    }
    const dateCalcTime = (performance.now() - dateCalcStart) / iterations;

    setResults({
      eventCount,
      filterTime: filterTime.toFixed(3),
      sortTime: sortTime.toFixed(3),
      arrayLookupTime: arrayLookupTime.toFixed(3),
      mapLookupTime: mapLookupTime.toFixed(3),
      dateCalcTime: dateCalcTime.toFixed(3),
      mapSpeedup: (arrayLookupTime / mapLookupTime).toFixed(1),
    });

    setIsRunning(false);
  };

  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-4">🧪 Live Browser Benchmark</h3>
      <p className="text-gray-400 mb-4">
        Run a quick benchmark in your browser to see real performance.
      </p>

      <div className="flex items-center gap-4 mb-6">
        <label className="text-gray-400">
          Events:
          <select
            value={eventCount}
            onChange={(e) => setEventCount(Number(e.target.value))}
            className="ml-2 bg-gray-800 border border-gray-700 rounded px-3 py-1 text-white"
            disabled={isRunning}
          >
            <option value={100}>100</option>
            <option value={500}>500</option>
            <option value={1000}>1,000</option>
            <option value={5000}>5,000</option>
            <option value={10000}>10,000</option>
          </select>
        </label>

        <button
          onClick={runBenchmark}
          disabled={isRunning}
          className="btn btn-primary disabled:opacity-50"
        >
          {isRunning ? 'Running...' : 'Run Benchmark'}
        </button>
      </div>

      {results && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-400">{results.filterTime}ms</div>
            <div className="text-gray-400 text-sm">Date Range Filter</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-400">{results.sortTime}ms</div>
            <div className="text-gray-400 text-sm">Sort by Date</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-400">{results.dateCalcTime}ms</div>
            <div className="text-gray-400 text-sm">Date Calculations</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-amber-400">{results.arrayLookupTime}ms</div>
            <div className="text-gray-400 text-sm">Array.find() Lookup</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-emerald-400">{results.mapLookupTime}ms</div>
            <div className="text-gray-400 text-sm">Map.get() Lookup</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-emerald-400">{results.mapSpeedup}x</div>
            <div className="text-gray-400 text-sm">Map vs Array Speedup</div>
          </div>
        </div>
      )}

      <p className="text-gray-500 text-sm mt-4">
        ForceCalendar uses Map-based storage for O(1) lookups, similar to the Map benchmark above.
      </p>
    </div>
  );
}

// Generate test events
function generateEvents(count) {
  const events = [];
  const startDate = new Date('2024-01-01');

  for (let i = 0; i < count; i++) {
    const eventStart = new Date(startDate);
    eventStart.setDate(eventStart.getDate() + Math.floor(Math.random() * 365));
    eventStart.setHours(8 + Math.floor(Math.random() * 10));

    const eventEnd = new Date(eventStart);
    eventEnd.setHours(eventEnd.getHours() + 1 + Math.floor(Math.random() * 3));

    events.push({
      id: `event-${i}`,
      title: `Event ${i}`,
      start: eventStart,
      end: eventEnd,
    });
  }

  return events;
}
