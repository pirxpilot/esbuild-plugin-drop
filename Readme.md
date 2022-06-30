[![NPM version][npm-image]][npm-url]
[![Build Status][build-image]][build-url]
[![Dependency Status][deps-image]][deps-url]

# esbuild-plugin-drop

[esbuild] plugin for removing `assert`, `debug` etc.  
Works like [mini-unassert] but for [esbuild].

## Install

```sh
$ npm install --save esbuild-plugin-drop
```

## Usage

Like any other [esbuild plugin].

```js
const dropPlugin = require('esbuild-plugin-drop');

// by default only `assert` is dropped
// you can pass an array of module names though
const drop = dropPlugin({ modules: ['assert', 'debug'] })

require('esbuild')
  .build({
    entryPoints: ['app.js'],
    bundle: true,
    outfile: 'out.js',
    plugins: [drop],
  })
  .catch(() => process.exit(1))
```

## License

Apache-2.0 © 2002 [Damian Krzeminski](https://pirxpilot.me)  
Apache-2.0 © 2018 [Renée Kooi](mailto:renee@kooi.me)

[esbuild]:https://esbuild.github.io/
[esbuild plugin]: https://esbuild.github.io/plugins/#using-plugins
[mini-unassert]: https://npmjs.org/package/mini-unassert

[npm-image]: https://img.shields.io/npm/v/esbuild-plugin-drop.svg
[npm-url]: https://npmjs.org/package/esbuild-plugin-drop

[build-url]: https://github.com/pirxpilot/esbuild-plugin-drop/actions/workflows/check.yaml
[build-image]: https://img.shields.io/github/workflow/status/pirxpilot/esbuild-plugin-drop/check

[deps-image]: https://img.shields.io/librariesio/release/npm/esbuild-plugin-drop
[deps-url]: https://libraries.io/npm/esbuild-plugin-drop
