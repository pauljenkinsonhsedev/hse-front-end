const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'source-map',
  target: 'web',
  entry: [
    './src/scripts/app.js'
  ],
  output: {
    filename: 'app.min.js',
    path: path.resolve(__dirname, './public/js'),
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
  devServer: {
    contentBase: path.join(__dirname, 'public/js'),
    compress: true,
    port: 3000,
    open: true,
  },
  plugins: [],
};
