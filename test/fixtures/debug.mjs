import Debug from 'debug';

const debug = Debug('test:plugin');

export function print(str) {
  debug('should be a removed %s', str);
  console.log(str, str);
}
