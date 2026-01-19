/**
 * Test data generators for benchmarks
 */

/**
 * Generate random events for testing
 * @param {number} count - Number of events to generate
 * @param {Object} options - Generation options
 * @returns {Array} Array of event objects
 */
export function generateEvents(count, options = {}) {
  const {
    startDate = new Date(),
    maxDurationHours = 4,
    includeRecurring = false,
    recurringPercentage = 10,
  } = options;

  const events = [];
  const categories = ['meeting', 'work', 'personal', 'travel', 'health'];
  const titles = [
    'Team Meeting', 'Project Review', 'Client Call', 'Design Review',
    'Sprint Planning', 'One on One', 'Workshop', 'Training Session',
    'Conference', 'Lunch Meeting', 'Interview', 'Presentation'
  ];

  for (let i = 0; i < count; i++) {
    // Random start within 365 days
    const eventStart = new Date(startDate);
    eventStart.setDate(eventStart.getDate() + Math.floor(Math.random() * 365));
    eventStart.setHours(8 + Math.floor(Math.random() * 10)); // 8am - 6pm
    eventStart.setMinutes(Math.random() > 0.5 ? 0 : 30);

    // Random duration 30min - maxDurationHours
    const durationMinutes = 30 + Math.floor(Math.random() * (maxDurationHours * 60 - 30));
    const eventEnd = new Date(eventStart.getTime() + durationMinutes * 60 * 1000);

    const isRecurring = includeRecurring && Math.random() * 100 < recurringPercentage;

    const event = {
      id: `event-${i}`,
      title: titles[Math.floor(Math.random() * titles.length)],
      start: eventStart,
      end: eventEnd,
      allDay: false,
      category: categories[Math.floor(Math.random() * categories.length)],
    };

    if (isRecurring) {
      event.recurring = true;
      event.recurrenceRule = generateRandomRRule();
    }

    events.push(event);
  }

  return events;
}

/**
 * Generate a random RRULE
 */
function generateRandomRRule() {
  const frequencies = ['DAILY', 'WEEKLY', 'MONTHLY'];
  const freq = frequencies[Math.floor(Math.random() * frequencies.length)];
  const interval = 1 + Math.floor(Math.random() * 3);
  const count = 10 + Math.floor(Math.random() * 40);

  let rule = `FREQ=${freq};INTERVAL=${interval};COUNT=${count}`;

  if (freq === 'WEEKLY' && Math.random() > 0.5) {
    const days = ['MO', 'TU', 'WE', 'TH', 'FR'];
    const selectedDays = days.filter(() => Math.random() > 0.5);
    if (selectedDays.length > 0) {
      rule += `;BYDAY=${selectedDays.join(',')}`;
    }
  }

  return rule;
}

/**
 * Convert ForceCalendar events to FullCalendar format
 */
export function toFullCalendarFormat(events) {
  return events.map(event => ({
    id: event.id,
    title: event.title,
    start: event.start,
    end: event.end,
    allDay: event.allDay || false,
    extendedProps: {
      category: event.category,
    },
    // FullCalendar uses different recurrence format (rrule plugin)
    ...(event.recurring && event.recurrenceRule ? {
      rrule: parseRRuleForFullCalendar(event.recurrenceRule, event.start)
    } : {})
  }));
}

/**
 * Parse RRULE string to FullCalendar rrule format
 */
function parseRRuleForFullCalendar(rruleStr, dtstart) {
  const parts = rruleStr.split(';').reduce((acc, part) => {
    const [key, value] = part.split('=');
    acc[key.toLowerCase()] = value;
    return acc;
  }, {});

  return {
    freq: parts.freq?.toLowerCase(),
    interval: parts.interval ? parseInt(parts.interval) : 1,
    count: parts.count ? parseInt(parts.count) : undefined,
    byweekday: parts.byday ? parts.byday.split(',').map(d => d.toLowerCase()) : undefined,
    dtstart: dtstart,
  };
}

/**
 * Generate a large ICS file content for import testing
 */
export function generateICSContent(eventCount) {
  let ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ForceCalendar Benchmark//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
`;

  const now = new Date();

  for (let i = 0; i < eventCount; i++) {
    const start = new Date(now);
    start.setDate(start.getDate() + Math.floor(Math.random() * 365));
    start.setHours(9 + Math.floor(Math.random() * 8));

    const end = new Date(start);
    end.setHours(end.getHours() + 1 + Math.floor(Math.random() * 3));

    const formatDate = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    ics += `BEGIN:VEVENT
UID:benchmark-${i}@forcecalendar.com
DTSTAMP:${formatDate(now)}
DTSTART:${formatDate(start)}
DTEND:${formatDate(end)}
SUMMARY:Benchmark Event ${i}
DESCRIPTION:Auto-generated event for benchmarking
LOCATION:Conference Room ${(i % 10) + 1}
STATUS:CONFIRMED
END:VEVENT
`;
  }

  ics += 'END:VCALENDAR';
  return ics;
}
