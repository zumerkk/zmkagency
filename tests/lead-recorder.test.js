import test from 'node:test';
import assert from 'node:assert/strict';
import { createLeadRecorder } from '../src/lib/leadRecorder.js';

function sessionStorage() {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };
}

test('a lead is counted only after the write resolves, using no form data', async () => {
  let finishWrite;
  const events = [];
  const record = createLeadRecorder({
    saveLead: () => new Promise((resolve) => { finishWrite = resolve; }),
    sendEvent: (...args) => events.push(args),
    storage: sessionStorage(),
  });
  const pending = record({ name: 'Private name', phone: 'Private phone' }, 'contact_page');
  assert.equal(events.length, 0);
  finishWrite({ id: 'saved-contact-id' });
  assert.equal((await pending).id, 'saved-contact-id');
  assert.deepEqual(events, [['generate_lead', {
    lead_id: 'saved-contact-id',
    transaction_id: 'saved-contact-id',
    form_name: 'contact_page',
  }]]);
});

test('a failed Firestore write never counts a lead', async () => {
  const events = [];
  const record = createLeadRecorder({
    saveLead: async () => { throw new Error('write failed'); },
    sendEvent: (...args) => events.push(args),
  });
  await assert.rejects(record({}, 'quote_wizard'), /write failed/);
  assert.deepEqual(events, []);
});

test('contact and wizard share one event, deduplicated across recorder reloads by lead ID', async () => {
  const storage = sessionStorage();
  const events = [];
  const options = {
    saveLead: async (data) => ({ id: data.savedId }),
    sendEvent: (...args) => events.push(args),
    storage,
  };
  const record = createLeadRecorder(options);
  await record({ savedId: 'same-id' }, 'contact_page');
  await record({ savedId: 'same-id' }, 'quote_wizard');
  await createLeadRecorder(options)({ savedId: 'same-id' }, 'quote_wizard');
  await record({ savedId: 'different-id' }, 'quote_wizard');
  assert.equal(events.length, 2);
  assert.equal(events[0][0], 'generate_lead');
  assert.equal(events[1][0], 'generate_lead');
  assert.equal(events[1][1].form_name, 'quote_wizard');
});

test('blocked analytics cannot fail or repeat a successfully saved inquiry', async () => {
  let writes = 0;
  const record = createLeadRecorder({
    saveLead: async () => { writes += 1; return { id: 'saved-id' }; },
    sendEvent: () => { throw new Error('analytics blocked'); },
  });
  assert.deepEqual(await record({}, 'contact_page'), { id: 'saved-id' });
  assert.equal(writes, 1);
});

test('blocked session storage still permits one event per lead in memory', async () => {
  const events = [];
  const record = createLeadRecorder({
    saveLead: async () => ({ id: 'saved-id' }),
    sendEvent: (...args) => events.push(args),
    storage: {
      getItem: () => { throw new Error('storage blocked'); },
      setItem: () => { throw new Error('storage blocked'); },
    },
  });
  await record({}, 'contact_page');
  await record({}, 'contact_page');
  assert.equal(events.length, 1);
});

test('a missing saved document ID cannot generate a conversion', async () => {
  const events = [];
  const record = createLeadRecorder({
    saveLead: async () => ({}),
    sendEvent: (...args) => events.push(args),
  });
  await record({}, 'quote_wizard');
  assert.deepEqual(events, []);
});
