import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import babel from '@rollup/plugin-babel';
import fs from 'fs';

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const version = pkg.version;

const sharedPlugins = [
  nodeResolve(),
  commonjs(),
  babel({
    babelHelpers: 'bundled',
    exclude: 'node_modules/**'
  }),
  terser({
    mangle: {
      reserved: ['Cookies', 'Highcharts']
    },
    format: {
      comments: false
    }
  })
];

// ES module config for main.js — supports dynamic import code splitting
const createEsConfig = (input, fileName) => ({
  input,
  output: [
    {
      dir: './secureroot/hseonline/website/livelive/secureroot/assets/v6-js',
      format: 'es',
      sourcemap: true,
      entryFileNames: `${fileName}-${version}.min.js`,
      chunkFileNames: `[name]-${version}.min.js`
    },
    {
      dir: './designsystem/assets/v6-js',
      format: 'es',
      sourcemap: true,
      entryFileNames: `${fileName}-${version}.min.js`,
      chunkFileNames: `[name]-${version}.min.js`
    }
  ],
  plugins: sharedPlugins
});

// IIFE config for cookies.js — stays as plain script, no module system needed
const createIifeConfig = (input, fileName, name) => {
  const suffix = `${fileName}-${version}.js`;
  return {
    input,
    context: 'window',
    output: [
      {
        file: `./secureroot/hseonline/website/livelive/secureroot/assets/v6-js/${suffix}`,
        format: 'iife',
        sourcemap: true,
        name
      },
      {
        file: `./designsystem/assets/v6-js/${suffix}`,
        format: 'iife',
        sourcemap: true,
        name
      }
    ],
    plugins: sharedPlugins
  };
};

export default [
  createEsConfig('src/shared/js/main.js', 'main'),
  createIifeConfig('src/shared/js/cookies.js', 'cookies', 'hseCookies')
];
