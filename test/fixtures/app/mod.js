const debug = require('debug')('app:mod');

module.exports = mode;

function mode(str) {
  debug('should be a removed %s', str);
  return str + str;
}
