const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  target: 'web',
  entry: {
    'v6-main.min': ['formdata-polyfill', 'whatwg-fetch', './src/shared/js/v6-main.js'],
    'v6-cookies': ['formdata-polyfill', 'whatwg-fetch', './src/shared/js/v6-cookies.js'],
  },
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/,
      },
    ],
  },
  stats: 'errors-only',
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
};
