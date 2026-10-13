// PUBLIC synthetic fixtures. Exercise the production module, not a copy of its logic.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const ts = require('typescript');

const source = ts.transpileModule(
  fs.readFileSync(path.join(__dirname, '../lib/storage.ts'), 'utf8'),
  { compilerOptions: { module: ts.ModuleKind.CommonJS } }
).outputText;

function storageModule(localStorage) {
  const context = { exports: {} };
  if (localStorage) context.window = { localStorage };
  vm.runInNewContext(source, context);
  return context.exports;
}

function workingStorage() {
  const values = new Map();
  return {
    values,
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value)
  };
}

for (const failure of ['QuotaExceededError', 'SecurityError']) {
  test(`failed ${failure} activity write is reported and preserves saved work`, () => {
    const saved = JSON.stringify({ groupName: 'Synthetic saved group' });
    const storage = workingStorage();
    storage.values.set('mission-learning-design-lab:v2', saved);
    storage.setItem = () => { throw new DOMException('Synthetic storage failure', failure); };
    const api = storageModule(storage);
    assert.equal(api.saveActivityData({ ...api.emptyActivityData, groupName: 'Synthetic unsaved edit' }), false);
    assert.equal(storage.values.get(api.STORAGE_KEY), saved);
  });

  test(`failed ${failure} step write is reported and preserves saved progression`, () => {
    const storage = workingStorage();
    storage.values.set('mission-learning-design-lab:step:v2', 'scenario');
    storage.setItem = () => { throw new DOMException('Synthetic storage failure', failure); };
    const api = storageModule(storage);
    assert.equal(api.saveCurrentStep('builder'), false);
    assert.equal(storage.values.get(api.STEP_STORAGE_KEY), 'scenario');
  });
}

test('successful saves keep the existing storage keys, timestamp and restoration', () => {
  const storage = workingStorage();
  const api = storageModule(storage);
  assert.equal(api.saveActivityData({ ...api.emptyActivityData, groupName: 'Synthetic Alpha' }), true);
  assert.equal(api.saveCurrentStep('builder'), true);
  const saved = JSON.parse(storage.values.get(api.STORAGE_KEY));
  assert.equal(saved.groupName, 'Synthetic Alpha');
  assert.match(saved.updatedAt, /^\d{4}-\d{2}-\d{2}T/);
  assert.equal(api.loadActivityData().groupName, 'Synthetic Alpha');
  assert.equal(api.loadCurrentStep(), 'builder');
});

test('server-side saves report that no browser persistence took place', () => {
  const api = storageModule();
  assert.equal(api.saveActivityData(api.emptyActivityData), false);
  assert.equal(api.saveCurrentStep('setup'), false);
});
