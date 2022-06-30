const assert = require('assert');

module.exports = print;

function print(str) {
  assert(typeof str === 'string', 'should be a string');
  console.log(str, str);
}
