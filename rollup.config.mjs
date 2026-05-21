import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import babel from '@rollup/plugin-babel';
import fs from 'fs';

// 1. Setup shared variables
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
      // Prevents renaming 'Cookies' or 'Highcharts' to single letters
      reserved: ['Cookies', 'Highcharts'] 
    },
    format: {
      comments: false // Removes comments for a smaller file size
    }
  })
];

// 2. The helper function to handle repeated settings
const createConfig = (input, fileName, name, useMin = true) => {
  const suffix = `${fileName}-${version}${useMin ? '.min' : ''}.js`;
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

// 3. The export list
export default [
  // This will create: assets/v6-js/main-6.6.0.min.js
  createConfig('src/shared/js/main.js', 'main', 'hseFrontend', true),
  
  // This will create: assets/v6-js/cookies-6.6.0.js (No .min)
  createConfig('src/shared/js/cookies.js', 'cookies', 'hseCookies', false),
];