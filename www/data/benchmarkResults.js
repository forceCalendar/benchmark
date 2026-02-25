// Auto-generated benchmark results
// Last updated: 2026-02-25T10:38:52.237Z

export const benchmarkResults = {
  "timestamp": "2026-02-25T10:38:52.237Z",
  "versions": {
    "@forcecalendar/core": "2.1.20",
    "@forcecalendar/interface": "1.0.57",
    "@fullcalendar/core": "6.1.20",
    "@fullcalendar/daygrid": "6.1.20",
    "@fullcalendar/timegrid": "6.1.20",
    "@fullcalendar/list": "6.1.20",
    "@fullcalendar/rrule": "6.1.20",
    "rrule": "2.8.1"
  },
  "environment": {
    "node": "v24.13.0",
    "platform": "linux",
    "arch": "x64"
  },
  "bundleSize": {
    "forceCalendar": [
      {
        "package": "@forcecalendar/core",
        "version": null,
        "size": 362584
      },
      {
        "package": "@forcecalendar/interface",
        "version": null,
        "size": 732893
      }
    ],
    "fullCalendar": [
      {
        "package": "@fullcalendar/core",
        "version": "6.1.20",
        "size": 1893391
      },
      {
        "package": "@fullcalendar/daygrid",
        "version": "6.1.20",
        "size": 206290
      },
      {
        "package": "@fullcalendar/timegrid",
        "version": "6.1.20",
        "size": 241301
      },
      {
        "package": "@fullcalendar/list",
        "version": "6.1.20",
        "size": 72389
      },
      {
        "package": "@fullcalendar/rrule",
        "version": "6.1.20",
        "size": 30887
      },
      {
        "package": "rrule",
        "version": "2.8.1",
        "size": 715917
      }
    ],
    "totals": {
      "forceCalendar": 1095477,
      "fullCalendar": 3160175,
      "ratio": 2.8847479225944497
    }
  },
  "recurrence": [
    {
      "scenario": "Daily for 1 year",
      "forceCalendar": 1625,
      "rrule": 27537,
      "occurrences": {
        "forceCalendar": 365,
        "rrule": 365
      }
    },
    {
      "scenario": "Weekly (MWF) for 1 year",
      "forceCalendar": 2170,
      "rrule": 62211,
      "occurrences": {
        "forceCalendar": 156,
        "rrule": 156
      }
    },
    {
      "scenario": "Monthly (15th) for 5 years",
      "forceCalendar": 7255,
      "rrule": 163386,
      "occurrences": {
        "forceCalendar": 60,
        "rrule": 60
      }
    },
    {
      "scenario": "Yearly for 10 years",
      "forceCalendar": 51550,
      "rrule": 703199,
      "occurrences": {
        "forceCalendar": 10,
        "rrule": 10
      }
    },
    {
      "scenario": "Daily for 5 years (1825 occurrences)",
      "forceCalendar": 3,
      "rrule": 3956,
      "occurrences": {
        "forceCalendar": 1825,
        "rrule": 1825
      }
    }
  ]
};
