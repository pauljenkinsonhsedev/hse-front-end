const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const prod = process.env.NODE_ENV === 'production';

module.exports = {
  mode: 'production',
  target: 'web',
  entry: [
    './src/shared/js/app.js'
  ],
  output: {
    filename: 'v5-main.min.js',
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
