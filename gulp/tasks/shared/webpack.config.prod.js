const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const prod = process.env.NODE_ENV === 'production';

module.exports = {
  mode: 'production',
  target: 'web',
  entry: {
    'v6-main.min': ['formdata-polyfill', 'whatwg-fetch', './src/shared/js/v6-main.js'],
    'v6-cookies': ['formdata-polyfill', 'whatwg-fetch', './src/shared/js/v6-cookies.js']
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
