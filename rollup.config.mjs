import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import babel from '@rollup/plugin-babel';

export default {
 input: 'src/shared/js/main.js',
  context: 'window', // This tells Rollup that top-level 'this' is 'window'
  output: {
    file: 'secureroot/hseonline/website/livelive/secureroot/assets/v6-js/main-6.7.0.min.js',
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