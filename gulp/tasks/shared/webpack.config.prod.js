const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const prod = process.env.NODE_ENV === 'production';

module.exports = {
  mode: 'production',
  target: 'web',
  entry: {
    'v5-main.min': ['./src/shared/js/v5-main.js'],
    'v5-cookies': ['./src/shared/js/v5-cookies.js']
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
