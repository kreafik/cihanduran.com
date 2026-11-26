import { test } from 'node:test';
import assert from 'node:assert/strict';
import { shouldOpenFromHash } from '../src/islands/terminal/expand.mjs';

test('#terminal adresi terminali büyütür', () => {
  assert.equal(shouldOpenFromHash('#terminal'), true);
  assert.equal(shouldOpenFromHash('#TERMINAL'), true);
});

test('diğer adresler büyütmez', () => {
  assert.equal(shouldOpenFromHash(''), false);
  assert.equal(shouldOpenFromHash('#isler'), false);
  assert.equal(shouldOpenFromHash('#terminalx'), false);
});
