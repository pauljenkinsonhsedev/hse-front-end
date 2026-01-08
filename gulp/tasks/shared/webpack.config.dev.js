const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  target: 'web',
  entry: {
    'main-6.5.0.min': ['formdata-polyfill', 'whatwg-fetch', './src/shared/js/main.js'],
    'cookies-6.5.0': ['formdata-polyfill', 'whatwg-fetch', './src/shared/js/cookies.js'],
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
