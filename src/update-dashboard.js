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

export const benchmarkResults = ${JSON.stringify(dashboardData, null, 2)};
`;

  writeFileSync(outputPath, jsContent);
  console.log('Dashboard data updated:', outputPath);
}

function transformResults(results) {
  const benchmarks = results.benchmarks || {};

  // Transform bundle size
  const bundleSizeData = benchmarks.bundleSize || {};

  const bundleSize = {
    forceCalendar: (bundleSizeData.forceCalendar || []).map(p => ({
      package: p.package,
      version: p.version,
      size: p.size,
    })),
    fullCalendar: (bundleSizeData.fullCalendar || []).map(p => ({
      package: p.package,
      version: p.version,
      size: p.size,
    })),
    totals: bundleSizeData.totals || {},
  };

  // Transform recurrence results
  const recurrence = (benchmarks.recurrence || []).map(r => ({
    scenario: r.testCase,
    forceCalendar: Math.round(r.forceCalendar?.opsPerSec || 0),
    rrule: Math.round(r.rrule?.opsPerSec || 0),
    occurrences: r.occurrences,
  }));

  return {
    timestamp: results.timestamp,
    versions: results.versions || {},
    environment: results.environment,
    bundleSize,
    recurrence,
  };
}

main();
