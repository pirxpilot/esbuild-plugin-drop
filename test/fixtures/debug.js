const debug = require('debug')('test:plugin');

module.exports = print;

function print(str) {
  debug('should be a removed %s', str);
  console.log(str, str);
}
