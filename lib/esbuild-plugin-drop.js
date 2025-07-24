const { readFile } = require('node:fs/promises');
const drop = require('./drop');

module.exports = esbuildPluginDrop;

function esbuildPluginDrop({ modules = ['assert'] } = {}) {
  const filter = /\.m?js$/;
  const rxModules = new RegExp(modules.join('|'));

  return {
    name: 'drop',
    setup: build => build.onLoad({ filter }, onLoad)
  };

  async function onLoad({ path }) {
    let contents = await readFile(path, 'utf-8');
    if (rxModules.test(contents)) {
      contents = drop(contents, modules);
    }
    return { contents };
  }
}
