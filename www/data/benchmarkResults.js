// Auto-generated benchmark results
// Last updated: 2026-06-21T02:53:32.503Z

export const benchmarkResults = {
  "timestamp": "2026-06-21T02:53:32.503Z",
  "versions": {
    "@forcecalendar/core": "2.1.57",
    "@forcecalendar/interface": "1.0.59",
    "@fullcalendar/core": "6.1.21",
    "@fullcalendar/daygrid": "6.1.21",
    "@fullcalendar/timegrid": "6.1.21",
    "@fullcalendar/list": "6.1.21",
    "@fullcalendar/rrule": "6.1.21",
    "rrule": "2.8.1"
  },
  "environment": {
    "node": "v22.22.3",
    "platform": "linux",
    "arch": "x64"
  },
  "bundleSize": {
    "forceCalendar": [
      {
        "package": "@forcecalendar/core",
        "version": null,
        "size": 329875
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
      "forceCalendar": 1035167,
      "fullCalendar": 3098735,
      "ratio": 2.9934638565564784
    }
  },
  "recurrence": [
    {
      "scenario": "Daily for 1 year",
      "forceCalendar": 2808,
      "rrule": 43916,
      "occurrences": {
        "forceCalendar": 365,
        "rrule": 365
      }
    },
    {
      "scenario": "Weekly (MWF) for 1 year",
      "forceCalendar": 3625,
      "rrule": 96983,
      "occurrences": {
        "forceCalendar": 156,
        "rrule": 156
      }
    },
    {
      "scenario": "Monthly (15th) for 5 years",
      "forceCalendar": 12233,
      "rrule": 248737,
      "occurrences": {
        "forceCalendar": 60,
        "rrule": 60
      }
    },
    {
      "scenario": "Yearly for 10 years",
      "forceCalendar": 89146,
      "rrule": 1027441,
      "occurrences": {
        "forceCalendar": 10,
        "rrule": 10
      }
    },
    {
      "scenario": "Daily for 5 years (1825 occurrences)",
      "forceCalendar": 9,
      "rrule": 8379,
      "occurrences": {
        "forceCalendar": 1825,
        "rrule": 1825
      }
    }
  ]
};
