const test = require('node:test');
const assert = require('node:assert/strict');
const { readFile } = require('node:fs/promises');
const { resolve } = require('node:path');

const esbuild = require('esbuild');

const drop = require('../');

test('must drop assert require', async function () {
  const sourceName = resolve(__dirname, 'fixtures', 'assert.js');
  const expectedName = resolve(__dirname, 'fixtures', 'assert.esbuild.js');

  const [
    transformed,
    expected,
  ] = await Promise.all([
    build(sourceName),
    readFile(expectedName, 'utf-8')
  ]);

  assert.equal(transformed, expected);
});

test('must drop assert import', async function () {
  const sourceName = resolve(__dirname, 'fixtures', 'assert.mjs');
  const expectedName = resolve(__dirname, 'fixtures', 'assert.esbuild.mjs');

  const [
    transformed,
    expected,
  ] = await Promise.all([
    build(sourceName, {}, { sourceType: 'module' }),
    readFile(expectedName, 'utf-8')
  ]);

  assert.equal(transformed, expected);
});

test('must drop assert require if source type is module', async function () {
  const sourceName = resolve(__dirname, 'fixtures', 'assert.js');
  const expectedName = resolve(__dirname, 'fixtures', 'assert.esbuild.js');

  const [
    transformed,
    expected,
  ] = await Promise.all([
    build(sourceName, {}, { sourceType: 'module' }),
    readFile(expectedName, 'utf-8')
  ]);

  assert.equal(transformed, expected);
});

test('must drop assert when minifying', async function () {
  const sourceName = resolve(__dirname, 'fixtures', 'big.js');
  const expectedName = resolve(__dirname, 'fixtures', 'big.esbuild.js');

  const [
    transformed,
    expected,
  ] = await Promise.all([
    build(sourceName, { minify: true }),
    readFile(expectedName, 'utf-8')
  ]);

  assert.equal(transformed, expected);
});


test('must drop assert and debug', async function () {
  const sourceName = resolve(__dirname, 'fixtures', 'app/index.js');
  const expectedName = resolve(__dirname, 'fixtures', 'app.esbuild.js');

  const [
    transformed,
    expected,
  ] = await Promise.all([
    build(sourceName, { bundle: true, format: 'esm' }, { modules: ['assert', 'debug'] }),
    readFile(expectedName, 'utf-8')
  ]);

  assert.equal(transformed, expected);
});

async function build(sourceName, buildOpts = {}, pluginOpts = {}) {
  const { outputFiles } = await esbuild.build({
    entryPoints: [sourceName],
    plugins: [drop(pluginOpts)],
    write: false,
    ...buildOpts
  });

  return outputFiles[0].text;
}
