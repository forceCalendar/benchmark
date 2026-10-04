import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const readJson = path => JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8'));
const results = readJson('../results/latest.json');
const manifest = readJson('../package.json');
const lock = readJson('../package-lock.json');
const source = readFileSync(new URL('../www/data/benchmarkResults.js', import.meta.url), 'utf8');
const dashboard = JSON.parse(source.slice(source.indexOf('=') + 1).trim().replace(/;$/, ''));

test('recorded benchmark versions match exact manifest and lockfile pins', () => {
  for (const [name, version] of Object.entries(manifest.dependencies)) {
    assert.match(version, /^\d+\.\d+\.\d+$/);
    assert.equal(lock.packages[`node_modules/${name}`].version, version);
    assert.equal(results.versions[name], version);
  }
});

test('all ten recurrence rows retain parity and valid uncertainty statistics', () => {
  const rows = results.benchmarks.recurrence;
  assert.ok(Array.isArray(rows));
  assert.equal(rows.length, 10);
  assert.equal(new Set(rows.map(row => row.testCase)).size, 10);
  for (const row of rows) {
    assert.equal(row.parity, 'all UTC timestamps equal');
    assert.equal(row.occurrences.forceCalendar, row.occurrences.rrule);
    assert.ok(row.occurrences.forceCalendar > 0);
    assert.ok(['cold', 'warm'].includes(row.cacheMode));
    for (const name of ['forceCalendar', 'rrule']) {
      for (const key of ['opsPerSec', 'avgMs', 'marginOfErrorMs', 'relativeMarginPercent', 'samples']) {
        assert.ok(Number.isFinite(row[name][key]), `${row.testCase} ${name}.${key}`);
        assert.ok(row[name][key] >= 0);
      }
      assert.ok(row[name].avgMs > 0 && row[name].opsPerSec > 0 && row[name].samples > 0);
    }
    const fc = row.forceCalendar;
    const rr = row.rrule;
    const winner = fc.avgMs + fc.marginOfErrorMs < rr.avgMs - rr.marginOfErrorMs ? 'forceCalendar'
      : rr.avgMs + rr.marginOfErrorMs < fc.avgMs - fc.marginOfErrorMs ? 'rrule' : 'inconclusive';
    assert.equal(row.winner, winner);
    assert.equal(row.speedup, rr.avgMs / fc.avgMs);
  }
});

test('installed package totals sum complete measured packages', () => {
  const bundle = results.benchmarks.bundleSize;
  for (const stack of ['forceCalendar', 'fullCalendar']) {
    assert.ok(bundle[stack].length > 0);
    for (const pkg of bundle[stack]) {
      assert.equal(pkg.version, results.versions[pkg.package]);
      assert.ok(Number.isInteger(pkg.size) && pkg.size > 0);
    }
    assert.equal(bundle.totals[stack], bundle[stack].reduce((sum, pkg) => sum + pkg.size, 0));
  }
  assert.equal(bundle.totals.ratio, bundle.totals.fullCalendar / bundle.totals.forceCalendar);
});

test('dashboard is a faithful projection of raw evidence, including losses', () => {
  assert.equal(dashboard.timestamp, results.timestamp);
  assert.ok(Number.isFinite(Date.parse(results.timestamp)));
  assert.equal(results.environment.timezone, 'UTC');
  assert.deepEqual(dashboard.versions, results.versions);
  assert.deepEqual(dashboard.environment, results.environment);
  assert.deepEqual(dashboard.bundleSize, results.benchmarks.bundleSize);
  assert.deepEqual(dashboard.recurrence, results.benchmarks.recurrence.map(row => ({
    scenario: row.testCase,
    forceCalendar: Math.round(row.forceCalendar.opsPerSec),
    rrule: Math.round(row.rrule.opsPerSec),
    occurrences: row.occurrences,
    winner: row.winner,
  })));
});
