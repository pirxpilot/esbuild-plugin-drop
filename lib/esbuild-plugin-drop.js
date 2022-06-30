const { createReadStream } = require('fs');
const unassert = require('mini-unassert');

module.exports = esbuildPluginDrop;

function esbuildPluginDrop({ modules = ['assert'] } = {}) {
  const filter = /\.m?js$/;
  return {
    name: 'drop',
    setup: build => build.onLoad({ filter }, onLoad)
  };

  function onLoad({ path }) {
    const file = createReadStream(path);
    const transform = unassert({ modules });
    return new Promise(function (resolve) {
      const chunks = [];
      file.pipe(transform)
        .on('data', chunk => chunks.push(Buffer.from(chunk)))
        .on('error', detail => resolve(
          { errors: [{ text: 'Unassertify error', detail }] }
        ))
        .on('end', () => resolve(
          { contents: Buffer.concat(chunks).toString('utf8') }
        ));
    });
  }

}
