[license-shield-url]: https://img.shields.io/github/license/mgthomas99/electron-vue-typescript-boilerplate.svg?style=flat-square
[license-url]: https://github.com/mgthomas99/electron-vue-typescript-boilerplate/blob/master/LICENSE

# electron-vue-typescript-boilerplate

[!LICENSE[license-shield-url]][license-url]

A boilerplate project integrating Electron, Vue and Typescript using Webpack.
The project can be compiled into a distributable binary and even bundled into an
executable file, using the scripts included in this package.

## Build

```shell
  npm run build
```

Building the project will compile the source code and bundle it with the assets
used. The bundle will be outputted to the `dist/` directory (which is created
if it does not already exist).

The command will also produce an executable, outputted to the `build/`
directory, along with a new folder (also in the `build/`) directory containing
the unpackaged executable.

## License

See the `LICENSE` file for license information.
