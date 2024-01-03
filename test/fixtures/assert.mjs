import assert from 'assert';

export function print(str) {
  assert(typeof str === 'string', 'should be a string');
  console.log(str, str);
}
