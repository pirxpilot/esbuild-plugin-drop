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
});

async function build(sourceName) {
  const { outputFiles } = await esbuild.build({
    entryPoints: [sourceName],
    plugins: [drop()],
    write: false
  });

  return outputFiles[0].text;
}

