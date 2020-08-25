const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  devtool: 'source-map',
  target: 'web',
  externals: [
    nodeExternals({
      importType: 'umd'
    })
  ],
  entry: [
    './src/shared/js/app.js'
  ],
  output: {
    filename: 'v5-main.min.js',
  },
  module : {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
        parser: {
          amd: false, // disable AMD
          commonjs: false, // disable CommonJS
        }
      },
    ],
  },
  stats: 'errors-only',
  plugins: [],
};
