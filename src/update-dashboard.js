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

// Calculate speedup ratios
export function calculateSpeedup(fc, full, higherIsBetter = true) {
  if (higherIsBetter) {
    return (fc / full).toFixed(1);
  }
  return (full / fc).toFixed(1);
}
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
    forceCalendar: Math.round(r.forceCalendar?.opsPerSecond || 0),
    fullCalendar: Math.round(r.fullCalendar?.opsPerSecond || 0),
  }));

  // Transform memory results
  const memory = (benchmarks.memory || []).map(r => ({
    events: r.eventCount,
    forceCalendar: Math.round((r.forceCalendar?.heapUsed || 0) / 1024), // Convert to KB
    fullCalendar: Math.round((r.fullCalendar?.heapUsed || 0) / 1024),
  }));

  // Transform recurrence results
  const recurrence = (benchmarks.recurrence || []).map(r => ({
    scenario: r.name || r.scenario,
    forceCalendar: Math.round(r.forceCalendar?.opsPerSecond || 0),
    fullCalendar: Math.round(r.fullCalendar?.opsPerSecond || r.rrule?.opsPerSecond || 0),
  }));

  // Transform bundle size
  const bundleSizeData = benchmarks.bundleSize || {};
  const bundleSize = {
    forceCalendar: {
      core: Math.round((bundleSizeData.packages?.['@forcecalendar/core']?.size || 0) / 1024),
      total: Math.round((bundleSizeData.totals?.forceCalendar || 0) / 1024),
    },
    fullCalendar: {
      core: Math.round((bundleSizeData.packages?.['@fullcalendar/core']?.size || 0) / 1024),
      daygrid: Math.round((bundleSizeData.packages?.['@fullcalendar/daygrid']?.size || 0) / 1024),
      timegrid: Math.round((bundleSizeData.packages?.['@fullcalendar/timegrid']?.size || 0) / 1024),
      list: Math.round((bundleSizeData.packages?.['@fullcalendar/list']?.size || 0) / 1024),
      rrule: Math.round((bundleSizeData.packages?.['@fullcalendar/rrule']?.size || 0) / 1024),
      rruleLib: Math.round((bundleSizeData.packages?.['rrule']?.size || 0) / 1024),
      total: Math.round((bundleSizeData.totals?.fullCalendar || 0) / 1024),
    },
  };

  // Feature comparison (static)
  const features = [
    { feature: 'DOM-free Core', forceCalendar: true, fullCalendar: false },
    { feature: 'Built-in Search', forceCalendar: true, fullCalendar: false },
    { feature: 'Conflict Detection', forceCalendar: true, fullCalendar: false },
    { feature: 'ICS Import/Export', forceCalendar: true, fullCalendar: false },
    { feature: 'Timezone Support', forceCalendar: true, fullCalendar: true },
    { feature: 'Recurrence (RRULE)', forceCalendar: true, fullCalendar: true },
    { feature: 'Salesforce Compatible', forceCalendar: true, fullCalendar: false },
    { feature: 'React/Vue/Angular', forceCalendar: true, fullCalendar: true },
  ];

  return {
    timestamp: results.timestamp,
    versions: results.versions || {},
    environment: results.environment,
    rendering,
    memory,
    recurrence,
    bundleSize,
    features,
  };
}

main();
