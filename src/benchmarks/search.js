/**
 * Search Performance Benchmark
 *
 * Measures search performance. Note: FullCalendar doesn't have built-in search,
 * so we compare ForceCalendar's EventSearch against naive Array.filter approach.
 */

import { Bench } from 'tinybench';
import { generateEvents } from '../data/generators.js';
import * as ForceCalendar from '../setup/forcecalendar.js';

const EVENT_COUNTS = [1000, 5000, 10000];
const SEARCH_QUERIES = ['meeting', 'project', 'team', 'review'];

/**
 * Naive search implementation (similar to what you'd do without a search engine)
 */
function naiveSearch(events, query) {
  const lowerQuery = query.toLowerCase();
  return events.filter(event =>
    event.title.toLowerCase().includes(lowerQuery) ||
    (event.description && event.description.toLowerCase().includes(lowerQuery)) ||
    (event.location && event.location.toLowerCase().includes(lowerQuery))
  );
}

async function runBenchmark() {
  console.log('='.repeat(60));
  console.log('SEARCH PERFORMANCE BENCHMARK');
  console.log('='.repeat(60));
  console.log('');
  console.log('Note: FullCalendar has no built-in search.');
  console.log('Comparing ForceCalendar EventSearch vs naive Array.filter\n');

  const results = [];

  for (const count of EVENT_COUNTS) {
    console.log(`\n📊 Testing with ${count.toLocaleString()} events...\n`);

    // Generate test data
    const events = generateEvents(count);

    // Setup ForceCalendar search
    const store = ForceCalendar.createEventStore(events);
    const search = ForceCalendar.createEventSearch(store);

    for (const query of SEARCH_QUERIES) {
      console.log(`  Searching for: "${query}"`);

      const bench = new Bench({ time: 500 });

      // ForceCalendar EventSearch
      bench.add('ForceCalendar EventSearch', () => {
        search.search(query);
      });

      // Naive Array.filter
      bench.add('Naive Array.filter', () => {
        naiveSearch(events, query);
      });

      // ForceCalendar with fuzzy search
      bench.add('ForceCalendar (fuzzy)', () => {
        search.search(query, { fuzzy: true });
      });

      await bench.warmup();
      await bench.run();

      // Verify results
      const fcResults = search.search(query);
      const naiveResults = naiveSearch(events, query);

      console.log(`    Found: EventSearch=${fcResults.length}, Naive=${naiveResults.length}`);

      // Display results
      const table = bench.tasks.map(task => ({
        Method: task.name,
        'Ops/sec': task.result?.hz.toFixed(0),
        'Avg (ms)': task.result?.mean.toFixed(4),
      }));

      console.table(table);

      const fcResult = bench.tasks.find(t => t.name === 'ForceCalendar EventSearch')?.result;
      const naiveResult = bench.tasks.find(t => t.name === 'Naive Array.filter')?.result;

      if (fcResult && naiveResult) {
        results.push({
          eventCount: count,
          query,
          forceCalendar: {
            opsPerSec: fcResult.hz,
            avgMs: fcResult.mean,
            resultsFound: fcResults.length,
          },
          naive: {
            opsPerSec: naiveResult.hz,
            avgMs: naiveResult.mean,
            resultsFound: naiveResults.length,
          },
          speedup: (naiveResult.mean / fcResult.mean).toFixed(2),
        });
      }
    }

    // Cleanup
    store.destroy?.();
  }

  return results;
}

// Run if executed directly
if (process.argv[1].includes('search')) {
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
