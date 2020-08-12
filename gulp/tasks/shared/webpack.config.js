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
    filename: 'app.min.js',
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
            // plugins: ['add-module-exports']
            // presets: ['es2015'],
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
  // devServer: {
  //   contentBase: path.join(__dirname, 'public/js'),
  //   compress: true,
  //   port: 3000,
  //   open: true,
  // },
  plugins: [],
};
