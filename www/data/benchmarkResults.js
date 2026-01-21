// Auto-generated benchmark results
// Last updated: 2026-01-19T10:22:29.268Z
// Versions: {}

export const benchmarkResults = {
  "timestamp": "2026-01-19T10:22:29.268Z",
  "versions": {},
  "environment": {
    "node": "v22.18.0",
    "platform": "linux",
    "arch": "x64"
  },
  "rendering": [
    {
      "events": 100,
      "forceCalendar": 74,
      "fullCalendar": 12
    },
    {
      "events": 1000,
      "forceCalendar": 9,
      "fullCalendar": 11
    },
    {
      "events": 5000,
      "forceCalendar": 2,
      "fullCalendar": 4
    },
    {
      "events": 10000,
      "forceCalendar": 1,
      "fullCalendar": 2
    }
  ],
  "memory": [
    {
      "events": 1000,
      "forceCalendar": 5223,
      "fullCalendar": 6889
    },
    {
      "events": 5000,
      "forceCalendar": 5268,
      "fullCalendar": 13523
    },
    {
      "events": 10000,
      "forceCalendar": 11685,
      "fullCalendar": 13781
    },
    {
      "events": 50000,
      "forceCalendar": 60294,
      "fullCalendar": 66100
    }
  ],
  "recurrence": [
    {
      "scenario": "Daily for 1 year",
      "forceCalendar": 1482,
      "fullCalendar": 21964
    },
    {
      "scenario": "Weekly (MWF) for 1 year",
      "forceCalendar": 1215,
      "fullCalendar": 48131
    },
    {
      "scenario": "Monthly (15th) for 5 years",
      "forceCalendar": 4778,
      "fullCalendar": 127337
    },
    {
      "scenario": "Yearly for 10 years",
      "forceCalendar": 40501,
      "fullCalendar": 653866
    },
    {
      "scenario": "Daily for 5 years (1825 occurrences)",
      "forceCalendar": 6,
      "fullCalendar": 4720
    }
  ],
  "bundleSize": {
    "forceCalendar": {
      "core": 302,
      "total": 302
    },
    "fullCalendar": {
      "core": 1833,
      "daygrid": 197,
      "timegrid": 232,
      "list": 67,
      "rrule": 26,
      "rruleLib": 671,
      "total": 3026
    }
  }
};
