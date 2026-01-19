/**
 * Rendering Performance Benchmark
 *
 * Measures time to load and render events at different scales
 */

import { Bench } from 'tinybench';
import { generateEvents, toFullCalendarFormat } from '../data/generators.js';
import * as ForceCalendar from '../setup/forcecalendar.js';
import * as FullCalendar from '../setup/fullcalendar.js';

const EVENT_COUNTS = [100, 1000, 5000, 10000];

async function runBenchmark() {
  console.log('='.repeat(60));
  console.log('RENDERING PERFORMANCE BENCHMARK');
  console.log('='.repeat(60));
  console.log('');

  const results = [];

  for (const count of EVENT_COUNTS) {
    console.log(`\n📊 Testing with ${count.toLocaleString()} events...\n`);

    // Generate test data
    const fcEvents = generateEvents(count);
    const fullCalEvents = toFullCalendarFormat(fcEvents);

    const bench = new Bench({ time: 1000 });

    // ForceCalendar benchmark
    bench.add(`ForceCalendar (${count} events)`, () => {
      const calendar = ForceCalendar.createCalendar(fcEvents);
      calendar.getViewData(); // Force view calculation
      ForceCalendar.destroyCalendar(calendar);
    });

    // FullCalendar benchmark
    bench.add(`FullCalendar (${count} events)`, () => {
      const calendar = FullCalendar.createCalendar(fullCalEvents);
      FullCalendar.destroyCalendar(calendar);
    });

    await bench.warmup();
    await bench.run();

    // Display results
    console.log('Results:');
    console.log('-'.repeat(50));

    const table = bench.tasks.map(task => ({
      Library: task.name.split(' (')[0],
      'Events': count,
      'Ops/sec': task.result?.hz.toFixed(2),
      'Avg (ms)': task.result?.mean.toFixed(3),
      'Min (ms)': task.result?.min.toFixed(3),
      'Max (ms)': task.result?.max.toFixed(3),
    }));

    console.table(table);

    // Store results
    const fcResult = bench.tasks.find(t => t.name.includes('ForceCalendar'))?.result;
    const fullResult = bench.tasks.find(t => t.name.includes('FullCalendar'))?.result;

    if (fcResult && fullResult) {
      const speedup = (fullResult.mean / fcResult.mean).toFixed(2);
      console.log(`\n⚡ ForceCalendar is ${speedup}x ${parseFloat(speedup) > 1 ? 'faster' : 'slower'} than FullCalendar\n`);

      results.push({
        eventCount: count,
        forceCalendar: {
          opsPerSec: fcResult.hz,
          avgMs: fcResult.mean,
          minMs: fcResult.min,
          maxMs: fcResult.max,
        },
        fullCalendar: {
          opsPerSec: fullResult.hz,
          avgMs: fullResult.mean,
          minMs: fullResult.min,
          maxMs: fullResult.max,
        },
        speedup: parseFloat(speedup),
      });
    }
  }

  // Cleanup
  FullCalendar.cleanupDOM();

  return results;
}

// Run if executed directly
if (process.argv[1].includes('rendering')) {
  runBenchmark()
    .then(results => {
      console.log('\n' + '='.repeat(60));
      console.log('SUMMARY');
      console.log('='.repeat(60));
      console.log(JSON.stringify(results, null, 2));
    })
    .catch(console.error);
}

export { runBenchmark };
