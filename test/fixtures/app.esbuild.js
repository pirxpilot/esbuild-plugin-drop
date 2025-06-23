var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod2) => function() {
  return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
};

// test/fixtures/app/mod.js
var require_mod = __commonJS({
  "test/fixtures/app/mod.js"(exports, module) {
    module.exports = mode;
    function mode(str) {
      return str + str;
    }
  }
});

// test/fixtures/app/index.js
var mod = require_mod();
