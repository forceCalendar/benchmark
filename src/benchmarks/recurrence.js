/**
 * Recurrence Expansion Benchmark
 *
 * Compares RRULE expansion performance:
 * - ForceCalendar: RecurrenceEngine (built-in)
 * - rrule: The rrule library (what FullCalendar uses via @fullcalendar/rrule)
 *
 * This is a fair comparison - both are pure JavaScript RRULE parsers.
 */

import { Bench } from 'tinybench';
import pkg from 'rrule';
const { RRule } = pkg;
import { RecurrenceEngine } from '../setup/forcecalendar.js';

const TEST_CASES = [
  {
    name: 'Daily for 1 year',
    rrule: 'FREQ=DAILY;COUNT=365',
    start: new Date('2024-01-01T09:00:00'),
  },
  {
    name: 'Weekly (MWF) for 1 year',
    rrule: 'FREQ=WEEKLY;BYDAY=MO,WE,FR;COUNT=156',
    start: new Date('2024-01-01T09:00:00'),
  },
  {
    name: 'Monthly (15th) for 5 years',
    rrule: 'FREQ=MONTHLY;BYMONTHDAY=15;COUNT=60',
    start: new Date('2024-01-15T09:00:00'),
  },
  {
    name: 'Yearly for 10 years',
    rrule: 'FREQ=YEARLY;COUNT=10',
    start: new Date('2024-01-01T09:00:00'),
  },
  {
    name: 'Daily for 5 years (1825 occurrences)',
    rrule: 'FREQ=DAILY;COUNT=1825',
    start: new Date('2024-01-01T09:00:00'),
  },
];

async function runBenchmark() {
  console.log('='.repeat(60));
  console.log('RECURRENCE EXPANSION BENCHMARK');
  console.log('='.repeat(60));
  console.log('');

  const results = [];
  const rangeStart = new Date('2024-01-01');
  const rangeEnd = new Date('2034-12-31'); // 10 year range

  for (const testCase of TEST_CASES) {
    console.log(`\n📊 Testing: ${testCase.name}...\n`);

    // Create event for ForceCalendar
    const fcEvent = {
      id: 'test-event',
      title: 'Recurring Event',
      start: testCase.start,
      end: new Date(testCase.start.getTime() + 60 * 60 * 1000), // 1 hour
      recurring: true,
      recurrenceRule: testCase.rrule,
      timeZone: 'America/New_York',
    };

    // Parse RRULE for rrule library (used by FullCalendar)
    const rruleParts = testCase.rrule.split(';').reduce((acc, part) => {
      const [key, value] = part.split('=');
      acc[key] = value;
      return acc;
    }, {});

    const rruleOptions = {
      freq: RRule[rruleParts.FREQ],
      dtstart: testCase.start,
      count: rruleParts.COUNT ? parseInt(rruleParts.COUNT) : undefined,
      interval: rruleParts.INTERVAL ? parseInt(rruleParts.INTERVAL) : 1,
    };

    if (rruleParts.BYDAY) {
      const dayMap = { MO: RRule.MO, TU: RRule.TU, WE: RRule.WE, TH: RRule.TH, FR: RRule.FR, SA: RRule.SA, SU: RRule.SU };
      rruleOptions.byweekday = rruleParts.BYDAY.split(',').map(d => dayMap[d]);
    }
    if (rruleParts.BYMONTHDAY) {
      rruleOptions.bymonthday = parseInt(rruleParts.BYMONTHDAY);
    }

    const rrule = new RRule(rruleOptions);

    const bench = new Bench({ time: 1000 });

    // ForceCalendar recurrence expansion
    bench.add('ForceCalendar', () => {
      RecurrenceEngine.expandEvent(fcEvent, rangeStart, rangeEnd, 2000);
    });

    // RRule library
    bench.add('rrule', () => {
      rrule.between(rangeStart, rangeEnd, true);
    });

    await bench.warmup();
    await bench.run();

    // Verify results match
    const fcOccurrences = RecurrenceEngine.expandEvent(fcEvent, rangeStart, rangeEnd, 2000);
    const rruleOccurrences = rrule.between(rangeStart, rangeEnd, true);

    console.log(`Occurrences: ForceCalendar=${fcOccurrences.length}, rrule=${rruleOccurrences.length}`);
    console.log('');

    // Display results
    console.log('Results:');
    console.log('-'.repeat(50));

    const table = bench.tasks.map(task => ({
      Library: task.name,
      'Ops/sec': task.result?.hz.toFixed(2),
      'Avg (ms)': task.result?.mean.toFixed(4),
      'Min (ms)': task.result?.min.toFixed(4),
      'Max (ms)': task.result?.max.toFixed(4),
    }));

    console.table(table);

    const fcResult = bench.tasks.find(t => t.name === 'ForceCalendar')?.result;
    const rruleResult = bench.tasks.find(t => t.name.includes('rrule'))?.result;

    if (fcResult && rruleResult) {
      const speedup = (rruleResult.mean / fcResult.mean).toFixed(2);
      console.log(`\n⚡ ForceCalendar is ${speedup}x ${parseFloat(speedup) > 1 ? 'faster' : 'slower'} than rrule\n`);

      results.push({
        testCase: testCase.name,
        occurrences: {
          forceCalendar: fcOccurrences.length,
          rrule: rruleOccurrences.length,
        },
        forceCalendar: {
          opsPerSec: fcResult.hz,
          avgMs: fcResult.mean,
        },
        rrule: {
          opsPerSec: rruleResult.hz,
          avgMs: rruleResult.mean,
        },
        speedup: parseFloat(speedup),
      });
    }
  }

  return results;
}

// Run if executed directly
if (process.argv[1].includes('recurrence')) {
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
