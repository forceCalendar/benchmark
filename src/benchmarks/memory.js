/**
 * Memory Usage Benchmark
 *
 * Measures heap memory usage when loading events at different scales
 */

import { generateEvents, toFullCalendarFormat } from '../data/generators.js';
import * as ForceCalendar from '../setup/forcecalendar.js';
import * as FullCalendar from '../setup/fullcalendar.js';

const EVENT_COUNTS = [1000, 5000, 10000, 50000];

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

function getMemoryUsage() {
  if (global.gc) {
    global.gc(); // Force garbage collection if available
  }
  return process.memoryUsage();
}

async function measureMemory(name, setupFn, cleanupFn) {
  // Baseline
  const baseline = getMemoryUsage();

  // Create instance
  const instance = setupFn();

  // Measure after creation
  const afterCreate = getMemoryUsage();

  // Cleanup
  if (cleanupFn) cleanupFn(instance);

  return {
    name,
    heapUsed: afterCreate.heapUsed - baseline.heapUsed,
    heapTotal: afterCreate.heapTotal - baseline.heapTotal,
    external: afterCreate.external - baseline.external,
  };
}

async function runBenchmark() {
  console.log('='.repeat(60));
  console.log('MEMORY USAGE BENCHMARK');
  console.log('='.repeat(60));
  console.log('');

  if (!global.gc) {
    console.log('⚠️  Run with --expose-gc for accurate results:');
    console.log('   node --expose-gc src/benchmarks/memory.js\n');
  }

  const results = [];

  for (const count of EVENT_COUNTS) {
    console.log(`\n📊 Testing with ${count.toLocaleString()} events...\n`);

    // Generate test data
    const fcEvents = generateEvents(count);
    const fullCalEvents = toFullCalendarFormat(fcEvents);

    // Wait for GC
    await new Promise(resolve => setTimeout(resolve, 100));

    // ForceCalendar memory
    const fcMemory = await measureMemory(
      'ForceCalendar',
      () => ForceCalendar.createEventStore(fcEvents),
      (store) => store.destroy?.()
    );

    // Wait for GC
    await new Promise(resolve => setTimeout(resolve, 100));

    // FullCalendar memory
    const fullMemory = await measureMemory(
      'FullCalendar',
      () => FullCalendar.createEventStore(fullCalEvents),
      (calendar) => FullCalendar.destroyCalendar(calendar)
    );

    // Display results
    console.log('Results:');
    console.log('-'.repeat(50));

    const table = [
      {
        Library: 'ForceCalendar',
        Events: count,
        'Heap Used': formatBytes(fcMemory.heapUsed),
        'Heap Total': formatBytes(fcMemory.heapTotal),
        'Per Event': formatBytes(fcMemory.heapUsed / count),
      },
      {
        Library: 'FullCalendar',
        Events: count,
        'Heap Used': formatBytes(fullMemory.heapUsed),
        'Heap Total': formatBytes(fullMemory.heapTotal),
        'Per Event': formatBytes(fullMemory.heapUsed / count),
      },
    ];

    console.table(table);

    const ratio = (fullMemory.heapUsed / fcMemory.heapUsed).toFixed(2);
    console.log(`\n💾 ForceCalendar uses ${ratio}x ${parseFloat(ratio) > 1 ? 'less' : 'more'} memory than FullCalendar\n`);

    results.push({
      eventCount: count,
      forceCalendar: {
        heapUsed: fcMemory.heapUsed,
        heapTotal: fcMemory.heapTotal,
        perEvent: fcMemory.heapUsed / count,
      },
      fullCalendar: {
        heapUsed: fullMemory.heapUsed,
        heapTotal: fullMemory.heapTotal,
        perEvent: fullMemory.heapUsed / count,
      },
      ratio: parseFloat(ratio),
    });
  }

  // Cleanup
  FullCalendar.cleanupDOM();

  return results;
}

// Run if executed directly
if (process.argv[1].includes('memory')) {
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
