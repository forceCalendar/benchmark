/**
 * FullCalendar setup for benchmarks
 *
 * Note: FullCalendar requires DOM, so we use jsdom for Node.js benchmarks
 */

import { JSDOM } from 'jsdom';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import rrulePlugin from '@fullcalendar/rrule';

// Setup jsdom environment
let dom = null;
let document = null;

/**
 * Initialize DOM environment for FullCalendar
 */
export function initDOM() {
  if (!dom) {
    dom = new JSDOM('<!DOCTYPE html><html><body><div id="calendar"></div></body></html>', {
      pretendToBeVisual: true,
    });
    document = dom.window.document;
    global.document = document;
    global.window = dom.window;
  }
  return document;
}

/**
 * Create a FullCalendar instance with events
 */
export function createCalendar(events = []) {
  const doc = initDOM();
  const calendarEl = doc.getElementById('calendar');

  // Clear previous calendar if any
  calendarEl.innerHTML = '';

  const calendar = new Calendar(calendarEl, {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, rrulePlugin],
    initialView: 'dayGridMonth',
    timeZone: 'America/New_York',
    events: events,
  });

  calendar.render();
  return calendar;
}

/**
 * Create a minimal FullCalendar for event storage benchmarks
 * (without rendering)
 */
export function createEventStore(events = []) {
  const doc = initDOM();
  const calendarEl = doc.createElement('div');
  doc.body.appendChild(calendarEl);

  const calendar = new Calendar(calendarEl, {
    plugins: [dayGridPlugin, rrulePlugin],
    initialView: 'dayGridMonth',
    events: events,
    // Don't render initially
  });

  return calendar;
}

/**
 * Cleanup calendar instance
 */
export function destroyCalendar(calendar) {
  if (calendar && typeof calendar.destroy === 'function') {
    calendar.destroy();
  }
}

/**
 * Cleanup DOM
 */
export function cleanupDOM() {
  if (dom) {
    dom.window.close();
    dom = null;
    document = null;
    delete global.document;
    delete global.window;
  }
}
