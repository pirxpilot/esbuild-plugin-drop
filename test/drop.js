const test = require('node:test');
const assert = require('node:assert/strict');
const { resolve } = require('node:path');
const { readFile } = require('node:fs/promises');

const drop = require('../lib/drop');

test('must drop assert', async () => {
  const tasks = ['assert.js', 'assert.drop.js']
    .map(name => resolve(__dirname, 'fixtures', name))
    .map(path => readFile(path, 'utf-8'));

  const [source, expected] = await Promise.all(tasks);
  const transformed = drop(source, ['assert']);

  assert.equal(transformed, expected);
});

test('must drop debug', async () => {
  const tasks = ['debug.js', 'debug.drop.js']
    .map(name => resolve(__dirname, 'fixtures', name))
    .map(path => readFile(path, 'utf-8'));

  const [source, expected] = await Promise.all(tasks);
  const transformed = drop(source, ['debug']);

  assert.equal(transformed, expected);
});
