;

module.exports = print;

function print(str) {
  void(typeof str === 'string', 'should be a string');
  console.log(str, str);
}
