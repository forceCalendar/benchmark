// Auto-generated benchmark results
// Last updated: 2026-01-21T11:47:18.648Z

export const benchmarkResults = {
  "timestamp": "2026-01-21T11:47:18.648Z",
  "versions": {
    "@forcecalendar/core": null,
    "@forcecalendar/interface": null,
    "@fullcalendar/core": "6.1.20",
    "@fullcalendar/daygrid": "6.1.20",
    "@fullcalendar/timegrid": "6.1.20",
    "@fullcalendar/list": "6.1.20",
    "@fullcalendar/rrule": "6.1.20",
    "rrule": "2.8.1"
  },
  "environment": {
    "node": "v20.19.6",
    "platform": "linux",
    "arch": "x64"
  },
  "bundleSize": {
    "forceCalendar": [
      {
        "package": "@forcecalendar/core",
        "version": null,
        "size": 309372
      },
      {
        "package": "@forcecalendar/interface",
        "version": null,
        "size": 1567139
      }
    ],
    "fullCalendar": [
      {
        "package": "@fullcalendar/core",
        "version": "6.1.20",
        "size": 1877007
      },
      {
        "package": "@fullcalendar/daygrid",
        "version": "6.1.20",
        "size": 202194
      },
      {
        "package": "@fullcalendar/timegrid",
        "version": "6.1.20",
        "size": 237205
      },
      {
        "package": "@fullcalendar/list",
        "version": "6.1.20",
        "size": 68293
      },
      {
        "package": "@fullcalendar/rrule",
        "version": "6.1.20",
        "size": 26791
      },
      {
        "package": "rrule",
        "version": "2.8.1",
        "size": 687245
      }
    ],
    "totals": {
      "forceCalendar": 1876511,
      "fullCalendar": 3098735,
      "ratio": 1.6513279165429886
    }
  },
  "recurrence": [
    {
      "scenario": "Daily for 1 year",
      "forceCalendar": 1100,
      "rrule": 21052,
      "occurrences": {
        "forceCalendar": 364,
        "rrule": 364
      }
    },
    {
      "scenario": "Weekly (MWF) for 1 year",
      "forceCalendar": 1460,
      "rrule": 57233,
      "occurrences": {
        "forceCalendar": 155,
        "rrule": 156
      }
    },
    {
      "scenario": "Monthly (15th) for 5 years",
      "forceCalendar": 3588,
      "rrule": 161825,
      "occurrences": {
        "forceCalendar": 60,
        "rrule": 60
      }
    },
    {
      "scenario": "Yearly for 10 years",
      "forceCalendar": 44921,
      "rrule": 939418,
      "occurrences": {
        "forceCalendar": 9,
        "rrule": 9
      }
    },
    {
      "scenario": "Daily for 5 years (1825 occurrences)",
      "forceCalendar": 6,
      "rrule": 5445,
      "occurrences": {
        "forceCalendar": 1824,
        "rrule": 1824
      }
    }
  ]
};
