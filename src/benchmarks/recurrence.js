/** UTC recurrence expansion; assert complete timestamp parity before timing. */
import assert from 'node:assert/strict';
import { Bench } from 'tinybench';
import pkg from 'rrule';
import { RecurrenceEngineV2 } from '@forcecalendar/core';
const { RRule } = pkg;
const TEST_CASES = [
  ['Daily for 1 year', 'FREQ=DAILY;COUNT=365', '2024-01-01T09:00:00Z', 365],
  ['Weekly (MWF) for 1 year', 'FREQ=WEEKLY;BYDAY=MO,WE,FR;COUNT=156', '2024-01-01T09:00:00Z', 156],
  ['Monthly (15th) for 5 years', 'FREQ=MONTHLY;BYMONTHDAY=15;COUNT=60', '2024-01-15T09:00:00Z', 60],
  ['Yearly for 10 years', 'FREQ=YEARLY;COUNT=10', '2024-01-01T09:00:00Z', 10],
  ['Daily for 5 years (1825 occurrences)', 'FREQ=DAILY;COUNT=1825', '2024-01-01T09:00:00Z', 1825],
];
export async function runBenchmark({ validateOnly = false } = {}) {
  assert.equal(Intl.DateTimeFormat().resolvedOptions().timeZone, 'UTC', 'Run with TZ=UTC: cross-host timezone correctness is outside this performance comparison');
  const results = [];
  const rangeStart = new Date('2024-01-01T00:00:00Z');
  const rangeEnd = new Date('2034-12-31T23:59:59Z');
  for (const [name, rule, start, expected] of TEST_CASES) {
    const event = { id: 'benchmark', title: 'UTC fixture', start: new Date(start), end: new Date(Date.parse(start) + 3600000), recurring: true, recurrenceRule: rule, timeZone: 'UTC' };
    const options = { ...RRule.parseString(rule), dtstart: event.start };
    const expansionOptions = { maxOccurrences: 2000, timezone: 'UTC' };
    for (const mode of ['cold', 'warm']) {
      const engine = new RecurrenceEngineV2();
      const rrule = new RRule(options);
      // Cold creates both instances per operation; warm measures each library's cached results.
      const force = () => (mode === 'cold' ? new RecurrenceEngineV2() : engine).expandEvent(event, rangeStart, rangeEnd, expansionOptions);
      const reference = () => (mode === 'cold' ? new RRule(options, true) : rrule).between(rangeStart, rangeEnd, true);
      const actual = force().map(o => o.start.getTime());
      const expectedDates = reference().map(d => d.getTime());
      assert.equal(actual.length, expected, `${name}: expected count`);
      assert.deepEqual(actual, expectedDates, `${name}: full UTC timestamp parity`);
      if (validateOnly) { console.log(`${name} (${mode}): ${actual.length} timestamps match`); continue; }
      const bench = new Bench({ time: 1000 });
      bench.add('ForceCalendar', force).add('rrule', reference);
      await bench.warmup();
      await bench.run();
      const [fc, rr] = bench.tasks.map(t => { if (t.result?.error) throw t.result.error; return t.result; });
      const row = { testCase: `${name} (${mode})`, cacheMode: mode, parity: 'all UTC timestamps equal', occurrences: { forceCalendar: actual.length, rrule: expectedDates.length }, forceCalendar: { opsPerSec: fc.hz, avgMs: fc.mean }, rrule: { opsPerSec: rr.hz, avgMs: rr.mean }, speedup: rr.mean / fc.mean };
      results.push(row);
      console.log(JSON.stringify(row));
    }
  }
  return results;
}
if (process.argv[1]?.endsWith('/recurrence.js')) runBenchmark({ validateOnly: process.argv.includes('--validate-only') }).catch(error => { console.error(error); process.exitCode = 1; });
