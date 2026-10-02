// Auto-generated benchmark results
// Last updated: 2026-10-02T11:59:38.931Z

export const benchmarkResults = {
  "timestamp": "2026-10-02T11:59:38.931Z",
  "versions": {
    "@forcecalendar/core": "2.5.7",
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
        "version": "2.5.7",
        "size": 707048
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
      "forceCalendar": 1893372,
      "fullCalendar": 3098735,
      "ratio": 1.6366223858808517
    }
  },
  "recurrence": [
    {
      "scenario": "Daily for 1 year (cold)",
      "forceCalendar": 1251,
      "rrule": 809,
      "occurrences": {
        "forceCalendar": 365,
        "rrule": 365
      },
      "winner": "forceCalendar"
    },
    {
      "scenario": "Daily for 1 year (warm)",
      "forceCalendar": 10526,
      "rrule": 50280,
      "occurrences": {
        "forceCalendar": 365,
        "rrule": 365
      },
      "winner": "rrule"
    },
    {
      "scenario": "Weekly (MWF) for 1 year (cold)",
      "forceCalendar": 2947,
      "rrule": 3027,
      "occurrences": {
        "forceCalendar": 156,
        "rrule": 156
      },
      "winner": "inconclusive"
    },
    {
      "scenario": "Weekly (MWF) for 1 year (warm)",
      "forceCalendar": 26418,
      "rrule": 92938,
      "occurrences": {
        "forceCalendar": 156,
        "rrule": 156
      },
      "winner": "rrule"
    },
    {
      "scenario": "Monthly (15th) for 5 years (cold)",
      "forceCalendar": 4648,
      "rrule": 3016,
      "occurrences": {
        "forceCalendar": 60,
        "rrule": 60
      },
      "winner": "forceCalendar"
    },
    {
      "scenario": "Monthly (15th) for 5 years (warm)",
      "forceCalendar": 57579,
      "rrule": 251262,
      "occurrences": {
        "forceCalendar": 60,
        "rrule": 60
      },
      "winner": "rrule"
    },
    {
      "scenario": "Yearly for 10 years (cold)",
      "forceCalendar": 12776,
      "rrule": 6899,
      "occurrences": {
        "forceCalendar": 10,
        "rrule": 10
      },
      "winner": "forceCalendar"
    },
    {
      "scenario": "Yearly for 10 years (warm)",
      "forceCalendar": 178050,
      "rrule": 828981,
      "occurrences": {
        "forceCalendar": 10,
        "rrule": 10
      },
      "winner": "rrule"
    },
    {
      "scenario": "Daily for 5 years (1825 occurrences) (cold)",
      "forceCalendar": 243,
      "rrule": 112,
      "occurrences": {
        "forceCalendar": 1825,
        "rrule": 1825
      },
      "winner": "forceCalendar"
    },
    {
      "scenario": "Daily for 5 years (1825 occurrences) (warm)",
      "forceCalendar": 1831,
      "rrule": 8186,
      "occurrences": {
        "forceCalendar": 1825,
        "rrule": 1825
      },
      "winner": "rrule"
    }
  ]
};
