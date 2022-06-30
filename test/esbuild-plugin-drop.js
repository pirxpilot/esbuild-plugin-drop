const test = require('tape');
const esbuildPluginDrop = require('../');

test('esbuild-plugin-drop must have at least one test', function (t) {
  esbuildPluginDrop();
  t.fail('Need to write tests.');
  t.end();
});
