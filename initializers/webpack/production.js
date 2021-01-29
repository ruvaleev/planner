const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
/* eslint no-unused-vars: 0 */
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    bundle: './src/index.js',
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(process.cwd(), 'dist/assets'),
  },
  resolve: {
    modules: [path.resolve(process.cwd(), 'src'), 'node_modules'],
  },
  module: {
    rules: [
      { test: /\.js/, use: 'babel-loader' },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
    ],
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      base: '/',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
    }),
    new WebpackManifestPlugin(),
  ],
};
