// Auto-generated benchmark results
// Last updated: 2026-06-28T02:41:49.006Z

export const benchmarkResults = {
  "timestamp": "2026-06-28T02:41:49.006Z",
  "versions": {
    "@forcecalendar/core": "2.1.68",
    "@forcecalendar/interface": "1.0.59",
    "@fullcalendar/core": "6.1.21",
    "@fullcalendar/daygrid": "6.1.21",
    "@fullcalendar/timegrid": "6.1.21",
    "@fullcalendar/list": "6.1.21",
    "@fullcalendar/rrule": "6.1.21",
    "rrule": "2.8.1"
  },
  "environment": {
    "node": "v22.23.0",
    "platform": "linux",
    "arch": "x64"
  },
  "bundleSize": {
    "forceCalendar": [
      {
        "package": "@forcecalendar/core",
        "version": null,
        "size": 341344
      },
      {
        "package": "@forcecalendar/interface",
        "version": null,
        "size": 705292
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
      "forceCalendar": 1046636,
      "fullCalendar": 3098735,
      "ratio": 2.960661586263037
    }
  },
  "recurrence": [
    {
      "scenario": "Daily for 1 year",
      "forceCalendar": 3619,
      "rrule": 55150,
      "occurrences": {
        "forceCalendar": 365,
        "rrule": 365
      }
    },
    {
      "scenario": "Weekly (MWF) for 1 year",
      "forceCalendar": 5031,
      "rrule": 127382,
      "occurrences": {
        "forceCalendar": 156,
        "rrule": 156
      }
    },
    {
      "scenario": "Monthly (15th) for 5 years",
      "forceCalendar": 16312,
      "rrule": 325193,
      "occurrences": {
        "forceCalendar": 60,
        "rrule": 60
      }
    },
    {
      "scenario": "Yearly for 10 years",
      "forceCalendar": 117804,
      "rrule": 1672068,
      "occurrences": {
        "forceCalendar": 10,
        "rrule": 10
      }
    },
    {
      "scenario": "Daily for 5 years (1825 occurrences)",
      "forceCalendar": 12,
      "rrule": 10438,
      "occurrences": {
        "forceCalendar": 1825,
        "rrule": 1825
      }
    }
  ]
};
