/**
 * Benchmark Runner
 *
 * Runs honest, comparable benchmarks between ForceCalendar and FullCalendar.
 *
 * What we compare:
 * - Bundle Size: Full stacks (core+interface vs core+plugins)
 * - Recurrence: ForceCalendar RecurrenceEngine vs rrule library
 *
 * What we DON'T compare (not fair):
 * - Rendering: ForceCalendar core is DOM-free, FullCalendar requires DOM
 * - Memory: Different architectures, not comparable
 */

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

import { runBenchmark as runBundleSize } from './benchmarks/bundle-size.js';
import { runBenchmark as runRecurrence } from './benchmarks/recurrence.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

/**
 * Get installed package versions
 */
function getPackageVersions() {
  const packages = [
    '@forcecalendar/core',
    '@forcecalendar/interface',
    '@fullcalendar/core',
    '@fullcalendar/daygrid',
    '@fullcalendar/timegrid',
    '@fullcalendar/list',
    '@fullcalendar/rrule',
    'rrule',
  ];

  const versions = {};

  for (const pkg of packages) {
    try {
      const pkgJson = require(`${pkg}/package.json`);
      versions[pkg] = pkgJson.version;
    } catch {
      versions[pkg] = null;
    }
  }

  return versions;
}

async function main() {
  console.log('');
  console.log('='.repeat(60));
  console.log('ForceCalendar Benchmark');
  console.log('='.repeat(60));
  console.log('');

  const versions = getPackageVersions();

  console.log('Installed packages:');
  console.log('-'.repeat(40));
  Object.entries(versions).forEach(([pkg, ver]) => {
    console.log(`  ${pkg}: ${ver || 'not installed'}`);
  });
  console.log('');

  const results = {
    timestamp: new Date().toISOString(),
    versions,
    environment: {
      node: process.version,
      platform: process.platform,
      arch: process.arch,
    },
    benchmarks: {},
  };

  // Run benchmarks
  const benchmarks = [
    { name: 'bundleSize', fn: runBundleSize, label: 'Bundle Size' },
    { name: 'recurrence', fn: runRecurrence, label: 'Recurrence (RRULE)' },
  ];

  for (const benchmark of benchmarks) {
    try {
      console.log('');
      console.log('='.repeat(60));
      console.log(benchmark.label.toUpperCase());
      console.log('='.repeat(60));

      results.benchmarks[benchmark.name] = await benchmark.fn();
    } catch (error) {
      console.error(`Error in ${benchmark.name}:`, error.message);
      results.benchmarks[benchmark.name] = { error: error.message };
    }
  }

  // Save results
  const resultsPath = join(__dirname, '..', 'results', 'latest.json');
  writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  console.log('');
  console.log('='.repeat(60));
  console.log(`Results saved: ${resultsPath}`);
  console.log('='.repeat(60));

  // Print summary
  printSummary(results);

  return results;
}

function printSummary(results) {
  console.log('');
  console.log('SUMMARY');
  console.log('-'.repeat(40));

  // Bundle Size
  const bundleSize = results.benchmarks.bundleSize;
  if (bundleSize?.totals?.ratio) {
    const ratio = bundleSize.totals.ratio;
    if (ratio > 1) {
      console.log(`Bundle: FullCalendar stack is ${ratio.toFixed(1)}x larger`);
    } else {
      console.log(`Bundle: ForceCalendar stack is ${(1/ratio).toFixed(1)}x larger`);
    }
  }

  // Recurrence
  const recurrence = results.benchmarks.recurrence;
  if (Array.isArray(recurrence) && recurrence.length > 0) {
    const faster = recurrence.filter(r => r.speedup > 1).length;
    const slower = recurrence.filter(r => r.speedup < 1).length;
    console.log(`Recurrence: ForceCalendar faster in ${faster}/${recurrence.length} tests`);
  }

  console.log('');
}

main().catch(console.error);
