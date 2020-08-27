const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const prod = process.env.NODE_ENV === 'development';

module.exports = {
  mode: 'development',
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      }
    })
  ]
};
