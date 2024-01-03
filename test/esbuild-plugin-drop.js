const test = require('tape');
const esbuild = require('esbuild');
const { resolve } = require('path');
const { readFile } = require('fs').promises;

const drop = require('../');

test('must drop assert', async function (t) {
  const sourceName = resolve(__dirname, 'fixtures', 'assert.js');
  const expectedName = resolve(__dirname, 'fixtures', 'assert.esbuild.js');

  const [
    transformed,
    expected,
  ] = await Promise.all([
    build(sourceName),
    readFile(expectedName, 'utf-8')
  ]);

  t.equal(transformed, expected);
  t.end();
});

test('must drop assert (esm)', async function (t) {
  const sourceName = resolve(__dirname, 'fixtures', 'assert.mjs');
  const expectedName = resolve(__dirname, 'fixtures', 'assert.esbuild.mjs');

  const [
    transformed,
    expected,
  ] = await Promise.all([
    build(sourceName, {}, { sourceType: 'module' }),
    readFile(expectedName, 'utf-8')
  ]);

  t.equal(transformed, expected);
  t.end();
});

test('must drop assert when minifying', async function (t) {
  const sourceName = resolve(__dirname, 'fixtures', 'big.js');
  const expectedName = resolve(__dirname, 'fixtures', 'big.esbuild.js');

  const [
    transformed,
    expected,
  ] = await Promise.all([
    build(sourceName, { minify: true }),
    readFile(expectedName, 'utf-8')
  ]);

  t.equal(transformed, expected);
  t.end();
});


test('must drop assert and debug', async function (t) {
  const sourceName = resolve(__dirname, 'fixtures', 'app/index.js');
  const expectedName = resolve(__dirname, 'fixtures', 'app.esbuild.js');

  const [
    transformed,
    expected,
  ] = await Promise.all([
    build(sourceName, { bundle: true, format: 'esm' }, { modules: ['assert','debug'] }),
    readFile(expectedName, 'utf-8')
  ]);

  t.equal(transformed, expected);
  t.end();
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

