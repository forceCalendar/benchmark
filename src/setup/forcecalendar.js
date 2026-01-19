/**
 * ForceCalendar setup for benchmarks
 */

import { Calendar, EventStore, EventSearch, RecurrenceEngine } from '@forcecalendar/core';

/**
 * Create a ForceCalendar instance with events
 */
export function createCalendar(events = []) {
  const calendar = new Calendar({
    view: 'month',
    timeZone: 'America/New_York',
  });

  if (events.length > 0) {
    calendar.setEvents(events);
  }

  return calendar;
}

/**
 * Create an EventStore instance
 */
export function createEventStore(events = []) {
  const store = new EventStore({
    timezone: 'America/New_York',
  });

  if (events.length > 0) {
    store.loadEvents(events);
  }

  return store;
}

/**
 * Create an EventSearch instance
 */
export function createEventSearch(store) {
  return new EventSearch(store);
}

/**
 * Get the RecurrenceEngine class
 */
export { RecurrenceEngine };

/**
 * Cleanup calendar instance
 */
export function destroyCalendar(calendar) {
  if (calendar && typeof calendar.destroy === 'function') {
    calendar.destroy();
  }
}
