/**
 * Bundle Size Comparison
 *
 * Compares the bundle sizes of ForceCalendar vs FullCalendar
 */

import { execSync } from 'child_process';
import { existsSync, statSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

function getPackageSize(packageName) {
  try {
    const packagePath = require.resolve(packageName);
    const packageDir = packagePath.substring(0, packagePath.lastIndexOf('node_modules') + 'node_modules'.length + 1 + packageName.length);

    // Get total size of package directory
    const result = execSync(`du -sb "${packageDir}" 2>/dev/null || du -sk "${packageDir}"`, { encoding: 'utf8' });
    const size = parseInt(result.split('\t')[0]) * (result.includes('-sk') ? 1024 : 1);

    return size;
  } catch (e) {
    return null;
  }
}

function getPackageJson(packageName) {
  try {
    const packageJsonPath = require.resolve(`${packageName}/package.json`);
    return JSON.parse(readFileSync(packageJsonPath, 'utf8'));
  } catch (e) {
    return null;
  }
}

async function runBenchmark() {
  console.log('='.repeat(60));
  console.log('BUNDLE SIZE COMPARISON');
  console.log('='.repeat(60));
  console.log('');

  const packages = [
    { name: '@forcecalendar/core', label: 'ForceCalendar Core' },
    { name: '@fullcalendar/core', label: 'FullCalendar Core' },
    { name: '@fullcalendar/daygrid', label: 'FullCalendar DayGrid' },
    { name: '@fullcalendar/timegrid', label: 'FullCalendar TimeGrid' },
    { name: '@fullcalendar/list', label: 'FullCalendar List' },
    { name: '@fullcalendar/rrule', label: 'FullCalendar RRule' },
    { name: 'rrule', label: 'RRule Library' },
  ];

  const results = [];

  console.log('Individual Package Sizes:');
  console.log('-'.repeat(50));

  const table = [];

  for (const pkg of packages) {
    const size = getPackageSize(pkg.name);
    const packageJson = getPackageJson(pkg.name);

    table.push({
      Package: pkg.label,
      Version: packageJson?.version || 'N/A',
      'Installed Size': size ? formatBytes(size) : 'Not installed',
    });

    results.push({
      package: pkg.name,
      label: pkg.label,
      version: packageJson?.version,
      installedSize: size,
    });
  }

  console.table(table);

  // Calculate totals
  const fcTotal = results.find(r => r.package === '@forcecalendar/core')?.installedSize || 0;

  const fullCalendarPackages = results.filter(r =>
    r.package.startsWith('@fullcalendar/') || r.package === 'rrule'
  );
  const fullTotal = fullCalendarPackages.reduce((sum, r) => sum + (r.installedSize || 0), 0);

  console.log('\n' + '='.repeat(50));
  console.log('TOTALS (for equivalent functionality):');
  console.log('='.repeat(50));
  console.log('');
  console.log(`ForceCalendar (all-in-one):     ${formatBytes(fcTotal)}`);
  console.log(`FullCalendar (core + plugins):  ${formatBytes(fullTotal)}`);
  console.log('');

  if (fcTotal && fullTotal) {
    const ratio = (fullTotal / fcTotal).toFixed(2);
    console.log(`📦 ForceCalendar is ${ratio}x ${parseFloat(ratio) > 1 ? 'smaller' : 'larger'} than FullCalendar stack`);
  }

  return {
    packages: results,
    totals: {
      forceCalendar: fcTotal,
      fullCalendar: fullTotal,
      ratio: fullTotal / fcTotal,
    },
  };
}

// Run if executed directly
if (process.argv[1].includes('bundle-size')) {
  runBenchmark()
    .then(results => {
      console.log('\n' + '='.repeat(60));
      console.log('RAW DATA');
      console.log('='.repeat(60));
      console.log(JSON.stringify(results, null, 2));
    })
    .catch(console.error);
}

export { runBenchmark };
