const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpack = require('webpack');
const dotenv = require('dotenv');

const env = dotenv.config().parsed || {};

const envVars = Object.keys(env).reduce((result, key) => {
  result[`process.env.${key}`] = JSON.stringify(env[key]); // eslint-disable-line no-param-reassign
  return result;
}, {});

module.exports = {
  mode: 'development',
  entry: {
    bundle: './src/index.js',
  },
  devServer: {
    contentBase: path.join(process.cwd(), 'dist'),
    compress: true,
    port: 9000,
    historyApiFallback: true,
  },
  output: {
    filename: '[name].js',
  },
  resolve: {
    modules: [path.resolve(process.cwd(), 'src'), 'node_modules'],
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
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
    new HtmlWebpackPlugin({
      template: 'index.html',
      base: '/',
    }),
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin(envVars),
  ],
};
