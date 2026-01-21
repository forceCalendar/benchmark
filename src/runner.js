/**
 * Benchmark Runner
 *
 * Runs all benchmarks and generates a comprehensive report
 */

import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

import { runBenchmark as runRendering } from './benchmarks/rendering.js';
import { runBenchmark as runMemory } from './benchmarks/memory.js';
import { runBenchmark as runRecurrence } from './benchmarks/recurrence.js';
import { runBenchmark as runSearch } from './benchmarks/search.js';
import { runBenchmark as runBundleSize } from './benchmarks/bundle-size.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

/**
 * Get installed package versions
 */
function getPackageVersions() {
  const versions = {};

  try {
    const fcCore = require('@forcecalendar/core/package.json');
    versions['@forcecalendar/core'] = fcCore.version;
  } catch {
    versions['@forcecalendar/core'] = 'not-installed';
  }

  try {
    const fullCal = require('@fullcalendar/core/package.json');
    versions['@fullcalendar/core'] = fullCal.version;
  } catch {
    versions['@fullcalendar/core'] = 'not-installed';
  }

  try {
    const rrule = require('rrule/package.json');
    versions['rrule'] = rrule.version;
  } catch {
    versions['rrule'] = 'not-installed';
  }

  return versions;
}

async function main() {
  console.log('\n');
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║                                                          ║');
  console.log('║     ForceCalendar vs FullCalendar Benchmark Suite        ║');
  console.log('║                                                          ║');
  console.log('╚══════════════════════════════════════════════════════════╝');
  console.log('\n');

  const versions = getPackageVersions();
  console.log('Package versions:');
  Object.entries(versions).forEach(([pkg, ver]) => {
    console.log(`  ${pkg}: ${ver}`);
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

  const benchmarks = [
    { name: 'bundleSize', fn: runBundleSize, label: 'Bundle Size' },
    { name: 'rendering', fn: runRendering, label: 'Rendering Performance' },
    { name: 'memory', fn: runMemory, label: 'Memory Usage' },
    { name: 'recurrence', fn: runRecurrence, label: 'Recurrence Expansion' },
    { name: 'search', fn: runSearch, label: 'Search Performance' },
  ];

  for (const benchmark of benchmarks) {
    try {
      console.log(`\n\n${'█'.repeat(60)}`);
      console.log(`  Running: ${benchmark.label}`);
      console.log(`${'█'.repeat(60)}\n`);

      results.benchmarks[benchmark.name] = await benchmark.fn();
    } catch (error) {
      console.error(`Error running ${benchmark.name}:`, error.message);
      results.benchmarks[benchmark.name] = { error: error.message };
    }
  }

  // Save results
  const resultsPath = join(__dirname, '..', 'results', 'latest.json');
  writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  console.log(`\n\n✅ Results saved to: ${resultsPath}`);

  // Print summary
  printSummary(results);

  return results;
}

function printSummary(results) {
  console.log('\n\n');
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║                     BENCHMARK SUMMARY                    ║');
  console.log('╚══════════════════════════════════════════════════════════╝');
  console.log('');

  // Bundle Size
  if (results.benchmarks.bundleSize?.totals) {
    const { totals } = results.benchmarks.bundleSize;
    console.log(`📦 Bundle Size: ForceCalendar is ${totals.ratio.toFixed(1)}x smaller`);
  }

  // Rendering (use 10K events as reference)
  if (results.benchmarks.rendering) {
    const rendering10k = results.benchmarks.rendering.find(r => r.eventCount === 10000);
    if (rendering10k) {
      console.log(`⚡ Rendering (10K events): ForceCalendar is ${rendering10k.speedup}x faster`);
    }
  }

  // Memory (use 10K events as reference)
  if (results.benchmarks.memory) {
    const memory10k = results.benchmarks.memory.find(r => r.eventCount === 10000);
    if (memory10k) {
      console.log(`💾 Memory (10K events): ForceCalendar uses ${memory10k.ratio}x less memory`);
    }
  }

  // Recurrence (average speedup)
  if (results.benchmarks.recurrence && Array.isArray(results.benchmarks.recurrence)) {
    const avgSpeedup = results.benchmarks.recurrence.reduce((sum, r) => sum + r.speedup, 0) / results.benchmarks.recurrence.length;
    console.log(`🔄 Recurrence: ForceCalendar is ${avgSpeedup.toFixed(1)}x faster on average`);
  }

  console.log('');
  console.log('Note: Higher numbers = ForceCalendar advantage');
  console.log('');
}

main().catch(console.error);
