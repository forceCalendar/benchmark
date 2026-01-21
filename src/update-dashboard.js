/**
 * Update Dashboard Data
 *
 * Converts benchmark results from JSON to the JS format used by the dashboard
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function main() {
  const resultsPath = join(__dirname, '..', 'results', 'latest.json');
  const outputDir = join(__dirname, '..', 'www', 'data');
  const outputPath = join(outputDir, 'benchmarkResults.js');

  if (!existsSync(resultsPath)) {
    console.error('No results file found at:', resultsPath);
    console.error('Run benchmarks first: npm run benchmark');
    process.exit(1);
  }

  // Ensure output directory exists
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  const results = JSON.parse(readFileSync(resultsPath, 'utf8'));

  // Transform results to dashboard format
  const dashboardData = transformResults(results);

  // Generate JS file content
  const jsContent = `// Auto-generated benchmark results
// Last updated: ${results.timestamp}
// Versions: ${JSON.stringify(results.versions || {})}

export const benchmarkResults = ${JSON.stringify(dashboardData, null, 2)};
`;

  writeFileSync(outputPath, jsContent);
  console.log('Dashboard data updated:', outputPath);

  // Also save metadata
  const metadataPath = join(outputDir, 'metadata.json');
  writeFileSync(metadataPath, JSON.stringify({
    lastUpdated: results.timestamp,
    versions: results.versions || {},
    environment: results.environment,
    trigger: results.trigger || { event: 'manual' },
  }, null, 2));
  console.log('Metadata updated:', metadataPath);
}

function transformResults(results) {
  const benchmarks = results.benchmarks || {};

  // Transform rendering results
  const rendering = (benchmarks.rendering || []).map(r => ({
    events: r.eventCount,
    forceCalendar: Math.round(r.forceCalendar?.opsPerSec || 0),
    fullCalendar: Math.round(r.fullCalendar?.opsPerSec || 0),
  }));

  // Transform memory results (convert bytes to KB)
  const memory = (benchmarks.memory || []).map(r => ({
    events: r.eventCount,
    forceCalendar: Math.round((r.forceCalendar?.heapUsed || 0) / 1024),
    fullCalendar: Math.round((r.fullCalendar?.heapUsed || 0) / 1024),
  }));

  // Transform recurrence results
  const recurrence = (benchmarks.recurrence || []).map(r => ({
    scenario: r.testCase || r.name,
    forceCalendar: Math.round(r.forceCalendar?.opsPerSec || 0),
    fullCalendar: Math.round(r.rrule?.opsPerSec || 0),
  }));

  // Transform bundle size - handle array format
  const bundleSizeData = benchmarks.bundleSize || {};
  const packages = bundleSizeData.packages || [];

  // Find packages by name
  const findPkg = (name) => packages.find(p => p.package === name);

  const bundleSize = {
    forceCalendar: {
      core: Math.round((findPkg('@forcecalendar/core')?.installedSize || 0) / 1024),
      total: Math.round((bundleSizeData.totals?.forceCalendar || 0) / 1024),
    },
    fullCalendar: {
      core: Math.round((findPkg('@fullcalendar/core')?.installedSize || 0) / 1024),
      daygrid: Math.round((findPkg('@fullcalendar/daygrid')?.installedSize || 0) / 1024),
      timegrid: Math.round((findPkg('@fullcalendar/timegrid')?.installedSize || 0) / 1024),
      list: Math.round((findPkg('@fullcalendar/list')?.installedSize || 0) / 1024),
      rrule: Math.round((findPkg('@fullcalendar/rrule')?.installedSize || 0) / 1024),
      rruleLib: Math.round((findPkg('rrule')?.installedSize || 0) / 1024),
      total: Math.round((bundleSizeData.totals?.fullCalendar || 0) / 1024),
    },
  };

  return {
    timestamp: results.timestamp,
    versions: results.versions || {},
    environment: results.environment,
    rendering,
    memory,
    recurrence,
    bundleSize,
  };
}

main();
