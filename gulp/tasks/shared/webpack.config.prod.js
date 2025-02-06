const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const prod = process.env.NODE_ENV === 'production';

module.exports = {
  mode: 'production',
  target: 'web',
  entry: {
    'main-6.2.0.min': ['formdata-polyfill', 'whatwg-fetch', './src/shared/js/main.js'],
    'cookies-6.2.0': ['formdata-polyfill', 'whatwg-fetch', './src/shared/js/cookies.js']
  },
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      },
    ],
  },
  stats: 'errors-only',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      }
    })
  ]
};
