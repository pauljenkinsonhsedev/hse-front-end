import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import babel from '@rollup/plugin-babel';
import fs from 'fs'; // Import the File System module

// Read the package.json and grab the version number
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const version = pkg.version;

export default {
  input: 'src/shared/js/main.js',
  context: 'window', // This tells Rollup that top-level 'this' is 'window'
  output: {
    // We use backticks (``) here to allow the ${version} variable to work
    file: `secureroot/hseonline/website/livelive/secureroot/assets/v6-js/main-${version}.min.js`,
    format: 'iife',
    sourcemap: true,
    name: 'hseFrontend'
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({ 
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env'],
      exclude: 'node_modules/**'
    }),
    terser() 
  ]
};