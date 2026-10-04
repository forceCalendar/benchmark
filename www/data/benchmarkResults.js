// Auto-generated benchmark results
// Last updated: 2026-10-04T03:19:42.406Z

export const benchmarkResults = {
  "timestamp": "2026-10-04T03:19:42.406Z",
  "versions": {
    "@forcecalendar/core": "2.5.7",
    "@forcecalendar/interface": "1.9.1",
    "@fullcalendar/core": "6.1.21",
    "@fullcalendar/daygrid": "6.1.21",
    "@fullcalendar/timegrid": "6.1.21",
    "@fullcalendar/list": "6.1.21",
    "@fullcalendar/rrule": "6.1.21",
    "rrule": "2.8.1"
  },
  "environment": {
    "node": "v24.19.0",
    "platform": "linux",
    "arch": "x64",
    "timezone": "UTC",
    "cpu": "AMD EPYC 9V74 80-Core Processor",
    "logicalCpus": 9,
    "recurrenceMethod": "RecurrenceEngineV2 vs rrule; UTC timestamp parity; cold instance and warm cache modes"
  },
  "bundleSize": {
    "forceCalendar": [
      {
        "package": "@forcecalendar/core",
        "version": "2.5.7",
        "size": 707048
      },
      {
        "package": "@forcecalendar/interface",
        "version": "1.9.1",
        "size": 1187286
      }
    ],
    "fullCalendar": [
      {
        "package": "@fullcalendar/core",
        "version": "6.1.21",
        "size": 1877007
      },
      {
        "package": "@fullcalendar/daygrid",
        "version": "6.1.21",
        "size": 202194
      },
      {
        "package": "@fullcalendar/timegrid",
        "version": "6.1.21",
        "size": 237205
      },
      {
        "package": "@fullcalendar/list",
        "version": "6.1.21",
        "size": 68293
      },
      {
        "package": "@fullcalendar/rrule",
        "version": "6.1.21",
        "size": 26791
      },
      {
        "package": "rrule",
        "version": "2.8.1",
        "size": 687245
      }
    ],
    "totals": {
      "forceCalendar": 1894334,
      "fullCalendar": 3098735,
      "ratio": 1.6357912596194757
    }
  },
  "recurrence": [
    {
      "scenario": "Daily for 1 year (cold)",
      "forceCalendar": 1833,
      "rrule": 677,
      "occurrences": {
        "forceCalendar": 365,
        "rrule": 365
      },
      "winner": "forceCalendar"
    },
    {
      "scenario": "Daily for 1 year (warm)",
      "forceCalendar": 12417,
      "rrule": 55882,
      "occurrences": {
        "forceCalendar": 365,
        "rrule": 365
      },
      "winner": "rrule"
    },
    {
      "scenario": "Weekly (MWF) for 1 year (cold)",
      "forceCalendar": 3734,
      "rrule": 3383,
      "occurrences": {
        "forceCalendar": 156,
        "rrule": 156
      },
      "winner": "forceCalendar"
    },
    {
      "scenario": "Weekly (MWF) for 1 year (warm)",
      "forceCalendar": 30894,
      "rrule": 134646,
      "occurrences": {
        "forceCalendar": 156,
        "rrule": 156
      },
      "winner": "rrule"
    },
    {
      "scenario": "Monthly (15th) for 5 years (cold)",
      "forceCalendar": 7260,
      "rrule": 3461,
      "occurrences": {
        "forceCalendar": 60,
        "rrule": 60
      },
      "winner": "forceCalendar"
    },
    {
      "scenario": "Monthly (15th) for 5 years (warm)",
      "forceCalendar": 77763,
      "rrule": 373391,
      "occurrences": {
        "forceCalendar": 60,
        "rrule": 60
      },
      "winner": "rrule"
    },
    {
      "scenario": "Yearly for 10 years (cold)",
      "forceCalendar": 17849,
      "rrule": 10547,
      "occurrences": {
        "forceCalendar": 10,
        "rrule": 10
      },
      "winner": "forceCalendar"
    },
    {
      "scenario": "Yearly for 10 years (warm)",
      "forceCalendar": 334481,
      "rrule": 1864108,
      "occurrences": {
        "forceCalendar": 10,
        "rrule": 10
      },
      "winner": "rrule"
    },
    {
      "scenario": "Daily for 5 years (1825 occurrences) (cold)",
      "forceCalendar": 419,
      "rrule": 136,
      "occurrences": {
        "forceCalendar": 1825,
        "rrule": 1825
      },
      "winner": "forceCalendar"
    },
    {
      "scenario": "Daily for 5 years (1825 occurrences) (warm)",
      "forceCalendar": 2808,
      "rrule": 11779,
      "occurrences": {
        "forceCalendar": 1825,
        "rrule": 1825
      },
      "winner": "rrule"
    }
  ]
};
