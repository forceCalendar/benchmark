import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import { getServerThemeSnapshot, getThemeSnapshot, subscribeToThemeChange } from '../www/components/theme-store.mjs';

const previousDocument = globalThis.document;
const previousObserver = globalThis.MutationObserver;
afterEach(() => {
  if (previousDocument === undefined) delete globalThis.document;
  else globalThis.document = previousDocument;
  if (previousObserver === undefined) delete globalThis.MutationObserver;
  else globalThis.MutationObserver = previousObserver;
});

test('theme server snapshot is stable without browser globals', () => {
  delete globalThis.document;
  assert.equal(getServerThemeSnapshot(), false);
});

test('theme client snapshot follows the pre-hydration document class', () => {
  let dark = false;
  globalThis.document = { documentElement: { classList: { contains: name => name === 'dark' && dark } } };
  assert.equal(getThemeSnapshot(), false);
  dark = true;
  assert.equal(getThemeSnapshot(), true);
  dark = false;
  assert.equal(getThemeSnapshot(), false);
});

test('theme subscription watches class changes and disconnects on cleanup', () => {
  const root = {};
  let notify;
  let disconnected = false;
  let calls = 0;
  globalThis.document = { documentElement: root };
  globalThis.MutationObserver = class {
    constructor(callback) { notify = callback; }
    observe(target, options) {
      assert.equal(target, root);
      assert.deepEqual(options, { attributes: true, attributeFilter: ['class'] });
    }
    disconnect() { disconnected = true; }
  };
  const unsubscribe = subscribeToThemeChange(() => calls++);
  notify();
  notify();
  assert.equal(calls, 2);
  unsubscribe();
  assert.equal(disconnected, true);
});
