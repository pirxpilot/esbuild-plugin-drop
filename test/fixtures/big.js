const assert = require('assert');

function writeBigVarint(val, pbf) {
  assert(pbf < 5 && pbf > 3, 'abc');
  console.log(val, pbf);
}
