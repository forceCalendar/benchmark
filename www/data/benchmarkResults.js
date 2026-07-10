// Auto-generated benchmark results
// Last updated: 2026-07-10T01:33:18.988Z

export const benchmarkResults = {
  "timestamp": "2026-07-10T01:33:18.988Z",
  "versions": {
    "@forcecalendar/core": "2.1.70",
    "@forcecalendar/interface": "1.0.61",
    "@fullcalendar/core": "6.1.21",
    "@fullcalendar/daygrid": "6.1.21",
    "@fullcalendar/timegrid": "6.1.21",
    "@fullcalendar/list": "6.1.21",
    "@fullcalendar/rrule": "6.1.21",
    "rrule": "2.8.1"
  },
  "environment": {
    "node": "v22.23.1",
    "platform": "linux",
    "arch": "x64"
  },
  "bundleSize": {
    "forceCalendar": [
      {
        "package": "@forcecalendar/core",
        "version": "2.1.70",
        "size": 345596
      },
      {
        "package": "@forcecalendar/interface",
        "version": "1.0.61",
        "size": 723756
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
      "forceCalendar": 1069352,
      "fullCalendar": 3098735,
      "ratio": 2.8977689292206867
    }
  },
  "recurrence": [
    {
      "scenario": "Daily for 1 year",
      "forceCalendar": 9861,
      "rrule": 45462,
      "occurrences": {
        "forceCalendar": 365,
        "rrule": 365
      }
    },
    {
      "scenario": "Weekly (MWF) for 1 year",
      "forceCalendar": 22467,
      "rrule": 108592,
      "occurrences": {
        "forceCalendar": 156,
        "rrule": 156
      }
    },
    {
      "scenario": "Monthly (15th) for 5 years",
      "forceCalendar": 37517,
      "rrule": 258616,
      "occurrences": {
        "forceCalendar": 60,
        "rrule": 60
      }
    },
    {
      "scenario": "Yearly for 10 years",
      "forceCalendar": 310012,
      "rrule": 1204202,
      "occurrences": {
        "forceCalendar": 10,
        "rrule": 10
      }
    },
    {
      "scenario": "Daily for 5 years (1825 occurrences)",
      "forceCalendar": 1980,
      "rrule": 8883,
      "occurrences": {
        "forceCalendar": 1825,
        "rrule": 1825
      }
    }
  ]
};
