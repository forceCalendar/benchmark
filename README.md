# ForceCalendar Benchmark Suite

Performance benchmarks comparing **ForceCalendar** vs **FullCalendar**.

## Quick Start

```bash
# Install dependencies
npm install

# Run all benchmarks
npm run benchmark

# Run individual benchmarks
npm run benchmark:rendering
npm run benchmark:memory
npm run benchmark:recurrence
npm run benchmark:search
npm run benchmark:bundle
```

For accurate memory benchmarks, run with `--expose-gc`:

```bash
node --expose-gc src/benchmarks/memory.js
```

## Benchmarks

| Benchmark | Description |
|-----------|-------------|
| **Rendering** | Time to load and render 100 - 10,000 events |
| **Memory** | Heap memory usage with 1,000 - 50,000 events |
| **Recurrence** | Time to expand recurring events (RRULE) |
| **Search** | Full-text search performance (ForceCalendar feature) |
| **Bundle Size** | Installed package sizes |

## Methodology

### Fair Comparison

- Same test data generated for both libraries
- Same hardware and Node.js version
- Multiple iterations with warmup
- GC triggered between tests (when available)

### What's Compared

| Feature | ForceCalendar | FullCalendar |
|---------|--------------|--------------|
| Core Engine | `@forcecalendar/core` | `@fullcalendar/core` + plugins |
| Recurrence | Built-in `RecurrenceEngine` | `@fullcalendar/rrule` + `rrule` |
| Search | Built-in `EventSearch` | Not available (naive filter used) |
| DOM Required | No (core is DOM-free) | Yes (jsdom used for Node.js) |

### Limitations

- FullCalendar is designed for DOM rendering; benchmarks use jsdom
- Search comparison uses naive `Array.filter` since FullCalendar lacks search
- Results may vary based on hardware and Node.js version

## Results

Results are saved to `results/latest.json` after each run.

### Sample Output

```
╔══════════════════════════════════════════════════════════╗
║                     BENCHMARK SUMMARY                    ║
╚══════════════════════════════════════════════════════════╝

📦 Bundle Size: ForceCalendar is X.Xx smaller
⚡ Rendering (10K events): ForceCalendar is X.Xx faster
💾 Memory (10K events): ForceCalendar uses X.Xx less memory
🔄 Recurrence: ForceCalendar is X.Xx faster on average
```

## Project Structure

```
benchmark/
├── src/
│   ├── setup/
│   │   ├── forcecalendar.js    # ForceCalendar setup
│   │   └── fullcalendar.js     # FullCalendar setup (with jsdom)
│   ├── benchmarks/
│   │   ├── rendering.js        # Rendering performance
│   │   ├── memory.js           # Memory usage
│   │   ├── recurrence.js       # Recurrence expansion
│   │   ├── search.js           # Search performance
│   │   └── bundle-size.js      # Bundle size comparison
│   ├── data/
│   │   └── generators.js       # Test data generators
│   └── runner.js               # Main benchmark runner
├── results/
│   └── latest.json             # Latest benchmark results
├── package.json
└── README.md
```

## Contributing

To add a new benchmark:

1. Create a new file in `src/benchmarks/`
2. Export a `runBenchmark()` async function
3. Add it to `src/runner.js`
4. Add an npm script to `package.json`

## License

MIT
