const test = require('tape');
const { resolve } = require('path');
const { readFile } = require('fs').promises;

const drop = require('../lib/drop');

test.skip('must drop assert', async function (t) {
  const tasks = [
    'assert.js',
    'assert.drop.js'
  ]
    .map(name => resolve(__dirname, 'fixtures', name))
    .map(path => readFile(path, 'utf-8'));

  const [source, expected] = await Promise.all(tasks);
  const transformed = drop(source, ['assert']);

  t.equal(transformed, expected);
  t.end();
});

test('must drop debug', async function (t) {
  const tasks = [
    'debug.js',
    'debug.drop.js'
  ]
    .map(name => resolve(__dirname, 'fixtures', name))
    .map(path => readFile(path, 'utf-8'));

  const [source, expected] = await Promise.all(tasks);
  const transformed = drop(source, ['debug']);

  t.equal(transformed, expected);
  t.end();
});
