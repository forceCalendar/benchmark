// Auto-generated benchmark results
// Last updated: 2026-10-02T10:36:48.232Z

export const benchmarkResults = {
  "timestamp": "2026-10-02T10:36:48.232Z",
  "versions": {
    "@forcecalendar/core": "2.5.6",
    "@forcecalendar/interface": "1.9.0",
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
    "cpu": "INTEL(R) XEON(R) PLATINUM 8573C",
    "logicalCpus": 9,
    "recurrenceMethod": "RecurrenceEngineV2 vs rrule; UTC timestamp parity; cold instance and warm cache modes"
  },
  "bundleSize": {
    "forceCalendar": [
      {
        "package": "@forcecalendar/core",
        "version": "2.5.6",
        "size": 699428
      },
      {
        "package": "@forcecalendar/interface",
        "version": "1.9.0",
        "size": 1186324
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
      "forceCalendar": 1885752,
      "fullCalendar": 3098735,
      "ratio": 1.6432356958921428
    }
  },
  "recurrence": [
    {
      "scenario": "Daily for 1 year (cold)",
      "forceCalendar": 850,
      "rrule": 701,
      "occurrences": {
        "forceCalendar": 365,
        "rrule": 365
      }
    },
    {
      "scenario": "Daily for 1 year (warm)",
      "forceCalendar": 9889,
      "rrule": 35222,
      "occurrences": {
        "forceCalendar": 365,
        "rrule": 365
      }
    },
    {
      "scenario": "Weekly (MWF) for 1 year (cold)",
      "forceCalendar": 924,
      "rrule": 2728,
      "occurrences": {
        "forceCalendar": 156,
        "rrule": 156
      }
    },
    {
      "scenario": "Weekly (MWF) for 1 year (warm)",
      "forceCalendar": 24087,
      "rrule": 101598,
      "occurrences": {
        "forceCalendar": 156,
        "rrule": 156
      }
    },
    {
      "scenario": "Monthly (15th) for 5 years (cold)",
      "forceCalendar": 1603,
      "rrule": 2492,
      "occurrences": {
        "forceCalendar": 60,
        "rrule": 60
      }
    },
    {
      "scenario": "Monthly (15th) for 5 years (warm)",
      "forceCalendar": 53458,
      "rrule": 225377,
      "occurrences": {
        "forceCalendar": 60,
        "rrule": 60
      }
    },
    {
      "scenario": "Yearly for 10 years (cold)",
      "forceCalendar": 1492,
      "rrule": 6862,
      "occurrences": {
        "forceCalendar": 10,
        "rrule": 10
      }
    },
    {
      "scenario": "Yearly for 10 years (warm)",
      "forceCalendar": 237172,
      "rrule": 840058,
      "occurrences": {
        "forceCalendar": 10,
        "rrule": 10
      }
    },
    {
      "scenario": "Daily for 5 years (1825 occurrences) (cold)",
      "forceCalendar": 280,
      "rrule": 93,
      "occurrences": {
        "forceCalendar": 1825,
        "rrule": 1825
      }
    },
    {
      "scenario": "Daily for 5 years (1825 occurrences) (warm)",
      "forceCalendar": 1765,
      "rrule": 8922,
      "occurrences": {
        "forceCalendar": 1825,
        "rrule": 1825
      }
    }
  ]
};
