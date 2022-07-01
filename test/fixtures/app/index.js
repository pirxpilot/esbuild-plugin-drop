const assert = require('assert');
const mod = require('./mod.js');

function app() {
  assert(mod, 'not null')
  mod('foo');
}
