/**
 * Bundle Size Comparison
 *
 * Compares installed node_modules size for equivalent functionality:
 * - ForceCalendar: core + interface (full stack)
 * - FullCalendar: core + daygrid + timegrid + list + rrule plugin + rrule lib
 */

import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));

function getPackageSize(packageName) {
  try {
    const packagePath = require.resolve(packageName);
    const nodeModulesIdx = packagePath.lastIndexOf('node_modules');
    const packageDir = packagePath.substring(0, nodeModulesIdx + 'node_modules'.length + 1 + packageName.length);

    const result = execSync(`du -sb "${packageDir}" 2>/dev/null || du -sk "${packageDir}"`, { encoding: 'utf8' });
    const size = parseInt(result.split('\t')[0]) * (result.includes('-sk') ? 1024 : 1);
    return size;
  } catch (e) {
    return null;
  }
}

function getPackageVersion(packageName) {
  try {
    const packageJsonPath = require.resolve(`${packageName}/package.json`);
    const pkg = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
    return pkg.version;
  } catch (e) {
    return null;
  }
}

function formatBytes(bytes) {
  if (bytes === null || bytes === undefined) return '—';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

async function runBenchmark() {
  console.log('');
  console.log('BUNDLE SIZE COMPARISON');
  console.log('='.repeat(60));
  console.log('');
  console.log('Measuring installed node_modules size for each package.');
  console.log('Comparing full stacks for equivalent calendar functionality.');
  console.log('');

  // ForceCalendar stack
  const forceCalendarPackages = [
    '@forcecalendar/core',
    '@forcecalendar/interface',
  ];

  // FullCalendar stack (equivalent functionality)
  const fullCalendarPackages = [
    '@fullcalendar/core',
    '@fullcalendar/daygrid',
    '@fullcalendar/timegrid',
    '@fullcalendar/list',
    '@fullcalendar/rrule',
    'rrule',
  ];

  const results = {
    forceCalendar: [],
    fullCalendar: [],
  };

  // Measure ForceCalendar packages
  console.log('ForceCalendar Stack:');
  console.log('-'.repeat(50));

  let fcTotal = 0;
  for (const pkg of forceCalendarPackages) {
    const version = getPackageVersion(pkg);
    const size = getPackageSize(pkg);

    results.forceCalendar.push({ package: pkg, version, size });

    if (size) fcTotal += size;
    console.log(`  ${pkg}@${version || '?'}: ${formatBytes(size)}`);
  }
  console.log(`  ${'—'.repeat(30)}`);
  console.log(`  Total: ${formatBytes(fcTotal)}`);
  console.log('');

  // Measure FullCalendar packages
  console.log('FullCalendar Stack:');
  console.log('-'.repeat(50));

  let fullTotal = 0;
  for (const pkg of fullCalendarPackages) {
    const version = getPackageVersion(pkg);
    const size = getPackageSize(pkg);

    results.fullCalendar.push({ package: pkg, version, size });

    if (size) fullTotal += size;
    console.log(`  ${pkg}@${version || '?'}: ${formatBytes(size)}`);
  }
  console.log(`  ${'—'.repeat(30)}`);
  console.log(`  Total: ${formatBytes(fullTotal)}`);
  console.log('');

  // Summary
  console.log('='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log('');
  console.log(`ForceCalendar (core + interface): ${formatBytes(fcTotal)}`);
  console.log(`FullCalendar (core + plugins):    ${formatBytes(fullTotal)}`);

  if (fcTotal && fullTotal) {
    const ratio = fullTotal / fcTotal;
    console.log('');
    if (ratio > 1) {
      console.log(`Ratio: FullCalendar is ${ratio.toFixed(1)}x larger`);
    } else {
      console.log(`Ratio: ForceCalendar is ${(1/ratio).toFixed(1)}x larger`);
    }
  }

  return {
    forceCalendar: results.forceCalendar,
    fullCalendar: results.fullCalendar,
    totals: {
      forceCalendar: fcTotal,
      fullCalendar: fullTotal,
      ratio: fullTotal && fcTotal ? fullTotal / fcTotal : null,
    },
  };
}

// Run if executed directly
if (process.argv[1].includes('bundle-size')) {
  runBenchmark().catch(console.error);
}

export { runBenchmark };
